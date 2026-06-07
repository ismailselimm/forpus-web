"use client";

import { ArrowUp, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useLang } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { t } = useLang();

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: MessageCircle, href: "#", label: "WhatsApp" },
    { icon: Mail, href: `mailto:${t.contact.info.email}`, label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2/60">
      <div className="container-x relative z-10 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center">
              <Logo variant="full" className="h-9 w-auto" />
            </div>
            <p className="mt-5 max-w-xs text-[0.97rem] leading-relaxed text-ink-2">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/70 text-ink-2 transition-all hover:-translate-y-0.5 hover:border-cyan hover:text-cyan-deep"
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
              {t.footer.nav}
            </h4>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-2">
              <li><a href="#services" className="inline-block origin-left transition-transform duration-300 hover:scale-[1.06] hover:text-ink">{t.nav.services}</a></li>
              <li><a href="#work" className="inline-block origin-left transition-transform duration-300 hover:scale-[1.06] hover:text-ink">{t.nav.work}</a></li>
              <li><a href="#process" className="inline-block origin-left transition-transform duration-300 hover:scale-[1.06] hover:text-ink">{t.nav.process}</a></li>
              <li><a href="#team" className="inline-block origin-left transition-transform duration-300 hover:scale-[1.06] hover:text-ink">{t.nav.team}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
              {t.footer.services}
            </h4>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-2">
              {t.services.items.map((s) => (
                <li key={s.key}>
                  <a href="#services" className="inline-block origin-left transition-transform duration-300 hover:scale-[1.06] hover:text-ink">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
              {t.footer.contact}
            </h4>
            <ul className="space-y-2.5 text-[0.95rem] text-ink-2">
              <li>
                <a href={`mailto:${t.contact.info.email}`} className="inline-block origin-left transition-transform duration-300 hover:scale-[1.06] hover:text-ink">
                  {t.contact.info.email}
                </a>
              </li>
              <li>{t.contact.info.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Forpus Yazılım. {t.footer.rights}
          </p>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 font-medium text-ink-2 transition-all hover:-translate-y-0.5 hover:text-ink"
          >
            {t.footer.backToTop}
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Oversized brand watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-[3vw] left-1/2 -translate-x-1/2 font-[family-name:var(--font-display)] text-[26vw] font-black leading-none tracking-tighter text-gradient opacity-[0.07]"
      >
        forpus
      </div>
    </footer>
  );
}
