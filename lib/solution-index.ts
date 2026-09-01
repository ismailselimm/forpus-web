// Çözüm sayfalarının HAFİF indeksi — anahtar, slug, kısa etiket ve görsel.
//
// Neden ayrı dosya: `lib/solutions.ts` her sektörün 900+ kelimelik Türkçe
// metnini taşıyor. Footer ve Personas istemci bileşeni olduğu için oradan
// import etmek, o metnin TAMAMINI tarayıcıya indiriyordu (ölçüldü: sayfa
// başına +28 kB gzip, ana sayfa First Load JS 196 → 224 kB). Bu dosya
// istemci tarafının ihtiyaç duyduğu her şeyi içerir ve metin taşımaz.
//
// Yeni sektör eklerken: önce buraya bir satır, sonra lib/solutions.ts'e
// içeriği. İkisi eşleşmezse build zamanı hata alırsınız (solutions.ts sonu).

import type { ServiceKey } from "./services";

/**
 * Sektörün konu ailesi. Sayfa altındaki "ilgili sektörler" şeridi buna göre
 * seçiliyor: diş hekimi sayfasından doktora, psikoloğa, diyetisyene gitmek
 * anlamlı; kaynak makinesi satan bir siteye gitmek değil.
 *
 * "yazilim" ailesi bir sektör değil: mobil uygulama ve özel yazılım, sektör
 * değil HİZMET sayfaları. Mobil daha önce "kisisel"de duruyordu — kişisel
 * marka ve fotoğrafçının yanında — ki yanlıştı. İkisi birbirinin en doğru
 * ilgili bağlantısı: özel yazılım isteyen çoğu zaman mobil de istiyor.
 */
type Aile =
  | "saglik"
  | "pet"
  | "guzellik"
  | "danismanlik"
  | "yapi"
  | "ticaret"
  | "agirlama"
  | "egitim"
  | "operasyon"
  | "kisisel"
  | "yazilim";

export type SolutionRef = {
  key: string;
  aile: Aile;
  image: string;
  service: ServiceKey;
  slug: { tr: string; en: string };
  /** Navigasyonda ve pill şeridinde kullanılan kısa ad. */
  label: { tr: string; en: string };
};

