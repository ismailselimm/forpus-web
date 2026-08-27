"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

import { useLang } from "@/components/providers/LanguageProvider";
import { leadGonder } from "@/lib/lead-gonder";

/**
 * SEKTÖR BRIEF'İ — çözüm sayfasının dönüşüm motoru.
 *
 * NEDEN VAR: bu sayfalara arama sonucundan bir doktor, avukat ya da restoran
 * sahibi geliyor. Eskiden tek yol, sayfanın en altındaki genel iletişim
 * formuna inip boş bir metin kutusuna proje anlatmaktı. Meşgul bir profesyonel
 * bunu yapmıyor — 90 günde 5 tıklama, sıfır form.
 *
 * İMZA FİKİR: brief kendi kendine yazılıyor. Ziyaretçi seçtikçe aşağıdaki
 * kutu doluyor ve "bize ulaşacak brief" başlığıyla ona gösteriliyor. Bu üç iş
 * birden yapıyor:
 *   1. Boş sayfa kaygısını kaldırıyor — yazacak bir şey yok, seçilecek var.
 *   2. Yetkinliği KANITLIYOR: seçenekler onun mesleğine özgü, yani işini
 *      bildiğimiz daha ilk saniyede görülüyor. Formun kendisi vaadin demosu.
 *   3. Dürüst: panelimize düşecek metnin aynısını gösteriyoruz, gizli bir şey
 *      toplamıyoruz.
 *
 * Seçenekler UYDURULMUYOR: `lib/solutions.ts` içindeki o sektörün `features`
 * listesinden geliyor. Yani sayfada "şunları yapıyoruz" diye yazan maddelerle
 * formda seçilebilenler aynı — ikisi ayrışamaz.
 *
 * BÜTÇE SORUSU BİLEREK YOK: ilk temasta bütçe sormak küçük işletmede dönüşümü
 * düşürüyor ve şu anki darboğaz nitelik değil hacim. "Durum" ve "zaman"
 * soruları triyaj için yeterli sinyali zaten veriyor.
 */
