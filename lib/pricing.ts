// Sitede ilan edilen taban fiyat — tek kaynak.
//
// Bu rakam üç yerde görünüyor: ana sayfa meta açıklaması (app/layout.tsx),
// Paketler bölümü (lib/i18n/dictionary.ts) ve sektör sayfalarının fiyat
// bantları (lib/solutions.ts). Sektör bantlarının bunun altına düşmediği
// build zamanında kontrol ediliyor (lib/solutions.ts sonu) — aksi halde
// site "₺50.000'den başlayan" derken bir sayfa ₺40.000 yazabiliyor.
export const PRICE_FLOOR = 50000;

/**
 * Fiyat rakamlarını okumanın tek yeri.
 *
 * NEDEN BURADA: aynı ayrıştırma üç yerde ayrı ayrı yazılmıştı ve üçü aynı
 * şeyi anlamıyordu. Türkçe binlik ayracı nokta, İngilizce virgül; ikisi
 * yalnız noktayı tanıyordu. Bedeli ölçüldü: İngilizce özel yazılım sayfası
 * yapısal veride `lowPrice: 250` yayınlıyordu — `"₺250,000 – 400,000"`
 * ifadesi virgülde kesilip "250" okunuyordu. Google için bu, ₺250.000'lik
 * bir hizmetin 250 TRY olduğu anlamına gelir.
 *
 * İKİ AYRI İŞ, İKİ AYRI FONKSİYON:
 * - `bantRakamlari` bir fiyat bandını okur ("₺50.000 – 85.000"). Bantta ₺
 *   yalnız ilk rakamda durduğu için ₺ aranmaz; bandın iki ucu da lazım.
 * - `fiyatlariOku` düz metni tarar. Orada ₺ ŞART: sayfa metnindeki her sayı
 *   fiyat değil, yalnız ₺'li olan fiyattır.
 *
 * İkisinde de en az bir binlik grubu aranıyor: "₺250" ayraçsız bir yazım
 * olarak fiyat sayılmaz, cümle içindeki bir sayıdır.
 */
const BINLIK = String.raw`\d{1,3}(?:[.,]\d{3})+`;

// Regex yalnız rakam ve ayraç yakalıyor; ayraçlar silinince saf rakam kalıyor,
// yani sonuç her zaman sonlu. `Number.isFinite` kontrolüne gerek yok.
const sayiya = (ham: string) => Number(ham.replace(/[.,]/g, ""));

/** Bir fiyat bandındaki tüm rakamlar: "₺50.000 – 85.000" → [50000, 85000]. */
export function bantRakamlari(metin: string): number[] {
  return [...metin.matchAll(new RegExp(BINLIK, "g"))].map((m) => sayiya(m[0]));
}

/**
 * Düz metindeki ₺ rakamları — ₺ işareti şart, bandın İKİ ucu da okunur.
 *
 * NEDEN BANDI DA TANIYOR: ilk hâli yalnız "₺" ile başlayan sayıyı
 * yakalıyordu. Metinde bant "₺100.000 – 180.000" diye yazılıyor, yani ₺
 * yalnız ilk rakamda duruyor; üst uç HİÇ denetlenmiyordu. Ölçüldü:
 * "₺100.000 – 180.000" ifadesinden yalnız 100.000 dönüyordu. Sonucu şuydu —
 * bandın üst ucuna hiçbir sektörde geçmeyen bir rakam yazılsa build sessizce
 * geçerdi, oysa `assertBlogFiyatlari`ın var olma sebebi tam olarak bu.
 */
const BANT = new RegExp(
  "₺(" + BINLIK + ")(?:\\s*[–—-]\\s*(" + BINLIK + "))?",
  "g",
);

export function fiyatlariOku(metin: string): number[] {
  return [...metin.matchAll(BANT)].flatMap((m) =>
    m[2] ? [sayiya(m[1]), sayiya(m[2])] : [sayiya(m[1])],
  );
}

/** Bir fiyat bandının alt ucu — yapısal verideki `lowPrice` bu. */
export function ilkFiyat(metin: string | undefined): number | undefined {
  return metin ? bantRakamlari(metin)[0] : undefined;
}
