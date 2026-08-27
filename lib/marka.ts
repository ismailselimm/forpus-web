/**
 * MARKA KİMLİĞİ — Forpus'un dışarıya görünen hesapları.
 *
 * Ayrı dosyada, `site.ts`te değil: `site.ts` derleme zamanı kökeni tutuyor ve
 * sitemap, robots, metadata gibi 12 modül oradan yalnız `SITE_URL` çekiyor.
 * O dosyanın İÇE AKTARMASIZ kalması bilinçli — biri oraya bir import
 * eklediği gün istemci paketine girer. Buradaki liste ise hem sunucuda
 * (JSON-LD) hem istemcide (footer, iletişim) okunuyor.
 */

/**
 * İletişim adresi. Çevrilebilir bir içerik DEĞİL: sözlükte `emailLabel`
 * ("E-posta" / "Email") çevriliyor ama adresin kendisi iki dilde de aynı.
 * Yine de altı yerde ayrı ayrı yazılıydı — ikisi sözlüğün iki dilinde,
 * ikisi JSON-LD'de, biri KVKK modülünde, biri llms.txt'te. Adresi
 * değiştirmek altı dosyaya dokunmak demekti ve derleyici yardım etmiyordu;
 * sessizce ayrışacak olan da KVKK md.11 başvuru adresiydi, yani yasal
 * yükümlülük taşıyan kopya.
 */
export const EPOSTA = "forpusyazilim@gmail.com";

/**
 * WHATSAPP — bir kanal. Neden `SOSYAL_PROFILLER`de olmadığı orada yazılı.
 *
 * NEDEN FONKSİYON: adres sayfadan sayfaya değişiyor. Diş hekimi sayfasından
 * yazan biri "diş hekimi web sitesi için" diye başlamalı; hangi sayfadan
 * geldiği mesajın İÇİNDE taşınıyor, çünkü WhatsApp tıklaması siteden
 * çıkıyor ve `kaynak-izi` onu takip edemiyor. Atıf, mesajın kendisi.
 */
const WHATSAPP_NUMARA = "905016703494";

/**
 * İnsana gösterilen hâli — numaradan TÜRETİLİYOR.
 *
 * İkisi elle yazıldığında numara değişince birini güncelleyip diğerini
 * unutmak sessizce yanlış numara gösterirdi; derleyici uyarmazdı.
 */
export const WHATSAPP_GORUNEN = WHATSAPP_NUMARA.replace(
  /^90(\d{3})(\d{3})(\d{2})(\d{2})$/,
  "0$1 $2 $3 $4",
);

/**
 * Ön doldurulmuş WhatsApp adresi.
 *
 * `wa.me` bilerek: WhatsApp'ın kendi kısa adresi, hem uygulamayı hem
 * WhatsApp Web'i doğru açıyor ve numara İşletme hesabına çevrilse de
 * çalışmaya devam ediyor. `api.whatsapp.com` masaüstünde araya bir
 * karşılama sayfası sokuyor.
 */
export const whatsappBaglantisi = (mesaj?: string) =>
  `https://wa.me/${WHATSAPP_NUMARA}${mesaj ? `?text=${encodeURIComponent(mesaj)}` : ""}`;

/**
 * KONUM — kimliğin, sitenin en uzun süre eksik kalan parçası.
 *
 * Site adresini hiçbir yerde yazmıyor, "Uzaktan çalışıyoruz" diyordu; bu bir
 * yer değil bir çalışma biçimi. Google'ın bir işletmeyi yerel olarak
 * tanıyabilmesi için beyan edilmiş bir ile ihtiyacı var ve o beyan sitenin
 * her sayfasında aynı olmak zorunda.
 *
 * SOKAK ADRESİ VE TELEFON BİLEREK YOK: ikisi de doğrulanabilir olmalı.
 * Yapısal veriye bugün doğrulanamayan bir adres yazmak, Google Business
 * Profile açıldığı gün iki farklı adres beyanı demek olurdu — yerel aramada
 * güveni bozan tam olarak bu tutarsızlık. Ofis kesinleşince buraya yazılacak
 * ve sitenin tamamı tek seferde güncellenecek.
 */
