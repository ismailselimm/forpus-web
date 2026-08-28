import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/fx/Reveal";
import type { BlogPost } from "@/lib/blog";

/**
 * YAZI LİSTESİ — başlık, alt başlık ve bağlantı listesi.
 *
 * NEDEN VAR: iç bağlantı grafiği ölçüldüğünde beş blog yazısının HER
 * BİRİNE tek bir bağlantı geliyordu, o da /blog listesinden. Aynı ölçümde
 * /isler, /blog ve hukuki sayfalar 56 bağlantı alıyordu — çünkü footer
 * sitenin her sayfasında. Yani uzun kuyruk sorgular için en değerli
 * varlığımız, grafiğin en zayıf ucundaydı.
 *
 * BİLEŞENİN İŞİ SORGULAMAK DEĞİL ÇİZMEK. Önce sektör anahtarı alıp yazıları
 * kendisi buluyordu; ikinci çağıran (blog yazısının sonundaki "bunları da
 * okuyun") gelince o kabul çöktü — orada eşleşme sektöre göre değil,
 * yazılar arasındaki ortak konuya göre. Hangi yazıların ilgili olduğu
 * `lib/blog.ts`in bilgisi; nasıl göründükleri buranın.
 *
 * Gerçek `<ul>` + `<li>`: bunlar sıralı olmayan ama bir arada anlamı olan
 * öğeler ve makinenin onları liste olarak görmesi gerekiyor.
 */
export default function YaziListesi({
  yazilar,
  baslik,
  lead,
  className = "section !pt-0",
}: {
  yazilar: BlogPost[];
  baslik: string;
  lead?: string;
  className?: string;
}) {
  if (yazilar.length === 0) return null;

  return (
    <section className={className}>
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-display text-[1.3rem] font-bold tracking-tight text-ink">
              {baslik}
            </h2>
            {lead && <p className="mt-2 text-[0.95rem] text-ink-2">{lead}</p>}
          </Reveal>

          <ul className="mt-6 divide-y divide-line border-t border-line">
            {yazilar.map((y, i) => (
              <Reveal key={y.slug} delay={i * 0.05} as="li">
                <Link
                  href={`/blog/${y.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-ink"
                >
                  <span className="font-medium text-ink">{y.title}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-deep motion-reduce:transform-none" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
