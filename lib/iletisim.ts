import type { Metadata } from "next";

import { dictionary, type Lang } from "./i18n/dictionary";
import { CEVRILMIS_SAYFALAR, cevrilmisYol } from "./routes";
import {
  CALISMA,
  EPOSTA,
  SEHIR,
  ULKE,
  WHATSAPP_GORUNEN,
  whatsappBaglantisi,
} from "./marka";
import { PRICE_FLOOR } from "./pricing";

/**
 * İLETİŞİM SAYFASININ İÇERİĞİ — kimlik künyesi ve sık sorulanlar.
 *
 * NEDEN AYRI BİR SAYFA VAR: Search Console'a göre site 16 Temmuz 2026'da
 * indekse girdi ve 41 günde toplam 85 gösterim aldı. Bu bir "tıklanma oranı"
 * sorunu değil; sitenin Google'ın gözünde henüz bir VARLIK olmaması. Aynı
 * dönemde coğrafi niyetli TEK bir sorgu gösterim almadı — çünkü site konumunu
 * hiçbir yerde beyan etmiyordu.
 *
 * Bir varlığın Google tarafından tanınması üç şeye bakıyor ve üçü de bu
 * sayfada: tutarlı bir ad-yer-kanal künyesi (NAP), bunun makine okunur hâli
 * (LocalBusiness/ProfessionalService JSON-LD) ve markanın kendi adına
 * konuştuğu bir adres. Bugüne kadar site adresini HİÇBİR yerde yazmıyordu —
 * "Uzaktan çalışıyoruz" diyordu, ki bu bir yer değil bir çalışma biçimi.
 *
 * SORULARIN SEÇİMİ: bunlar uydurulmuş "SSS" değil, bir teklif görüşmesinden
 * önce gerçekten sorulan sorular. Cevaplar 40-60 kelime ve KENDİ BAŞINA
 * anlaşılır tutuldu — hem okuyan insan sayfayı taramadan cevabı alıyor, hem
 * de yapay zekâ araması bir cevabı bağlamından koparmadan alıntılayabiliyor.
 *
 * İDDİA UYDURULMUYOR: fiyat `PRICE_FLOOR`dan, süreler paket verisinden
 * geliyor. Bir cevabın buradaki sayısı ile Paketler bölümünün sayısı
 * ayrışamaz.
 */

/** Deponun SSS şekli — `lib/solutions.ts` ve `lib/blog.ts` ile aynı. */
export type Soru = { q: string; a: string };

type IletisimIcerigi = {
  slug: string;
  baslik: string;
  aciklama: string;
  h1: string;
  /**
   * İlk paragraf. Sayfanın tamamını okumayan biri için TEK BAŞINA yeterli
   * cevap: kimiz, neredeyiz, nasıl ulaşılır. Yapay zekâ aramalarında
   * alıntıların yaklaşık yarısı sayfanın ilk üçte birinden geliyor.
   */
  ozet: string;
  kunyeBasligi: string;
  satirlar: { etiket: string; deger: string; href?: string }[];
  sssBasligi: string;
  sss: Soru[];
};

const fiyat = new Intl.NumberFormat("tr-TR").format(PRICE_FLOOR);

/*
 * ŞEHİR ADI HİÇBİR YERDE ELLE YAZILMIYOR — hepsi `SEHIR`den geliyor.
 *
 * Bu sayfa şehri altı ayrı yerde söylüyor: sekme başlığı, meta açıklaması,
 * özet, künye satırı, çalışma şekli satırı ve "nerede?" sorusunun cevabı.
 * Aynı sayfanın `PostalAddress` yapısal verisi de `SEHIR`den besleniyor.
 * Biri elle yazıldığında künye tablosu iki satır arayla iki farklı şehir
 * gösterebiliyor ve yerel aramada güveni bozan tam olarak o tutarsızlık.
 */