export const SEHIR = { tr: "İstanbul", en: "Istanbul" } as const;
export const ULKE = { tr: "Türkiye", en: "Türkiye" } as const;

/**
 * DÖNÜŞ SÜRESİ VAADİ — tek kaynak.
 *
 * Aynı anda dört yerde farklı yazıyordu: llms.txt "48 saat", iletişim sayfası
 * "aynı gün, en geç bir iş günü", brief formunun başarı mesajı yine "48 saat".
 * Hepsi ziyaretçinin gördüğü ve makinelerin okuduğu beyan.
 *
 * `lib/iletisim.ts`te DEĞİL, burada: sözlük de bunu okuyor ve sözlük istemci
 * tarafında; iletişim modülü ise 6 kB'lık SSS metni taşıyor. Oradan import
 * etmek o metnin tamamını tarayıcıya indirirdi.
 */
export const YANIT_SURESI = {
  /** Tam cümle: llms.txt, iletişim sayfası. */
  tam: {
    tr: "Mesajlara aynı gün, en geç bir iş günü içinde dönülür.",
    en: "We reply the same day, and within one business day at the latest.",
  },
  /** Cümle içine giren biçim: "… teklifi aynı gün … hazırlayalım." */
  kisa: {
    tr: "aynı gün, en geç bir iş günü içinde",
    en: "the same day, within one business day at the latest",
  },
} as const;

/** Çalışma saatleri — hem iletişim künyesinde hem yapısal veride. */
export const CALISMA = {
  gunler: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  acilis: "09:00",
  kapanis: "18:00",
} as const;

/**
 * VARLIK TANIMI — "Forpus Yazılım ne yapar?" sorusunun tek pasajlık cevabı.
 *
 * NEREDE OKUNUYOR: yalnızca `app/layout.tsx`te, `Organization.description`
 * olarak. Orada daha önce dokuz kelimelik bir cümle duruyordu — "İstanbul
 * merkezli web, mobil uygulama, reklam ve tasarım stüdyosu" — ve bir varlığın
 * makineye anlattığı şeyin tamamı oydu.
 *
 * EKRANDA GÖSTERİLMİYOR, BİLEREK. Ana sayfaya bir blok olarak kondu ve geri
 * alındı: kahraman metni zaten "İstanbul merkezli yazılım şirketiyiz: web,
 * mobil uygulama, reklam ve tasarım — tek çatı altında. İki mühendis kurucu…"
 * diyor ve altındaki bölüm "Tek bir ekip, uçtan uca dijital" ile aynı şeyi
 * üçüncü kez söylüyordu. Aynı cümleyi üç kez kuran bir sayfa, üçünü de
 * zayıflatıyor.
 *
 * Bu bir gizli metin değil: yapısal veri, meta açıklaması gibi bir ÜSTVERİ
 * alanı ve buradaki her iddia — kuruluş, ekip, fiyat bandı — sayfanın Ekip ve
 * Paketler bölümlerinde zaten yazıyor. Şart şu: sayfa değişirse bu paragraf
 * da değişmeli, yoksa makineye söylenen ile insanın gördüğü ayrışır.
 *
 * Marka anmaları, yapay zekâ aramalarında görünürlükle backlink'lerden ÜÇ KAT
 * güçlü ilişkileniyor. Bir motorun markayı anabilmesi için önce ne olduğunu
 * bilmesi gerekiyor; o bilgiyi verecek tek yer bu paragraf.
 *
 * SİTEYLE ÇELİŞMEMEK ZORUNDA: "iki mühendis kurdu", tek çatı altındaki ekip
 * ve ₺50.000 / ₺100.000 / ₺250.000 bandları, ana sayfadaki Ekip ve Paketler
 * bölümlerinin zaten söylediği şeyler. Buradaki rakam değişirse sözlükteki
 * `packages` da değişmeli — ikisi aynı beyanı veriyor.
 */
