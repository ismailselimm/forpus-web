"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { dictionary, type Dict, type Lang } from "@/lib/i18n/dictionary";
import { routeLang } from "@/lib/routes";

type LanguageContextValue = {
  lang: Lang;
  t: Dict;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "forpus-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Route dili dayatıyorsa (/en/*, /blog, /isler) o kazanır. Bu, sunucuda
  // üretilen HTML'de de geçerli: her route ayrı ayrı prerender edildiği için
  // /en/solutions/* sayfaları menüsü ve footer'ı İngilizce çıkıyor.
  const forced = routeLang(pathname);
  const [preferred, setPreferred] = useState<Lang>("tr");
  const lang = forced ?? preferred;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "tr" || stored === "en") setPreferred(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Tercihi kaydediyoruz: ziyaretçi /en/solutions/* üzerinde EN'e basıp sonra
  // ana sayfaya gittiğinde İngilizce kalsın.
  const toggle = useCallback(() => {
    const next = lang === "tr" ? "en" : "tr";
    setPreferred(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: dictionary[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
