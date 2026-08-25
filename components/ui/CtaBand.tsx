import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { Reveal } from "@/components/fx/Reveal";
import Magnetic from "@/components/fx/Magnetic";

/**
 * Koyu gradyan CTA bandı.
 *
 * Aynı 28 satırlık markup üç sayfa bileşeninde birebir kopyalanmıştı
 * (SolutionArticle, BlogArticle, CaseArticle). Marka rengini veya gölgeyi
 * değiştirmek üç dosyaya dokunmak demekti.
 */
export default function CtaBand({
  title,
  text,
  button,
  href = "/#contact",
  className,
}: {
  title: string;
  text: string;
  button: string;
  href?: string;
  className?: string;
}) {
  return (
    <section className={clsx("section relative overflow-hidden", className)}>
      <div className="container-x relative z-10">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[var(--r-lg)] px-7 py-14 text-center shadow-[var(--shadow-card)] sm:px-12 sm:py-16"
            style={{ background: "var(--grad-ink)" }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-green/15 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-[family-name:var(--font-display)] text-[1.7rem] font-extrabold tracking-tight !text-white sm:text-[2.2rem]">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/75">{text}</p>
              <div className="mt-8 flex justify-center">
                <Magnetic>
                  <a href={href} className="btn btn-primary">
                    {button}
                    <ArrowUpRight className="h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
