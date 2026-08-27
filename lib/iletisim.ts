import type { Lang } from "./i18n/dictionary";
import { CALISMA, EPOSTA, SEHIR, ULKE } from "./marka";
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

/**
 * Vaat edilen dönüş süresi — tek kaynak.
 *
 * llms.txt "48 saat içinde dönüş yapılır" diyordu, bu sayfa "aynı gün, en geç
 * bir iş günü" diyor. İkisi de makinelerin okuduğu beyan ve birbiriyle
 * çelişiyordu; hangisinin doğru olduğunu okuyanın bilmesine imkân yoktu.
 */
export const YANIT_SURESI = {
  tr: "Mesajlara aynı gün, en geç bir iş günü içinde dönülür.",
  en: "We reply the same day, and within one business day at the latest.",
} as const;

export type Soru = { soru: string; cevap: string };

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

export const iletisimIcerigi: Record<Lang, IletisimIcerigi> = {
  tr: {
    slug: "iletisim",
    baslik: "İletişim — İstanbul'da Web ve Mobil Yazılım Stüdyosu",
    aciklama: `Forpus Yazılım İstanbul merkezli bir web ve mobil yazılım stüdyosu. Projenizi konuşmak için yazın — aynı gün dönüş yapıyoruz. E-posta: ${EPOSTA}`,
    h1: "İletişim",
    ozet:
      "Forpus Yazılım, İstanbul merkezli bir web ve mobil yazılım stüdyosudur. " +
      "Türkiye'nin her ilinden ve yurt dışından müşterilerle uzaktan çalışıyoruz. " +
      "Aşağıdaki formu doldurun ya da doğrudan e-posta yazın; mesajlara aynı gün, " +
      "en geç bir iş günü içinde dönüş yapıyoruz.",
    kunyeBasligi: "Künye",
    satirlar: [
      { etiket: "Firma", deger: "Forpus Yazılım" },
      { etiket: "Konum", deger: `${SEHIR.tr}, ${ULKE.tr}` },
      {
        etiket: "Çalışma şekli",
        deger: "Uzaktan — Türkiye geneli ve yurt dışı",
      },
      { etiket: "E-posta", deger: EPOSTA, href: `mailto:${EPOSTA}` },
      {
        etiket: "Çalışma saatleri",
        deger: "Pazartesi–Cuma, 09.00–18.00 (TSİ)",
      },
      { etiket: "Diller", deger: "Türkçe, İngilizce" },
    ],
    sssBasligi: "Sık sorulanlar",
    sss: [
      {
        soru: "Forpus Yazılım nerede?",
        cevap:
          "Forpus Yazılım İstanbul, Türkiye merkezlidir. Ekip uzaktan çalışıyor; " +
          "bu yüzden İstanbul dışındaki illerden ve yurt dışından gelen projeler de " +
          "aynı şekilde yürütülüyor. Görüşmeler çevrimiçi yapılıyor, İstanbul içinde " +
          "istenirse yüz yüze de buluşuyoruz.",
      },
      {
        soru: "Ne kadar sürede dönüş yapıyorsunuz?",
        cevap:
          "Formdan ya da e-postadan gelen mesajlara mesai saatleri içinde aynı gün, " +
          "en geç bir iş günü içinde dönüyoruz. İlk dönüşte projeyi anlamak için " +
          "birkaç soru sorup kapsam ve yaklaşık bütçe için 20 dakikalık bir görüşme " +
          "öneriyoruz.",
      },
      {
        soru: "İlk görüşme ücretli mi?",
        cevap:
          "Hayır. İlk görüşme ve sonrasında hazırladığımız kapsam-fiyat teklifi " +
          "ücretsizdir, herhangi bir bağlayıcılığı yoktur. Görüşmeden sonra teklifi " +
          "yazılı olarak gönderiyoruz; kalemler tek tek belli oluyor, sonradan " +
          "eklenen gizli bir maliyet olmuyor.",
      },
      {
        soru: "Web sitesi ne kadar sürede teslim ediliyor?",
        cevap:
          "Tek ya da az sayfalı bir tanıtım sitesi yaklaşık bir hafta sürüyor. " +
          "Çok sayfalı, özel tasarımlı kurumsal siteler 2–4 hafta alıyor. Panel, " +
          "randevu, ödeme gibi sistem gerektiren projelerde süre kapsama göre " +
          "belirleniyor ve teklifte yazılı olarak veriliyor.",
      },
      {
        soru: "Fiyatlar ne kadar?",
        cevap:
          `Web sitesi projeleri ₺${fiyat}'den başlıyor. Kesin fiyat sayfa sayısına, ` +
          "tasarımın özelleştirme derecesine ve panel, randevu, ödeme gibi ek " +
          "sistemlere göre değişiyor. Paket kapsamlarını ana sayfadaki Paketler " +
          "bölümünde kalem kalem görebilirsiniz.",
      },
      {
        soru: "Hangi sektörlerle çalışıyorsunuz?",
        cevap:
          "Ağırlıklı olarak doktor, diş hekimi, diyetisyen, psikolog, avukat, mali " +
          "müşavir, mimar, veteriner gibi serbest meslek grupları ile restoran, " +
          "kuaför, güzellik merkezi, spor salonu, emlak ve e-ticaret işletmeleriyle " +
          "çalışıyoruz. Her biri için hazırlanmış ayrı bir çözüm sayfası var.",
      },
      {
        soru: "Siteyi sonradan kendim güncelleyebilir miyim?",
        cevap:
          "Evet. İsterseniz içeriği kendinizin düzenleyebileceği bir yönetim paneli " +
          "kuruyoruz; yazı, görsel ve fiyat gibi alanları teknik bilgi gerektirmeden " +
          "değiştirebiliyorsunuz. Panel istemeyen müşterilerde güncellemeleri bakım " +
          "kapsamında biz yapıyoruz.",
      },
      {
        soru: "Sitenin alan adı ve hesapları kime ait oluyor?",
        cevap:
          "Alan adı, hosting ve tüm hesaplar sizin adınıza açılıyor ve size ait " +
          "oluyor. Proje bittiğinde erişimlerin tamamı devredilir. Bizimle çalışmaya " +
          "devam etmek zorunda kalmazsınız; bu, kilitlenmeyi engellemek için bilinçli " +
          "bir tercih.",
      },
    ],
  },
  en: {
    slug: "en/contact",
    baslik: "Contact — Web & Mobile Software Studio in Istanbul",
    aciklama: `Forpus Yazılım is a web and mobile software studio based in Istanbul, Türkiye. Tell us about your project — we reply the same day. Email: ${EPOSTA}`,
    h1: "Contact",
    ozet:
      "Forpus Yazılım is a web and mobile software studio based in Istanbul, Türkiye. " +
      "We work remotely with clients across Türkiye and abroad. Use the form below or " +
      "email us directly; we reply the same day, and within one business day at the latest.",
    kunyeBasligi: "Details",
    satirlar: [
      { etiket: "Company", deger: "Forpus Yazılım" },
      { etiket: "Location", deger: `${SEHIR.en}, ${ULKE.en}` },
      {
        etiket: "How we work",
        deger: "Remote — across Türkiye and internationally",
      },
      { etiket: "Email", deger: EPOSTA, href: `mailto:${EPOSTA}` },
      { etiket: "Hours", deger: "Monday–Friday, 09:00–18:00 (GMT+3)" },
      { etiket: "Languages", deger: "Turkish, English" },
    ],
    sssBasligi: "Frequently asked",
    sss: [
      {
        soru: "Where is Forpus Yazılım based?",
        cevap:
          "Forpus Yazılım is based in Istanbul, Türkiye. The team works remotely, so " +
          "projects from other Turkish cities and from abroad run exactly the same way. " +
          "Meetings happen online, and we can meet in person within Istanbul if you " +
          "prefer.",
      },
      {
        soru: "How quickly do you reply?",
        cevap:
          "We reply to form submissions and emails the same day during working hours, " +
          "and within one business day at the latest. In that first reply we ask a few " +
          "questions about the project and suggest a 20-minute call to settle scope and " +
          "a rough budget.",
      },
      {
        soru: "Is the first call free?",
        cevap:
          "Yes. The first call and the scope-and-price proposal that follows are free " +
          "and carry no obligation. We send the proposal in writing with each line item " +
          "spelled out, so nothing is added to the bill later.",
      },
      {
        soru: "How long does a website take?",
        cevap:
          "A single-page or small brochure site takes about a week. Multi-page custom " +
          "corporate sites take two to four weeks. Projects that need a dashboard, " +
          "booking, or payments are scoped individually and the timeline is written into " +
          "the proposal.",
      },
      {
        soru: "What does it cost?",
        cevap:
          `Website projects start at ₺${fiyat}. The final figure depends on the number of ` +
          "pages, how custom the design is, and whether the project needs extra systems " +
          "like a dashboard, booking, or payments. Package contents are listed line by " +
          "line on the home page.",
      },
      {
        soru: "Which industries do you work with?",
        cevap:
          "Mostly independent professionals — doctors, dentists, dietitians, " +
          "psychologists, lawyers, accountants, architects, veterinarians — along with " +
          "restaurants, hair salons, beauty clinics, gyms, real-estate agencies and " +
          "e-commerce businesses. Each has its own solution page.",
      },
      {
        soru: "Can I update the site myself afterwards?",
        cevap:
          "Yes. If you want it, we build an admin panel where you can edit text, images " +
          "and prices without any technical knowledge. For clients who would rather not " +
          "manage it, we handle updates as part of maintenance.",
      },
      {
        soru: "Who owns the domain and the accounts?",
        cevap:
          "The domain, hosting and every account are registered in your name and belong " +
          "to you. When the project ends, all access is handed over. You are never " +
          "locked into working with us — that is a deliberate choice.",
      },
    ],
  },
};
