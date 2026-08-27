import { iziOzetle, kaynakIzi } from "@/lib/kaynak-izi";

/**
 * LEAD GÖNDERİMİ — iki kanal, tek yol.
 *
 * İki form var (genel iletişim ve sektör brief'i) ve ikisi de aynı iki yere
 * yazmak zorunda. Ayrı ayrı yazıldığında birinde düzeltilen bir şeyin
 * diğerinde kalması an meselesiydi.
 *
 * KANAL SIRASI ÖNEMLİ:
 * - Web3Forms BİRİNCİL: panel çökse, sunucu yeniden başlasa, DNS bir sorun
 *   yaşasa bile mesaj e-posta olarak ulaşır. Kullanıcıya gösterilen
 *   başarı/hata bu kanaldan geliyor.
 * - Panel "gönder ve unut": başarısız olursa kullanıcı hiçbir şey görmez.
 *   Lead kaybetmek, panele kaydetmemekten çok daha pahalı.
 *
 * İkisi PARALEL gidiyor. Panel çağrısı Web3Forms'un başarı dalının içine
 * konulduğunda, Web3Forms geçici bir hata verdiğinde lead panele hiç
 * düşmüyordu — oysa panel bizim sistemimiz ve kaydı en çok orada istiyoruz.
 */

// Web3Forms erişim anahtarı: gizli değil, e-posta adresinin takma adı gibi.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
  "162a3e34-5c74-4476-8ade-fd9e540e92fd";

const PANEL_INTAKE_URL =
  process.env.NEXT_PUBLIC_PANEL_INTAKE_URL ??
  "https://panel.forpusyazilim.com/api/intake/site";

export type LeadGirdisi = {
  ad: string;
  eposta?: string;
  telefon?: string;
  firma?: string;
  /** Seçilen hizmet hattı — panelde triyajın en çok işe yarayan bilgisi. */
  hizmet?: string;
  /** Sektör anahtarı (ör. "doktor"). Panel bunu kendi sütununda saklıyor. */
  sektor?: string;
  mesaj: string;
};

/** Panele kaydı düşer. Hata FIRLATMAZ — form akışını hiçbir koşulda bozmaz. */
function panele(
  girdi: LeadGirdisi,
  izOzeti: string,
  iz: ReturnType<typeof kaynakIzi>,
): void {
  const govde = izOzeti
    ? `${girdi.mesaj}\n\n— geldiği yer: ${izOzeti}`
    : girdi.mesaj;

  void fetch(PANEL_INTAKE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: girdi.ad,
      email: girdi.eposta || undefined,
      phone: girdi.telefon || undefined,
      company: girdi.firma || undefined,
      sector: girdi.sektor || undefined,
      message: govde,
      iz,
    }),
    // Sekme kapansa bile isteğin tamamlanma şansı olsun.
    keepalive: true,
  }).catch(() => {
    /* panel erişilemezse sessiz geç — Web3Forms zaten mesajı iletti */
  });
}

/**
 * Lead'i iki kanala birden gönderir.
 * Dönen değer: e-posta kanalı başarılı mı (kullanıcıya gösterilecek olan bu).
 */
export async function leadGonder(girdi: LeadGirdisi): Promise<boolean> {
  const iz = kaynakIzi();
  const izOzeti = iziOzetle(iz);

  panele(girdi, izOzeti, iz);

  try {
    // FormData (multipart) → "basit istek", CORS preflight yok → en sağlam yöntem.
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", `Forpus — Yeni mesaj: ${girdi.ad}`);
    fd.append("from_name", girdi.ad);
    if (girdi.eposta) fd.append("replyto", girdi.eposta);

    // Alan adları BİLEREK ASCII: Web3Forms multipart alan İSİMLERİNDEKİ Türkçe
    // karakterleri bozuyor (ş→Åž). i18n etiketleriyle değiştirmeyin — bunlar
    // dilden bağımsız, sabit kalmalı. (Değerler UTF-8, sorunsuz.)
    fd.append("Ad", girdi.ad);
    fd.append("E-posta", girdi.eposta || "-");
    fd.append("Telefon", girdi.telefon || "-");
    fd.append("Firma / Marka", girdi.firma || "-");
    if (girdi.sektor) fd.append("Sektor", girdi.sektor);
    if (girdi.hizmet) fd.append("Hizmet", girdi.hizmet);
    fd.append("Mesaj", girdi.mesaj);
    if (izOzeti) fd.append("Geldigi yer", izOzeti);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
    });
    const veri = (await res.json()) as { success?: boolean };
    return Boolean(res.ok && veri.success);
  } catch {
    return false;
  }
}
