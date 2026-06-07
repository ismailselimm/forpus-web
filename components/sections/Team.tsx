"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import {
  Smartphone,
  Code2,
  Palette,
  Megaphone,
  PenTool,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/fx/Reveal";
import Aurora from "@/components/fx/Aurora";
import { useLang } from "@/components/providers/LanguageProvider";

const FOUNDER_ICONS: LucideIcon[] = [Smartphone, Code2];
const TEAM_ICONS: LucideIcon[] = [Palette, Megaphone, PenTool, Users];

// Constellation node centers (% of the canvas) for the desktop layout.
const FOUNDER_POS = [
  { x: 18, y: 30 },
  { x: 82, y: 70 },
];
const TEAM_POS = [
  { x: 72, y: 15 },
  { x: 90, y: 44 },
  { x: 10, y: 56 },
  { x: 28, y: 85 },
];
const LINE_TARGETS = [...FOUNDER_POS, ...TEAM_POS];

function CenterNode({ size = "h-28 w-28", logo = "h-16 w-16" }: { size?: string; logo?: string }) {
  return (
    <div
      className={`relative grid ${size} place-items-center rounded-full border border-white/70 bg-white/85 shadow-[var(--shadow-card)] backdrop-blur`}
    >
      <div
        aria-hidden="true"
        className="node-pulse absolute -inset-3 -z-10 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(17,205,217,0.4), transparent 70%)" }}
      />
      <Image src="/brand/forpus-logo.png" alt="Forpus" width={80} height={80} className={`${logo} object-contain`} />
    </div>
  );
}

function FounderCard({
  focus,
  role,
  bio,
  Icon,
}: {
  focus: string;
  role: string;
  bio: string;
  Icon: LucideIcon;
}) {
  return (
    <article className="glass-card border-gradient w-full p-5 sm:p-6">
      <div className="flex items-center gap-3.5">
        <div
          className="grid h-12 w-12 flex-none place-items-center rounded-xl text-white shadow-[var(--shadow-glow)]"
          style={{ background: "var(--grad-brand)" }}
        >
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <h3 className="text-[1.08rem] font-bold leading-tight tracking-tight text-ink">{focus}</h3>
          <p className="text-xs font-medium text-ink-3">{role}</p>
        </div>
      </div>
      <p className="mt-3.5 text-[0.86rem] leading-relaxed text-ink-2">{bio}</p>
    </article>
  );
}

function TeamChip({ label, Icon }: { label: string; Icon: LucideIcon }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white/85 px-3.5 py-2 text-[0.85rem] font-semibold text-ink-2 shadow-[var(--shadow-soft)] backdrop-blur">
      <span
        className="grid h-6 w-6 flex-none place-items-center rounded-full text-white"
        style={{ background: "var(--grad-brand)" }}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
      {label}
    </span>
  );
}

export default function Team() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const wrap = wrapRef.current;
    const scene = sceneRef.current;
    if (!wrap || !scene) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        scene.style.transform = `translate(${nx * -18}px, ${ny * -18}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      scene.style.transform = "";
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  const founders = t.team.founders;
  const extended = t.team.extended;

  return (
    <section id="team" className="section relative overflow-hidden bg-bg-2/60">
      <Aurora className="opacity-50" />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{t.team.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{t.team.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mt-5 max-w-xl">{t.team.subtitle}</p>
          </Reveal>
        </div>

        {/* Desktop: connection constellation */}
        <Reveal delay={0.12}>
          <div
            ref={wrapRef}
            className="relative mx-auto mt-12 hidden h-[600px] w-full max-w-5xl lg:block"
          >
            <div ref={sceneRef} className="absolute inset-0 transition-transform duration-300 ease-out">
              {/* connection lines */}
              <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="teamLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5fbe2e" />
                    <stop offset="50%" stopColor="#11cdd9" />
                    <stop offset="100%" stopColor="#1e92e6" />
                  </linearGradient>
                </defs>
                {LINE_TARGETS.map((p, i) => (
                  <line
                    key={i}
                    x1="50%"
                    y1="50%"
                    x2={`${p.x}%`}
                    y2={`${p.y}%`}
                    stroke="url(#teamLine)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    className="team-line"
                    style={{ opacity: 0.45 }}
                  />
                ))}
              </svg>

              {/* center */}
              <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "50%" }}>
                <CenterNode />
              </div>

              {/* founders */}
              {founders.map((f, i) => (
                <div
                  key={i}
                  className="absolute w-[clamp(230px,23vw,290px)] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${FOUNDER_POS[i].x}%`, top: `${FOUNDER_POS[i].y}%` }}
                >
                  <FounderCard
                    focus={f.focus}
                    role={f.role}
                    bio={f.bio}
                    Icon={FOUNDER_ICONS[i % FOUNDER_ICONS.length]}
                  />
                </div>
              ))}

              {/* extended team */}
              {extended.map((label, i) => (
                <div
                  key={label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${TEAM_POS[i % TEAM_POS.length].x}%`, top: `${TEAM_POS[i % TEAM_POS.length].y}%` }}
                >
                  <TeamChip label={label} Icon={TEAM_ICONS[i % TEAM_ICONS.length]} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Tablet / mobile: clean stacked layout */}
        <div className="mt-12 lg:hidden">
          <Reveal>
            <div className="mx-auto mb-9 w-fit">
              <CenterNode size="h-24 w-24" logo="h-14 w-14" />
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <FounderCard
                  focus={f.focus}
                  role={f.role}
                  bio={f.bio}
                  Icon={FOUNDER_ICONS[i % FOUNDER_ICONS.length]}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-col items-center gap-5 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink-2">
                {t.team.extendedTitle}
              </h3>
              <div className="flex flex-wrap justify-center gap-2.5">
                {extended.map((label, i) => (
                  <TeamChip key={label} label={label} Icon={TEAM_ICONS[i % TEAM_ICONS.length]} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
