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

export type SolutionRef = {
  key: string;
  image: string;
  service: ServiceKey;
  slug: { tr: string; en: string };
  /** Navigasyonda ve pill şeridinde kullanılan kısa ad. */
  label: { tr: string; en: string };
};

export const solutionIndex: SolutionRef[] = [
  { key: "doktor", image: "/generated/personas/doktor.webp", service: "web",
    slug: { tr: "doktor-web-sitesi", en: "doctor-website" },
    label: { tr: "Doktor", en: "Doctor" } },
  { key: "dishekimi", image: "/generated/personas/dishekimi.webp", service: "web",
    slug: { tr: "dis-hekimi-web-sitesi", en: "dentist-website" },
    label: { tr: "Diş Hekimi", en: "Dentist" } },
  { key: "diyetisyen", image: "/generated/personas/diyetisyen.webp", service: "web",
    slug: { tr: "diyetisyen-web-sitesi", en: "dietitian-website" },
    label: { tr: "Diyetisyen", en: "Dietitian" } },
  { key: "psikolog", image: "/generated/personas/psikolog.webp", service: "web",
    slug: { tr: "psikolog-web-sitesi", en: "psychologist-website" },
    label: { tr: "Psikolog", en: "Psychologist" } },
  { key: "avukat", image: "/generated/personas/avukat.webp", service: "web",
    slug: { tr: "avukat-web-sitesi", en: "lawyer-website" },
    label: { tr: "Avukat", en: "Lawyer" } },
  { key: "emlak", image: "/generated/personas/emlak.webp", service: "web",
    slug: { tr: "emlak-web-sitesi", en: "real-estate-website" },
    label: { tr: "Emlak", en: "Real Estate" } },
  { key: "eticaret", image: "/generated/personas/eticaret.webp", service: "web",
    slug: { tr: "e-ticaret-sitesi", en: "ecommerce-website" },
    label: { tr: "E-Ticaret", en: "E-Commerce" } },
  { key: "restoran", image: "/generated/personas/restoran.webp", service: "web",
    slug: { tr: "restoran-web-sitesi", en: "restaurant-website" },
    label: { tr: "Restoran & Kafe", en: "Restaurant & Cafe" } },
  { key: "kisiselmarka", image: "/generated/personas/kisiselmarka.webp", service: "web",
    slug: { tr: "kisisel-marka-web-sitesi", en: "personal-brand-website" },
    label: { tr: "Kişisel Marka", en: "Personal Brand" } },
  { key: "kuafor", image: "/generated/personas/kuafor.webp", service: "web",
    slug: { tr: "kuafor-web-sitesi", en: "hair-salon-website" },
    label: { tr: "Kuaför & Berber", en: "Hair & Barber" } },
  { key: "guzellik", image: "/generated/personas/guzellik.webp", service: "web",
    slug: { tr: "guzellik-merkezi-web-sitesi", en: "beauty-clinic-website" },
    label: { tr: "Güzellik & Estetik", en: "Beauty & Aesthetics" } },
  { key: "veteriner", image: "/generated/personas/veteriner.webp", service: "web",
    slug: { tr: "veteriner-web-sitesi", en: "veterinary-website" },
    label: { tr: "Veteriner", en: "Veterinary" } },
  { key: "mimar", image: "/generated/personas/mimar.webp", service: "web",
    slug: { tr: "mimar-web-sitesi", en: "architect-website" },
    label: { tr: "Mimar & İç Mimar", en: "Architect" } },
  { key: "musavir", image: "/generated/personas/musavir.webp", service: "web",
    slug: { tr: "mali-musavir-web-sitesi", en: "accountant-website" },
    label: { tr: "Mali Müşavir", en: "Accountant" } },
  { key: "fotografci", image: "/generated/personas/fotografci.webp", service: "web",
    slug: { tr: "fotografci-web-sitesi", en: "photographer-website" },
    label: { tr: "Fotoğrafçı", en: "Photographer" } },
  { key: "spor", image: "/generated/personas/spor.webp", service: "web",
    slug: { tr: "spor-salonu-web-sitesi", en: "gym-website" },
    label: { tr: "Spor Salonu", en: "Gym & Trainer" } },
  { key: "mobil", image: "/generated/hero-device.webp", service: "mobile",
    slug: { tr: "mobil-uygulama-gelistirme", en: "mobile-app-development" },
    label: { tr: "Mobil Uygulama", en: "Mobile App" } },
];

export const slugOfRef = (r: SolutionRef, lang: "tr" | "en") => (lang === "tr" ? r.slug.tr : r.slug.en);

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
      if (!keys.has(k)) throw new Error(`${label}: "${it.slug}" → bilinmeyen çözüm "${k}"`);
    }
  }
}
