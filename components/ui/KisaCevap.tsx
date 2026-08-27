import { clsx } from "clsx";

import { Reveal } from "@/components/fx/Reveal";
import type { KisaCevapIcerigi } from "@/lib/kisa-cevap";

/**
 * KISA CEVAP — sayfanın tepesinde duran, tek başına ayakta kalan pasaj.
 *
 * ÖLÇÜMDEN DOĞDU: canlı sitede sayfa tipi tipi taranınca en uzun paragraf
 * ana sayfada 25, blog yazılarında 39 kelimeydi. Yapay zekâ aramaları bir
 * sayfadan cümle değil PASAJ alıntılıyor; ölçülen en verimli uzunluk
 * 134-167 kelime ve alıntıların %44'ü sayfanın ilk %30'undan çıkıyor.
 * Sitede o boyda tek bir blok yoktu.
 *
 * KUTU DEĞİL: başlık bir SORU, altında tek paragraf. Etiketli bir "özet
 * kutusu" okuyucuya "burayı atla" der; sorusu sorulmuş bir cevap okutur.
 * Soldaki ince çizgi süreç zaman çizelgesindeki `--grad-brand` — yeni bir
 * görsel dil değil, evin kendi dili.
 *
 * PAYLAŞILAN: sektör sayfaları ve blog yazıları aynı bloğu kullanıyor.
 * İkisine ayrı ayrı yazılsaydı ilk düzenlemede ayrışırdı; oysa bu blok bir
 * bölüm değil, bir SÖZLEŞME — "bu sayfanın cevabı burada" demenin tek yolu
 * her yerde aynı görünmek zorunda.
 *
 */
export default function KisaCevap({
  icerik,
  className,
}: {
  icerik: KisaCevapIcerigi;
  /**
   * Bölüm boşluğunu AYARLAR, sıfırlamaz. Önce `className ?? "section …"`
   * yazılmıştı ve verildiği an `.section`ı tamamen düşürüyordu: blog
   * çağıranı `!pt-0 !pb-0` verince `.section`ın kendi dolgusu da gidiyor,
   * geriye hiçbir şeyi ezmeyen iki ölü bayrak kalıyordu. `PageHero` ve
   * `SolutionChips` bu birleştirmeyi zaten `clsx` ile yapıyor.
   */
  className?: string;
}) {
  return (
    <section className={clsx("section", className)}>
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="relative pl-6 sm:pl-8">
              <span
                aria-hidden
                className="absolute inset-y-1 left-0 w-[3px] rounded-full"
                style={{ background: "var(--grad-brand)" }}
              />
              <h2
                className={
                  "font-display text-[1.35rem] font-bold tracking-tight text-balance text-ink sm:text-[1.5rem]"
                }
              >
                {icerik.title}
              </h2>
              <p className="mt-4 text-[1.02rem] leading-[1.75] text-ink-2">
                {icerik.body}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