export const TANIM = {
  govde: {
    tr: "Forpus Yazılım, İstanbul merkezli bir yazılım stüdyosudur. Küçük ve orta ölçekli işletmeler için web sitesi ve e-ticaret altyapısı kurar, iOS ile Android için mobil uygulama geliştirir, marka tasarımı ve reklam yönetimi yapar. Şirketi iki mühendis kurdu; tasarım, geliştirme ve reklam tarafı tek çatı altında yürütülüyor. Fiyatlar görüşmede değil baştan yazılı: tanıtım sitesi ₺50.000 bandında başlar ve içerikler hazırsa yaklaşık bir haftada yayına girer, hizmetlerin ayrı ayrı sayfalandığı kurumsal bir site ₺100.000'den başlar ve iki ila dört haftada tamamlanır, mobil uygulamanın ilk sürümü ₺250.000'den başlar ve altı ila on haftada mağazaya çıkar. Her projede alan adı, barındırma hesabı ve kaynak kod müşterinin adına kaydedilir; teslimden sonra içerikleri müşteri kendisi günceller. En sık çalışılan alanlar sağlık, hukuk, e-ticaret, lojistik ve yeme-içme; bu sektörlerin her biri için ayrı bir çözüm sayfası ve gerçek bir referans işi var. Sitede yazan her fiyat 2026 için geçerli başlangıç rakamıdır ve kapsam netleştikçe teklifte sabitlenir. Mesajlara aynı gün, en geç bir iş günü içinde dönülür.",
    en: "Forpus Yazılım is a software studio based in Istanbul, Türkiye. It builds websites and e-commerce platforms for small and mid-sized businesses, develops mobile apps for iOS and Android, and handles brand design and ad management. The company was founded by two engineers, and design, development and advertising are run under one roof. Prices are published rather than saved for a call: a brochure site starts around ₺50,000 and goes live in about a week once content is ready, a corporate site with a separate page per service starts at ₺100,000 and takes two to four weeks, and the first version of a mobile app starts at ₺250,000 and reaches the stores in six to ten weeks. On every project the domain, the hosting account and the source code are registered in the client's name, and the client updates the content after handover. Most work comes from healthcare, law, e-commerce, logistics and hospitality. We reply the same day, within one business day at the latest.",
  },
} as const;

export type SosyalProfil = {
  ad: "Instagram" | "Facebook" | "LinkedIn";
  href: string;
};

/**
 * SOSYAL PROFİLLER — hesabın KİMLİĞİ.
 *
 * "Profil" ile "iletişim kanalı" bilerek ayrı: bunlar kalıcı, herkese açık
 * `https://` adresleri ve schema.org'un `sameAs` alanına olduğu gibi
 * giriyorlar. WhatsApp burada DEĞİL — o bir kanal; `sameAs`a bir `wa.me`
 * adresi koymak "bu hesap aynı varlığa ait" demek olurdu, oysa o bir
 * tıklama hedefi.
 *
 * Bugün liste ile `sameAs` birebir aynı, o yüzden aşağıdaki türetme
 * çalışıyor. Footer'a WhatsApp ikonu eklenmek istendiği gün liste GÖSTERİM
 * için büyümek, `sameAs` için büyümemek zorunda kalacak; o gün kayda bir
 * `kimlik: boolean` alanı gelmeli ve `sameAs` onu filtrelemeli — kural
 * yorumdan tipe geçtiği anda aşınmayı bırakır.
 */
export const SOSYAL_PROFILLER: readonly SosyalProfil[] = [
  { ad: "Instagram", href: "https://www.instagram.com/forpusyazilim" },
  { ad: "Facebook", href: "https://www.facebook.com/1250844311452202" },
  { ad: "LinkedIn", href: "https://www.linkedin.com/company/forpusyazilim" },
];

/**
 * Yapısal veri için profil adresleri.
 *
 * `sameAs` "bu site ile bu hesaplar aynı varlığa ait" demek; Google'ın
 * marka bilgi panelini birleştirmesi buradan geçiyor. Ekrandaki ikonlarla
 * AYNI listeden besleniyor ki biri güncellenip diğeri unutulmasın.
 */
export const sameAs = SOSYAL_PROFILLER.map((h) => h.href);
