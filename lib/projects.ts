// Forpus reference projects. Desktop shots: scripts/capture-screenshots.mjs -> /public/work.
// App shots: real screenshots curated from the project folders -> /public/work/apps.

import type { Lang } from "./i18n/dictionary";

export type LocalizedText = Record<Lang, string>;

export type WebProject = {
  slug: string;
  name: string;
  url: string;
  shot: string; // desktop screenshot (also the video poster when `video` is set)
  video?: string; // optional autoplay-muted-loop clip shown in the frame instead of the shot
  category: LocalizedText;
  desc: LocalizedText;
  tags: string[];
  /** accent hue used for the card glow — keeps the showcase varied while on-brand */
  accent: "green" | "cyan" | "blue";
  featured?: boolean;
};

export type MobileApp = {
  slug: string;
  name: string;
  shot: string; // portrait/mobile screenshot
  tagline: LocalizedText;
  appStore?: string;
  googlePlay?: string;
  comingSoon?: boolean;
};

// Live web projects (screenshots successfully captured from the live sites).
export const webProjects: WebProject[] = [
  {
    slug: "doldurkabi",
    name: "DoldurKabı",
    url: "https://doldurkabi.com/",
    shot: "/work/doldurkabi.webp",
    category: { tr: "Mobil Uygulama & Web", en: "Mobile App & Web" },
    desc: {
      tr: "Türkiye'nin hayvanseverler platformu: sahiplendirme, kayıp ilanları, veteriner ve harita — web ve mobil uygulama.",
      en: "Turkey's animal-lovers platform: adoption, lost-pet listings, vets and a map — web and mobile app.",
    },
    tags: ["Mobil", "Web", "Harita", "UI/UX"],
    accent: "cyan",
    featured: true,
  },
  {
    slug: "temizlikexpress",
    name: "Temizlik Express",
    url: "https://temizlikexpress.com/",
    shot: "/work/temizlikexpress.webp",
    category: { tr: "Web & Mobil Platform", en: "Web & Mobile Platform" },
    desc: {
      tr: "Temizlik hizmetleri için web sitesi ve kullanıcı mobil uygulaması; sipariş ve yönetim akışıyla.",
      en: "Website and a user mobile app for cleaning services, with ordering and management flows.",
    },
    tags: ["Web", "Mobil", "Reklam"],
    accent: "blue",
  },
  {
    slug: "seapleasure",
    name: "Sea Pleasure",
    url: "https://seapleasure.com.tr/",
    shot: "/work/seapleasure.webp",
    video: "/work/seapleasure.mp4",
    category: { tr: "Kurumsal · Tekne & Turizm", en: "Corporate · Yachting & Tourism" },
    desc: {
      tr: "İstanbul Boğazı'nda özel tekne kiralama için videolu, sinematik bir tanıtım sitesi — turlar, WhatsApp rezervasyon ve mobil uyumlu tasarım.",
      en: "A cinematic, video-rich site for private boat charters on the Bosphorus — tours, WhatsApp booking and a mobile-friendly design.",
    },
    tags: ["Web", "Video", "Kurumsal", "UI/UX"],
    accent: "blue",
  },
  {
    slug: "sagemakine",
    name: "SAGE Makine",
    url: "https://sagemakine.com/",
    shot: "/work/sagemakine.webp",
    category: { tr: "Kurumsal · Endüstriyel Makine", en: "Corporate · Industrial Machinery" },
    desc: {
      tr: "Renk ayırma ve X-Ray gıda kontrol makineleri için kurumsal site: makine kataloğu, sektörel çözümler, canlı ayıklama simülasyonu ve teklif akışı.",
      en: "A corporate site for color sorting and X-Ray food inspection machines: machine catalog, industry solutions, a live sorting simulation and a quote flow.",
    },
    tags: ["Web", "Kurumsal", "SEO", "UI/UX"],
    accent: "green",
  },
  {
    slug: "merak",
    name: "Merak Et Öğren",
    url: "https://meraketogren.com/",
    shot: "/work/merak.webp",
    category: { tr: "Web & Mobil", en: "Web & Mobile" },
    desc: {
      tr: "Sesli mikro-öğrenme uygulaması için tanıtım sitesi: kategoriler, premium üyelik ve mağaza indirmeleri — günde 5 dakikalık öğrenmeyi akıcı bir deneyimle sunar.",
      en: "A landing site for an audio micro-learning app: categories, premium membership and store links — presenting five-minutes-a-day learning in a smooth experience.",
    },
    tags: ["Web", "Mobil", "UI/UX"],
    accent: "blue",
  },
  {
    slug: "esenkuruyemis",
    name: "Esen Kuruyemiş",
    url: "https://esenkuruyemis.com/",
    shot: "/work/esenkuruyemis.webp",
    category: { tr: "E-Ticaret", en: "E-Commerce" },
    desc: {
      tr: "Kuruyemiş markası için e-ticaret sitesi: ürün kataloğu, sepet ve ödeme — taze lezzetleri akıcı bir alışveriş deneyimiyle online'a taşıdık.",
      en: "An e-commerce site for a dried-nuts brand: product catalog, cart and checkout — fresh flavors brought online with a smooth shopping experience.",
    },
    tags: ["E-Ticaret", "Web", "UI/UX"],
    accent: "cyan",
  },
  {
    slug: "dryasin",
    name: "Dr. Yasin Kurtboğan",
    url: "https://dryasinkurtbogan.com.tr/",
    shot: "/work/dryasin.webp",
    category: { tr: "Kurumsal · Sağlık", en: "Corporate · Health" },
    desc: {
      tr: "Doktor için güven veren kurumsal tanıtım sitesi; bilgilendirme ve iletişim odaklı.",
      en: "A trustworthy corporate site for a doctor, focused on information and contact.",
    },
    tags: ["Web", "Kurumsal"],
    accent: "blue",
  },
  {
    slug: "cekictrans",
    name: "Çekiç Trans",
    url: "https://cekictrans.com/",
    shot: "/work/cekictrans.webp",
    category: { tr: "Kurumsal Web", en: "Corporate Web" },
    desc: {
      tr: "Lojistik ve çekici hizmeti için hızlı, net ve mobil uyumlu kurumsal web sitesi.",
      en: "A fast, clear and mobile-friendly corporate website for logistics and towing services.",
    },
    tags: ["Web", "Kurumsal"],
    accent: "green",
  },
];

