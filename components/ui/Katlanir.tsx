"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
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
 * bağlantı kümesi; bir kısmını basmak onları sessizce silerdi. Kırpma bir
 * yan fayda da getiriyor: kırpılan alandaki 10 persona görseli (~430 kB)
 * `loading="lazy"` olduğu için paneli açmayan ziyaretçi onları indirmiyor.
 *
 * NEDEN BÜTÜN SINIFLAR BURADA, ÇAĞRI YERİNDE DEĞİL: ilk yazımda sınıf
 * dizesi prop olarak dışarıdan geliyordu, gerekçesi de "Tailwind sınıfları
 * kaynakta birebir arıyor" idi. Gerekçe doğru ama sonuç yanlıştı: bu dosya
 * da taranan bir kaynak. Bedeli ağırdı — `sm:` sıfırlamaları çağrı yerinde
 * durduğu için yeni bir kullanım onlardan birini unutabilirdi ve o zaman
 * masaüstünde içerik kırpık kalır, düğme de `sm:hidden` olduğu için
 * görünmezdi: içeriğe HİÇ ulaşılamaz, build de yeşil geçerdi. Artık
 * dışarıdan yalnız iki sayı geliyor; yanlış sayı tartışılabilir bir veri,
 * sessizce üretilmemiş bir sınıf değil.
 *
 * NEDEN SADECE MOBİL: `sm` ve üstünde her iki liste de zaten kısa. Kırpma
 * orada bir sorunu çözmez, sadece tıklama ekler.
 */
const KAPALI = [
  "max-h-[var(--katlanir-boy)]",
  "overflow-hidden",
  "[mask-image:linear-gradient(to_bottom,#000_var(--katlanir-solma),transparent)]",
  // Klavyeyle gezen biri kırpılmış alandaki bir bağlantıya odaklanınca kap
  // açılıyor. Bu iş önce `onFocus` + state ile yapılıyordu; CSS'e alındı
  // çünkü o hâliyle masaüstünde de (kırpacak bir şey yokken) ve mobilde
  // bağlantıya her dokunuşta boşuna yeniden render tetikliyordu.
  "focus-within:max-h-none focus-within:overflow-visible focus-within:[mask-image:none]",
  "sm:max-h-none sm:overflow-visible sm:[mask-image:none]",
].join(" ");

export default function Katlanir({
  children,
  boy,
  solma,
  butonMetni,
  className,
}: {
  children: ReactNode;
  /** Kapalıyken mobil yükseklik sınırı, piksel. */
  boy: number;
  /** Solmanın başladığı yer, piksel. */
  solma: number;
  butonMetni: string;
  className?: string;
}) {
  // Solma kırpmadan sonra başlarsa maske hiç görünmez ve liste sert kesilir.
  // Bugün 1000 < 1180 ve 162 < 236; bu iki sayının ilişkisi tesadüf olmasın.
  if (solma >= boy) {
    throw new Error(
      `Katlanir: solma (${solma}) kırpmadan (${boy}) önce bitmeli, yoksa maske görünmez.`,
    );
  }

  const [acik, setAcik] = useState(false);

  return (
    <div className={className}>
      <div
        className={acik ? undefined : KAPALI}
        style={
          {
            "--katlanir-boy": `${boy}px`,
            "--katlanir-solma": `${solma}px`,
          } as CSSProperties
        }
      >
        {children}
      </div>

      {!acik && (
        <div className="mt-4 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setAcik(true)}
            className="pill-link pill-link-lg"
          >
            {butonMetni}
            <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
