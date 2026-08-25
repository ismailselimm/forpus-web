import type { Lang } from "./i18n/dictionary";
import { solutionIndex } from "./solution-index";

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
export const isBilingualRoute = (pathname: string) => routeLang(pathname) !== "tr";

/** O dilin ana sayfası. "Ana sayfa = /" varsayımı üç yerde sabit yazılıydı. */
export const homeFor = (lang: Lang) => (lang === "en" ? "/en" : "/");

/** Bu adres bir ana sayfa mı? Bölüm çıpalarının göreli kalması buna bağlı. */
export const isHome = (pathname: string) => {
  const n = normalizePath(pathname);
  return n === "/" || n === "/en";
};

/**
 * Dil değiştirilince gidilecek adres.
 *
 * Çözüm sayfalarında iki dilin ayrı URL'i var; toggle'ın sayfada kalıp
 * yalnızca menüyü çevirmesi yanlış olurdu — karşı dildeki eşine gitmeli.
 * Eşi yoksa (ana sayfa) aynı adreste kalır ve dil istemci tarafında değişir.
 */
export function hrefForLang(pathname: string, next: Lang): string | null {
  if (isHome(pathname)) return homeFor(next);

  // Çevrilmiş sayfa çiftleri burada aranıyor; çağıranın URL şekillerini
  // bilmesi gerekmiyor. Blog/vaka İngilizce yayınlandığında yeni bir kayıt
  // eklenecek, çağrı noktalarına dokunulmayacak.
  const n = normalizePath(pathname);
  const pair = solutionIndex.find(
    (s) => n === `/cozumler/${s.slug.tr}` || n === `/en/solutions/${s.slug.en}`,
  )?.slug;
  if (pair) return next === "en" ? `/en/solutions/${pair.en}` : `/cozumler/${pair.tr}`;

  return null;
}
