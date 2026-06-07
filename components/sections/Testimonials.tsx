"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import Aurora from "@/components/fx/Aurora";
import { Reveal } from "@/components/fx/Reveal";
import { useLang } from "@/components/providers/LanguageProvider";

export default function Testimonials() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const messages = t.testimonials.messages;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.5, delayChildren: 0.15 } },
  };
  const bubble: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
      };

  return (
    <section id="testimonials" className="section relative overflow-hidden">
      <Aurora className="opacity-40" />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">{t.testimonials.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 whitespace-pre-line">{t.testimonials.title}</h2>
          </Reveal>
        </div>

        {/* Chat panel */}
        <Reveal delay={0.1}>
          <div className="glass-card mx-auto mt-12 max-w-xl overflow-hidden">
            {/* chat header */}
            <div className="flex items-center gap-3 border-b border-line bg-white/55 px-5 py-3.5">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white">
                <Image src="/brand/forpus-logo.png" alt="Forpus" width={26} height={26} className="h-6 w-6 object-contain" />
              </div>
              <div className="leading-tight">
                <div className="font-[family-name:var(--font-display)] text-[1.02rem] font-extrabold text-ink">
                  Forpus
                </div>
                <div className="flex items-center gap-1.5 text-xs text-green-deep">
                  <span className="h-1.5 w-1.5 rounded-full bg-green" />
                  {t.testimonials.online}
                </div>
              </div>
            </div>

            {/* messages */}
            <motion.div
              className="flex flex-col gap-3 px-4 py-6 sm:px-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {messages.map((m, i) => {
                const isForpus = m.from === "forpus";
                const prev = messages[i - 1];
                const author = "author" in m ? m.author : undefined;
                const company = "company" in m ? m.company : undefined;
                const prevAuthor = prev && "author" in prev ? prev.author : undefined;
                const showMeta = !isForpus && author !== undefined && prevAuthor !== author;
                const initial = (author ?? "").trim().charAt(0).toUpperCase();

                return (
                  <motion.div
                    key={i}
                    variants={bubble}
                    className={`flex max-w-[86%] items-end gap-2.5 ${
                      isForpus ? "flex-row-reverse self-end" : "self-start"
                    }`}
                  >
                    {/* avatar */}
                    {isForpus ? (
                      <div className="grid h-8 w-8 flex-none place-items-center rounded-full border border-line bg-white">
                        <Image src="/brand/forpus-logo.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                      </div>
                    ) : (
                      <div
                        className="grid h-8 w-8 flex-none place-items-center rounded-full font-[family-name:var(--font-display)] text-xs font-bold text-white"
                        style={{ background: "var(--grad-brand)" }}
                        aria-hidden
                      >
                        {initial}
                      </div>
                    )}

                    <div className={isForpus ? "text-right" : "text-left"}>
                      {showMeta && (
                        <div className="mb-1 ml-1 text-[0.7rem] font-semibold text-ink-3">
                          {author} · {company}
                        </div>
                      )}
                      <div
                        className={
                          isForpus
                            ? "rounded-2xl rounded-br-md px-4 py-2.5 text-left text-[0.95rem] leading-relaxed text-white shadow-[var(--shadow-glow)]"
                            : "rounded-2xl rounded-bl-md border border-line bg-white px-4 py-2.5 text-left text-[0.95rem] leading-relaxed text-ink shadow-sm"
                        }
                        style={isForpus ? { background: "var(--grad-brand)" } : undefined}
                      >
                        {m.text}
                        <span
                          className={`mt-1 flex items-center justify-end gap-1 text-[0.62rem] ${
                            isForpus ? "text-white/75" : "text-ink-3"
                          }`}
                        >
                          {m.time}
                          {isForpus && (
                            <span className="inline-flex" aria-hidden>
                              <Check className="-mr-1.5 h-3 w-3" strokeWidth={3} />
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* typing indicator */}
              <motion.div variants={bubble} className="flex items-end gap-2.5 self-start">
                <div
                  className="h-8 w-8 flex-none rounded-full opacity-60"
                  style={{ background: "var(--grad-brand)" }}
                  aria-hidden
                />
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3.5 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-ink-3"
                      style={{
                        animation: reduce ? undefined : "node-pulse 1s ease-in-out infinite",
                        animationDelay: `${d * 0.18}s`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