export const solutionIndex: SolutionRef[] = [
  {
    key: "doktor",
    aile: "saglik",
    image: "/generated/personas/doktor.webp",
    service: "web",
    slug: { tr: "doktor-web-sitesi", en: "doctor-website" },
    label: { tr: "Doktor", en: "Doctor" },
  },
  {
    key: "dishekimi",
    aile: "saglik",
    image: "/generated/personas/dishekimi.webp",
    service: "web",
    slug: { tr: "dis-hekimi-web-sitesi", en: "dentist-website" },
    label: { tr: "Diş Hekimi", en: "Dentist" },
  },
  {
    key: "diyetisyen",
    aile: "saglik",
    image: "/generated/personas/diyetisyen.webp",
    service: "web",
    slug: { tr: "diyetisyen-web-sitesi", en: "dietitian-website" },
    label: { tr: "Diyetisyen", en: "Dietitian" },
  },
  {
    key: "psikolog",
    aile: "saglik",
    image: "/generated/personas/psikolog.webp",
    service: "web",
    slug: { tr: "psikolog-web-sitesi", en: "psychologist-website" },
    label: { tr: "Psikolog", en: "Psychologist" },
  },
  {
    key: "avukat",
    aile: "danismanlik",
    image: "/generated/personas/avukat.webp",
    service: "web",
    slug: { tr: "avukat-web-sitesi", en: "lawyer-website" },
    label: { tr: "Avukat", en: "Lawyer" },
  },
  {
    key: "emlak",
    aile: "yapi",
    image: "/generated/personas/emlak.webp",
    service: "web",
    slug: { tr: "emlak-web-sitesi", en: "real-estate-website" },
    label: { tr: "Emlak", en: "Real Estate" },
  },
  {
    key: "eticaret",
    aile: "ticaret",
    image: "/generated/personas/eticaret.webp",
    service: "web",
    slug: { tr: "e-ticaret-sitesi", en: "ecommerce-website" },
    label: { tr: "E-Ticaret", en: "E-Commerce" },
  },
  {
    key: "restoran",
    aile: "agirlama",
    image: "/generated/personas/restoran.webp",
    service: "web",
    slug: { tr: "restoran-web-sitesi", en: "restaurant-website" },
    label: { tr: "Restoran & Kafe", en: "Restaurant & Cafe" },
  },
  {
    key: "kisiselmarka",
    aile: "kisisel",
    image: "/generated/personas/kisiselmarka.webp",
    service: "web",
    slug: { tr: "kisisel-marka-web-sitesi", en: "personal-brand-website" },
    label: { tr: "Kişisel Marka", en: "Personal Brand" },
  },
  {
    key: "kuafor",
    aile: "guzellik",
    image: "/generated/personas/kuafor.webp",
    service: "web",
    slug: { tr: "kuafor-web-sitesi", en: "hair-salon-website" },
    label: { tr: "Kuaför & Berber", en: "Hair & Barber" },
  },
  {
    key: "guzellik",
    aile: "guzellik",
    image: "/generated/personas/guzellik.webp",
    service: "web",
    slug: { tr: "guzellik-merkezi-web-sitesi", en: "beauty-clinic-website" },
    label: { tr: "Güzellik & Estetik", en: "Beauty & Aesthetics" },
  },
  {
    key: "veteriner",
    aile: "pet",
    image: "/generated/personas/veteriner.webp",
    service: "web",
    slug: { tr: "veteriner-web-sitesi", en: "veterinary-website" },
    label: { tr: "Veteriner", en: "Veterinary" },
  },
  {
    key: "mimar",
    aile: "yapi",
    image: "/generated/personas/mimar.webp",
    service: "web",
    slug: { tr: "mimar-web-sitesi", en: "architect-website" },
    label: { tr: "Mimar & İç Mimar", en: "Architect" },
  },
  {
    key: "musavir",
    aile: "danismanlik",
    image: "/generated/personas/musavir.webp",
    service: "web",
    slug: { tr: "mali-musavir-web-sitesi", en: "accountant-website" },
    label: { tr: "Mali Müşavir", en: "Accountant" },
  },
  {
    key: "fotografci",
    aile: "kisisel",
    image: "/generated/personas/fotografci.webp",
    service: "web",
    slug: { tr: "fotografci-web-sitesi", en: "photographer-website" },
    label: { tr: "Fotoğrafçı", en: "Photographer" },
  },
  {
    key: "spor",
    aile: "guzellik",
    image: "/generated/personas/spor.webp",
    service: "web",
    slug: { tr: "spor-salonu-web-sitesi", en: "gym-website" },
    label: { tr: "Spor Salonu", en: "Gym & Trainer" },
  },
  {
    key: "petotel",
    aile: "pet",
    image: "/generated/personas/petotel.webp",
    service: "web",
    slug: { tr: "pet-otel-web-sitesi", en: "pet-boarding-website" },
    label: { tr: "Pet Otel", en: "Pet Boarding" },
  },
  {
    key: "petkuafor",
    aile: "pet",
    image: "/generated/personas/petkuafor.webp",
    service: "web",
    slug: { tr: "pet-kuaforu-web-sitesi", en: "pet-grooming-website" },
    label: { tr: "Pet Kuaförü", en: "Pet Grooming" },
  },
  {
    key: "sanayi",
    aile: "operasyon",
    image: "/generated/personas/sanayi.webp",
    service: "web",
    slug: { tr: "sanayi-firmasi-web-sitesi", en: "industrial-company-website" },
    label: { tr: "Sanayi & Makine", en: "Industrial & Machinery" },
  },
  {
    key: "lojistik",
    aile: "operasyon",
    image: "/generated/personas/lojistik.webp",
    service: "web",
    slug: {
      tr: "lojistik-firmasi-web-sitesi",
      en: "logistics-company-website",
    },
    label: { tr: "Lojistik & Nakliyat", en: "Logistics & Freight" },
  },
  {
    key: "tekne",
    aile: "agirlama",
    image: "/generated/personas/tekne.webp",
    service: "web",
    slug: { tr: "tekne-kiralama-web-sitesi", en: "boat-charter-website" },
    label: { tr: "Tekne Kiralama", en: "Boat Charter" },
  },
  {
    key: "temizlik",
    aile: "operasyon",
    image: "/generated/personas/temizlik.webp",
    service: "web",
    slug: { tr: "temizlik-sirketi-web-sitesi", en: "cleaning-company-website" },
    label: { tr: "Temizlik Şirketi", en: "Cleaning Company" },
  },
  {
    key: "insaat",
    aile: "yapi",
    image: "/generated/personas/insaat.webp",
    service: "web",
    slug: {
      tr: "insaat-firmasi-web-sitesi",
      en: "construction-company-website",
    },
    label: { tr: "İnşaat Firması", en: "Construction Firm" },
  },
  {
    key: "ges",
    aile: "yapi",
    image: "/generated/personas/ges.webp",
    service: "web",
    slug: { tr: "gunes-enerjisi-web-sitesi", en: "solar-energy-website" },
    label: { tr: "Güneş Enerjisi", en: "Solar Energy" },
  },
  {
    key: "otel",
    aile: "agirlama",
    image: "/generated/personas/otel.webp",
    service: "web",
    slug: { tr: "otel-web-sitesi", en: "hotel-website" },
    label: { tr: "Otel & Pansiyon", en: "Hotel & Guesthouse" },
  },
  {
    key: "sacekimi",
    aile: "saglik",
    image: "/generated/personas/sacekimi.webp",
    service: "web",
    slug: { tr: "sac-ekimi-web-sitesi", en: "hair-transplant-website" },
    label: { tr: "Saç Ekimi", en: "Hair Transplant" },
  },
  {
    key: "okul",
    aile: "egitim",
    image: "/generated/personas/okul.webp",
    service: "web",
    slug: { tr: "ozel-okul-web-sitesi", en: "private-school-website" },
    label: { tr: "Özel Okul", en: "Private School" },
  },
  {
    key: "catering",
    aile: "agirlama",
    image: "/generated/personas/catering.webp",
    service: "web",
    slug: { tr: "catering-firmasi-web-sitesi", en: "catering-company-website" },
    label: { tr: "Catering Firması", en: "Catering Company" },
  },
  {
    key: "guvenlik",
    aile: "operasyon",
    image: "/generated/personas/guvenlik.webp",
    service: "web",
    slug: { tr: "ozel-guvenlik-web-sitesi", en: "security-company-website" },
    label: { tr: "Özel Güvenlik", en: "Security Services" },
  },
  {
    key: "rentacar",
    aile: "operasyon",
    image: "/generated/personas/rentacar.webp",
    service: "web",
    slug: { tr: "arac-kiralama-web-sitesi", en: "car-rental-website" },
    label: { tr: "Araç Kiralama", en: "Car Rental" },
  },
  {
    key: "otogaleri",
    aile: "ticaret",
    image: "/generated/personas/otogaleri.webp",
    service: "web",
    slug: { tr: "oto-galeri-web-sitesi", en: "car-dealership-website" },
    label: { tr: "Oto Galeri", en: "Car Dealership" },
  },
  {
    key: "dugunsalonu",
    aile: "agirlama",
    image: "/generated/personas/dugunsalonu.webp",
    service: "web",
    slug: { tr: "dugun-salonu-web-sitesi", en: "wedding-venue-website" },
    label: { tr: "Düğün Salonu", en: "Wedding Venue" },
  },
  {
    key: "tekstil",
    aile: "ticaret",
    image: "/generated/personas/tekstil.webp",
    service: "web",
    slug: {
      tr: "tekstil-firmasi-web-sitesi",
      en: "textile-manufacturer-website",
    },
    label: { tr: "Tekstil Üreticisi", en: "Textile Manufacturer" },
  },
  {
    key: "kuyumcu",
    aile: "ticaret",
    image: "/generated/personas/kuyumcu.webp",
    service: "web",
    slug: { tr: "kuyumcu-web-sitesi", en: "jewelry-store-website" },
    label: { tr: "Kuyumcu", en: "Jewelry Store" },
  },
  {
    key: "yurt",
    aile: "egitim",
    image: "/generated/personas/yurt.webp",
    service: "web",
    slug: { tr: "ogrenci-yurdu-web-sitesi", en: "student-dormitory-website" },
    label: { tr: "Öğrenci Yurdu", en: "Student Dorm" },
  },
  {
    key: "fizyoterapi",
    aile: "saglik",
    image: "/generated/personas/fizyoterapi.webp",
    service: "web",
    slug: { tr: "fizik-tedavi-web-sitesi", en: "physiotherapy-website" },
    label: { tr: "Fizik Tedavi", en: "Physiotherapy" },
  },
  {
    key: "huzurevi",
    aile: "saglik",
    image: "/generated/personas/huzurevi.webp",
    service: "web",
    slug: { tr: "huzurevi-web-sitesi", en: "nursing-home-website" },
    label: { tr: "Huzurevi & Bakım", en: "Elderly Care" },
  },
  {
    key: "gumruk",
    aile: "danismanlik",
    image: "/generated/personas/gumruk.webp",
    service: "web",
    slug: { tr: "gumruk-musavirligi-web-sitesi", en: "customs-broker-website" },
    label: { tr: "Gümrük Müşaviri", en: "Customs Broker" },
  },
  {
    key: "anaokulu",
    aile: "egitim",
    image: "/generated/personas/anaokulu.webp",
    service: "web",
    slug: { tr: "anaokulu-web-sitesi", en: "preschool-website" },
    label: { tr: "Anaokulu & Kreş", en: "Preschool & Daycare" },
  },
  {
    key: "siteyonetim",
    aile: "danismanlik",
    image: "/generated/personas/siteyonetim.webp",
    service: "web",
    slug: { tr: "site-yonetimi-web-sitesi", en: "property-management-website" },
    label: { tr: "Site Yönetimi", en: "Property Management" },
  },
  {
    key: "ozelyazilim",
    aile: "yazilim",
    image: "/generated/personas/ozelyazilim.webp",
    service: "web",
    slug: { tr: "ozel-yazilim-gelistirme", en: "custom-software-development" },
    label: { tr: "Özel Yazılım", en: "Custom Software" },
  },
  {
    key: "mobil",
    aile: "yazilim",
    image: "/generated/hero-device.webp",
    service: "mobile",
    slug: { tr: "mobil-uygulama-gelistirme", en: "mobile-app-development" },
    label: { tr: "Mobil Uygulama", en: "Mobile App" },
  },
];

