"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), reduce ? 200 : 1000);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-bg"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* soft brand glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(95,190,46,0.18), transparent 70%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(30,146,230,0.18), transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.82, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-6 rounded-full bg-cyan/25 blur-2xl"
                style={{ animation: reduce ? undefined : "node-pulse 1.6s ease-in-out infinite" }}
              />
              <Image
                src="/brand/forpus-logo.png"
                alt="Forpus"
                width={96}
                height={96}
                priority
                className="relative h-[84px] w-[84px] object-contain"
              />
            </motion.div>

            <div className="h-[3px] w-44 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--grad-brand)" }}
                initial={{ width: reduce ? "100%" : "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
