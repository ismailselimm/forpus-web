"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Mobilde kırpılan, düğmeyle açılan liste kabı.
 *
 * NEDEN VAR: ana sayfada aynı sorun iki yerde çıktı — 42 sektör pili ve 11
 * persona kartı. İkisi de masaüstünde sorunsuz, mobilde duvar. Ölçüldü
 * (2 Eylül 2026, 414 piksel): piller 347 → 1011 piksel, persona ızgarası
 * ~4.500 piksel. İkisinin durduğu bölüm mobil sayfanın %21,5'i.
 *
 * NEDEN "İLK N'İ RENDER ET" DEĞİL DE KIRPMA: iki listede de bağlantılar
 * HTML'de kalmak zorunda. Piller ana sayfadan sektör sayfalarına giden iç
 * bağlantı kümesi; bir kısmını basmak onları sessizce silerdi.
 *
 * NEDEN SADECE MOBİL: `sm` ve üstünde her iki liste de zaten kısa. Kırpma
 * orada bir sorunu çözmez, sadece tıklama ekler.
 *
 * NEDEN `kapaliSinif` DIŞARIDAN GELİYOR: Tailwind sınıfları kaynak dosyada
 * BİREBİR arıyor. Yükseklik ve maskeyi burada şablon dizesiyle kursaydım
 * (`[mask-image:...${x}...]`) sınıf hiç üretilmezdi ve kırpma sessizce
 * çalışmazdı. Bu yüzden tam sınıf dizisi çağıran yerde yazılı duruyor.
 */
export default function Katlanir({
  children,
  kapaliSinif,
  butonMetni,
  className,
}: {
  children: ReactNode;
  /** Kapalıyken uygulanan sınıflar — çağrı yerinde birebir yazılmalı. */
  kapaliSinif: string;
  butonMetni: string;
  className?: string;
}) {
  const [acik, setAcik] = useState(false);

  return (
    <div className={className}>
      <div
        className={acik ? undefined : kapaliSinif}
        // Klavyeyle gezen biri kırpılmış alandaki bir bağlantıya odaklanırsa
        // kap kendiliğinden açılıyor; görünmeyen bir öğede odak kalmıyor.
        onFocus={() => setAcik(true)}
      >
        {children}
      </div>

      {!acik && (
        <div className="mt-4 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setAcik(true)}
            aria-expanded={false}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-5 py-2 text-[0.9rem] font-semibold text-ink backdrop-blur-sm transition-colors hover:border-cyan/50 hover:bg-white"
          >
            {butonMetni}
            <ChevronDown className="h-4 w-4 text-ink-3" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
