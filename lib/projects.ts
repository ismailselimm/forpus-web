// Forpus reference projects. Desktop shots: scripts/capture-screenshots.mjs -> /public/work.
// App shots: real screenshots curated from the project folders -> /public/work/apps.

import type { Lang } from "./i18n/dictionary";

export type LocalizedText = Record<Lang, string>;

export type WebProject = {
  slug: string;
  name: string;
  url: string;
  shot: string; // desktop screenshot
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
  shot2?: string;
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
    shot: "/work/doldurkabi.png",
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
    shot: "/work/temizlikexpress.png",
    category: { tr: "Web & Mobil Platform", en: "Web & Mobile Platform" },
    desc: {
      tr: "Temizlik hizmetleri için web sitesi ve kullanıcı mobil uygulaması; sipariş ve yönetim akışıyla.",
      en: "Website and a user mobile app for cleaning services, with ordering and management flows.",
    },
    tags: ["Web", "Mobil", "Reklam"],
    accent: "blue",
  },
  {
    slug: "harmanapps",
    name: "Harman Apps",
    url: "https://harmanapps.com/",
    shot: "/work/harmanapps.png",
    category: { tr: "Web & Mobil", en: "Web & Mobile" },
    desc: {
      tr: "Türkiye'nin tarım pazaryeri — çiftçiden alıcıya doğrudan ticaret. Web ve mobil uygulamayla hızlı, geniş kapsamlı bir platform.",
      en: "Turkey's agricultural marketplace — trade directly from farmer to buyer. A fast, far-reaching platform across web and mobile.",
    },
    tags: ["Web", "Mobil", "Tasarım"],
    accent: "green",
  },
  {
    slug: "dryasin",
    name: "Dr. Yasin Kurtboğan",
    url: "https://dryasinkurtbogan.com.tr/",
    shot: "/work/dryasin.png",
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
    shot: "/work/cekictrans.png",
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
    shot: "/work/apps/doldurkabi.png",
    shot2: "/work/apps/doldurkabi-2.png",
    tagline: { tr: "Türkiye'nin hayvanseverler platformu", en: "Turkey's animal-lovers platform" },
    appStore: "https://apps.apple.com/tr/app/doldurkab%C4%B1/id6753592445?l=tr",
    googlePlay: "https://play.google.com/store/apps/details?id=com.ismailselim.doldurkabi&hl=tr",
  },
  {
    slug: "temizlikexpress",
    name: "Temizlik Express",
    shot: "/work/apps/temizlikexpress.png",
    tagline: { tr: "Tek dokunuşla temizlik", en: "Cleaning in one tap" },
    appStore: "https://apps.apple.com/tr/app/temizlik-express/id6445817029?l=tr",
    googlePlay: "https://play.google.com/store/apps/details?id=com.temizlikexpress.temizlik",
  },
  {
    slug: "harmanapps",
    name: "Harman App",
    shot: "/work/apps/harman.png",
    tagline: { tr: "Türkiye'nin tarım pazaryeri", en: "Turkey's agricultural marketplace" },
    appStore: "https://apps.apple.com/tr/app/harmanapp/id6751776802?l=tr",
    googlePlay: "https://play.google.com/store/apps/details?id=com.harmanwebview",
  },
  {
    slug: "merak",
    name: "Merak Et Öğren",
    shot: "/work/apps/merak.png",
    shot2: "/work/apps/merak-2.png",
    tagline: { tr: "Merak ettiğin her konuda podcast", en: "Podcasts on everything you're curious about" },
    comingSoon: true,
  },
];

// Brand names for the trust marquee (includes brands whose live sites are temporarily offline).
export const brandNames = [
  "DoldurKabı",
  "Temizlik Express",
  "Harman Apps",
  "Esen Kuruyemiş",
  "Dr. Yasin Kurtboğan",
  "Merak Et Öğren",
  "Çekiç Trans",
];

// Brand logos for the trust marquee. `url` links to the brand's live site when available.
export const brandLogos: { name: string; src: string; url?: string }[] = [
  { name: "DoldurKabı", src: "/logos/doldurkabi.png", url: "https://doldurkabi.com/" },
  { name: "Temizlik Express", src: "/logos/temizlikexpress.png", url: "https://temizlikexpress.com/" },
  { name: "Harman Apps", src: "/logos/harman.png", url: "https://harmanapps.com/" },
  { name: "Esen Kuruyemiş", src: "/logos/esen.png", url: "https://esenkuruyemis.com/" },
  { name: "Dr. Yasin Kurtboğan", src: "/logos/dryasin.png", url: "https://dryasinkurtbogan.com.tr/" },
  { name: "Merak Et Öğren", src: "/logos/merak.png" },
  { name: "Çekiç Trans", src: "/logos/cekictrans.png", url: "https://cekictrans.com/" },
];
