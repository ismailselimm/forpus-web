import { clsx } from "clsx";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import Breadcrumb, { type Crumb } from "@/components/ui/Breadcrumb";

/**
 * Sayfa başlığı kabuğu — kırıntı, eyebrow, h1 ve giriş.
 *
 * Aynı kabuk beş yerde kopyalanmıştı. `pt-32 sm:pt-40` aslında nav yüksekliğine
 * bağlı bir kural; beş dosyada sabit yazılı olması, nav boyu değiştiğinde
 * hepsinin elle güncellenmesi demekti.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  className,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  /** Başlığın altına ek içerik (etiketler, tarih, CTA). */
  children?: React.ReactNode;
}) {
  return (
    <section
      className={clsx("section relative overflow-hidden bg-bg-2/50 pt-32 sm:pt-40", className)}
    >
      <Aurora className="opacity-60" />
      <div className="container-x relative z-10">
        <Breadcrumb items={crumbs} />
        <Reveal>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className={clsx("h-section text-balance", eyebrow && "mt-5")}>{title}</h1>
          {lead && <p className="lead mt-6 max-w-2xl">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
