// Sitede ilan edilen taban fiyat — tek kaynak.
//
// Bu rakam üç yerde görünüyor: ana sayfa meta açıklaması (app/layout.tsx),
// Paketler bölümü (lib/i18n/dictionary.ts) ve sektör sayfalarının fiyat
// bantları (lib/solutions.ts). Sektör bantlarının bunun altına düşmediği
// build zamanında kontrol ediliyor (lib/solutions.ts sonu) — aksi halde
// site "₺50.000'den başlayan" derken bir sayfa ₺40.000 yazabiliyor.
export const PRICE_FLOOR = 50000;
