// Forpus — bilingual content dictionary (TR default, EN secondary).
// `en` is typed as `typeof tr` so both languages always stay in parity.

export type Lang = "tr" | "en";

const tr = {
  meta: {
    title: "Forpus Yazılım — Web, Mobil, Reklam & Tasarım",
    description:
      "Forpus, fikrinizi büyüyen dijital ürünlere dönüştüren bir yazılım stüdyosu. Web, mobil uygulama, Meta & Google reklamları, sosyal medya ve tasarım — tek çatı altında.",
  },
  nav: {
    services: "Hizmetler",
    personas: "Kime Göre",
    work: "İşler",
    packages: "Paketler",
    process: "Süreç",
    team: "Ekip",
    contact: "İletişim",
    cta: "Projeni Başlat",
  },
  hero: {
    eyebrow: "Dijital Ürün Stüdyosu",
    titleLead: "Fikrinizi,",
    titleHighlight: "büyüyen dijital ürünlere",
    titleTail: "dönüştürüyoruz.",
    subtitle:
      "Web, mobil uygulama, reklam ve tasarım — tek çatı altında. İki mühendis kurucu ve uzman ekibimizle markanızı uçtan uca dijitale taşıyoruz.",
    ctaPrimary: "Projeni Başlat",
    ctaSecondary: "İşlerimizi Gör",
    scroll: "Keşfet",
    chips: [
      { value: "Web + Mobil", label: "Tek ekipten" },
      { value: "App Store & Play", label: "Yayın dahil" },
      { value: "Meta & Google", label: "Reklam yönetimi" },
    ],
  },
  marquee: {
    label: "Birlikte çalıştığımız markalar",
  },
  services: {
    eyebrow: "Ne Yapıyoruz",
    title: "Tek bir ekip,\nuçtan uca dijital.",
    subtitle:
      "Markanızın ihtiyacı olan her şeyi tek yerden alın. Birbirine entegre çalışan dört temel hizmet.",
    items: [
      {
        key: "web",
        name: "Web Yazılım & Geliştirme",
        desc: "Kurumsal siteler, web uygulamaları ve e-ticaret. Hızlı, SEO uyumlu ve ölçeklenebilir altyapı.",
        features: ["Kurumsal Web Sitesi", "Web Uygulaması", "E-Ticaret", "SEO & Performans"],
      },
      {
        key: "mobile",
        name: "Mobil Uygulama",
        desc: "iOS ve Android için akıcı, native hisli uygulamalar. App Store ve Google Play yayını dahil.",
        features: ["iOS & Android", "Flutter", "Mağaza Yayını", "Bildirim & Analitik"],
      },
      {
        key: "ads",
        name: "Reklam & Performans",
        desc: "Meta ve Google reklamlarıyla doğru kitleye ulaşın. Ölçülebilir, dönüşüm odaklı kampanyalar.",
        features: ["Meta Ads", "Google Ads", "Dönüşüm Takibi", "A/B Test"],
      },
      {
        key: "design",
        name: "Sosyal Medya & Tasarım",
        desc: "Sosyal medya yönetimi, marka kimliği, UI/UX ve grafik tasarım. Yaratıcı ekibimizle.",
        features: ["Sosyal Medya Yönetimi", "Marka Kimliği", "UI/UX Tasarım", "İçerik Üretimi"],
      },
    ],
  },
  personas: {
    eyebrow: "Kime Göre",
    title: "Sektörünüze göre\nkonuşuyoruz.",
    subtitle:
      "Web, mobil, reklam, tasarım — sizin işinizde neyin işe yaradığını biliyoruz. İşte tam olarak ne kuruyoruz.",
    deliverLabel: "Örnek teslim:",
    items: [
      {
        key: "doktor",
        label: "Doktora özel",
        headline: "Hastalarınız sizi\nGoogle'da değil,\nkliniğinizde bulsun.",
        pitch:
          "Klinik web siteniz, online randevu ve hasta paneli. Siz hastaya bakarken; sistem sekreterliği, hatırlatmaları ve dijital görünürlüğü sizin yerinize halleder.",
        deliver: "Web sitesi + online randevu sistemi",
        cta: "Kliniğim için konuşalım",
      },
      {
        key: "diyetisyen",
        label: "Diyetisyene özel",
        headline: "Danışanlarınız ilerlemesini\ncebinde görsün.",
        pitch:
          "Randevu ve danışan takibiyle ölçümler, beslenme planları ve mesajlaşma tek yerde — web siteniz de cabası.",
        deliver: "Web sitesi + randevu & danışan takibi",
        cta: "Diyetisyen paketini konuşalım",
      },
      {
        key: "psikolog",
        label: "Psikoloğa özel",
        headline: "Seans yönetimini yazılıma bırakın,\ndinlemeye odaklanın.",
        pitch:
          "Online randevu, otomatik hatırlatmalar ve güven veren, sade bir web varlığı.",
        deliver: "Web sitesi + online randevu",
        cta: "Danışanlarım için konuşalım",
      },
      {
        key: "eticaret",
        label: "E-ticaret markasına özel",
        headline: "Satan bir mağaza kurun,\nreklamla büyütün.",
        pitch:
          "Hızlı ve dönüşüm odaklı e-ticaret siteniz + Meta ve Google reklamlarıyla ölçülebilir satış. Kurulumdan büyümeye tek elden.",
        deliver: "E-ticaret sitesi + performans reklamı yönetimi",
        cta: "Markamı büyütelim",
      },
      {
        key: "girisimci",
        label: "Girişimciye özel",
        headline: "Fikriniz var,\nyazılım yok mu?\nGerisi bizde.",
        pitch:
          "Fikrinizi konuşup MVP'ye çeviriyoruz: web + mobil uygulama, mağaza yayını, ilk kullanıcılar. Teknik ortağınız gibi çalışırız.",
        deliver: "Fikirden yayına MVP",
        cta: "Fikrimi hayata geçirelim",
      },
      {
        key: "tekne",
        label: "Tekne & turizme özel",
        headline: "Tekneniz boş kalmasın,\nrezervasyon online gelsin.",
        pitch:
          "Tur ve tekne kiralama için rezervasyon ve online ödeme entegrasyonu; turistin gördüğü şık, çok dilli bir site.",
        deliver: "Rezervasyon sistemi + online ödeme entegrasyonu",
        cta: "Sezonu dolduralım",
      },
      {
        key: "restoran",
        label: "Restoran & kafeye özel",
        headline: "Menünüz cepte,\nmasanız dolu.",
        pitch:
          "QR menü, online rezervasyon ve paket sipariş; sosyal medyada iştah açan bir marka görünümüyle.",
        deliver: "QR menü + rezervasyon",
        cta: "Mekanımı konuşalım",
      },
      {
        key: "kisiselmarka",
        label: "Kişisel markaya özel",
        headline: "Adınız bir marka olsun,\nsizi ciddiye alsınlar.",
        pitch:
          "Kişisel web siteniz, içerik ve tutarlı bir sosyal medya kimliğiyle kendinizi profesyonelce konumlandırıyoruz.",
        deliver: "Kişisel site + marka kimliği",
        cta: "Markamı kuralım",
      },
      {
        key: "avukat",
        label: "Avukata özel",
        headline: "Güven veren bir büro,\ndijitalde de öyle görünsün.",
        pitch:
          "Uzmanlık alanlarınızı anlatan kurumsal web siteniz, online randevu ve gizlilik odaklı iletişim.",
        deliver: "Kurumsal site + online randevu",
        cta: "Büromu konuşalım",
      },
      {
        key: "emlak",
        label: "Emlağa özel",
        headline: "İlanlarınız şık dursun,\nalıcı sizi arasın.",
        pitch:
          "Filtrelenebilir portföy siteniz; harita, galeri ve her ilanda tek tık iletişim + WhatsApp.",
        deliver: "Portföy sitesi + ilan yönetimi",
        cta: "Portföyümü konuşalım",
      },
    ],
    more: {
      title: "Listede yok musunuz?",
      pitch: "Sektörünüz ne olursa olsun, fikrinizi anlatın — size özel kuruyoruz.",
      cta: "Yine de konuşalım",
    },
  },
  packages: {
    eyebrow: "Paketler",
    title: "Size uygun bir\nbaşlangıç.",
    subtitle:
      "Net kapsam, şeffaf süreç. Kesin fiyatı ihtiyacınıza göre kısa bir görüşmede netleştiriyoruz — gizli kalem yok.",
    badge: "En Popüler",
    swipeHint: "Kaydırın",
    items: [
      {
        key: "baslangic",
        name: "Başlangıç",
        tagline: "Hızlı, şık bir dijital varlık.",
        timeline: "~1 hafta",
        features: [
          "Tek/az sayfalı tanıtım sitesi",
          "Mobil uyumlu şık tasarım",
          "İletişim formu",
          "Temel SEO ayarları",
          "Alan adı & yayın kurulumu",
        ],
        cta: "Teklif Al",
      },
      {
        key: "kurumsal",
        name: "Kurumsal",
        tagline: "Markanızı büyüten özel tasarım.",
        timeline: "~2–4 hafta",
        features: [
          "Çok sayfalı özel tasarım",
          "Scroll animasyonları",
          "SEO & performans optimizasyonu",
          "Çok dilli (TR/EN) opsiyonu",
          "İçerik & görsel desteği",
          "Yönetilebilir içerik (opsiyonel)",
        ],
        cta: "Teklif Al",
      },
      {
        key: "premium",
        name: "Premium / Uygulama",
        tagline: "Panel, uygulama, uçtan uca sistem.",
        timeline: "Projeye özel",
        features: [
          "Web + mobil uygulama",
          "Yönetim paneli & kullanıcı sistemi",
          "Randevu / rezervasyon / ödeme",
          "Size özel iş akışları",
          "Reklam & büyüme desteği",
          "Sürekli bakım & destek",
        ],
        cta: "Projeni Konuşalım",
      },
    ],
  },
  process: {
    eyebrow: "Nasıl Çalışıyoruz",
    title: "Fikirden lansmana,\nşeffaf bir süreç.",
    subtitle: "Her adımda yanınızdayız. Net iletişim, hızlı teslim, sürdürülebilir sonuç.",
    steps: [
      {
        no: "01",
        name: "Keşif & Strateji",
        desc: "İhtiyaçlarınızı dinler; hedefleri, kapsamı ve yol haritasını birlikte netleştiririz.",
      },
      {
        no: "02",
        name: "Tasarım",
        desc: "Kullanıcı odaklı arayüz ve marka kimliğini, sizinle iterasyonlarla kurgularız.",
      },
      {
        no: "03",
        name: "Geliştirme",
        desc: "Temiz kod ve modern teknoloji ile web ve mobili hayata geçiririz.",
      },
      {
        no: "04",
        name: "Lansman & Büyüme",
        desc: "Yayına alır; reklam, analitik ve bakımla büyümeyi sürdürülebilir kılarız.",
      },
    ],
  },
  work: {
    eyebrow: "Seçili İşler",
    title: "Yayında olan,\ngerçek projeler.",
    subtitle:
      "Freelance ve proje bazlı çalıştığımız markaların canlı siteleri. Hepsi şu an internette yayında.",
    visit: "Siteyi Ziyaret Et",
    cta: "Daha fazla iş için bizimle konuşun",
  },
  mobile: {
    eyebrow: "Mobil Uygulamalar",
    title: "Cebinizde\nyaşayan ürünler.",
    subtitle:
      "App Store ve Google Play'de yayınladığımız mobil uygulamalardan bazıları. Tasarımdan yayına tüm süreç bize ait.",
    download: "İndir",
    comingSoon: "Geliştiriliyor",
  },
  stats: {
    eyebrow: "Rakamlarla Forpus",
    title: "Sözden çok,\nteslim edilen iş.",    items: [
      { value: 20, suffix: "+", label: "Tamamlanan Proje" },
      { value: 15, suffix: "+", label: "Mutlu Marka" },
      { value: 6, suffix: "+", label: "Yıl Deneyim" },
      { value: 100, suffix: "%", label: "Zamanında Teslim" },
    ],
  },
  team: {
    eyebrow: "Ekip",
    title: "İki mühendis kurucu,\ngenişleyen bir ekip.",
    subtitle:
      "Forpus'u iki mühendis kurdu. Tasarımcı, reklam ve geliştirici ekibimizle; fikirden lansmana kadar her aşamayı tek çatı altında yürütüyoruz.",
    founders: [
      {        role: "Kurucu Ortak · Bilgisayar Mühendisi",
        focus: "Mobil Uygulama & Sistem",
        bio: "Mobil uygulama geliştirme ve ürün mimarisi. Fikri, mağazada yayınlanan akıcı bir uygulamaya dönüştürür.",
      },
      {        role: "Kurucu Ortak · Yazılım Mühendisi",
        focus: "Web & Arayüz",
        bio: "Web yazılım ve modern arayüz geliştirme. Hızlı, ölçeklenebilir ve şık web deneyimleri kurar.",
      },
    ],
    extendedTitle: "Ve geniş ekibimiz",
    extended: ["Tasarımcılar", "Reklam Uzmanları", "İçerik Üreticileri", "Geliştiriciler"],
  },
  testimonials: {
    eyebrow: "Ne Diyorlar",
    title: "Birlikte çalıştığımız\nmarkaların yorumları.",
    online: "çevrimiçi",
    messages: [
      { from: "client", author: "Ahmet K.", company: "E-Ticaret", text: "Hocam siteyi gördüm, beklediğimden çok daha iyi olmuş 👏", time: "14:02" },
      { from: "forpus", text: "Çok teşekkürler! 🙌 Mobil uygulamayı da bu hafta mağazaya yolluyoruz.", time: "14:03" },
      { from: "client", author: "Ahmet K.", company: "E-Ticaret", text: "Web + uygulamayı tek ekipten almak her şeyi kolaylaştırdı 🔥", time: "14:04" },
      { from: "client", author: "Zeynep A.", company: "Hizmet Sektörü", text: "Reklam tarafında fark belli, bu ay talepler ciddi arttı 📈", time: "16:20" },
      { from: "forpus", text: "Harika 😊 Dönüşüm raporunu da sizinle paylaşacağız.", time: "16:21" },
      { from: "client", author: "Mert D.", company: "Girişim", text: "Tasarımdan koda her detayı düşünmüşsünüz, gerçek bir ortak gibisiniz 💚", time: "19:45" },
    ],
  },
  cta: {
    eyebrow: "Hadi Başlayalım",
    title: "Bir sonraki projeyi\nbirlikte yapalım.",
    subtitle:
      "Aklınızdaki fikri anlatın; size en uygun yol haritasını ve teklifi 48 saat içinde hazırlayalım.",
    button: "Projeni Anlat",
  },
  contact: {
    eyebrow: "İletişim",
    title: "Konuşalım.",
    subtitle: "Formu doldurun ya da doğrudan bize ulaşın. En kısa sürede dönüş yapıyoruz.",
    form: {
      name: "Adınız",
      email: "E-posta",
      company: "Şirket / Marka (opsiyonel)",
      service: "İlgilendiğiniz hizmet",
      serviceOptions: ["Web Yazılım", "Mobil Uygulama", "Reklam & Performans", "Sosyal Medya & Tasarım", "Hepsi / Emin değilim"],
      message: "Projenizden bahsedin",
      submit: "Gönder",
      sending: "Gönderiliyor…",
      success: "Teşekkürler! Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.",
      error: "Bir sorun oluştu. Lütfen tekrar deneyin ya da doğrudan e-posta gönderin.",
    },
    info: {
      emailLabel: "E-posta",
      email: "forpusyazilim@gmail.com",
      phoneLabel: "Telefon / WhatsApp",
      phone: "+90 5xx xxx xx xx",
      socialLabel: "Sosyal Medya",
      locationLabel: "Konum",
      location: "Türkiye · Uzaktan çalışıyoruz",
    },
  },
  footer: {
    tagline: "Fikrinizi büyüyen dijital ürünlere dönüştürüyoruz.",
    rights: "Tüm hakları saklıdır.",
    madeWith: "Sevgiyle kodlandı",
    nav: "Menü",
    services: "Hizmetler",
    contact: "İletişim",
    backToTop: "Yukarı çık",
  },
  langToggle: { tr: "TR", en: "EN", switchTo: "English" },
};

