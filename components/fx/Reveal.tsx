"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Hangi etiketle çizileceği. Varsayılan `div`.
 *
 * NEDEN VAR: `Reveal` her zaman bir `<div>` basıyordu ve liste öğelerinin
 * ETRAFINA sarıldığında araya o div giriyordu — `<ol> › <div> › <li>`.
 * Bu HTML'de geçersiz: `<li>` doğrudan `ul/ol/menu` çocuğu olmak zorunda.
 * Lighthouse üç ayrı denetimde birden düşürüyordu (`list`, `listitem`) ve
 * sonuç sadece erişilebilirlik değil: tarayıcı da, ekran okuyucu da, sayfayı
 * ayrıştıran yapay zekâ da o bloğu LİSTE OLARAK GÖRMÜYORDU.
 *
 * Kayıp somuttu: ana sayfadaki "Süreç" — sıralı, numaralı, dört adımlık
 * gerçek bir dizi — ve 17 sektör sayfasının fayda + süreç listeleri.
 * Yapay zekâ aramalarında alıntılanmaya en yatkın içerik biçimi liste;
 * o yapı görünmezse metin, birbirinden kopuk paragraflar yığını oluyor.
 *
 * DÜZELTME BURADA, ÇAĞIRANLARDA DEĞİL: üç ayrı dosyada `<li>`yi dışarı
 * taşımak aynı hatayı bir sonraki listede tekrar üretirdi. `Reveal`ın
 * hangi etiketi bastığı onun kendi kararı; dışarıdan söylenebilir olması
 * gereken de tam olarak buydu.
 */
type Etiket = "div" | "li";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Etiketi = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: Etiket;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <Etiketi className={className}>{children}</Etiketi>;

  const Hareketli = motion[Etiketi];
  return (
    <Hareketli
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </Hareketli>
  );
}
