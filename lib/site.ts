// Single source of truth for the canonical site origin (used by metadata, sitemap,
// robots, JSON-LD and the SEO landing pages).
export const SITE_URL = "https://forpusyazilim.com";

/**
 * SOSYAL HESAPLAR — tek kaynak.
 *
 * Footer ve iletişim bölümü aynı listeyi okuyor. Önceden ikisi de kendi
 * dizisini taşıyordu ve her ikisinde de `href="#"` yazıyordu: ikonlar
 * görünüyor, tıklanınca hiçbir yere gitmiyordu. Ziyaretçi için bu, olmayan
 * bir bağlantıdan daha kötü — var sanıp tıklıyor.
 *
 * `href` boş bırakılan hesap HİÇ ÇİZİLMİYOR (bkz. `aktifSosyal`). WhatsApp
 * numarası geldiğinde tek satır doldurulacak, iki ekranda birden çıkacak.
 */
export type SosyalHesap = {
  ad: "Instagram" | "Facebook" | "LinkedIn" | "WhatsApp";
  href: string;
};

export const SOSYAL: SosyalHesap[] = [
  { ad: "Instagram", href: "https://www.instagram.com/forpusyazilim" },
  { ad: "Facebook", href: "https://www.facebook.com/1250844311452202" },
  { ad: "LinkedIn", href: "https://www.linkedin.com/company/forpusyazilim" },
  // WhatsApp numarası henüz yok. Boş kaldığı sürece ikon çizilmiyor —
  // "yakında" diye ölü bir bağlantı bırakmıyoruz.
  { ad: "WhatsApp", href: "" },
];

/** Yalnız adresi tanımlı olanlar. */
export const aktifSosyal = (): SosyalHesap[] => SOSYAL.filter((h) => h.href !== "");