const en: typeof tr = {
  meta: {
    title: "Forpus Software — Web, Mobile, Ads & Design",
    description:
      "Forpus is a software studio that turns your idea into digital products that grow. Web, mobile apps, Meta & Google ads, social media and design — under one roof.",
  },
  nav: {
    services: "Services",
    personas: "Built for you",
    work: "Work",
    packages: "Packages",
    process: "Process",
    team: "Team",
    contact: "Contact",
    cta: "Start a Project",
  },
  hero: {
    eyebrow: "Digital Product Studio",
    titleLead: "We turn your ideas into",
    titleHighlight: "digital products that grow",
    titleTail: "",
    subtitle:
      "Web, mobile apps, ads and design — under one roof. Two engineer founders and an expert team take your brand end-to-end into digital.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "See Our Work",
    scroll: "Explore",
    chips: [
      { value: "Web + Mobile", label: "One team" },
      { value: "App Store & Play", label: "Launch included" },
      { value: "Meta & Google", label: "Ad management" },
    ],
  },
  marquee: {
    label: "Brands we've worked with",
  },
  services: {
    eyebrow: "What We Do",
    title: "One team,\nend-to-end digital.",
    subtitle:
      "Get everything your brand needs from a single place. Four core services that work together.",
    items: [
      {
        key: "web",
        name: "Web Development",
        desc: "Corporate sites, web apps and e-commerce. Fast, SEO-friendly and scalable infrastructure.",
        features: ["Corporate Website", "Web App", "E-Commerce", "SEO & Performance"],
      },
      {
        key: "mobile",
        name: "Mobile Apps",
        desc: "Smooth, native-feeling apps for iOS and Android. App Store and Google Play launch included.",
        features: ["iOS & Android", "Flutter", "Store Launch", "Push & Analytics"],
      },
      {
        key: "ads",
        name: "Ads & Performance",
        desc: "Reach the right audience with Meta and Google ads. Measurable, conversion-focused campaigns.",
        features: ["Meta Ads", "Google Ads", "Conversion Tracking", "A/B Testing"],
      },
      {
        key: "design",
        name: "Social & Design",
        desc: "Social media management, brand identity, UI/UX and graphic design. With our creative team.",
        features: ["Social Media Management", "Brand Identity", "UI/UX Design", "Content Creation"],
      },
    ],
  },
  personas: {
    eyebrow: "Built for you",
    title: "We speak your\nindustry's language.",
    subtitle:
      "Web, mobile, ads, design — we know what actually moves the needle in your line of work. Here's exactly what we build.",
    deliverLabel: "Sample delivery:",
    items: [
      {
        key: "doktor",
        label: "For doctors",
        headline: "Let patients find you\nin your clinic —\nnot lost on Google.",
        pitch:
          "A clinic website, online booking and a patient panel. While you focus on care, the system handles scheduling, reminders and your digital visibility.",
        deliver: "Website + online booking system",
        cta: "Let's talk about my clinic",
      },
      {
        key: "diyetisyen",
        label: "For dietitians",
        headline: "Let clients track\ntheir progress\nfrom their pocket.",
        pitch:
          "Booking plus a client-tracking app: measurements, nutrition plans and messaging in one place — your website included.",
        deliver: "Website + booking & client tracking",
        cta: "Let's talk dietitian package",
      },
      {
        key: "psikolog",
        label: "For psychologists",
        headline: "Leave session admin to software,\nfocus on listening.",
        pitch:
          "A reassuring, simple web presence with online booking and automatic reminders.",
        deliver: "Website + online booking",
        cta: "Let's talk about my practice",
      },
      {
        key: "eticaret",
        label: "For e-commerce brands",
        headline: "Build a store that sells,\ngrow it with ads.",
        pitch:
          "A fast, conversion-focused store plus measurable sales from Meta and Google ads — from setup to growth, under one roof.",
        deliver: "E-commerce site + performance ad management",
        cta: "Let's grow my brand",
      },
      {
        key: "girisimci",
        label: "For founders",
        headline: "Got the idea,\nnot the tech?\nWe bring the rest.",
        pitch:
          "We turn your idea into an MVP: web + mobile app, store launch, first users. We work like your technical co-founder.",
        deliver: "MVP from idea to launch",
        cta: "Let's build my idea",
      },
      {
        key: "tekne",
        label: "For boats & tourism",
        headline: "Keep your boat booked,\ntake reservations online.",
        pitch:
          "A reservation and online-payment integration for tours and boat rentals, with a sleek, multilingual site tourists love.",
        deliver: "Reservations + online-payment integration",
        cta: "Let's fill the season",
      },
      {
        key: "restoran",
        label: "For restaurants & cafés",
        headline: "Menu in every pocket,\ntables full.",
        pitch:
          "QR menu, online reservations and takeaway ordering — with an appetite-whetting brand look on social media.",
        deliver: "QR menu + reservations",
        cta: "Let's talk about my venue",
      },
      {
        key: "kisiselmarka",
        label: "For personal brands",
        headline: "Make your name a brand\nthey take seriously.",
        pitch:
          "We position you professionally with a personal website, content and a consistent social-media identity.",
        deliver: "Personal site + brand identity",
        cta: "Let's build my brand",
      },
      {
        key: "avukat",
        label: "For lawyers",
        headline: "A firm that inspires trust —\nlet it look that way online.",
        pitch:
          "A corporate website presenting your practice areas, online appointments and privacy-first contact.",
        deliver: "Corporate site + online booking",
        cta: "Let's talk about my firm",
      },
      {
        key: "emlak",
        label: "For real estate",
        headline: "Make your listings shine,\nlet buyers call you.",
        pitch:
          "A filterable portfolio site with maps, galleries and one-tap contact + WhatsApp on every listing.",
        deliver: "Portfolio site + listing management",
        cta: "Let's talk about my portfolio",
      },
    ],
    more: {
      title: "Not on the list?",
      pitch: "Whatever your field, tell us your idea — we build it for you.",
      cta: "Let's talk anyway",
    },
  },
  packages: {
    eyebrow: "Packages",
    title: "A starting point\nthat fits you.",
    subtitle:
      "Clear scope, transparent process. We settle the exact price to your needs on a quick call — no hidden line items.",
    badge: "Most Popular",
    swipeHint: "Swipe",
    items: [
      {
        key: "baslangic",
        name: "Starter",
        tagline: "A fast, sharp digital presence.",
        timeline: "~1 week",
        features: [
          "One / few-page landing site",
          "Sharp, mobile-friendly design",
          "Contact form",
          "Basic SEO setup",
          "Domain & launch setup",
        ],
        cta: "Get a Quote",
      },
      {
        key: "kurumsal",
        name: "Corporate",
        tagline: "A custom site that grows your brand.",
        timeline: "~2–4 weeks",
        features: [
          "Multi-page custom design",
          "Scroll animations",
          "SEO & performance optimization",
          "Bilingual (TR/EN) option",
          "Content & visual support",
          "Editable content (optional)",
        ],
        cta: "Get a Quote",
      },
      {
        key: "premium",
        name: "Premium / App",
        tagline: "Panels, apps, end-to-end systems.",
        timeline: "Custom",
        features: [
          "Web + mobile app",
          "Admin panel & user system",
          "Booking / reservation / payments",
          "Custom business workflows",
          "Ads & growth support",
          "Ongoing maintenance & support",
        ],
        cta: "Let's talk",
      },
    ],
  },
  process: {
    eyebrow: "How We Work",
    title: "From idea to launch,\na transparent process.",
    subtitle: "We're with you at every step. Clear communication, fast delivery, lasting results.",
    steps: [
      {
        no: "01",
        name: "Discovery & Strategy",
        desc: "We listen to your needs and define goals, scope and the roadmap together.",
      },
      {
        no: "02",
        name: "Design",
        desc: "We craft a user-focused interface and brand identity through iterations with you.",
      },
      {
        no: "03",
        name: "Development",
        desc: "We build web and mobile with clean code and modern technology.",
      },
      {
        no: "04",
        name: "Launch & Growth",
        desc: "We ship it, then sustain growth with ads, analytics and maintenance.",
      },
    ],
  },
  work: {
    eyebrow: "Selected Work",
    title: "Real projects,\nlive on the web.",
    subtitle:
      "Live sites of brands we work with on a freelance and project basis. All of them are online right now.",
    visit: "Visit Site",
    cta: "Talk to us about your project",
  },
  mobile: {
    eyebrow: "Mobile Apps",
    title: "Products that live\nin your pocket.",
    subtitle:
      "Some of the mobile apps we've published on the App Store and Google Play. The whole process, from design to launch, is ours.",
    download: "Download",
    comingSoon: "In development",
  },
  stats: {
    eyebrow: "Forpus in Numbers",
    title: "Less talk,\nmore delivered work.",    items: [
      { value: 20, suffix: "+", label: "Completed Projects" },
      { value: 15, suffix: "+", label: "Happy Brands" },
      { value: 6, suffix: "+", label: "Years of Experience" },
      { value: 100, suffix: "%", label: "On-time Delivery" },
    ],
  },
  team: {
    eyebrow: "Team",
    title: "Two engineer founders,\na growing team.",
    subtitle:
      "Forpus was founded by two engineers. With our designers, ad specialists and developers, we run every stage — from idea to launch — under one roof.",
    founders: [
      {        role: "Co-Founder · Computer Engineer",
        focus: "Mobile Apps & Systems",
        bio: "Mobile app development and product architecture. Turns an idea into a smooth app published on the stores.",
      },
      {        role: "Co-Founder · Software Engineer",
        focus: "Web & Interfaces",
        bio: "Web software and modern interface development. Builds fast, scalable and elegant web experiences.",
      },
    ],
    extendedTitle: "And our extended team",
    extended: ["Designers", "Ad Specialists", "Content Creators", "Developers"],
  },
  testimonials: {
    eyebrow: "What They Say",
    title: "Words from the\nbrands we work with.",
    online: "online",
    messages: [
      { from: "client", author: "Ahmet K.", company: "E-Commerce", text: "Just saw the site — way better than I expected 👏", time: "14:02" },
      { from: "forpus", text: "Thank you! 🙌 We're shipping the mobile app to the stores this week too.", time: "14:03" },
      { from: "client", author: "Ahmet K.", company: "E-Commerce", text: "Getting web + app from one team made everything so much easier 🔥", time: "14:04" },
      { from: "client", author: "Zeynep A.", company: "Services", text: "The ads are clearly working — requests jumped this month 📈", time: "16:20" },
      { from: "forpus", text: "Great 😊 We'll share the conversion report with you as well.", time: "16:21" },
      { from: "client", author: "Mert D.", company: "Startup", text: "You thought of every detail from design to code — feels like a real partner 💚", time: "19:45" },
    ],
  },
  cta: {
    eyebrow: "Let's Start",
    title: "Let's build your\nnext project together.",
    subtitle:
      "Tell us your idea and we'll prepare the best roadmap and a proposal for you within 48 hours.",
    button: "Tell Us Your Project",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's talk.",
    subtitle: "Fill in the form or reach us directly. We get back to you as soon as possible.",
    form: {
      name: "Your Name",
      email: "Email",
      company: "Company / Brand (optional)",
      service: "Service you're interested in",
      serviceOptions: ["Web Development", "Mobile App", "Ads & Performance", "Social & Design", "All / Not sure"],
      message: "Tell us about your project",
      submit: "Send",
      sending: "Sending…",
      success: "Thank you! Your message has reached us. We'll get back to you shortly.",
      error: "Something went wrong. Please try again or email us directly.",
    },
    info: {
      emailLabel: "Email",
      email: "forpusyazilim@gmail.com",
      phoneLabel: "Phone / WhatsApp",
      phone: "+90 5xx xxx xx xx",
      socialLabel: "Social Media",
      locationLabel: "Location",
      location: "Türkiye · We work remotely",
    },
  },
  footer: {
    tagline: "We turn your ideas into digital products that grow.",
    rights: "All rights reserved.",
    madeWith: "Crafted with love",
    nav: "Menu",
    services: "Services",
    contact: "Contact",
    backToTop: "Back to top",
  },
  langToggle: { tr: "TR", en: "EN", switchTo: "Türkçe" },
};

export const dictionary = { tr, en };
export type Dict = typeof tr;
