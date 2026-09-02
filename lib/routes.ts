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

/**
 * Yalnızca Türkçe yayınlanan bölümler.
 *
 * Hukuki sayfalar da bu listede: metinleri Türk mevzuatına (6698) göre yazıldı
 * ve İngilizce sürümleri yok. Listeye eklenmeselerdi dil değiştirici bu
 * sayfalarda aktif kalır, EN'e basan ziyaretçi menüsü İngilizce, metni Türkçe
 * bir sayfada kalırdı — /blog ve /isler için düzeltilen hatanın aynısı.
 *
 * Adresler lib/hukuki.ts'teki slug'larla aynı. Oradan türetmiyoruz: bu dosya
 * istemci tarafında (LanguageProvider) kullanılıyor, hukuki metinlerin tamamı
 * tarayıcıya inerdi.
 */
const TR_ONLY_PREFIXES = [
  "/blog",
  "/isler",
  "/gizlilik",
  "/kvkk",
  "/kullanim-sartlari",
] as const;

/** İngilizce sürümü ayrı URL'de yayınlanan bölümler. */
const EN_PREFIX = "/en";

/**
 * ÇEVİRİLMİŞ TEKİL SAYFALAR — iki dilde ayrı adreste yayınlanan, koleksiyona
 * ait olmayan sayfalar.
 *
 * Çözüm sayfaları `solutionIndex`ten çözülüyor; iletişim sayfası ise adresi
 * altı yerde elle taşınan bir özel durum olarak eklenmişti (`hrefForLang`,
 * footer, sitemap'te iki giriş, llms.txt, iki metadata dosyası). Slug
 * değişirse derleyici hiçbirini yakalamaz ve dil değiştirici sessizce
 * `null` döner.
 *
 * Yeni bir çevrilmiş sayfa buraya bir satırla ekleniyor; dil değiştirici,
 * sitemap ve footer onu kendiliğinden görüyor.
 *
 * Bu dosya istemci tarafında (LanguageProvider) kullanılıyor, o yüzden burada
 * yalnız adres ve yayın tarihi var — sayfa metni değil.
 */
export type CevrilmisSayfa = {
  /**
   * Kayıt kimliği. NEDEN VAR: koleksiyon tek elemanlıyken üç çağrı yeri
   * `CEVRILMIS_SAYFALAR[0]` yazıyordu (footer, 404, iletişim metadata) —
   * yani "ilk kayıt iletişimdir" varsayımı koda gömülüydü. İkinci kayıt
   * eklendiğinde o üç bağlantı sessizce başka sayfaya dönerdi.
   */
  id: "iletisim" | "cozumler";
  tr: string;
  en: string;
  /** Sitemap `lastModified`i. */
  yayin: string;
  /** Sitemap önceliği, TR sürümü için. EN sürümü bunun 0.2 altında. */
  oncelik: number;
};

export const CEVRILMIS_SAYFALAR: readonly CevrilmisSayfa[] = [
  // Sitenin kimlik çıpası: marka sorgularında ana sayfadan sonra çıkması
  // gereken sayfa bu, o yüzden önceliği yüksek.
  {
    id: "iletisim",
    tr: "/iletisim",
    en: "/en/contact",
    yayin: "2026-08-27",
    oncelik: 0.9,
  },
  // Çözüm hub'ı. Tarih elle: SOLUTIONS_LASTMOD `lib/solutions.ts`te ve o
  // dosya 809 KB — hafif bir rota modülünün onu içe aktarması, ağır dosyayı
  // istemci sınırına bir adım daha yaklaştırırdı.
  // Buraya kaydedilmeden önce sitemap'e elle iki giriş
  // yazılmıştı ve sonucu ölçüldü: `hrefForLang("/cozumler", "en")` null
  // dönüyordu, yani dil değiştirici bu sayfada çalışmıyordu — EN'e basan
  // ziyaretçi Türkçe sayfada menüsü İngilizceye dönmüş hâlde kalıyordu.
  {
    id: "cozumler",
    tr: "/cozumler",
    en: "/en/solutions",
    yayin: "2026-09-02",
    oncelik: 0.9,
  },
];

/** Kimliğe göre kayıt — çağrı yerleri diziyi indeksle aramasın diye. */
export const cevrilmisSayfa = (id: CevrilmisSayfa["id"]): CevrilmisSayfa => {
  const bulunan = CEVRILMIS_SAYFALAR.find((c) => c.id === id);
  if (!bulunan) throw new Error(`CEVRILMIS_SAYFALAR: "${id}" kaydı yok.`);
  return bulunan;
};

/** Bir dilin adresini verir. Footer ve metadata bunu çağırıyor. */
export const cevrilmisYol = (sayfa: CevrilmisSayfa, lang: Lang) =>
  lang === "en" ? sayfa.en : sayfa.tr;

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
  routeLang(pathname) !== "tr";

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
  if (pair)
    return next === "en" ? `/en/solutions/${pair.en}` : `/cozumler/${pair.tr}`;

  const cevrilmis = CEVRILMIS_SAYFALAR.find((c) => n === c.tr || n === c.en);
  if (cevrilmis) return cevrilmisYol(cevrilmis, next);

  return null;
}
