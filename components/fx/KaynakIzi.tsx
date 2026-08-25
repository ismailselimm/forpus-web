"use client";

import { useEffect } from "react";
import { iziYakala } from "@/lib/kaynak-izi";

/**
 * Ziyaretçinin geldiği kaynağı iniş anında yakalar.
 *
 * Kök düzende duruyor çünkü iz, kullanıcının indiği İLK sayfada alınmalı:
 * reklamdan bir blog yazısına inip sonra iletişime giden birinde, form
 * açıldığında URL'deki kampanya etiketleri çoktan kaybolmuş oluyor.
 *
 * Hiçbir şey render etmiyor ve hiçbir şeyi bloklamıyor.
 */
export default function KaynakIzi() {
  useEffect(() => {
    iziYakala();
  }, []);
  return null;
}