export const mobileApps: MobileApp[] = [
  {
    slug: "doldurkabi",
    name: "DoldurKabı",
    shot: "/work/apps/doldurkabi.webp",
    tagline: { tr: "Türkiye'nin hayvanseverler platformu", en: "Turkey's animal-lovers platform" },
    appStore: "https://apps.apple.com/tr/app/doldurkab%C4%B1/id6753592445?l=tr",
    googlePlay: "https://play.google.com/store/apps/details?id=com.ismailselim.doldurkabi&hl=tr",
  },
  {
    slug: "temizlikexpress",
    name: "Temizlik Express",
    shot: "/work/apps/temizlikexpress.webp",
    tagline: { tr: "Tek dokunuşla temizlik", en: "Cleaning in one tap" },
    appStore: "https://apps.apple.com/tr/app/temizlik-express/id6445817029?l=tr",
    googlePlay: "https://play.google.com/store/apps/details?id=com.temizlikexpress.temizlik",
  },
  {
    slug: "merak",
    name: "Merak Et Öğren",
    shot: "/work/apps/merak.webp",
    tagline: { tr: "Merak ettiğin her konuda podcast", en: "Podcasts on everything you're curious about" },
    comingSoon: true,
  },
];

// Brand names for the trust marquee (includes brands whose live sites are temporarily offline).
export const brandNames = [
  "DoldurKabı",
  "Temizlik Express",
  "Sea Pleasure",
  "SAGE Makine",
  "Dr. Yasin Kurtboğan",
  "Merak Et Öğren",
  "Esen Kuruyemiş",
  "Çekiç Trans",
];

// Brand logos for the trust marquee. `url` links to the brand's live site when available.
export const brandLogos: { name: string; src: string; url?: string }[] = [
  { name: "DoldurKabı", src: "/logos/doldurkabi.png", url: "https://doldurkabi.com/" },
  { name: "Temizlik Express", src: "/logos/temizlikexpress.png", url: "https://temizlikexpress.com/" },
  { name: "Sea Pleasure", src: "/logos/seapleasure.png", url: "https://seapleasure.com.tr/" },
  { name: "SAGE Makine", src: "/logos/sagemakine.png", url: "https://sagemakine.com/" },
  { name: "Dr. Yasin Kurtboğan", src: "/logos/dryasin.png", url: "https://dryasinkurtbogan.com.tr/" },
  { name: "Merak Et Öğren", src: "/logos/merak.png", url: "https://meraketogren.com/" },
  { name: "Esen Kuruyemiş", src: "/logos/esen.png", url: "https://esenkuruyemis.com/" },
  { name: "Çekiç Trans", src: "/logos/cekictrans.png", url: "https://cekictrans.com/" },
];