export const iletisimIcerigi: Record<Lang, IletisimIcerigi> = {
  tr: {
    slug: "iletisim",
    baslik: `İletişim — ${SEHIR.tr} Yazılım Stüdyosu`,
    aciklama: `Forpus Yazılım ${SEHIR.tr} merkezli bir web ve mobil yazılım stüdyosu. Projenizi konuşmak için yazın — aynı gün dönüş yapıyoruz. E-posta: ${EPOSTA}`,
    h1: "İletişim",
    ozet:
      `Forpus Yazılım, ${SEHIR.tr} merkezli bir web ve mobil yazılım stüdyosudur. ` +
      `${SEHIR.tr}'daki ofisimizde çalışıyor, Türkiye'nin her ilinden ve yurt ` +
      "dışından gelen projeleri de aynı ekiple yürütüyoruz. " +
      "Aşağıdaki formu doldurun ya da doğrudan e-posta yazın; mesajlara aynı gün, " +
      "en geç bir iş günü içinde dönüş yapıyoruz.",
    kunyeBasligi: "Künye",
    satirlar: [
      { etiket: "Firma", deger: "Forpus Yazılım" },
      { etiket: "Konum", deger: `${SEHIR.tr}, ${ULKE.tr}` },
      {
        etiket: "Çalışma şekli",
        deger: `${SEHIR.tr}'daki ofisimizden — Türkiye geneli ve yurt dışı`,
      },
      { etiket: "E-posta", deger: EPOSTA, href: `mailto:${EPOSTA}` },
      {
        etiket: "WhatsApp",
        deger: WHATSAPP_GORUNEN,
        href: whatsappBaglantisi(dictionary.tr.contact.info.whatsappMesaj),
      },
      {
        etiket: "Çalışma saatleri",
        deger: "Pazartesi–Cuma, 09.00–18.00 (TSİ)",
      },
      { etiket: "Diller", deger: "Türkçe, İngilizce" },
    ],
    sssBasligi: "Sık sorulanlar",
    sss: [
      {
        q: "Forpus Yazılım nerede?",
        a:
          `Forpus Yazılım ${SEHIR.tr}, ${ULKE.tr} merkezlidir ve ekip ${SEHIR.tr}'daki ` +
          `ofisinde çalışır. ${SEHIR.tr} dışındaki illerden ve yurt dışından gelen ` +
          "projeler de aynı ekiple, aynı şekilde yürütülür. Görüşmeleri çevrimiçi " +
          "yapabiliyoruz; isterseniz ofisimizde yüz yüze de görüşüyoruz.",
      },
      {
        q: "Ne kadar sürede dönüş yapıyorsunuz?",
        a:
          "Formdan ya da e-postadan gelen mesajlara mesai saatleri içinde aynı gün, " +
          "en geç bir iş günü içinde dönüyoruz. İlk dönüşte projeyi anlamak için " +
          "birkaç soru sorup kapsam ve yaklaşık bütçe için 20 dakikalık bir görüşme " +
          "öneriyoruz.",
      },
      {
        q: "İlk görüşme ücretli mi?",
        a:
          "Hayır. İlk görüşme ve sonrasında hazırladığımız kapsam-fiyat teklifi " +
          "ücretsizdir, herhangi bir bağlayıcılığı yoktur. Görüşmeden sonra teklifi " +
          "yazılı olarak gönderiyoruz; kalemler tek tek belli oluyor, sonradan " +
          "eklenen gizli bir maliyet olmuyor.",
      },
      {
        q: "Web sitesi ne kadar sürede teslim ediliyor?",
        a:
          "Tek ya da az sayfalı bir tanıtım sitesi yaklaşık bir hafta sürüyor. " +
          "Çok sayfalı, özel tasarımlı kurumsal siteler 2–4 hafta alıyor. Panel, " +
          "randevu, ödeme gibi sistem gerektiren projelerde süre kapsama göre " +
          "belirleniyor ve teklifte yazılı olarak veriliyor.",
      },
      {
        q: "Fiyatlar ne kadar?",
        a:
          `Web sitesi projeleri ₺${fiyat}'den başlıyor. Kesin fiyat sayfa sayısına, ` +
          "tasarımın özelleştirme derecesine ve panel, randevu, ödeme gibi ek " +
          "sistemlere göre değişiyor. Paket kapsamlarını ana sayfadaki Paketler " +
          "bölümünde kalem kalem görebilirsiniz.",
      },
      {
        q: "Hangi sektörlerle çalışıyorsunuz?",
        a:
          "Ağırlıklı olarak doktor, diş hekimi, diyetisyen, psikolog, avukat, mali " +
          "müşavir, mimar, veteriner gibi serbest meslek grupları ile restoran, " +
          "kuaför, güzellik merkezi, spor salonu, emlak ve e-ticaret işletmeleriyle " +
          "çalışıyoruz. Her biri için hazırlanmış ayrı bir çözüm sayfası var.",
      },
      {
        q: "Siteyi sonradan kendim güncelleyebilir miyim?",
        a:
          "Evet. İsterseniz içeriği kendinizin düzenleyebileceği bir yönetim paneli " +
          "kuruyoruz; yazı, görsel ve fiyat gibi alanları teknik bilgi gerektirmeden " +
          "değiştirebiliyorsunuz. Panel istemeyen müşterilerde güncellemeleri bakım " +
          "kapsamında biz yapıyoruz.",
      },
      {
        q: "Sitenin alan adı ve hesapları kime ait oluyor?",
        a:
          "Alan adı, hosting ve tüm hesaplar sizin adınıza açılıyor ve size ait " +
          "oluyor. Proje bittiğinde erişimlerin tamamı devredilir. Bizimle çalışmaya " +
          "devam etmek zorunda kalmazsınız; bu, kilitlenmeyi engellemek için bilinçli " +
          "bir tercih.",
      },
    ],
  },
  en: {
    slug: "en/contact",
    baslik: `Contact — Software Studio in ${SEHIR.en}`,
    aciklama: `Web and mobile software studio in ${SEHIR.en}, ${ULKE.en}. Tell us about your project — we reply the same day. Email: ${EPOSTA}`,
    h1: "Contact",
    ozet:
      `Forpus Yazılım is a web and mobile software studio based in ${SEHIR.en}, ${ULKE.en}. ` +
      `We work from our office in ${SEHIR.en}, and projects from other Turkish cities ` +
      "and from abroad run with the same team. Use the form below or " +
      "email us directly; we reply the same day, and within one business day at the latest.",
    kunyeBasligi: "Details",
    satirlar: [
      { etiket: "Company", deger: "Forpus Yazılım" },
      { etiket: "Location", deger: `${SEHIR.en}, ${ULKE.en}` },
      {
        etiket: "How we work",
        deger: `From our ${SEHIR.en} office — across Türkiye and internationally`,
      },
      { etiket: "Email", deger: EPOSTA, href: `mailto:${EPOSTA}` },
      {
        etiket: "WhatsApp",
        deger: WHATSAPP_GORUNEN,
        href: whatsappBaglantisi(dictionary.en.contact.info.whatsappMesaj),
      },
      {
        etiket: "Hours",
        deger: `Monday–Friday, ${CALISMA.acilis}–${CALISMA.kapanis} (GMT+3)`,
      },
      { etiket: "Languages", deger: "Turkish, English" },
    ],
    sssBasligi: "Frequently asked",
    sss: [
      {
        q: "Where is Forpus Yazılım based?",
        a:
          `Forpus Yazılım is based in ${SEHIR.en}, ${ULKE.en}, and the team works from ` +
          "its office there. Projects from other Turkish cities and from abroad run " +
          "with the same team, exactly the same way. Meetings can happen online, or " +
          "in person at our office if you prefer.",
      },
      {
        q: "How quickly do you reply?",
        a:
          "We reply to form submissions and emails the same day during working hours, " +
          "and within one business day at the latest. In that first reply we ask a few " +
          "questions about the project and suggest a 20-minute call to settle scope and " +
          "a rough budget.",
      },
      {
        q: "Is the first call free?",
        a:
          "Yes. The first call and the scope-and-price proposal that follows are free " +
          "and carry no obligation. We send the proposal in writing with each line item " +
          "spelled out, so nothing is added to the bill later.",
      },
      {
        q: "How long does a website take?",
        a:
          "A single-page or small brochure site takes about a week. Multi-page custom " +
          "corporate sites take two to four weeks. Projects that need a dashboard, " +
          "booking, or payments are scoped individually and the timeline is written into " +
          "the proposal.",
      },
      {
        q: "What does it cost?",
        a:
          `Website projects start at ₺${fiyat}. The final figure depends on the number of ` +
          "pages, how custom the design is, and whether the project needs extra systems " +
          "like a dashboard, booking, or payments. Package contents are listed line by " +
          "line on the home page.",
      },
      {
        q: "Which industries do you work with?",
        a:
          "Mostly independent professionals — doctors, dentists, dietitians, " +
          "psychologists, lawyers, accountants, architects, veterinarians — along with " +
          "restaurants, hair salons, beauty clinics, gyms, real-estate agencies and " +
          "e-commerce businesses. Each has its own solution page.",
      },
      {
        q: "Can I update the site myself afterwards?",
        a:
          "Yes. If you want it, we build an admin panel where you can edit text, images " +
          "and prices without any technical knowledge. For clients who would rather not " +
          "manage it, we handle updates as part of maintenance.",
      },
      {
        q: "Who owns the domain and the accounts?",
        a:
          "The domain, hosting and every account are registered in your name and belong " +
          "to you. When the project ends, all access is handed over. You are never " +
          "locked into working with us — that is a deliberate choice.",
      },
    ],
  },
};

/**
 * İki iletişim route'unun metadata'sı — tek üretici.
 *
 * `lib/solution-seo.ts`teki `solutionMetadata` kalıbının aynısı. İki sayfa
 * dosyası bloğu satır satır kopyalıyordu ve `title` alanı yukarıdaki
 * `baslik`in elle yazılmış üçüncü kopyasıydı; hreflang kuralı değişince üç
 * yer, başlık değişince dört yer güncellenmesi gerekiyordu.
 */
export function iletisimMetadata(lang: Lang): Metadata {
  const c = iletisimIcerigi[lang];
  const cift = CEVRILMIS_SAYFALAR[0];
  const canonical = cevrilmisYol(cift, lang);

  return {
    // Kök layout'un `title.template`i markayı zaten ekliyor.
    title: c.baslik,
    description: c.aciklama,
    alternates: {
      canonical,
      languages: { "tr-TR": cift.tr, "en-US": cift.en, "x-default": cift.tr },
    },
    openGraph: {
      type: "website",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      url: canonical,
      title: c.baslik,
      description: c.aciklama,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}
