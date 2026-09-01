"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { solutionIndex, slugOfRef } from "@/lib/solution-index";

/**
 * Ana sayfadaki 42 sektör bağlantısı.
 *
 * NEDEN AYRI BİR BİLEŞEN: mobilde katlanabilir olması gerekiyor ve bu bir
 * durum (state) demek. Personas.tsx zaten client bileşeni ama 270 satır;
 * katlama mantığı orada dursaydı bölümün geri kalanıyla karışırdı.
 *
 * NEDEN KATLANIYOR — ölçüldü (2 Eylül 2026, forpusyazilim.com):
 * 42 pil 1024 pikselde 7 satır ve 347 piksel; 414 pikselde 20 satır ve
 * 1011 piksel. Yani mobilde 2,9 kat. Telefonda bu, sayfanın altındaki
 * paketler ve iletişim bölümlerinin önüne çekilen bir duvar.
 *
 * NEDEN "İLK N'İ RENDER ET" DEĞİL DE KIRPMA: bağlantıların 42'si de HTML'de
 * kalmak zorunda. Ana sayfadan sektör sayfalarına giden iç bağlantılar bu
 * liste; yalnızca ilk 15'ini basmak 27 iç bağlantıyı sessizce silerdi.
 * O yüzden hepsi basılıyor, fazlası `max-height` ile kırpılıyor.
 *
 * NEDEN AİLEYE GÖRE GRUPLAMA YOK: `aile` alanı var (11 aile) ve gruplama
 * bulmayı kolaylaştırırdı, ama YÜKSEKLİĞİ AZALTMAZDI — 42 pil duruyor,
 * üstüne 11 başlık biniyor, liste daha da uzuyordu.
 */
export default function SektorIndeksi({
  lang,
  base,
}: {
  lang: "tr" | "en";
  base: string;
}) {
  const [acik, setAcik] = useState(false);

  return (
    <>
      <div
        className={
          acik
            ? ""
            : // Kırpma YALNIZ mobilde. sm ve üstünde liste 7 satır, sorun yok.
              "max-h-[264px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_190px,transparent)] sm:max-h-none sm:overflow-visible sm:[mask-image:none]"
        }
        // Klavyeyle gezen biri kırpılmış alandaki bir bağlantıya odaklanırsa
        // liste kendiliğinden açılıyor; görünmeyen bir bağlantıya odaklanmış
        // hâlde kalmıyor.
        onFocus={() => setAcik(true)}
      >
        <ul className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {solutionIndex.map((s) => (
            <li key={s.key}>
              <Link
                href={`${base}/${slugOfRef(s, lang)}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-4 py-2 text-[0.9rem] font-medium text-ink-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-white hover:text-ink hover:shadow-[var(--shadow-soft)] motion-reduce:transform-none"
              >
                {s.label[lang]}
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-ink-3"
                  strokeWidth={2}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {!acik && (
        <div className="mt-3 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setAcik(true)}
            aria-expanded={false}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-5 py-2 text-[0.9rem] font-semibold text-ink backdrop-blur-sm transition-colors hover:border-cyan/50 hover:bg-white"
          >
            {lang === "tr"
              ? `${solutionIndex.length} sektörün tümü`
              : `All ${solutionIndex.length} sectors`}
            <ChevronDown className="h-4 w-4 text-ink-3" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </>
  );
}