export default function SektorBrief({
  sektorAnahtari,
  sektorEtiketi,
  secenekler,
}: {
  /** `solutionIndex` anahtarı — panele sektör olarak bu gidiyor. */
  sektorAnahtari: string;
  /** Görünen ad: "Doktor", "Avukat"… */
  sektorEtiketi: string;
  /** O sektörün `features` listesi. Kutucukların kaynağı. */
  secenekler: string[];
}) {
  const { t } = useLang();
  const b = t.brief;

  const [ihtiyaclar, setIhtiyaclar] = useState<string[]>([]);
  const [durum, setDurum] = useState<string | null>(null);
  const [zaman, setZaman] = useState<string | null>(null);
  const [ad, setAd] = useState("");
  const [iletisim, setIletisim] = useState("");
  const [hal, setHal] = useState<
    "bos" | "gonderiliyor" | "basarili" | "hata" | "eksik"
  >("bos");

  const ihtiyacDegistir = (secenek: string) =>
    setIhtiyaclar((onceki) =>
      onceki.includes(secenek)
        ? onceki.filter((x) => x !== secenek)
        : [...onceki, secenek],
    );

  /** Ekranda görünen brief ile panele giden metin AYNI — ikisi ayrışmasın. */
  const brief = useMemo(() => {
    const satirlar: string[] = [
      `${sektorEtiketi} — ${b.eyebrow.toLowerCase()}`,
    ];
    if (ihtiyaclar.length) satirlar.push(`İhtiyaç: ${ihtiyaclar.join(", ")}`);
    if (durum) satirlar.push(`Mevcut durum: ${durum}`);
    if (zaman) satirlar.push(`Başlangıç: ${zaman}`);
    return satirlar.join("\n");
  }, [sektorEtiketi, b.eyebrow, ihtiyaclar, durum, zaman]);

  const hazir =
    ihtiyaclar.length > 0 && ad.trim() !== "" && iletisim.trim() !== "";
  const birSeySecildi =
    ihtiyaclar.length > 0 || durum !== null || zaman !== null;

  const gonder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hal === "gonderiliyor") return;
    if (!hazir) {
      setHal("eksik");
      return;
    }

    // Honeypot: gerçek kullanıcı görmez; bot doldurursa sessizce iptal.
    const tuzak = (
      e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null
    )?.checked;
    if (tuzak) return;

    setHal("gonderiliyor");

    // "@" varsa e-posta, yoksa telefon. Kullanıcıya iki ayrı kutu göstermek
    // yerine tek kutu: doldurulacak alan sayısı dönüşümün en sert eşiği.
    const epostaMi = iletisim.includes("@");

    const basarili = await leadGonder({
      ad: ad.trim(),
      eposta: epostaMi ? iletisim.trim() : undefined,
      telefon: epostaMi ? undefined : iletisim.trim(),
      sektor: sektorAnahtari,
      mesaj: brief,
    });

    setHal(basarili ? "basarili" : "hata");
    if (basarili) {
      setIhtiyaclar([]);
      setDurum(null);
      setZaman(null);
      setAd("");
      setIletisim("");
    }
  };

  const GonderIkonu = hal === "gonderiliyor" ? Loader2 : ArrowUpRight;

  return (
    <section id="brief" className="container-x scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-white/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl md:p-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-deep">
          {sektorEtiketi} · {b.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
          {b.baslik}
        </h2>
        <p className="mt-3 max-w-xl text-[0.97rem] leading-relaxed text-ink-2">
          {b.altBaslik}
        </p>

        <form onSubmit={gonder} className="mt-8 space-y-7">
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            aria-hidden
          />

          <SecimGrubu baslik={b.ihtiyacBasligi}>
            {secenekler.map((secenek) => (
              <Kutucuk
                key={secenek}
                secili={ihtiyaclar.includes(secenek)}
                onSelect={() => ihtiyacDegistir(secenek)}
              >
                {secenek}
              </Kutucuk>
            ))}
          </SecimGrubu>

          <SecimGrubu baslik={b.durumBasligi}>
            {b.durumSecenekleri.map((secenek) => (
              <Kutucuk
                key={secenek}
                secili={durum === secenek}
                onSelect={() => setDurum(durum === secenek ? null : secenek)}
              >
                {secenek}
              </Kutucuk>
            ))}
          </SecimGrubu>

          <SecimGrubu baslik={b.zamanBasligi}>
            {b.zamanSecenekleri.map((secenek) => (
              <Kutucuk
                key={secenek}
                secili={zaman === secenek}
                onSelect={() => setZaman(zaman === secenek ? null : secenek)}
              >
                {secenek}
              </Kutucuk>
            ))}
          </SecimGrubu>

          {/* İMZA: kendi kendine yazılan brief. Mono yazı tipi bilinçli — bu
              bir pazarlama cümlesi değil, oluşturulmakta olan bir KAYIT. */}
          <div>
            <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-3">
              {b.briefBasligi}
            </p>
            <div
              aria-live="polite"
              className="mt-2 min-h-[104px] rounded-2xl border border-line bg-bg-2/60 p-4 font-mono text-[0.83rem] leading-relaxed text-ink-2"
            >
              {birSeySecildi ? (
                brief.split("\n").map((satir, i) => (
                  <p
                    key={satir}
                    className={i === 0 ? "font-semibold text-ink" : "mt-1"}
                  >
                    {satir}
                  </p>
                ))
              ) : (
                <p className="text-ink-3">{b.baslangic}</p>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              placeholder={b.adEtiketi}
              aria-label={b.adEtiketi}
              autoComplete="name"
              className="w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[0.97rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus-visible:border-cyan"
            />
            <input
              value={iletisim}
              onChange={(e) => setIletisim(e.target.value)}
              placeholder={b.iletisimEtiketi}
              aria-label={b.iletisimEtiketi}
              autoComplete="tel"
              className="w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[0.97rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus-visible:border-cyan"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={hal === "gonderiliyor"}
            >
              {hal === "gonderiliyor" ? b.gonderiliyor : b.gonder}
              <GonderIkonu
                className={`h-[18px] w-[18px] ${hal === "gonderiliyor" ? "animate-spin" : ""}`}
              />
            </button>

            {hal === "basarili" && (
              <p className="flex items-center gap-2 text-[0.92rem] font-medium text-green-deep">
                <Check className="h-4 w-4" />
                {b.basarili}
              </p>
            )}
            {hal === "hata" && (
              <p className="text-[0.92rem] text-ink-2">{b.hata}</p>
            )}
            {hal === "eksik" && (
              <p className="text-[0.92rem] text-ink-2">{b.eksik}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function SecimGrubu({
  baslik,
  children,
}: {
  baslik: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-[0.9rem] font-semibold text-ink">{baslik}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

/**
 * Seçim kutucuğu.
 *
 * Seçili hâli `.pill-link:hover` ile aynı marka gradyanını kullanıyor: imleç
 * üstündeyken gördüğün şey tıklayınca yerine oturuyor. Affordans kendini
 * öğretiyor, ayrıca sayfadaki diğer pill'lerle aynı dili konuşuyor.
 */
function Kutucuk({
  secili,
  onSelect,
  children,
}: {
  secili: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={secili}
      className={
        secili
          ? "inline-flex items-center gap-1.5 rounded-full border border-transparent bg-[image:var(--grad-brand)] px-4 py-2 text-[0.9rem] font-medium text-white shadow-[var(--shadow-glow)] transition-all"
          : "inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-4 py-2 text-[0.9rem] font-medium text-ink-2 transition-all hover:border-cyan hover:text-ink"
      }
    >
      {secili && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      {children}
    </button>
  );
}
