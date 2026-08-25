import Link from "next/link";

export type Crumb = { label: string; href?: string };

/**
 * Kırıntı navigasyonu. Son eleman bağlantısızdır (mevcut sayfa).
 *
 * Aynı markup beş yerde kopyalanmıştı ve şimdiden ayrışmıştı: bir kopyada
 * `flex-wrap` vardı, diğerinde yoktu.
 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="breadcrumb"
      className="mb-8 flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.16em] text-ink-3"
    >
      {items.map((c, i) => (
        <span key={c.label} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>/</span>}
          {c.href ? (
            <Link href={c.href} className="transition-colors hover:text-ink">
              {c.label}
            </Link>
          ) : (
            <span className="text-ink-2">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/** Aynı kırıntı listesinden JSON-LD üretir — JSX ile şemanın ayrışmasını önler. */
export function breadcrumbLd(items: Crumb[], site: string, currentUrl: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? `${site}${c.href}` : currentUrl,
    })),
  };
}
