import type { Metadata } from "next";
import type { Lang } from "./i18n/dictionary";
import {
  solutionIndex,
  slugOfRef,
  type Aile,
  type SolutionRef,
} from "./solution-index";

/**
 * Çözüm hub'ının ('/cozumler', '/en/solutions') verisi ve metni.
 *
 * NEDEN AYRI DOSYA — ölçüldü: bu blok önce `lib/solution-index.ts` içindeydi
 * ve oradan istemci paketine sızıyordu. `Footer.tsx` ve `Personas.tsx`
 * "use client" ve o dosyayı içe aktarıyor; webpack modülü paylaşılan yığına
 * koyunca gruplama ve derleme kontrolleri de yanında gitti. Bedeli:
 * paylaşılan parça 39.990 → 41.064 ham, 14.152 → 14.489 gzip (+291 B) ve o
 * parçayı 115 sayfa yüklüyor. Yani iki sunucu sayfasının hesabı 115 sayfaya
 * çıkıyordu; `throw new Error("AILELER…")` bile tarayıcıya iniyordu.
 * Buraya taşınınca paylaşılan parça tabana döndü.
 *
 * `Aile` tipi ve `aile` alanı indekste KALDI — orası veri ve `ilgiliRefler`
 * onu kullanıyor. Buraya taşınan yalnız gösterim metni ve gruplama.
 */

/**
 * Ailelerin gösterim adı VE sırası — tek kaynak.
 *
 * Sıra anlam taşıyor: "yazilim" başta, çünkü o iki sayfa sektör değil hizmet
 * — mobil uygulama ve özel yazılım herkese satılıyor. Sonrası sektörler,
 * bugün sayfa sayısına göre azalan (7,5,5,4,4,4,3,3,3,2). O sıralamayı tutan
 * bir kontrol YOK ve olmamalı: bozulduğunda kırılan bir şey yok, yalnız
 * başlık sırası kayar.
 */
const AILELER = [
  { aile: "yazilim", tr: "Yazılım hizmetleri", en: "Software services" },
  { aile: "saglik", tr: "Sağlık", en: "Healthcare" },
  { aile: "operasyon", tr: "Operasyon ve saha", en: "Operations & field" },
  { aile: "agirlama", tr: "Ağırlama ve turizm", en: "Hospitality & tourism" },
  {
    aile: "danismanlik",
    tr: "Danışmanlık ve finans",
    en: "Consulting & finance",
  },
  { aile: "yapi", tr: "Yapı ve emlak", en: "Construction & real estate" },
  { aile: "ticaret", tr: "Ticaret", en: "Commerce" },
  { aile: "guzellik", tr: "Güzellik ve bakım", en: "Beauty & care" },
  { aile: "pet", tr: "Evcil hayvan", en: "Pets" },
  { aile: "egitim", tr: "Eğitim", en: "Education" },
  { aile: "kisisel", tr: "Kişisel marka", en: "Personal brand" },
] as const satisfies readonly { aile: Aile; tr: string; en: string }[];

export type AileGrubu = (typeof AILELER)[number] & { refler: SolutionRef[] };

/**
 * Ailesine göre gruplanmış çözümler — hub'ın çizdiği sıra.
 *
 * Tek geçiş: kova doldurulurken sırada olmayan aile, sonra da boş kalan aile
 * yakalanıyor. Üçüncü kontrol toplam sayı — o, ilk ikisinin göremediği tek
 * durumu, AILELER'de aynı ailenin iki kez yazılmasını yakalıyor (tekrar
 * eksik de değil boş da değildir, ama 42 yerine 49 bağlantı çizerdi).
 */
export const aileyeGore: AileGrubu[] = (() => {
  const kova = new Map<Aile, SolutionRef[]>(AILELER.map((a) => [a.aile, []]));
  for (const s of solutionIndex) {
    const b = kova.get(s.aile);
    if (!b) {
      throw new Error(`AILELER eksik: "${s.aile}" ailesi hub'da çizilmiyor.`);
    }
    b.push(s);
  }
  const gruplar = AILELER.map((a) => {
    const refler = kova.get(a.aile)!;
    if (refler.length === 0) {
      throw new Error(`AILELER fazla: "${a.aile}" ailesinde hiç çözüm yok.`);
    }
    return { ...a, refler };
  });
  const cizilen = gruplar.reduce((n, g) => n + g.refler.length, 0);
  if (cizilen !== solutionIndex.length) {
    throw new Error(
      `Hub ${cizilen} çözüm çiziyor ama indekste ${solutionIndex.length} var — AILELER'de tekrar eden aile olabilir.`,
    );
  }
  return gruplar;
})();

/** Hub'ın dile göre adresi. */
export const HUB_YOLU = { tr: "/cozumler", en: "/en/solutions" } as const;

/** Bir çözümün hub altındaki adresi. */
export const cozumYolu = (s: SolutionRef, lang: Lang) =>
  `${HUB_YOLU[lang]}/${slugOfRef(s, lang)}`;

export const hubIcerigi: Record<
  Lang,
  { eyebrow: string; h1: string; giris: string; semaAdi: string }
> = {
  tr: {
    eyebrow: "Çözümler",
    h1: "Sektörünüze özel bir sayfa",
    giris:
      "Her meslek aynı şeye ihtiyaç duymuyor. Diş hekiminin randevu sistemi, avukatın reklam yasağı, lojistikçinin navlun formu — hangi alandaysanız oradan başlayın.",
    semaAdi: "Forpus Yazılım Çözümleri",
  },
  en: {
    eyebrow: "Solutions",
    h1: "A page built for your field",
    giris:
      "Not every profession needs the same thing. A dental clinic needs booking, a law firm needs to stay inside advertising rules, a freight company needs a quote form that asks the right questions. Start where you are.",
    semaAdi: "Forpus Yazılım Solutions",
  },
};

/**
 * Hub metadata'sı — `lib/solution-seo.ts` ve `lib/iletisim.ts` ile aynı fabrika
 * kalıbı. İki route dosyası hreflang haritasını ayrı ayrı yazınca kural
 * değiştiğinde ikisinin de elden geçmesi gerekiyordu.
 *
 * Sayı elle yazılmıyor: 43. çözüm eklendiğinde açıklama kendiliğinden
 * güncelleniyor. Sektör sayısı = toplam − yazılım hizmetleri.
 */
export function hubMetadata(lang: Lang): Metadata {
  const hizmet = aileyeGore.find((g) => g.aile === "yazilim")!.refler.length;
  const sektor = solutionIndex.length - hizmet;
  const languages = {
    "tr-TR": HUB_YOLU.tr,
    "en-US": HUB_YOLU.en,
    "x-default": HUB_YOLU.tr,
  };
  return lang === "tr"
    ? {
        title: "Çözümler — Sektörünüze Özel Web Sitesi",
        description: `Diş hekiminden lojistik firmasına, ${sektor} meslek için hazırlanmış çözüm sayfaları ve ${hizmet} yazılım hizmeti. Kendi alanınızı seçin, ne yaptığımızı görün.`,
        alternates: { canonical: HUB_YOLU.tr, languages },
      }
    : {
        title: "Solutions — A Page Built for Your Field",
        description: `From dental clinics to logistics firms: ${sektor} industry pages and ${hizmet} software services. Pick your field and see what we build for it.`,
        alternates: { canonical: HUB_YOLU.en, languages },
      };
}
