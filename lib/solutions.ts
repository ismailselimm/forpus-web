// SEO landing pages ("çözümler" / solutions). Each targets a high-intent, lower-competition
// search (e.g. "doktor web sitesi") in both TR and EN. Rendered as static HTML so Google can
// index the copy. Routes: /cozumler/[slug] (tr) and /en/solutions/[slug] (en).
import type { ServiceKey } from "./services";

export type SolutionContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  benefits: { title: string; body: string }[];
  featuresTitle: string;
  features: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

export type Solution = {
  key: string; // reuses persona artwork at /generated/personas/{key}.webp when available
  image: string;
  service: ServiceKey;
  slug: { tr: string; en: string };
  tr: SolutionContent;
  en: SolutionContent;
};

export const solutions: Solution[] = [
  {
    key: "doktor",
    image: "/generated/personas/doktor.webp",
    service: "web",
    slug: { tr: "doktor-web-sitesi", en: "doctor-website" },
    tr: {
      metaTitle: "Doktor Web Sitesi Tasarımı",
      metaDescription:
        "Hekimlere özel, güven veren ve mobil uyumlu doktor web sitesi tasarımı. Online randevu, hizmet tanıtımı ve Google'da görünürlük. Ücretsiz teklif alın.",
      eyebrow: "Doktora Özel",
      h1: "Doktor Web Sitesi",
      intro:
        "Hastalarınız sizi kliniğinizden önce Google'da arıyor. Güven veren, hızlı ve mobil uyumlu bir web sitesi, gelen hasta sayısını doğrudan etkiler. Forpus olarak hekimlere özel; randevu, hizmet ve bilgilendirme odaklı siteler tasarlıyoruz.",
      benefits: [
        { title: "İlk saniyede güven", body: "Temiz ve profesyonel bir tasarım hastada güven oluşturur, klinik itibarınızı online'a taşır." },
        { title: "Online randevu", body: "Ziyaretçiyi tek tıkla randevu formuna veya WhatsApp'a yönlendirin; boş koltuk kalmasın." },
        { title: "Google'da bulunun", body: "Uzmanlığınız ve konumunuz için optimize edilmiş yapı ile bölgenizdeki aramalarda öne çıkın." },
      ],
      featuresTitle: "Doktor sitenizde neler olur?",
      features: [
        "Uzmanlık alanı ve hizmet sayfaları",
        "Online randevu / WhatsApp entegrasyonu",
        "Hasta bilgilendirme ve blog altyapısı",
        "Mobil uyumlu, hızlı yüklenen tasarım",
        "Google ve harita için SEO ayarları",
        "KVKK uyumlu iletişim formu",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "Doktor web sitesi ne kadar sürede hazır olur?", a: "İçerikleriniz hazırsa tanıtım siteniz genellikle 1 hafta içinde yayında olur. Randevu sistemi gibi ek özellikler süreyi biraz uzatabilir." },
        { q: "Online randevu sistemi ekleyebilir misiniz?", a: "Evet. Basit WhatsApp/form yönlendirmesinden tam otomatik randevu takvimine kadar ihtiyacınıza göre kurgularız." },
        { q: "Sitem Google'da çıkacak mı?", a: "Siteyi teknik SEO ayarlarıyla teslim ederiz; Google İşletme profili ve içerik desteğiyle görünürlüğünüzü zaman içinde artırırız." },
      ],
      ctaTitle: "Kliniğiniz için web sitesi konuşalım",
      ctaText: "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "Doctor Website Design",
      metaDescription:
        "Trustworthy, mobile-friendly website design for doctors and clinics. Online booking, service pages and Google visibility. Get a free quote.",
      eyebrow: "For Doctors",
      h1: "Doctor Website Design",
      intro:
        "Patients look you up on Google before they walk into your clinic. A fast, trustworthy, mobile-friendly website directly affects how many of them book. Forpus builds sites for physicians focused on appointments, services and clear information.",
      benefits: [
        { title: "Trust on first sight", body: "A clean, professional design builds confidence and carries your clinic's reputation online." },
        { title: "Online booking", body: "Send visitors to a booking form or WhatsApp in one tap so no slot goes empty." },
        { title: "Get found on Google", body: "A structure optimized for your specialty and location helps you stand out in local searches." },
      ],
      featuresTitle: "What's included?",
      features: [
        "Specialty and service pages",
        "Online booking / WhatsApp integration",
        "Patient info and blog foundation",
        "Fast, mobile-friendly design",
        "SEO setup for Google and Maps",
        "GDPR/KVKK-compliant contact form",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "How long does a doctor website take?", a: "If your content is ready, a presentation site is usually live within a week. Extras like a booking system can add some time." },
        { q: "Can you add an online booking system?", a: "Yes. From a simple WhatsApp/form redirect to a fully automated booking calendar, we tailor it to your needs." },
        { q: "Will my site show up on Google?", a: "We deliver the site with technical SEO in place and grow your visibility over time with a Google Business profile and content." },
      ],
      ctaTitle: "Let's talk about your clinic's website",
      ctaText: "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "diyetisyen",
    image: "/generated/personas/diyetisyen.webp",
    service: "web",
    slug: { tr: "diyetisyen-web-sitesi", en: "dietitian-website" },
    tr: {
      metaTitle: "Diyetisyen Web Sitesi Tasarımı",
      metaDescription:
        "Diyetisyenlere özel web sitesi ve online randevu. Danışan çeken, mobil uyumlu, Google'da bulunan bir dijital vitrin. Ücretsiz teklif alın.",
      eyebrow: "Diyetisyene Özel",
      h1: "Diyetisyen Web Sitesi",
      intro:
        "Danışanlar bir diyetisyen ararken önce internete bakıyor. Sıcak, güven veren ve randevuya yönlendiren bir site, danışan sayınızı artırır. Forpus diyetisyenlere özel; paket tanıtımı, online randevu ve içerik odaklı siteler tasarlıyor.",
      benefits: [
        { title: "Danışan çeken vitrin", body: "Yaklaşımınızı ve sonuçlarınızı öne çıkaran bir tasarımla ilk izlenimi kazanın." },
        { title: "Online randevu & ödeme", body: "Görüşmeleri online takvim ve ödeme ile alın; süreç sizin için otomatikleşsin." },
        { title: "İçerikle güven", body: "Blog ve tarif altyapısıyla uzmanlığınızı gösterin, Google'dan organik danışan kazanın." },
      ],
      featuresTitle: "Diyetisyen sitenizde neler olur?",
      features: [
        "Hizmet ve paket sayfaları",
        "Online randevu / ödeme entegrasyonu",
        "Blog ve tarif altyapısı",
        "Danışan yorumları bölümü",
        "Mobil uyumlu, hızlı tasarım",
        "Google ve sosyal medya bağlantıları",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "Online danışmanlık için altyapı kurar mısınız?", a: "Evet. Randevu, online görüşme yönlendirmesi ve ödeme akışını ihtiyacınıza göre kurarız." },
        { q: "İçerik yazımında destek olur musunuz?", a: "Metin ve görsel yönünde yön veririz; isterseniz temel içerikleri birlikte hazırlarız." },
        { q: "Sosyal medyamla bağlanır mı?", a: "Instagram ve diğer hesaplarınızı siteye entegre eder, takipçiyi danışana çevirmenize yardımcı oluruz." },
      ],
      ctaTitle: "Danışan getiren bir site kuralım",
      ctaText: "İhtiyacınızı konuşalım, size uygun paketi ve net bir teklifi birlikte belirleyelim.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "Dietitian Website Design",
      metaDescription:
        "Website design and online booking for dietitians and nutritionists. A mobile-friendly digital storefront that attracts clients and ranks on Google.",
      eyebrow: "For Dietitians",
      h1: "Dietitian Website Design",
      intro:
        "People search online before choosing a dietitian. A warm, trustworthy site that drives bookings grows your client base. Forpus builds dietitian sites focused on packages, online booking and content.",
      benefits: [
        { title: "A storefront that converts", body: "Win the first impression with a design that highlights your approach and results." },
        { title: "Online booking & payments", body: "Take sessions with an online calendar and payments so the process runs itself." },
        { title: "Trust through content", body: "Show your expertise with a blog and recipes, and earn organic clients from Google." },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service and package pages",
        "Online booking / payment integration",
        "Blog and recipe foundation",
        "Client testimonials section",
        "Fast, mobile-friendly design",
        "Google and social media links",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "Can you set up online consultations?", a: "Yes. We build booking, online-meeting redirects and payment flows around your needs." },
        { q: "Do you help with content?", a: "We guide copy and visuals, and can prepare the core content together if you'd like." },
        { q: "Does it connect to my social media?", a: "We integrate Instagram and other accounts so you can turn followers into clients." },
      ],
      ctaTitle: "Let's build a site that brings clients",
      ctaText: "Let's talk through your needs and pick the right package and a clear quote together.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "psikolog",
    image: "/generated/personas/psikolog.webp",
    service: "web",
    slug: { tr: "psikolog-web-sitesi", en: "psychologist-website" },
    tr: {
      metaTitle: "Psikolog Web Sitesi Tasarımı",
      metaDescription:
        "Psikolog ve terapistlere özel, güven ve mahremiyet odaklı web sitesi tasarımı. Online randevu ve danışan bilgilendirme. Ücretsiz teklif alın.",
      eyebrow: "Psikologa Özel",
      h1: "Psikolog Web Sitesi",
      intro:
        "Terapi arayan biri için ilk adım cesaret ister; siteniz o an güven vermeli. Sakin, profesyonel ve mahremiyete saygılı bir tasarım, danışanın size ulaşmasını kolaylaştırır. Forpus psikologlara özel, ölçülü ve güven veren siteler tasarlıyor.",
      benefits: [
        { title: "Güven ve mahremiyet", body: "Sakin renkler ve net bir dil ile danışana ilk temasta huzur ve güven verin." },
        { title: "Kolay iletişim", body: "Randevu ve gizli iletişim yollarını netleştirin; danışan çekinmeden ulaşsın." },
        { title: "Uzmanlığın görünür", body: "Çalışma alanlarınızı ve yaklaşımınızı anlatarak doğru danışanla eşleşin." },
      ],
      featuresTitle: "Psikolog sitenizde neler olur?",
      features: [
        "Çalışma alanı ve yaklaşım sayfaları",
        "Online / yüz yüze randevu yönlendirmesi",
        "Blog ve bilgilendirme altyapısı",
        "Gizlilik odaklı iletişim formu",
        "Mobil uyumlu, sade tasarım",
        "Google görünürlük ayarları",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "Online terapi için uygun mu?", a: "Evet. Online görüşme yönlendirmesi ve randevu akışını gizlilik önceliğiyle kurarız." },
        { q: "Tasarım fazla dikkat çekici olur mu?", a: "Hayır. Alanınıza uygun, sakin ve güven veren bir dil kullanırız; abartıdan kaçınırız." },
        { q: "İçeriklerimi sonradan güncelleyebilir miyim?", a: "İsterseniz yönetilebilir içerik altyapısı kurarız; yazılarınızı kendiniz güncellersiniz." },
      ],
      ctaTitle: "Güven veren bir site kuralım",
      ctaText: "Yaklaşımınıza uygun, ölçülü bir site için kısa bir görüşme yapalım.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "Psychologist Website Design",
      metaDescription:
        "Calm, privacy-focused website design for psychologists and therapists. Online booking and clear information for clients. Get a free quote.",
      eyebrow: "For Psychologists",
      h1: "Psychologist Website Design",
      intro:
        "Reaching out for therapy takes courage; your site should reassure at that moment. A calm, professional, privacy-respecting design makes it easier for clients to contact you. Forpus builds measured, trustworthy sites for psychologists.",
      benefits: [
        { title: "Trust and privacy", body: "Calm colors and clear language put clients at ease from the first touch." },
        { title: "Easy to reach you", body: "Make booking and discreet contact options clear so clients reach out without hesitation." },
        { title: "Your expertise, visible", body: "Explain your focus areas and approach to match with the right clients." },
      ],
      featuresTitle: "What's included?",
      features: [
        "Focus-area and approach pages",
        "Online / in-person booking redirect",
        "Blog and information foundation",
        "Privacy-focused contact form",
        "Clean, mobile-friendly design",
        "Google visibility setup",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "Does it work for online therapy?", a: "Yes. We set up online-meeting redirects and booking flows with privacy as a priority." },
        { q: "Will the design feel too flashy?", a: "No. We use a calm, reassuring language suited to your field and avoid anything over the top." },
        { q: "Can I update my content later?", a: "If you'd like, we set up editable content so you can update your posts yourself." },
      ],
      ctaTitle: "Let's build a reassuring site",
      ctaText: "Let's have a short call about a measured site that fits your approach.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "avukat",
    image: "/generated/personas/avukat.webp",
    service: "web",
    slug: { tr: "avukat-web-sitesi", en: "lawyer-website" },
    tr: {
      metaTitle: "Avukat & Hukuk Bürosu Web Sitesi",
      metaDescription:
        "Avukat ve hukuk bürolarına özel, kurumsal ve güven veren web sitesi tasarımı. Çalışma alanları, danışan çekme ve Google görünürlüğü. Teklif alın.",
      eyebrow: "Avukata Özel",
      h1: "Avukat Web Sitesi",
      intro:
        "Hukuki destek arayan biri güven ve yetkinlik arar. Kurumsal, ciddi ve mobil uyumlu bir web sitesi, büronuzun itibarını yansıtır ve doğru danışanı getirir. Forpus avukat ve hukuk bürolarına özel siteler tasarlıyor.",
      benefits: [
        { title: "Kurumsal itibar", body: "Ciddi ve profesyonel bir tasarımla büronuzun güvenilirliğini ilk bakışta hissettirin." },
        { title: "Çalışma alanlarınız net", body: "Uzmanlık alanlarınızı ayrı ayrı anlatarak doğru davayla eşleşin." },
        { title: "Danışan getiren yapı", body: "Google'da çalışma alanı aramalarında çıkacak şekilde optimize edilmiş içerik." },
      ],
      featuresTitle: "Avukat sitenizde neler olur?",
      features: [
        "Çalışma alanı (uzmanlık) sayfaları",
        "Ekip ve özgeçmiş bölümü",
        "Makale / bilgi bankası altyapısı",
        "Randevu ve iletişim formu",
        "Kurumsal, mobil uyumlu tasarım",
        "Google ve meslek dizinleri SEO",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "Reklam yasağına uygun mu?", a: "Evet. Baro ve meslek kurallarına uygun, bilgilendirme odaklı, ölçülü bir dille tasarlarız." },
        { q: "Birden fazla çalışma alanı ekleyebilir miyim?", a: "Elbette. Her uzmanlık alanı için ayrı, SEO'ya uygun sayfalar oluştururuz." },
        { q: "Makale yayınlayabilir miyim?", a: "Yönetilebilir bir bilgi bankası kurarız; makalelerinizi ekleyerek görünürlüğünüzü artırırsınız." },
      ],
      ctaTitle: "Büronuz için kurumsal bir site",
      ctaText: "İhtiyacınızı konuşalım, meslek kurallarına uygun net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "Lawyer & Law Firm Website Design",
      metaDescription:
        "Corporate, trustworthy website design for lawyers and law firms. Practice-area pages, client acquisition and Google visibility. Get a quote.",
      eyebrow: "For Lawyers",
      h1: "Lawyer Website Design",
      intro:
        "Someone seeking legal help looks for trust and competence. A corporate, serious, mobile-friendly website reflects your firm's reputation and brings the right clients. Forpus builds sites for lawyers and law firms.",
      benefits: [
        { title: "Corporate reputation", body: "A serious, professional design conveys your firm's credibility at first glance." },
        { title: "Clear practice areas", body: "Explain each area of expertise separately to match with the right cases." },
        { title: "A structure that converts", body: "Content optimized to appear in Google searches for your practice areas." },
      ],
      featuresTitle: "What's included?",
      features: [
        "Practice-area (expertise) pages",
        "Team and bio section",
        "Article / knowledge-base foundation",
        "Booking and contact form",
        "Corporate, mobile-friendly design",
        "SEO for Google and directories",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "Is it compliant with advertising rules?", a: "Yes. We design with an informational, measured tone that respects bar and professional rules." },
        { q: "Can I add multiple practice areas?", a: "Of course. We create separate, SEO-friendly pages for each area of expertise." },
        { q: "Can I publish articles?", a: "We set up a manageable knowledge base so you can add articles and grow your visibility." },
      ],
      ctaTitle: "A corporate site for your firm",
      ctaText: "Let's talk through your needs and give you a clear, compliant quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "emlak",
    image: "/generated/personas/emlak.webp",
    service: "web",
    slug: { tr: "emlak-web-sitesi", en: "real-estate-website" },
    tr: {
      metaTitle: "Emlak Web Sitesi & Portföy Sistemi",
      metaDescription:
        "Emlak ofisleri ve danışmanlar için ilan/portföy yönetimli web sitesi. Harita, filtreleme ve mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Emlağa Özel",
      h1: "Emlak Web Sitesi",
      intro:
        "Alıcı ve kiracılar portföyünüzü artık vitrinde değil, telefonlarında geziyor. İlanları düzenli, filtrelenebilir ve harita üzerinde sunan bir site, portföyünüzü satışa çevirir. Forpus emlak ofislerine özel portföy yönetimli siteler kuruyor.",
      benefits: [
        { title: "Portföyünüz düzenli", body: "İlanları kolayca ekleyin, güncelleyin; her mülk şık bir ilan sayfasıyla öne çıksın." },
        { title: "Filtre ve harita", body: "Konum, fiyat ve tipe göre filtreleme ile ziyaretçi aradığını saniyede bulsun." },
        { title: "Doğru alıcıyı çekin", body: "Google ve sosyal medya için optimize; ilanlarınız daha çok kişiye ulaşsın." },
      ],
      featuresTitle: "Emlak sitenizde neler olur?",
      features: [
        "İlan / portföy yönetim paneli",
        "Konum, fiyat, tip filtreleme",
        "Harita üzerinde ilan gösterimi",
        "WhatsApp ve iletişim entegrasyonu",
        "Mobil uyumlu, hızlı galeri",
        "Google ve sosyal medya SEO",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "İlanları kendim ekleyebilir miyim?", a: "Evet. Kolay bir yönetim paneliyle ilanlarınızı fotoğraf ve detaylarıyla kendiniz eklersiniz." },
        { q: "sahibinden gibi sitelerle entegre olur mu?", a: "İhtiyaca göre dış portallarla bağlantı veya paylaşım akışları kurabiliriz." },
        { q: "Harita özelliği zor mu?", a: "Hayır. İlanları harita üzerinde göstermek standart olarak kurabildiğimiz bir özelliktir." },
      ],
      ctaTitle: "Portföyünüzü satışa çeviren bir site",
      ctaText: "İhtiyacınızı konuşalım, portföy sisteminiz için net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "Real Estate Website & Listing System",
      metaDescription:
        "Website with listing/portfolio management for real estate offices and agents. Map, filtering and mobile-friendly design. Get a free quote.",
      eyebrow: "For Real Estate",
      h1: "Real Estate Website",
      intro:
        "Buyers and renters browse your portfolio on their phones, not in a window. A site that presents listings cleanly, filterable and on a map turns your portfolio into sales. Forpus builds real estate sites with listing management.",
      benefits: [
        { title: "An organized portfolio", body: "Add and update listings easily; every property stands out with a sharp listing page." },
        { title: "Filters and map", body: "With filtering by location, price and type, visitors find what they want in seconds." },
        { title: "Attract the right buyer", body: "Optimized for Google and social media so your listings reach more people." },
      ],
      featuresTitle: "What's included?",
      features: [
        "Listing / portfolio management panel",
        "Filter by location, price, type",
        "Listings shown on a map",
        "WhatsApp and contact integration",
        "Fast, mobile-friendly gallery",
        "Google and social media SEO",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "Can I add listings myself?", a: "Yes. With an easy admin panel you add your listings with photos and details yourself." },
        { q: "Can it integrate with property portals?", a: "Depending on your needs, we can set up connections or sharing flows with external portals." },
        { q: "Is the map feature complex?", a: "No. Showing listings on a map is a feature we set up as standard." },
      ],
      ctaTitle: "A site that turns your portfolio into sales",
      ctaText: "Let's talk through your needs and give you a clear quote for your listing system.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "eticaret",
    image: "/generated/personas/eticaret.webp",
    service: "web",
    slug: { tr: "e-ticaret-sitesi", en: "ecommerce-website" },
    tr: {
      metaTitle: "E-Ticaret Sitesi Kurma",
      metaDescription:
        "Markanıza özel e-ticaret sitesi kurma: ürün kataloğu, sepet, ödeme ve kargo entegrasyonu. Hızlı, mobil uyumlu ve satışa odaklı. Teklif alın.",
      eyebrow: "E-Ticarete Özel",
      h1: "E-Ticaret Sitesi Kurma",
      intro:
        "Ürünlerinizi satmak için pazaryerlerinin komisyonuna mahkûm değilsiniz. Markanıza ait, hızlı ve satışa odaklı bir e-ticaret sitesi hem kârınızı hem müşteri sadakatinizi büyütür. Forpus, ödeme ve kargo entegrasyonuyla uçtan uca e-ticaret siteleri kuruyor.",
      benefits: [
        { title: "Kendi markanız", body: "Pazaryeri komisyonu ve kalabalığı olmadan, tamamen size ait bir satış kanalı." },
        { title: "Satışa odaklı tasarım", body: "Hızlı yüklenen sayfalar, net ürün akışı ve kolay ödeme ile sepeti terk azalır." },
        { title: "Kolay yönetim", body: "Ürün, stok ve siparişleri tek panelden yönetin; işiniz büyüdükçe site de büyüsün." },
      ],
      featuresTitle: "E-ticaret sitenizde neler olur?",
      features: [
        "Ürün kataloğu ve varyant yönetimi",
        "Sepet ve güvenli ödeme entegrasyonu",
        "Kargo ve fatura akışları",
        "İndirim / kupon sistemi",
        "Mobil uyumlu, hızlı vitrin",
        "Google Alışveriş ve SEO ayarları",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "Hangi ödeme altyapılarını destekliyorsunuz?", a: "iyzico, PayTR gibi yaygın Türk ödeme altyapılarını ve sanal POS'ları entegre ederiz." },
        { q: "Siparişleri kolayca yönetebilir miyim?", a: "Evet. Ürün, stok ve siparişleri tek bir yönetim panelinden rahatça yönetirsiniz." },
        { q: "Mevcut ürünlerimi aktarır mısınız?", a: "Ürünlerinizi toplu olarak aktarır, kataloğu düzenli bir şekilde kurarız." },
      ],
      ctaTitle: "Markanıza özel e-ticaret kuralım",
      ctaText: "İhtiyacınızı konuşalım, ürün sayınıza ve hedefinize uygun net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "E-Commerce Website Development",
      metaDescription:
        "Custom e-commerce website development: product catalog, cart, payments and shipping integration. Fast, mobile-friendly and sales-focused.",
      eyebrow: "For E-Commerce",
      h1: "E-Commerce Website Development",
      intro:
        "You don't have to be locked into marketplace commissions to sell your products. A fast, sales-focused store under your own brand grows both your margin and customer loyalty. Forpus builds end-to-end e-commerce sites with payment and shipping integration.",
      benefits: [
        { title: "Your own brand", body: "A sales channel that's entirely yours, without marketplace commissions and crowds." },
        { title: "Sales-focused design", body: "Fast pages, a clear product flow and easy checkout reduce cart abandonment." },
        { title: "Easy to manage", body: "Manage products, stock and orders from one panel; the site scales as you grow." },
      ],
      featuresTitle: "What's included?",
      features: [
        "Product catalog and variant management",
        "Cart and secure payment integration",
        "Shipping and invoice flows",
        "Discount / coupon system",
        "Fast, mobile-friendly storefront",
        "Google Shopping and SEO setup",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "Which payment providers do you support?", a: "We integrate common providers and virtual POS such as iyzico and PayTR, plus international options on request." },
        { q: "Can I manage orders easily?", a: "Yes. You manage products, stock and orders comfortably from a single admin panel." },
        { q: "Can you migrate my existing products?", a: "We bulk-import your products and set up the catalog cleanly." },
      ],
      ctaTitle: "Let's build your branded store",
      ctaText: "Let's talk through your needs and give you a clear quote for your catalog and goals.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "restoran",
    image: "/generated/personas/restoran.webp",
    service: "web",
    slug: { tr: "restoran-web-sitesi", en: "restaurant-website" },
    tr: {
      metaTitle: "Restoran & Kafe Web Sitesi",
      metaDescription:
        "Restoran ve kafeler için dijital menü, rezervasyon ve online sipariş odaklı web sitesi. İştah açan, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Restorana Özel",
      h1: "Restoran Web Sitesi",
      intro:
        "Misafirleriniz gelmeden önce menünüze ve mekânınıza telefonlarından bakıyor. İştah açan görseller, güncel bir dijital menü ve kolay rezervasyon, masalarınızı doldurur. Forpus restoran ve kafelere özel siteler tasarlıyor.",
      benefits: [
        { title: "İştah açan vitrin", body: "Kaliteli görseller ve şık bir tasarımla mekânınızın atmosferini ekrana taşıyın." },
        { title: "Dijital menü", body: "QR ile güncellenebilir menü; fiyat değişince baskı derdi olmadan anında güncelleyin." },
        { title: "Rezervasyon & sipariş", body: "Online rezervasyon ve sipariş yönlendirmesiyle telefon trafiğini azaltın." },
      ],
      featuresTitle: "Restoran sitenizde neler olur?",
      features: [
        "QR / dijital menü (kolay güncelleme)",
        "Online rezervasyon formu",
        "Sipariş / paket servis yönlendirmesi",
        "Galeri ve mekân tanıtımı",
        "Harita ve çalışma saatleri",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "Menümü kendim güncelleyebilir miyim?", a: "Evet. Dijital menüyü kolayca güncelleyebileceğiniz bir yapı kurarız; fiyat değişimleri anında yansır." },
        { q: "Yemeksepeti / Getir'e yönlendirir mi?", a: "İsterseniz sipariş butonlarını bu platformlara ya da kendi paket servis akışınıza yönlendiririz." },
        { q: "QR menü dahil mi?", a: "Evet. Masaya koyabileceğiniz QR ile açılan dijital menüyü birlikte kurarız." },
      ],
      ctaTitle: "Masalarınızı dolduran bir site",
      ctaText: "Mekânınıza uygun bir site için kısa bir görüşme yapalım, net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "Restaurant & Cafe Website Design",
      metaDescription:
        "Website for restaurants and cafes with digital menu, reservations and online ordering. Appetizing, mobile-friendly design. Get a free quote.",
      eyebrow: "For Restaurants",
      h1: "Restaurant Website Design",
      intro:
        "Guests check your menu and space on their phones before they arrive. Appetizing photos, an up-to-date digital menu and easy reservations fill your tables. Forpus builds sites for restaurants and cafes.",
      benefits: [
        { title: "An appetizing storefront", body: "Bring your atmosphere to the screen with quality photos and a sharp design." },
        { title: "Digital menu", body: "A QR-updatable menu; when prices change, update instantly with no reprinting." },
        { title: "Reservations & orders", body: "Cut phone traffic with online reservations and order redirects." },
      ],
      featuresTitle: "What's included?",
      features: [
        "QR / digital menu (easy updates)",
        "Online reservation form",
        "Order / delivery redirect",
        "Gallery and venue showcase",
        "Map and opening hours",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "Can I update the menu myself?", a: "Yes. We build a structure where you update the digital menu easily; price changes reflect instantly." },
        { q: "Can it link to delivery apps?", a: "If you'd like, we point order buttons to those platforms or your own delivery flow." },
        { q: "Is a QR menu included?", a: "Yes. We set up a digital menu that opens via a QR code you can place on tables." },
      ],
      ctaTitle: "A site that fills your tables",
      ctaText: "Let's have a short call about a site that fits your venue and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "kisiselmarka",
    image: "/generated/personas/kisiselmarka.webp",
    service: "web",
    slug: { tr: "kisisel-marka-web-sitesi", en: "personal-brand-website" },
    tr: {
      metaTitle: "Kişisel Marka & Portfolyo Web Sitesi",
      metaDescription:
        "Danışman, eğitmen, içerik üreticisi ve profesyoneller için kişisel marka web sitesi. Portfolyo, hizmet ve iletişim odaklı tasarım. Teklif alın.",
      eyebrow: "Kişisel Markaya Özel",
      h1: "Kişisel Marka Web Sitesi",
      intro:
        "Sosyal medya hesabınız sizin değil; algoritmanın. Kendi adınıza bir web sitesi, işinizi ve itibarınızı kalıcı bir yere taşır. Danışman, eğitmen, koç veya içerik üreticisi olun; Forpus size özel, sizi anlatan siteler tasarlıyor.",
      benefits: [
        { title: "Sahibi siz olun", body: "Takipçinizi platformdan bağımsız, kendi alan adınızda buluşturun; kontrol sizde olsun." },
        { title: "Profesyonel algı", body: "Kişisel bir site, sizi amatörden ayırır ve işbirliği/danışan tekliflerini artırır." },
        { title: "Hepsi tek yerde", body: "Portfolyo, hizmet, blog ve iletişim; tüm dijital varlığınız tek adreste toplansın." },
      ],
      featuresTitle: "Kişisel markanızda neler olur?",
      features: [
        "Hakkımda ve portfolyo bölümü",
        "Hizmet / paket sayfaları",
        "Blog veya içerik altyapısı",
        "Bülten / e-posta toplama",
        "Sosyal medya entegrasyonu",
        "Mobil uyumlu, kişiye özel tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "Tek sayfa mı olmalı, çok sayfa mı?", a: "İşinize göre öneririz: hızlı bir başlangıç için tek sayfa, büyüyen içerik için çok sayfalı yapı." },
        { q: "Bülten / e-posta listesi kurar mısınız?", a: "Evet. Ziyaretçileri e-posta listenize dönüştüren formlar ve entegrasyonları kurarız." },
        { q: "Kendi içeriğimi ekleyebilir miyim?", a: "Yönetilebilir bir altyapıyla yazı ve projelerinizi kolayca kendiniz eklersiniz." },
      ],
      ctaTitle: "Sizi anlatan bir site kuralım",
      ctaText: "Kişisel markanız için kısa bir görüşme yapalım, size uygun net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "Personal Brand & Portfolio Website",
      metaDescription:
        "Personal brand website for consultants, coaches, creators and professionals. Portfolio, services and contact-focused design. Get a quote.",
      eyebrow: "For Personal Brands",
      h1: "Personal Brand Website",
      intro:
        "Your social account isn't yours; it's the algorithm's. A website under your own name moves your work and reputation somewhere permanent. Consultant, coach, educator or creator — Forpus builds sites that tell your story.",
      benefits: [
        { title: "You own it", body: "Meet your audience on your own domain, independent of any platform; you stay in control." },
        { title: "Professional perception", body: "A personal site sets you apart from amateurs and increases collaboration and client offers." },
        { title: "All in one place", body: "Portfolio, services, blog and contact — your whole digital presence at one address." },
      ],
      featuresTitle: "What's included?",
      features: [
        "About and portfolio section",
        "Service / package pages",
        "Blog or content foundation",
        "Newsletter / email capture",
        "Social media integration",
        "Mobile-friendly, bespoke design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "Should it be one page or many?", a: "We advise based on your work: a single page for a quick start, a multi-page structure for growing content." },
        { q: "Can you set up a newsletter?", a: "Yes. We build forms and integrations that turn visitors into email subscribers." },
        { q: "Can I add my own content?", a: "With an editable foundation, you add posts and projects yourself easily." },
      ],
      ctaTitle: "Let's build a site that tells your story",
      ctaText: "Let's have a short call about your personal brand and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "mobil",
    image: "/generated/hero-device.webp",
    service: "mobile",
    slug: { tr: "mobil-uygulama-gelistirme", en: "mobile-app-development" },
    tr: {
      metaTitle: "Mobil Uygulama Geliştirme",
      metaDescription:
        "iOS ve Android için mobil uygulama geliştirme. Fikirden mağazaya; tasarım, geliştirme, panel ve yayınlama. Uçtan uca çözüm. Ücretsiz teklif alın.",
      eyebrow: "Mobil Uygulama",
      h1: "Mobil Uygulama Geliştirme",
      intro:
        "İyi bir fikir, kullanıcının cebinde yaşadığında değer kazanır. iOS ve Android için tek kod tabanıyla hızlı, akıcı uygulamalar geliştiriyoruz; tasarımdan mağaza yayınına kadar her adımı üstleniyoruz. DoldurKabı ve Temizlik Express gibi gerçek ürünleri hayata geçirdik.",
      benefits: [
        { title: "iOS + Android tek seferde", body: "Modern teknolojiyle iki platforma birden yayın; maliyet ve süre yarı yarıya." },
        { title: "Fikirden mağazaya", body: "Tasarım, geliştirme, test ve App Store / Google Play yayını — hepsi tek ekipte." },
        { title: "Panelli, ölçeklenir sistem", body: "Kullanıcı yönetimi, bildirim ve yönetim paneliyle büyümeye hazır bir altyapı." },
      ],
      featuresTitle: "Uygulama sürecinde neler var?",
      features: [
        "UI/UX tasarımı ve prototip",
        "iOS + Android geliştirme (tek kod tabanı)",
        "Yönetim paneli ve kullanıcı sistemi",
        "Bildirim, ödeme, harita entegrasyonları",
        "App Store & Google Play yayını",
        "Yayın sonrası bakım ve destek",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        { q: "Hem iOS hem Android çıkar mı?", a: "Evet. Tek kod tabanıyla her iki platforma birden yayınlar, süre ve maliyetten tasarruf ederiz." },
        { q: "Uygulamayı mağazada siz mi yayınlıyorsunuz?", a: "Evet. App Store ve Google Play hesap kurulumundan yayına kadar süreci biz yönetiriz." },
        { q: "Fikrim var ama teknik bilmiyorum, olur mu?", a: "Tam da bunun için varız. Fikri birlikte netleştirir, uçtan uca hayata geçiririz." },
      ],
      ctaTitle: "Uygulama fikrinizi konuşalım",
      ctaText: "Fikrinizi kısa bir görüşmede netleştirip yol haritası ve net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",
    },
    en: {
      metaTitle: "Mobile App Development",
      metaDescription:
        "Mobile app development for iOS and Android. From idea to store: design, development, admin panel and publishing. End-to-end. Get a free quote.",
      eyebrow: "Mobile Apps",
      h1: "Mobile App Development",
      intro:
        "A good idea gains value when it lives in the user's pocket. We build fast, smooth apps for iOS and Android from a single codebase, handling everything from design to store release. We've shipped real products like DoldurKabı and Temizlik Express.",
      benefits: [
        { title: "iOS + Android at once", body: "Ship to both platforms with modern tech; cost and time cut roughly in half." },
        { title: "From idea to store", body: "Design, development, testing and App Store / Google Play release — all in one team." },
        { title: "Scalable, panel-driven", body: "A foundation ready to grow with user management, notifications and an admin panel." },
      ],
      featuresTitle: "What's included?",
      features: [
        "UI/UX design and prototype",
        "iOS + Android development (single codebase)",
        "Admin panel and user system",
        "Notifications, payments, map integrations",
        "App Store & Google Play release",
        "Post-launch maintenance and support",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "Do you ship both iOS and Android?", a: "Yes. With a single codebase we release to both platforms, saving time and cost." },
        { q: "Do you publish the app to the stores?", a: "Yes. We manage the process from App Store and Google Play account setup to release." },
        { q: "I have an idea but no technical background — is that ok?", a: "That's exactly what we're here for. We clarify the idea together and build it end to end." },
      ],
      ctaTitle: "Let's talk about your app idea",
      ctaText: "In a short call we'll clarify your idea and give you a roadmap and a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
];

export const solutionSlugsTr = solutions.map((s) => s.slug.tr);
export const solutionSlugsEn = solutions.map((s) => s.slug.en);

export function solutionByTrSlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug.tr === slug);
}
export function solutionByEnSlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug.en === slug);
}
