import type { Lang } from "./i18n/dictionary";

/**
 * Route ↔ dil ilişkisi — tek kaynak.
 *
 * Sitenin dil modeli üç gruba ayrılıyor ve bu bilgi daha önce hiçbir yerde
 * yazılı değildi. Sonuçları gerçekti:
 *  - /en/solutions/* sayfalarında gövde İngilizce ama menü, footer ve
 *    `html lang` Türkçe kalıyordu. Google'ın gördüğü hal buydu.
 *  - /blog ve /isler tek dilli olduğu halde dil değiştirici aktifti;
 *    EN'e basan ziyaretçi menüsü İngilizce, yazısı Türkçe bir sayfada kalıyordu.
 */

/** Yalnızca Türkçe yayınlanan bölümler. */
const TR_ONLY_PREFIXES = ["/blog", "/isler"] as const;

/** İngilizce sürümü ayrı URL'de yayınlanan bölümler. */
const EN_PREFIX = "/en";

/**
 * Yolu karşılaştırılabilir hale getirir: sondaki eğik çizgi ve `.html` uzantısı
 * atılır. Statik export dosyaları `foo.html` olarak üretiyor; canlıda GitHub
 * Pages bunu `/foo` olarak sunuyor ama dosya doğrudan açıldığında (yerel test,
 * bazı önizleme sunucuları) yol `.html` ile geliyor ve eşleşme tutmuyordu.
 */
export const normalizePath = (pathname: string) => {
  const p = pathname.replace(/\.html$/, "").replace(/\/+$/, "");
  return p === "" || p === "/index" ? "/" : p;
};

const hasPrefix = (pathname: string, p: string) => {
  const n = normalizePath(pathname);
  return n === p || n.startsWith(`${p}/`);
};

/**
 * Route dili dayatıyorsa onu döndürür, ziyaretçinin tercihine bırakıyorsa null.
 * Bugün yalnızca ana sayfa aynı URL'de iki dil sunuyor.
 */
export function routeLang(pathname: string): Lang | null {
  if (hasPrefix(pathname, EN_PREFIX)) return "en";
  if (TR_ONLY_PREFIXES.some((p) => hasPrefix(pathname, p))) return "tr";
  return null;
}

/** Dil değiştirici gösterilmeli mi? Tek dilli bölümlerde anlamsız. */
export const isBilingualRoute = (pathname: string) =>
  !TR_ONLY_PREFIXES.some((p) => hasPrefix(pathname, p));

/**
 * Dil değiştirilince gidilecek adres.
 *
 * Çözüm sayfalarında iki dilin ayrı URL'i var; toggle'ın sayfada kalıp
 * yalnızca menüyü çevirmesi yanlış olurdu — karşı dildeki eşine gitmeli.
 * Eşi yoksa (ana sayfa) aynı adreste kalır ve dil istemci tarafında değişir.
 */
export function hrefForLang(
  pathname: string,
  next: Lang,
  solutionPair?: { tr: string; en: string },
): string | null {
  if (solutionPair) {
    return next === "en" ? `/en/solutions/${solutionPair.en}` : `/cozumler/${solutionPair.tr}`;
  }
  const n = normalizePath(pathname);
  if (n === "/" || n === "/en") return next === "en" ? "/en" : "/";
  return null;
}
