"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";

import { SOSYAL_PROFILLER, type SosyalProfil } from "@/lib/marka";

/**
 * Yuvarlak sosyal ikon şeridi. Footer ve iletişim bölümü aynı satırı çiziyor.
 *
 * Neden ortak bileşen: liste tek kaynağa alındı ama ÇİZİMİ iki dosyada birer
 * kopya hâlinde kalmıştı — aynı ikon eşlemesi, aynı `target="_blank"` kararı,
 * aynı çapa. Beşinci bir hesap eklemek üç dosyaya dokunmayı gerektiriyordu,
 * yani düzeltilen sorun kaldırılmamış, bir kat yukarı taşınmıştı.
 *
 * İki ekranın gerçek farkı yalnız çapa görünümü; o da prop.
 */

const IKON: Record<SosyalProfil["ad"], LucideIcon> = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
};

export function SosyalIkonlar({
  eposta,
  epostaEtiketi,
  className,
  ikonClassName,
}: {
  eposta: string;
  /** Diller arası değişiyor; sabitlenirse /en'de Türkçe okunur. */
  epostaEtiketi: string;
  /** Şeridin kendi yerleşimi (footer'da `mt-6 flex`, iletişimde sarmalı). */
  className?: string;
  /** Yuvarlak çapa görünümü — iki ekranın gerçek farkı bu. */
  ikonClassName: string;
}) {
  return (
    <div className={className}>
      {SOSYAL_PROFILLER.map(({ ad, href }) => {
        const Ikon = IKON[ad];
        return (
          <a
            key={ad}
            href={href}
            aria-label={ad}
            // Profiller her zaman dış adres; koşullu kontrol gerekmiyor.
            target="_blank"
            rel="noopener noreferrer"
            className={ikonClassName}
          >
            <Ikon className="h-[18px] w-[18px]" aria-hidden />
          </a>
        );
      })}
      {/* E-posta listenin parçası değil: bir profil değil, bir kanal — ve
          `mailto:` olduğu için yeni sekmede açılmamalı. */}
      <a
        href={`mailto:${eposta}`}
        aria-label={epostaEtiketi}
        className={ikonClassName}
      >
        <Mail className="h-[18px] w-[18px]" aria-hidden />
      </a>
    </div>
  );
}