export const slugOfRef = (r: SolutionRef, lang: "tr" | "en") =>
  lang === "tr" ? r.slug.tr : r.slug.en;

/**
 * Bir koleksiyonun `relatedSolutions` anahtarlarını doğrular.
 *
 * Kontrol burada, çünkü anahtarların sahibi bu dosya. Blog ve vakalarda ayrı
 * ayrı yazılmıştı; bir çözüm yeniden adlandırıldığında oradan giden iç
 * bağlantılar sessizce kaybolduğu için build'i patlatmak doğru davranış.
 */
export function assertSolutionKeys(
  label: string,
  items: { slug: string; relatedSolutions?: string[] }[],
) {
  const keys = new Set(solutionIndex.map((r) => r.key));
  for (const it of items) {
    for (const k of it.relatedSolutions ?? []) {
      if (!keys.has(k))
        throw new Error(`${label}: "${it.slug}" → bilinmeyen çözüm "${k}"`);
    }
  }
}

/**
 * Anahtardan referansa. Üç çağrı yeri (`Personas`, `SolutionArticle`,
 * `lib/routes.ts`) aynı `find`i ayrı ayrı yazıyordu; Map olduğu için
 * Personas'ın 11 kartı × 17 kayıtlık lineer taraması da kalkıyor.
 */
