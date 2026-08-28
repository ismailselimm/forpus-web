/**
 * SEKTÖR SAYFALARININ ARAYÜZ METİNLERİ — kendi dosyasında.
 *
 * NEDEN TAŞINDI: `lib/solutions.ts`in içindeydi. O dosya 4.119 satır ve
 * sektör başına 900+ kelime pazarlama metni taşıyor; ilk kuralı istemci
 * paketine ASLA girmemek. `lib/solution-index.ts` tam da bu yüzden var ve
 * başlığında ölçülen bedel yazılı: bir kez girdiğinde sayfa başına
 * +28 kB gzip.
 *
 * Ama `solutionUi` o korumanın DIŞINDAydı. Onu içe aktaran yedi dosyanın
 * yedisi de bugün sunucu bileşeni — yani sızıntı yok. Sorun, bir gün
 * birine `"use client"` eklendiğinde 248 kB'lık içerik dosyasının sessizce
 * peşinden gelecek olması. Bir avuç arayüz dizesi için bütün metin
 * kütüphanesine bağlanmanın hiçbir sebebi yok.
 *
 * `solution-index.ts` verinin hafif tarafını, bu dosya arayüzün hafif
 * tarafını taşıyor; ikisi de ağır dosyaya dokunmadan okunabiliyor.
 */
export const solutionUi: Record<
  "tr" | "en",
  {
    home: string;
    more: string;
    moreLead: string;
    seeAll: string;
    islerEyebrow: string;
    /** "%s" sektör etiketiyle değişiyor. */
    islerBaslik: string;
    islerLead: string;
    isiIncele: string;
    yazilarBasligi: string;
    yazilarLead: string;
  }
> = {
  tr: {
    home: "Ana Sayfa",
    more: "Diğer çözümler",
    moreLead:
      "Başka bir alanda mı çalışıyorsunuz? Size uygun çözümü birlikte bulalım.",
    seeAll: "Tüm hizmetleri gör",
    islerEyebrow: "Gerçek işler",
    islerBaslik: "%s tarafında yaptığımız işler",
    islerLead:
      "Ekran görüntüsü değil, canlı siteler. Her birinin neye ihtiyaç duyduğunu ve ne kurduğumuzu ayrı ayrı yazdık.",
    isiIncele: "İşi incele",
    yazilarBasligi: "Karar vermeden önce",
    yazilarLead:
      "Bu alanda en çok sorulan şeyleri ayrı ayrı yazdık — fiyat, süreç ve dikkat edilecekler.",
  },
  en: {
    home: "Home",
    more: "Other solutions",
    moreLead:
      "Working in a different field? Let's find the right fit together.",
    seeAll: "See all services",
    islerEyebrow: "Real work",
    islerBaslik: "What we built for %s clients",
    islerLead:
      "Live sites, not mockups. We wrote up what each one needed and what we built.",
    isiIncele: "See the project",
    yazilarBasligi: "Before you decide",
    yazilarLead:
      "We wrote up the questions that come up most — pricing, process and what to watch for.",
  },
};