const ANAHTARA_GORE = new Map(solutionIndex.map((r) => [r.key, r]));

export const refByKey = (key: string) => ANAHTARA_GORE.get(key);

/**
 * Öne çıkan sektörler — footer ve 404 sayfası bunu gösteriyor.
 *
 * İkisi de `slice(0, 8)`i ayrı ayrı yazıyordu; footer dokuza çıktığında
 * 404 sekizde kalırdı ve kimse fark etmezdi. Sekiz sayısı bir tasarım
 * kararı: footer sütununa sığan ve 404'te göz yormayan uzunluk.
 */
export const ONE_CIKAN_SEKTORLER = solutionIndex.slice(0, 8);

/** Sayfa altındaki şeritte kaç sektör gösterilecek. */
const ILGILI_SAYISI = 8;

/**
 * Sayfa altındaki "ilgili sektörler" şeridi.
 *
 * Eskiden diğer sektörlerin HEPSİ listeleniyordu. On dokuz sayfayken bu
 * savunulabilirdi; kırk iki sayfayken her sayfanın altına kırk bağlantılık
 * bir blok koyuyor. İki maliyeti var: her sayfada fazladan HTML (kırk başlık
 * metni, hem HTML hem RSC yükünde), ve ziyaretçiye "restoran sitesi mi
 * istiyordun, buyur gümrük müşaviri" demek.
 *
 * Artık önce kendi ailesi geliyor, kalanı indeksin geri kalanından
 * tamamlanıyor. Bugün hiçbir aile sekizi doldurmuyor — en büyüğü yedi
 * kayıtlı `saglik` — yani dolgu her sayfada devreye giriyor; şeridin başı
 * konuya yakın, sonu değil. Başlık da onu vaat ediyor ("Diğer çözümler"),
 * konu yakınlığı değil. Dolgu bilerek duruyor — ama sabit baştan değil, sektörün kendi
 * sırasından döndürerek. Sabit baştan doldursaydık indeksin sonundaki
 * sektörler yalnızca kendi ailelerinden bağlantı alırdı. Ölçüldü: döndürmeyle
 * her sayfaya 4-12 bağlantı geliyor, sabit baştan doldurulsa 1-41 olurdu.
 *
 * Her sektöre ana sayfadaki tam liste zaten bağlanıyor, sitemap'te de duruyor;
 * yani buradaki kısaltma hiçbir sayfayı keşfedilmez yapmıyor.
 */
export function ilgiliRefler(key: string): SolutionRef[] {
  const bu = ANAHTARA_GORE.get(key);
  if (!bu) return [];

  const ayniAile = solutionIndex.filter(
    (r) => r.aile === bu.aile && r.key !== key,
  );
  const baskaAile = solutionIndex.filter((r) => r.aile !== bu.aile);
  const kaydir = solutionIndex.indexOf(bu) % baskaAile.length;

  return [
    ...ayniAile,
    ...baskaAile.slice(kaydir),
    ...baskaAile.slice(0, kaydir),
  ].slice(0, ILGILI_SAYISI);
}
