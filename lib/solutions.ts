// SEO landing pages ("çözümler" / solutions). Each targets a high-intent, lower-competition
// search (e.g. "doktor web sitesi") in both TR and EN. Rendered as static HTML so Google can
// index the copy. Routes: /cozumler/[slug] (tr) and /en/solutions/[slug] (en).
import type { ServiceKey } from "./services";
import type { KisaCevapIcerigi } from "./kisa-cevap";
import { solutionIndex } from "./solution-index";
import { webProjects } from "./projects";
import { PRICE_FLOOR, fiyatlariOku } from "./pricing";

export type SolutionContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Fayda kartlarının üstündeki bölüm başlığı. Verilirse kart başlıkları h3'e iner. */
  benefitsTitle?: string;
  benefits: { title: string; body: string }[];
  featuresTitle: string;
  features: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;

  // ── Derinlik blokları ────────────────────────────────────────────────
  // Hepsi opsiyonel: bir sektöre eklendiğinde sayfada o bölüm belirir,
  // eklenmediğinde sayfa eskisi gibi çalışır. Amaç dolgu değil "bilgi
  // kazancı" — alıcının başka yerde bulamadığı fiyat, süre ve karar bilgisi.

  /**
   * KISA CEVAP — sayfanın en tepesinde duran, tek başına ayakta kalan pasaj.
   *
   * NEDEN: sayfalar 980 kelimeye çıkarıldı ama bilgi bölüm bölüm dağılmıştı;
   * fiyat bir yerde, süre başka yerde, kapsam üçüncü bir yerde. Ölçüldü:
   * ortalama paragraf 29 kelime, en uzun blok bile 60'ı geçmiyordu. Yapay
   * zekâ aramaları bir sayfadan cümle değil PASAJ alıntılıyor — ölçülen
   * en verimli uzunluk 134-167 kelime — ve alıntıların %44'ü sayfanın ilk
   * %30'undan çıkıyor. Böyle bir blok sitede hiç yoktu.
   *
   * KURAL: tek başına okunduğunda anlamlı olmalı. "Yukarıda anlatıldığı
   * gibi" ya da "aşağıdaki paketlerde" diye bir gönderme, pasaj sayfadan
   * koparıldığı anda onu anlamsız kılar.
   *
   * ZİYARETÇİ İÇİN DE DOĞRU: aramadan gelen kişi ilk 20 saniyede kapsamı,
   * süreyi ve fiyat bandını görüyor. Bunu bulamayan zaten geri dönüyordu.
   *
   * SSS'i TEKRARLAMAZ: oradaki cevaplar tek tek sorulara ait; buradaki
   * pasaj bütünü veriyor. Aynı rakamlar geçer, aynı cümleler geçmez.
   *
   * ZORUNLU, opsiyonel değil. Kardeş derinlik blokları (`problem`, `pricing`,
   * `process`) gerçekten kısmi — 17'si var, 17'si yok. Bu değil: her sektörün
   * her dilde bir tane taşıması kuralın kendisi. Opsiyonel bırakılınca dört
   * ayrı korunma dalı doğdu ve hiçbiri çalışmadı. Yeni bir sektör pasajsız
   * eklenirse derleyici söylesin.
   *
   * YAPISAL VERİYE GİRMİYOR. `Service.description` kısa `metaDescription`ı
   * taşıyor; bu pasaj sayfanın ilk %5'inde zaten görünür metin olarak
   * duruyor ve aynı 1,2 KB'ı JSON-LD'ye ikinci kez yazmak sayfa başına
   * ~7,5 KB ham maliyet demekti (ölçüldü, geri alındı).
   */
  shortAnswer: KisaCevapIcerigi;

  /** "Şu an ne oluyor" — sektörün gerçek acısı, 2-3 paragraf. */
  problem?: { title: string; body: string[] };

  /** Fiyat bandı. Paketlerle (₺50k / 100k / 250k) tutarlı olmalı. */
  pricing?: {
    title: string;
    lead: string;
    tiers: { name: string; price: string; timeline: string; body: string }[];
    note: string;
  };

  /** Gerçek referans işimiz. Yalnızca o sektörde GERÇEKTEN iş yaptıysak. */
  caseRef?: {
    title: string;
    body: string;
    projectSlug: string;
    linkLabel: string;
  };

  /** Sektöre özel çalışma adımları. */
  process?: {
    title: string;
    lead: string;
    steps: { name: string; body: string }[];
  };

  /** "Nelere dikkat etmeli" — alıcıyı eğiten bölüm; AI'ın alıntıladığı tip. */
  checklist?: {
    title: string;
    lead: string;
    items: { title: string; body: string }[];
  };
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
      shortAnswer: {
        title: "Doktor web sitesi ne içerir, ne kadar tutar?",
        body: "Doktor web sitesi, bir hekimin uzmanlık alanlarını kendi anlatımıyla açıkladığı ve hastayı randevuya yönlendirdiği kendi adresidir. Forpus'un kurduğu tipik bir hekim sitesinde her uzmanlık alanı için ayrı bir sayfa, WhatsApp veya form üzerinden randevu yönlendirmesi, hasta bilgilendirme yazıları için blog altyapısı, KVKK'ya uygun bir iletişim formu, mobil uyumlu hızlı bir tasarım ve Google Haritalar için hazırlanmış teknik SEO ayarları bulunur. Tek sayfalık bir tanıtım sitesi ₺50.000 bandında başlar ve içerikleriniz hazırsa yaklaşık bir hafta içinde yayına girer. Uzmanlıkların ayrı ayrı sayfalandığı, arama motorlarına hazırlanmış tam bir klinik sitesi ₺100.000–180.000 aralığında ve iki ila dört haftada tamamlanır. Online randevu ile hasta paneli işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Sağlıkta tanıtım mevzuatı gereği fiyat ilanı, kampanya duyurusu, karşılaştırmalı üstünlük iddiası ve hasta yorumu kullanılmaz; site bilgilendirme çerçevesinde kurgulanır. Alan adı ve site sizin adınıza kaydedilir, teslimden sonra içerikleri panelden kendiniz güncellersiniz. Mevcut bir siteniz varsa eski adresler yenilerine yönlendirilir ve Google'daki birikiminiz korunur.",
      },
      benefitsTitle: "Doktor web sitesi kliniğinize ne kazandırır?",
      benefits: [
        {
          title: "İlk saniyede güven",
          body: "Temiz ve profesyonel bir tasarım hastada güven oluşturur, klinik itibarınızı online'a taşır.",
        },
        {
          title: "Online randevu",
          body: "Ziyaretçiyi tek tıkla randevu formuna veya WhatsApp'a yönlendirin; boş koltuk kalmasın.",
        },
        {
          title: "Google'da bulunun",
          body: "Uzmanlığınız ve konumunuz için optimize edilmiş yapı ile bölgenizdeki aramalarda öne çıkın.",
        },
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
        {
          q: "Doktor web sitesi ne kadar sürede hazır olur?",
          a: "İçerikleriniz hazırsa tanıtım siteniz genellikle 1 hafta içinde yayında olur. Çok sayfalı kurumsal bir yapı 2–4 hafta, online randevu ve hasta paneli gibi sistemler ise projeye göre 6–10 hafta sürer. Süreyi en çok uzatan şey teknik zorluk değil, içerik beklemesidir; özgeçmiş, hizmet açıklamaları ve fotoğraflar hazırsa süreç belirgin şekilde kısalır.",
        },
        {
          q: "Doktor web sitesi ne kadar tutar?",
          a: "Tek sayfalı, hızlı yayına alınan bir tanıtım sitesi ₺50.000 bandında başlar. Uzmanlık alanlarınızın ayrı sayfalandığı, SEO'ya hazırlanmış çok sayfalı bir klinik sitesi ₺100.000–180.000 aralığındadır. Online randevu, hasta paneli veya mobil uygulama işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Kesin rakam sayfa sayısı ve entegrasyonlara göre netleşir.",
        },
        {
          q: "Hekim reklam yasağı web sitesini nasıl etkiliyor?",
          a: "Türkiye'de hekimler ve sağlık kuruluşları için reklam ile bilgilendirme mevzuatta ayrı şeylerdir; site içeriği bilgilendirme tarafında kalmak zorundadır. Bu pratikte şu demek: abartılı iddialar, karşılaştırmalı üstünlük vurguları, hasta yorumları ve fiyat ilanı gibi unsurlardan kaçınmak gerekir. Siteyi bu çerçeveyi gözeterek kurgularız; branşınıza özel sınırlar için bağlı olduğunuz oda veya mevzuat danışmanınızla teyitleşmenizi öneririz.",
        },
        {
          q: "Online randevu sistemi ekleyebilir misiniz?",
          a: "Evet. En basit haliyle ziyaretçiyi WhatsApp'a veya bir forma yönlendiririz — hızlı ve ucuzdur, sekreteriniz varsa çoğu klinik için yeterlidir. Bir üst seviyede takvimli, çakışma kontrollü, SMS/e-posta hatırlatması gönderen tam otomatik bir randevu sistemi kurarız. Hangisinin size uygun olduğu hasta hacminize ve sekreterlik düzeninize bağlı; görüşmede bunu netleştiriyoruz.",
        },
        {
          q: "Sitem Google'da çıkacak mı?",
          a: "Siteyi teknik SEO ayarları tamamlanmış şekilde teslim ederiz: doğru başlık yapısı, hız optimizasyonu, mobil uyum, site haritası ve yapılandırılmış veri. Ama tek başına site kurmak sıralama getirmez. Bölgenizdeki aramalarda çıkmanın asıl yolu Google İşletme Profili ve düzenli içeriktir; isterseniz bu tarafı da birlikte yürütürüz.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet, sık yaptığımız iş. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurarız. Eski adresleri yenilerine yönlendirir, Google'daki mevcut sıralamanızın kaybolmamasını sağlarız. Bu yönlendirmeler atlanırsa yenileme sonrası trafik düşer; en sık gördüğümüz hata budur.",
        },
        {
          q: "Site sonrasında güncelleme yapabilecek miyim?",
          a: "İhtiyacınıza göre karar veriyoruz. Nadiren değişen bir tanıtım sitesinde yönetim paneli gereksiz maliyettir; küçük güncellemeleri biz yaparız. Düzenli yazı veya duyuru paylaşacaksanız içeriği kendiniz yönetebileceğiniz bir panel kurarız.",
        },
        {
          q: "KVKK açısından nelere dikkat ediyorsunuz?",
          a: "İletişim ve randevu formları hasta verisi topladığı için aydınlatma metni, açık rıza kutucuğu ve güvenli veri aktarımı standart olarak kurulur. Formdan gelen bilgiler şifreli bağlantı üzerinden iletilir. Sağlık verisi özel nitelikli kişisel veri sayıldığı için, hasta dosyası niteliğinde bilgi toplayan yapılarda kapsamı birlikte daraltır, gereksiz veri toplamaktan kaçınırız.",
        },
      ],
      ctaTitle: "Kliniğiniz için web sitesi konuşalım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Hastanız sizi seçmeden önce ne görüyor?",
        body: [
          "Bir hasta size gelmeden önce adınızı Google'a yazıyor. Karşısına çıkan şey çoğu zaman bir randevu sitesindeki eksik profiliniz, güncelliğini yitirmiş bir hastane sayfası veya hiç kontrol etmediğiniz yorumlar oluyor. Anlatmak istediğiniz hiçbir şeyin olmadığı bu sonuçlar, sizin yerinize konuşuyor.",
          "Kendi siteniz olduğunda bu tablo değişiyor: uzmanlığınızı, yaklaşımınızı ve hangi durumlarda ne yaptığınızı kendi cümlelerinizle anlatıyorsunuz. Hasta muayeneye girmeden önce size dair bir fikir sahibi oluyor, bu da hem randevuya dönüşü hem de görüşmenin kalitesini yükseltiyor.",
          "Pratikte en çok kaybettiren nokta ise şu: siteye giren hasta randevu almak istediğinde ne yapacağını bilemiyor. Telefon numarası sayfanın dibinde, form çalışmıyor, WhatsApp yok. Ziyaretçi vardır ama randevu yoktur. Kurduğumuz sitelerde bu yolu mümkün olan en kısa hale getiriyoruz.",
        ],
      },

      pricing: {
        title: "Doktor web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 90.000",
            timeline: "~1–2 hafta",
            body: "Tek veya az sayfalı, mobil uyumlu bir dijital kartvizit. Özgeçmiş, hizmetler, iletişim ve WhatsApp yönlendirmesi. Yeni muayenehane açanlar ve adını Google'da temiz bir sayfayla karşılamak isteyen hekimler için yeterli.",
          },
          {
            name: "Klinik sitesi",
            price: "₺100.000 – 180.000",
            timeline: "~2–4 hafta",
            body: "Her uzmanlık alanının ayrı sayfası olduğu, arama motorları için yapılandırılmış çok sayfalı site. Hasta bilgilendirme yazıları için blog altyapısı, ekip sayfası, çok dilli seçenek. Bölgesel aramalarda görünmek isteyen klinikler için doğru başlangıç.",
          },
          {
            name: "Randevu sistemi & hasta paneli",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "Takvimli online randevu, çakışma kontrolü, otomatik SMS hatırlatma, hasta kayıt paneli ve gerekirse mobil uygulama. Sekreterlik yükünü yazılıma devretmek isteyen çok hekimli klinikler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; sayfa sayısı, içerik üretimi ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },

      caseRef: {
        title: "Sağlık alanında yaptığımız iş",
        body: "Dr. Yasin Kurtboğan için kurduğumuz kurumsal site, hekim tanıtımını ve hizmet anlatımını sade bir yapıda topluyor. Aynı yaklaşımı Dyt. Ece Öztürk'ün sitesinde de uyguladık: güven veren bir görsel dil, net hizmet açıklamaları ve ziyaretçiyi tek adımda iletişime taşıyan bir kurgu. Sağlık alanında tasarımın işi etkilemesi, ferah ve abartısız durmasından geçiyor.",
        projectSlug: "dryasin",
        linkLabel: "Yaptığımız işlere bakın",
      },

      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Muayene programınızı aksatmayan bir düzen kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "30–45 dakikalık bir görüşmede branşınızı, hasta profilinizi ve sitenin asıl işini konuşuruz. Randevu mu alacak, bilgilendirme mi yapacak, ikisi birden mi? Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik toplama",
            body: "Size doldurması kolay bir şablon gönderiyoruz: özgeçmiş, hizmetler, sık sorulanlar, fotoğraflar. Yazmaya vaktiniz yoksa metinleri biz yazar, onayınıza sunarız — hekimlerin çoğu bu seçeneği tercih ediyor.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfa tasarımını görürsünüz. Yön doğruysa diğer sayfalar aynı dille açılır. Değişiklikler bu aşamada ücretsizdir; geliştirmeye ancak siz onayladıktan sonra geçeriz.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Google Search Console ve İşletme Profili bağlantısı dahil yayına alırız. Teslimde sitenin nasıl güncelleneceğini gösteren kısa bir kayıt bırakırız.",
          },
        ],
      },

      checklist: {
        title: "Doktor web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının sizin adınıza kayıtlı olduğundan emin olun. Bazı ajanslar alan adını kendi hesabına alır; ayrılmak istediğinizde siteniz rehin kalır. Sözleşmeye alan adının ve kaynak kodun size ait olduğunu yazdırın.",
          },
          {
            title: "Hazır tema mı, size özel mi?",
            body: "Piyasadaki doktor sitelerinin çoğu aynı hazır temanın renkleri değiştirilmiş hali. Ucuz olması normaldir, ama benzer görünen yüzlerce siteden biri olursunuz ve tema güncellemeleri zamanla siteyi bozar. Farkı baştan sorun.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Hastaların büyük kısmı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın. Üç saniyede açılmıyorsa hasta beklemez, geri döner.",
          },
          {
            title: "Randevuya kaç tıkla gidiliyor?",
            body: "Ana sayfayı açtığınızda randevu veya iletişim eylemi ilk ekranda görünüyor mu? Görünmüyorsa site güzel olsa bile iş yapmaz. Bu, tasarımın en çok atlanan ve en çok kaybettiren detayıdır.",
          },
          {
            title: "Teslimden sonra ne oluyor?",
            body: "Bakım, güncelleme ve sorun çıktığında kime ulaşacağınız yazılı olsun. Sitenin yayına alınması işin sonu değil başıdır; destek verilmeyen siteler bir yıl içinde güncelliğini yitirir.",
          },
          {
            title: "KVKK metinleri hazır mı?",
            body: "Form varsa aydınlatma metni ve açık rıza zorunludur. Şaşırtıcı sayıda hekim sitesi bu metinler olmadan yayında duruyor. Teklif aşamasında bunun dahil olup olmadığını netleştirin.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Doctor Website Design",
      metaDescription:
        "Trustworthy, mobile-friendly website design for doctors and clinics. Online booking, service pages and Google visibility. Get a free quote.",
      eyebrow: "For Doctors",
      h1: "Doctor Website Design",
      intro:
        "Patients look you up on Google before they walk into your clinic. A fast, trustworthy, mobile-friendly website directly affects how many of them book. Forpus builds sites for physicians focused on appointments, services and clear information.",
      shortAnswer: {
        title: "What does a doctor's website include, and what does it cost?",
        body: "A doctor's website is a physician's own address, where they describe their specialities in their own words and guide patients to an appointment. A typical site Forpus builds carries a separate page for each speciality, appointment routing through WhatsApp or a form, a blog for patient-education articles, a contact form compliant with Türkiye's KVKK data-protection law, a fast mobile-first design, and technical SEO prepared for Google Maps. A single-page brochure site starts around ₺50,000 and goes live in about a week once your content is ready. A full clinic site with each speciality on its own page runs ₺100,000–180,000 and takes two to four weeks. Add online booking and a patient portal and the project starts at ₺250,000. Health-advertising rules in Türkiye rule out price lists, campaign announcements and patient testimonials, so the site is built as information rather than promotion. The domain and the site are registered in your name.",
      },
      benefits: [
        {
          title: "Trust on first sight",
          body: "A clean, professional design builds confidence and carries your clinic's reputation online.",
        },
        {
          title: "Online booking",
          body: "Send visitors to a booking form or WhatsApp in one tap so no slot goes empty.",
        },
        {
          title: "Get found on Google",
          body: "A structure optimized for your specialty and location helps you stand out in local searches.",
        },
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
        {
          q: "How long does a doctor website take?",
          a: "If your content is ready, a presentation site is usually live within a week. Extras like a booking system can add some time.",
        },
        {
          q: "Can you add an online booking system?",
          a: "Yes. From a simple WhatsApp/form redirect to a fully automated booking calendar, we tailor it to your needs.",
        },
        {
          q: "Will my site show up on Google?",
          a: "We deliver the site with technical SEO in place and grow your visibility over time with a Google Business profile and content.",
        },
      ],
      ctaTitle: "Let's talk about your clinic's website",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "dishekimi",
    image: "/generated/personas/dishekimi.webp",
    service: "web",
    slug: { tr: "dis-hekimi-web-sitesi", en: "dentist-website" },
    tr: {
      metaTitle: "Diş Hekimi & Klinik Web Sitesi",
      metaDescription:
        "Diş hekimi ve ağız-diş sağlığı kliniklerine özel web sitesi tasarımı. Online randevu, tedavi tanıtımı ve Google'da görünürlük. Ücretsiz teklif alın.",
      eyebrow: "Diş Hekimine Özel",
      h1: "Diş Hekimi Web Sitesi",
      intro:
        "Hastalar bir diş hekimi seçmeden önce Google'da arıyor, yorumlara ve kliniğin sitesine bakıyor. Güven veren, tedavilerinizi net anlatan ve randevuya yönlendiren bir site, koltuğunuzu doldurur. Forpus diş hekimlerine özel; implant, ortodonti ve estetik tedavileri öne çıkaran siteler tasarlıyor.",
      shortAnswer: {
        title: "Diş hekimi web sitesi ne içerir, ne kadar tutar?",
        body: "Diş hekimi web sitesi, kliniğin implant, ortodonti ve estetik gibi tedavilerini kendi anlatımıyla açıkladığı ve hastayı randevuya yönlendirdiği kendi adresidir. Forpus'un kurduğu tipik bir klinik sitesinde her tedavi için ayrı bir sayfa, hastadan yazılı rıza alınmış bir öncesi-sonrası galerisi, WhatsApp veya form üzerinden randevu yönlendirmesi, birden fazla hekim varsa kişiye özel profil sayfaları, mobil uyumlu hızlı bir tasarım ve Google Haritalar için hazırlanmış teknik SEO ayarları bulunur. Tek sayfalık bir tanıtım sitesi ₺50.000 bandında başlar ve içerikleriniz hazırsa yaklaşık bir hafta içinde yayına girer. Tedavilerin ayrı ayrı sayfalandığı tam bir klinik sitesi ₺100.000–180.000 aralığında ve iki ila dört haftada tamamlanır. Online randevu ile hasta paneli işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Sağlıkta tanıtım mevzuatı gereği fiyat ilanı, kampanya duyurusu ve hasta yorumu kullanılmaz. Alan adı sizin adınıza alınır, site size ait olur. Birden fazla hekim çalışıyorsa her biri için ayrı profil sayfası kurulur; hasta belirli bir hekimi arıyorsa doğrudan ona ulaşır.",
      },
      benefitsTitle: "Diş hekimi web sitesi kliniğinize ne kazandırır?",
      benefits: [
        {
          title: "İlk bakışta güven",
          body: "Steril, ferah ve profesyonel bir tasarım; hastanın koltuğa oturmadan önce içini rahatlatır.",
        },
        {
          title: "Online randevu",
          body: "Ziyaretçiyi tek tıkla randevu formuna veya WhatsApp'a yönlendirin; boş koltuk kalmasın.",
        },
        {
          title: "Tedavileriniz görünür",
          body: "İmplant, ortodonti, beyazlatma; her tedaviyi ayrı anlatarak doğru hastayla eşleşin.",
        },
      ],
      featuresTitle: "Diş hekimi sitenizde neler olur?",
      features: [
        "Tedavi sayfaları (implant, ortodonti, estetik)",
        "Online randevu / WhatsApp entegrasyonu",
        "Öncesi-sonrası galerisi",
        "Tedavi rehberleri ve bilgilendirme blogu",
        "Mobil uyumlu, hızlı yüklenen tasarım",
        "Google ve harita için SEO ayarları",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Diş hekimi web sitesi ne kadar sürede hazır olur?",
          a: "İçerikleriniz hazırsa tanıtım siteniz genellikle 1 hafta içinde yayında olur. Online randevu gibi ek özellikler süreyi biraz uzatabilir.",
        },
        {
          q: "Öncesi-sonrası fotoğrafları ekleyebilir miyiz?",
          a: "Evet. Tedavi sonuçlarınızı gösteren şık bir öncesi-sonrası galerisi kurar, izin ve gizliliğe dikkat ederiz.",
        },
        {
          q: "Sitem Google'da diş hekimi aramalarında çıkar mı?",
          a: "Siteyi teknik SEO ayarlarıyla teslim ederiz; Google İşletme profili ve içerik desteğiyle bölgenizdeki aramalarda görünürlüğünüzü zamanla artırırız.",
        },
        {
          q: "Diş hekimi web sitesi ne kadar tutar?",
          a: "Tek sayfalı bir tanıtım sitesi ₺50.000 bandında başlar. Her tedavinin ayrı sayfalandığı, öncesi-sonrası galerili ve SEO'ya hazırlanmış bir klinik sitesi ₺100.000–180.000 aralığındadır. Online randevu ve hasta paneli işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Öncesi-sonrası fotoğraflarını siteye koyabilir miyim?",
          a: "Teknik olarak evet, ama iki koşulla: hastadan yazılı açık rıza almanız ve sağlıkta tanıtım mevzuatının sınırları içinde kalmanız gerekir. Bu görseller bilgilendirme amacıyla, abartılı vaat içermeden sunulmalıdır. Galeriyi bu çerçeveye uygun kurgularız; branşınıza özel sınırlar için oda veya mevzuat danışmanınızla teyitleşmenizi öneririz.",
        },
        {
          q: "Sağlıkta tanıtım kuralları sitemi nasıl etkiliyor?",
          a: "Türkiye'de sağlık hizmetlerinde reklam ile bilgilendirme mevzuatta ayrı şeylerdir. Pratikte şu demek: kampanya ve indirim duyurusu, fiyat ilanı, karşılaştırmalı üstünlük iddiası ve hasta yorumu gibi unsurlardan kaçınmak gerekir. Siteyi bu çerçeveyi gözeterek kurgularız.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet, sık yaptığımız iş. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurarız. Eski adresleri yenilerine yönlendirir, Google'daki mevcut sıralamanızın kaybolmamasını sağlarız; bu adım atlanırsa yenileme sonrası trafik düşer.",
        },
        {
          q: "Birden fazla hekim varsa nasıl gösteriyoruz?",
          a: "Her hekim için ayrı bir profil sayfası kurarız: özgeçmiş, ilgilendiği tedaviler ve doğrudan o hekime randevu yönlendirmesi. Hasta belirli bir hekimi arıyorsa doğrudan onu bulur; bu hem hasta deneyimini hem de hekim adıyla yapılan aramalardaki görünürlüğü iyileştirir.",
        },
      ],
      ctaTitle: "Kliniğiniz için web sitesi konuşalım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Hasta koltuğa oturmadan önce nereye bakıyor?",
        body: [
          "Diş tedavisi ertelenen bir karardır. İnsan implant veya ortodonti düşünürken haftalarca araştırır; fiyat sorar, öncesi-sonrası fotoğraflarına bakar, hekimin nasıl biri olduğunu anlamaya çalışır. Bu araştırmanın tamamı internette geçer.",
          "Kliniğinizin sitesi yoksa bu süreçte sizin yerinize randevu siteleri ve yorum platformları konuşur. Oralarda tedavilerinizi anlatamaz, farkınızı gösteremez, sadece bir isim ve puan olarak görünürsünüz.",
          "Kendi siteniz olduğunda tedavi süreçlerini kendi anlatımınızla açıklarsınız: implant kaç seansta biter, ortodontide ne kadar süre gerekir, ağrı olur mu. Bu soruların yanıtını sitenizde bulan hasta, kliniğe daha kararlı gelir.",
        ],
      },
      pricing: {
        title: "Diş hekimi web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 90.000",
            timeline: "~1–2 hafta",
            body: "Tek veya az sayfalı, mobil uyumlu klinik tanıtımı. Hekim özgeçmişi, tedavi listesi, iletişim ve WhatsApp yönlendirmesi. Yeni açılan klinikler için hızlı bir başlangıç.",
          },
          {
            name: "Klinik sitesi",
            price: "₺100.000 – 180.000",
            timeline: "~2–4 hafta",
            body: "İmplant, ortodonti, estetik diş hekimliği gibi her tedavinin kendi sayfası olduğu çok sayfalı yapı. Öncesi-sonrası galerisi, hasta bilgilendirme yazıları, çok dilli seçenek. Bölgesel aramalarda görünmek isteyen klinikler için.",
          },
          {
            name: "Randevu sistemi & hasta paneli",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "Takvimli online randevu, çakışma kontrolü, otomatik hatırlatma ve hasta kayıt paneli. Çok koltuklu, birden fazla hekimin çalıştığı klinikler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Klinik programınızı aksatmayan bir düzen kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi tedavilerde yoğunlaştığınızı ve hasta profilinizi konuşuruz. İmplant ağırlıklı bir klinikle ortodonti ağırlıklı bir kliniğin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik ve görsel toplama",
            body: "Tedavi açıklamaları, hekim özgeçmişi ve klinik fotoğrafları için doldurması kolay bir şablon gönderiyoruz. Öncesi-sonrası görselleri kullanacaksanız hasta onayı konusunu bu aşamada netleştiririz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfa tasarımını görürsünüz. Yön doğruysa tedavi sayfaları aynı dille açılır. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Google Search Console ve İşletme Profili bağlantısı dahil yayına alırız. Teslimde sitenin nasıl güncelleneceğini gösteren kısa bir kayıt bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Diş hekimi web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Öncesi-sonrası görselleri kullanılabilir mi?",
            body: "Hasta görselleri kişisel veridir; yazılı onay olmadan yayınlanamaz. Ayrıca sağlıkta tanıtım mevzuatı bu görsellerin kullanımına sınır getirir. Ajansınız bunu biliyor mu, yoksa siteyi yayınlayıp riski size mi bırakıyor?",
          },
          {
            title: "Tedaviler ayrı sayfa mı, tek listede mi?",
            body: "İmplant arayan hasta ile ortodonti arayan hasta farklı şeyler soruyor. Hepsi tek sayfada listelenmişse ne hasta aradığını bulur ne de Google hangi tedavide uzman olduğunuzu anlar.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının sizin adınıza kayıtlı olduğundan emin olun. Bazı ajanslar alan adını kendi hesabına alır; ayrılmak istediğinizde siteniz rehin kalır. Sözleşmeye yazdırın.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Hastaların büyük kısmı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın. Üç saniyede açılmıyorsa hasta beklemez.",
          },
          {
            title: "Randevuya kaç tıkla gidiliyor?",
            body: "Ana sayfayı açtığınızda randevu veya iletişim eylemi ilk ekranda görünüyor mu? Görünmüyorsa site güzel olsa bile iş yapmaz.",
          },
          {
            title: "KVKK metinleri hazır mı?",
            body: "Form varsa aydınlatma metni ve açık rıza zorunludur. Şaşırtıcı sayıda klinik sitesi bu metinler olmadan yayında duruyor.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Dentist & Dental Clinic Website Design",
      metaDescription:
        "Website design for dentists and dental clinics. Online booking, treatment pages and Google visibility. Trustworthy and mobile-friendly. Get a free quote.",
      eyebrow: "For Dentists",
      h1: "Dentist Website Design",
      intro:
        "Patients search on Google, read reviews and check the clinic's site before choosing a dentist. A trustworthy site that explains your treatments clearly and drives bookings fills your chair. Forpus builds dentist sites that highlight implants, orthodontics and aesthetic treatments.",
      shortAnswer: {
        title: "What does a dentist website include, and what does it cost?",
        body: "A dentist website is the clinic's own address, where it explains treatments such as implants, orthodontics and cosmetic dentistry in its own words and guides patients to book. A typical clinic site Forpus builds carries a separate page per treatment, a before-and-after gallery published with written patient consent, appointment routing through WhatsApp or a form, an individual profile page for each dentist when the practice has several, a fast mobile-first design, and technical SEO prepared for Google Maps. A single-page brochure site starts around ₺50,000 and goes live in about a week once your content is ready. A full clinic site with each treatment on its own page runs ₺100,000–180,000 and takes two to four weeks. Add online booking and a patient portal and the project starts at ₺250,000. Health-advertising rules in Türkiye rule out price lists, campaign announcements and patient testimonials.",
      },
      benefits: [
        {
          title: "Trust at first glance",
          body: "A clean, calm, professional design puts patients at ease before they even sit in the chair.",
        },
        {
          title: "Online booking",
          body: "Send visitors to a booking form or WhatsApp in one tap so no slot goes empty.",
        },
        {
          title: "Treatments made visible",
          body: "Implants, orthodontics, whitening — explain each treatment separately to match the right patient.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Treatment pages (implants, orthodontics, aesthetics)",
        "Online booking / WhatsApp integration",
        "Before-and-after gallery",
        "Treatment guides and info blog",
        "Fast, mobile-friendly design",
        "SEO setup for Google and Maps",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "How long does a dentist website take?",
          a: "If your content is ready, a presentation site is usually live within a week. Extras like online booking can add some time.",
        },
        {
          q: "Can we add before-and-after photos?",
          a: "Yes. We build a sharp before-and-after gallery showcasing your results, with attention to consent and privacy.",
        },
        {
          q: "Will my site show up for dentist searches on Google?",
          a: "We deliver the site with technical SEO in place and grow your local visibility over time with a Google Business profile and content.",
        },
      ],
      ctaTitle: "Let's talk about your clinic's website",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
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
        "Diyetisyenlere özel web sitesi ve online randevu. Çalışma yönteminizi ve hizmetlerinizi anlatan, mobil uyumlu, Google'da bulunan bir site. Ücretsiz teklif alın.",
      eyebrow: "Diyetisyene Özel",
      h1: "Diyetisyen Web Sitesi",
      intro:
        "Danışanlar bir diyetisyen ararken önce internete bakıyor. Sıcak, güven veren ve randevuya yönlendiren bir site, danışan sayınızı artırır. Forpus diyetisyenlere özel; paket tanıtımı, online randevu ve içerik odaklı siteler tasarlıyor.",
      shortAnswer: {
        title: "Diyetisyen web sitesi ne içerir, ne kadar tutar?",
        body: "Diyetisyen web sitesi, bir beslenme uzmanının yaklaşımını ve paketlerini anlattığı, danışanı doğrudan randevuya taşıdığı kendi adresidir. Forpus'un kurduğu tipik bir diyetisyen sitesinde hizmet ve paket sayfaları, online randevu ile ödeme entegrasyonu, tarif ve bilgilendirme yazıları için blog altyapısı, danışan yorumları bölümü, sosyal medya bağlantıları ve mobil uyumlu hızlı bir tasarım bulunur. Tek sayfalık bir tanıtım sitesi ₺50.000 bandında başlar ve içerikleriniz hazırsa yaklaşık bir hafta içinde yayına girer. Paketlerin ayrı ayrı anlatıldığı, arama motorlarına hazırlanmış danışan çeken bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Danışanın ölçümlerini, programını ve ilerlemesini takip ettiğiniz bir mobil uygulama işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Online danışmanlık veriyorsanız görüntülü görüşme ve ödeme akışı en baştan kurgulanır. Site ve alan adı mülkiyeti sizde kalır, içerikleri teslimden sonra kendiniz güncellersiniz. Tarif ve bilgilendirme yazıları, danışan aramalarında görünmenin en ucuz yolu; blog altyapısı bu yüzden standart gelir. Sitede ücret yazıp yazmayacağınıza birlikte karar veririz.",
      },
      benefitsTitle: "Diyetisyen web sitesi pratiğinize ne kazandırır?",
      benefits: [
        {
          title: "Yönteminiz anlaşılsın",
          body: "Nasıl çalıştığınızı ve görüşmenin nasıl ilerlediğini sade bir dille anlatın.",
        },
        {
          title: "Online randevu & ödeme",
          body: "Görüşmeleri online takvim ve ödeme ile alın; süreç sizin için otomatikleşsin.",
        },
        {
          title: "İçerikle güven",
          body: "Blog ve tarif altyapısıyla uzmanlığınızı gösterin, Google'dan organik danışan kazanın.",
        },
      ],
      featuresTitle: "Diyetisyen sitenizde neler olur?",
      features: [
        "Hizmet ve paket sayfaları",
        "Online randevu / ödeme entegrasyonu",
        "Blog ve tarif altyapısı",
        "Sık sorulan sorular bölümü",
        "Mobil uyumlu, hızlı tasarım",
        "Google ve sosyal medya bağlantıları",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Sağlıkta tanıtım kuralları sitemi nasıl etkiliyor?",
          a: "Türkiye'de sağlık alanında reklam ile bilgilendirme mevzuatta ayrı şeylerdir ve diyetisyenlik de bu çerçevenin içindedir; site içeriği bilgilendirme tarafında kalmalıdır. Pratikte şu demek: kampanya ve indirim duyurusu, ücret ilanı, karşılaştırmalı üstünlük iddiası, danışan yorumu ve öncesi-sonrası görseli sorun yaratır. Kilo vaadi veren ifadeler de aynı kapsamda. Yerine çalışma yönteminizi, görüşmenin nasıl ilerlediğini ve hizmet kapsamınızı tarafsız bir dille anlatırız. Sınırda gördüğümüz başlıkları size ayrıca söyleriz; kesin yorum için bağlı olduğunuz meslek kuruluşuyla teyitleşmenizi öneririz.",
        },
        {
          q: "Online danışmanlık için altyapı kurar mısınız?",
          a: "Evet. Randevu, online görüşme yönlendirmesi ve ödeme akışını ihtiyacınıza göre kurarız.",
        },
        {
          q: "İçerik yazımında destek olur musunuz?",
          a: "Metin ve görsel yönünde yön veririz; isterseniz temel içerikleri birlikte hazırlarız.",
        },
        {
          q: "Sosyal medyamla bağlanır mı?",
          a: "Instagram ve diğer hesaplarınızı siteye entegre eder, takipçiyi danışana çevirmenize yardımcı oluruz.",
        },
        {
          q: "Diyetisyen web sitesi ne kadar tutar?",
          a: "Tek sayfalı bir tanıtım sitesi ₺50.000 bandında başlar. Paketlerin ayrı sayfalandığı, blog altyapılı ve online randevu entegrasyonlu bir site ₺90.000–150.000 aralığındadır. Danışan takip uygulaması işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Danışan takip uygulaması da yapıyor musunuz?",
          a: "Evet, en çok talep gördüğümüz işlerden biri. Danışanın kilo ve ölçüm girişi yaptığı, beslenme planını gördüğü ve sizinle mesajlaştığı bir mobil uygulama; sizin tarafınızda ise tüm danışanları yönettiğiniz bir panel kurarız. Uygulama tarafı web sitesinden ayrı bir proje olarak ilerler.",
        },
        {
          q: "Sitede fiyat yazmalı mıyım?",
          a: "Deneyimimiz şu yönde: fiyat yazmak gelen danışan sayısını azaltır ama gelen danışanların kalitesini belirgin şekilde artırır. Bütçesi tutmayanlar sizi aramadan eleniyor, siz de aynı soruyu yüzlerce kez yanıtlamıyorsunuz. Karar sizin; ikisini de destekleyecek şekilde kurgulayabiliriz.",
        },
        {
          q: "Online ödeme alabilir miyim?",
          a: "Evet. Danışan paketi siteden seçip kredi kartıyla ödeyebilir, ardından randevu takvimine yönlenir. Türkiye'de yaygın ödeme altyapılarıyla çalışıyoruz; başvuru ve sözleşme süreci sizin adınıza ilerler, biz teknik entegrasyonu yaparız.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurarız. Eski adresleri yenilerine yönlendirir, Google'daki mevcut sıralamanızın kaybolmamasını sağlarız.",
        },
      ],
      ctaTitle: "Danışan getiren bir site kuralım",
      ctaText:
        "İhtiyacınızı konuşalım, size uygun paketi ve net bir teklifi birlikte belirleyelim.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Danışan size ulaşmadan önce neye bakıyor?",
        body: [
          "Beslenme desteği arayan biri genellikle bir arkadaşından isim duyar, sonra o ismi internette aratır. Karşısına sadece bir Instagram hesabı çıkıyorsa, gördüğü şey paylaşımlardır; nasıl çalıştığınız, paketlerinizin ne içerdiği ve size nasıl ulaşacağı belirsiz kalır.",
          "Instagram'ın bir başka sorunu daha var: hesap sizin değil, algoritmanın. Erişiminiz bir gecede düşebilir, hesabınız kapanabilir. Kendi siteniz kalıcı ve tamamen sizin kontrolünüzde olan tek yerdir.",
          "Danışanın en çok takıldığı nokta ise şu: fiyat ve süreç. Kaç seans, ne kadar, online mı yüz yüze. Bunları sitede net gören danışan çok daha hazır bir şekilde randevu alır; siz de fiyat sorusunu yüzlerce kez yanıtlamaktan kurtulursunuz.",
        ],
      },
      pricing: {
        title: "Diyetisyen web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 80.000",
            timeline: "~1–2 hafta",
            body: "Tek veya az sayfalı, sıcak bir tanışma sayfası. Hakkınızda, çalışma yönteminiz, paketler ve WhatsApp yönlendirmesi. Yeni başlayan diyetisyenler için yeterli.",
          },
          {
            name: "Danışan çeken site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Paketlerin ayrı sayfalandığı, blog ve tarif altyapılı, online randevu ve ödeme entegrasyonlu yapı. İçerik üreterek büyümek isteyenler için doğru başlangıç.",
          },
          {
            name: "Danışan takip uygulaması",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "Danışanın ölçümlerini, planını ve ilerlemesini cebinden gördüğü mobil uygulama; sizin için yönetim paneli ve mesajlaşma. Danışan sayısı tabloyla yönetilemeyecek kadar artmışsa.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      caseRef: {
        title: "Diyetisyen alanında yaptığımız iş",
        body: "Dyt. Ece Öztürk için kurduğumuz site, beslenme danışmanlığında tonun ne kadar önemli olduğunu gösteriyor: sıcak bir renk paleti, iddia yerine sürdürülebilirlik vurgusu ve hesaplama araçlarıyla ziyaretçiyi sayfada tutan bir kurgu. Danışan adayının kendini yargılanmış hissetmediği bir dil, bu alanda tasarımın en belirleyici parçası.",
        projectSlug: "diyetisyenece",
        linkLabel: "Siteyi inceleyin",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Danışan programınızı aksatmayan bir düzen kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Kimlerle çalıştığınızı ve nasıl bir yaklaşımınız olduğunu konuşuruz. Sporcu beslenmesiyle çalışan bir diyetisyenle klinik beslenmede uzmanlaşmış birinin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik toplama",
            body: "Paket açıklamaları, çalışma yönteminiz ve sık sorulanlar için doldurması kolay bir şablon gönderiyoruz. Yazmaya vaktiniz yoksa metinleri biz yazar, onayınıza sunarız.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfa tasarımını görürsünüz. Yön doğruysa diğer sayfalar aynı dille açılır. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Google Search Console ve İşletme Profili bağlantısı dahil yayına alırız. Blog yazısı ekleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Diyetisyen web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "İçeriği kendiniz ekleyebilecek misiniz?",
            body: "Blog ve tarif paylaşacaksanız her yazı için ajansa bağımlı kalmamalısınız. Yönetim paneli olmayan bir site, düzenli içerik üretmeyi imkânsız hale getirir.",
          },
          {
            title: "Online ödeme gerçekten gerekli mi?",
            body: "Paket satışını siteden yapacaksanız evet; ama danışanların çoğu sizinle önce konuşmak istiyorsa ödeme altyapısı gereksiz maliyet olur. Bu kararı hacminize göre verin.",
          },
          {
            title: "Instagram ile site birbirini besliyor mu?",
            body: "Sitenin işi takipçiyi danışana çevirmektir. Biyografideki link sitede doğru sayfaya düşüyor mu, paketler oradan görünüyor mu, randevu tek tıkla alınabiliyor mu?",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının sizin adınıza kayıtlı olduğundan emin olun. Bazı ajanslar alan adını kendi hesabına alır; ayrılmak istediğinizde siteniz rehin kalır.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Danışanların neredeyse tamamı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "KVKK metinleri hazır mı?",
            body: "Form varsa aydınlatma metni ve açık rıza zorunludur. Sağlık verisi niteliğinde bilgi topluyorsanız kapsamı daraltmak, gereksiz veri toplamamak gerekir.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Dietitian Website Design",
      metaDescription:
        "Website design and online booking for dietitians and nutritionists. A mobile-friendly digital storefront that attracts clients and ranks on Google.",
      eyebrow: "For Dietitians",
      h1: "Dietitian Website Design",
      intro:
        "People search online before choosing a dietitian. A warm, trustworthy site that drives bookings grows your client base. Forpus builds dietitian sites focused on packages, online booking and content.",
      shortAnswer: {
        title: "What does a dietitian website include, and what does it cost?",
        body: "A dietitian website is a nutrition professional's own address, where they explain their approach and packages and turn a visitor into a booked client. A typical site Forpus builds carries service and package pages, online booking with payment, a blog for recipes and guidance articles, a client-testimonials section, social media links and a fast mobile-first design. A single-page brochure site starts around ₺50,000 and goes live in about a week once your content is ready. A site built to attract clients, with each package on its own page and prepared for search, runs ₺90,000–150,000 and takes two to four weeks. A mobile app where you track a client's measurements, plan and progress starts at ₺250,000. If you consult online, video sessions and payment flow are designed in from the start. The domain and the site stay in your name, and you update the content yourself after handover.",
      },
      benefits: [
        {
          title: "Make your method clear",
          body: "Explain how you work and how a consultation unfolds, in plain terms.",
        },
        {
          title: "Online booking & payments",
          body: "Take sessions with an online calendar and payments so the process runs itself.",
        },
        {
          title: "Trust through content",
          body: "Show your expertise with a blog and recipes, and earn organic clients from Google.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service and package pages",
        "Online booking / payment integration",
        "Blog and recipe foundation",
        "Frequently asked questions section",
        "Fast, mobile-friendly design",
        "Google and social media links",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you set up online consultations?",
          a: "Yes. We build booking, online-meeting redirects and payment flows around your needs.",
        },
        {
          q: "Do you help with content?",
          a: "We guide copy and visuals, and can prepare the core content together if you'd like.",
        },
        {
          q: "Does it connect to my social media?",
          a: "We integrate Instagram and other accounts so you can turn followers into clients.",
        },
      ],
      ctaTitle: "Let's build a site that brings clients",
      ctaText:
        "Let's talk through your needs and pick the right package and a clear quote together.",
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
      shortAnswer: {
        title: "Psikolog web sitesi ne içerir, ne kadar tutar?",
        body: "Psikolog web sitesi, bir uzmanın çalışma alanlarını ve terapi yaklaşımını anlattığı, danışanın ilk adımı atmasını kolaylaştıran kendi adresidir. Forpus'un kurduğu tipik bir psikolog sitesinde çalışma alanı ve yaklaşım sayfaları, online ya da yüz yüze seans yönlendirmesi, bilgilendirme yazıları için blog altyapısı, mahremiyeti gözeten bir iletişim formu, sade ve sakin bir tasarım ile arama görünürlüğü ayarları bulunur. Tek sayfalık bir tanıtım sitesi ₺50.000 bandında başlar ve içerikleriniz hazırsa yaklaşık bir hafta içinde yayına girer. Çalışma alanlarının ayrı ayrı sayfalandığı bir uzmanlık sitesi ₺90.000–140.000 aralığında ve iki ila dört haftada tamamlanır. Randevu ve seans paneli işin içine girdiğinde ₺200.000'den başlayan bir projeden söz ediyoruz. Tasarım bilerek dikkat çekmez: terapi arayan biri için sakinlik, gösterişten daha ikna edicidir. Alan adı ve site sizin adınıza kaydedilir, içerikleri teslimden sonra kendiniz güncellersiniz. İletişim formu bilerek az bilgi ister: ilk temasta uzun bir form doldurmak, danışanın vazgeçtiği yerdir. Meslek etiği gereği danışan yorumu yayınlanmaz.",
      },
      benefitsTitle: "Psikolog web sitesi pratiğinize ne kazandırır?",
      benefits: [
        {
          title: "Güven ve mahremiyet",
          body: "Sakin renkler ve net bir dil ile danışana ilk temasta huzur ve güven verin.",
        },
        {
          title: "Kolay iletişim",
          body: "Randevu ve gizli iletişim yollarını netleştirin; danışan çekinmeden ulaşsın.",
        },
        {
          title: "Uzmanlığın görünür",
          body: "Çalışma alanlarınızı ve yaklaşımınızı anlatarak doğru danışanla eşleşin.",
        },
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
        {
          q: "Online terapi için uygun mu?",
          a: "Evet. Online görüşme yönlendirmesi ve randevu akışını gizlilik önceliğiyle kurarız.",
        },
        {
          q: "Tasarım fazla dikkat çekici olur mu?",
          a: "Hayır. Alanınıza uygun, sakin ve güven veren bir dil kullanırız; abartıdan kaçınırız.",
        },
        {
          q: "İçeriklerimi sonradan güncelleyebilir miyim?",
          a: "İsterseniz yönetilebilir içerik altyapısı kurarız; yazılarınızı kendiniz güncellersiniz.",
        },
        {
          q: "Psikolog web sitesi ne kadar tutar?",
          a: "Sade bir tanıtım sitesi ₺50.000 bandında başlar. Çalışma alanlarının ayrı sayfalandığı, blog altyapılı bir uzmanlık sitesi ₺90.000–140.000 aralığındadır. Randevu ve seans paneli işin içine girdiğinde ₺200.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Online terapi için altyapı kuruyor musunuz?",
          a: "Görüntülü görüşmeyi genellikle sıfırdan yazmak yerine mevcut ve güvenli bir platforma yönlendirmeyi öneriyoruz; hem daha ucuz hem daha güvenilir olur. Randevu, ödeme ve hatırlatma akışını ise sitenize entegre ederiz. İhtiyaç gerçekten özelse kendi sistemimizi de kurabiliriz.",
        },
        {
          q: "Danışan yorumu yayınlayabilir miyim?",
          a: "Bu alanda önermiyoruz. Danışan mahremiyeti açısından risklidir ve meslek etiği kuralları bakımından da sorun yaratabilir. Güveni yorumla değil; yaklaşımınızı net anlatarak, eğitim ve süpervizyon geçmişinizi göstererek ve bilgilendirici içerik üreterek kurmak hem daha güvenli hem daha kalıcıdır.",
        },
        {
          q: "Sitede ücret bilgisi olmalı mı?",
          a: "Çoğu uzman seans ücretini yazmamayı tercih ediyor, bu da savunulabilir bir tercih. Ancak ücret aralığı yazmak, ilk görüşmede yaşanan beklenti uyuşmazlığını azaltıyor. İkisini de destekleyecek şekilde kurgulayabiliriz.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurarız. Eski adresleri yenilerine yönlendirir, Google'daki mevcut sıralamanızın kaybolmamasını sağlarız.",
        },
      ],
      ctaTitle: "Güven veren bir site kuralım",
      ctaText:
        "Yaklaşımınıza uygun, ölçülü bir site için kısa bir görüşme yapalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Terapi arayan biri siteye girdiğinde ne hissediyor?",
        body: [
          "Terapiye başlamak zor bir karardır. Siteye giren kişi çoğu zaman tereddütlüdür ve aradığı ilk şey bilgi değil, güvendir. Sitenin tonu bu yüzden içeriğinden daha belirleyici olabilir.",
          "Bu alanda en sık yapılan hata sitenin fazla iddialı olmasıdır. Abartılı vaatler, ağır klinik dil veya satış hissi veren bir kurgu, tereddütlü kişiyi yaklaştırmak yerine uzaklaştırır. Sakin, ölçülü ve yargılamayan bir dil çok daha iyi çalışır.",
          "İkinci mesele mahremiyet. Danışan adayı iletişim formunu doldururken bilgisinin nereye gittiğini merak eder. Formun sade olması, gereksiz bilgi istememesi ve bunun açıkça belirtilmesi, ulaşma ihtimalini doğrudan artırır.",
        ],
      },
      pricing: {
        title: "Psikolog web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 80.000",
            timeline: "~1–2 hafta",
            body: "Sade, sakin bir dijital varlık. Hakkınızda, yaklaşımınız, çalışma alanlarınız ve gizlilik odaklı bir iletişim formu. Bireysel çalışan uzmanlar için yeterli.",
          },
          {
            name: "Uzmanlık sitesi",
            price: "₺90.000 – 140.000",
            timeline: "~2–4 hafta",
            body: "Her çalışma alanının ayrı sayfalandığı, bilgilendirme yazıları için blog altyapılı yapı. Online ve yüz yüze seans ayrımı, randevu yönlendirmesi. Belirli bir alanda tanınmak isteyenler için.",
          },
          {
            name: "Randevu ve seans paneli",
            price: "₺200.000'den başlayan",
            timeline: "Projeye özel",
            body: "Takvimli online randevu, otomatik hatırlatma, seans notu ve danışan kaydı için panel. Birden fazla uzmanın çalıştığı merkezler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Seans programınızı aksatmayan bir düzen kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Çalışma alanlarınızı, yaklaşımınızı ve kimlerle çalıştığınızı konuşuruz. Çocuk ve ergenle çalışan bir uzmanla çift terapisi yapan birinin sitesi aynı tonda olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik toplama",
            body: "Yaklaşımınız ve çalışma alanlarınız için doldurması kolay bir şablon gönderiyoruz. Bu alanda metnin tonu kritik olduğu için yazdıklarınızı sizinle birlikte gözden geçiriyoruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfa tasarımını görürsünüz. Renk ve tipografi seçimleri bu alanda sakinlik hissi üzerinden yapılır. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Google Search Console ve İşletme Profili bağlantısı dahil yayına alırız. Teslimde sitenin nasıl güncelleneceğini gösteren kısa bir kayıt bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Psikolog web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Form ne kadar bilgi istiyor?",
            body: "Danışan adayından yaşadığı sorunu formda anlatmasını istemek, ulaşma oranını düşürür. Ad ve iletişim bilgisi çoğu zaman yeterlidir; gerisi ilk görüşmede konuşulur.",
          },
          {
            title: "Sitenin tonu size benziyor mu?",
            body: "Hazır şablonlar bu alanda genellikle fazla kurumsal veya fazla neşeli duruyor. Ziyaretçi tonu sizinle eşleştiremezse ilk temas kurulmaz. Farkı baştan sorun.",
          },
          {
            title: "Gizlilik açıkça yazıyor mu?",
            body: "İletişim bilgisinin nasıl saklandığı ve kimseyle paylaşılmadığı sitede net görünmeli. Bu bir hukuki zorunluluk olduğu kadar güven unsurudur.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının sizin adınıza kayıtlı olduğundan emin olun. Bazı ajanslar alan adını kendi hesabına alır; ayrılmak istediğinizde siteniz rehin kalır.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Ziyaretçilerin büyük kısmı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Teslimden sonra ne oluyor?",
            body: "Bakım, güncelleme ve sorun çıktığında kime ulaşacağınız yazılı olsun. Destek verilmeyen siteler bir yıl içinde güncelliğini yitirir.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Psychologist Website Design",
      metaDescription:
        "Calm, privacy-focused website design for psychologists and therapists. Online booking and clear information for clients. Get a free quote.",
      eyebrow: "For Psychologists",
      h1: "Psychologist Website Design",
      intro:
        "Reaching out for therapy takes courage; your site should reassure at that moment. A calm, professional, privacy-respecting design makes it easier for clients to contact you. Forpus builds measured, trustworthy sites for psychologists.",
      shortAnswer: {
        title:
          "What does a psychologist website include, and what does it cost?",
        body: "A psychologist website is a therapist's own address, where they describe their fields of work and therapeutic approach and make the first step easier for the person reaching out. A typical site Forpus builds carries pages for each field and approach, routing for online or in-person sessions, a blog for informational writing, a contact form designed around privacy, a calm and restrained layout, and search-visibility settings. A single-page brochure site starts around ₺50,000 and goes live in about a week once your content is ready. A specialist site with each field on its own page runs ₺90,000–140,000 and takes two to four weeks. Add an appointment and session panel and the project starts at ₺200,000. The design deliberately stays quiet: for someone looking for therapy, calm is more persuasive than flourish. Professional ethics rule out publishing client testimonials.",
      },
      benefits: [
        {
          title: "Trust and privacy",
          body: "Calm colors and clear language put clients at ease from the first touch.",
        },
        {
          title: "Easy to reach you",
          body: "Make booking and discreet contact options clear so clients reach out without hesitation.",
        },
        {
          title: "Your expertise, visible",
          body: "Explain your focus areas and approach to match with the right clients.",
        },
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
        {
          q: "Does it work for online therapy?",
          a: "Yes. We set up online-meeting redirects and booking flows with privacy as a priority.",
        },
        {
          q: "Will the design feel too flashy?",
          a: "No. We use a calm, reassuring language suited to your field and avoid anything over the top.",
        },
        {
          q: "Can I update my content later?",
          a: "If you'd like, we set up editable content so you can update your posts yourself.",
        },
      ],
      ctaTitle: "Let's build a reassuring site",
      ctaText:
        "Let's have a short call about a measured site that fits your approach.",
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
      shortAnswer: {
        title: "Avukat web sitesi ne içerir, ne kadar tutar?",
        body: "Avukat web sitesi, bir hukukçunun ya da büronun çalışma alanlarını ve deneyimini anlattığı, doğru müvekkilin kendisine ulaşmasını sağlayan kendi adresidir. Forpus'un kurduğu tipik bir büro sitesinde her çalışma alanı için ayrı bir sayfa, ekip ve özgeçmiş bölümü, makale yayınlanabilen bir bilgi bankası, randevu ve iletişim formu, kurumsal ve mobil uyumlu bir tasarım ile meslek dizinlerini de kapsayan SEO ayarları bulunur. Tek sayfalık bir tanıtım sitesi ₺50.000 bandında başlar ve içerikleriniz hazırsa yaklaşık bir hafta içinde yayına girer. Çalışma alanlarının ayrı ayrı sayfalandığı tam bir büro sitesi ₺100.000–170.000 aralığında ve iki ila dört haftada tamamlanır. Müvekkil portalı işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Avukatlık reklam yasağı gereği iş getirici ifade, başarı oranı ve müvekkil yorumu kullanılmaz. Alan adı ajansın değil sizin hesabınızda durur, içerikleri teslimden sonra kendiniz güncellersiniz. Makale yayınlamak, çalışma alanı aramalarında görünmenin reklam yasağına takılmayan tek yolu; bilgi bankası altyapısı bu yüzden standart gelir.",
      },
      benefitsTitle: "Avukat web sitesi büronuza ne kazandırır?",
      benefits: [
        {
          title: "Kurumsal itibar",
          body: "Ciddi ve profesyonel bir tasarımla büronuzun güvenilirliğini ilk bakışta hissettirin.",
        },
        {
          title: "Çalışma alanlarınız net",
          body: "Uzmanlık alanlarınızı ayrı ayrı anlatarak doğru davayla eşleşin.",
        },
        {
          title: "Danışan getiren yapı",
          body: "Google'da çalışma alanı aramalarında çıkacak şekilde optimize edilmiş içerik.",
        },
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
        {
          q: "Reklam yasağına uygun mu?",
          a: "Evet. Baro ve meslek kurallarına uygun, bilgilendirme odaklı, ölçülü bir dille tasarlarız.",
        },
        {
          q: "Birden fazla çalışma alanı ekleyebilir miyim?",
          a: "Elbette. Her uzmanlık alanı için ayrı, SEO'ya uygun sayfalar oluştururuz.",
        },
        {
          q: "Makale yayınlayabilir miyim?",
          a: "Yönetilebilir bir bilgi bankası kurarız; makalelerinizi ekleyerek görünürlüğünüzü artırırsınız.",
        },
        {
          q: "Avukat web sitesi ne kadar tutar?",
          a: "Az sayfalı bir tanıtım sitesi ₺50.000 bandında başlar. Çalışma alanlarının ayrı sayfalandığı, ekip ve makale bölümlü kurumsal bir büro sitesi ₺100.000–170.000 aralığındadır. Müvekkil portalı işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Avukatlık reklam yasağı siteyi nasıl etkiliyor?",
          a: "Avukatlık Kanunu ve meslek kuralları tanıtımı sınırlar; site bilgilendirme sınırları içinde kalmalıdır. Pratikte iş vaadi, başarı oranı veya kazanılmış dava sayısı paylaşmak, müvekkil yorumu yayınlamak ve karşılaştırmalı üstünlük iddiasında bulunmak sorun yaratır. Siteyi bu çerçeveyi gözeterek kurgular, son onayı size bırakırız; bağlı olduğunuz baronun güncel düzenlemesiyle teyitleşmenizi öneririz.",
        },
        {
          q: "Makale yayınlamak işe yarar mı?",
          a: "Bu alanda en çok işe yarayan yöntem bu. İnsanlar avukat aramadan önce sorunlarını aratıyor; o soruya doğru yanıt veren bir yazı, sizi hem bulunur hem güvenilir kılıyor. Yazıların hukuki doğruluğu size ait olmak kaydıyla altyapıyı ve yayın düzenini biz kurarız.",
        },
        {
          q: "Müvekkil portalı gerçekten gerekli mi?",
          a: "Dosya sayınız az ve müvekkil iletişimi telefonla rahat yürüyorsa gereksiz maliyettir; dürüst yanıt budur. Ancak dosya durumu sorularının büro içinde ciddi vakit alması durumunda portal kendini kısa sürede amorti eder.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurarız. Eski adresleri yenilerine yönlendirir, Google'daki mevcut sıralamanızın kaybolmamasını sağlarız.",
        },
      ],
      ctaTitle: "Büronuz için kurumsal bir site",
      ctaText:
        "İhtiyacınızı konuşalım, meslek kurallarına uygun net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Danışan bir avukat ararken neye bakıyor?",
        body: [
          "Hukuki desteğe ihtiyaç duyan kişi genellikle telaşlıdır ve hızlı karar vermek ister. Bir isim duyar, aratır ve karşısına çıkan ilk sayfaya bakarak güven kararı verir. Bu karar çoğu zaman saniyeler içinde alınır.",
          "Kendi siteniz yoksa bu değerlendirme rehber sitelerindeki eksik profiliniz üzerinden yapılır. Orada uzmanlık alanlarınızı anlatamaz, büronuzun ciddiyetini gösteremez, sadece bir liste kaydı olarak görünürsünüz.",
          "Bir başka kayıp noktası da doğru danışanla eşleşmek. Ceza hukukuyla ilgilenen bir büroya iş hukuku sorusu gelmesi ikisi için de vakit kaybıdır. Uzmanlık alanlarınızın net yazıldığı bir site, gelen aramaların isabetini belirgin şekilde artırır.",
        ],
      },
      pricing: {
        title: "Avukat web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 90.000",
            timeline: "~1–2 hafta",
            body: "Az sayfalı, kurumsal bir dijital varlık. Özgeçmiş, çalışma alanları ve iletişim. Bireysel çalışan avukatlar için yeterli.",
          },
          {
            name: "Büro sitesi",
            price: "₺100.000 – 170.000",
            timeline: "~2–4 hafta",
            body: "Her çalışma alanının ayrı sayfalandığı, ekip ve özgeçmiş bölümlü, makale altyapılı kurumsal yapı. Çok dilli seçenek. Bilinirlik hedefleyen bürolar için.",
          },
          {
            name: "Müvekkil portalı",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "Müvekkilin dosya durumunu takip ettiği, belge paylaştığı güvenli bir portal ve büro içi yönetim paneli. Dosya sayısı telefonla yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Duruşma programınızı aksatmayan bir düzen kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Çalışma alanlarınızı ve hedef danışan profilinizi konuşuruz. Şirketlere hizmet veren bir büroyla bireysel danışanla çalışan bir büronun sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik toplama",
            body: "Özgeçmiş, çalışma alanları ve sık sorulanlar için doldurması kolay bir şablon gönderiyoruz. Hukuki metinlerin doğruluğu size ait olduğu için son onay her zaman sizden geçer.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfa tasarımını görürsünüz. Bu alanda tasarım dili ciddiyeti ve kurumsallığı taşımalı. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Google Search Console ve İşletme Profili bağlantısı dahil yayına alırız. Teslimde sitenin nasıl güncelleneceğini gösteren kısa bir kayıt bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Avukat web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Ajans reklam yasağını biliyor mu?",
            body: "Avukatlık meslek kuralları tanıtımı sıkı biçimde sınırlar. İş vaadi, başarı oranı, karşılaştırmalı üstünlük ve müvekkil yorumu gibi unsurlar sorun yaratır. Bunu bilmeyen bir ajans sizi baro nezdinde zor durumda bırakabilir.",
          },
          {
            title: "Çalışma alanları ayrı sayfa mı?",
            body: "Boşanma davası arayan kişiyle iş davası arayan kişi farklı şeyler soruyor. Hepsi tek sayfada listelenmişse ne danışan aradığını bulur ne de Google hangi alanda uzman olduğunuzu anlar.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının sizin veya büronuz adına kayıtlı olduğundan emin olun. Sözleşmeye alan adının ve kaynak kodun size ait olduğunu yazdırın.",
          },
          {
            title: "İletişim formu güvenli mi?",
            body: "Danışan formda dosyasıyla ilgili bilgi paylaşabilir. Bağlantının şifreli olması ve bu bilgilerin nasıl saklandığının belirtilmesi gerekir.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Ziyaretçilerin büyük kısmı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Teslimden sonra ne oluyor?",
            body: "Bakım, güncelleme ve sorun çıktığında kime ulaşacağınız yazılı olsun. Destek verilmeyen siteler bir yıl içinde güncelliğini yitirir.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Lawyer & Law Firm Website Design",
      metaDescription:
        "Corporate, trustworthy website design for lawyers and law firms. Practice-area pages, client acquisition and Google visibility. Get a quote.",
      eyebrow: "For Lawyers",
      h1: "Lawyer Website Design",
      intro:
        "Someone seeking legal help looks for trust and competence. A corporate, serious, mobile-friendly website reflects your firm's reputation and brings the right clients. Forpus builds sites for lawyers and law firms.",
      shortAnswer: {
        title: "What does a lawyer website include, and what does it cost?",
        body: "A lawyer website is a practitioner's or firm's own address, where they set out their practice areas and experience so the right client can find them. A typical firm site Forpus builds carries a separate page per practice area, a team and credentials section, a knowledge base you can publish articles into, an appointment and contact form, a corporate mobile-first design, and SEO that covers professional directories. A single-page brochure site starts around ₺50,000 and goes live in about a week once your content is ready. A full firm site with each practice area on its own page runs ₺100,000–170,000 and takes two to four weeks. Add a client portal and the project starts at ₺250,000. Turkish bar rules on legal advertising rule out solicitation language, success rates and client testimonials; publishing articles is the one route to visibility that stays inside those rules.",
      },
      benefits: [
        {
          title: "Corporate reputation",
          body: "A serious, professional design conveys your firm's credibility at first glance.",
        },
        {
          title: "Clear practice areas",
          body: "Explain each area of expertise separately to match with the right cases.",
        },
        {
          title: "A structure that converts",
          body: "Content optimized to appear in Google searches for your practice areas.",
        },
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
        {
          q: "Is it compliant with advertising rules?",
          a: "Yes. We design with an informational, measured tone that respects bar and professional rules.",
        },
        {
          q: "Can I add multiple practice areas?",
          a: "Of course. We create separate, SEO-friendly pages for each area of expertise.",
        },
        {
          q: "Can I publish articles?",
          a: "We set up a manageable knowledge base so you can add articles and grow your visibility.",
        },
      ],
      ctaTitle: "A corporate site for your firm",
      ctaText:
        "Let's talk through your needs and give you a clear, compliant quote.",
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
      shortAnswer: {
        title: "Emlak web sitesi ne içerir, ne kadar tutar?",
        body: "Emlak web sitesi, bir ofisin portföyünü kendi adresinde, filtrelenebilir ve harita üzerinde gezilebilir biçimde sunduğu yerdir. Forpus'un kurduğu tipik bir emlak sitesinde ilanları kendiniz eklediğiniz bir portföy yönetim paneli, konum, fiyat ve tipe göre filtreleme, harita üzerinde ilan gösterimi, WhatsApp ile doğrudan iletişim, mobil uyumlu hızlı bir galeri ve arama motorları için SEO ayarları bulunur. Ofis tanıtımına odaklı bir site ₺60.000–100.000 aralığında ve bir ila iki haftada yayına girer. İlanların panelden yönetildiği, filtreli ve haritalı tam bir portföy sitesi ₺120.000–200.000 aralığında ve üç ila beş haftada tamamlanır. Danışmanların sahadan giriş yaptığı bir mobil uygulama işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Mevcut ilanlarınız varsa toplu aktarımla taşınır, tek tek yeniden girilmez. Alan adı ve site sizin adınıza kaydedilir. Satılan ilanlar silinmez, \"satıldı\" olarak arşivlenir; hem referans olur hem arama motorundaki sayfa boşa düşmez. Fotoğraflar yüklendiği boyutta değil, ekrana göre türetilmiş boyutta iner; portföy sayfası bu yüzden telefonda da hızlı açılır.",
      },
      benefitsTitle: "Emlak web sitesi ofisinize ne kazandırır?",
      benefits: [
        {
          title: "Portföyünüz düzenli",
          body: "İlanları kolayca ekleyin, güncelleyin; her mülk şık bir ilan sayfasıyla öne çıksın.",
        },
        {
          title: "Filtre ve harita",
          body: "Konum, fiyat ve tipe göre filtreleme ile ziyaretçi aradığını saniyede bulsun.",
        },
        {
          title: "Doğru alıcıyı çekin",
          body: "Google ve sosyal medya için optimize; ilanlarınız daha çok kişiye ulaşsın.",
        },
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
        {
          q: "İlanları kendim ekleyebilir miyim?",
          a: "Evet. Kolay bir yönetim paneliyle ilanlarınızı fotoğraf ve detaylarıyla kendiniz eklersiniz.",
        },
        {
          q: "sahibinden gibi sitelerle entegre olur mu?",
          a: "İhtiyaca göre dış portallarla bağlantı veya paylaşım akışları kurabiliriz.",
        },
        {
          q: "Harita özelliği zor mu?",
          a: "Hayır. İlanları harita üzerinde göstermek standart olarak kurabildiğimiz bir özelliktir.",
        },
        {
          q: "Emlak web sitesi ne kadar tutar?",
          a: "Ofis tanıtımı odaklı, ilanları elle güncellediğimiz bir site ₺60.000 bandında başlar. İlanları kendinizin eklediği, filtreli ve haritalı portföy yönetimli bir site ₺120.000–200.000 aralığındadır. Danışman yetkilendirmesi ve mobil uygulama işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "İlanlarımı ilan sitelerinden aktarabilir miyiz?",
          a: "Çoğu durumda evet. Portföyünüzü dışa aktarabildiğiniz bir formatta alabiliyorsak toplu içe aktarım yaparız; böylece yüzlerce ilanı elle girmek zorunda kalmazsınız. Aktarımın mümkün olup olmadığı kullandığınız platforma bağlı, ilk görüşmede birlikte kontrol ediyoruz.",
        },
        {
          q: "Sitem ilan sitelerinin yerini tutar mı?",
          a: "Hayır ve bunu net söylemek isteriz. İlan siteleri arama hacmini elinde tutuyor, oradan çıkmanızı önermeyiz. Kendi siteniz farklı bir iş yapar: markanızı kurar, tekrar eden müşteriyi tutar, tavsiyeyle gelen kişinin sizi ciddi bulmasını sağlar ve komisyon ödemediğiniz doğrudan başvurular getirir. İkisi birbirinin alternatifi değil, tamamlayıcısıdır.",
        },
        {
          q: "Harita gösterimi ek ücret mi?",
          a: "Standart harita gösterimi paketin içindedir. Çok yüksek trafikli sitelerde harita servisleri kullanım üzerinden ücretlendirme yapabilir; böyle bir durum söz konusuysa ilk görüşmede açıkça söyleriz.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Portföyünüzü yeni sisteme aktarır, mevcut adreslerinizi yenilerine yönlendirir ve Google'daki birikiminizin kaybolmamasını sağlarız.",
        },
      ],
      ctaTitle: "Portföyünüzü satışa çeviren bir site",
      ctaText:
        "İhtiyacınızı konuşalım, portföy sisteminiz için net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Alıcı portföyünüzü nerede geziyor?",
        body: [
          "Alıcı ve kiracılar artık vitrine bakmıyor; portföyü telefonlarından geziyor. İlan sitelerindeyseniz görünürsünüz, ama orada da yüzlerce ofisten birisiniz ve müşteri sizi değil ilanı hatırlıyor.",
          "Kendi siteniz olduğunda portföy sizin markanız altında toplanır. Müşteri ikinci kez bakmak istediğinde ilan sitesine değil size döner; bu da tekrar eden müşteriyi ve tavsiyeyi mümkün kılar.",
          "En büyük fark ise sunumda ortaya çıkıyor. Filtrelenebilir, harita üzerinde gösterilen, fotoğrafları hızlı açılan bir portföy, aynı daireyi ilan sitesindeki halinden çok daha değerli gösterir.",
        ],
      },
      pricing: {
        title: "Emlak web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Ofis tanıtım sitesi",
            price: "₺60.000 – 100.000",
            timeline: "~1–2 hafta",
            body: "Ofisinizi ve öne çıkan birkaç portföyü tanıtan, mobil uyumlu bir vitrin. İlanları elle güncelleriz. Portföy sayısı azsa ve düzenli değişmiyorsa yeterli.",
          },
          {
            name: "Portföy yönetimli site",
            price: "₺120.000 – 200.000",
            timeline: "~3–5 hafta",
            body: "İlanları kendinizin eklediği yönetim paneli, konum-fiyat-tip filtreleme, harita gösterimi ve her ilanda tek tık WhatsApp. Aktif portföyü olan ofisler için doğru başlangıç.",
          },
          {
            name: "Panel + mobil uygulama",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "Danışman bazlı yetkilendirme, müşteri talep eşleştirme, ilan sitelerine aktarım ve mobil uygulama. Birden fazla danışmanla çalışan ofisler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Saha programınızı aksatmayan bir düzen kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Portföy büyüklüğünüzü, çalışma bölgenizi ve kaç danışmanla çalıştığınızı konuşuruz. Konut satışıyla ticari gayrimenkulün sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Portföy ve içerik",
            body: "İlan verilerinizi hangi formatta tuttuğunuza bakarız. Mevcut bir listeniz varsa toplu aktarım yapar, elle girişten kurtarırız. Fotoğraf kalitesi bu işte belirleyici olduğu için çekim konusunu da burada konuşuruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfa ve ilan detay sayfasını görürsünüz. İlan kartının nasıl göründüğü bu işin kalbi olduğu için üzerinde birlikte çalışırız. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Google Search Console ve İşletme Profili bağlantısı dahil yayına alırız. Paneli kullanmayı gösteren kısa bir kayıt bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Emlak web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "İlanı kendiniz ekleyebilecek misiniz?",
            body: "Portföy sürekli değişir. Her ilan için ajansa haber vermek zorundaysanız site bir ayda güncelliğini yitirir. Yönetim paneli olmayan emlak sitesi işe yaramaz.",
          },
          {
            title: "Fotoğraflar hızlı açılıyor mu?",
            body: "Emlak sitesi fotoğrafla satar ama işlenmemiş fotoğraflar siteyi yavaşlatır. Görsellerin otomatik küçültülüp küçültülmediğini sorun; aksi halde mobilde kimse galeriye kadar inmez.",
          },
          {
            title: "Satılan ilan ne oluyor?",
            body: "Satılan ilanın adresi bir anda kaybolursa Google'da ölü bağlantı birikir. Arşivlenmesi veya benzer ilanlara yönlendirilmesi gerekir; bunu düşünmeyen bir yapı zamanla puan kaybettirir.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının sizin adınıza kayıtlı olduğundan emin olun. Bazı ajanslar alan adını kendi hesabına alır; ayrılmak istediğinizde siteniz rehin kalır.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Alıcıların neredeyse tamamı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Veri girişi ne kadar sürüyor?",
            body: "Bir ilanı sisteme girmek on dakika sürüyorsa danışmanlar kullanmaz. Panel demosunu görmeden karar vermeyin.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Real Estate Website & Listing System",
      metaDescription:
        "Website with listing/portfolio management for real estate offices and agents. Map, filtering and mobile-friendly design. Get a free quote.",
      eyebrow: "For Real Estate",
      h1: "Real Estate Website",
      intro:
        "Buyers and renters browse your portfolio on their phones, not in a window. A site that presents listings cleanly, filterable and on a map turns your portfolio into sales. Forpus builds real estate sites with listing management.",
      shortAnswer: {
        title:
          "What does a real estate website include, and what does it cost?",
        body: "A real estate website is an agency's own address, where its portfolio is browsed with filters and on a map. A typical site Forpus builds carries a listing management panel you add properties through yourself, filtering by location, price and type, map display for every listing, direct WhatsApp contact, a fast mobile-first gallery and SEO settings. An office brochure site runs ₺60,000–100,000 and goes live in one to two weeks. A full portfolio site with panel-managed, filterable, mapped listings runs ₺120,000–200,000 and takes three to five weeks. A mobile app your agents file listings from in the field starts at ₺250,000. Existing listings are migrated in bulk rather than re-entered one by one. Sold properties are archived rather than deleted, so they keep working as references and the indexed page does not go to waste.",
      },
      benefits: [
        {
          title: "An organized portfolio",
          body: "Add and update listings easily; every property stands out with a sharp listing page.",
        },
        {
          title: "Filters and map",
          body: "With filtering by location, price and type, visitors find what they want in seconds.",
        },
        {
          title: "Attract the right buyer",
          body: "Optimized for Google and social media so your listings reach more people.",
        },
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
        {
          q: "Can I add listings myself?",
          a: "Yes. With an easy admin panel you add your listings with photos and details yourself.",
        },
        {
          q: "Can it integrate with property portals?",
          a: "Depending on your needs, we can set up connections or sharing flows with external portals.",
        },
        {
          q: "Is the map feature complex?",
          a: "No. Showing listings on a map is a feature we set up as standard.",
        },
      ],
      ctaTitle: "A site that turns your portfolio into sales",
      ctaText:
        "Let's talk through your needs and give you a clear quote for your listing system.",
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
      shortAnswer: {
        title: "E-ticaret sitesi kurmak ne içerir, ne kadar tutar?",
        body: "E-ticaret sitesi kurmak, ürünlerinizi pazaryeri komisyonu ödemeden kendi adresinizde sattığınız bir vitrin ve arka uç kurmak demektir. Forpus'un kurduğu tipik bir e-ticaret sitesinde varyantlı ürün kataloğu, sepet ve güvenli ödeme entegrasyonu, kargo ile fatura akışları, indirim ve kupon sistemi, mobil uyumlu hızlı bir vitrin ve Google Alışveriş'i de kapsayan SEO ayarları bulunur. Hazır bir altyapı üzerine kurulum ₺80.000–140.000 aralığında ve iki ila üç haftada yayına girer; ürün sayınız azsa ve akışınız standartsa genellikle doğru başlangıç budur. Markanıza özel tasarlanmış, kendi akışlarınıza göre kurgulanmış bir e-ticaret sitesi ₺150.000–280.000 aralığında ve dört ila yedi haftada tamamlanır. Özel yazılım, ERP ya da pazaryeri entegrasyonu gerekiyorsa ₺250.000'den başlayan bir projeden söz ediyoruz. Mevcut ürünleriniz toplu aktarımla taşınır. Ödeme altyapısı sizin şirketiniz adına açılır, para doğrudan sizin hesabınıza geçer. Mesafeli satış sözleşmesi, iptal-iade ve gizlilik metinleri teslimle birlikte hazır gelir. Reklam ölçümü kurulmadan yayına alınmaz: hangi ürünün hangi reklamdan satıldığını göremezseniz bütçe kör harcanır.",
      },
      benefitsTitle: "Kendi e-ticaret siteniz markanıza ne kazandırır?",
      benefits: [
        {
          title: "Kendi markanız",
          body: "Pazaryeri komisyonu ve kalabalığı olmadan, tamamen size ait bir satış kanalı.",
        },
        {
          title: "Satışa odaklı tasarım",
          body: "Hızlı yüklenen sayfalar, net ürün akışı ve kolay ödeme ile sepeti terk azalır.",
        },
        {
          title: "Kolay yönetim",
          body: "Ürün, stok ve siparişleri tek panelden yönetin; işiniz büyüdükçe site de büyüsün.",
        },
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
        {
          q: "Hangi ödeme altyapılarını destekliyorsunuz?",
          a: "iyzico, PayTR gibi yaygın Türk ödeme altyapılarını ve sanal POS'ları entegre ederiz.",
        },
        {
          q: "Siparişleri kolayca yönetebilir miyim?",
          a: "Evet. Ürün, stok ve siparişleri tek bir yönetim panelinden rahatça yönetirsiniz.",
        },
        {
          q: "Mevcut ürünlerimi aktarır mısınız?",
          a: "Ürünlerinizi toplu olarak aktarır, kataloğu düzenli bir şekilde kurarız.",
        },
        {
          q: "E-ticaret sitesi kurmak ne kadar tutar?",
          a: "Yaygın bir altyapı üzerine markanıza uyarlanmış bir mağaza ₺80.000 bandında başlar. Tamamen size özel tasarlanmış, kampanya ve varyant yapısı kurgulanmış bir e-ticaret sitesi ₺150.000–280.000 aralığındadır. ERP entegrasyonu, bayi fiyatlandırması veya mobil uygulama işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Hazır altyapı mı özel yazılım mı önerirsiniz?",
          a: "Dürüst yanıt: çoğu marka için hazır altyapı doğru seçimdir. Daha ucuzdur, güvenlik ve ödeme tarafı hazır çalışır, siz de bütçeyi ürün ve reklama ayırırsınız. Özel yazılımı ancak operasyonunuz standart altyapılara sığmadığında öneririz; gerekmediği halde özel yazılım satmak bu sektörün en yaygın kötü alışkanlığıdır.",
        },
        {
          q: "Ödeme ve kargo entegrasyonu dahil mi?",
          a: "Evet, teknik entegrasyon fiyata dahildir. Sanal POS başvurusu ve kargo anlaşması sizin şirketiniz adına yapılır; komisyon oranları doğrudan sizinle banka ve kargo firması arasındadır. Biz süreçte yönlendirir, kurulumu yaparız.",
        },
        {
          q: "Pazaryerinden kendi siteme geçmeli miyim?",
          a: "Geçmek değil, eklemek. Pazaryerleri arama hacmini elinde tutuyor ve orada satmaya devam etmenizi öneririz. Kendi siteniz farklı bir işi görür: müşteri verisi, tekrar satış, komisyonsuz kâr ve reklam trafiğini boşa harcamamak. İkisi birlikte çalıştığında sonuç çok daha iyi olur.",
        },
        {
          q: "Reklam yönetimini de yapıyor musunuz?",
          a: "Evet, ekibimizin ayrı bir uzmanlık alanı. Mağazayı kuran ekiple reklamı yürüten ekibin aynı olması pratikte büyük fark yaratır; dönüşüm düşükse sorunun reklamda mı sitede mi olduğunu tartışmadan çözeriz.",
        },
      ],
      ctaTitle: "Markanıza özel e-ticaret kuralım",
      ctaText:
        "İhtiyacınızı konuşalım, ürün sayınıza ve hedefinize uygun net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Pazaryerinde satmakla kendi sitenizde satmak arasındaki fark",
        body: [
          "Pazaryerleri satışa hızlı başlatır, bu doğru. Ama her satışta komisyon alır, müşterinin kim olduğunu size söylemez ve ürününüzü rakiplerinizin yanında gösterir. Müşteri sizi değil pazaryerini hatırlar.",
          "Kendi sitenizde ise müşteri verisi sizindir. Kim ne aldı, ne zaman tekrar alır, hangi kampanyaya döner; hepsini görürsünüz. Tekrar satış bu veriyle mümkün olur ve tekrar satış e-ticarette kârın asıl geldiği yerdir.",
          "Bir de reklam meselesi var. Meta veya Google reklamı verecekseniz trafiği pazaryerine göndermek, bütçenizin bir kısmını komisyona ve rakip ürün önerilerine harcamak demektir. Kendi sitenize gönderdiğinizde dönüşümü siz kontrol edersiniz.",
        ],
      },
      pricing: {
        title: "E-ticaret sitesi kurma fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Hazır altyapı kurulumu",
            price: "₺80.000 – 140.000",
            timeline: "~2–3 hafta",
            body: "Yaygın bir e-ticaret altyapısı üzerine markanıza uyarlanmış tasarım, ürün girişi, ödeme ve kargo entegrasyonu. Hızlı başlamak isteyen ve ürün sayısı yönetilebilir markalar için en akılcı seçenek.",
          },
          {
            name: "Özel tasarım e-ticaret",
            price: "₺150.000 – 280.000",
            timeline: "~4–7 hafta",
            body: "Markanıza özel arayüz, kategori ve varyant yapısı, kampanya ve kupon sistemi, hız optimizasyonu. Vitrin görünümünün markanın kendisi olduğu işler için.",
          },
          {
            name: "Özel yazılım & entegrasyon",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "ERP veya muhasebe entegrasyonu, bayi ve toptan fiyatlandırma, abonelik satışı, mobil uygulama. Standart altyapıların yetmediği operasyonlar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      caseRef: {
        title: "E-ticarette yaptığımız iş",
        body: "Esen Kuruyemiş için kurduğumuz mağaza, gıda e-ticaretinin kendine özgü sorunlarını çözmek üzerine kuruldu: ağırlık bazlı varyantlar, ürünü iştah açıcı gösteren bir vitrin ve sepete gitmeyi kolaylaştıran sade bir akış. Bu tür işlerde tasarımın görevi ürünü güzel göstermek kadar, satın alma yolundaki her gereksiz adımı kaldırmaktır.",
        projectSlug: "esenkuruyemis",
        linkLabel: "Mağazayı inceleyin",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "E-ticaret projeleri diğerlerinden farklı ilerler; operasyonunuzu anlamadan tasarıma başlamayız.",
        steps: [
          {
            name: "Keşif ve altyapı kararı",
            body: "Ürün sayınızı, varyant yapınızı, kargo ve fatura akışınızı konuşuruz. Buradan çıkan en önemli karar hazır altyapı mı özel yazılım mı olduğudur; bu kararı doğru vermek projenin toplam maliyetini belirler.",
          },
          {
            name: "Ürün ve içerik hazırlığı",
            body: "Ürün verilerini hangi formatta tuttuğunuza bakar, mümkünse toplu aktarım yaparız. Ürün fotoğrafları e-ticarette dönüşümü en çok etkileyen unsur olduğu için çekim ve düzenleme konusunu da burada netleştiririz.",
          },
          {
            name: "Tasarım, entegrasyon, test",
            body: "Vitrin ve ürün sayfası tasarımını onaylarsınız; ardından ödeme ve kargo entegrasyonlarını kurar, gerçek bir sipariş akışıyla baştan sona test ederiz. Test siparişi geçmeden yayına almayız.",
          },
          {
            name: "Yayın ve büyüme",
            body: "Alan adı, güvenlik sertifikası, Search Console ve dönüşüm takibi kurulu halde yayına alırız. Reklam yürütecekseniz piksel ve ölçüm altyapısı ilk günden doğru kurulur.",
          },
        ],
      },
      checklist: {
        title: "E-ticaret sitesi kurarken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Hazır altyapı mı özel yazılım mı?",
            body: "Ürün sayınız ve operasyonunuz standartsa hazır altyapı çok daha ucuz ve güvenlidir; özel yazılım öneren ajansa neden gerektiğini sorun. Tersi de doğru: operasyonunuz özelse hazır altyapıya sıkışmak sonradan çok pahalıya patlar.",
          },
          {
            title: "Ödeme altyapısı kimin adına?",
            body: "Sanal POS başvurusu sizin şirketiniz adına yapılır ve komisyon oranları bankayla sizin aranızdadır. Ajansın kendi hesabı üzerinden tahsilat önermesi ciddi bir uyarı işaretidir.",
          },
          {
            title: "Ürün girişi ne kadar sürüyor?",
            body: "Yüz ürünü elle girmek günler alır. Toplu aktarım imkânı var mı, varyantlı ürün girişi pratik mi? Panel demosunu görmeden karar vermeyin.",
          },
          {
            title: "Site hızı ölçüldü mü?",
            body: "E-ticarette her saniye gecikme dönüşüm kaybıdır. Teklif verenden mevcut bir mağazasının adresini isteyin, kendi telefonunuzdan açın ve sepete kadar gidin.",
          },
          {
            title: "Mesafeli satış metinleri hazır mı?",
            body: "Mesafeli satış sözleşmesi, iade ve teslimat koşulları, KVKK aydınlatma metni yasal zorunluluktur. Bunlar olmadan yayına alınan mağaza sizi riske atar.",
          },
          {
            title: "Reklam ölçümü kurulu mu?",
            body: "Meta ve Google reklamı vereceksek dönüşüm takibi ilk günden doğru kurulmalı. Sonradan eklenen ölçüm, o güne kadarki reklam harcamasını körlemesine yapmış olmanız demektir.",
          },
        ],
      },
    },
    en: {
      metaTitle: "E-Commerce Website Development",
      metaDescription:
        "Custom e-commerce website development: product catalog, cart, payments and shipping integration. Fast, mobile-friendly and sales-focused.",
      eyebrow: "For E-Commerce",
      h1: "E-Commerce Website Development",
      intro:
        "You don't have to be locked into marketplace commissions to sell your products. A fast, sales-focused store under your own brand grows both your margin and customer loyalty. Forpus builds end-to-end e-commerce sites with payment and shipping integration.",
      shortAnswer: {
        title:
          "What does building an e-commerce site involve, and what does it cost?",
        body: "Building an e-commerce site means setting up a storefront and back end where you sell on your own address instead of paying marketplace commission. A typical site Forpus builds carries a product catalogue with variants, cart and secure payment integration, shipping and invoicing flows, a discount and coupon system, a fast mobile-first storefront, and SEO that covers Google Shopping. Setup on an off-the-shelf platform runs ₺80,000–140,000 and goes live in two to three weeks; with a small catalogue and standard flows this is usually the right starting point. A store designed for your brand and built around your own flows runs ₺150,000–280,000 and takes four to seven weeks. Custom software, ERP or marketplace integration starts at ₺250,000. The payment gateway is opened in your company's name and money lands in your account. Distance-selling, refund and privacy texts are delivered ready.",
      },
      benefits: [
        {
          title: "Your own brand",
          body: "A sales channel that's entirely yours, without marketplace commissions and crowds.",
        },
        {
          title: "Sales-focused design",
          body: "Fast pages, a clear product flow and easy checkout reduce cart abandonment.",
        },
        {
          title: "Easy to manage",
          body: "Manage products, stock and orders from one panel; the site scales as you grow.",
        },
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
        {
          q: "Which payment providers do you support?",
          a: "We integrate common providers and virtual POS such as iyzico and PayTR, plus international options on request.",
        },
        {
          q: "Can I manage orders easily?",
          a: "Yes. You manage products, stock and orders comfortably from a single admin panel.",
        },
        {
          q: "Can you migrate my existing products?",
          a: "We bulk-import your products and set up the catalog cleanly.",
        },
      ],
      ctaTitle: "Let's build your branded store",
      ctaText:
        "Let's talk through your needs and give you a clear quote for your catalog and goals.",
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
      shortAnswer: {
        title: "Restoran web sitesi ne içerir, ne kadar tutar?",
        body: "Restoran web sitesi, menünüzü güncel tuttuğunuz, mekânınızı gösterdiğiniz ve rezervasyon aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir restoran sitesinde kendiniz güncelleyebildiğiniz bir QR ve dijital menü, online rezervasyon formu, paket servis platformlarına yönlendirme, mekân ve yemek galerisi, harita ile çalışma saatleri ve mobil uyumlu hızlı bir tasarım bulunur. Dijital menü ve tanıtıma odaklı bir site ₺50.000–80.000 aralığında ve yaklaşık bir haftada yayına girer. Rezervasyon alan, kategorili menüsü panelden yönetilen tam bir site ₺80.000–140.000 aralığında ve iki ila üç haftada tamamlanır. Siparişin doğrudan sizden alındığı, komisyon ödemediğiniz kendi online sipariş sisteminiz işin içine girdiğinde ₺200.000'den başlayan bir projeden söz ediyoruz. Menü fiyatlarını değiştirmek için bize dönmenize gerek kalmaz. Alan adı ve site sizin adınıza kaydedilir. Menü PDF olarak değil gerçek sayfa olarak kurulur; PDF menü telefonda yavaş açılır ve Google içindeki yemek adlarını aramada kullanamaz. Birden fazla şubeniz varsa her şube kendi sayfasını, kendi haritasını ve kendi saatlerini alır. Google İşletme Profili bağlantısı teslimde kurulur.",
      },
      benefitsTitle: "Restoran web sitesi işletmenize ne kazandırır?",
      benefits: [
        {
          title: "İştah açan vitrin",
          body: "Kaliteli görseller ve şık bir tasarımla mekânınızın atmosferini ekrana taşıyın.",
        },
        {
          title: "Dijital menü",
          body: "QR ile güncellenebilir menü; fiyat değişince baskı derdi olmadan anında güncelleyin.",
        },
        {
          title: "Rezervasyon & sipariş",
          body: "Online rezervasyon ve sipariş yönlendirmesiyle telefon trafiğini azaltın.",
        },
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
        {
          q: "Menümü kendim güncelleyebilir miyim?",
          a: "Evet. Dijital menüyü kolayca güncelleyebileceğiniz bir yapı kurarız; fiyat değişimleri anında yansır.",
        },
        {
          q: "Yemeksepeti / Getir'e yönlendirir mi?",
          a: "İsterseniz sipariş butonlarını bu platformlara ya da kendi paket servis akışınıza yönlendiririz.",
        },
        {
          q: "QR menü dahil mi?",
          a: "Evet. Masaya koyabileceğiniz QR ile açılan dijital menüyü birlikte kurarız.",
        },
        {
          q: "Restoran web sitesi ne kadar tutar?",
          a: "Dijital menü ve mekân tanıtımı odaklı bir site ₺50.000 bandında başlar. Online rezervasyon, çok dilli menü ve kampanya bölümü olan bir site ₺80.000–140.000 aralığındadır. Kendi sipariş ve teslimat sisteminiz işin içine girdiğinde ₺200.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "QR menü de yapıyor musunuz?",
          a: "Evet, dijital menü paketin standart parçası. Masalara koyacağınız QR kodları sitenizin menü sayfasına açılır; fiyat değiştiğinde panelden güncellersiniz, basılı menüyü yeniden bastırmanız gerekmez. QR görsellerini baskıya hazır şekilde teslim ederiz.",
        },
        {
          q: "Yemek sepeti gibi platformlardan çıkmalı mıyım?",
          a: "Hayır, çıkmanızı önermeyiz. O platformlar sizi hiç tanımayan müşteriye ulaştırıyor ve bu değerli. Kendi sipariş sisteminiz farklı bir işi görür: düzenli müşteriniz komisyonsuz sipariş verir, müşteri verisi sizde kalır. Pratikte en iyi sonuç ikisini birlikte yürütmekten çıkıyor.",
        },
        {
          q: "Birden fazla şubem var, nasıl gösteriyoruz?",
          a: "Her şube için ayrı bir sayfa kurarız: kendi adresi, çalışma saatleri, haritası ve rezervasyon yönlendirmesi. Bu hem misafirin doğru şubeyi bulmasını sağlar hem de şubenin bulunduğu semtte yapılan aramalarda görünmenize yardımcı olur.",
        },
        {
          q: "Menü çok dilli olabilir mi?",
          a: "Evet. Turistik bölgedeki işletmeler için İngilizce menü standart olarak öneriliyor; ihtiyaca göre başka diller de eklenebilir. Menü yapısı bir kez kurulduktan sonra dil eklemek kolaydır.",
        },
      ],
      ctaTitle: "Masalarınızı dolduran bir site",
      ctaText:
        "Mekânınıza uygun bir site için kısa bir görüşme yapalım, net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Misafir mekâna gelmeden önce nereye bakıyor?",
        body: [
          "Bir yere gitmeden önce insanlar iki şeye bakar: fotoğraflar ve menü. Bu ikisini bulamazlarsa listeden çıkarırlar. Karar çoğu zaman mekâna hiç gelmeden, telefonda verilir.",
          "Sosyal medya bu işi kısmen görür ama menü paylaşımı akışta kaybolur, fiyat güncellendiğinde eski gönderi ortada kalır. Google'da işletmenizi arayan kişi de sosyal medyaya değil, bir siteye bakmayı bekler.",
          "En çok kaybettiren nokta ise rezervasyon. Misafir karar verdiği anda ne yapacağını bilmiyorsa, telefon etmek yerine bir sonraki mekâna geçer. Rezervasyon veya paket servis yönlendirmesinin ilk ekranda olması bu yüzden önemlidir.",
        ],
      },
      pricing: {
        title: "Restoran web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Dijital menü & tanıtım",
            price: "₺50.000 – 80.000",
            timeline: "~1 hafta",
            body: "Mekân tanıtımı, iştah açan galeri, QR ile açılan dijital menü, harita ve çalışma saatleri. Menüyü kendiniz güncellersiniz. Kafeler ve tek şubeli işletmeler için yeterli.",
          },
          {
            name: "Rezervasyonlu site",
            price: "₺80.000 – 140.000",
            timeline: "~2–3 hafta",
            body: "Online rezervasyon formu, masa ve saat yönetimi, çok dilli menü, kampanya bölümü. Rezervasyonla çalışan restoranlar için doğru başlangıç.",
          },
          {
            name: "Online sipariş sistemi",
            price: "₺200.000'den başlayan",
            timeline: "Projeye özel",
            body: "Kendi sipariş altyapınız: sepet, ödeme, teslimat bölgesi ve mutfak paneli. Paket servis hacmi platform komisyonlarını sorun haline getirdiyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Servis düzeninizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Konseptinizi, misafir profilinizi ve sitenin asıl işini konuşuruz. Rezervasyon mu alacak, paket servis mi yönlendirecek, sadece menü mü gösterecek? Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Menü ve görsel hazırlığı",
            body: "Menüyü dijital formata çeviririz. Yemek fotoğrafları bu işte en belirleyici unsur olduğu için mevcut görsellerinizi değerlendirir, gerekiyorsa çekim önerisinde bulunuruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Bu alanda tasarımın işi mekânın atmosferini ekrana taşımaktır. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Menüyü kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Restoran web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Menüyü kendiniz güncelleyebilecek misiniz?",
            body: "Fiyatlar sık değişiyor. Her güncelleme için ajansa haber vermek zorundaysanız menü bir ay içinde yanlış hale gelir. Bu, restoran sitelerinde en sık gördüğümüz sorun.",
          },
          {
            title: "Menü PDF mi, gerçek sayfa mı?",
            body: "PDF menü telefonda okunmaz, yakınlaştırma gerektirir ve Google içeriğini göremez. Menünün sitenin kendi sayfası olarak kurulması hem misafir hem arama görünürlüğü için gerekli.",
          },
          {
            title: "Fotoğraflar iştah açıyor mu?",
            body: "Bu sektörde site fotoğraf kadar iyidir. Kötü ışıkta çekilmiş yemek fotoğrafları, iyi bir tasarımın etkisini tamamen siler. Görsel bütçesini baştan ayırın.",
          },
          {
            title: "Google İşletme Profili bağlı mı?",
            body: "Restoran aramalarının çoğu haritadan geliyor. Site ile İşletme Profilinin bağlantılı olması, çalışma saatleri ve menü bilgisinin haritada da görünmesi gerekir.",
          },
          {
            title: "Rezervasyona kaç tıkla gidiliyor?",
            body: "Misafir karar verdiği anda eylem ilk ekranda görünmeli. Görünmüyorsa site güzel olsa bile masayı doldurmaz.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının işletmeniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Restaurant & Cafe Website Design",
      metaDescription:
        "Website for restaurants and cafes with digital menu, reservations and online ordering. Appetizing, mobile-friendly design. Get a free quote.",
      eyebrow: "For Restaurants",
      h1: "Restaurant Website Design",
      intro:
        "Guests check your menu and space on their phones before they arrive. Appetizing photos, an up-to-date digital menu and easy reservations fill your tables. Forpus builds sites for restaurants and cafes.",
      shortAnswer: {
        title: "What does a restaurant website include, and what does it cost?",
        body: "A restaurant website is your own address for keeping the menu current, showing the room and taking reservations. A typical site Forpus builds carries a QR and digital menu you update yourself, an online reservation form, routing to delivery platforms, a room and food gallery, a map with opening hours, and a fast mobile-first design. A site focused on the digital menu and introduction runs ₺50,000–80,000 and goes live in about a week. A full site that takes reservations and manages a categorised menu from a panel runs ₺80,000–140,000 and takes two to three weeks. Your own online ordering system, where orders come straight to you with no commission, starts at ₺200,000. The menu is built as real pages rather than a PDF: a PDF opens slowly on a phone and Google cannot use the dish names inside it.",
      },
      benefits: [
        {
          title: "An appetizing storefront",
          body: "Bring your atmosphere to the screen with quality photos and a sharp design.",
        },
        {
          title: "Digital menu",
          body: "A QR-updatable menu; when prices change, update instantly with no reprinting.",
        },
        {
          title: "Reservations & orders",
          body: "Cut phone traffic with online reservations and order redirects.",
        },
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
        {
          q: "Can I update the menu myself?",
          a: "Yes. We build a structure where you update the digital menu easily; price changes reflect instantly.",
        },
        {
          q: "Can it link to delivery apps?",
          a: "If you'd like, we point order buttons to those platforms or your own delivery flow.",
        },
        {
          q: "Is a QR menu included?",
          a: "Yes. We set up a digital menu that opens via a QR code you can place on tables.",
        },
      ],
      ctaTitle: "A site that fills your tables",
      ctaText:
        "Let's have a short call about a site that fits your venue and give you a clear quote.",
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
      shortAnswer: {
        title: "Kişisel marka web sitesi ne içerir, ne kadar tutar?",
        body: "Kişisel marka web sitesi, danışman, eğitmen, koç ya da içerik üreticisinin işini algoritmaya bağlı olmayan kendi adresine taşımasıdır. Forpus'un kurduğu tipik bir kişisel marka sitesinde hakkımda ve portfolyo bölümü, hizmet ile paket sayfaları, blog veya içerik altyapısı, bülten ve e-posta listesi toplama, sosyal medya entegrasyonu ve kişiye özel mobil uyumlu bir tasarım bulunur. Tek sayfalık bir kişisel site ₺50.000–80.000 aralığında ve yaklaşık bir haftada yayına girer. Hizmetlerin ayrı ayrı sayfalandığı, içerik üretimine hazır bir marka sitesi ₺80.000–130.000 aralığında ve iki ila üç haftada tamamlanır. Üyelik ya da kurs satışı işin içine girdiğinde ₺180.000'den başlayan bir projeden söz ediyoruz. En kritik parça bülten listesi: takipçi platformun, e-posta listesi sizindir. Alan adı kendi adınıza kaydedilir ve size ait olur; ajansın hesabında duran bir alan adı, ilişki bittiği gün sorun olur. İçerikleri teslimden sonra kendiniz eklersiniz. Blog yazmak zorunlu değil: yazmayacaksanız o bölüm hiç kurulmaz, sayfa boş bir bekleme alanıyla kalmaz.",
      },
      benefitsTitle: "Kişisel marka siteniz size ne kazandırır?",
      benefits: [
        {
          title: "Sahibi siz olun",
          body: "Takipçinizi platformdan bağımsız, kendi alan adınızda buluşturun; kontrol sizde olsun.",
        },
        {
          title: "Profesyonel algı",
          body: "Kişisel bir site, sizi amatörden ayırır ve işbirliği/danışan tekliflerini artırır.",
        },
        {
          title: "Hepsi tek yerde",
          body: "Portfolyo, hizmet, blog ve iletişim; tüm dijital varlığınız tek adreste toplansın.",
        },
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
        {
          q: "Tek sayfa mı olmalı, çok sayfa mı?",
          a: "İşinize göre öneririz: hızlı bir başlangıç için tek sayfa, büyüyen içerik için çok sayfalı yapı.",
        },
        {
          q: "Bülten / e-posta listesi kurar mısınız?",
          a: "Evet. Ziyaretçileri e-posta listenize dönüştüren formlar ve entegrasyonları kurarız.",
        },
        {
          q: "Kendi içeriğimi ekleyebilir miyim?",
          a: "Yönetilebilir bir altyapıyla yazı ve projelerinizi kolayca kendiniz eklersiniz.",
        },
        {
          q: "Kişisel marka web sitesi ne kadar tutar?",
          a: "Tek sayfalık, sizi anlatan güçlü bir site ₺50.000 bandında başlar. Hizmetlerin ayrı sayfalandığı, blog ve bülten altyapılı bir marka sitesi ₺80.000–130.000 aralığındadır. Kurs veya üyelik satışı işin içine girdiğinde ₺180.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Sosyal medyam varken siteye gerek var mı?",
          a: "Sosyal medya sizi tanıtır, site sizi ciddiye aldırır ve size ait olan tek yerdir. Hesabınız kapansa, erişiminiz düşse veya platform kurallarını değiştirse siteniz yerinde durur. Kurumsal bir iş görüşmesinde de karşınızdakinin baktığı yer sosyal medya değil, adınıza kayıtlı bir adrestir.",
        },
        {
          q: "Kurs satmak istersem altyapı kuruyor musunuz?",
          a: "Evet. Basit bir kurs için hazır platformlara yönlendirmek çoğu zaman daha akıllıcadır; kendi üyelik sisteminizi kurmak ancak içerik hacminiz ve öğrenci sayınız arttığında mantıklı olur. Hangisinin size uygun olduğunu ilk görüşmede netleştiriyoruz.",
        },
        {
          q: "Blog yazmak zorunda mıyım?",
          a: "Hayır. Blog, arama motorlarından düzenli ziyaretçi getirmenin en etkili yolu; ama düzenli yazamayacaksanız boş bir blog bölümü sitenin terk edilmiş görünmesine yol açar, olmaması daha iyidir. Altyapıyı kurar, kullanıp kullanmamayı size bırakırız.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurarız; eski adresleri yenilerine yönlendiririz.",
        },
      ],
      ctaTitle: "Sizi anlatan bir site kuralım",
      ctaText:
        "Kişisel markanız için kısa bir görüşme yapalım, size uygun net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Sosyal medya hesabınız gerçekten sizin mi?",
        body: [
          "Takipçi sayınız ne olursa olsun o hesap size ait değil. Erişiminiz algoritmanın kararıyla bir gecede yarıya düşebilir, hesabınız bir şikâyetle kapanabilir. Yıllarca kurduğunuz şeyin tamamı başkasının platformunda duruyor.",
          "İkinci sorun ciddiye alınmak. Bir kurum sizinle çalışmayı değerlendirirken sadece bir sosyal medya profili görüyorsa, ne kadar iyi olursanız olun bir hobi izlenimi kalır. Kendi adınıza bir site, o algıyı tek başına değiştirir.",
          "Üçüncüsü ise dağınıklık. Çalışmalarınız, hizmetleriniz, konuşmalarınız, iletişim bilgileriniz farklı platformlara dağılmış durumda. Bunları tek adreste toplamak, sizinle çalışmak isteyen kişinin işini kolaylaştırır.",
        ],
      },
      pricing: {
        title: "Kişisel marka web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kişisel site",
            price: "₺50.000 – 80.000",
            timeline: "~1 hafta",
            body: "Tek sayfalık, sizi anlatan güçlü bir dijital varlık. Hakkımda, ne yaptığınız, öne çıkan işler ve iletişim. Adınızı Google'da temiz bir sayfayla karşılamak için yeterli.",
          },
          {
            name: "Marka sitesi",
            price: "₺80.000 – 130.000",
            timeline: "~2–3 hafta",
            body: "Hizmet ve paketlerin ayrı sayfalandığı, blog veya içerik altyapılı, bülten toplama ve randevu yönlendirmeli yapı. Danışmanlık veya eğitim satanlar için doğru başlangıç.",
          },
          {
            name: "Üyelik & kurs platformu",
            price: "₺180.000'den başlayan",
            timeline: "Projeye özel",
            body: "Kurs satışı, üyelik girişi, video içerik ve ödeme sistemi. İçeriğinizi doğrudan satmaya geçtiğinizde.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Programınızı aksatmayan bir düzen kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Konumlandırma görüşmesi",
            body: "Bu projede en kritik adım budur. Kimsiniz, kime hitap ediyorsunuz ve sizden ne isteniyor? Sitenin başarısı tasarımdan çok bu sorulara verdiğiniz yanıtın netliğine bağlı.",
          },
          {
            name: "İçerik ve görsel",
            body: "Hakkımda metni, hizmet açıklamaları ve öne çıkan işler için şablon gönderiyoruz. Kişisel markada portre fotoğrafı belirleyici olduğu için mevcut görsellerinizi değerlendirir, gerekiyorsa çekim önerisinde bulunuruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Buradaki hedef sizin gibi görünmesi; şablon hissi veren hiçbir şey bırakmayız. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Search Console bağlantısı dahil yayına alırız. İçerik ekleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Kişisel marka sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Alan adı kendi adınız mı?",
            body: "Mümkünse adsoyad.com alın; yıllar içinde en değerli dijital varlığınız o olacak. Alan adının sizin adınıza kayıtlı olduğundan da emin olun.",
          },
          {
            title: "Site sizin gibi mi görünüyor?",
            body: "Kişisel markada şablon hissi en büyük kayıptır. Ziyaretçi sitenizde sizi hissetmiyorsa site amacını görmez. Farkı baştan sorun.",
          },
          {
            title: "İçeriği kendiniz ekleyebilecek misiniz?",
            body: "Yazı, konuşma veya iş ekleyeceksiniz. Her seferinde ajansa bağımlı kalmak siteyi zamanla ölü bir kartvizite çevirir.",
          },
          {
            title: "E-posta listesi toplanıyor mu?",
            body: "Takipçi platformun, e-posta listesi sizin. Site kuruluyorsa bülten toplama en baştan düşünülmeli; sonradan eklemek çok daha zahmetli olur.",
          },
          {
            title: "Sosyal medya siteye bağlanıyor mu?",
            body: "Biyografideki tek link sitede doğru yere düşmeli. Bu bağlantı kopuksa sosyal medyadaki emeğin karşılığını alamazsınız.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Ziyaretçilerin çoğu telefondan geliyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Personal Brand & Portfolio Website",
      metaDescription:
        "Personal brand website for consultants, coaches, creators and professionals. Portfolio, services and contact-focused design. Get a quote.",
      eyebrow: "For Personal Brands",
      h1: "Personal Brand Website",
      intro:
        "Your social account isn't yours; it's the algorithm's. A website under your own name moves your work and reputation somewhere permanent. Consultant, coach, educator or creator — Forpus builds sites that tell your story.",
      shortAnswer: {
        title:
          "What does a personal brand website include, and what does it cost?",
        body: "A personal brand website moves a consultant's, coach's, trainer's or creator's work onto an address that does not depend on an algorithm. A typical site Forpus builds carries an about and portfolio section, service and package pages, a blog or content system, newsletter and email-list capture, social media integration, and a mobile-first design made for you rather than picked from a shelf. A single-page personal site runs ₺50,000–80,000 and goes live in about a week. A brand site with each service on its own page and ready for regular publishing runs ₺80,000–130,000 and takes two to three weeks. Membership or course selling starts at ₺180,000. The domain is registered in your own name — a domain sitting in an agency's account becomes a problem the day the relationship ends. The email list is the piece that matters most: followers belong to the platform, the list belongs to you.",
      },
      benefits: [
        {
          title: "You own it",
          body: "Meet your audience on your own domain, independent of any platform; you stay in control.",
        },
        {
          title: "Professional perception",
          body: "A personal site sets you apart from amateurs and increases collaboration and client offers.",
        },
        {
          title: "All in one place",
          body: "Portfolio, services, blog and contact — your whole digital presence at one address.",
        },
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
        {
          q: "Should it be one page or many?",
          a: "We advise based on your work: a single page for a quick start, a multi-page structure for growing content.",
        },
        {
          q: "Can you set up a newsletter?",
          a: "Yes. We build forms and integrations that turn visitors into email subscribers.",
        },
        {
          q: "Can I add my own content?",
          a: "With an editable foundation, you add posts and projects yourself easily.",
        },
      ],
      ctaTitle: "Let's build a site that tells your story",
      ctaText:
        "Let's have a short call about your personal brand and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "kuafor",
    image: "/generated/personas/kuafor.webp",
    service: "web",
    slug: { tr: "kuafor-web-sitesi", en: "hair-salon-website" },
    tr: {
      metaTitle: "Kuaför & Berber Web Sitesi",
      metaDescription:
        "Kuaför, berber ve güzellik salonlarına özel web sitesi ve online randevu. Mobil uyumlu, Google'da bulunan bir dijital vitrin. Ücretsiz teklif alın.",
      eyebrow: "Kuaföre Özel",
      h1: "Kuaför & Berber Web Sitesi",
      intro:
        "Müşteriniz yeni bir kuaför ararken telefonuna bakıyor: yorumlar, fotoğraflar ve 'randevu al'. Şık bir vitrin ve tek tıkla online randevu, koltuklarınızı boş bırakmaz. Forpus kuaför, berber ve güzellik salonlarına özel siteler tasarlıyor.",
      shortAnswer: {
        title: "Kuaför web sitesi ne içerir, ne kadar tutar?",
        body: "Kuaför ve berber web sitesi, salonunuzu gösterdiğiniz, fiyat listenizi yayınladığınız ve tek tıkla randevu aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir salon sitesinde online randevu ile WhatsApp entegrasyonu, kendiniz güncelleyebildiğiniz hizmet ve fiyat listesi, model ile mekân galerisi, stilist tanıtımları, Google harita bağlantısı ve çalışma saatleri, mobil uyumlu hızlı bir tasarım bulunur. Salon tanıtımına odaklı bir site ₺50.000–80.000 aralığında ve yaklaşık bir haftada yayına girer. Randevunun siteden alındığı, hizmetlerin ayrı ayrı listelendiği tam bir site ₺80.000–130.000 aralığında ve iki ila üç haftada tamamlanır. Salon takvimine bağlı bir randevu sistemi ve mobil uygulama işin içine girdiğinde ₺180.000'den başlayan bir projeden söz ediyoruz. Instagram'ınız kalır; site aramadan gelen müşteriyi karşılar. Alan adı ve site sizin adınıza kaydedilir, fiyat listesini panelden kendiniz güncellersiniz. Galeriye stok fotoğraf konmaz, kendi işleriniz kullanılır; müşteri geldiğinde gördüğüyle karşılaştığının aynı olmasını ister. Google İşletme Profili bağlantısı teslimde kurulur — salon aramalarının çoğu haritadan geliyor.",
      },
      benefitsTitle: "Kuaför web sitesi salonunuza ne kazandırır?",
      benefits: [
        {
          title: "Online randevu",
          body: "Müşteri istediği saati telefondan seçsin; siz çalışırken takviminiz kendiliğinden dolsun.",
        },
        {
          title: "Şık vitrin",
          body: "Model ve mekan fotoğraflarınızla tarzınızı gösterin, ilk izlenimi kazanın.",
        },
        {
          title: "Google'da bulunun",
          body: "'Yakınımdaki kuaför' aramalarında öne çıkacak yapı; harita ve yorumlarla.",
        },
      ],
      featuresTitle: "Kuaför sitenizde neler olur?",
      features: [
        "Online randevu / WhatsApp entegrasyonu",
        "Hizmet ve fiyat listesi",
        "Model & mekan galerisi",
        "Ekip / stilist tanıtımı",
        "Google harita ve çalışma saatleri",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Online randevu sistemi kurar mısınız?",
          a: "Evet. Basit WhatsApp yönlendirmesinden saat seçmeli online takvime kadar ihtiyacınıza göre kurarız.",
        },
        {
          q: "Instagram'ımla bağlanır mı?",
          a: "Instagram akışınızı siteye entegre eder, takipçiyi randevuya çevirmenize yardımcı oluruz.",
        },
        {
          q: "Fiyat listesini kendim güncelleyebilir miyim?",
          a: "Evet. Hizmet ve fiyatları kolayca güncelleyebileceğiniz bir yapı kurarız.",
        },
        {
          q: "Kuaför web sitesi ne kadar tutar?",
          a: "Hizmet listesi, galeri ve WhatsApp yönlendirmeli bir tanıtım sitesi ₺50.000 bandında başlar. Online randevu formu ve stilist yönlendirmeli bir site ₺80.000–130.000 aralığındadır. Takvimli randevu yönetimi ve mobil uygulama işin içine girdiğinde ₺180.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Instagram'ım var, siteye gerek var mı?",
          a: "Instagram işinizi gösterir ama üç şeyi yapamaz: haritada çıkmak, fiyat listesini düzenli tutmak ve tek tıkla randevuya götürmek. Yeni müşterinin sizi bulduğu yer çoğunlukla Google Haritalar oluyor ve orada güçlü görünmek için bir siteye ihtiyacınız var. İkisi birlikte çalışır.",
        },
        {
          q: "Google Haritalar'da öne çıkmama yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. Google İşletme Profilinizi kurar veya düzenler, kategori ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Online randevu sistemi gerçekten gerekli mi?",
          a: "Salonunuz WhatsApp'la rahat yönetiliyorsa gerekmez, dürüst yanıt budur. Ancak günde onlarca mesajı elle yönetmek vakit alıyorsa ve unutulan randevular yüzünden boş koltuk kalıyorsa, takvimli sistem kendini kısa sürede amorti eder.",
        },
        {
          q: "Birden fazla şubem var, nasıl gösteriyoruz?",
          a: "Her şube için ayrı bir sayfa kurarız: kendi adresi, ekibi, çalışma saatleri ve randevu yönlendirmesi. Bu, şubenin bulunduğu semtte yapılan aramalarda görünmenize de yardımcı olur.",
        },
      ],
      ctaTitle: "Salonunuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Yeni müşteri salonunuzu nasıl buluyor?",
        body: [
          "Semtinde yeni bir kuaför arayan kişi telefonunu açıp haritaya bakar. Karşısına çıkan salonlardan fotoğrafı iyi olanı, yorumu iyi olanı ve randevu alması kolay olanı seçer. Bu üçü bir aradaysa arar; değilse listeye devam eder.",
          "Sosyal medya bu işi kısmen görür ama orada fiyat listesi bulunmaz, çalışma saatleri görünmez ve randevu almak mesaj yazmayı gerektirir. Mesaj yazmak, tıklamaktan her zaman daha zordur.",
          "En çok kayıp yaşanan an ise randevu anıdır. Müşteri karar verdiği anda tek tıkla WhatsApp'a veya randevu formuna gidemiyorsa, o an geçer. Salonlar için sitenin asıl işi budur: kararı harekete çevirmek.",
        ],
      },
      pricing: {
        title: "Kuaför web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Salon tanıtım sitesi",
            price: "₺50.000 – 80.000",
            timeline: "~1 hafta",
            body: "Şık bir vitrin: hizmet ve fiyat listesi, galeri, ekip, harita, çalışma saatleri ve tek tık WhatsApp. Tek şubeli salonlar için yeterli.",
          },
          {
            name: "Randevulu site",
            price: "₺80.000 – 130.000",
            timeline: "~2–3 hafta",
            body: "Online randevu formu, stilist bazlı yönlendirme, kampanya bölümü ve daha geniş galeri. Randevuyla çalışan, yoğun salonlar için.",
          },
          {
            name: "Randevu sistemi & mobil",
            price: "₺180.000'den başlayan",
            timeline: "Projeye özel",
            body: "Takvimli randevu yönetimi, otomatik hatırlatma, müşteri kaydı ve mobil uygulama. Çok koltuklu, birden fazla stilistin çalıştığı salonlar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Salon düzeninizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Salonunuzun konumlandırmasını ve müşteri profilinizi konuşuruz. Semt kuaförüyle butik bir saç tasarım stüdyosunun sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Görsel ve içerik",
            body: "Hizmet ve fiyat listesini alırız. Bu işte galeri belirleyici olduğu için mevcut çalışma fotoğraflarınızı değerlendirir, gerekiyorsa çekim önerisinde bulunuruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi salonun havasını ekrana taşımak. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Fiyat listesini güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Kuaför web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Google İşletme Profili kurulu mu?",
            body: "Kuaför aramalarının büyük kısmı haritadan geliyor. İşletme Profili olmadan sadece site kurmak, bu sektörde eksik bir iştir. Teklife dahil mi, sorun.",
          },
          {
            title: "Fiyat listesini kendiniz güncelleyebiliyor musunuz?",
            body: "Fiyatlar sık değişir. Her güncelleme için ajansa haber vermek zorundaysanız liste kısa sürede yanlış hale gelir ve müşteriyle sorun yaşarsınız.",
          },
          {
            title: "Galeri gerçek işleriniz mi?",
            body: "Stok fotoğraf kullanılan salon siteleri anında belli oluyor ve güven kaybettiriyor. Kendi çalışmalarınızın fotoğraflanması bu işin en değerli yatırımıdır.",
          },
          {
            title: "WhatsApp tek tıkla açılıyor mu?",
            body: "Türkiye'de bu sektörde randevunun büyük kısmı WhatsApp'tan alınıyor. Numaranın yazılı olması yetmez; tıklanınca doğrudan sohbeti açması gerekir.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Müşterilerin neredeyse tamamı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının salonunuz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Hair Salon & Barber Website",
      metaDescription:
        "Website design and online booking for hair salons, barbers and beauty studios. A mobile-friendly storefront that ranks on Google. Get a free quote.",
      eyebrow: "For Hair Salons",
      h1: "Hair Salon & Barber Website",
      intro:
        "People check their phone when looking for a new salon: reviews, photos and 'book now'. A sharp storefront and one-tap online booking keep your chairs full. Forpus builds sites for hair salons, barbers and beauty studios.",
      shortAnswer: {
        title: "What does a hair salon website include, and what does it cost?",
        body: "A hair salon or barbershop website is your own address for showing the space, publishing your price list and taking bookings in one tap. A typical salon site Forpus builds carries online booking and WhatsApp integration, a service and price list you update yourself, a gallery of work and the room, stylist profiles, a Google Maps link with opening hours, and a fast mobile-first design. A site focused on introducing the salon runs ₺50,000–80,000 and goes live in about a week. A full site that takes bookings and lists every service runs ₺80,000–130,000 and takes two to three weeks. A booking system tied to the salon calendar, plus a mobile app, starts at ₺180,000. No stock photography goes in the gallery — your own work is used, because a customer wants what they walk into to match what they saw.",
      },
      benefits: [
        {
          title: "Online booking",
          body: "Let clients pick a time from their phone; your calendar fills while you work.",
        },
        {
          title: "A sharp storefront",
          body: "Show your style with model and venue photos and win the first impression.",
        },
        {
          title: "Get found on Google",
          body: "A structure built to rank for 'hair salon near me', with map and reviews.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Online booking / WhatsApp integration",
        "Service and price list",
        "Model & venue gallery",
        "Team / stylist profiles",
        "Google map and opening hours",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you set up online booking?",
          a: "Yes. From a simple WhatsApp redirect to a time-slot booking calendar, we tailor it to you.",
        },
        {
          q: "Does it connect to Instagram?",
          a: "We integrate your Instagram feed and help you turn followers into bookings.",
        },
        {
          q: "Can I update the price list myself?",
          a: "Yes. We build a structure where you update services and prices easily.",
        },
      ],
      ctaTitle: "Let's build a site for your salon",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "guzellik",
    image: "/generated/personas/guzellik.webp",
    service: "web",
    slug: { tr: "guzellik-merkezi-web-sitesi", en: "beauty-clinic-website" },
    tr: {
      metaTitle: "Güzellik & Estetik Merkezi Web Sitesi",
      metaDescription:
        "Güzellik salonu, cilt bakımı ve lazer merkezlerine özel web sitesi. Online randevu, öncesi-sonrası galerisi ve Google görünürlüğü. Ücretsiz teklif alın.",
      eyebrow: "Güzellik Merkezine Özel",
      h1: "Güzellik & Estetik Merkezi Web Sitesi",
      intro:
        "Estetik ve bakım hizmetlerinde güven her şeydir. Sonuçlarınızı gösteren şık bir site ve kolay randevu, tereddüt eden müşteriyi karar aşamasına taşır. Forpus güzellik, cilt bakımı ve lazer merkezlerine özel siteler tasarlıyor.",
      shortAnswer: {
        title: "Güzellik merkezi web sitesi ne içerir, ne kadar tutar?",
        body: "Güzellik ve estetik merkezi web sitesi, hizmetlerinizi anlattığınız, sonuçlarınızı gösterdiğiniz ve randevu aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir merkez sitesinde hizmet ve paket sayfaları, izne bağlı bir öncesi-sonrası galerisi, online randevu ile WhatsApp yönlendirmesi, kampanya bölümü, Google harita ve yorum bağlantıları, mobil uyumlu hızlı bir tasarım bulunur. Tanıtıma odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Her hizmetin ayrı sayfalandığı, arama motorlarına hazırlanmış tam bir merkez sitesi ₺90.000–160.000 aralığında ve iki ila dört haftada tamamlanır. Randevu sistemi ve mobil uygulama işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Tıbbi işlem sunuyorsanız öncesi-sonrası görselleri yazılı rıza ve sağlıkta tanıtım mevzuatı çerçevesinde kurgulanır. Site ve alan adı mülkiyeti sizde kalır, kampanya ve içerikleri panelden kendiniz güncellersiniz. Her işlem için ayrı sayfa açılır: lazer epilasyon arayan biriyle cilt bakımı arayan biri aynı sayfaya inmemeli. Google İşletme Profili bağlantısı teslimde kurulur; merkez aramalarının çoğu haritadan geliyor.",
      },
      benefitsTitle: "Güzellik merkezi web sitesi işletmenize ne kazandırır?",
      benefits: [
        {
          title: "Sonuç odaklı vitrin",
          body: "Öncesi-sonrası galerisiyle işinizin kalitesini kanıtlayın, güven oluşturun.",
        },
        {
          title: "Online randevu",
          body: "Hizmet ve saati müşteri kendi seçsin; telefon trafiği azalsın, takvim dolsun.",
        },
        {
          title: "Prestijli tasarım",
          body: "Markanıza yakışan şık ve modern bir görünümle rakiplerinizden ayrışın.",
        },
      ],
      featuresTitle: "Güzellik merkezi sitenizde neler olur?",
      features: [
        "Hizmet ve paket sayfaları",
        "Öncesi-sonrası galerisi",
        "Online randevu / WhatsApp",
        "Kampanya ve fiyat bölümü",
        "Google harita ve yorumlar",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Öncesi-sonrası fotoğrafı ekler misiniz?",
          a: "Evet. İzin ve gizliliğe dikkat ederek sonuçlarınızı gösteren şık bir galeri kurarız.",
        },
        {
          q: "Kampanyaları kendim güncelleyebilir miyim?",
          a: "Evet. Kampanya ve fiyatları kolayca güncelleyebileceğiniz bir yapı kurarız.",
        },
        {
          q: "Online randevu alır mı?",
          a: "Hizmet ve saat seçmeli online randevuyu ya da WhatsApp yönlendirmesini kurarız.",
        },
        {
          q: "Güzellik merkezi web sitesi ne kadar tutar?",
          a: "Hizmet listesi ve galeri odaklı bir tanıtım sitesi ₺50.000 bandında başlar. Her işlemin ayrı sayfalandığı, online randevu ve kampanya bölümlü bir merkez sitesi ₺90.000–160.000 aralığındadır. Takvimli randevu, seans takibi ve mobil uygulama işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Öncesi-sonrası fotoğrafı koyabilir miyim?",
          a: "Müşteriden yazılı açık rıza almanız şart. Ayrıca yaptığınız işlem sağlık hizmeti kapsamındaysa tanıtım mevzuatının sınırları geçerli olur ve bu görsellerin kullanımı daha da kısıtlıdır. Galeriyi bu çerçeveye uygun kurgularız; hangi işlemlerinizin bu kapsama girdiğini mevzuat danışmanınızla teyitleşmenizi öneririz.",
        },
        {
          q: "Kampanya ve indirim duyurusu yapabilir miyim?",
          a: "Kozmetik bakım hizmetlerinde genellikle mümkün, medikal estetik kapsamındaki işlemlerde ise ciddi sınırlar var. İkisini aynı sitede sunuyorsanız ayrımı doğru kurmak gerekir; bunu birlikte netleştiriyoruz.",
        },
        {
          q: "Online randevu sistemi gerekli mi?",
          a: "Seans bazlı çalışıyorsanız ve paket satıyorsanız çok işe yarar; müşterinin kaç seansı kaldığını takip etmek elle zordur. Tek kabinli, WhatsApp'la rahat yönetilen bir merkezseniz gereksiz maliyettir.",
        },
        {
          q: "Google Haritalar'da öne çıkmama yardım eder misiniz?",
          a: "Evet. İşletme Profilinizi kurar veya düzenler, kategori ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama adımını adres sizin olduğu için sizin tamamlamanız gerekir.",
        },
      ],
      ctaTitle: "Merkeziniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Tereddüt eden müşteri neye bakarak karar veriyor?",
        body: [
          "Estetik ve bakım hizmetlerinde karar hızlı verilmez. Kişi haftalarca araştırır, fotoğraflara bakar, fiyat sorar ve en çok da şunu merak eder: bu işlem güvenli mi, sonuç nasıl olur, kim uyguluyor.",
          "Bu soruların yanıtı sitede yoksa müşteri sosyal medyadaki yorumlara ve tanıdık tavsiyesine kalır. Orada anlatabileceğiniz şey sınırlıdır; hangi cihazı kullandığınız, uygulayıcının eğitimi, işlem sonrası bakım gibi güven kuran detaylar kaybolur.",
          "Bu alanda tasarımın işi de farklıdır: merkez ne kadar prestijli görünürse, aynı hizmet o kadar değerli algılanır. Ucuz görünen bir site, fiyatınızı da ucuz gösterir.",
        ],
      },
      pricing: {
        title: "Güzellik merkezi web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Şık bir vitrin: hizmet listesi, galeri, ekip, harita ve tek tık WhatsApp. Tek şubeli salon ve bakım merkezleri için yeterli.",
          },
          {
            name: "Merkez sitesi",
            price: "₺90.000 – 160.000",
            timeline: "~2–4 hafta",
            body: "Her işlemin ayrı sayfalandığı, öncesi-sonrası galerili, online randevu ve kampanya bölümlü prestijli yapı. Lazer ve cilt bakımı gibi işlem çeşidi fazla olan merkezler için.",
          },
          {
            name: "Randevu sistemi & mobil",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "Takvimli randevu, seans takibi, müşteri kaydı, paket kullanım yönetimi ve mobil uygulama. Çok kabinli, seans bazlı çalışan merkezler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      caseRef: {
        title: "Estetik alanında yaptığımız iş",
        body: "Dr. Yasin Kurtboğan için kurduğumuz medikal estetik sitesi, bu alanın en zor dengesini kurmak üzerine tasarlandı: hizmeti çekici göstermek ile tıbbi ciddiyeti korumak arasındaki denge. Uygulamaların ayrı ayrı anlatıldığı, hekimin öne çıktığı ve ziyaretçiyi tek adımda iletişime taşıyan bir kurgu kullandık.",
        projectSlug: "dryasin",
        linkLabel: "Siteyi inceleyin",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Randevu düzeninizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi işlemlerde yoğunlaştığınızı ve müşteri profilinizi konuşuruz. Lazer epilasyon ağırlıklı bir merkezle cilt bakımı ağırlıklı bir merkezin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik ve görsel",
            body: "İşlem açıklamaları ve ekip bilgileri için şablon gönderiyoruz. Öncesi-sonrası görseli kullanacaksanız müşteri onayı konusunu bu aşamada netleştiririz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Bu alanda tasarımın görevi prestij hissi kurmaktır; renk ve tipografi seçimleri buna göre yapılır. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Kampanya ve fiyat güncellemesi için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Güzellik merkezi sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Sağlık tanıtım kuralları biliniyor mu?",
            body: "Medikal estetik ve bazı cilt işlemleri sağlık hizmeti kapsamındadır; bu alanda kampanya, indirim ve karşılaştırmalı üstünlük iddiası ciddi sorun yaratabilir. Ajansınızın bu ayrımı bilmesi gerekir.",
          },
          {
            title: "Öncesi-sonrası görseli kullanılabilir mi?",
            body: "Müşteri görselleri kişisel veridir, yazılı onay olmadan yayınlanamaz. Sağlık hizmeti kapsamındaki işlemlerde ayrıca mevzuat sınırı vardır. Bu riski ajans mı üstleniyor, siz mi?",
          },
          {
            title: "İşlemler ayrı sayfa mı?",
            body: "Lazer arayan kişiyle cilt bakımı arayan kişi farklı şeyler soruyor. Hepsi tek sayfada listelenmişse ne müşteri aradığını bulur ne de Google hangi işlemde uzman olduğunuzu anlar.",
          },
          {
            title: "Site prestijli duruyor mu?",
            body: "Bu sektörde algı fiyatı doğrudan etkiler. Hazır tema kullanılmış, herkesin sitesine benzeyen bir vitrin hizmetinizi de sıradanlaştırır.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Müşterilerin neredeyse tamamı siteye telefondan giriyor. Galeri ağırlıklı sitelerde hız en çok ihmal edilen konudur; teklif verenin mevcut bir işini kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının işletmeniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Beauty & Aesthetics Clinic Website",
      metaDescription:
        "Website for beauty salons, skincare and laser clinics. Online booking, before-and-after gallery and Google visibility. Get a free quote.",
      eyebrow: "For Beauty Clinics",
      h1: "Beauty & Aesthetics Clinic Website",
      intro:
        "In aesthetics and skincare, trust is everything. A sharp site that shows your results and easy booking moves a hesitant visitor toward a decision. Forpus builds sites for beauty, skincare and laser clinics.",
      shortAnswer: {
        title:
          "What does a beauty clinic website include, and what does it cost?",
        body: "A beauty and aesthetics clinic website is your own address for explaining treatments, showing results and taking bookings. A typical clinic site Forpus builds carries service and package pages, a before-and-after gallery published with consent, online booking and WhatsApp routing, a campaign section, Google Maps and review links, and a fast mobile-first design. A site focused on introducing the clinic runs ₺50,000–85,000 and goes live in one to two weeks. A full clinic site with each treatment on its own page and prepared for search runs ₺90,000–160,000 and takes two to four weeks. Add a booking system and a mobile app and the project starts at ₺250,000. Each treatment gets its own page: someone searching for laser hair removal should not land on the same page as someone searching for a facial. Where treatments are medical, health-advertising rules apply.",
      },
      benefits: [
        {
          title: "A results-driven storefront",
          body: "Prove the quality of your work with a before-and-after gallery and build trust.",
        },
        {
          title: "Online booking",
          body: "Let clients pick service and time themselves; cut phone traffic and fill the calendar.",
        },
        {
          title: "A premium design",
          body: "Stand out from competitors with a sharp, modern look worthy of your brand.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service and package pages",
        "Before-and-after gallery",
        "Online booking / WhatsApp",
        "Campaign and price section",
        "Google map and reviews",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you add before-and-after photos?",
          a: "Yes. We build a sharp gallery showcasing your results, with attention to consent and privacy.",
        },
        {
          q: "Can I update campaigns myself?",
          a: "Yes. We build a structure where you update campaigns and prices easily.",
        },
        {
          q: "Does it take online bookings?",
          a: "We set up service-and-time online booking or a WhatsApp redirect.",
        },
      ],
      ctaTitle: "Let's build a site for your clinic",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "veteriner",
    image: "/generated/personas/veteriner.webp",
    service: "web",
    slug: { tr: "veteriner-web-sitesi", en: "veterinary-website" },
    tr: {
      metaTitle: "Veteriner Klinik Web Sitesi",
      metaDescription:
        "Veteriner klinikleri ve pet sağlığı için web sitesi ve online randevu. Güven veren, mobil uyumlu, Google'da bulunan tasarım. Ücretsiz teklif alın.",
      eyebrow: "Veterinere Özel",
      h1: "Veteriner Klinik Web Sitesi",
      intro:
        "Dostları rahatsızlanınca sahipler önce en yakın açık kliniği arıyor. Adresin, telefonun, muayene saatlerinin ve nöbet bilgisinin net göründüğü bir site, size ulaşmayı kolaylaştırır. Forpus veteriner klinikleri için, hekimin tabi olduğu tanıtım sınırlarını gözeterek site kuruyor.",
      shortAnswer: {
        title: "Veteriner klinik web sitesi ne içerir, ne kadar tutar?",
        body: "Veteriner klinik web sitesi, hizmetlerinizi anlattığınız, nöbet ve acil bilgisini duyurduğunuz ve randevu aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir klinik sitesinde aşı, cerrahi ve check-up gibi hizmetler için ayrı sayfalar, online randevu ile WhatsApp yönlendirmesi, ilk ekranda görünen acil iletişim ve nöbet bilgisi, ekip ile klinik bilgileri, Google harita bağlantısı ve çalışma saatleri, mobil uyumlu hızlı bir tasarım bulunur. Klinik bilgilerine odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Randevunun siteden alındığı, hizmetlerin ayrı ayrı anlatıldığı tam bir klinik sitesi ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Randevu ve hasta kayıt sistemi işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Acil arayan sahip için en kritik bilgi telefondur; ilk ekrana konur. Alan adı ve site sizin adınıza kaydedilir; çalışma saatlerini ve nöbet günlerini panelden kendiniz güncellersiniz. Google İşletme Profili bağlantısı teslimde kurulur — \"en yakın veteriner\" aramalarının neredeyse tamamı haritadan geliyor.",
      },
      benefitsTitle: "Veteriner web sitesi kliniğinize ne kazandırır?",
      benefits: [
        {
          title: "Acil erişim",
          body: "Adres, telefon ve nöbet bilgisi tek dokunuşta; sahip vakit kaybetmeden ulaşsın.",
        },
        {
          title: "Kliniğiniz anlaşılır olsun",
          body: "Hizmetleriniz ve çalışma düzeniniz tarafsız bir dille, olduğu gibi anlatılsın.",
        },
        {
          title: "Google'da bulunun",
          body: "'Yakınımdaki veteriner' aramalarında ve haritada bulunun.",
        },
      ],
      featuresTitle: "Veteriner sitenizde neler olur?",
      features: [
        "Hizmet sayfaları (aşı, cerrahi, check-up)",
        "Online randevu / WhatsApp",
        "Acil iletişim ve nöbet bilgisi",
        "Ekip ve klinik bilgileri",
        "Google harita ve çalışma saatleri",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Veteriner hekim reklam yasağı sitemi nasıl etkiliyor?",
          a: "Bu sektörde en çok gözden kaçan konu bu. 6343 sayılı Kanun veteriner hekimlerin reklamını yasaklıyor; 20 Haziran 2026'da yürürlüğe giren 7584 sayılı Kanun'la yasağın kapsamına internet ve sosyal medya açıkça eklendi. Site açmak yasak değil — Kanun hekime çalışma yerini ve ihtisasını bildirir ilan verme hakkı tanıyor; sınır, içeriğin reklam ya da propaganda mahiyetine geçmemesi. Pratikte şu demek: hasta yorumu, yıldız ve puan, teşekkür ilanı, kampanya ve indirim duyurusu, fiyat listesi, öncesi-sonrası görseli, karşılaştırmalı üstünlük iddiası ve belgeye dayanmayan uzmanlık ibaresi siteye konmaz. Yerine adres, telefon, muayene gün ve saatleri, nöbet bilgisi, kazanılmış unvan ve hizmetlerin tarafsız teknik açıklaması konur. Siteyi bu çerçeveye göre kurgularız. Cezanın muhatabı hekim olduğu için sınırda gördüğümüz her başlığı size ayrıca söyleriz; kesin yorum için bağlı olduğunuz veteriner hekimler odasıyla teyitleşmenizi öneririz.",
        },
        {
          q: "Online randevu kurar mısınız?",
          a: "Evet. WhatsApp veya saat seçmeli randevu akışını ihtiyacınıza göre kurarız.",
        },
        {
          q: "Acil durum bilgisini öne çıkarır mısınız?",
          a: "Evet. Telefon, adres ve nöbet bilgisini her sayfadan kolayca erişilir yaparız.",
        },
        {
          q: "Blog ekleyebilir miyiz?",
          a: "Evet. Pet sağlığı içerikleriyle Google'dan organik ziyaretçi kazanmanıza yardımcı oluruz.",
        },
        {
          q: "Veteriner web sitesi ne kadar tutar?",
          a: "Hizmet, ekip ve acil iletişim odaklı bir bilgi sitesi ₺50.000 bandında başlar. Her hizmetin ayrı sayfalandığı, bilgilendirme blogu ve randevu yönlendirmeli bir klinik sitesi ₺90.000–150.000 aralığındadır. Takvimli randevu ve hasta kayıt sistemi işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Aşı hatırlatma sistemi kurabilir misiniz?",
          a: "Evet. Hayvanın aşı tarihini sisteme girdiğinizde, zamanı geldiğinde sahibe otomatik SMS veya e-posta gider. Bu bir koruyucu hekimlik hatırlatmasıdır; mesajı kampanya ya da çağrı metnine dönüştürmeden, yalnızca tarih bilgisi verecek biçimde kurarız. Gönderim için sahibin açık rızasını alan bir onay adımı da eklenir. Hasta kayıt sistemi kapsamında kurulur.",
        },
        {
          q: "Google Haritalar'da bulunmama yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. İşletme Profilinizi kurar veya düzenler, kategori ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Nöbetçi olduğum günleri sitede gösterebilir miyim?",
          a: "Evet, panelden güncelleyebileceğiniz bir nöbet bilgisi alanı kurarız. Bu bilgi hem sitede öne çıkar hem de Google İşletme Profilindeki özel çalışma saatleriyle uyumlu tutulabilir.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurarız; eski adresleri yenilerine yönlendiririz.",
        },
      ],
      ctaTitle: "Kliniğiniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Dostu hastalanan sahip ne yapıyor?",
        body: [
          "Hayvanı rahatsızlanan biri panik halinde telefonunu açar ve 'yakınımdaki veteriner' arar. O anda baktığı üç şey vardır: açık mı, nerede, nasıl ulaşırım. Bu bilgiler net değilse bir sonraki kliniğe geçer.",
          "Acil olmayan durumlarda ise karar farklı verilir. Aşı, kısırlaştırma veya kontrol için sahip, kliniği önceden araştırır: ekip kim, ortam nasıl, hangi hizmetler var. Burada güven kuran şey kliniğin kendini anlatabilmesidir.",
          "Kendi siteniz olmadığında bu iki senaryoda da haritadaki kısa bilgiye mahkûm kalırsınız. Nöbet saatleriniz, çalışma düzeniniz ve hangi hizmetleri verdiğiniz hiçbir yerde net görünmez.",
        ],
      },
      pricing: {
        title: "Veteriner web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Klinik bilgi sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Hizmetler, ekip, acil iletişim, harita ve çalışma saatleri. Tek tık arama ve WhatsApp. Tek şubeli klinikler için yeterli.",
          },
          {
            name: "Randevulu klinik sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Her hizmetin ayrı sayfalandığı, aşı takvimi ve bakım bilgilendirmesi için blog altyapılı, online randevu yönlendirmeli yapı. Bölgesel aramalarda görünmek isteyen klinikler için.",
          },
          {
            name: "Randevu & hasta kayıt sistemi",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Takvimli randevu, hayvan kayıt geçmişi, aşı hatırlatma bildirimleri ve sahip paneli. Hasta hacmi defterle yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Klinik düzeninizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hizmet kapsamınızı, nöbet düzeninizi ve hasta profilinizi konuşuruz. Sadece kedi-köpekle çalışan bir klinikle egzotik hayvana da bakan bir kliniğin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik ve görsel",
            body: "Hizmet açıklamaları ve ekip bilgileri için şablon gönderiyoruz. Klinik fotoğrafları bu alanda güveni doğrudan etkilediği için mevcut görsellerinizi birlikte değerlendiririz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi hem tıbbi ciddiyeti hem hayvan sevgisini aynı anda hissettirmek. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Nöbet ve çalışma saati güncellemesi için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Veteriner web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Ajans veteriner reklam yasağını biliyor mu?",
            body: "Bu sektörde en pahalı hata burada yapılıyor. Diğer sektörlerde satan her şey — hasta yorumu, Google puanı, kampanya duyurusu, öncesi-sonrası görseli, 'en iyi klinik' ifadeleri — burada yasak ve cezayı ajans değil hekim ödüyor. Teklif aldığınız ajansa doğrudan sorun: 6343 ve 7584 sayılı Kanunları biliyor mu, siteye yorum modülü koymayı teklif ediyor mu? Teklifinde bunlar varsa o ajans sizi odaya karşı zor durumda bırakır.",
          },
          {
            title: "Acil iletişim ilk ekranda mı?",
            body: "Panik halindeki sahip menüde gezinmez. Telefon numarası ve nöbet bilgisi ilk ekranda, tıklanınca doğrudan arama başlatacak şekilde olmalı.",
          },
          {
            title: "Google İşletme Profili kurulu mu?",
            body: "Veteriner aramalarının büyük kısmı 'yakınımdaki' şeklinde ve haritadan geliyor. İşletme Profili olmadan sadece site kurmak eksik bir iştir.",
          },
          {
            title: "Çalışma saatlerini güncelleyebiliyor musunuz?",
            body: "Nöbet ve tatil günleri değişir. Her değişiklik için ajansa haber vermek zorundaysanız bilgi yanlış kalır ve sahipler boşuna gelir.",
          },
          {
            title: "Hizmetler ayrı sayfa mı?",
            body: "Kısırlaştırma arayan sahiple aşı arayan sahip farklı şeyler soruyor. Tek sayfada listelenmişse ne sahip aradığını bulur ne Google konuyu anlar.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Acil arayan kişi üç saniye bekler. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının kliniğiniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Veterinary Clinic Website Design",
      metaDescription:
        "Websites for veterinary clinics: address, phone, consultation hours and on-call details, clearly set out — and within the advertising rules that bind vets.",
      eyebrow: "For Vets",
      h1: "Veterinary Clinic Website",
      intro:
        "When a pet falls ill, owners look for the nearest clinic that is open. A site where the address, phone number, consultation hours and on-call information are plain to see makes you easy to reach. Forpus builds sites for veterinary clinics within the promotional limits that apply to the profession.",
      shortAnswer: {
        title:
          "What does a veterinary clinic website include, and what does it cost?",
        body: "A veterinary clinic website is your own address for explaining services, announcing emergency and on-call hours and taking appointments. A typical clinic site Forpus builds carries separate pages for services such as vaccination, surgery and check-ups, online booking and WhatsApp routing, emergency contact and on-call information visible on the first screen, team and clinic information, a Google Maps link with opening hours, and a fast mobile-first design. A site focused on clinic information runs ₺50,000–85,000 and goes live in one to two weeks. A full clinic site that takes bookings and describes each service runs ₺90,000–150,000 and takes two to four weeks. A booking and patient-record system starts at ₺220,000. You update opening hours and on-call days yourself. For an owner searching in an emergency the phone number is the critical piece, so it goes on the first screen.",
      },
      benefits: [
        {
          title: "Reachable in an emergency",
          body: "Address, phone and on-call info in one tap so owners reach you without losing time.",
        },
        {
          title: "Make your clinic legible",
          body: "Set out your services and working hours plainly, so owners know what to expect.",
        },
        {
          title: "Get found on Google",
          body: "Be found in 'vet near me' searches and on the map.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service pages (vaccines, surgery, check-ups)",
        "Online booking / WhatsApp",
        "Emergency contact and on-call info",
        "Team and clinic information",
        "Google map and opening hours",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "How do advertising restrictions for vets affect the site?",
          a: "In Turkey, advertising by veterinary surgeons is restricted by law, and a 2026 amendment added the internet and social media to that scope explicitly. Having a website is not banned: a vet may publish notices stating their practice location and qualifications. What the content must avoid is anything promotional — client reviews, star ratings, thank-you notices, campaigns and discounts, price lists, before-and-after images, comparative superiority claims, and any specialist title not backed by a certificate. What belongs there instead is the address, phone number, consultation days and hours, on-call information, earned titles, and neutral technical descriptions of the services. We build the site within that frame. Since the penalty falls on the vet, not on us, we flag anything borderline; for a binding view, check with your chamber.",
        },
        {
          q: "Can you set up online booking?",
          a: "Yes. We build a WhatsApp or time-slot booking flow around your needs.",
        },
        {
          q: "Can you highlight emergency info?",
          a: "Yes. We make phone, address and on-call details reachable from every page.",
        },
        {
          q: "Can we add a blog?",
          a: "Yes. Pet-health content helps you earn organic visitors from Google.",
        },
      ],
      ctaTitle: "Let's build a site for your clinic",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "mimar",
    image: "/generated/personas/mimar.webp",
    service: "web",
    slug: { tr: "mimar-web-sitesi", en: "architect-website" },
    tr: {
      metaTitle: "Mimar & İç Mimar Web Sitesi (Portfolyo)",
      metaDescription:
        "Mimar ve iç mimarlar için portfolyo odaklı web sitesi. Projelerinizi etkileyici gösteren, mobil uyumlu, Google'da bulunan tasarım. Teklif alın.",
      eyebrow: "Mimara Özel",
      h1: "Mimar & İç Mimar Web Sitesi",
      intro:
        "Sizin işiniz görsel; siteniz de öyle olmalı. Projelerinizi büyük, etkileyici görsellerle sunan bir portfolyo sitesi, potansiyel müşteride 'bununla çalışmalıyım' hissi yaratır. Forpus mimar ve iç mimarlara özel portfolyo siteleri tasarlıyor.",
      shortAnswer: {
        title: "Mimar web sitesi ne içerir, ne kadar tutar?",
        body: "Mimar ve iç mimar web sitesi, projelerinizi hak ettikleri ölçekte gösterdiğiniz ve teklif talebine dönüştürdüğünüz kendi adresinizdir. Forpus'un kurduğu tipik bir portfolyo sitesinde kendiniz proje ekleyebildiğiniz bir galeri, her proje için ayrı detay sayfası, hizmet ve çalışma süreci anlatımı, hakkımda ya da ekip bölümü, teklif formu ve mobil uyumlu hızlı bir galeri bulunur. Portfolyoya odaklı bir site ₺60.000–100.000 aralığında ve bir ila iki haftada yayına girer. Hizmetlerin ve sürecin ayrı ayrı anlatıldığı tam bir büro sitesi ₺110.000–190.000 aralığında ve üç ila beş haftada tamamlanır. Özel geçiş efektleri ya da 3D gezinme işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Yüksek çözünürlüklü render'lar siteyi yavaşlatmaz: her görselin ekran boyutuna göre türevleri üretilir. Alan adı ve site sizin adınıza kaydedilir, yeni projeleri panelden kendiniz eklersiniz. Her projenin ayrı bir detay sayfası olur; tek bir galeri ızgarası projenin hikâyesini ve ölçeğini anlatamaz. Tasarım bilerek sakin kalır, işin önüne geçmez.",
      },
      benefitsTitle: "Portfolyo siteniz büronuza ne kazandırır?",
      benefits: [
        {
          title: "Etkileyici portfolyo",
          body: "Projelerinizi tam ekran, yüksek kaliteli görsellerle sunun; işiniz kendini anlatsın.",
        },
        {
          title: "Prestijli algı",
          body: "Sade ve şık bir tasarım, uzmanlığınızı ve seviyenizi ilk bakışta yansıtır.",
        },
        {
          title: "Doğru müşteri",
          body: "Proje türlerinizi anlatarak size uygun işleri çekin, Google'dan bulunun.",
        },
      ],
      featuresTitle: "Mimar sitenizde neler olur?",
      features: [
        "Proje / portfolyo galerisi",
        "Proje detay sayfaları",
        "Hizmet ve süreç anlatımı",
        "Hakkımda / ekip bölümü",
        "İletişim ve teklif formu",
        "Mobil uyumlu, hızlı galeri",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Projelerimi kendim ekleyebilir miyim?",
          a: "Evet. Yeni projeleri görsel ve detaylarıyla kolayca ekleyebileceğiniz bir yapı kurarız.",
        },
        {
          q: "Yüksek kaliteli görseller siteyi yavaşlatır mı?",
          a: "Hayır. Görselleri optimize ederek kaliteden ödün vermeden hızlı bir galeri kurarız.",
        },
        {
          q: "3D / render koyabilir miyim?",
          a: "Elbette. Render ve çizimlerinizi tam ekran sunan bir düzen kurgularız.",
        },
        {
          q: "Mimar web sitesi ne kadar tutar?",
          a: "Seçili projelerin galeri halinde sunulduğu bir portfolyo sitesi ₺60.000 bandında başlar. Her projenin künyeli detay sayfası olduğu, kendi yönetebildiğiniz bir büro sitesi ₺110.000–190.000 aralığındadır. Sanal tur ve etkileşimli sunum işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Projelerimi kendim ekleyebilir miyim?",
          a: "Büro sitesi paketinde evet. Proje adı, künye, konum ve görselleri panelden girer, sıralamayı sürükleyerek değiştirirsiniz. Portfolyo sitesi paketinde projeleri biz yükleriz; yılda birkaç kez güncelleme yapan bürolar için bu daha ekonomik oluyor.",
        },
        {
          q: "Render'larım siteyi yavaşlatır mı?",
          a: "Doğru kurulmazsa evet, bu en sık gördüğümüz sorun. Biz görselleri birden fazla boyutta üretir, ziyaretçinin ekranına uygun olanı göndeririz; kalite kaybı olmadan sayfa hızlı açılır. Orijinal dosyalarınızı da saklarız.",
        },
        {
          q: "Sanal tur ekleyebilir misiniz?",
          a: "Evet. Mevcut bir 360° çekiminiz veya 3D modeliniz varsa siteye gömeriz. Sıfırdan üretim gerekiyorsa bu ayrı bir kalem olur ve kapsamı birlikte belirleriz.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Projelerinizi yeni yapıya aktarır, mevcut adreslerinizi yenilerine yönlendirir ve arama motorlarındaki birikiminizin kaybolmamasını sağlarız.",
        },
      ],
      ctaTitle: "Portfolyonuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "İşiniz görsel, peki nerede görünüyor?",
        body: [
          "Mimarlıkta iş çoğunlukla tavsiyeyle gelir; ama tavsiye edilen kişi de mutlaka internete bakar. O an gördüğü şey, sizinle çalışıp çalışmayacağına dair kararının büyük kısmını belirler.",
          "Instagram bu işi kısmen görür ama kare formatı projeyi parçalar; bir yapının bütününü, planını ve hikâyesini anlatamazsınız. Üstelik akışta eski projeler kaybolur, ziyaretçi neye baktığını anlamaz.",
          "Portfolyo sitesi projeyi hak ettiği ölçekte gösterir: tam genişlikte görseller, proje künyesi, süreç anlatımı. Aynı proje burada çok daha değerli görünür ve bu doğrudan alabileceğiniz ücrete yansır.",
        ],
      },
      pricing: {
        title: "Mimar web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Portfolyo sitesi",
            price: "₺60.000 – 100.000",
            timeline: "~1–2 hafta",
            body: "Seçili projelerin galeri halinde sunulduğu, hakkımda ve iletişim bölümlü sade bir vitrin. Projeleri biz yükleriz. Yeni büro kuranlar için yeterli.",
          },
          {
            name: "Büro sitesi",
            price: "₺110.000 – 190.000",
            timeline: "~3–5 hafta",
            body: "Her projenin kendi detay sayfası olduğu, künye ve süreç anlatımlı, kendi yönetebildiğiniz portfolyo yapısı. Hizmet ve ekip sayfaları, çok dilli seçenek. Bilinirlik hedefleyen bürolar için.",
          },
          {
            name: "Özel deneyim & 3D",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "Sanal tur, 3D gezinme, etkileşimli proje sunumu ve müşteri onay portalı. Sunumun işin kendisi kadar önemli olduğu bürolar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Proje teslim programınızı aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Çalışma alanınızı ve hedef müşterinizi konuşuruz. Konut projeleri yapan bir büroyla ticari iç mimarlık yapan birinin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Proje seçimi ve görseller",
            body: "Hangi projelerin öne çıkacağını birlikte seçeriz. Bu aşama kritik: az sayıda güçlü proje, çok sayıda vasat projeden daha iyi sonuç verir. Render ve fotoğrafları web için optimize ederiz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfa ve bir proje detay sayfasını görürsünüz. Bu işte tasarımın görevi görünmez olmaktır; sayfa değil proje konuşmalı. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Search Console bağlantısı dahil yayına alırız. Yeni proje ekleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Mimar web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Görseller hem net hem hızlı mı?",
            body: "Mimarlık sitelerinin klasik sorunu budur: yüksek çözünürlüklü render'lar siteyi yavaşlatır, sıkıştırılınca iş kalitesiz görünür. Görsellerin otomatik olarak ekrana göre boyutlandırılması gerekir; bunu sorun.",
          },
          {
            title: "Yeni proje ekleyebilecek misiniz?",
            body: "Her yeni proje için ajansa bağımlı kalmak, portfolyonun yıllarca güncellenmemesine yol açar. Panel demosunu görmeden karar vermeyin.",
          },
          {
            title: "Proje detay sayfası var mı?",
            body: "Sadece galeri yeterli değil. Her projenin künyesi, konumu ve anlatımıyla kendi sayfası olmalı; hem müşteri için hem arama görünürlüğü için.",
          },
          {
            title: "Tasarım işi gölgeliyor mu?",
            body: "Fazla iddialı bir arayüz, mimarlık sitesinde projenin önüne geçer. Sayfanın sade olması bu işte bir eksiklik değil, gerekliliktir.",
          },
          {
            title: "Mobilde nasıl görünüyor?",
            body: "Yatay render'lar dar ekranda okunmaz hale gelebilir. Teklif verenden mevcut bir işini isteyin ve kendi telefonunuzdan projelere bakın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının büronuz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Architect & Interior Designer Website",
      metaDescription:
        "Portfolio-focused website for architects and interior designers. Presents your projects impressively, mobile-friendly and ranks on Google. Get a quote.",
      eyebrow: "For Architects",
      h1: "Architect & Interior Designer Website",
      intro:
        "Your work is visual; your site should be too. A portfolio site that presents projects with large, striking imagery makes prospects feel 'I have to work with them'. Forpus builds portfolio sites for architects and interior designers.",
      shortAnswer: {
        title: "What does an architect website include, and what does it cost?",
        body: "An architect or interior designer website is your own address for showing projects at the scale they deserve and turning them into enquiries. A typical portfolio site Forpus builds carries a gallery you add projects to yourself, a detail page per project, a description of services and the working process, an about or team section, an enquiry form, and a fast mobile-first gallery. A site focused on the portfolio runs ₺60,000–100,000 and goes live in one to two weeks. A full studio site describing services and process runs ₺110,000–190,000 and takes three to five weeks. Custom transitions or 3D walkthroughs start at ₺250,000. High-resolution renders do not slow the site down: a set of derivatives is generated for each screen size. Every project gets its own detail page — a single gallery grid cannot carry a project's story or scale.",
      },
      benefits: [
        {
          title: "A striking portfolio",
          body: "Present projects with full-screen, high-quality imagery; let the work speak.",
        },
        {
          title: "A premium perception",
          body: "A clean, sharp design conveys your expertise and level at first glance.",
        },
        {
          title: "The right clients",
          body: "Explain your project types to attract the right work and get found on Google.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Project / portfolio gallery",
        "Project detail pages",
        "Services and process pages",
        "About / team section",
        "Contact and quote form",
        "Fast, mobile-friendly gallery",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can I add projects myself?",
          a: "Yes. We build a structure where you add new projects with imagery and details easily.",
        },
        {
          q: "Will high-quality images slow the site?",
          a: "No. We optimize the imagery to keep the gallery fast without losing quality.",
        },
        {
          q: "Can I add 3D / renders?",
          a: "Of course. We design a layout that presents your renders and drawings full-screen.",
        },
      ],
      ctaTitle: "Let's build a site for your portfolio",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "musavir",
    image: "/generated/personas/musavir.webp",
    service: "web",
    slug: { tr: "mali-musavir-web-sitesi", en: "accountant-website" },
    tr: {
      metaTitle: "Mali Müşavir & Muhasebe Web Sitesi",
      metaDescription:
        "Mali müşavir ve muhasebe ofisleri için kurumsal, güven veren web sitesi. Hizmet tanıtımı ve mükellef çekme. Mobil uyumlu. Ücretsiz teklif alın.",
      eyebrow: "Mali Müşavire Özel",
      h1: "Mali Müşavir Web Sitesi",
      intro:
        "İşletmeler muhasebelerini emanet edecekleri kişide güven ve ciddiyet arar. Kurumsal, net ve profesyonel bir web sitesi, ofisinizin güvenilirliğini yansıtır ve yeni mükellef getirir. Forpus mali müşavir ve muhasebe ofislerine özel siteler tasarlıyor.",
      shortAnswer: {
        title: "Mali müşavir web sitesi ne içerir, ne kadar tutar?",
        body: "Mali müşavir web sitesi, ofisinizin hizmetlerini ve deneyimini anlattığınız, yeni mükellefin size ulaştığı kendi adresinizdir. Forpus'un kurduğu tipik bir ofis sitesinde kuruluş, danışmanlık ve beyanname gibi hizmetler için ayrı sayfalar, sektörel çözümler bölümü, ekip ve özgeçmiş sayfaları, randevu ile iletişim formu, kurumsal ve mobil uyumlu bir tasarım ile yerel aramaları kapsayan SEO ayarları bulunur. Tanıtıma odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Hizmetlerin ayrı ayrı sayfalandığı, mevzuat yazıları yayınlanabilen kurumsal bir ofis sitesi ₺90.000–160.000 aralığında ve iki ila dört haftada tamamlanır. Mükellefin belge yüklediği bir portal işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz. Meslek mevzuatı gereği ücret ilanı ve iş getirici ifade kullanılmaz. Alan adı ajansın değil sizin hesabınızda durur, içerikleri teslimden sonra kendiniz güncellersiniz. Mükellef tipine göre ayrım yapılır: şahıs şirketi kuran biriyle e-dönüşüme geçen bir limited şirket aynı sayfaya inmemeli. Beyanname takvimi gibi tekrar eden içerikler, yılda birkaç kez aynı aramaları getirir.",
      },
      benefitsTitle: "Mali müşavir web sitesi ofisinize ne kazandırır?",
      benefits: [
        {
          title: "Kurumsal güven",
          body: "Ciddi ve profesyonel bir tasarımla ofisinizin güvenilirliğini ilk bakışta hissettirin.",
        },
        {
          title: "Hizmetleriniz net",
          body: "Kuruluş, beyanname, danışmanlık; her hizmeti ayrı anlatarak doğru mükellefle eşleşin.",
        },
        {
          title: "Mükellef getiren yapı",
          body: "Google'da 'mali müşavir + şehir' aramalarında çıkacak şekilde optimize.",
        },
      ],
      featuresTitle: "Mali müşavir sitenizde neler olur?",
      features: [
        "Hizmet sayfaları (kuruluş, danışmanlık, beyanname)",
        "Sektörel çözümler bölümü",
        "Ekip ve özgeçmiş",
        "Randevu ve iletişim formu",
        "Kurumsal, mobil uyumlu tasarım",
        "Google ve yerel SEO ayarları",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Uzaktan / online çalışmaya uygun mu?",
          a: "Evet. İletişim ve randevu akışını uzaktan çalışmaya uygun şekilde kurarız.",
        },
        {
          q: "Mevzuat / blog bölümü ekler misiniz?",
          a: "Evet. Güncel içeriklerle uzmanlığınızı gösterip Google'dan ziyaretçi kazanırsınız.",
        },
        {
          q: "Birden çok hizmet ekleyebilir miyim?",
          a: "Elbette. Her hizmet için ayrı, SEO'ya uygun sayfalar kurarız.",
        },
        {
          q: "Mali müşavir web sitesi ne kadar tutar?",
          a: "Hizmet ve özgeçmiş odaklı kurumsal bir tanıtım sitesi ₺50.000 bandında başlar. Her hizmetin ayrı sayfalandığı, sektörel çözümler ve mevzuat blogu olan bir ofis sitesi ₺90.000–160.000 aralığındadır. Mükellef portalı işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Meslek mevzuatı sitemi nasıl etkiliyor?",
          a: "Serbest muhasebeci mali müşavirlik mevzuatı tanıtımı sınırlar; site bilgilendirme çerçevesinde kalmalıdır. Pratikte ücret ilanı vermek, iş vaadinde bulunmak ve meslektaşlarla karşılaştırmalı üstünlük iddia etmek sorun yaratır. Siteyi bu çerçeveyi gözeterek kurgular, son onayı size bırakırız; bağlı olduğunuz odanın güncel düzenlemesiyle teyitleşmenizi öneririz.",
        },
        {
          q: "Mevzuat yazısı yayınlamak işe yarar mı?",
          a: "Bu alanda en çok işe yarayan yöntem bu. İşletme sahipleri müşavir aramadan önce sorunlarını aratıyor; o soruya doğru yanıt veren bir yazı sizi hem bulunur hem güvenilir kılıyor. Yazıların doğruluğu size ait olmak kaydıyla altyapıyı ve yayın düzenini biz kurarız.",
        },
        {
          q: "Mükellef portalı gerçekten gerekli mi?",
          a: "Mükellef sayınız az ve belge alışverişi e-postayla rahat yürüyorsa gereksiz maliyettir; dürüst yanıt budur. Ancak belge takibi ofis içinde ciddi vakit alıyorsa ve beyanname dönemlerinde kaos yaşanıyorsa portal kendini kısa sürede amorti eder.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurarız; eski adresleri yenilerine yönlendiririz.",
        },
      ],
      ctaTitle: "Ofisiniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Mükellef müşavir değiştirirken neye bakıyor?",
        body: [
          "Bu meslekte müşteri çoğunlukla tavsiyeyle gelir; ama tavsiye edilen kişiyi herkes bir de internetten kontrol eder. Şirket kuran, müşavir değiştiren veya yeni bir yatırıma başlayan biri, karar vermeden önce sizi aratır.",
          "O aramada karşısına bir şey çıkmazsa değerlendirecek bir veri de olmaz. Kaç yıllık deneyiminiz olduğu, hangi mükellef tipiyle çalıştığınız, e-Fatura ve e-Defter geçişinde destek verip vermediğiniz hiçbir yerde görünmez.",
          "Asıl kayıp ise yanlış eşleşmede. E-ticaret mükellefleriyle çalışmayı bilen bir ofise inşaat taahhüt sorusu gelmesi ikisi için de vakit kaybıdır. Uzmanlığınızın yazılı olduğu bir site, gelen aramaların isabetini belirgin şekilde artırır.",
        ],
      },
      pricing: {
        title: "Mali müşavir web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Ofis tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Kurumsal bir dijital varlık: hizmetler, özgeçmiş, iletişim. Bireysel çalışan müşavirler için yeterli.",
          },
          {
            name: "Kurumsal ofis sitesi",
            price: "₺90.000 – 160.000",
            timeline: "~2–4 hafta",
            body: "Her hizmetin ayrı sayfalandığı, sektörel çözümler bölümlü, mevzuat yazıları için blog altyapılı yapı. Ekip ve özgeçmiş sayfaları. Büyüme hedefleyen ofisler için.",
          },
          {
            name: "Mükellef portalı",
            price: "₺250.000'den başlayan",
            timeline: "Projeye özel",
            body: "Mükellefin belge yüklediği, beyanname ve tahakkuklarını gördüğü güvenli portal; ofis içi takip paneli. Belge trafiği e-postayla yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Beyanname dönemlerinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hizmet kapsamınızı ve hedef mükellef profilinizi konuşuruz. Şahıs işletmeleriyle çalışan bir ofisle kurumsal şirketlere hizmet veren birinin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik toplama",
            body: "Hizmet açıklamaları, özgeçmiş ve sık sorulanlar için şablon gönderiyoruz. Mevzuat içeriğinin doğruluğu size ait olduğu için son onay her zaman sizden geçer.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Bu alanda tasarımın işi güven ve kurumsallık hissi kurmaktır. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Search Console ve İşletme Profili bağlantısı dahil yayına alırız. İçerik ekleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Mali müşavir web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Meslek mevzuatı biliniyor mu?",
            body: "Serbest muhasebeci mali müşavirlik mevzuatı reklam ve tanıtımı sınırlar. Ücret ilanı, iş vaadi ve karşılaştırmalı üstünlük iddiası sorun yaratabilir. Bunu bilmeyen bir ajans sizi odanız nezdinde zor durumda bırakabilir.",
          },
          {
            title: "Mükellef tipine göre ayrım var mı?",
            body: "Şahıs işletmesi, limited şirket ve e-ticaret mükellefi tamamen farklı şeyler arıyor. Sitenin hepsini tek torbada 'muhasebe hizmetleri' diye sunması, hem ziyaretçiyi hem Google'ı kaybettirir.",
          },
          {
            title: "e-Dönüşüm hizmetleri görünüyor mu?",
            body: "e-Fatura, e-Defter ve e-Arşiv geçişi bugün en çok aranan konulardan biri. Bu hizmetleri veriyorsanız ayrı ayrı yazılmalı; 'danışmanlık' başlığı altında kaybolursa o aramalara hiç girmezsiniz.",
          },
          {
            title: "Beyanname takvimi içeriği var mı?",
            body: "Mükellefler tarih arar: KDV ne zaman, muhtasar ne zaman. Güncel bir beyanname takvimi sayfası, hem mevcut mükellefinizin işini kolaylaştırır hem de düzenli ziyaretçi getiren en pratik içeriktir.",
          },
          {
            title: "İçeriği kendiniz ekleyebilecek misiniz?",
            body: "Mevzuat sürekli değişiyor ve bu alanda güncel yazan kazanıyor. Her yazı için ajansa bağımlı kalırsanız blog bir yıl içinde ölür.",
          },
          {
            title: "Belge paylaşımı nasıl olacak?",
            body: "Mükellef siteden belge göndermek isteyecek. Bunun için WhatsApp yeterli mi, yoksa güvenli bir yükleme alanı mı gerekiyor? Kararı baştan verin; sonradan eklemek daha pahalı.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Accountant & Bookkeeping Website",
      metaDescription:
        "Corporate, trustworthy website for accountants and bookkeeping firms. Service pages and client acquisition. Mobile-friendly. Get a free quote.",
      eyebrow: "For Accountants",
      h1: "Accountant Website Design",
      intro:
        "Businesses look for trust and seriousness in whoever they hand their books to. A corporate, clear, professional website reflects your firm's credibility and brings new clients. Forpus builds sites for accountants and bookkeeping firms.",
      shortAnswer: {
        title:
          "What does an accountant website include, and what does it cost?",
        body: "A certified public accountant's website is your firm's own address for setting out services and experience so new clients can reach you. A typical office site Forpus builds carries separate pages for services such as company formation, advisory and tax filing, a sector-solutions section, team and credentials pages, an appointment and contact form, a corporate mobile-first design, and SEO that covers local search. A site focused on introducing the office runs ₺50,000–85,000 and goes live in one to two weeks. A corporate site with each service on its own page and a place to publish regulatory articles runs ₺90,000–160,000 and takes two to four weeks. A client portal for document exchange starts at ₺250,000. Clients are separated by type: someone registering a sole proprietorship should not land on the same page as a limited company moving to e-invoicing.",
      },
      benefits: [
        {
          title: "Corporate trust",
          body: "Convey your firm's credibility at first glance with a serious, professional design.",
        },
        {
          title: "Clear services",
          body: "Company setup, filings, advisory — explain each service separately to match the right client.",
        },
        {
          title: "A structure that converts",
          body: "Optimized to appear in 'accountant + city' searches on Google.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service pages (setup, advisory, filings)",
        "Sector solutions section",
        "Team and bio",
        "Booking and contact form",
        "Corporate, mobile-friendly design",
        "Google and local SEO setup",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Does it suit remote / online work?",
          a: "Yes. We set up contact and booking flows suited to working remotely.",
        },
        {
          q: "Can you add a blog / updates section?",
          a: "Yes. Current content shows your expertise and earns visitors from Google.",
        },
        {
          q: "Can I add multiple services?",
          a: "Of course. We build separate, SEO-friendly pages for each service.",
        },
      ],
      ctaTitle: "Let's build a site for your firm",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "fotografci",
    image: "/generated/personas/fotografci.webp",
    service: "web",
    slug: { tr: "fotografci-web-sitesi", en: "photographer-website" },
    tr: {
      metaTitle: "Fotoğrafçı Web Sitesi (Portfolyo)",
      metaDescription:
        "Düğün, bebek ve etkinlik fotoğrafçıları için portfolyo web sitesi. Çalışmalarınızı etkileyici gösteren, mobil uyumlu, Google'da bulunan tasarım.",
      eyebrow: "Fotoğrafçıya Özel",
      h1: "Fotoğrafçı Web Sitesi",
      intro:
        "İşiniz kareleri konuşuyor; siteniz de onları hak ettiği gibi göstermeli. Tam ekran, hızlı ve şık bir portfolyo, ziyaretçiyi hayran bırakır ve rezervasyona taşır. Forpus düğün, bebek ve etkinlik fotoğrafçılarına özel siteler tasarlıyor.",
      shortAnswer: {
        title: "Fotoğrafçı web sitesi ne içerir, ne kadar tutar?",
        body: "Fotoğrafçı web sitesi, işlerinizi tam ekran gösterdiğiniz ve rezervasyona dönüştürdüğünüz kendi adresinizdir. Forpus'un kurduğu tipik bir fotoğrafçı sitesinde düğün, bebek ya da etkinlik gibi kategorilere ayrılmış galeriler, paket ve fiyat sayfaları, rezervasyon formu, müşteri yorumları, Instagram entegrasyonu ve mobil uyumlu hızlı bir galeri bulunur. Portfolyoya odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Paketlerin anlatıldığı, rezervasyonun siteden alındığı tam bir site ₺85.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Çekim sonrası müşterinin parolayla girip seçim yaptığı ve dosyaları indirdiği bir teslim sistemi işin içine girdiğinde ₺200.000'den başlayan bir projeden söz ediyoruz. Yüksek çözünürlüklü kareler siteyi yavaşlatmaz: her görselin ekran boyutuna göre türevleri üretilir. Alan adı ve site sizin adınıza kaydedilir, yeni serileri panelden kendiniz eklersiniz. Kareleriniz sağ tık ve sürüklemeye karşı korunur, istenirse filigranlı önizlemeyle sunulur. Fiyat ve müsaitlik yazıp yazmayacağınıza birlikte karar veririz: yazmak teklif trafiğini azaltır, gelen talebi niteliklendirir.",
      },
      benefitsTitle: "Portfolyo siteniz işinize ne kazandırır?",
      benefits: [
        {
          title: "Kareleriniz öne çıksın",
          body: "Tam ekran, yüksek kaliteli galerilerle çalışmalarınız tüm etkisiyle görünsün.",
        },
        {
          title: "Rezervasyona yönlendirin",
          body: "Beğenen ziyaretçiyi tek tıkla iletişim ve rezervasyon formuna taşıyın.",
        },
        {
          title: "Google'da bulunun",
          body: "'Düğün fotoğrafçısı + şehir' gibi aramalarda öne çıkacak yapı.",
        },
      ],
      featuresTitle: "Fotoğrafçı sitenizde neler olur?",
      features: [
        "Kategorili portfolyo galerileri",
        "Paket ve fiyat sayfaları",
        "Rezervasyon / iletişim formu",
        "Müşteri yorumları",
        "Instagram entegrasyonu",
        "Mobil uyumlu, hızlı galeri",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Yüksek çözünürlüklü fotoğraflar siteyi yavaşlatır mı?",
          a: "Hayır. Görselleri optimize ederek kaliteden ödün vermeden hızlı bir galeri kurarız.",
        },
        {
          q: "Galerileri kendim güncelleyebilir miyim?",
          a: "Evet. Yeni çekimleri kolayca ekleyebileceğiniz bir yapı kurarız.",
        },
        {
          q: "Müşteriye özel galeri olur mu?",
          a: "İsterseniz şifreli, müşteriye özel teslim galerileri kurgularız.",
        },
        {
          q: "Fotoğrafçı web sitesi ne kadar tutar?",
          a: "Kategorili galeriler ve iletişim odaklı bir portfolyo sitesi ₺50.000 bandında başlar. Her çekimin kendi seri sayfası olduğu, paket ve rezervasyon formu bulunan bir site ₺85.000–150.000 aralığındadır. Müşteri galerisi ve teslim sistemi işin içine girdiğinde ₺200.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Müşteri galerisi de yapıyor musunuz?",
          a: "Evet. Müşteri kendisine verdiğiniz bağlantı ve şifreyle girer, fotoğraflarını görür, seçim yapar ve indirir. Baskı siparişi akışı da eklenebilir. Bu sistem teslim sürecindeki e-posta trafiğini neredeyse tamamen ortadan kaldırıyor.",
        },
        {
          q: "Fotoğraflarım siteyi yavaşlatır mı?",
          a: "Doğru kurulmazsa evet. Biz her görseli birden fazla boyutta üretir, ziyaretçinin ekranına uygun olanı gönderir ve aşağı kaydırdıkça yüklenmesini sağlarız; galeri hem net hem hızlı açılır.",
        },
        {
          q: "Sitede fiyat yazmalı mıyım?",
          a: "Deneyimimiz şu yönde: en azından bir başlangıç fiyatı yazmak, bütçesi uymayan görüşmeleri baştan eler ve size vakit kazandırır. Tam liste vermek istemiyorsanız 'şu bandan başlayan' formatı iyi çalışıyor.",
        },
        {
          q: "Instagram'ım var, siteye gerek var mı?",
          a: "Instagram sizi keşfettirir, site işi bağlar. Bir düğünü baştan sona anlatan seri, paket bilgisi ve rezervasyon formu Instagram'da olmaz. Ayrıca hesabınız kapansa veya erişiminiz düşse portfolyonuz sitenizde durmaya devam eder.",
        },
      ],
      ctaTitle: "Portfolyonuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Çift fotoğrafçı seçerken neye bakıyor?",
        body: [
          "Düğün fotoğrafçısı arayan bir çift onlarca hesabı gezer. Karar anı genellikle şudur: bir fotoğrafçının tek bir düğünü baştan sona anlattığı seriyi görmek. Tek tek güzel kareler değil, bütün bir hikâye ikna eder.",
          "Instagram bunu yapamaz. Akış parçalıdır, eski işler kaybolur ve aynı çiftin fotoğrafları farklı gönderilere dağılır. Ziyaretçi sizin bir düğünü nasıl çektiğinizi göremez.",
          "İkinci mesele fiyat ve müsaitlik. Çift bir tarihi kafasına koymuştur ve o tarihte müsait misiniz, paketler ne içeriyor bilmek ister. Bunlar sitede yoksa mesaj yazmak yerine bir sonraki fotoğrafçıya geçer.",
        ],
      },
      pricing: {
        title: "Fotoğrafçı web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Portfolyo sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Kategorili galeriler, hakkımda ve iletişim. Tam ekran, hızlı açılan bir vitrin. Portfolyoyu biz yükleriz. Yeni başlayanlar için yeterli.",
          },
          {
            name: "Rezervasyonlu site",
            price: "₺85.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Her çekimin kendi seri sayfası olduğu, paket ve fiyat sayfaları, müsaitlik sorgusu ve rezervasyon formu bulunan, kendi yönetebildiğiniz yapı. Düzenli iş alan fotoğrafçılar için.",
          },
          {
            name: "Müşteri galerisi & teslim sistemi",
            price: "₺200.000'den başlayan",
            timeline: "Projeye özel",
            body: "Müşterinin şifreyle girip fotoğraflarını seçtiği ve indirdiği özel galeri, seçim onayı ve baskı siparişi akışı. Teslim süreci WeTransfer'le yönetilemeyecek hacimdeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Çekim programınızı aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Çekim türlerinizi ve hedef müşterinizi konuşuruz. Düğün fotoğrafçılığıyla ürün fotoğrafçılığının sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Seri seçimi",
            body: "Hangi işlerin öne çıkacağını birlikte seçeriz. Bu aşama kritik: baştan sona anlatılmış üç güçlü seri, dağınık iki yüz fotoğraftan daha çok iş getirir.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfa ve bir seri sayfasını görürsünüz. Bu işte tasarım görünmez olmalı; sayfa değil fotoğraf konuşmalı. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Search Console bağlantısı dahil yayına alırız. Yeni seri ekleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Fotoğrafçı web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Fotoğraflar hem net hem hızlı mı?",
            body: "Bu işin klasik ikilemi: kaliteli göstermek için büyük dosya gerekir, ama büyük dosya siteyi yavaşlatır. Görsellerin ekrana göre otomatik boyutlandırılması şart; bunu sorun.",
          },
          {
            title: "Yeni seri ekleyebilecek misiniz?",
            body: "Her çekim sonrası ajansa bağımlı kalmak, portfolyonun aylarca güncellenmemesine yol açar. Panel demosunu görmeden karar vermeyin.",
          },
          {
            title: "Fiyat ve müsaitlik görünüyor mu?",
            body: "Fiyat yazmak gelen mesaj sayısını azaltır ama gelenlerin kalitesini belirgin artırır. En azından paket aralığı olması, ikinizin de vaktini kurtarır.",
          },
          {
            title: "Fotoğraflarınız korunuyor mu?",
            body: "Sağ tık engeli ciddi bir koruma değildir. Gerçek koruma web'e koyduğunuz görselin çözünürlüğünü sınırlamak ve gerekiyorsa filigran kullanmaktır.",
          },
          {
            title: "Mobilde nasıl görünüyor?",
            body: "Yatay kareler dar ekranda küçülür. Teklif verenden mevcut bir işini isteyin ve kendi telefonunuzdan galeriye bakın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının sizin adınıza kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Photographer Website (Portfolio)",
      metaDescription:
        "Portfolio website for wedding, newborn and event photographers. Presents your work impressively, mobile-friendly and ranks on Google.",
      eyebrow: "For Photographers",
      h1: "Photographer Website",
      intro:
        "Your work speaks in frames; your site should show them as they deserve. A full-screen, fast, sharp portfolio wows visitors and moves them to book. Forpus builds sites for wedding, newborn and event photographers.",
      shortAnswer: {
        title:
          "What does a photographer website include, and what does it cost?",
        body: "A photographer's website is your own address for showing work full-screen and turning it into bookings. A typical site Forpus builds carries galleries split into categories such as weddings, newborn or events, package and pricing pages, a booking form, client testimonials, Instagram integration and a fast mobile-first gallery. A site focused on the portfolio runs ₺50,000–85,000 and goes live in one to two weeks. A full site that describes packages and takes bookings runs ₺85,000–150,000 and takes two to four weeks. A delivery system where clients log in with a password, make their selection and download files starts at ₺200,000. High-resolution frames do not slow the site down: a set of derivatives is generated for each screen size. Your images are protected against right-click and dragging, and can be shown as watermarked previews. Whether you publish prices and availability is a decision we make together: publishing them reduces enquiry volume and raises its quality.",
      },
      benefits: [
        {
          title: "Let your frames shine",
          body: "Full-screen, high-quality galleries show your work in full effect.",
        },
        {
          title: "Drive bookings",
          body: "Move an impressed visitor to a contact and booking form in one tap.",
        },
        {
          title: "Get found on Google",
          body: "A structure built to rank for searches like 'wedding photographer + city'.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Categorized portfolio galleries",
        "Package and price pages",
        "Booking / contact form",
        "Client testimonials",
        "Instagram integration",
        "Fast, mobile-friendly gallery",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Will high-resolution photos slow the site?",
          a: "No. We optimize the imagery to keep the gallery fast without losing quality.",
        },
        {
          q: "Can I update the galleries myself?",
          a: "Yes. We build a structure where you add new shoots easily.",
        },
        {
          q: "Can there be client-only galleries?",
          a: "If you'd like, we set up password-protected delivery galleries per client.",
        },
      ],
      ctaTitle: "Let's build a site for your portfolio",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "spor",
    image: "/generated/personas/spor.webp",
    service: "web",
    slug: { tr: "spor-salonu-web-sitesi", en: "gym-website" },
    tr: {
      metaTitle: "Spor Salonu & Personal Trainer Web Sitesi",
      metaDescription:
        "Spor salonu, fitness ve personal trainer için web sitesi. Üyelik, ders programı ve online iletişim. Mobil uyumlu. Ücretsiz teklif alın.",
      eyebrow: "Spor Salonuna Özel",
      h1: "Spor Salonu & PT Web Sitesi",
      intro:
        "Yeni üyeler bir salon seçmeden önce ortamı, hocaları ve fiyatları internetten inceliyor. Enerjik, net ve üyeliğe yönlendiren bir site, deneme dersini üyeliğe çevirir. Forpus spor salonları ve personal trainer'lara özel siteler tasarlıyor.",
      shortAnswer: {
        title: "Spor salonu web sitesi ne içerir, ne kadar tutar?",
        body: "Spor salonu ve personal trainer web sitesi, ortamınızı, ders programınızı ve üyelik paketlerinizi gösterdiğiniz, deneme dersini üyeliğe çevirdiğiniz kendi adresinizdir. Forpus'un kurduğu tipik bir salon sitesinde üyelik ve paket sayfaları, haftalık ders programı ya da takvim, antrenör tanıtımları, deneme dersi formu, salon galerisi ile çalışma saatleri ve mobil uyumlu hızlı bir tasarım bulunur. Tanıtıma odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Programın panelden güncellendiği, paketlerin ayrı ayrı anlatıldığı tam bir salon sitesi ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Online üyelik satışı ve ders rezervasyonu işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Ders programını değiştirmek için bize dönmenize gerek kalmaz. Alan adı ve site sizin adınıza kaydedilir. Galeriye stok fotoğraf konmaz, kendi salonunuz çekilir; üye olacak kişi gerçekten gireceği yeri görmek ister. Deneme dersi daveti her sayfada tek ve net bir düğme olarak durur. Google İşletme Profili bağlantısı teslimde kurulur.",
      },
      benefitsTitle: "Spor salonu web sitesi işletmenize ne kazandırır?",
      benefits: [
        {
          title: "Üyeliğe yönlendirin",
          body: "Deneme dersi ve üyelik formuyla ilgilenen ziyaretçiyi hemen harekete geçirin.",
        },
        {
          title: "Ortamı gösterin",
          body: "Salon, ekipman ve antrenör fotoğraflarıyla enerjinizi ekrana taşıyın.",
        },
        {
          title: "Program & PT",
          body: "Ders programı ve personal trainer tanıtımıyla doğru üyeyle eşleşin.",
        },
      ],
      featuresTitle: "Spor salonu sitenizde neler olur?",
      features: [
        "Üyelik ve paket sayfaları",
        "Ders programı / takvim",
        "Antrenör (PT) tanıtımı",
        "Deneme dersi / iletişim formu",
        "Galeri ve çalışma saatleri",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Ders programını kendim güncelleyebilir miyim?",
          a: "Evet. Programı kolayca güncelleyebileceğiniz bir yapı kurarız.",
        },
        {
          q: "Üyelik / ödeme alır mı?",
          a: "İhtiyaca göre üyelik formu ve online ödeme yönlendirmesini kurarız.",
        },
        {
          q: "PT'leri ayrı tanıtabilir miyiz?",
          a: "Evet. Her antrenör için tanıtım ve uzmanlık bölümü kurgularız.",
        },
        {
          q: "Spor salonu web sitesi ne kadar tutar?",
          a: "Paket, galeri ve deneme dersi formu olan bir tanıtım sitesi ₺50.000 bandında başlar. Ders programı takvimi ve antrenör profilleri bulunan bir site ₺90.000–150.000 aralığındadır. Online üyelik satışı, ders rezervasyonu ve mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Online üyelik satışı kurabilir misiniz?",
          a: "Evet. Üye paketi seçer, kredi kartıyla öder ve üyeliği otomatik başlar; aylık yenilenen abonelik modeli de kurulabilir. Sanal POS başvurusu sizin şirketiniz adına yapılır, biz teknik entegrasyonu yaparız.",
        },
        {
          q: "Ders rezervasyon sistemi nasıl çalışıyor?",
          a: "Üye uygulamadan veya siteden derse kayıt olur, kontenjan dolduğunda sistem kapatır, gelmeyenler için iptal kuralı tanımlanır. Grup dersi veren stüdyolarda bu sistem hem kontenjan karmaşasını hem de telefon trafiğini bitiriyor.",
        },
        {
          q: "Sitede fiyat yazmalı mıyım?",
          a: "Bu sektörde evet, net tavsiyemiz bu yönde. Fiyat gizleyen salonlar ziyaretçinin büyük kısmını daha ilk ekranda kaybediyor. Kampanyalı fiyat vermek istemiyorsanız 'şu bandan başlayan' formatı iyi çalışıyor.",
        },
        {
          q: "Google Haritalar'da öne çıkmama yardım eder misiniz?",
          a: "Evet. İşletme Profilinizi kurar veya düzenler, kategori ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama adımını sizin tamamlamanız gerekir.",
        },
      ],
      ctaTitle: "Salonunuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Yeni üye kaydolmadan önce neyi merak ediyor?",
        body: [
          "Salon arayan kişi üç şeyi bilmek ister: fiyat, ortam ve program. Bu üçünü bulamazsa salona gelmez, bir sonrakine bakar. Özellikle fiyat gizlendiğinde çoğu kişi 'pahalıdır' varsayıp eler.",
          "Ortam meselesi de fotoğrafla çözülür. Ekipmanın yeni olup olmadığı, salonun kalabalıklığı, soyunma odasının hali; bunlar kararı doğrudan etkiler ve sadece görselle anlatılır.",
          "En çok kaçırılan fırsat ise deneme dersi. Kararsız kişiyi üyeliğe değil, tek bir denemeye davet etmek çok daha kolay dönüşür. Sitede bu davet net değilse, gelen ziyaretçi hiçbir adım atmadan çıkar.",
        ],
      },
      pricing: {
        title: "Spor salonu web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Salon tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Üyelik paketleri, galeri, antrenör tanıtımı, harita ve çalışma saatleri. Deneme dersi formu ve WhatsApp. Tek şubeli salonlar ve bireysel çalışan eğitmenler için yeterli.",
          },
          {
            name: "Programlı salon sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Ders programı takvimi, paket karşılaştırması, antrenör profilleri ve online kayıt formu. Grup dersi veren, program yoğunluğu yüksek salonlar için.",
          },
          {
            name: "Üyelik & rezervasyon sistemi",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Online üyelik satışı, ders rezervasyonu, kontenjan yönetimi, üye paneli ve mobil uygulama. Ders bazlı çalışan stüdyolar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Salon düzeninizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Salonunuzun konumlandırmasını ve üye profilinizi konuşuruz. Klasik bir fitness salonuyla butik bir pilates stüdyosunun sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik ve görsel",
            body: "Paket bilgileri, ders programı ve antrenör tanıtımlarını alırız. Bu işte salon fotoğrafları belirleyici olduğu için mevcut görselleri değerlendirir, gerekiyorsa çekim önerisinde bulunuruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi salonun enerjisini ekrana taşımak. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Program ve fiyat güncellemesi için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Spor salonu sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Fiyat görünüyor mu?",
            body: "Bu sektörde fiyat gizlemek en çok kaybettiren tercih. Ziyaretçinin çoğu 'sormak' istemez, pahalı varsayıp çıkar. En azından paket aralığı yazın.",
          },
          {
            title: "Programı kendiniz güncelleyebiliyor musunuz?",
            body: "Ders programı sık değişir. Her değişiklik için ajansa haber vermek zorundaysanız program yanlış kalır ve üyeler boşuna gelir.",
          },
          {
            title: "Deneme dersi daveti net mi?",
            body: "Üyelik satmak yerine tek bir denemeye davet etmek çok daha kolay dönüşür. Bu davet ilk ekranda görünmeli.",
          },
          {
            title: "Fotoğraflar gerçek salonunuz mu?",
            body: "Stok fotoğraf kullanılan salon siteleri anında belli oluyor ve güven kaybettiriyor. Kendi salonunuzun iyi ışıkta çekilmesi en değerli yatırımdır.",
          },
          {
            title: "Google İşletme Profili kurulu mu?",
            body: "Salon aramalarının büyük kısmı 'yakınımdaki' şeklinde ve haritadan geliyor. İşletme Profili olmadan sadece site kurmak eksik bir iştir.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Üyelerin neredeyse tamamı telefondan giriyor. Teklif verenden mevcut bir işini isteyin ve kendi telefonunuzdan açın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Gym & Personal Trainer Website",
      metaDescription:
        "Website for gyms, fitness studios and personal trainers. Membership, class schedule and online contact. Mobile-friendly. Get a free quote.",
      eyebrow: "For Gyms",
      h1: "Gym & Personal Trainer Website",
      intro:
        "New members check the space, the trainers and the prices online before choosing a gym. An energetic, clear site that drives sign-ups turns a trial class into a membership. Forpus builds sites for gyms and personal trainers.",
      shortAnswer: {
        title: "What does a gym website include, and what does it cost?",
        body: "A gym or personal trainer website is your own address for showing the space, the class schedule and the membership packages, and turning a trial session into a membership. A typical site Forpus builds carries membership and package pages, a weekly class schedule or calendar, trainer profiles, a trial-session form, a gallery with opening hours, and a fast mobile-first design. A site focused on introducing the gym runs ₺50,000–85,000 and goes live in one to two weeks. A full site where the schedule is updated from a panel and each package is described runs ₺90,000–150,000 and takes two to four weeks. Online membership sales and class booking start at ₺220,000. No stock photography goes in the gallery — your own gym is photographed, because someone about to join wants to see the room they will actually walk into.",
      },
      benefits: [
        {
          title: "Drive sign-ups",
          body: "Move interested visitors to act with a trial-class and membership form.",
        },
        {
          title: "Show the space",
          body: "Bring your energy to the screen with gym, equipment and trainer photos.",
        },
        {
          title: "Schedule & PT",
          body: "Match the right member with a class schedule and personal-trainer profiles.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Membership and package pages",
        "Class schedule / calendar",
        "Trainer (PT) profiles",
        "Trial-class / contact form",
        "Gallery and opening hours",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can I update the class schedule myself?",
          a: "Yes. We build a structure where you update the schedule easily.",
        },
        {
          q: "Does it take membership / payments?",
          a: "We set up a membership form and online payment redirect as needed.",
        },
        {
          q: "Can we feature PTs separately?",
          a: "Yes. We design a profile and specialty section for each trainer.",
        },
      ],
      ctaTitle: "Let's build a site for your gym",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "petotel",
    image: "/generated/personas/petotel.webp",
    service: "web",
    slug: { tr: "pet-otel-web-sitesi", en: "pet-boarding-website" },
    tr: {
      metaTitle: "Pet Otel & Hayvan Pansiyonu Web Sitesi",
      metaDescription:
        "Pet otel, kedi pansiyonu ve köpek oteli için web sitesi ve tarihli rezervasyon. Odaları gösteren, güven veren, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Pet Otele Özel",
      h1: "Pet Otel & Hayvan Pansiyonu Web Sitesi",
      intro:
        "Tatile çıkan sahip, dostunu bırakacağı yeri gözüyle görmek ister. Odaları, günlük düzeni ve kabul şartlarını gösteren, tarih verip rezervasyon alabildiğiniz bir site, o kararı sizin lehinize çevirir. Forpus pet oteller ve hayvan pansiyonları için site kuruyor.",
      shortAnswer: {
        title: "Pet otel web sitesi ne içerir, ne kadar tutar?",
        body: "Pet otel web sitesi, odalarınızı ve günlük düzeninizi gösterdiğiniz, tarih vererek rezervasyon aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir pet otel sitesinde kedi ve köpek için ayrı konaklama sayfaları, giriş-çıkış tarihi seçilen bir rezervasyon formu, dolu ve kapalı tarih yönetimi, hayvanın mamasını, ilaçlarını ve alışkanlıklarını topladığınız ön bilgi formu, gerçek oda ve bahçe fotoğrafları, günlük fotoğraf paylaşımının nasıl işlediğini anlatan bir bölüm, aşı ve kabul şartları, Google harita bağlantısı ve mobil uyumlu hızlı bir tasarım bulunur. Odaları ve şartları anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Tarihli rezervasyon formunun ve ön bilgi formunun çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Doluluk takvimi ve sahip paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Bayram ve okul tatillerinde talep birkaç haftaya sıkıştığı için erken rezervasyon çağrısı ilk ekrana konur. Galeriye stok fotoğraf konmaz; sahip, dostunu bırakacağı odanın gerçeğini görmek ister. Alan adı ve site sizin adınıza kaydedilir; kapasitenizi ve kapalı tarihleri panelden kendiniz güncellersiniz.",
      },
      benefitsTitle: "Pet otel web sitesi işletmenize ne kazandırır?",
      benefits: [
        {
          title: "Tarihli rezervasyon",
          body: "Sahip giriş-çıkış tarihini kendi seçsin; bayram doluluğunuz telefon başında değil, siteden dolsun.",
        },
        {
          title: "Görünce güvenen sahip",
          body: "Odaları, bahçeyi ve günlük düzeni gösterin; 'burada bırakırım' kararı sitede verilsin.",
        },
        {
          title: "Google'da bulunun",
          body: "'Yakınımdaki pet otel' ve 'kedi pansiyonu' aramalarında haritada görünün.",
        },
      ],
      featuresTitle: "Pet otel sitenizde neler olur?",
      features: [
        "Kedi ve köpek konaklama sayfaları",
        "Tarihli rezervasyon formu ve müsaitlik",
        "Oda, bahçe ve oyun alanı galerisi",
        "Ön bilgi formu (mama, ilaç, aşı)",
        "Günlük fotoğraf ve video paylaşımı",
        "Google harita, çalışma saatleri, WhatsApp",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Tarihli rezervasyon sistemi kurar mısınız?",
          a: "Evet. Basit bir tarih seçmeli talep formundan, kapasiteyi takip eden ve dolu günleri kapatan bir rezervasyon takvimine kadar ihtiyacınıza göre kurarız. Küçük pansiyonların çoğunda tarih ve hayvan bilgisi formu artı WhatsApp yönlendirmesi yetiyor; oda sayısı arttıkça takvimli yapı kendini gerektiriyor.",
        },
        {
          q: "Sahiplere günlük fotoğraf ve videoyu siteden gönderebilir miyiz?",
          a: "Evet. Her konaklama için sahibe özel bir bağlantı üretiriz; o günün fotoğraflarını panelden yüklersiniz, sahip bağlantıdan görür. Bu hem WhatsApp'ta dağılan görüntüleri tek yerde toplar hem de konaklama bitince sahibe hoş bir özet bırakır.",
        },
        {
          q: "Canlı kamera yayını koyabilir miyiz?",
          a: "Evet, teknik olarak zor değil; kameraların yayınını siteye gömer ya da sahibe özel bir bağlantıyla açarız. Dürüst uyarı: kamera sürekli açık kaldığında her hareket bir soru doğuruyor ve sizi gün boyu telefonda tutabiliyor. Otellerin çoğu bunun yerine günde bir iki kez gönderilen fotoğraf ve kısa videoyla daha rahat ediyor. İkisini de kurabiliriz, kararı işleyişinize bakarak birlikte veririz.",
        },
        {
          q: "Bayram ve yaz doluluğunu sitede nasıl yönetiyoruz?",
          a: "İki şeyle: dolu tarihleri kapatabildiğiniz bir takvim ve öne çıkan bir erken rezervasyon çağrısı. Talebin toplandığı haftalar belli olduğu için o dönemlerde siteyi 'yer var mı' sorusuna değil, 'hangi tarihler için ayırayım' sorusuna göre kurgularız. Dolan tarihler için bekleme listesi formu da ekleyebiliriz.",
        },
        {
          q: "Kedi ve köpek için ayrı sayfa şart mı?",
          a: "Şart değil ama kazandırıyor. 'Kedi pansiyonu' arayanla 'köpek oteli' arayan farklı şeyler merak ediyor: biri kedinin köpekten ayrı bir bölümde kalıp kalmadığını, diğeri bahçeyi ve günlük yürüyüşü. Ayrı sayfalarda hem sahip aradığını bulur hem Google iki aramada da sizi gösterebilir.",
        },
        {
          q: "Aşı ve kabul şartlarını sitede yazmak zorunda mıyım?",
          a: "Zorunlu değil ama en çok işe yarayan sayfalardan biri. Aşı ve parazit koşullarını, kabul ettiğiniz yaş ve ırkları, teslim ile alma saatlerini ve ücrete dahil olmayan kalemleri yazdığınızda uygun olmayan talep baştan eleniyor, kapıda tartışma çıkmıyor. Bu işletmeler ruhsatla çalışıp sorumlu yönetici bulundurduğu için ruhsat ve sorumlu yönetici bilgisini de aynı sayfada göstermenizi öneriyoruz; sahibin en çok tereddüt ettiği yer burası.",
        },
        {
          q: "Otelim bir veteriner kliniğinin içinde, tanıtımda sınır var mı?",
          a: "Pet otel işletmek veteriner hekimlik icrası değil; konaklama tarafında yorum yayınlamak, kampanya duyurmak ve fiyat yazmak serbest. Ancak işletme bir kliniğin içindeyse ya da sahibi veteriner hekimse, hekimlik için geçerli tanıtım kuralları peşinden geliyor. Bu durumda klinik hizmetlerini ayrı bir bölümde ve o çerçevede kurgular, otel içeriğiyle karıştırmayız. Sınırda gördüğümüz başlıkları size ayrıca söyleriz.",
        },
        {
          q: "Google Haritalar'da bulunmama yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. Google İşletme Profilinizi kurar veya düzenler, kategori ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Elinizde bir rezervasyon geçmişi varsa yeni yapıya taşınıp taşınamayacağını başta netleştiririz.",
        },
      ],
      ctaTitle: "Oteliniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Tatile çıkan sahip neye bakıyor?",
        body: [
          "Pet otel araması, otel araması gibi başlamaz; endişeyle başlar. Sahip önce 'burada ne oluyor' sorusunun cevabını arar: odalar nasıl, kedi köpekten ayrı mı, gün içinde ne yapılıyor, ben nasıl haber alacağım. Bu dördü net değilse fiyat sormaya bile gelmez.",
          "İkinci kırılma tarihte olur. Sahip belirli bir hafta için yer arıyordur; sitenizde tarih verip talep bırakacağı bir yer yoksa aynı soruyu yazmak için mesaj kutusuna geçmesi gerekir. Bayram haftasında aynı soruyu yüz kişiye yazmak da, yüz kişiye tek tek cevap vermek de kimsenin işine gelmiyor.",
          "Üçüncüsü, bu işte talebin yılın birkaç haftasına sıkışmasıdır. Bayram ve okul tatili yaklaşırken arama patlar, sonra düşer. O haftalarda haritada ve aramada görünmüyorsanız yılın en dolu döneminin çoğunu kaçırırsınız. Kendi siteniz olmadığında elinizde bir Instagram profili ve haritadaki birkaç yorum kalır; odalarınızı, kabul şartlarınızı ve sahibe nasıl haber verdiğinizi anlatacak yer hiçbir yerde yoktur.",
        ],
      },
      pricing: {
        title: "Pet otel web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Konaklama sayfaları, oda ve bahçe galerisi, kabul şartları, harita ve çalışma saatleri. Tek tık arama ve WhatsApp. Tek şubeli pansiyonlar için yeterli.",
          },
          {
            name: "Rezervasyonlu site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Giriş-çıkış tarihi seçilen rezervasyon formu, hayvan ön bilgi formu, kedi ve köpek için ayrı sayfalar, dolu tarih yönetimi. Bayram doluluğunu siteden toplamak isteyenler için.",
          },
          {
            name: "Doluluk takvimi & sahip paneli",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Kapasite takibi, oda bazlı takvim, konaklama geçmişi ve sahibe özel günlük fotoğraf bağlantısı. Oda sayısı defterle yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Günlük işleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Kapasitenizi, kedi ve köpek düzeninizi, kabul şartlarınızı ve yoğun dönemlerinizi konuşuruz. Sekiz odalı bir pansiyonla iki odalı bir ev pansiyonunun sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Fotoğraf ve içerik",
            body: "Bu sektörde site fotoğrafla ayakta duruyor, o yüzden en çok emek buraya gidiyor. Odaları, bahçeyi ve günlük düzeni nasıl çekeceğinizi anlatan bir çekim listesi gönderiyoruz; elinizde uygun kare yoksa birlikte plan yaparız.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, sahibin odayı görüp içinin rahatlaması. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Kapalı tarihleri ve kapasiteyi kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Pet otel web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Gerçek oda fotoğrafı var mı?",
            body: "Bu sektörde stok fotoğraf ters teper. Sahip, dostunun kalacağı odayı görmek ister; internetten alınmış kusursuz bir kedi fotoğrafı güven değil şüphe üretir. Ajans size 'görsel bizde' diyorsa neyi kastettiğini sorun.",
          },
          {
            title: "Tarih verilebiliyor mu?",
            body: "Rezervasyon formu tarih almıyorsa form değil, sadece bir iletişim kutusudur. Sahibin giriş ve çıkış tarihini seçebildiğinden emin olun.",
          },
          {
            title: "Kapalı tarihleri kendiniz kapatabiliyor musunuz?",
            body: "Doluluk haftadan haftaya değişir. Her kapalı gün için ajansa haber vermek zorundaysanız takvim yanlış kalır ve boşa rezervasyon alırsınız.",
          },
          {
            title: "Kabul şartları sayfası var mı?",
            body: "Aşı koşulları, kabul edilen yaş ve ırklar, teslim saatleri ve ücrete dahil olmayan kalemler yazılı değilse aynı tartışma kapıda tekrar eder.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Rezervasyon aramalarının neredeyse tamamı telefondan yapılıyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının işletmeniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Pet Boarding & Hotel Website Design",
      metaDescription:
        "Websites for pet hotels, cat boarding and dog boarding, with date-based booking. Show your rooms, build trust, work on mobile. Get a free quote.",
      eyebrow: "For Pet Boarding",
      h1: "Pet Boarding & Hotel Website",
      intro:
        "An owner going away wants to see where their dog or cat will stay. A site that shows the rooms, the daily routine and the house rules — and takes a booking with real dates — turns that decision your way. Forpus builds sites for pet hotels and boarding facilities.",
      shortAnswer: {
        title:
          "What does a pet boarding website include, and what does it cost?",
        body: "A pet boarding website is your own address for showing the rooms, explaining the daily routine and taking bookings with dates. A typical site we build has separate pages for cat and dog boarding, a booking form with check-in and check-out dates, closed-date management, an intake form for food, medication and habits, real photos of the rooms and garden, a section explaining how daily photo updates work, vaccination and admission rules, a Google Maps link and a fast, mobile-friendly design. A presentation site covering rooms and rules starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full site with a working booking form and intake form sits in the ₺90,000–150,000 band over two to four weeks. Once an occupancy calendar and owner panel are involved, you are looking at a project starting from ₺220,000. Demand compresses into a few holiday weeks, so an early-booking call sits on the first screen. We do not use stock photography here: owners want to see the actual room.",
      },
      benefits: [
        {
          title: "Bookings with real dates",
          body: "Let owners pick their own check-in and check-out; fill holiday weeks from the site instead of the phone.",
        },
        {
          title: "Trust through seeing",
          body: "Show the rooms, the garden and the daily routine so the decision is made on your site.",
        },
        {
          title: "Be found on Google",
          body: "Show up on the map for 'pet boarding near me' and 'cat boarding' searches.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Separate cat and dog boarding pages",
        "Date-based booking form and availability",
        "Room, garden and play area gallery",
        "Intake form (food, medication, vaccines)",
        "Daily photo and video updates",
        "Google Maps, opening hours, WhatsApp",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you build a booking system with dates?",
          a: "Yes. From a simple date-picker request form up to a booking calendar that tracks capacity and closes full days. Most small facilities do fine with a date and pet-details form plus WhatsApp; as the room count grows, a calendar starts to pay for itself.",
        },
        {
          q: "Can we send owners daily photos through the site?",
          a: "Yes. We create a private link for each stay; you upload that day's photos from the panel and the owner opens the link. It keeps updates in one place instead of scattered across WhatsApp, and leaves the owner a nice summary at the end.",
        },
        {
          q: "Can we add a live camera feed?",
          a: "Yes, it is not technically hard: we embed the stream or open it behind a private link. An honest warning, though — a permanently open camera turns every movement into a question and can keep you on the phone all day. Most facilities are happier sending photos and short clips once or twice a day. We can build either; we decide together based on how you actually work.",
        },
        {
          q: "Do we need separate pages for cats and dogs?",
          a: "Not required, but it pays off. Someone searching for cat boarding and someone searching for a dog hotel want different answers: one wants to know cats are housed away from dogs, the other wants the garden and the daily walk. Separate pages let owners find what they came for and let Google show you for both searches.",
        },
        {
          q: "My facility is inside a veterinary clinic. Are there limits on promotion?",
          a: "Running a boarding facility is not the practice of veterinary medicine, so publishing reviews, running campaigns and listing prices are all fine on the boarding side. But if the business sits inside a clinic or is owned by a vet, the advertising rules that bind vets follow along. In that case we set the clinical services out in a separate section under those rules and keep them apart from the boarding content.",
        },
        {
          q: "Can you refresh my existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones.",
        },
      ],
      ctaTitle: "Let's build a site for your facility",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "petkuafor",
    image: "/generated/personas/petkuafor.webp",
    service: "web",
    slug: { tr: "pet-kuaforu-web-sitesi", en: "pet-grooming-website" },
    tr: {
      metaTitle: "Pet Kuaförü & Pet Bakım Salonu Web Sitesi",
      metaDescription:
        "Pet kuaförü ve evcil hayvan bakım salonlarına özel web sitesi. Öncesi-sonrası galerisi, ırk bazlı fiyat listesi ve online randevu. Ücretsiz teklif alın.",
      eyebrow: "Pet Kuaförüne Özel",
      h1: "Pet Kuaförü Web Sitesi",
      intro:
        "Bu işte satışı yapan şey galeridir: sahibi ikna eden, kendi köpeğine benzeyen bir hayvanın önce ve sonra karesidir. Kendi çalışmalarınızı ırka göre süzülebilir biçimde gösteren ve randevuyu oracıkta alan bir site, o kareyi işe çevirir. Forpus pet kuaförleri için site kuruyor.",
      shortAnswer: {
        title: "Pet kuaförü web sitesi ne içerir, ne kadar tutar?",
        body: "Pet kuaförü web sitesi, hizmetlerinizi anlattığınız, tıraş ve bakım sonuçlarınızı gösterdiğiniz ve randevu aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir pet salonu sitesinde ırk ve tüy yapısına göre ayrılmış hizmet sayfaları, ırk filtresiyle gezilen bir öncesi-sonrası galerisi, online randevu ile WhatsApp yönlendirmesi, boy ve tüy durumuna göre değişen bakım paketleri, müşteri yorumları, kampanya bölümü, Google harita bağlantısı ve mobil uyumlu hızlı bir tasarım bulunur. Galeri ve fiyat listesi odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Irk filtreli galerinin ve online randevunun çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Hizmete göre farklı uzunlukta slot ayıran takvimli randevu sistemi işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Galeri stok fotoğrafla değil, kendi çalışmalarınızla kurulur. Veteriner hekimlik yapılmadığı için metinlerde tıbbi iddia kullanılmaz; anlatım bakım, hijyen ve hayvanın salonda geçirdiği konfor üzerinden kurulur. Alan adı ve site sizin adınıza kaydedilir; fiyat listesini ve galeriyi panelden kendiniz güncellersiniz.",
      },
      benefitsTitle: "Pet kuaförü web sitesi salonunuza ne kazandırır?",
      benefits: [
        {
          title: "Öncesi-sonrası kanıtı",
          body: "Kendi çalışmalarınızın önce-sonra karesi, sahibin 'buraya bırakırım' demesini sağlayan en güçlü argüman.",
        },
        {
          title: "Online randevu",
          body: "Sahip ırkı, hizmeti ve saati telefondan seçsin; siz masadayken takviminiz kendiliğinden dolsun.",
        },
        {
          title: "Google'da bulunun",
          body: "'Yakınımdaki pet kuaförü' aramalarında haritada, yorumlarla ve galeriyle görünün.",
        },
      ],
      featuresTitle: "Pet kuaförü sitenizde neler olur?",
      features: [
        "Hizmet ve fiyat listesi (ırk / boy bazlı)",
        "Irk filtreli öncesi-sonrası galerisi",
        "Online randevu / WhatsApp entegrasyonu",
        "Müşteri yorumları ve kampanya bölümü",
        "Google harita ve çalışma saatleri",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Öncesi-sonrası fotoğraflarını siteye koyabilir miyim?",
          a: "Evet, bu sektörde satışı yapan bölüm burasıdır ve önünde bir engel yok — veteriner hekimlik icrası söz konusu olmadığı için sağlıkta tanıtım kısıtları sizi bağlamıyor. Galeriyi ırka ve hizmete göre süzülebilir kurarız. Karede müşterinin kendisi ya da evi görünüyorsa yayınlamadan önce onayını almanızı öneririz; bu hukuki bir zorunluluk değil, ilişki gereğidir.",
        },
        {
          q: "Fiyat listesini ırka ve boya göre gösterebilir miyiz?",
          a: "Evet, doğru kurgu da budur. Tek bir 'tıraş' fiyatı yazan salonlar telefonda sürekli aynı pazarlığı yapıyor. Irk, boy ve tüy durumuna göre bantlar tanımlar, keçeleşme gibi ek kalemleri not olarak gösteririz. Böylece sahip kapıdan doğru beklentiyle geliyor.",
        },
        {
          q: "Online randevu sistemi kurar mısınız?",
          a: "Evet. Basit WhatsApp yönlendirmesinden hizmet ve saat seçmeli online takvime kadar ihtiyacınıza göre kurarız. Pet kuaförlerinde işin süresi ırka göre değiştiği için takvimi, seçilen hizmete göre farklı uzunlukta slot ayıracak biçimde kurgularız; yoksa günün ortası boşa çıkıyor.",
        },
        {
          q: "Müşteri yorumlarını siteye koyabilir miyiz?",
          a: "Evet, serbest. Bu sektör sağlık mevzuatına tabi olmadığı için yorum, puan ve Google değerlendirmelerini sitede gösterebilirsiniz. Google İşletme Profilinizdeki yorumları siteye taşıyan bir bölüm kurarız; yorum sayısı arttıkça kendiliğinden güncellenir.",
        },
        {
          q: "Kampanya ve paket duyurusu yapabilir miyiz?",
          a: "Evet. Panelden güncelleyebileceğiniz bir kampanya alanı kurarız; bayram paketi, ilk gelişe özel bakım ya da abonelik gibi duyuruları kendiniz yayına alırsınız. Bu sektörde bunun önünde mevzuat engeli yok.",
        },
        {
          q: "Salonumun tüy alerjisi ve hijyen düzenini nasıl anlatalım?",
          a: "Bu, sahiplerin sorup da sitelerde cevabını bulamadığı konuların başında geliyor. Makas ve tarakların her hayvandan sonra nasıl temizlendiğini, küvet düzenini ve kullandığınız ürünleri sade bir sayfada anlatırız. Tıbbi iddia kurmadan, sadece işleyişi anlatarak; çünkü burada veteriner hekimlik yapılmıyor ve tedavi vaadi verilmemeli.",
        },
        {
          q: "Google Haritalar'da bulunmama yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. Google İşletme Profilinizi kurar veya düzenler, kategori ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Instagram'daki fotoğraflarımı siteye taşıyabilir miyiz?",
          a: "Evet, taşırız. Ama sitedeki galeriyi Instagram akışının kopyası olarak kurmayı önermiyoruz: akış eskidikçe kare kayboluyor, ırka göre süzülemiyor ve fiyat listesiyle bağlanamıyor. En iyi işlerinizi seçip ırk ve hizmet etiketiyle sitede kalıcı hale getiririz.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz.",
        },
      ],
      ctaTitle: "Salonunuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Sahip köpeğini kime bırakacağına nasıl karar veriyor?",
        body: [
          "Evcil hayvanını ilk kez bir salona bırakacak kişi için bu, tedirgin edilerek verilen bir karardır. Hayvan orada yalnız kalacak, makasla ve suyla iş görülecek, kendisi yanında olmayacak. Bu yüzden fiyat listesinden önce başka bir şeye bakar: daha önce hangi hayvanlar bu masadan nasıl kalkmış.",
          "Bu sorunun cevabı yalnızca fotoğrafta var. Bir pomeranian sahibi, başka bir pomeranian'ın önce-sonra karesini görmeden ikna olmuyor; kendi ırkını, kendi tüy tipini görmek istiyor. Instagram bunu kısmen gösterir ama akış eskidikçe kare kaybolur, ırka göre süzülemez, fiyat listesi taşımaz ve haritada çıkmaz.",
          "İkinci kayıp randevu anında yaşanıyor. Sahip karar verdiği anda saat seçebileceği ya da tek tıkla WhatsApp'a düşebileceği bir yer bulamazsa o an geçiyor ve arama sonuçlarındaki bir sonraki salona geçiliyor. Sitenin bu sektördeki asıl işi ikisidir: kanıtı göstermek ve kararı harekete çevirmek.",
        ],
      },
      pricing: {
        title: "Pet kuaförü web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Galeri ve fiyat sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Hizmet ve fiyat listesi, öncesi-sonrası galerisi, harita ve çalışma saatleri. Tek tık arama ve WhatsApp. Tek salonlu işletmeler için yeterli.",
          },
          {
            name: "Randevulu salon sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Irk filtreli galeri, ırk ve boya göre fiyat bantları, online randevu yönlendirmesi, yorum ve kampanya bölümü. Takvimini siteden doldurmak isteyen salonlar için.",
          },
          {
            name: "Takvimli randevu sistemi",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Hizmete göre farklı uzunlukta slot ayıran takvim, müşteri ve hayvan kayıt geçmişi, hatırlatma bildirimleri. Birden fazla masayla çalışıyorsanız.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Salon düzeninizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi ırklarla çalıştığınızı, hizmet sürelerinizi ve fiyat bantlarınızı konuşuruz. Yalnız küçük ırk alan bir salonla her boydan hayvan kabul eden bir salonun sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Galeri ve içerik",
            body: "Bu sektörde satışı galeri yapıyor, o yüzden en çok emek buraya gidiyor. Mevcut önce-sonra karelerinizi birlikte ayıklar, ırk ve hizmet etiketlerini kurar, eksik kalan ırklar için çekim listesi bırakırız.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, galeriyi öne çıkarıp randevuyu bir tık uzakta tutmak. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Galeriyi ve fiyat listesini kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Pet kuaförü web sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Galeriyi kendiniz güncelleyebiliyor musunuz?",
            body: "Bu sektörde galeri haftalık büyür. Her yeni önce-sonra karesi için ajansa e-posta atmak zorundaysanız galeri altı ayda ölür. Panelden yükleyip etiketleyebildiğinizden emin olun.",
          },
          {
            title: "Galeri ırka göre süzülüyor mu?",
            body: "Sahip kendi ırkını arıyor. Yüz karelik tek bir yığın, ikna etmek yerine yorar. Irk ve hizmet filtresi olup olmadığını sorun.",
          },
          {
            title: "Fiyat bantlı mı, tek rakam mı?",
            body: "Tek 'tıraş' fiyatı yazan site telefonda pazarlığı bitirmez. Irk, boy ve tüy durumuna göre bant tanımlanabildiğinden emin olun.",
          },
          {
            title: "Randevu süresi hizmete göre değişiyor mu?",
            body: "Bir yorkshire ile bir golden aynı sürede bitmez. Takvim her randevuya aynı süreyi ayırıyorsa günün ortası ya boş kalır ya taşar.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Galeri ağır fotoğraf demektir ve bu siteleri en çok yavaşlatan şeydir. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının işletmeniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Pet Grooming Salon Website Design",
      metaDescription:
        "Websites for pet grooming salons: before-and-after gallery, breed-based price list and online booking. Get a free quote.",
      eyebrow: "For Pet Grooming",
      h1: "Pet Grooming Salon Website",
      intro:
        "In this trade the gallery does the selling: the before-and-after shot of a dog that looks like theirs. A site that shows your own work, filterable by breed, and takes the booking on the spot turns that shot into work. Forpus builds sites for pet grooming salons.",
      shortAnswer: {
        title:
          "What does a pet grooming website include, and what does it cost?",
        body: "A pet grooming website is your own address for setting out your services, showing your results and taking bookings. A typical salon site we build has service pages split by breed and coat type, a before-and-after gallery you can filter by breed, online booking with WhatsApp, grooming packages that vary by size and coat, customer reviews, a promotions section, a Google Maps link and a fast, mobile-friendly design. A gallery-and-price-list site starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full site with a filterable gallery and working online booking sits in the ₺90,000–150,000 band over two to four weeks. Once a calendar that allocates different slot lengths per service is involved, you are looking at a project starting from ₺220,000. The gallery is built from your own work, never stock photography. No veterinary medicine is practised here, so the copy carries no medical claims: it talks about grooming, hygiene and the animal's comfort in the salon.",
      },
      benefits: [
        {
          title: "Before-and-after proof",
          body: "Your own before-and-after shots are the strongest argument for an owner deciding to leave their dog with you.",
        },
        {
          title: "Online booking",
          body: "Let owners pick breed, service and time from their phone while you are at the table.",
        },
        {
          title: "Be found on Google",
          body: "Show up on the map for 'pet grooming near me', with your reviews and your gallery.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service and price list (by breed / size)",
        "Before-and-after gallery with breed filter",
        "Online booking / WhatsApp integration",
        "Customer reviews and promotions section",
        "Google Maps and opening hours",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can I put before-and-after photos on the site?",
          a: "Yes — this is the section that does the selling, and nothing stands in the way. No veterinary medicine is being practised, so the promotional restrictions that apply in healthcare do not bind you. We make the gallery filterable by breed and service. Where the customer or their home is visible in a shot, we suggest asking permission before publishing; that is courtesy rather than a legal requirement.",
        },
        {
          q: "Can we show prices by breed and size?",
          a: "Yes, and that is the right way to set it up. Salons that publish a single 'grooming' price end up having the same negotiation on the phone every time. We define bands by breed, size and coat condition, and note extras such as matting separately, so owners arrive with the right expectation.",
        },
        {
          q: "Can you build an online booking system?",
          a: "Yes. From a simple WhatsApp hand-off up to an online calendar with service and time selection. Because grooming time varies by breed, we set the calendar to allocate different slot lengths per service; otherwise the middle of the day goes to waste.",
        },
        {
          q: "Can we publish customer reviews?",
          a: "Yes, freely. This sector is not covered by healthcare advertising rules, so reviews, ratings and Google feedback can all appear on the site. We build a section that pulls the reviews from your Google Business Profile and keeps itself up to date.",
        },
        {
          q: "Can you refresh my existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones.",
        },
      ],
      ctaTitle: "Let's build a site for your salon",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "sanayi",
    image: "/generated/personas/sanayi.webp",
    service: "web",
    slug: { tr: "sanayi-firmasi-web-sitesi", en: "industrial-company-website" },
    tr: {
      metaTitle: "Sanayi & Makine İmalatçısı Web Sitesi",
      metaDescription:
        "Makine imalatçıları ve sanayi firmalarına özel web sitesi: makine kataloğu, teknik veri tabloları, ihracat için İngilizce sürüm ve teklif akışı.",
      eyebrow: "Makine İmalatçısına Özel",
      h1: "Sanayi & Makine İmalatçısı Web Sitesi",
      intro:
        "Makineyi alan kişi önce sayılara bakar: kapasite, güç, besleme ölçüsü, hatta nasıl oturduğu. Makinelerinizi model model anlatan, teknik dokümanı indirilebilir kılan ve teklif talebini ürün sayfasında toplayan bir site, fuardan ve aramadan gelen ilgiyi işe çevirir. Forpus makine imalatçıları ve sanayi firmaları için kurumsal siteler kuruyor.",
      shortAnswer: {
        title: "Sanayi ve makine firması web sitesi ne içerir, ne kadar tutar?",
        body: "Makine imalatçısı web sitesi, ürün ailelerinizi model model anlattığınız, teknik verileri yayınladığınız ve teklif talebini topladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir sanayi sitesinde her makine için ayrı bir ürün sayfası, kapasite ve güç değerlerini gösteren teknik veri tablosu, indirilebilir PDF katalog, makinenin çalışırken görüldüğü videolar, gıda ve geri dönüşüm gibi sektörlere göre ayrılmış çözüm sayfaları, ürün kodunu birlikte taşıyan teklif formu, referans ve kurulum listesi, yedek parça ile servis bölümü, İngilizce sürüm ve mobil uyumlu hızlı bir tasarım bulunur. Kurumsal tanıtım ve ürün listesi düzeyinde bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Her makinenin ayrı sayfalandığı tam bir katalog sitesi ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Ürün konfigüratörü, bayi paneli ve çok dilli yapı işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Yabancı dil sürümü çeviri eklentisiyle değil ayrı bir site gibi kurulur; ihracat aramaları Türkçe sayfaya düşmüyor. Alan adı ve site sizin adınıza kaydedilir; katalog ve teknik dokümanları panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Ürün sayfasından teklif",
          body: "Talep hangi makineden geldiğini yanında taşısın; satış ekibi doğru dosyayı ilk dakikada açsın.",
        },
        {
          title: "Teknik veri açıkta",
          body: "Kapasite, güç ve ölçü tablosu sitede olsun; satın almacı sizi ilk turda kısa listeye alsın.",
        },
        {
          title: "İhracata hazır yapı",
          body: "Yurt dışındaki alıcı kendi terimiyle arasın, aynı katalogla sizi bulsun.",
        },
      ],
      featuresTitle: "Sanayi & Makine İmalatçısı sitenizde neler olur?",
      features: [
        "Makine kataloğu ve ürün sayfaları",
        "Teknik veri tablosu ve PDF doküman",
        "Ürün bazlı teklif talep formu",
        "Sektörel çözüm sayfaları",
        "Referans, kurulum ve fuar bölümü",
        "İngilizce / çok dilli yapı",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Ürün kataloğunu kendim güncelleyebilir miyim?",
          a: "Evet. Yeni bir model eklemek, teknik tablodaki bir değeri değiştirmek, kataloğun yeni sürümünü yüklemek panelden yapılır. Sanayi sitelerinde en sık görülen sorun budur: ürün gamı değişir, site iki yıl önceki modellerde kalır. Yapıyı baştan sizin güncelleyeceğinizi varsayarak kurar, teslimde kısa bir kullanım kaydı bırakırız.",
        },
        {
          q: "Teknik verileri yayınlamak rakibe bilgi vermek olmuyor mu?",
          a: "Rakibiniz kapasitenizi zaten fuarda, bayide ve müşterinin sahasında görüyor; o bilgiyi sitenizden saklamanın koruduğu bir şey yok. Saklamanın maliyeti ise gerçek: satın almacı karşılaştıramadığı firmayı listeden çıkarıyor. Ayrım şurada: katalog değerleri açık olur, fiyat listesi, kritik tasarım detayları ve müşteriye özel çözümler dışarı çıkmaz. Hangi verinin yayınlanacağına birlikte karar veririz.",
        },
        {
          q: "İngilizce site şart mı, çeviri eklentisi yetmez mi?",
          a: "İhracat yapıyorsanız şart. Çeviri eklentisi sayfayı tarayıcıda çevirir ama Google için ortada ayrı bir sayfa yoktur; yurt dışındaki alıcı makineyi kendi terimiyle aradığında hiçbir yerde çıkmazsınız. Biz İngilizce sürümü ayrı adreslerde, kendi başlık ve açıklamalarıyla kurar, dil etiketlerini doğru bağlarız. Sektör terimlerinin doğru karşılığı önemli olduğu için metinleri makineye değil, mevcut kataloğunuza ve sizin onayınıza dayandırırız.",
        },
        {
          q: "Teklif formu ne topluyor?",
          a: "Formu ürün sayfasına gömdüğümüz için talep, hangi modelden geldiğini yanında taşır. Bunun üstüne ihtiyaç duyulan kapasite, ürün ya da malzeme cinsi, ülke ve firma bilgisi gibi alanlar eklenir. Talep e-postanıza ve isterseniz WhatsApp'a düşer; satış ekibi telefonu açmadan önce ne konuşacağını bilir.",
        },
        {
          q: "Makine videolarını ve 3B görselleri siteye koyabilir misiniz?",
          a: "Evet, ve bu sektörde en çok izlenen içerik çalışır haldeki makinenin videosudur. Video dosyalarını siteye yüklemeyiz; YouTube veya Vimeo üzerinden gömeriz, çünkü ağır dosyalar sayfayı yavaşlatır. 3B görsel, kesit çizimi ve çalışma prensibi animasyonu da aynı şekilde ürün sayfasına oturur.",
        },
        {
          q: "Belgelerimizi sitede nasıl gösteriyoruz?",
          a: "CE, ISO ve benzeri belgeleri ayrı bir sayfada, belge adı ve kapsamıyla birlikte gösteririz; taranmış görselleri de yayınlayabiliriz. Sanayi alıcısı için bu sayfa süs değil, ihale ve satın alma dosyasına giren bir kalem. Ürün sayfalarında da ilgili makinenin hangi standartlara göre üretildiğini kısa bir satırla belirtmenizi öneriyoruz.",
        },
        {
          q: "Bayi başvurusu ve yedek parça talebi alabilir miyiz?",
          a: "Evet. Bayi ve distribütör başvurusu için ayrı bir form kurarız; ülke, temsil edilen markalar ve servis kapasitesi gibi alanlarla gelen başvuru elenmiş olur. Yedek parça tarafında ise parça listesi ve makine seri numarasını isteyen bir talep formu kurgularız; servis ekibinizin telefonda tarif dinleme yükü belirgin biçimde azalır.",
        },
        {
          q: "Sanayi firması web sitesi ne kadar tutar?",
          a: "Firma tanıtımı, ürün listesi ve tek teklif formu olan kurumsal bir site ₺50.000–85.000 aralığında başlar. Her makinenin ayrı sayfalandığı, teknik tabloları ve İngilizce sürümü olan bir katalog sitesi ₺90.000–150.000 aralığındadır. Ürün konfigüratörü, bayi paneli ve çok dilli yapı işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Bu sektörde iş yaptınız mı?",
          a: "Evet. Renk ayırma ve X-Ray gıda kontrol makineleri üreten SAGE Makine'nin kurumsal sitesini biz kurduk: makine kataloğu, sektörel çözüm sayfaları, ziyaretçinin ayıklamanın nasıl çalıştığını ekranda gördüğü canlı bir simülasyon ve ürün bazlı teklif akışı. Endüstriyel bir sitede işin ağırlığının tasarımda değil, teknik içeriğin doğru kurgulanmasında olduğunu o projede net gördük.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Makine alan kişi tek başına karar vermez. Fabrikanın teknik sorumlusu makineyi adıyla arar, ilk sayfadaki beş altı siteyi arka arkaya açar ve kapasite, güç, besleme ölçüsü gibi değerleri yan yana koyar. Bu değerleri sitesinde açıkça yazan firma kısa listeye girer; 'detaylı bilgi için iletişime geçin' diyen firma o listeye hiç giremez, çünkü karşılaştırılacak bir şey vermemiştir.",
          "İkinci kırılma fuardan sonra yaşanır. Standınızda konuşulan onlarca kişi ofise döndüğünde firmanızın adını yazar; o gün gördüğü makineyi bir daha görmek, kataloğu indirmek ve içerideki ekibine göstermek ister. Sitede yalnızca bir 'hakkımızda' metni ve tek bir iletişim formu varsa, fuar masrafının karşılığı e-posta kutusunda kaybolur.",
          "Üçüncüsü ihracat tarafıdır. Türkiye'deki makine imalatçılarının çoğu satışının önemli bir kısmını yurt dışında yapıyor, ama oradaki alıcı sizi Türkçe terimle aramıyor. İngilizce tarafı bir çeviri eklentisiyle geçiştirilen sitelerde bu aramaların hiçbiri karşılanmıyor; alıcı sizi ancak bir pazaryeri portalında bulabiliyor ve orada fiyattan başka hiçbir şeyle ayrışamıyorsunuz.",
        ],
      },
      pricing: {
        title: "Sanayi & Makine İmalatçısı Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kurumsal tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Firma tanıtımı, ürün listesi, üretim ve kalite bölümü, referanslar, harita ve tek adımda teklif formu. Ürün sayısı sınırlı imalatçılar ve fason üretim yapan atölyeler için yeterli.",
          },
          {
            name: "Katalog sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Her makine için ayrı ürün sayfası, teknik veri tabloları, indirilebilir doküman ve video, sektörel çözüm sayfaları, ürün bazlı teklif formu ve ayrı adreslerde kurulan İngilizce sürüm. İhracat yapan imalatçılar için.",
          },
          {
            name: "Konfigüratör & bayi paneli",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Ürün konfigüratörü ya da çalışma simülasyonu, üçten fazla dil, bayi ve servis paneli, yedek parça talep akışı ve gerekiyorsa ERP bağlantısı. Geniş ürün gamı ve yurt dışı bayi ağı olan firmalar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Kaç ürün ailesi, kaç model, hangi sektörlere satıyorsunuz, ihracat payınız ne, satışı kim kapatıyor konuşuruz. Tek bir makine üreten bir atölyeyle otuz modelli bir imalatçının sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Teknik içerik ve görsel",
            body: "Bu işte site teknik veriyle ayakta duruyor, o yüzden en çok emek buraya gidiyor. Modellerin kapasite, güç ve ölçü değerlerini ortak bir tabloya oturtur, elinizdeki katalog ve çizimleri değerlendiririz. Makinelerin çalışır halde çekilmiş görüntüsü yoksa nasıl çekeceğinizi anlatan bir liste gönderiyoruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı ve bir ürün sayfasını görürsünüz. Ürün şablonu onaylandıktan sonra diğer modeller aynı düzene oturur; bu yüzden kararın büyüğü tek sayfada verilir. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, kurumsal e-posta ve İngilizce sürümün arama motorlarına tanıtımı dahil yayına alırız. Yeni model eklemeyi ve teknik tabloyu güncellemeyi kendiniz yapabilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Sanayi & Makine İmalatçısı Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title:
              "Teknik veriler sayfada mı, yoksa yalnızca PDF'in içinde mi?",
            body: "Kapasite ve güç tablosu sadece indirilebilir katalogda duruyorsa, arama motoru o değerleri sayfanız için saymaz ve alıcı da indirmeden karşılaştıramaz. Tablo sayfada metin olarak durmalı; PDF onun yanında, ek olarak bulunmalı.",
          },
          {
            title: "Teklif formu hangi makineden geldiğini söylüyor mu?",
            body: "Tek bir iletişim formu üzerinden gelen 'bilgi almak istiyorum' mesajı satış ekibine hiçbir şey kazandırmaz. Formun ürün sayfasında durduğundan ve model bilgisini yanında taşıdığından emin olun.",
          },
          {
            title: "İngilizce sürüm ayrı adreslerde mi kuruluyor?",
            body: "Teklif verenden İngilizce sayfanın adresini isteyin. Adres Türkçe sayfanınkiyle aynıysa ve dil bir düğmeyle değişiyorsa, o site yurt dışı aramasında görünmez. Ayrı adres ve doğru dil etiketi şart.",
          },
          {
            title: "Kataloğu kendiniz güncelleyebiliyor musunuz?",
            body: "Ürün gamı her yıl değişir. Her yeni model için ajansa iş açmanız gerekiyorsa site kısa sürede geride kalır ve müşteri artık üretmediğiniz bir makineyi sorar.",
          },
          {
            title: "Sayfalar mobilde ve zayıf bağlantıda açılıyor mu?",
            body: "Sanayi sitelerini çoğu zaman fabrikanın içinden, sahadan ya da fuar salonundan açarlar; bağlantı her yerde iyi değildir. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve kurumsal e-posta kimin hesabında?",
            body: "Sanayi firmalarında en sık rastladığımız sorun bu: alan adı yıllar önce çalışılan bir ajansın ya da ayrılmış bir çalışanın hesabında kalır. Alan adının firmanız adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Industrial & Machinery Manufacturer Website",
      metaDescription:
        "Websites for machine builders and industrial manufacturers: product catalog, technical data tables, an English version for export, and a quote flow.",
      eyebrow: "For Manufacturers",
      h1: "Industrial & Machinery Company Website",
      intro:
        "A machine buyer looks at the numbers first: capacity, power, feed size, how the unit fits the line. A site that covers every model, makes the technical documents downloadable and collects quote requests on the product page turns trade-fair and search interest into orders. Forpus builds corporate sites for machine builders and industrial manufacturers.",
      shortAnswer: {
        title:
          "What does an industrial or machinery website include, and what does it cost?",
        body: "An industrial or machinery website is your own address for presenting every model, publishing the technical data and collecting quote requests. A typical site Forpus builds carries a separate page for each machine, a data table with capacity, power and dimensions, downloadable PDF catalogs and drawings, video of the machine running, solution pages split by industry such as food or recycling, a quote form that carries the product code with it, a reference and installation list, a spare parts and service section, an English version and a fast, mobile-friendly design. A corporate site at presentation and product-list level runs ₺50,000–85,000 and goes live in one to two weeks. A full catalog site with every machine on its own page runs ₺90,000–150,000 over two to four weeks. Once a product configurator, a dealer panel or a multilingual structure is involved, you are looking at a project starting from ₺220,000. The English version is built as a site of its own, not a translation widget: export searches never land on Turkish pages. The domain and the site are registered in your name, and you update the catalog yourself.",
      },
      benefits: [
        {
          title: "Quotes tied to a model",
          body: "Requests arrive with the machine attached, so your sales team opens the right file in the first minute.",
        },
        {
          title: "Technical data in the open",
          body: "Publish capacity, power and dimensions so buyers can shortlist you on the first pass.",
        },
        {
          title: "Built for export",
          body: "An English version that ranks on its own, not a translate button bolted onto Turkish pages.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Machine catalog and product pages",
        "Technical data tables and PDF documents",
        "Product-level quote request form",
        "Industry solution pages",
        "References, installations and fair news",
        "English / multilingual structure",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can I update the catalog myself?",
          a: "Yes. Adding a new model, changing a value in the data table or uploading a new revision of the catalog are all done from the panel. This is the most common failure we see in industrial sites: the product range moves on and the site stays two years behind. We build assuming you will maintain it, and leave a short walkthrough recording at handover.",
        },
        {
          q: "Isn't publishing technical data just helping competitors?",
          a: "Your competitors already see your capacities at fairs, at dealers and on customer sites; hiding them on your own site protects nothing. The cost of hiding them is real, though: a buyer who cannot compare you drops you from the list. The line we draw is this — catalog figures go public, while price lists, critical design detail and customer-specific solutions stay out. We decide together what gets published.",
        },
        {
          q: "Do we really need a separate English site?",
          a: "If you export, yes. A translation widget converts the page in the browser, but as far as Google is concerned no English page exists, so a buyer searching in their own terminology never finds you. We build the English version on its own URLs with its own titles and descriptions, and wire up the language tags correctly. Because the industry terms have to be right, the copy is based on your existing catalog and your approval, not on machine translation.",
        },
        {
          q: "What does the quote form collect?",
          a: "Because the form sits on the product page, every request arrives knowing which model it came from. On top of that we add fields for required capacity, product or material type, country and company details. Requests land in your inbox and, if you want, on WhatsApp — so your sales team knows the conversation before they pick up the phone.",
        },
        {
          q: "Can you embed machine videos and 3D visuals?",
          a: "Yes, and in this sector video of the machine actually running is the most-watched content on the site. We don't host the video files on the site itself — we embed them through YouTube or Vimeo, because heavy files slow the pages down. Renders, section drawings and working-principle animations sit on the product page the same way.",
        },
        {
          q: "Have you built something like this before?",
          a: "Yes. We built the corporate site for SAGE Makine, a manufacturer of color sorting and X-Ray food inspection machines: a machine catalog, industry solution pages, a live simulation that shows visitors how the sorting actually works, and a product-level quote flow. That project made it clear that the weight of an industrial site sits in structuring the technical content, not in decoration.",
        },
      ],
      ctaTitle: "Let's build a site for your factory",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "lojistik",
    image: "/generated/personas/lojistik.webp",
    service: "web",
    slug: {
      tr: "lojistik-firmasi-web-sitesi",
      en: "logistics-company-website",
    },
    tr: {
      metaTitle: "Lojistik & Uluslararası Nakliyat Web Sitesi",
      metaDescription:
        "Uluslararası nakliyat, komple ve parsiyel taşıma firmalarına özel web sitesi: çok dilli yapı, doğru soruları soran teklif formu ve sevkiyat takibi.",
      eyebrow: "Lojistiğe Özel",
      h1: "Lojistik & Uluslararası Nakliyat Web Sitesi",
      intro:
        "Yükü size vermeden önce alıcı firmayı araştırır: hangi hatlarda çalışıyorsunuz, yetki belgeniz ne, yük yolda kalırsa geceyarısı kime ulaşacak. Rotalarınızı, filonuzu ve belgelerinizi gösteren, teklifi doğru soruları sorarak toplayan bir site o araştırmayı sizin lehinize bitirir. Forpus uluslararası nakliyat ve lojistik firmaları için site kuruyor.",
      shortAnswer: {
        title: "Lojistik web sitesi ne içerir, ne kadar tutar?",
        body: "Lojistik ve uluslararası nakliyat web sitesi, hatlarınızı ve filonuzu gösterdiğiniz, yetki belgelerinizi ortaya koyduğunuz ve teklif topladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir nakliyat sitesinde komple, parsiyel, frigorifik ve proje yükü için ayrı hizmet sayfaları, çalıştığınız ülkeleri ve sınır kapılarını gösteren bir rota bölümü, çekici ile dorse tiplerini listeleyen filo sayfası, yükün cinsini, brüt ağırlığını, yükleme ve boşaltma adresini, tarihini ve teslim şeklini soran detaylı bir teklif formu, yetki belgesi ve üyelik bilgileri, İngilizce sürüm, 7/24 operasyon iletişimi ve şoför alımı için bir kariyer sayfası bulunur. Hizmetleri ve filoyu anlatan kurumsal bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Çok dilli, hat bazlı sayfalanan ve teklif formunun operasyona düştüğü tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Sevkiyat takip ekranı ve müşteri paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Fiyat listesi yayınlanmaz; navlun yüke ve tarihe göre değiştiği için akış \"teklif al\" üzerine kurulur. Alan adı ve site sizin adınıza kaydedilir.",
      },
      benefits: [
        {
          title: "Nitelikli teklif talebi",
          body: "Yükün cinsi, ağırlığı, adresleri ve tarihi forma yazılsın; operasyon telefonda aynı on soruyu sormakla vakit kaybetmesin.",
        },
        {
          title: "Yurt dışında bulunun",
          body: "İngilizce sürümle Avrupa'daki forwarder ve alıcı sizi kendi dilinde bulsun; iş yalnızca tanıdıktan gelmesin.",
        },
        {
          title: "Belgeyle kanıtlanan güven",
          body: 'Yetki belgeleri, sigorta kapsamı, filo ve çalıştığınız hatlar görünür olsun; "güvenilir firmayız" cümlesine gerek kalmasın.',
        },
      ],
      featuresTitle: "Lojistik & Uluslararası Nakliyat sitenizde neler olur?",
      features: [
        "Hizmet sayfaları: komple, parsiyel, frigo, proje yükü",
        "Rota, hat ve sınır kapısı bölümü",
        "Filo ve dorse tipleri sayfası",
        "Detaylı teklif formu (yük, adres, tarih, teslim şekli)",
        "Yetki belgeleri, CMR sigortası ve üyelikler",
        "İngilizce sürüm ve 7/24 operasyon hattı",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Sitede fiyat listesi yayınlamalı mıyız?",
          a: 'Hayır. Navlun yüke, hacme, tarihe, araç bulunabilirliğine ve sezona göre değişir; sabit bir liste hem yanlış olur hem sizi bağlar. Ama "fiyat yok" demek de yetmez. Doğru kurgu şudur: her sayfadan ulaşılan bir teklif formu, formda yükü tarif eden alanlar ve dönüş süresine dair açık bir söz. Alıcının aradığı kesinlik fiyatta değil, ne zaman cevap alacağındadır.',
        },
        {
          q: "Teklif formunda neler sorulmalı?",
          a: "Yükün cinsi, brüt ağırlık ve yüklü palet/hacim bilgisi, yükleme ve boşaltma adresi (en az ülke ve şehir), tahmini yükleme tarihi, araç tipi ihtiyacı ve teslim şekli. Frigorifik ise sıcaklık aralığı, tehlikeli madde ise ADR sınıfı ayrıca sorulur. Uzun form doldurulmaz diye endişe ediyorsanız iki adımlı kurarız: ilk adımda üç alan, gönderdikten sonra detay. Böylece hem talep kaçmaz hem operasyon çalışabilir bir bilgiyle başlar.",
        },
        {
          q: "İngilizce site gerçekten gerekli mi?",
          a: "Bu sektörde en çok kazandıran kalem odur. Avrupa'daki bir forwarder Türkiye'den taşıyıcı ararken Türkçe aramaz; hattı, araç tipini ve firmayı İngilizce yazar. Türkçe tek dilli bir site o aramanın tamamının dışında kalır. Hacminizin yoğunlaştığı bölgeye göre Almanca, Rusça veya Arapça da ekleriz; ama sıralama açıksa önce İngilizce.",
        },
        {
          q: '"Yüküm nerede?" sorusunu siteden karşılayabilir miyiz?',
          a: "Evet. En sadesi, müşterinin sefer veya dosya numarasıyla sorguladığı ve yükleme, sınır, gümrük, teslim gibi aşamaları gösteren bir takip ekranıdır; durumu operasyon panelden günceller. Araç takip sisteminiz varsa entegre de edebiliriz. Dürüst uyarı: canlı konum paylaşımı her müşteride istenmez ve her hareket bir telefon getirir. Firmaların çoğu aşama bazlı durumla daha rahat ediyor; kararı sefer sayınıza ve müşteri profilinize bakarak birlikte veriyoruz.",
        },
        {
          q: "Yetki belgelerimizi ve üyeliklerimizi sitede göstermeli miyiz?",
          a: "Kesinlikle. Bu sektörde en güçlü güven unsuru budur ve rakiplerin çoğu bunu sayfanın dibine gömüyor. Yetki belgesi tipiniz ve numaranız, TIR karnesi yetkiniz, CMR sigortanızın kapsamı, sektör dernek üyelikleriniz ve varsa kalite belgeleriniz görünür bir bölümde durmalı. Bunlar reklam kısıtı olan bir alan değil; yazdıkça avantaj sağlıyorsunuz.",
        },
        {
          q: "Referans müşterilerimizin adını sitede yazabilir miyiz?",
          a: 'Mevzuat açısından engel yok; engel varsa sözleşmenizden gelir. Bazı ihracatçılar ve forwarder\'lar tedarikçi listelerinin görünmesini istemez. Pratik çözüm şu: adını yazmaya izin verenleri logo veya kısa vakayla gösteririz, izin vermeyenleri sektör ve hat düzeyinde anlatırız — "beyaz eşya yan sanayii için Türkiye–İtalya hattında düzenli komple sefer" gibi. İkincisi de en az birincisi kadar ikna edici oluyor.',
        },
        {
          q: "Şoför alımı için de kullanabilir miyiz?",
          a: "Evet ve bu sayfa çoğu firmada beklenenden çok iş yapıyor; bu sektörde şoför bulmak bazen yük bulmaktan zor. Ehliyet sınıfı, SRC ve psikoteknik durumu, pasaport ile vize geçmişi ve daha önce gidilen hatları soran bir başvuru formu kurarız. Başvurular insan kaynaklarına ayrı düşer, teklif taleplerine karışmaz.",
        },
        {
          q: "Hangi hatlarda çalıştığımızı nasıl gösteriyoruz?",
          a: 'Yoğun hatlarınız için ayrı sayfalar açarız. Bunun iki faydası var: alıcı kendi ülkesini görüp doğru yere iner, ayrıca insanlar aramayı "nakliyat firması" diye değil "Türkiye Almanya komple yük" gibi hat adıyla yapar. Her hat sayfasında geçilen sınır kapıları, tipik transit süre, kullanılan araç tipleri ve o hatta özel gümrük notları bulunur. Ro-Ro veya intermodal kullanıyorsanız bunu da aynı sayfada anlatırız.',
        },
        {
          q: "Lojistik sektöründe iş yaptınız mı?",
          a: "Evet. Türkiye'den Balkanlara uluslararası karayolu taşımacılığı yapan Çekiç Trans'ın kurumsal sitesini biz kurduk: hizmetlerin ayrı ayrı anlatımı, rotalar, filo ve her sayfadan ulaşılan teklif akışı. O projede en çok emek tasarıma değil metne gitti — \"güvenilir, hızlı, müşteri odaklı\" üçlüsünü çıkarıp yerine bir hat üzerinde altı ülke ve yılların getirdiği sınır kapısı deneyimi gibi doğrulanabilir detayları koymak işin asıl kısmıydı.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Uluslararası nakliyede müşteri bir hizmet değil, bir güvence satın alır: yük sınırda takılmayacak, gümrükte beklemeyecek, söz verilen gün varacak. Alıcı bu güvenceyi ölçmek için teklifi beklemeden siteye bakar — firma gerçekten hangi hatlarda çalışıyor, kaç aracı var, yetki belgesi ve sigortası ne durumda. Bu sorular sitede cevapsızsa dosya kapanmaz ama sıraya girer; teklifiniz artık en ucuz olmak zorundadır.",
          "İkinci kırılma metinde olur. Bu sektörün sitelerinin çoğu birbirinin aynısıdır çünkü hepsi aynı sıfatları kullanır: güvenilir, hızlı, müşteri odaklı. Bu kelimeler hiçbir şey ifade etmez ve firmayı ayırmaz. Ayrışma somutluktan gelir — bir hat üzerinde altı ülke, yılların getirdiği sınır kapısı bilgisi, aynı yolu yıllardır bilen şoförler, kendi çekicileriniz. Bunlar doğrulanabilir, hatırlanabilir ve rakibin kopyalayamayacağı şeylerdir.",
          'Üçüncüsü teklif akışının kendisidir. "Adınız, e-posta, mesajınız" formu bu işte işe yaramaz; gelen mesaj "Almanya\'ya fiyat alabilir miyim" olur ve operasyon aynı soruları telefonda sormak zorunda kalır. İngilizce sürüm yoksa yurt dışındaki forwarder sizi hiç bulamaz, bulsa da okuyamaz. Sonuçta iş tanıdık çevresinden gelmeye devam eder ve firma kendi kapasitesinin altında çalışır.',
        ],
      },
      pricing: {
        title: "Lojistik & Uluslararası Nakliyat Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kurumsal tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Hizmetler, filo, hakkımızda, belgeler ve tek sayfalık teklif formu. Tek dilli. İşin çoğu tanıdık ve mevcut müşteri üzerinden gelen, siteyi kurumsal bir referans olarak kullanan firmalar için yeterli.",
          },
          {
            name: "Çok dilli teklif sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Komple, parsiyel, frigorifik ve proje yükü için ayrı sayfalar, hat bazlı rota sayfaları, detaylı teklif formu, İngilizce sürüm ve kariyer bölümü. Yurt dışından ve aramadan talep toplamak isteyenler için.",
          },
          {
            name: "Sevkiyat takibi & müşteri paneli",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Sefer numarasıyla durum sorgulama, müşteriye özel panel, evrak ve teslim belgesi paylaşımı, araç takip sistemi entegrasyonu. Sefer sayısı e-posta ve tabloyla yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi hatlarda çalıştığınızı, komple mi parsiyel mi ağırlıklı olduğunuzu, filonuzu ve müşteri profilinizi konuşuruz. Doğrudan ihracatçıya çalışan bir firmayla forwarder'a araç veren bir firmanın sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Metin ve belgeler",
            body: "Bu sektörde emeğin çoğu tasarıma değil metne gidiyor. Yetki belgelerinizi, sigorta kapsamınızı, üyeliklerinizi ve filo listenizi alırız; ardından firmanın gerçekten neyi farklı yaptığını bulup somut cümlelere çeviririz. Genel geçer sıfatlar bu aşamada elenir.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi burada süslemek değil, kapasiteyi ve ciddiyeti ilk ekranda hissettirmek. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, teklif formunun operasyon adresine düşmesi ve İngilizce sürümün doğru dil etiketleriyle yayını dahil devreye alırız. Rota, filo ve kariyer içeriklerini kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Lojistik & Uluslararası Nakliyat Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Teklif formu doğru soruları soruyor mu?",
            body: "Üç alanlı bir iletişim formu bu sektörde teklif toplamaz, sadece telefon trafiği üretir. Formda yük cinsi, ağırlık, iki adres, tarih ve teslim şekli olmalı. Teklif verdiğiniz ajansa formun alanlarını baştan yazdırın.",
          },
          {
            title: "İngilizce sürüm gerçekten çevrilmiş mi?",
            body: "Tarayıcı eklentisiyle otomatik çevrilen bir site sektör terimlerinde hemen ele veriyor; komple ve parsiyel yükün karşılığını bilmeyen bir metni yurt dışındaki alıcı ilk paragrafta anlar. Çevirinin kim tarafından yapıldığını sorun ve dil sürümünün ayrı bir adreste yayınlandığından emin olun.",
          },
          {
            title: "Belgeler ve sigorta görünür mü?",
            body: "Yetki belgesi bilgisi, TIR karnesi yetkisi ve CMR sigortası kapsamı sitede yer almıyorsa en güçlü kozunuzu kullanmıyorsunuz demektir. Bu bilgilerin footer'a sıkıştırılmış değil, kendi bölümünde durması gerekir.",
          },
          {
            title: "Filo fotoğrafları sizin araçlarınız mı?",
            body: "İnternetten alınmış tek tip TIR görselleri bu sektörde anında belli oluyor ve kapasiteye dair hiçbir şey söylemiyor. Kendi çekicileriniz, kendi logonuz ve gerçek dorse tipleriniz fotoğraflanmalı; bu, sitenin en değerli yatırımıdır.",
          },
          {
            title: "Teklif talebi kime düşüyor?",
            body: "Form sadece kurumsal e-postaya düşüyorsa talepler kaybolur. Operasyondan sorumlu kişiye doğrudan gitmeli, tercihen ikinci bir adrese kopyalanmalı ve gönderene otomatik bir alındı yanıtı çıkmalı. Teslimden önce kendi telefonunuzdan bir deneme talebi gönderin.",
          },
          {
            title: "Alan adı ve kurumsal e-posta kime ait?",
            body: "Alan adının firmanız adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Kurumsal e-posta hesaplarınız da aynı alan adı üzerinde çalıştığı için, alan adının kontrolünü kaybetmek yalnızca siteyi değil yazışmayı da durdurur.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Logistics & International Freight Website",
      metaDescription:
        "Websites for international road hauliers and freight forwarders. Multilingual, with a quote form that asks the right cargo questions. Get a free quote.",
      eyebrow: "For Logistics",
      h1: "Logistics & International Freight Website",
      intro:
        "Before a shipper hands you a load, they check you out: which lanes you run, what licences you hold, who answers when a truck is stuck at the border. A site that shows your routes, your fleet and your paperwork — and collects a quote request with real cargo details — ends that check in your favour. Forpus builds sites for international freight and logistics companies.",
      shortAnswer: {
        title: "What does a logistics website include, and what does it cost?",
        body: "A logistics website is your own address for showing the lanes you run, the fleet you own and the licences you hold, and for collecting quote requests. A typical site Forpus builds carries separate service pages for full loads, groupage, temperature-controlled and project cargo, a routes section covering the countries and border crossings you work, a fleet page listing tractors and trailer types, a quote form that asks for the commodity, gross weight, loading and delivery addresses, loading date and delivery terms, your licences, CMR insurance cover and association memberships, an English version, a 24/7 operations contact and a careers page for driver recruitment. A corporate site covering services and fleet runs ₺50,000–85,000 and goes live in one to two weeks. A multilingual site with lane-by-lane pages and a quote form that reaches operations runs ₺90,000–150,000 over two to four weeks. Once shipment tracking and a customer panel are involved, you are looking at a project starting from ₺220,000. No price list goes up: rates move with the load and the date, so the whole flow is built around requesting a quote.",
      },
      benefits: [
        {
          title: "Quote requests worth answering",
          body: "Commodity, weight, both addresses and the loading date arrive in the form, so operations stops asking the same ten questions on the phone.",
        },
        {
          title: "Found from abroad",
          body: "An English version lets forwarders and buyers in Europe find you in their own language, instead of work arriving only through contacts.",
        },
        {
          title: "Trust backed by paperwork",
          body: "Licences, insurance cover, fleet and the lanes you run are visible, so you never have to write the words 'reliable partner'.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service pages: FTL, groupage, reefer, project cargo",
        "Routes, lanes and border crossings",
        "Fleet and trailer types page",
        "Detailed quote form (cargo, addresses, date, terms)",
        "Licences, CMR insurance and memberships",
        "English version and 24/7 operations line",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Should we publish a price list?",
          a: "No. Freight rates move with the load, the volume, the date, vehicle availability and the season, so a fixed list is either wrong or binding. But 'no prices' is not enough either. The right structure is a quote form reachable from every page, fields that describe the cargo, and a clear promise about response time — the certainty a buyer wants is in when you reply, not in a number.",
        },
        {
          q: "What should the quote form ask?",
          a: "Commodity, gross weight and pallet or volume figures, loading and delivery addresses (country and city at minimum), estimated loading date, vehicle type and delivery terms. Reefer loads add a temperature range; dangerous goods add the ADR class. If you worry a long form will scare people off, we build it in two steps: three fields first, details after submission.",
        },
        {
          q: "Do we need more than one language?",
          a: "In this sector it is the line that pays for itself fastest. A forwarder in Europe searching for a Turkish carrier does not search in Turkish — they type the lane, the trailer type and the company in English. A Turkish-only site sits outside all of that traffic. We add German, Russian or Arabic where your volume justifies it, but English comes first.",
        },
        {
          q: "Can customers track their shipment on the site?",
          a: "Yes. The simplest version lets a customer enter a trip or file number and see stages: loaded, at the border, in customs, delivered — with operations updating status from the panel. We can integrate your vehicle tracking system too. An honest warning: live position sharing invites a phone call for every movement, and most companies are happier with stage-based status.",
        },
        {
          q: "Should we show our licences and memberships?",
          a: "Absolutely, and most competitors bury this at the bottom of the page. Your transport licence, TIR carnet authorisation, CMR insurance cover, industry association memberships and any quality certifications belong in a section of their own. Nothing restricts you from publishing them — the advantage goes to whoever writes them down.",
        },
        {
          q: "Have you built sites in this sector?",
          a: "Yes. We built the corporate site for Çekiç Trans, which runs international road freight from Turkey to the Balkans: services set out one by one, routes, fleet and a quote flow reachable from every page. Most of the effort went into the copy rather than the design — replacing generic adjectives with verifiable detail like the countries on a single lane and years of border-crossing experience.",
        },
      ],
      ctaTitle: "Let's build a site for your company",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "tekne",
    image: "/generated/personas/tekne.webp",
    service: "web",
    slug: { tr: "tekne-kiralama-web-sitesi", en: "boat-charter-website" },
    tr: {
      metaTitle: "Tekne &amp; Yat Kiralama Web Sitesi",
      metaDescription:
        "Tekne ve yat kiralama firmalarına özel web sitesi ve rezervasyon. Tekne sayfaları, fiyata dahil olanlar, tek tıkla WhatsApp. Ücretsiz teklif alın.",
      eyebrow: "Tekne Kiralamaya Özel",
      h1: "Tekne &amp; Yat Kiralama Web Sitesi",
      intro:
        "Bu işte kimse tekneyi teknik özelliklerini karşılaştırarak seçmiyor; güvertede geçireceği günü hayal edip karar veriyor. Filonuzu gerçek karelerle gösteren, fiyata neyin dahil olduğunu baştan yazan ve rezervasyonu tek tıkla alan bir site o hayali işe çevirir. Forpus tekne ve yat kiralama firmaları için site kuruyor.",
      shortAnswer: {
        title: "Tekne kiralama web sitesi ne içerir, ne kadar tutar?",
        body: "Tekne kiralama web sitesi, filonuzu gösterdiğiniz, turlarınızı ve fiyata dahil olanları yazdığınız, rezervasyonu aracısız aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir tekne sitesinde her tekne için kapasite, boy, kabin ve kalkış noktası bilgisi taşıyan ayrı sayfalar, Boğaz turu ile gün batımı gibi tur kartları, fiyata dahil olan ve olmayan kalemlerin listesi, tarih ve kişi sayısı sorulan rezervasyon formu, tek tıkla WhatsApp, gerçek çekimlerden galeri ve tanıtım videosu, İngilizce sayfalar ve mobil uyumlu hızlı bir tasarım bulunur. Filoyu ve turları anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Her teknenin ayrı sayfalandığı, rezervasyon formunun çalıştığı çift dilli tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Müsaitlik takvimi ve kaporalı online ödeme işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Video sayfa açılışında değil, görünür olduğunda yüklenir; turizmde ağır açılan site doğrudan kayıptır. Alan adı ve site sizin adınıza kaydedilir; sezon fiyatlarını panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Aracısız rezervasyon",
          body: "Müşteri komisyonlu bir platformdan değil doğrudan sizden gelsin; aynı iş, kesintisiz ciro.",
        },
        {
          title: "Hayal kurduran vitrin",
          body: "Gerçek çekim ve videoyla güvertede geçecek günü gösterin; karar sizin sitenizde verilsin.",
        },
        {
          title: "Google'da bulunun",
          body: "'Boğaz'da tekne kiralama' ve 'günlük yat kiralama' aramalarında hem haritada hem sonuçlarda görünün.",
        },
      ],
      featuresTitle: "Tekne &amp; Yat Kiralama sitenizde neler olur?",
      features: [
        "Tekne sayfaları (kapasite, boy, kabin)",
        "Tur ve organizasyon paketleri",
        "Fiyata dahil olanlar listesi",
        "Tarihli rezervasyon formu / WhatsApp",
        "Video ve gerçek çekim galerisi",
        "İngilizce sayfa ve kalkış noktası haritası",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Rezervasyon sistemi kurar mısınız?",
          a: "Evet. Tarih, saat ve kişi sayısı sorulan basit bir talep formundan, teknelerin dolu günlerini kapatan bir müsaitlik takvimine kadar ihtiyacınıza göre kurarız. Bir iki tekneyle çalışan firmaların çoğunda tarih formu artı WhatsApp yönlendirmesi yetiyor; filo büyüdükçe ve aynı gün birden fazla tur çıktıkça takvimli yapı kendini gerektiriyor.",
        },
        {
          q: "Fiyata dahil olanları sitede nasıl gösteriyoruz?",
          a: "Her tekne ve tur için 'dahil' ve 'hariç' diye iki kısa liste kurarız: yakıt, kaptan ve mürettebat, ikram, buz ve içecek, temizlik, iskele ücreti, ek saat. Sezon, hafta içi ve hafta sonu farkını da bant olarak gösteririz. Bu bölüm sitedeki en çok okunan yerlerden biri oluyor; yazılı olduğunda kapıda ve iskelede tartışma çıkmıyor.",
        },
        {
          q: "Tekne kiralama web sitesi ne kadar tutar?",
          a: "Filoyu ve turları anlatan, galeri ve WhatsApp yönlendirmeli bir tanıtım sitesi ₺50.000 bandında başlar. Her teknenin ayrı sayfalandığı, rezervasyon formlu ve İngilizce sayfaları olan tam bir site ₺90.000–150.000 aralığındadır. Müsaitlik takvimi, kaporalı online ödeme ve mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Her tekne için ayrı sayfa şart mı?",
          a: "Şart değil ama kazandırıyor. On kişilik bir gulet arayanla iki kişilik gün batımı turu arayan farklı şeyler soruyor; hepsi tek bir 'filomuz' listesinde kaybolursa müşteri aradığını bulamıyor. Ayrı sayfalarda her tekne kendi kapasitesi, boyu, kabin sayısı ve kalkış noktasıyla anlatılır — Google da her birini ayrı bir arama için gösterebilir.",
        },
        {
          q: "Yabancı müşteri için İngilizce sayfa gerekli mi?",
          a: "Bodrum, Göcek, Fethiye ve Kaş gibi yerlerde neredeyse zorunlu; İstanbul'da da Boğaz turlarının önemli bir kısmı yabancı ziyaretçiden geliyor. Siteyi baştan çift dilli kurmak, sonradan İngilizce eklemekten hem ucuz hem doğru oluyor. Rusça ve Arapça gibi ek diller de mümkün, ama içeriği kimin çevireceğini başta netleştiriyoruz.",
        },
        {
          q: "Video koyarsak site yavaşlar mı?",
          a: "Doğru kurulduğunda hayır. Videoyu sayfa açılışında indirmez, ancak ekranda görünür olduğunda oynatırız; o ana kadar yerinde bir poster görüntüsü durur. Görselleri de birden fazla boyutta üretip ziyaretçinin ekranına uygun olanı göndeririz, telefondaki kullanıcı masaüstü dosyasını indirmez. Turizmde asıl açmaz budur: kaliteli göstermek büyük dosya ister, büyük dosya ziyaretçiyi kaçırır.",
        },
        {
          q: "Online kapora veya ön ödeme alabilir miyiz?",
          a: "Evet. Sanal POS'unuza bağlı bir kapora adımı kurabiliriz; müşteri tarihi seçer, kaporayı öder, gerisini teslimde tamamlar. Bunu kurarken iptal ve hava koşulu politikanızı da aynı sayfaya yazmanızı öneriyoruz — bu sektörde rüzgâr yüzünden ertelenen turlar kaçınılmaz ve şartı yazılı olan firma tartışma yaşamıyor.",
        },
        {
          q: "Müşteri yorumu ve kampanya yayınlayabilir miyim?",
          a: "Evet, serbest. Bu sektör sağlıkta olduğu gibi bir tanıtım kısıtına tabi değil; yorumları, puanları, erken rezervasyon indirimini ve özel gün paketlerini sitede rahatça gösterebilirsiniz. Google İşletme Profilinizdeki yorumları siteye taşıyan bir bölüm ve panelden kendiniz güncelleyebileceğiniz bir kampanya alanı kurarız.",
        },
        {
          q: "Google'da ve haritada bulunmama yardım eder misiniz?",
          a: "Evet. Google İşletme Profilinizi kurar veya düzenler, kategoriyi ve hizmetleri doğru girer, siteyle bağlantısını sağlarız. Bunun yanında sayfaları kalkış noktanıza göre kurgularız: 'Bebek'ten tekne kiralama' ile 'Göcek günlük tekne turu' farklı aramalar ve farklı sayfalarla karşılanır. Profil sizin sahipliğinizde kalır; doğrulama adımını sizin tamamlamanız gerekir.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Tekne kiralama, kararın duyguyla verildiği bir hizmet. Kimse motor gücüne bakarak seçmiyor; kalabalığıyla o günü nerede geçireceğini hayal ediyor ve hayali kuran firmayı arıyor. Bu yüzden bu sektörde siteyi ayakta tutan şey metin değil, kare: teknenin güvertesi, iskele, akşamüstü ışığı. Instagram bunu kısmen gösterir ama akış eskidikçe kare kaybolur, kapasite ve kalkış noktası bilgisi taşımaz, aramada çıkmaz.",
          "İkinci kırılma fiyatta yaşanıyor. Müşterinin sorduğu ilk soru 'ne kadar' değil, 'buna ne dahil'. Yakıt, kaptan ve mürettebat, ikram, temizlik, iskele ücreti, hafta sonu ve özel gün farkı yazılı değilse aynı yazışma her müşteriyle baştan başlıyor. Sezonun ortasında günde onlarca kez aynı listeyi yazmak da, cevabı bekleyen müşterinin bir sonraki firmaya geçmesi de kimsenin işine gelmiyor.",
          "Üçüncüsü, talebin yılın birkaç ayına sıkışması. Nisandan ekime kadar arama patlar, kışın düşer. O aylarda aramada ve haritada görünmüyorsanız yılın tamamını kaçırmış olursunuz — ve kendi siteniz yoksa geriye tek yol kalır: müşteriyi aracı platformdan almak ve her rezervasyonda komisyon ödemek. Kendi adresiniz, sezonda gelen talebi kimseyle paylaşmadan karşıladığınız tek yerdir.",
        ],
      },
      pricing: {
        title: "Tekne &amp; Yat Kiralama Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Filo ve tur tanıtımı, gerçek çekim galerisi, fiyata dahil olanlar listesi, kalkış noktası ve harita. Tek tık arama ve WhatsApp. Bir iki tekneyle çalışan firmalar için yeterli.",
          },
          {
            name: "Rezervasyonlu filo sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Her tekne için ayrı sayfa, tarih ve kişi sayısı sorulan rezervasyon formu, tur ve organizasyon paketleri, kampanya bölümü ve İngilizce sayfalar. Sezon talebini siteden toplamak isteyenler için.",
          },
          {
            name: "Müsaitlik takvimi & online kapora",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Tekne bazlı doluluk takvimi, sanal POS üzerinden kapora, rezervasyon yönetimi ve mobil uygulama. Filosu deftere sığmayan, aynı gün birden fazla tur çıkaran firmalar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Filonuzu, kalkış noktanızı, tur çeşitlerinizi ve yoğun aylarınızı konuşuruz. Boğaz'da saatlik tur veren bir firmayla Göcek'te haftalık mavi tur satan bir firmanın sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Çekim ve içerik",
            body: "Bu sektörde site görselle ayakta duruyor, o yüzden en çok emek buraya gidiyor. Güverte, kabin, iskele ve gün batımı için bir çekim listesi gönderiyoruz; elinizde uygun kare veya video yoksa birlikte plan yaparız. Fiyata dahil olanlar listesini de bu aşamada netleştiriyoruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, ziyaretçinin o günü hayal edip 'bunu ayırtayım' demesi. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Sezon fiyatlarını ve kampanyaları kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Tekne &amp; Yat Kiralama Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Fiyata dahil olanlar yazılı mı?",
            body: "Bu sektörde en çok yazışma üreten ve en çok müşteri kaçıran konu bu. Yakıt, kaptan, ikram, temizlik ve iskele ücretinin dahil olup olmadığı her tekne sayfasında açıkça yazmalı. Teklif aldığınız ajansa bu bölümün kurgusunu sorun.",
          },
          {
            title: "Her teknenin kendi sayfası var mı?",
            body: "Tek bir 'filomuz' galerisi, arama motorlarında tek bir sayfa demektir. Kapasitesi, boyu ve kalkış noktası ayrı yazılan her tekne, kendi aramasında ayrıca görünme şansı taşır.",
          },
          {
            title: "Kalkış noktası net gösteriliyor mu?",
            body: "Turizmde belirsizlik doğrudan iptal demek. İskelenin adı, haritadaki konumu ve nasıl gidileceği yazılı değilse rezervasyon günü telefon trafiğiyle geçer.",
          },
          {
            title: "Video ve görseller doğru servis ediliyor mu?",
            body: "Videonun sayfa açılışında değil görünür olduğunda yüklendiğini, görsellerin birden fazla boyutta üretildiğini sorun. Çoğu turizm sitesinde bu yapılmıyor ve site telefonda ağır açılıyor.",
          },
          {
            title: "Sezon fiyatlarını kendiniz güncelleyebiliyor musunuz?",
            body: "Fiyat sezon içinde birkaç kez değişir. Her güncelleme için ajansa haber vermek zorundaysanız liste kısa sürede yanlış kalır ve yanlış fiyatla rezervasyon alırsınız.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının firmanız adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Boat & Yacht Charter Website",
      metaDescription:
        "Websites for boat and yacht charter companies. Fleet pages, what's included in the price and one-tap WhatsApp booking. Get a free quote.",
      eyebrow: "For Boat Charter",
      h1: "Boat & Yacht Charter Website",
      intro:
        "Nobody picks a boat by comparing specifications; they picture the day they will spend on deck and book from whoever made them picture it. A site that shows your fleet in real photography, spells out what the price covers and takes the booking in one tap turns that picture into work. Forpus builds sites for boat and yacht charter companies.",
      shortAnswer: {
        title:
          "What does a boat charter website include, and what does it cost?",
        body: "A boat charter website is your own address for showing the fleet, explaining the tours, spelling out what the price covers and taking bookings without a middleman. A typical charter site we build has a separate page per boat carrying capacity, length, cabins and departure point, tour cards for options like a Bosphorus cruise or a sunset trip, a list of what is and is not included in the price, a booking form that asks for dates and group size, one-tap WhatsApp, a gallery and video from real shoots, English pages and a fast, mobile-friendly design. A site covering the fleet and the tours starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full bilingual site with a page per boat and a working booking form sits in the ₺90,000–150,000 band over two to four weeks. Once an availability calendar and online deposits are involved, you are looking at a project starting from ₺220,000. Video loads when it scrolls into view, not on page load: in tourism a heavy site is a lost booking.",
      },
      benefits: [
        {
          title: "Direct bookings",
          body: "Let guests come to you instead of a commission-taking platform; same charter, none of the cut.",
        },
        {
          title: "A storefront that sells the day",
          body: "Real photography and video show the day on deck, so the decision gets made on your site.",
        },
        {
          title: "Be found on Google",
          body: "Show up in search and on the map for 'boat rental in Bodrum' and 'daily yacht charter'.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Boat pages (capacity, length, cabins)",
        "Tour and event packages",
        "What's included in the price",
        "Date-based booking form / WhatsApp",
        "Video and real-shoot gallery",
        "English pages and departure point map",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you build a booking system?",
          a: "Yes. From a simple request form asking for date, time and group size, up to an availability calendar that closes out the days each boat is taken. Firms running one or two boats usually do fine with a date form plus WhatsApp; as the fleet grows and you run several trips a day, a calendar starts to pay for itself.",
        },
        {
          q: "How do we show what the price covers?",
          a: "We build two short lists on every boat and tour page: included and not included — fuel, captain and crew, catering, ice and drinks, cleaning, mooring fees, extra hours. Weekday, weekend and peak-season rates are shown as bands. It becomes one of the most-read sections on the site, and it ends the argument at the pier before it starts.",
        },
        {
          q: "Does every boat need its own page?",
          a: "Not required, but it pays off. Someone looking for a gulet for ten and someone looking for a sunset trip for two are asking different questions; in a single 'our fleet' gallery neither finds it. Separate pages let each boat carry its own capacity, length, cabins and departure point — and let Google show each one for its own search.",
        },
        {
          q: "Will video slow the site down?",
          a: "Not if it is built right. We do not download the video on page load; it plays once it scrolls into view, with a poster image standing in until then. Images are produced at several sizes so a phone never downloads the desktop file. That is the real trade-off in tourism: looking good takes big files, big files lose visitors.",
        },
        {
          q: "Can we take deposits online?",
          a: "Yes. We can add a deposit step wired to your payment provider: the guest picks a date, pays the deposit and settles the rest on the day. We recommend putting your cancellation and weather policy on the same page — trips postponed for wind are unavoidable in this business, and the firm with a written policy does not end up arguing.",
        },
        {
          q: "Can we publish reviews and run campaigns?",
          a: "Yes, freely. This sector is not bound by the promotion restrictions that apply to healthcare, so reviews, ratings, early-booking discounts and special-occasion packages can all sit on the site. We pull your Google reviews into a section and give you a campaign area you update yourself.",
        },
      ],
      ctaTitle: "Let's build a site for your charter business",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "temizlik",
    image: "/generated/personas/temizlik.webp",
    service: "web",
    slug: { tr: "temizlik-sirketi-web-sitesi", en: "cleaning-company-website" },
    tr: {
      metaTitle: "Temizlik Şirketi & Ev Hizmetleri Web Sitesi",
      metaDescription:
        "Ev, ofis ve inşaat sonrası temizlik firmalarına özel web sitesi: metrekare bazlı teklif formu, hizmet bölgesi sayfaları ve Google görünürlüğü.",
      eyebrow: "Temizlik Şirketine Özel",
      h1: "Temizlik Şirketi Web Sitesi",
      intro:
        "Temizlik arayan kişi telefonunu açar, üç firmayı arar ve aynı soruyu üç kez sorar: kaç kişi geliyor, kaç saat sürüyor, ne kadar tutuyor. Bu üç sorunun cevabı sitenizde yazılıysa ve talebi oradan bırakabiliyorsa, o müşteri sizde kalır. Forpus ev, ofis ve inşaat sonrası temizlik firmaları için site kuruyor.",
      shortAnswer: {
        title: "Temizlik şirketi web sitesi ne içerir, ne kadar tutar?",
        body: "Temizlik şirketi web sitesi, hizmetlerinizi ve çalışma bölgelerinizi anlattığınız, teklif taleplerini toplayıp müşteriyi telefon pazarlığından çıkardığınız kendi adresinizdir. Forpus'un kurduğu tipik bir temizlik firması sitesinde ev, ofis ve inşaat sonrası temizlik için ayrı hizmet sayfaları, metrekare ve oda sayısına göre ilerleyen bir teklif formu, çalıştığınız ilçeler için hizmet bölgesi sayfaları, personelin sigortalı olduğunu ve malzemenin kime ait olduğunu yazan bir şartlar bölümü, öncesi-sonrası galerisi, müşteri yorumları, düzenli temizlik aboneliği çağrısı, WhatsApp yönlendirmesi ve mobil uyumlu hızlı bir tasarım bulunur. Hizmetleri ve bölgeleri anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Teklif formunun ve ilçe sayfalarının çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Randevu takvimi, ekip atama ve online ödeme işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Galeriye stok fotoğraf konmaz; kendi ekibinizin ve kendi işinizin kareleri kullanılır. Alan adı ve site sizin adınıza kaydedilir; fiyat bantlarını ve hizmet bölgelerinizi panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Telefonsuz teklif",
          body: "Hizmet tipini ve metrekareyi müşteri kendi girsin; aynı soruyu gün boyu telefonda yanıtlamayın.",
        },
        {
          title: "Bölgenizde bulunun",
          body: "Çalıştığınız her ilçe için ayrı sayfa; 'Kadıköy ev temizliği' gibi aramalarda haritada ve listede görünün.",
        },
        {
          title: "Güven veren şartlar",
          body: "Sigortalı personel, malzeme ve süre bilgisi yazılı olsun; kapıda pazarlık değil, hazır gelen müşteri olsun.",
        },
      ],
      featuresTitle: "Temizlik Şirketi sitenizde neler olur?",
      features: [
        "Ev, ofis ve inşaat sonrası hizmet sayfaları",
        "Metrekare bazlı online teklif formu",
        "Hizmet bölgesi (ilçe) sayfaları",
        "Öncesi-sonrası galerisi ve müşteri yorumları",
        "Düzenli temizlik / abonelik bölümü",
        "WhatsApp, harita ve mobil uyumlu tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Sitede fiyat yazmalı mıyım?",
          a: "Sabit fiyat yazmak zorunda değilsiniz ama hiçbir rakam vermemek size pahalıya patlıyor. Fiyat göremeyen ziyaretçi ya arayıp aynı soruyu soruyor ya da bir sonraki firmaya geçiyor. Genelde şöyle kurguluyoruz: hizmet tipine ve metrekareye göre bir başlangıç bandı, yanında fiyatı neyin değiştirdiğini anlatan kısa bir not — kaç personel geliyor, kaç saat sürüyor, malzeme dahil mi. Böylece pazarlık kapıda değil sitede bitiyor.",
        },
        {
          q: "Metrekareye göre teklif formu kurabilir misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan parça bu. Form hizmet tipini, metrekare ya da oda sayısını, ilçeyi ve tercih edilen tarihi sorar; sonunda ya bir fiyat bandı gösterir ya da talebi doğrudan WhatsApp'ınıza düşürür. İkisi de mümkün. Rakamı ekranda göstermek dönüşümü artırıyor; ama işiniz keşif gerektiren türdense — inşaat sonrası gibi — tahmini bandı gösterip kesin fiyatı keşiften sonra vermek daha doğru olur.",
        },
        {
          q: "Çalıştığım ilçeler için ayrı sayfa gerekli mi?",
          a: "Bu iş bölgesel, arama da bölgesel yapılıyor; tek bir sayfayla bütün ilçe aramalarında çıkmak zor. Hizmet verdiğiniz her ilçe için o bölgeye ait bir sayfa açarız: hangi semtlere gidiyorsunuz, oradan çıkan işlerden kareler, o bölgeden gelen yorumlar. Dürüst uyarı: aynı metnin ilçe adı değiştirilerek otuz kez kopyalanması işe yaramıyor, ters tepiyor. Bu yüzden bölge sayfalarını gerçekten çalıştığınız yerlerle sınırlı tutar ve her birine kendi içeriğini yazarız.",
        },
        {
          q: "Öncesi-sonrası fotoğrafı ve müşteri yorumu koyabilir miyim?",
          a: "Evet, ikisi de serbest. Bu sektör tanıtım kısıtına tabi değil; yorum yayınlayabilir, kampanya duyurabilir, fiyat yazabilirsiniz. Öncesi-sonrası bu işte en ikna edici bölüm, özellikle inşaat sonrası temizlikte ve koltuk-halı yıkamada. Karede müşterinin evi tanınıyorsa yayınlamadan önce onayını almanızı öneririz; bu hukuki bir zorunluluk değil, ilişki gereğidir.",
        },
        {
          q: "Düzenli müşteriyi siteden nasıl kazanırım?",
          a: "Bu işte kâr tek seferlik genel temizlikte değil, haftada ya da iki haftada bir gelen düzenli müşteride. Bu yüzden siteyi tek bir 'teklif al' düğmesine bırakmıyoruz: düzenli temizlik için ayrı bir sayfa açar, aylık paket mantığını yazar ve 'her sefer aynı ekip mi geliyor' sorusunu ayrıca cevaplarız. Düzenli hizmette müşterinin asıl sorduğu şey fiyat değil, sürekliliktir.",
        },
        {
          q: "Kurumsal işler (ofis, site, fabrika) aynı sitede olur mu?",
          a: "Olur ama karıştırılmaması gerekir. Ev müşterisi fiyat ve tarih arıyor; site yöneticisi veya satın almacı personel sayısı, sigorta, sözleşme, iş güvenliği belgeleri ve referans arıyor. Kurumsal tarafı ayrı bir bölüm olarak kurar, oraya referans listesini, belgeleri ve 'kurumsal teklif iste' formunu koyarız. İki kitleye tek sayfada aynı dille seslenen siteler genelde ikisini de kaybediyor.",
        },
        {
          q: "Google Haritalar'da adresimi göstermeden çıkabilir miyim?",
          a: "Evet. Temizlik firmaları Google'ın hizmet bölgesi işletmesi tanımına giriyor; ofis adresini gizleyip hizmet verdiğiniz ilçeleri tanımlayabiliyorsunuz. İşi ev ofisinden yönetiyorsanız doğru kurulum budur. İşletme Profilinizi kurar veya düzenler, kategorileri ve hizmet bölgelerini girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama adımını sizin tamamlamanız gerekir.",
        },
        {
          q: "Mobil uygulama gerekir mi?",
          a: "Çoğu temizlik firması için gerekmez; site ve WhatsApp yetiyor. Uygulama, iş düzenli ve tekrar eden hale geldiğinde anlam kazanıyor: müşteri her seferinde yeniden fiyat sormak yerine uygulamadan tarih seçip ödüyorsa. Temizlik Express'te tam olarak bunu yaptık — hizmet talebinden ödemeye kadar akışı uygulamaya taşıdık ve iOS, Android ile AppGallery'de yayınladık. Sizin hacminiz henüz oraya gelmediyse dürüst cevap 'şimdilik gerekmez' olur.",
        },
        {
          q: "Temizlik şirketi web sitesi ne kadar tutar?",
          a: "Hizmetleri ve bölgeleri anlatan, WhatsApp yönlendirmeli bir tanıtım sitesi ₺50.000–85.000 aralığında başlar. Metrekare bazlı teklif formunun ve ilçe sayfalarının çalıştığı tam bir site ₺90.000–150.000 aralığındadır. Randevu takvimi, ekiplere iş atama ve online ödeme işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Evine temizlik arayan kişi tek bir soruyla başlar: ne kadar tutar. Cevabı bulmak için üç dört firmayı arar ve aynı soruyu her birine tekrar sorar — kaç kişi geliyor, kaç saat kalıyor, malzeme sizde mi. Bu telefon trafiği iki tarafı da yoruyor. Fiyatın neye göre değiştiğini yazan bir sayfanız varsa o aramaların çoğu, daha siz konuşmadan kararı verilmiş bir talebe dönüşüyor.",
          "İkinci soru fiyattan daha ağır: eve kim giriyor. Müşteri tanımadığı birini evine alacak. Personelinizin sigortalı olup olmadığı, ekibin sabit mi yoksa her sefer farklı mı geldiği, bir şey kırılırsa ne olacağı, ödemenin ne zaman alındığı — bunlar yazılı değilse tereddüt kalır ve tereddüt eden kişi aramaz. Sosyal medya bu soruların hiçbirine cevap vermiyor; orada iş fotoğrafı var, şart yok.",
          "Üçüncüsü, bu işte aramanın bölgesel olmasıdır. Kimse düz biçimde 'temizlik şirketi' diye aramıyor; 'Ataşehir ev temizliği', 'inşaat sonrası temizlik Üsküdar' diye arıyor. Kendi siteniz yokken elinizde haritadaki kaydınız ve birkaç yorum kalır; hangi ilçelere gittiğinizi, hangi hizmetleri verdiğinizi ve düzenli müşteriye ne sunduğunuzu anlatacak bir yer hiçbir yerde yoktur. Oysa bu işte asıl kazanç tek seferlik genel temizlikte değil, her hafta aynı eve giden ekiptedir.",
        ],
      },
      pricing: {
        title: "Temizlik Şirketi Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Ev, ofis ve inşaat sonrası için hizmet sayfaları, çalışma bölgeleri, öncesi-sonrası galerisi, yorumlar, harita ve tek tık WhatsApp. Talebin ağırlıkla telefondan geldiği firmalar için yeterli.",
          },
          {
            name: "Teklif formlu site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Hizmet tipi ve metrekareye göre ilerleyen teklif formu, çalıştığınız ilçeler için ayrı bölge sayfaları, düzenli temizlik aboneliği bölümü ve ayrı bir kurumsal teklif akışı. Talebi siteden toplamak isteyenler için.",
          },
          {
            name: "Randevu & ekip yönetimi",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Takvimli randevu, ekiplere iş atama, müşteri ve adres geçmişi, düzenli hizmet tekrarı ve online ödeme. İş sayısı defterle veya WhatsApp gruplarıyla yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi hizmetleri verdiğinizi, hangi ilçelere gittiğinizi, ekip sayınızı ve fiyatı neyin belirlediğini konuşuruz. Üç kişilik bir ev temizliği ekibiyle kurumsal ihaleye giren bir firmanın sitesi aynı olmaz. Dezenfeksiyon veya ilaçlama gibi izne bağlı hizmetleriniz varsa belgenizi sitede göstermeyi de buraya not ederiz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Fiyat mantığı ve içerik",
            body: "Teklif formunun soracağı soruları ve fiyat bantlarını birlikte belirleriz; sitenin en kritik parçası burasıdır. Aynı aşamada öncesi-sonrası karelerini, ekip ve araç fotoğraflarını ve yorumları toplarız. Elinizde uygun kare yoksa neyi nasıl çekeceğinizi anlatan kısa bir liste gönderiyoruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, ziyaretçinin 'bunlar düzgün çalışıyor' demesi ve teklif formuna kadar hiç durmadan gitmesi. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız; hizmet bölgelerinizi profilde de tanımlarız. Fiyat bantlarını ve bölgeleri kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Temizlik Şirketi Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Teklif formu doğru soruları soruyor mu?",
            body: "Yalnızca ad ve telefon alan bir kutu teklif formu değildir. Hizmet tipi, metrekare ya da oda sayısı, ilçe ve tarih sorulmuyorsa aynı soruları yine siz telefonda soracaksınız — yani form hiçbir işinizi hafifletmemiş olur.",
          },
          {
            title: "Hizmet bölgeleri sayfa olarak var mı?",
            body: "Aramalar ilçe adıyla yapılıyor. 'Hizmet verdiğimiz bölgeler' başlığı altına bir liste yazmak yetmez; gerçekten çalıştığınız ilçeler için kendi içeriği olan ayrı sayfalar gerekir. Teklife dahil mi, sorun.",
          },
          {
            title: "Şartlar yazılı mı?",
            body: "Personelin sigortalı olup olmadığı, malzeme ve ekipmanın kime ait olduğu, kaç kişinin kaç saat çalışacağı ve hasar durumunda ne olacağı yazılı değilse aynı tartışma her işte kapıda tekrar eder.",
          },
          {
            title: "Fiyat bantlarını kendiniz güncelleyebiliyor musunuz?",
            body: "Bu sektörde fiyat sık değişiyor. Her güncelleme için ajansa haber vermek zorundaysanız site kısa sürede yanlış rakamı gösterir ve müşteriyle karşı karşıya gelirsiniz.",
          },
          {
            title: "Galeri kendi işiniz mi?",
            body: "İnternetten alınmış kusursuz salon fotoğrafları bu işte güven değil şüphe üretiyor. Kendi öncesi-sonrası karelerinizin ve kendi ekibinizin fotoğraflanması, bu sitede yapılacak en değerli yatırımdır.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının firmanız adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Cleaning Company Website Design",
      metaDescription:
        "Websites for home, office and post-construction cleaning companies. Online quote forms, service-area pages and Google visibility. Get a free quote.",
      eyebrow: "For Cleaning Companies",
      h1: "Cleaning Company Website",
      intro:
        "Someone looking for a cleaner calls three companies and asks the same three questions: how many people come, how long does it take, what does it cost. Answer those on your site and let them request a quote right there, and that customer stays with you. Forpus builds sites for home, office and post-construction cleaning companies.",
      shortAnswer: {
        title:
          "What does a cleaning company website include, and what does it cost?",
        body: "A cleaning company website is your own address for explaining your services and the districts you cover, and for collecting quote requests instead of repeating the same phone call. A typical site we build has separate pages for home, office and post-construction cleaning, a quote form driven by service type and square metres, service-area pages for the districts you actually work in, a terms section stating whether staff are insured and who supplies the materials, a before-and-after gallery, customer reviews, a recurring-cleaning section, WhatsApp and a fast, mobile-first design. A presentation site covering services and areas starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full site with a working quote form and district pages sits in the ₺90,000–150,000 band over two to four weeks. Once a booking calendar, crew assignment and online payment are involved, you are looking at a project starting from ₺220,000. The gallery uses your own team and your own work, never stock photography.",
      },
      benefits: [
        {
          title: "Quotes without the phone call",
          body: "Let customers enter the service type and the size themselves instead of asking you the same question by phone.",
        },
        {
          title: "Found in your districts",
          body: "A page for every district you cover, so you show up for searches like 'home cleaning in Kadıköy'.",
        },
        {
          title: "Terms that build trust",
          body: "Insured staff, materials and hours written down, so customers arrive ready instead of haggling at the door.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Home, office and post-construction service pages",
        "Quote form based on size and service type",
        "Service-area (district) pages",
        "Before-and-after gallery and reviews",
        "Recurring cleaning / subscription section",
        "WhatsApp, map and mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you build a quote form based on square metres?",
          a: "Yes, and it is the part that pays for itself here. The form asks for service type, square metres or room count, district and preferred date, then either shows a price band or drops the request straight into your WhatsApp. Either works. Showing a figure on screen lifts conversion, but if your work needs a site visit first — post-construction cleaning, for example — it is better to show an estimate band and quote firmly after the visit.",
        },
        {
          q: "Do I need a separate page for each district?",
          a: "This work is local and so are the searches, so a single page rarely covers them all. We build a real page for each district you serve: the neighbourhoods you reach, photos from jobs there, reviews from those customers. One honest warning: copying the same text thirty times with the district name swapped does not work and can backfire. We keep these pages to the areas you genuinely cover and give each one its own content.",
        },
        {
          q: "Can I publish before-and-after photos and reviews?",
          a: "Yes, both are entirely free of restriction in this sector. You can publish reviews, announce campaigns and list prices. Before-and-after is the most persuasive section you have, especially for post-construction cleaning and upholstery work. If a customer's home is recognisable in the shot, we suggest asking them first — not a legal requirement, just good practice.",
        },
        {
          q: "Can corporate work sit on the same site?",
          a: "It can, but the two must not be mixed. A household customer wants a price and a date; a building manager or procurement officer wants headcount, insurance, contracts, safety documentation and references. We build the corporate side as its own section with a reference list, documents and a separate 'request a corporate quote' form. Sites that address both audiences in one voice tend to lose both.",
        },
        {
          q: "Can I appear on Google Maps without showing my address?",
          a: "Yes. Cleaning companies qualify as a service-area business, so you can hide the office address and define the districts you serve instead. If you run the business from home, that is the correct setup. We create or clean up your Business Profile, set the categories and service areas and connect it to the site. The profile stays in your ownership; the verification step is yours to complete.",
        },
        {
          q: "Do I need a mobile app?",
          a: "Most cleaning companies do not; a site plus WhatsApp is enough. An app starts to make sense once the work becomes regular and repeating — when a customer would rather pick a date and pay in the app than ask for a price again. That is exactly what we built for Temizlik Express: the whole flow from service request to payment, shipped on iOS, Android and AppGallery. If your volume is not there yet, the honest answer is 'not yet'.",
        },
      ],
      ctaTitle: "Let's build a site for your company",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "insaat",
    image: "/generated/personas/insaat.webp",
    service: "web",
    slug: {
      tr: "insaat-firmasi-web-sitesi",
      en: "construction-company-website",
    },
    tr: {
      metaTitle: "İnşaat Firması & Kentsel Dönüşüm Web Sitesi",
      metaDescription:
        "İnşaat firmaları ve kentsel dönüşüm müteahhitlerine özel web sitesi. Bitmiş proje sayfaları, şantiye takibi ve bina değerlendirme formu. Ücretsiz teklif alın.",
      eyebrow: "İnşaat Firmasına Özel",
      h1: "İnşaat Firması & Kentsel Dönüşüm Web Sitesi",
      intro:
        "Kat maliki binasını kime emanet edeceğine karar verirken önce firmanızın adını aratıyor. Teslim ettiğiniz binaları adresiyle gösteren, süreci anlatan ve bina bilgisiyle talep toplayan bir site, o kararı sizin lehinize çevirir. Forpus inşaat firmaları ve kentsel dönüşüm müteahhitleri için site kuruyor.",
      shortAnswer: {
        title: "İnşaat firması web sitesi ne içerir, ne kadar tutar?",
        body: "İnşaat firması web sitesi, teslim ettiğiniz binaları tek tek gösterdiğiniz, devam eden şantiyelerinizi takip ettirdiğiniz ve bina sahiplerinin size ulaştığı kendi adresinizdir. Forpus'un kurduğu tipik bir müteahhit sitesinde adres, daire sayısı, teslim yılı ve iskân durumuyla listelenen bitmiş proje sayfaları, ilerleme fotoğraflarıyla güncellenen devam eden şantiyeler, kentsel dönüşüm sürecini adım adım anlatan bir rehber bölümü, yapı müteahhitliği yetki belgesi numarasını içeren firma künyesi, satılık daireler için kat planlı listeleme, adres ve ada-parsel bilgisiyle gelen bina değerlendirme formu, harita bağlantısı ve mobil uyumlu hızlı bir tasarım bulunur. Firmayı ve biten işleri anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Her projenin ayrı sayfalandığı, daire listelemesi ve değerlendirme formu çalışan tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Kat maliklerinin girip ilerleme gördüğü bir şantiye takip paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Galeriye yalnızca render konmaz; teslim edilmiş binaların gerçek fotoğrafı esastır. Alan adı ve site sizin adınıza kaydedilir, yeni projeleri panelden kendiniz eklersiniz.",
      },
      benefits: [
        {
          title: "Biten işin kanıtı",
          body: "Teslim ettiğiniz binaları adresi, daire sayısı ve yılıyla gösterin; kat maliki kime imza atacağını görsün.",
        },
        {
          title: "İşe yarar talep",
          body: "Adres, ada-parsel ve daire sayısıyla gelen değerlendirme formu, telefonda dağılan görüşmeyi hesaplanabilir bir dosyaya çevirir.",
        },
        {
          title: "Semtinizde bulunun",
          body: "'Kentsel dönüşüm müteahhidi' aramalarında ilçe ve semt bazında görünecek bir yapı kurarız.",
        },
      ],
      featuresTitle: "İnşaat Firması & Kentsel Dönüşüm sitenizde neler olur?",
      features: [
        "Bitmiş proje sayfaları (adres, daire, teslim yılı)",
        "Devam eden şantiye ve ilerleme fotoğrafları",
        "Kentsel dönüşüm ve kat karşılığı rehberi",
        "Ada-parsel bilgisi alan bina değerlendirme formu",
        "Satılık daire listeleme ve kat planları",
        "Firma künyesi, yetki belgesi, harita, WhatsApp",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Bitmiş projelerimizi sitede nasıl gösteriyorsunuz?",
          a: "Her bina kendi sayfasını alır: semt ve adres, daire ve kat sayısı, başlangıç ile teslim tarihi, iskân durumu, kullanılan malzemeler ve fotoğraf galerisi. Toplu bir referans galerisi yerine ayrı ayrı sayfalar kurmamızın iki sebebi var: kat maliki tek tek inceleyebiliyor ve Google her binayı ayrı bir sayfa olarak dizine alabiliyor. Semt adıyla yapılan aramalarda en çok işe yarayan sayfalar bunlar oluyor.",
        },
        {
          q: "Devam eden şantiyeyi siteden takip ettirebilir miyiz?",
          a: "Evet. En basit hâli, her şantiye için ilerleme fotoğraflarını tarihiyle yayınladığınız bir sayfa; kat malikleri de daire arayanlar da oradan bakar. Bir üst kademede kat maliklerine özel bir giriş kurarız: kaba inşaat, çatı, sıva gibi aşamaları işaretlersiniz, belge ve fotoğrafları o binanın maliklerine açarsınız. Bu, haftada bir gelen 'ne durumdayız' aramalarını tek yerde toplar.",
        },
        {
          q: "Kentsel dönüşüm sürecini sitede anlatmak işe yarar mı?",
          a: "Bu sitenin en çok ziyaret alan bölümü genelde burası oluyor. Riskli yapı tespiti nasıl yapılır, kat malikleri kararı nasıl alınır, kira yardımı ne zaman başlar, sözleşmede nelere bakılır, teslim süresi neye göre değişir — bunları kendi çalışma biçiminizle anlatan bir rehber, aramadan gelen kişiyi karşılar ve masaya oturduğunuzda konuşacağınız şeyin yarısını halleder. Genel geçer bir mevzuat kopyası değil, sizin nasıl çalıştığınızı anlatan bir metin yazarız.",
        },
        {
          q: "İnşaat firması web sitesi ne kadar tutar?",
          a: "Firma tanıtımı, bitmiş projeler galerisi ve iletişim odaklı bir site ₺50.000–85.000 aralığında başlar. Her projenin ayrı sayfalandığı, şantiye takibi, daire listelemesi ve ada-parsel bilgisi alan değerlendirme formu olan bir site ₺90.000–150.000 aralığındadır. Kat maliklerine açılan bir şantiye takip paneli ve mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Satılık dairelerimizi siteden satabilir miyiz?",
          a: "Satışı siteden tamamlamazsınız, ama satışın başladığı yer burası olur. Her daire için kat planı, brüt-net metrekare, cephe, kat, teslim tarihi ve durum bilgisi (satıldı, opsiyonlu, müsait) yayınlarız; ilgilenen kişi doğrudan satış ekibinize düşen bir form doldurur ya da WhatsApp'a geçer. İlan portallarındaki kaydınız yerinde kalır; site, oradan gelen kişinin firmayı araştırdığı yer olur.",
        },
        {
          q: "Render mi kullanalım, gerçek fotoğraf mı?",
          a: "İkisi de gerekir ama karıştırılmamalı. Henüz yapılmamış proje için render doğaldır; üzerine 'görsel temsilidir' notu koyarız. Güveni kuran ise teslim edilmiş binaların gerçek fotoğrafıdır. Baştan sona renderdan oluşan bir site, hiç iş teslim etmemiş bir firma izlenimi bırakıyor — kat maliki bunu fark ediyor. Elinizde iyi kare yoksa bitmiş binalarınız için kısa bir çekim listesi hazırlarız.",
        },
        {
          q: "Yetki belgesi ve firma bilgilerini sitede yazmalı mıyım?",
          a: "Yazmanızı öneriyoruz. Yapı müteahhitliği yetki belgesi numarası, ticaret unvanı, sicil bilgisi ve merkez adresi tek bir künye bölümünde dursun. Bu bilgiler zaten kontrol edilebilir durumda; sitede açıkça göstermek 'saklayacak bir şeyi yok' izlenimini kuruyor. Kat malikleri arasında bunu araştıran birinin çıkması sandığınızdan sık oluyor.",
        },
        {
          q: "Belirli ilçelerde görünmemize yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. Çalıştığınız ilçe ve semtler için ayrı sayfalar kurar, o bölgede teslim ettiğiniz binaları o sayfaya bağlarız. Google İşletme Profilinizi de kurar veya düzenler, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Elinizde dağınık duran proje arşivini de bu sırada toparlar, her binayı kendi sayfasına taşırız.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Kat maliki, ömrünün en büyük varlığını bir firmaya teslim etmeye karar veriyor. Bu kararı vermeden önce yaptığı ilk şey firmanızın adını aratmak oluyor. Karşısına çıkan şey birkaç ilan, bir iki sosyal medya gönderisi ve haritadaki adresinizse, elinde tartabileceği hiçbir şey yok demektir. Hangi binaları bitirdiğiniz, kaç daire teslim ettiğiniz ve o binaların bugün nasıl göründüğü hiçbir yerde yazmıyor.",
          "İkinci kırılma sürecin kendisinde. Riskli yapı tespitinden çoğunluk kararına, kira yardımından teslim süresine kadar bu işin adımlarını kat malikleri genelde komşudan, kahvede ya da yarım yamalak duyduğu bir örnekten öğreniyor. Siz anlatmazsanız masaya yanlış bilgiyle ve tedirgin oturuyorlar; toplantının yarısı sürecin nasıl işlediğini düzeltmekle geçiyor.",
          "Üçüncüsü, gelen talebin niteliği. Telefonda sorulan 'bizim binaya ne verirsiniz' sorusunun cevabı yok: adres yok, parsel yok, daire sayısı yok, arsa payı yok. Bu bilgiler siteden toplanmadığında her görüşme sıfırdan başlıyor ve ciddi olmayan talep ciddi olanla aynı vakti yiyor. Kendi siteniz olmadığında elinizde bir ilan sayfası ve birkaç şantiye fotoğrafı kalır; bitirdiğiniz işleri, çalışma biçiminizi ve şartlarınızı anlatacak yer hiçbir yerde yoktur.",
        ],
      },
      pricing: {
        title: "İnşaat Firması & Kentsel Dönüşüm Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kurumsal tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Firma tanıtımı, bitmiş projeler galerisi, çalışma alanları, künye ve yetki belgesi, harita ile tek tık WhatsApp. Tek bölgede çalışan ve işlerini toplu göstermek isteyen firmalar için yeterli.",
          },
          {
            name: "Proje sayfalı site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Her binaya ayrı proje sayfası, devam eden şantiyeler ve ilerleme fotoğrafları, kentsel dönüşüm rehberi, ada-parsel bilgisi alan değerlendirme formu, kat planlı daire listelemesi ve ilçe sayfaları.",
          },
          {
            name: "Şantiye takip paneli & mobil",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Kat maliklerine ve daire alıcılarına açılan giriş, aşama ve ilerleme takibi, belge paylaşımı, bildirim ve mobil uygulama. Aynı anda birden fazla şantiye yürüten firmalar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Çalıştığınız ilçeleri, iş modelinizi ve kime hitap ettiğinizi konuşuruz. Kat karşılığı dönüşüm yapan bir firmayla kendi arsasına üretip daire satan bir firmanın sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Proje arşivi ve içerik",
            body: "Bu sitenin gücü arşivden geliyor, o yüzden en çok emek buraya gidiyor. Teslim ettiğiniz binaların adresini, daire sayısını, yılını ve fotoğraflarını toplarız; kare bulunmayan binalar için kısa bir çekim listesi göndeririz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, siteye giren kat malikinin 'bu firma iş bitiriyor' demesi. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Yeni projeleri ve şantiye fotoğraflarını kendiniz ekleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "İnşaat Firması & Kentsel Dönüşüm Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Bitmiş projeler tek tek sayfalanıyor mu?",
            body: "İsimsiz yirmi fotoğraftan oluşan bir 'referanslar' galerisi kimseye bir şey anlatmaz. Her binanın adresi, daire sayısı ve teslim yılıyla kendi sayfası olmalı. Teklif aldığınız ajansa proje sayfası kurup kurmadığını sorun.",
          },
          {
            title: "Yeni projeyi panelden kendiniz ekleyebiliyor musunuz?",
            body: "Bir yılda bir bina teslim ediyorsanız site yılda bir güncellenmeli. Her yeni proje ve her şantiye fotoğrafı için ajansa haber vermek zorundaysanız site yayına girdiği günde donar.",
          },
          {
            title: "Render ile gerçek fotoğraf ayrılmış mı?",
            body: "Yapılmamış bir projenin görselini bitmiş bina gibi göstermek, teslimde ilk tartışma konusu oluyor. Render'ların açıkça işaretlendiğinden emin olun.",
          },
          {
            title: "Talep formu işe yarar bilgi topluyor mu?",
            body: "Ad ve telefon soran form, form değil sadece bir iletişim kutusudur. Adres, ada-parsel, daire ve kat sayısı ile bina yaşını alan bir form, ilk telefonda konuşacağınız şeyi hazır getirir.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Bu aramaların neredeyse tamamı telefondan yapılıyor ve proje sayfaları fotoğraf ağırlıklı. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının firmanız adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Construction Company & Urban Renewal Website",
      metaDescription:
        "Websites for construction firms and urban renewal contractors: completed project pages, site progress tracking and forms that collect real building details.",
      eyebrow: "For Construction Firms",
      h1: "Construction Company Website",
      intro:
        "Owners deciding who to trust with their building look your firm up first. A site that shows the buildings you delivered — address, unit count, year — explains the process and collects real project details turns that decision your way. Forpus builds sites for construction firms and urban renewal contractors.",
      shortAnswer: {
        title:
          "What does a construction company website include, and what does it cost?",
        body: "A construction company website is your own address for showing every building you delivered, letting people follow your active sites and collecting enquiries from property owners. A typical contractor site we build carries a page per completed project with address, unit count, delivery year and occupancy status, active site pages updated with progress photos, a guide explaining the urban renewal and land-share process step by step, a company panel with your contractor licence number, listings for units on sale with floor plans, a building assessment form that captures the address and parcel details, a map link and a fast mobile-first design. A presentation site covering the firm and its finished work runs ₺50,000–85,000 and goes live in one to two weeks. A full site with a page per project, unit listings and a working assessment form runs ₺90,000–150,000 over two to four weeks. Once a site-progress panel for owners is involved, you are looking at a project starting from ₺220,000. Renders alone do not carry a gallery here — real photos of delivered buildings do.",
      },
      benefits: [
        {
          title: "Proof of finished work",
          body: "Show the buildings you delivered with address, unit count and year, so owners can see who they are signing with.",
        },
        {
          title: "Enquiries worth answering",
          body: "A form that captures the address, parcel and unit count turns a vague phone call into a file you can actually price.",
        },
        {
          title: "Found district by district",
          body: "A structure built to show up for urban renewal contractor searches in the districts you actually work in.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Project pages with address, units and year",
        "Active sites and progress photos",
        "Urban renewal and land-share guide",
        "Assessment form with parcel details",
        "Unit listings with floor plans",
        "Company panel, licence number, map, WhatsApp",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "How do you present our completed projects?",
          a: "Each building gets its own page: district and address, unit and floor count, start and delivery dates, occupancy status, materials used and a photo gallery. Separate pages beat one big reference gallery for two reasons — owners can go through them one by one, and Google can index each building as its own page.",
        },
        {
          q: "Can owners follow an active construction site through the website?",
          a: "Yes. At its simplest, a page per site where you publish dated progress photos. A step further, we build a private login for the owners of that building: you mark stages like structure, roof and plaster, and share documents and photos with them. It collects the weekly 'where are we' calls in one place.",
        },
        {
          q: "Is it worth explaining the urban renewal process on the site?",
          a: "That section usually becomes the most visited part of the site. How the risk assessment works, how the owners' decision is taken, when rent support starts, what to look for in the contract — written in your own way of working, it meets people arriving from search and settles half of what you would otherwise explain at the table.",
        },
        {
          q: "Renders or real photos?",
          a: "Both, but never mixed. Renders are natural for a project not yet built, and we label them as such. Trust comes from real photos of delivered buildings. A site made entirely of renders reads like a firm that has never handed anything over, and owners notice.",
        },
        {
          q: "Can we sell units through the site?",
          a: "You will not close a sale on the site, but that is where it starts. Each unit gets a floor plan, gross and net area, aspect, floor, delivery date and status; interested buyers fill a form that lands with your sales team or move to WhatsApp. Your listings on property portals stay where they are.",
        },
        {
          q: "Can you refresh our existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones. We also tidy up a scattered project archive along the way and give every building its own page.",
        },
      ],
      ctaTitle: "Let's build a site for your firm",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "ges",
    image: "/generated/personas/ges.webp",
    service: "web",
    slug: { tr: "gunes-enerjisi-web-sitesi", en: "solar-energy-website" },
    tr: {
      metaTitle: "Güneş Enerjisi & Çatı GES Firması Web Sitesi",
      metaDescription:
        "Güneş enerjisi ve çatı GES firmalarına özel web sitesi. Referans santral arşivi, geri ödeme hesabı ve fatura bilgisi alan keşif formu. Ücretsiz teklif alın.",
      eyebrow: "Güneş Enerjisine Özel",
      h1: "Güneş Enerjisi & Çatı GES Firması Web Sitesi",
      intro:
        "Çatısına güneş paneli düşünen fabrika sahibi de ev sahibi de aynı iki soruyla geliyor: bu iş bana kaça mal olur, kaç yılda kendini öder. Kurduğunuz santralleri gücüyle ve şehriyle gösteren, fatura ile çatı bilgisini alıp keşfe çeviren bir site, o iki soruyu telefonda değil sitede karşılar. Forpus güneş enerjisi ve çatı GES firmaları için site kuruyor.",
      shortAnswer: {
        title: "Güneş enerjisi firması web sitesi ne içerir, ne kadar tutar?",
        body: "Güneş enerjisi firması web sitesi, kurduğunuz santralleri gösterdiğiniz ve çatı sahibinin fatura ile çatı bilgisini bırakıp keşif istediği kendi adresinizdir. Forpus'un kurduğu tipik bir GES sitesinde mesken, sanayi çatısı ve tarımsal sulama için ayrı çözüm sayfaları, fatura tutarını ve çatı tipini soran bir keşif talep formu, kaba üretim ve geri ödeme hesabı veren bir araç, kurulu gücü ve şehriyle listelenen referans santral arşivi, lisanssız üretim başvurusundan geçici kabule kadar süreci anlatan bir bölüm, panel ve inverter garanti şartları, bakım ve temizlik hizmet sayfası ve mobil uyumlu hızlı bir tasarım bulunur. Firmayı ve referanslarını anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Çözüm sayfalarının ayrıldığı, hesaplama aracının ve keşif formunun çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Bayi paneli, teklif üretimi ve üretim izleme ekranı işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Referans bölümüne stok görsel konmaz; alıcı gerçek çatıyı görmek ister. Alan adı ve site sizin adınıza kaydedilir; yeni santralleri arşive kendiniz eklersiniz.",
      },
      benefits: [
        {
          title: "Ölçülebilir keşif talebi",
          body: "Fatura tutarı, çatı tipi ve alan formda sorulsun; masanıza gelen talep daha ilk okumada değerlendirilebilir olsun.",
        },
        {
          title: "Referansla kanıt",
          body: "Kurduğunuz santralleri gücü, şehri ve kendi fotoğrafıyla listeleyin; alıcının en büyük tereddüdü orada çözülsün.",
        },
        {
          title: "Google'da bulunun",
          body: "'Çatı GES' ve 'güneş paneli kurulumu' aramalarında, çalıştığınız iller bazında görünecek bir yapı.",
        },
      ],
      featuresTitle: "Güneş Enerjisi & Çatı GES Firması sitenizde neler olur?",
      features: [
        "Mesken, sanayi ve tarımsal sulama çözüm sayfaları",
        "Fatura ve çatı bilgisi alan keşif formu",
        "Üretim ve geri ödeme hesaplama aracı",
        "Referans santral arşivi (kWp, şehir, çatı tipi)",
        "Süreç anlatımı: başvurudan geçici kabule",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Sitede geri ödeme hesabı yapan bir araç olabilir mi?",
          a: "Evet, bu sektörde en çok işe yarayan bölüm bu. Ziyaretçi aylık fatura tutarını, ilini ve kabaca çatı alanını girer; site tahmini kurulu gücü, yıllık üretimi ve kaba bir geri ödeme aralığı gösterir. Katsayıları ve varsayımları siz verirsiniz, biz kurarız. Aracın altına 'bu kaba bir ön hesaptır, kesin rakam keşiften sonra çıkar' notunu mutlaka koyarız; hem beklentiyi doğru kurar hem sizi sonradan tartışmadan korur.",
        },
        {
          q: "Referans santrallerimizi nasıl gösteriyorsunuz?",
          a: "Her santral için ayrı bir kayıt açarız: kurulu güç, şehir, çatı tipi, kurulum yılı ve saha fotoğrafları. Ziyaretçi bunları güce ve çatı tipine göre süzebilir. Sanayi çatısı arayan biri 400 kWp'lik bir fabrika işinizi, ev sahibi 10 kWp'lik mesken işinizi görmek ister; aynı listede karışık durduklarında ikisi de aradığını bulamaz. Yeni santralleri panelden kendiniz eklersiniz, arşiv zamanla en güçlü satış aracınız olur.",
        },
        {
          q: "Sitede fiyat yazmalı mıyım?",
          a: "Kilowatt başına sabit bir rakam yazmanızı önermiyoruz; kur, panel ve çatı yapısı değiştikçe o rakam kısa sürede yanlışa döner ve müşteriyle sorun çıkarır. Bunun yerine örnek projeler koyarız: 'şu ilde, şu çatıda, şu güçte bir sistem kurduk, aylık faturası şuydu.' Alıcı büyüklüğü buradan kestirir, siz de kendinizi bir fiyata bağlamamış olursunuz. Fiyat aralığı vermek isteyen firmalar için de bant yazımını doğru kurgularız.",
        },
        {
          q: "Mesken ve sanayi için ayrı sayfa şart mı?",
          a: "Şart değil ama en çok kazandıran ayrımlardan biri. Ev sahibi mahsuplaşmayı, apartman iznini ve kiremit çatıya montajı merak eder; fabrika sahibi öz tüketimi, sandviç panel çatının statiğini ve üretimin vardiya saatlerine denk gelip gelmediğini. Ayrı sayfalarda her iki alıcı da kendi sorusunun cevabını bulur, Google da sizi iki farklı aramada gösterebilir. Tarımsal sulama için çalışıyorsanız üçüncü bir sayfa açarız.",
        },
        {
          q: "Lisanssız üretim sürecini sitede anlatmalı mıyız?",
          a: "Anlatın; alıcının en çok gözünü korkutan kısım burası ve rakiplerin çoğu bu sayfayı hiç açmıyor. Başvuru, çağrı mektubu, proje onayı, montaj, geçici kabul ve sayaç değişimi adımlarını sizin verdiğiniz bilgiyle sade bir akışa döker, 'bu adımların hangisini biz takip ediyoruz' kısmını net yazarız. Mevzuat değiştiğinde metni kendiniz güncelleyebilmeniz için bu sayfayı panelden düzenlenebilir bırakırız.",
        },
        {
          q: "Bakım, temizlik ve arıza hizmetimizi de gösterebilir miyiz?",
          a: "Evet, ayrı bir hizmet sayfası açarız. Bu hem kurulum yaptırdığınız müşteriyi elinizde tutar hem de başka firmaya kurdurup sonradan sahipsiz kalmış santral sahiplerinden talep getirir. Panel temizliği, periyodik bakım, inverter arızası ve üretim düşüşü tespiti gibi başlıklar ayrı ayrı yazıldığında bunlar da tek tek aranan konulardır.",
        },
        {
          q: "Bayilerimiz ve iş ortaklarımız için bir panel kurabilir misiniz?",
          a: "Evet. Bayi girişi, illere göre gelen talebin ilgili bayiye yönlendirilmesi, standart teklif üretimi ve keşif takibi kurulabilir. Bu, üçüncü fiyat kademesindeki projelerin kapsamına giriyor. Küçük ve tek ofisli firmalarda buna gerek olmuyor; taleplerin bir e-postaya ve WhatsApp'a düşmesi yetiyor, dürüst yanıt budur.",
        },
        {
          q: "Google ve Meta reklamlarını da yönetiyor musunuz?",
          a: "Evet, web tarafıyla birlikte yürütüyoruz. Bu sektörde arama reklamı doğrudan niyetli talebi yakalıyor, Meta tarafı ise daha çok bilinirlik ve ilgi topluyor. İkisinde de belirleyici olan reklam değil, reklamın indiği sayfa ve formun sorduğu sorular: aynı bütçe, doğru kurulmuş bir keşif formuyla çok daha az boş görüşme üretiyor.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Elinizde referans santral listesi ve saha fotoğrafı arşivi varsa yeni yapıya taşınır; hangi görsellerin yayınlanabilir olduğunu başta birlikte netleştiririz.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Çatı GES kararı bir ürün kararı değil, yatırım kararıdır. Karşınızdaki kişi panel markası merak ederek başlamaz; 'benim çatıma kaç kilowatt sığar, bu bana kaça mal olur, kaç yılda kendini öder' diye başlar. Sitenizde bu üç sorunun kaba cevabı yoksa ziyaretçi cevabı almak için sizi aramaz, bir sonraki firmanın sitesine geçer. Bu sektörde araştırma süreci haftalar sürüyor ve alıcı bu sürenin tamamını okuyarak geçiriyor.",
          "İkinci kırılma teklif aşamasında yaşanır. 'Bilgi alın' yazan boş bir form, çatı tipini, yaklaşık alanı, aylık fatura tutarını ve ili sormadığı için elinize sadece bir isim ve telefon bırakır. Sonrasında hepsini telefonda tek tek sormanız gerekir; üstelik gelen taleplerin bir kısmı kiracı, bir kısmı çatısı uygun olmayan, bir kısmı da sadece fiyat merak eden kişilerdir. Formu doğru kurmak, keşfe çıkmadan önce eleme yapmanızı sağlar.",
          "Üçüncüsü güven. Bu sektörde iş bitirip ortadan kaybolan firma hikâyeleri dolaşıyor ve alıcı bunu biliyor; sorduğu sorular da bu yüzden 'kim kurdu, garanti kimde, arıza çıkarsa kimi arayacağım' etrafında dönüyor. Kurduğunuz santralleri kurulu gücü, şehri ve tarihiyle listeleyen bir arşiviniz, garanti ve satış sonrası şartlarınızı yazan bir sayfanız yoksa, elinizde kalan tek kanıt WhatsApp'tan gönderdiğiniz birkaç fotoğraf olur. Aynı işi yapan iki firmadan biri bunu yazılı gösteriyorsa, keşif randevusunu o alıyor.",
        ],
      },
      pricing: {
        title: "Güneş Enerjisi & Çatı GES Firması Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Firma tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Kurumsal anlatım, hizmetler, referans santral listesi, garanti ve satış sonrası bölümü, keşif talep formu, tek tık arama ve WhatsApp. Tek ofisle çalışan firmalar için yeterli.",
          },
          {
            name: "Çözüm sayfalı site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Mesken, sanayi ve tarımsal sulama için ayrı sayfalar, üretim ve geri ödeme hesaplama aracı, filtrelenebilir referans arşivi, süreç anlatımı ve çalıştığınız iller için sayfalar. Talebi siteden toplamak isteyenler için.",
          },
          {
            name: "Bayi paneli & teklif sistemi",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Bayi ve iş ortağı girişi, ile göre talep dağıtımı, standart teklif üretimi, keşif takibi ve üretim izleme ekranı entegrasyonu. Birden fazla ilde bayiyle çalışan firmalar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi alıcıya çalıştığınızı konuşuruz: mesken mi, sanayi çatısı mı, tarımsal sulama mı, üçü birden mi. Hangi illerde iş aldığınız, kurulumu kendi ekibinizin mi yaptığı ve bayi yapınız olup olmadığı kapsamı doğrudan değiştirir. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Referans ve içerik",
            body: "Bu sektörde siteyi ayakta tutan şey saha arşividir, o yüzden en çok emek buraya gidiyor. Kurduğunuz santrallerin gücünü, ilini ve yılını toplar, mevcut fotoğraflarınızı değerlendiririz. Elinizde uygun kare yoksa hangi çatıların yeniden çekileceğine dair bir liste bırakırız; drone karesi bu işte fark yaratıyor.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, çatısını düşünen kişinin ilk ekranda 'bu firma bu işi gerçekten yapıyor' demesi. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Yeni referans santralleri ve süreç metnini kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Güneş Enerjisi & Çatı GES Firması Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Keşif formu doğru soruları soruyor mu?",
            body: "Ad ve telefon yeterli değil. Aylık fatura tutarı, çatı tipi, yaklaşık alan ve il sorulmuyorsa her talep için baştan telefon turu atarsınız. Teklif aldığınız ajansa formun alanlarını sorun.",
          },
          {
            title: "Referans arşivini kendiniz büyütebiliyor musunuz?",
            body: "Her yeni santral için ajansa haber vermek zorundaysanız arşiv altı ay içinde donar. Yeni kaydı güç, şehir ve fotoğrafla kendiniz ekleyebildiğinizden emin olun.",
          },
          {
            title: "Hesaplama aracının varsayımları yazılı mı?",
            body: "Geri ödeme aracı sayfaya konacaksa altında hangi katsayılarla ve hangi kabullerle çalıştığı yazmalı. Yazmayan araç, kısa sürede yerine getiremeyeceğiniz bir vaade dönüşür.",
          },
          {
            title: "Şehir sayfaları kopyala-yapıştır mı?",
            body: "Bazı ajanslar 'otuz ilde çıkarsınız' deyip aynı metnin il adı değişmiş halini otuz kez yayınlıyor. Google bunu ayırt ediyor ve sayfaların tamamını değersizleştirebiliyor. Sadece gerçekten iş yaptığınız iller için, o ildeki referansla birlikte sayfa açılmalı.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Bu aramaların çoğu telefondan yapılıyor ve saha fotoğrafları ağırdır. Teklif verenden mevcut işlerinden birinin adresini isteyin, kendi telefonunuzdan açın ve referans galerisinin ne kadar sürede geldiğine bakın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının firmanız adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Site içeriğinin ve fotoğraf arşivinin yedeğini isteyebileceğinizi de baştan konuşun.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Solar Energy & Rooftop PV Company Website",
      metaDescription:
        "Websites for solar energy and rooftop PV companies: reference plant archive, payback calculator and a survey form that asks about the bill and the roof.",
      eyebrow: "For Solar Companies",
      h1: "Solar Energy & Rooftop PV Company Website",
      intro:
        "Whether it is a factory owner or a homeowner, they arrive with the same two questions: what will this cost me, and how many years until it pays for itself. A site that shows the plants you have built, with their capacity and city, and turns a bill and a roof detail into a site survey, answers those two questions before the phone rings. Forpus builds sites for solar energy and rooftop PV companies.",
      shortAnswer: {
        title:
          "What does a solar company website include, and what does it cost?",
        body: "A solar company website is your own address for showing the plants you have installed and for letting a roof owner leave their bill and roof details to request a survey. A typical site we build has separate solution pages for residential, industrial rooftops and agricultural irrigation, a survey request form that asks for the monthly bill amount and the roof type, a tool that gives a rough production and payback estimate, a reference plant archive listed by capacity and city, a section walking through the process from the grid application to provisional acceptance, panel and inverter warranty terms, a maintenance and cleaning service page, and a fast, mobile-friendly design. A presentation site covering the company and its references starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full site with separated solution pages, a working calculator and survey form sits in the ₺90,000–150,000 band over two to four weeks. Once a dealer panel, quote generation and a production monitoring screen are involved, you are looking at a project starting from ₺220,000. No stock imagery goes in the reference section: buyers want to see a roof you actually built.",
      },
      benefits: [
        {
          title: "Qualified survey requests",
          body: "Ask for the bill amount, roof type and area in the form, so every enquiry that reaches you can be judged on first reading.",
        },
        {
          title: "Proof through references",
          body: "List the plants you built with their capacity, city and your own site photos; that is where the buyer's biggest doubt is settled.",
        },
        {
          title: "Be found on Google",
          body: "A structure built to rank for 'rooftop solar' and 'solar panel installation' searches across the cities you work in.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Residential, industrial and agricultural solution pages",
        "Survey form asking for bill and roof details",
        "Production and payback calculator",
        "Reference plant archive (kWp, city, roof type)",
        "Process walkthrough: application to acceptance",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can the site include a payback calculator?",
          a: "Yes, and it is the single most useful section in this sector. The visitor enters their monthly bill, their city and a rough roof area; the site returns an estimated system size, annual production and a rough payback range. You provide the assumptions, we build it. We always print a note beneath it saying this is a rough estimate and the real figure comes after a site survey — it sets expectations correctly and protects you later.",
        },
        {
          q: "How do you present our reference plants?",
          a: "Each plant gets its own record: capacity, city, roof type, year and site photos, filterable by size and roof type. Someone looking for an industrial rooftop wants to see your 400 kWp factory job; a homeowner wants the 10 kWp residential one. Mixed into a single list, neither finds what they came for. You add new plants yourself from the panel.",
        },
        {
          q: "Should we publish prices?",
          a: "We advise against a fixed per-kilowatt figure; exchange rates, panels and roof structures move, and that number goes stale fast. Instead we publish example projects: this city, this roof, this capacity, this is what the bill looked like. Buyers size the job from that, and you stay off a number you cannot hold.",
        },
        {
          q: "Do we need separate pages for residential and industrial?",
          a: "Not required, but it is the split that pays off most. A homeowner asks about net metering, building permission and mounting on a tiled roof; a factory owner asks about self-consumption, the structural load on a sandwich-panel roof and whether production lands on shift hours. Separate pages answer both and let Google show you for two different searches.",
        },
        {
          q: "Should we explain the grid application process on the site?",
          a: "Yes — it is the part that intimidates buyers most, and most competitors never write it. We turn your input into a plain walkthrough: application, call letter, project approval, installation, provisional acceptance and meter change, plus a clear line on which of those steps you handle. The page stays editable so you can update it when the regulation changes.",
        },
        {
          q: "Can you refresh our existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones. If you already have a reference plant list and a photo archive, it moves into the new structure.",
        },
      ],
      ctaTitle: "Let's build a site for your company",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "otel",
    image: "/generated/personas/otel.webp",
    service: "web",
    slug: { tr: "otel-web-sitesi", en: "hotel-website" },
    tr: {
      metaTitle: "Butik Otel & Pansiyon Web Sitesi",
      metaDescription:
        "Butik otel, pansiyon ve villa kiralama için web sitesi ve doğrudan rezervasyon. Komisyonsuz rezervasyon alan, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Butik Otele Özel",
      h1: "Butik Otel & Pansiyon Web Sitesi",
      intro:
        "Misafir rezervasyon yapmadan önce sizi bir de kendi adınızla arar: odaların gerçek hâli, kahvaltı, manzara ve fiyat. Odalarınızı doğru gösteren ve tarihi verip rezervasyonu aracısız alan bir site, o misafiri portala kaptırmaz. Forpus butik oteller, pansiyonlar ve kiralık villalar için site kuruyor.",
      shortAnswer: {
        title: "Butik otel web sitesi ne içerir, ne kadar tutar?",
        body: "Butik otel web sitesi, odalarınızı gösterdiğiniz, sezon fiyatlarınızı yayınladığınız ve rezervasyonu aracısız aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir konaklama sitesinde her oda tipi için ayrı bir sayfa, giriş-çıkış tarihi seçilen müsaitlik ve rezervasyon formu, Booking ve Airbnb takvimleriyle senkron çalışan dolu tarih yönetimi, sezona göre değişen fiyat tablosu, kapora veya tam ödeme alan güvenli ödeme adımı, oda, kahvaltı ve manzara galerisi, çevre gezi rehberi, Türkçe-İngilizce dil seçeneği, Google harita bağlantısı ve mobil uyumlu hızlı bir tasarım bulunur. Odaları ve şartları anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Tarihli rezervasyonun ve online ödemenin çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Kanal yöneticisi entegrasyonu, çok tesisli yapı ve misafir paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Portallardan gelen her rezervasyonda komisyon ödediğiniz için doğrudan rezervasyon çağrısı ilk ekrana konur. Galeriye stok fotoğraf konmaz; misafir kapıdan girdiğinde gördüğünü bulmak ister. Alan adı ve site sizin adınıza kaydedilir; fiyatları ve kapalı tarihleri panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Komisyonsuz rezervasyon",
          body: "Misafir tarihini sizin sitenizden seçsin; aynı geceyi portala pay vermeden satın.",
        },
        {
          title: "Görünce karar veren misafir",
          body: "Odaları, kahvaltıyı ve manzarayı gerçek karelerle gösterin; karar sitede verilsin.",
        },
        {
          title: "Google'da bulunun",
          body: "Bölge ve semt adıyla yapılan konaklama aramalarında haritada ve arama sonuçlarında görünün.",
        },
      ],
      featuresTitle: "Butik Otel & Pansiyon sitenizde neler olur?",
      features: [
        "Oda tipi sayfaları ve olanaklar",
        "Tarihli müsaitlik ve rezervasyon formu",
        "Sezonluk fiyat tablosu ve kapora ödemesi",
        "Oda, kahvaltı ve manzara galerisi",
        "Türkçe-İngilizce çok dilli yapı",
        "Google harita, yorumlar, WhatsApp",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Siteden tarihli rezervasyon alabilir miyim?",
          a: "Evet. Basit bir giriş-çıkış tarihi soran talep formundan, oda bazlı müsaitliği gösterip dolu günleri kapatan ve online ödeme alan bir rezervasyon yapısına kadar ihtiyacınıza göre kurarız. Beş altı odalı pansiyonların çoğunda tarih ve kişi sayısı formu artı WhatsApp yönlendirmesi yetiyor; oda sayısı ve sezon yoğunluğu arttıkça müsaitliği ekranda gösteren yapı kendini gerektiriyor.",
        },
        {
          q: "Booking ve Airbnb'deki takvimimle çakışır mı?",
          a: "Çakışmaması için kurarız. Küçük tesislerde portalların takvim bağlantısıyla (iCal) karşılıklı senkron yeterli oluyor; oda sayısı arttığında bir kanal yöneticisi üzerinden bağlamak daha güvenli. Dürüst uyarı: iCal senkronu anlık değildir, güncellemeler arasında zaman geçer. Bu yüzden bayram gibi yoğun dönemlerde son kalan odayı üç kanalda birden açık tutmak yerine siteye ayırmanızı öneriyoruz.",
        },
        {
          q: "Misafiri portal yerine kendi sitemden rezervasyona nasıl ikna ederim?",
          a: "Misafir çoğu zaman sizi portalda bulur ama adınızı Google'a yazıp sitenize de bakar; iş o anda kazanılıyor. Doğrudan rezervasyona küçük ama somut bir karşılık koyarız: portalda satmadığınız bir oda, erken giriş, geç çıkış, karşılama ikramı ya da yalnızca siteye özel bir fiyat. Bunu sayfada açıkça yazmak, 'en iyi fiyat garantisi' cümlesini tek başına kullanmaktan çok daha fazla iş görüyor.",
        },
        {
          q: "Online ödeme veya kapora alabilir miyim?",
          a: "Evet. Bankanızın sanal POS'unu ya da iyzico, PayTR gibi bir ödeme sağlayıcısını siteye bağlarız; tutarın tamamını veya belirlediğiniz oranda kaporayı peşin alırsınız. Kapora, bu işte en can sıkıcı kalem olan gelmeyen misafir sorununu belirgin biçimde azaltıyor. İptal ve iade koşullarını ödeme adımının hemen yanına yazarız; sonradan çıkan tartışmaların çoğu orada başlıyor.",
        },
        {
          q: "Site kaç dilde olmalı?",
          a: "Türkçe ve İngilizce standart. Misafir profilinize göre Almanca, Rusça veya Arapça eklemek mantıklı olabilir; hangi ülkeden rezervasyon aldığınıza bakarak birlikte karar veririz. Otomatik çeviri eklentisi kurmuyoruz: konaklamada iptal koşulu, kahvaltı saati ve kabul şartları gibi cümlelerin yanlış çevrilmesi doğrudan misafir şikâyeti olarak geri dönüyor. Metinler tek tek çevrilir ve her dil kendi adresinde yayınlanır.",
        },
        {
          q: "Villa kiralıyorum, otel yapısı bana da uyar mı?",
          a: "Yapı aynı, kurgu farklı. Villada oda tipi yerine evin tamamı satılır; o yüzden kapasite, yatak düzeni, havuz, mahremiyet, evcil hayvan kabulü ve giriş-çıkış günü kuralı öne çıkar, fiyat da çoğu zaman gecelik değil haftalık veya dönemsel verilir. Birden fazla villanız varsa her villa kendi sayfasında, kendi takvimi ve galerisiyle durur; bölgeye ve kapasiteye göre süzülebilen bir liste kurarız.",
        },
        {
          q: "Belge, vergi ve iptal bilgilerini siteye yazmalı mıyım?",
          a: "Yazın; misafirin en çok tereddüt ettiği yer burası. Turizm işletme ya da basit konaklama belgenizi, iptal ve iade koşullarını, giriş-çıkış saatlerini, kahvaltının ve konaklama vergisinin fiyata dahil olup olmadığını tek bir sayfada göstermenizi öneriyoruz. Siteden ödeme alacaksanız mesafeli satış ve gizlilik metinleri de gerekir; taslağını biz kurarız, son hâlini kendi hukuk danışmanınızla teyit etmenizi öneririz.",
        },
        {
          q: "Misafir yorumlarını ve kampanyaları sitede gösterebilir miyim?",
          a: "Evet, konaklamada bunun önünde bir mevzuat engeli yok. Google ve portal değerlendirmelerinizi siteye taşıyan bir bölüm kurarız; ayrıca panelden güncelleyebileceğiniz bir kampanya alanı açarız. Erken rezervasyon indirimi, uzun konaklama fiyatı ya da hafta içi kampanyası gibi duyuruları kendiniz yayına alırsınız.",
        },
        {
          q: "Google Haritalar'da öne çıkmama yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan işlerden biri. Google İşletme Profilinizi kurar veya düzenler, kategori, olanak ve rezervasyon bağlantısı bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama adımını tesis sizin olduğu için sizin tamamlamanız gerekir.",
        },
      ],
      ctaTitle: "Tesisiniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Konaklama araması nadiren sizin sitenizde başlar. Misafir önce portalda bir liste görür, beğendiği tesisin adını Google'a yazar ve karşısına çıkanla kararını verir. O anda önüne düzgün bir site çıkmazsa aynı odayı portaldan alır; siz de kendi getirmediğiniz değil, kendi getirdiğiniz misafir için komisyon ödersiniz. Kendi siteniz tam olarak bu anı kazandığınız yerdir.",
          "İkinci kırılma tarihte olur. Misafirin aklında belirli bir hafta vardır; sitenizde giriş-çıkış tarihi verip müsaitliği göremiyorsa 'o tarihlerde yeriniz var mı' diye yazmak zorunda kalır. O mesaja bir saat sonra dönüldüğünde misafir çoktan başka bir yerde ödemesini yapmıştır. Portal bu işi saniyede hallediyor; sitenizin de en azından tarihi alması gerekir.",
          "Üçüncüsü sezondur. Bu işte yılın cirosu birkaç aya sıkışır ve o aylarda haritada, aramada ve kendi adınızda görünmüyorsanız telafisi yoktur. Sezon dışında ise elinizde kalan tek şey kendi adresinizdir: hafta sonu kaçamağı, erken rezervasyon ve daha önce gelmiş misafir oradan toplanır. Site olmadığında geriye bir Instagram hesabı ve portaldaki fiyat satırınız kalır; odalarınızı, kahvaltınızı ve iptal koşullarınızı anlatacak bir yer hiçbir yerde yoktur.",
        ],
      },
      pricing: {
        title: "Butik Otel & Pansiyon Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Oda tipi sayfaları, oda ve ortak alan galerisi, konum ve çevre rehberi, çalışma düzeni, tarih soran talep formu ve tek tık WhatsApp. Tek tesisli pansiyon ve butik oteller için yeterli.",
          },
          {
            name: "Rezervasyonlu site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Giriş-çıkış tarihi seçilen müsaitlik ve rezervasyon yapısı, sezonluk fiyat tablosu, kapora veya tam ödeme, Türkçe-İngilizce dil yapısı, kampanya bölümü. Rezervasyonu portaldan kendi sitesine çekmek isteyenler için.",
          },
          {
            name: "Kanal entegrasyonu & misafir paneli",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Kanal yöneticisi veya otel yazılımı entegrasyonu, oda bazlı doluluk yönetimi, çok tesisli ya da çok villalı yapı, misafir paneli ve mobil uygulama. Takvimi elle tutulamayacak ölçekteyseniz.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Oda sayınızı, oda tiplerinizi, sezon takviminizi ve misafir profilinizi konuşuruz. Altı odalı bir taş ev pansiyonuyla havuzlu bir kiralık villanın sitesi aynı olmaz. Portallarda ne kadar iş yaptığınıza da bakarız; doğrudan rezervasyonu nereden çekeceğimizi bu belirliyor. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Fotoğraf ve içerik",
            body: "Bu sektörde site fotoğrafla ayakta duruyor, o yüzden en çok emek buraya gidiyor. Odaları, kahvaltıyı, ortak alanları ve manzarayı hangi saatte nasıl çekeceğinizi anlatan bir çekim listesi gönderiyoruz; elinizde uygun kare yoksa birlikte plan yaparız. Oda olanakları, sezon fiyatları ve iptal koşulları da bu adımda toplanır.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı ve bir oda sayfasını görürsünüz. Tasarımın işi, misafirin ekranda tesisin havasını hissedip tarihi seçmesi. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, ödeme bağlantısı ve Google İşletme Profili bağlantısı dahil yayına alırız. Fiyatları, kapalı tarihleri ve kampanyaları kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Butik Otel & Pansiyon Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Tarih verilebiliyor mu?",
            body: "Rezervasyon bölümü giriş ve çıkış tarihi almıyorsa o bir rezervasyon formu değil, sadece bir iletişim kutusudur. Misafirin tarihi ve kişi sayısını seçebildiğinden emin olun.",
          },
          {
            title: "Portal takvimiyle senkron çalışıyor mu?",
            body: "Sitenizden ve Booking'den aynı odayı aynı geceye satmak bu işin en pahalı hatasıdır. Teklif veren ajansa takvimin portallarla nasıl bağlanacağını sorun; 'sonra bakarız' cevabı yeterli değil.",
          },
          {
            title:
              "Fiyatı ve kapalı tarihleri kendiniz güncelleyebiliyor musunuz?",
            body: "Konaklamada fiyat sezona, hatta haftaya göre değişir. Her değişiklik için ajansa haber vermek zorundaysanız site kısa sürede yanlış fiyat gösterir ve misafirle karşı karşıya kalırsınız.",
          },
          {
            title: "Fotoğraflar gerçekten sizin odalarınız mı?",
            body: "Abartılmış geniş açı ve stok kare bu sektörde kapıda hayal kırıklığı, sonra da kötü yorum olarak geri döner. Odayı olduğu gibi ve iyi ışıkta göstermek buradaki en değerli yatırımdır; ajans 'görsel bizde' diyorsa neyi kastettiğini sorun.",
          },
          {
            title: "İkinci dil gerçekten çevrilmiş mi?",
            body: "Otomatik çeviriyle açılan bir İngilizce sayfa, yabancı misafirin güvenini ilk cümlede kaybeder. Teklif verenden mevcut işlerinden birini isteyin ve İngilizce sayfasını açıp okuyun.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının tesisiniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Boutique Hotel & Guesthouse Website",
      metaDescription:
        "Websites for boutique hotels, guesthouses and holiday villas, with date-based direct booking. Show your rooms, cut commission. Get a free quote.",
      eyebrow: "For Boutique Hotels",
      h1: "Boutique Hotel & Guesthouse Website",
      intro:
        "Guests look you up by name before they book: the real state of the rooms, the breakfast, the view and the price. A site that shows your rooms properly and takes a booking with real dates keeps that guest off a commission list. Forpus builds sites for boutique hotels, guesthouses and holiday villas.",
      shortAnswer: {
        title:
          "What does a boutique hotel website include, and what does it cost?",
        body: "A boutique hotel website is your own address for showing the rooms, publishing your seasonal rates and taking bookings without a middleman. A typical property site we build has a separate page per room type, an availability and booking form with check-in and check-out dates, closed-date management that stays in sync with your Booking and Airbnb calendars, a seasonal rate table, a secure payment step for a deposit or the full amount, a gallery of rooms, breakfast and views, a guide to the area, Turkish and English versions, a Google Maps link and a fast, mobile-friendly design. A presentation site covering rooms and house rules starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full site with working date-based booking and online payment sits in the ₺90,000–150,000 band over two to four weeks. Once channel-manager integration, multiple properties or a guest panel are involved, you are looking at a project starting from ₺220,000. Because every portal booking costs you commission, the direct-booking call sits on the first screen. No stock photography goes in the gallery: guests want the room they walk into to match the one they saw.",
      },
      benefits: [
        {
          title: "Commission-free bookings",
          body: "Let guests pick their dates on your own site and sell the same night without paying a portal.",
        },
        {
          title: "Rooms that sell themselves",
          body: "Show the rooms, the breakfast and the view in real photographs so the decision is made on your page.",
        },
        {
          title: "Be found on Google",
          body: "Show up on the map and in search for your town, your region and your own property name.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Room type pages with amenities",
        "Date-based availability and booking form",
        "Seasonal rate table and deposit payments",
        "Room, breakfast and view gallery",
        "Turkish and English language versions",
        "Google Maps, reviews, WhatsApp",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can the site take bookings with real dates?",
          a: "Yes. From a simple form asking for check-in and check-out up to a structure that shows availability by room, closes full days and takes payment online. Most five- or six-room guesthouses do fine with a date and party-size form plus WhatsApp; as the room count and the season pressure grow, on-screen availability starts to pay for itself.",
        },
        {
          q: "Will it clash with my Booking and Airbnb calendars?",
          a: "We build it so it does not. For small properties a two-way iCal link with the portals is usually enough; as rooms grow, connecting through a channel manager is safer. An honest warning: iCal sync is not instant, so during peak weeks we suggest holding your last remaining room for the site rather than leaving it open on three channels at once.",
        },
        {
          q: "How do I get guests to book direct instead of through a portal?",
          a: "Guests often find you on a portal, then type your name into Google and look at your own site — that is where the booking is won. We put something small but concrete behind direct booking: a room you do not list on portals, early check-in, late check-out, a welcome extra or a site-only rate. Saying that plainly on the page works far better than a lone 'best rate guaranteed' line.",
        },
        {
          q: "Can I take a deposit or full payment online?",
          a: "Yes. We connect your bank's virtual POS or a provider such as iyzico or PayTR, and you take either the full amount or a deposit at the rate you set. A deposit noticeably reduces no-shows, which is the most irritating cost in this business. Cancellation and refund terms sit right next to the payment step, because that is where most later disputes begin.",
        },
        {
          q: "How many languages should the site have?",
          a: "Turkish and English as standard. Depending on your guest mix, German, Russian or Arabic can be worth adding; we decide together by looking at where your bookings come from. We do not install auto-translate plugins: a mistranslated cancellation term or breakfast time comes back to you as a guest complaint. Each language is written properly and published at its own address.",
        },
        {
          q: "I rent out villas — does the hotel structure work for me?",
          a: "Same structure, different setup. With a villa you sell the whole house rather than a room type, so capacity, bed layout, the pool, privacy, pet policy and changeover day matter most, and the rate is usually weekly or seasonal rather than nightly. If you have several villas, each gets its own page, calendar and gallery, inside a list guests can filter by area and capacity.",
        },
      ],
      ctaTitle: "Let's build a site for your property",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "sacekimi",
    image: "/generated/personas/sacekimi.webp",
    service: "web",
    slug: { tr: "sac-ekimi-web-sitesi", en: "hair-transplant-website" },
    tr: {
      metaTitle: "Saç Ekimi Merkezi Web Sitesi Tasarımı",
      metaDescription:
        "Saç ekimi merkezlerine özel çok dilli web sitesi: yöntem sayfaları, fotoğraflı ön değerlendirme formu ve tanıtım mevzuatına uygun kurgu.",
      eyebrow: "Saç Ekimi Merkezine Özel",
      h1: "Saç Ekimi Merkezi Web Sitesi",
      intro:
        "Saç ekimi arayan kişi çoğu zaman başka bir ülkeden bakıyor ve karşısına önce aracı listeler çıkıyor. Yöntemi kendi dilinde anlatan, hekimini ve belgelerini gösteren çok dilli bir site, o başvuruyu doğrudan kliniğe getirir. Forpus saç ekimi merkezleri ve sağlık turizmi klinikleri için site kuruyor.",
      shortAnswer: {
        title: "Saç ekimi web sitesi ne içerir, ne kadar tutar?",
        body: "Saç ekimi merkezi web sitesi, uyguladığınız yöntemi kendi anlatımınızla açıkladığınız ve yurt dışından gelen başvuruyu topladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir saç ekimi sitesinde FUE, DHI ve safir gibi yöntemler için ayrı sayfalar, İngilizce, Arapça ve Almanca dil sürümleri, hreflang kurulumu, fotoğraf yükleyerek doldurulan KVKK uyumlu bir ön değerlendirme formu, hekim ve ruhsat bilgileri, konaklama ile transfer düzenini anlatan bir sayfa, uluslararası numaralarla çalışan WhatsApp yönlendirmesi ve mobil uyumlu hızlı bir tasarım bulunur. Tek dilli bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Çok dilli, yöntemlerin ayrı sayfalandığı tam bir klinik sitesi ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Başvuru takip paneli ve hasta dosyası yönetimi işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Saç ekimi tıbbi bir işlem olduğu için sitede fiyat ilanı, kampanya duyurusu ve hasta yorumu kullanılmaz. Yurt dışına yönelik tanıtım yapacaksanız uluslararası sağlık turizmi yetki belgesi şarttır; site bu çerçeveye göre kurgulanır. Alan adı ve site sizin adınıza kaydedilir.",
      },
      benefits: [
        {
          title: "Kendi adınızla bulunun",
          body: "Yurt dışından yapılan aramalarda hasta aracı listelerin içinde değil, doğrudan kliniğinizin sayfasıyla karşılaşsın.",
        },
        {
          title: "Hastanın dilinde anlatım",
          body: "İngilizce, Arapça ve Almanca sürümlerle hasta yöntemi ilk mesajı yazmadan önce kendi dilinde okusun.",
        },
        {
          title: "Değerlendirilebilir başvuru",
          body: "Fotoğraf yüklemeli ön değerlendirme formu, dağınık mesajı hekimin bakabileceği bir dosyaya çevirsin.",
        },
      ],
      featuresTitle: "Saç Ekimi Merkezi sitenizde neler olur?",
      features: [
        "Çok dilli yapı ve hreflang (EN, AR, DE)",
        "Yöntem sayfaları: FUE, DHI, safir",
        "Fotoğraflı ön değerlendirme formu (KVKK uyumlu)",
        "Hekim, ruhsat ve yetki belgesi bilgileri",
        "Konaklama, transfer ve tercüman sayfası",
        "Mobil uyumlu, hızlı çok dilli tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Saç ekimi sitesinde mevzuat neyi yasaklıyor, neye izin veriyor?",
          a: "Saç ekimi tıbbi bir işlemdir; bu yüzden siteniz sağlıkta tanıtım ve bilgilendirme mevzuatının kapsamına giriyor. Pratikte şu demek: fiyat veya paket ilanı vermek, indirim ve kampanya duyurmak, hasta yorumu yayınlamak, 'garanti' türü sonuç vaatleri ile karşılaştırmalı üstünlük iddiaları sorun yaratır. Serbest olan taraf ise geniş: yöntemleri ve hangi durumda uygulandığını anlatmak, hekimin unvanını ve özgeçmişini yazmak, kliniğin ruhsat ve yetki belgesi bilgilerini yayınlamak, işlem öncesi ile sonrası sürecin nasıl yürüdüğünü tarafsız bir dille açıklamak. Şunu da açıkça söyleyelim: bir ihlalde muhatap ajans değil, hekim ve sağlık kuruluşudur — idari para cezası ve içeriğin erişime kapatılması gündeme gelir. Siteyi bu çerçeveyi gözeterek kurgular, sınırda gördüğümüz başlıkları size ayrıca söyleriz; kesin yorum için il sağlık müdürlüğünüz veya mevzuat danışmanınızla teyitleşmenizi öneririz.",
        },
        {
          q: "Uluslararası sağlık turizmi yetki belgemiz yok, yine de site yapabilir miyiz?",
          a: "Site yapılır ama içeriği değişir. Yurt dışına yönelik tanıtım ve yurt dışından hasta kabulü Sağlık Bakanlığı'ndan alınan uluslararası sağlık turizmi yetki belgesine bağlıdır; belge yokken yabancı dilde hasta çağıran bir kurgu sizi riske sokar. Belgeniz yoksa siteyi Türkiye'deki hastaya konuşan tek dilli bir yapı olarak kurar, çok dilli katmanı belge geldiğinde ekleriz. Altyapıyı baştan buna hazır bırakırız ki ikinci kez sıfırdan yapmayın.",
        },
        {
          q: "Kaç dilde yayınlamalıyız?",
          a: "Hastanın geldiği ülkeye göre karar veriyoruz. Türkçe her zaman kalır; üzerine genelde İngilizce, Arapça ve Almanca ekleniyor, bazı kliniklerde Fransızca veya İspanyolca. Dikkat edilecek asıl şey dil sayısı değil çevirinin niteliği: makine çevirisi eklentisiyle 'on dil' göstermek, Arapça okuyan bir hastanın ilk paragrafta siteden çıkmasına yol açıyor. Az dil, doğru çeviri, her dil için ayrı adres ve hreflang kurulumu daha iyi çalışıyor. Arapça için sağdan sola yazım düzenini de tasarıma dahil ederiz.",
        },
        {
          q: "Öncesi-sonrası fotoğrafı kullanabilir miyiz?",
          a: "Teknik olarak evet, iki koşulla: hastadan yazılı açık rıza almanız ve görselin abartılı vaat üretmeyecek biçimde sunulması gerekir. Sağlıkta tanıtım mevzuatı bu görsellerin kullanımına sınır getiriyor; greft sayısı, ekilen alan ve süre gibi bilgileri sonuç garantisine dönüştüren bir kurgu ihlal sayılabilir. Galeriyi bilgilendirme amacıyla ve bu çerçevede kurgularız. Hasta görselleri özel nitelikli kişisel veridir; rızanın nasıl alındığını ve nerede saklandığını da birlikte netleştiririz.",
        },
        {
          q: "Hastadan siteden fotoğraf toplamak sorun yaratır mı?",
          a: "Sorun değil, ama sıradan bir iletişim formu gibi kurulamaz. Saçlı deri fotoğrafı sağlık verisidir; KVKK'da özel nitelikli kişisel veri sayılır ve açık rıza ister. Formu bu yüzden ayrı bir aydınlatma metni, ayrı bir açık rıza kutusu, şifreli iletim ve sınırlı erişimli bir depolama ile kurarız. Fotoğrafların ne kadar süre saklanacağını ve kimin göreceğini baştan yazarız; bu hem mevzuat tarafını hem hastanın tereddüdünü aynı anda çözüyor.",
        },
        {
          q: "Fiyat yazamıyorsak hasta neye göre karar veriyor?",
          a: "Anlatıma ve şeffaflığa. Fiyat ilanı veremezsiniz ama saç analizinin neye baktığını, işlemin nasıl planlandığını, işlem gününün nasıl geçtiğini, sonraki günlerde ne yapıldığını ve kontrollerin nasıl yürüdüğünü yazabilirsiniz. Yurt dışından gelen hastanın asıl bilmediği bunlardır. Fiyat sorusunu forma yönlendirir, cevabı kişiye özel değerlendirmeden sonra veririz — zaten doğru yöntem de budur, çünkü greft ihtiyacı kişiden kişiye değişiyor.",
        },
        {
          q: "Aracı kurumlarla çalışıyoruz, kendi sitemize gerek var mı?",
          a: "Aracı kurum hasta getirir ama üç şeyi getirmez: hastanın sizin adınızı araması, doğrudan gelen başvuru ve kendi anlatımınız. Aracıyla çalışırken bile hasta işlemden önce klinik adını Google'a yazıyor; o aramada karşısına çıkan bir sayfanız yoksa değerlendirmesini başkasının sayfasından yapıyor. İkisi birlikte yürür: aracı kanal açık kalır, kendi siteniz doğrudan gelen başvuruyu toplar.",
        },
        {
          q: "Saç ekimi web sitesi ne kadar tutar?",
          a: "Tek dilli, yöntem ve klinik tanıtımına odaklı bir site ₺50.000–85.000 aralığında başlar. Çok dilli, her yöntemin ayrı sayfalandığı ve fotoğraflı ön değerlendirme formunun çalıştığı bir klinik sitesi ₺90.000–150.000 aralığındadır. Başvuru takip paneli ve hasta dosyası yönetimi işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Mevcut sitemizi yenileyebilir misiniz?",
          a: "Evet. İçeriklerinizi ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Yabancı dilli sayfalarınız varsa dil yapısını bu aşamada düzeltiriz; çok dilli sitelerde en sık gördüğümüz hata, dillerin ayrı adresleri olmaması ve hreflang'in hiç kurulmamış olmasıdır.",
        },
      ],
      ctaTitle: "Kliniğiniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Saç ekimi kararı aylar sürer ve büyük kısmı başka bir ülkede, telefon ekranında verilir. Kişi önce yöntemi öğrenmeye çalışır, sonra kimin uygulayacağını arar. Bu araştırmanın çoğu aracı listelerde ve forumlarda geçiyor; kliniğin kendi adı çoğu zaman en sona kalıyor.",
          "İkinci kırılma yöntem anlatımında olur. FUE, DHI, safir, greft sayısı, ekilecek alan — hasta bunların ne demek olduğunu bilmiyor ve karşısında birbirinin kopyası metinler buluyor. Hangi durumda hangi yöntemin uygulandığını açıklayan bir sayfa yoksa karar fiyat üzerinden veriliyor; oysa mevzuat sitede fiyat yazmanıza zaten izin vermiyor. Geriye anlatımla ayrışmak kalıyor.",
          "Üçüncüsü güvendir. Yurt dışından gelen hasta bilet alıyor, birkaç gün kalacağı bir şehre iniyor ve işlemi kimin yapacağını görmek istiyor: hekimin adı ve özgeçmişi, kliniğin ruhsatı, uluslararası sağlık turizmi yetki belgesi, adres ve hangi dilde konuşulacağı. Bunlar bir sosyal medya hesabında dağınık dururken kendi sitenizde tek sayfada durabilir. Sitesi olmayan klinik, bu soruların cevabını aracı kuruma bırakmış olur.",
        ],
      },
      pricing: {
        title: "Saç Ekimi Merkezi Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Tek dilli, mobil uyumlu klinik tanıtımı. Yöntem anlatımı, hekim özgeçmişi, ruhsat ve belge bilgileri, iletişim ile WhatsApp yönlendirmesi. Ağırlıkla yurt içi hastaya çalışan merkezler için.",
          },
          {
            name: "Çok dilli klinik sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "FUE, DHI ve safir gibi yöntemlerin ayrı sayfalandığı, İngilizce–Arapça–Almanca sürümleri ve hreflang kurulumu olan yapı. Fotoğraflı ön değerlendirme formu, konaklama ve transfer sayfası. Yurt dışından hasta kabul eden klinikler için.",
          },
          {
            name: "Başvuru paneli & hasta dosyası",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Gelen ön değerlendirmelerin dosya olarak açıldığı, fotoğrafların şifreli saklandığı, danışman atanan ve durum takibi yapılan panel. Günde çok sayıda başvuru alan, birden fazla dilde koordinasyon yürüten merkezler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi yöntemleri uyguladığınızı, hangi ülkelerden hasta aldığınızı ve elinizdeki belgeleri konuşuruz. Yalnız yurt içine çalışan bir merkezle sağlık turizmi yapan bir kliniğin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik, dil ve mevzuat taraması",
            body: "Yöntem anlatımlarını, hekim özgeçmişini ve belge bilgilerini doldurması kolay bir şablonla toplarız. Metinleri sağlıkta tanıtım çerçevesine göre birlikte gözden geçirir, sınırda gördüğümüz ifadeleri işaretleriz. Çeviriler ve dil yapısı bu aşamada planlanır.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı ve bir yöntem sayfasını görürsünüz. Yön doğruysa diğer sayfalar ve dil sürümleri aynı dille açılır. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, dil sürümlerinin hreflang bağlantıları, Google Search Console ve İşletme Profili bağlantısı dahil yayına alırız. Formdan gelen başvuruları nasıl yöneteceğinizi gösteren kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Saç Ekimi Merkezi Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Ajans sağlıkta tanıtım mevzuatını biliyor mu?",
            body: "Size fiyat listesi, kampanya bölümü ve hasta yorumu öneren bir teklif mevzuatı bilmiyor demektir. Cezanın muhatabı ajans değil, hekim ve sağlık kuruluşudur. Bu başlığı ilk görüşmede kendiniz açın ve nasıl cevap verdiklerine bakın.",
          },
          {
            title: "Çeviri gerçek mi, eklenti mi?",
            body: "Sitenin köşesine konan otomatik çeviri düğmesi çok dilli site değildir. Her dilin kendi adresi, kendi yazılmış metni ve hreflang bağlantısı olmalı. Aksi halde Google sizi o dillerde göstermez, hasta da ilk paragrafta anlar.",
          },
          {
            title: "Hekim, ruhsat ve yetki belgesi görünüyor mu?",
            body: "Yurt dışından gelen hasta işlemi kimin yapacağını ve kliniğin hangi belgeyle çalıştığını arıyor. Bu bilgiler bilgilendirme kapsamındadır, yazılabilir; yazılmadığında hasta cevabı aracı kurumdan alır.",
          },
          {
            title: "Fotoğraf toplayan form KVKK'lı mı?",
            body: "Saçlı deri fotoğrafı sağlık verisidir, sıradan bir iletişim formuyla toplanamaz. Aydınlatma metni, ayrı açık rıza, şifreli iletim ve saklama süresi baştan tanımlı olmalı. Formu yayına alan taraf ajans olsa da veri sorumlusu sizsiniz.",
          },
          {
            title: "Yurt dışından açıldığında hızlı mı?",
            body: "Site Türkiye'deki bir sunucuda duruyor olabilir ama hastanız Almanya'dan veya Körfez'den açıyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve mümkünse yurt dışındaki bir tanıdığınıza açtırın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının klinik adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Sağlık turizminde alan adının aracı kurumun ya da ajansın hesabında durduğu örnekler var; ayrılmak istediğinizde bütün birikiminiz orada kalıyor.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Hair Transplant Clinic Website",
      metaDescription:
        "Multilingual websites for hair transplant clinics and health tourism practices: method pages, photo-based pre-assessment forms and compliant copy.",
      eyebrow: "For Hair Transplant Clinics",
      h1: "Hair Transplant Clinic Website",
      intro:
        "Most people researching a hair transplant are doing it from another country, and the first thing they meet is a list of intermediaries. A multilingual site that explains the method in their own language and shows the surgeon and the clinic's credentials brings that enquiry straight to you. Forpus builds sites for hair transplant clinics and health tourism practices.",
      shortAnswer: {
        title:
          "What does a hair transplant clinic website include, and what does it cost?",
        body: "A hair transplant clinic website is your own address for explaining your method in your own words and collecting enquiries from abroad. A typical site Forpus builds carries a separate page for each method — FUE, DHI, sapphire — English, Arabic and German language versions with proper hreflang, a KVKK-compliant pre-assessment form where the patient uploads photos, surgeon and licence details, a page covering accommodation, transfer and interpreting, WhatsApp routing that works with international numbers, and a fast mobile-first design. A single-language presentation site runs ₺50,000–85,000 and goes live in one to two weeks. A full multilingual clinic site with a page per method runs ₺90,000–150,000 over two to four weeks. Add an enquiry panel and patient file management and the project starts at ₺220,000. Health-advertising rules in Türkiye rule out price lists, campaign announcements and patient testimonials, and promoting to patients abroad requires the Ministry of Health's international health tourism authorisation.",
      },
      benefits: [
        {
          title: "Enquiries that reach you directly",
          body: "Let the first contact happen on your own page rather than inside a commission-based listing.",
        },
        {
          title: "Read in the patient's language",
          body: "English, Arabic and German versions so the method is understood before the first message is sent.",
        },
        {
          title: "Applications you can assess",
          body: "A photo-based pre-assessment form turns scattered messages into a file your surgeon can actually read.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Multilingual versions (EN, AR, DE) with hreflang",
        "A page per method: FUE, DHI, sapphire",
        "Photo-based pre-assessment form (KVKK compliant)",
        "Surgeon, licence and authorisation details",
        "Accommodation, transfer and interpreting page",
        "Fast, mobile-first multilingual design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "What do the advertising rules allow on a hair transplant site?",
          a: "A hair transplant is a medical procedure, so the site falls under Türkiye's health information and advertising rules. In practice that rules out price or package announcements, discounts, patient testimonials, guarantee-style promises and comparative superiority claims. What stays open is wide: explaining each method and when it is used, publishing the surgeon's title and background, showing the clinic's licence and authorisation, and describing the process before and after the procedure in neutral language. One thing to be clear about — in a breach the authorities address the physician and the health facility, not the agency. We build within that frame and flag anything borderline.",
        },
        {
          q: "Do we need the health tourism authorisation before the site goes live?",
          a: "To promote to patients abroad, yes. Marketing to and admitting patients from other countries depends on the Ministry of Health's international health tourism authorisation. Without it we build a single-language site aimed at patients in Türkiye and keep the structure ready, so the language versions can be added the moment the authorisation arrives instead of rebuilding from scratch.",
        },
        {
          q: "How many languages should we publish in?",
          a: "It depends on where your patients come from. Turkish always stays; English, Arabic and German usually follow, sometimes French or Spanish. What matters is translation quality rather than the count: a machine-translation widget claiming ten languages loses an Arabic reader in the first paragraph. Fewer languages, properly written, each on its own URL with hreflang, works better. For Arabic we build the right-to-left layout into the design.",
        },
        {
          q: "Can we publish before-and-after photos?",
          a: "Technically yes, on two conditions: written explicit consent from the patient, and a presentation that does not turn into an exaggerated promise. The rules limit how these images may be used, and framing graft counts or timelines as a guaranteed result can count as a breach. We build the gallery as information within that frame, and settle how consent is collected and stored alongside it.",
        },
        {
          q: "Is collecting patient photos through the site a problem?",
          a: "Not a problem, but it cannot be an ordinary contact form. A scalp photo is health data — special category personal data under KVKK, requiring explicit consent. We build the form with its own privacy notice, a separate consent checkbox, encrypted transmission and restricted-access storage, and we state up front how long photos are kept and who can see them.",
        },
        {
          q: "We work with agencies — do we still need our own site?",
          a: "Agencies bring patients, but they do not bring three things: people searching your clinic's name, enquiries that arrive directly, and your own account of how you work. Even patients who came through an agency search the clinic name before travelling. If nothing of yours appears, they form their opinion on someone else's page. The two run together.",
        },
      ],
      ctaTitle: "Let's build a site for your clinic",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "okul",
    image: "/generated/personas/okul.webp",
    service: "web",
    slug: { tr: "ozel-okul-web-sitesi", en: "private-school-website" },
    tr: {
      metaTitle: "Özel Okul & Kolej Web Sitesi",
      metaDescription:
        "Özel okul, kolej ve anaokullarına özel web sitesi ve online ön kayıt. Kampüsü gösteren, veliyi ikna eden, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Özel Okula Özel",
      h1: "Özel Okul & Kolej Web Sitesi",
      intro:
        "Veli okul kararını bir yılda değil, birkaç akşamda verir: kadroyu okur, kampüse bakar, servis güzergâhını ve ücreti arar, sonra tanışma günü için form doldurur. Kampüsü gösteren, akademik kadroyu tanıtan ve ön kaydı oracıkta alan bir site, o akşamı sizin lehinize çevirir. Forpus özel okullar, kolejler ve anaokulları için site kuruyor.",
      shortAnswer: {
        title: "Özel okul web sitesi ne içerir, ne kadar tutar?",
        body: "Özel okul web sitesi, eğitim modelinizi anlattığınız, kampüsünüzü gösterdiğiniz ve ön kayıt talebi topladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir okul sitesinde kademe kademe ayrılmış sayfalar (anaokulu, ilkokul, ortaokul, lise), akademik kadro tanıtımları, kampüs ve derslik galerisi, ön kayıt ile tanışma günü formu, bursluluk sınavı ve kontenjan duyuruları, servis güzergâhları ve yemek listesi, veli duyuru bölümü, kurum bilgileri ve mobil uyumlu hızlı bir tasarım bulunur. Kurumu ve kademeleri anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Ön kayıt formunun, duyuru yönetiminin ve her kademe için ayrı sayfanın çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Veli paneli, okul yönetim yazılımıyla entegrasyon veya mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Kayıt talebi yılın birkaç ayına sıkıştığı için ön kayıt çağrısı ilk ekrana konur. Galeriye stok fotoğraf konmaz; veli, çocuğunu bırakacağı sınıfın gerçeğini görmek ister. Alan adı ve site kurumunuz adına kaydedilir; duyuruları ve kadroyu panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Ön kayıt talebi",
          body: "Veli tanışma günü ve ön kayıt formunu akşam telefondan doldursun; kayıt sezonu sekreterlikte değil, siteden başlasın.",
        },
        {
          title: "Gördüğüne güvenen veli",
          body: "Derslikleri, kampüsü ve akademik kadroyu gösterin; 'bu okulu gezmeye gidelim' kararı sitede verilsin.",
        },
        {
          title: "Google'da bulunun",
          body: "'Yakınımdaki özel okul' ve semt adıyla yapılan kolej aramalarında haritada ve sonuçlarda görünün.",
        },
      ],
      featuresTitle: "Özel Okul & Kolej sitenizde neler olur?",
      features: [
        "Kademe sayfaları (anaokulu, ilkokul, ortaokul, lise)",
        "Ön kayıt ve tanışma günü formu",
        "Kampüs, derslik ve laboratuvar galerisi",
        "Akademik kadro tanıtımı",
        "Duyuru, haber ve akademik takvim",
        "Servis güzergâhı, yemek listesi, WhatsApp",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Ön kayıt formu kurar mısınız?",
          a: "Evet. Basit bir 'bilgi almak istiyorum' formundan, kademe ve doğum yılına göre dallanan, tanışma günü için tarih seçtiren bir ön kayıt formuna kadar ihtiyacınıza göre kurarız. Talepler hem e-postaya düşer hem panelde liste olarak birikir; kayıt ofisi sezon boyunca kimin arandığını buradan takip eder. Küçük kurumlarda form artı WhatsApp yönlendirmesi yetiyor; kademe sayısı arttıkça dallanan yapı kendini gerektiriyor.",
        },
        {
          q: "Ücretimizi sitede yazmalı mıyız?",
          a: "Özel öğretim kurumları eğitim ücretlerini öğretim yılı başlamadan ilan etmekle yükümlü; yani rakam zaten kamuya açık. Sitede saklamanın tek sonucu, velinin fiyatı bir veli forumunda ya da rakibinizin karşılaştırma listesinde bulması oluyor. Genelde ücreti kademe bazında yazmayı, yanına ödeme planını, kardeş ve peşin indirimini, servis ile yemeğin dahil olup olmadığını koymayı öneriyoruz. Rakamı yazmamayı tercih ederseniz 'ücret bilgisi isteyin' formunu burs koşullarıyla birlikte kurgular ve talebi doğrudan kayıt ofisine düşürürüz.",
        },
        {
          q: "Duyuruları ve akademik takvimi kendimiz güncelleyebilir miyiz?",
          a: "Evet, bu sektörde en kritik madde bu. Duyuru, haber, akademik takvim, yemek listesi ve kadro bilgisini panelden kendiniz güncellersiniz. Okul yılı boyunca haftalık duyuru çıkıyor; her biri için ajansa haber vermek zorunda kalırsanız site kısa sürede geçen yılın sitesine döner.",
        },
        {
          q: "Veli girişi / veli paneli kurar mısınız?",
          a: "Çoğu okulda zaten bir okul yönetim yazılımı oluyor. O durumda siteye ikinci bir panel kurmak yerine 'Veli Girişi' düğmesini mevcut sisteme bağlarız, veli tek yerden girer. Böyle bir yazılımınız yoksa ödev, yoklama ve not gibi ihtiyaçları sıfırdan yazmak ayrı bir proje demek; bunu web sitesiyle aynı pakete sıkıştırmamak gerekir. Ne kullandığınızı ilk görüşmede konuşup hangisinin size daha ucuza çıkacağını söyleriz.",
        },
        {
          q: "Öğrenci fotoğraflarını sitede kullanabilir miyiz?",
          a: "Öğrenci fotoğrafı ve videosu, velinin yazılı açık rızası olmadan yayınlanamaz. Uygulamada en temiz yol, görsel kullanım iznini kayıt evrakının içine ayrı bir metin olarak koymak ve izin verilmeyen öğrencilerin karesini galeriye hiç almamak. Site tarafında da ad ve sınıf bilgisi yazılmayan bir galeri yapısı kurarız. İzin durumunun net olmadığı dönemler için dersliğin, laboratuvarın ve bahçenin öğrencisiz çekilmiş kareleri şaşırtıcı biçimde iyi çalışıyor.",
        },
        {
          q: "Kampüs tanıtım videosu veya 360 derece tur ekleyebilir misiniz?",
          a: "Evet. Tanıtım videosunu siteye gömer, isterseniz 360 derece kampüs turu ekleriz. Dürüst uyarı: 360 tur gerçekten gezmeye değer bir kampüsünüz varsa işe yarıyor, dar bir binada tersine çalışıyor. Çoğu okul için iyi çekilmiş on beş kare ve iki dakikalık bir video, pahalı bir turdan daha fazla tanışma günü randevusu getiriyor.",
        },
        {
          q: "Birden fazla kampüsümüz var, nasıl gösteriyoruz?",
          a: "Her kampüs için ayrı bir sayfa kurarız: kendi adresi, kademeleri, kontenjanı, servis güzergâhı, kadrosu ve kendi ön kayıt formu. Bu, kampüsün bulunduğu ilçede yapılan aramalarda görünmenize de yardımcı olur; veliler okulu çoğunlukla semt adıyla arıyor.",
        },
        {
          q: "Google'da bulunmamıza yardım eder misiniz?",
          a: "Evet. Google İşletme Profilinizi kurar veya düzenler, kategori ve kademe bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu okul adresine geldiği için o adımı sizin tamamlamanız gerekir. Kayıt sezonunda haritadan gelen 'yakınımdaki özel okul' araması bu sektörde ciddi bir kaynak.",
        },
        {
          q: "Mevcut sitemizi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Okul sitelerinde yıllara yayılmış bir duyuru ve haber arşivi olur; bunların hangilerinin taşınacağını başta netleştiririz.",
        },
      ],
      ctaTitle: "Okulunuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Özel okul araması bir alışveriş gibi başlamaz; tedirginlikle başlar. Veli önce 'bu okul çocuğuma uyar mı' sorusunun cevabını arar: hangi kademeler var, sınıf mevcudu kaç, kadroda kim var, gün nasıl geçiyor, yabancı dil ve kulüpler ne durumda. Bu sorular sitede karşılanmıyorsa kurum, gezilecek okullar listesine bile giremez.",
          "İkinci kırılma ücrette olur. Ücreti sitede göremeyen velinin bir kısmı telefon etmek yerine kurumu listeden siliyor. Rakamı yazmak istemeyen okullar için bile bir çıkış var: burs ve kardeş indirimi koşullarını, ödeme planını ve ücrete servisin, yemeğin, kitabın dahil olup olmadığını anlatan bir sayfa, 'arayın öğrenin' cümlesinden çok daha fazla görüşme getirir.",
          "Üçüncüsü, bu işte talebin yılın birkaç ayına sıkışmasıdır. Kayıt sezonu açılınca arama patlar, kontenjanlar dolunca düşer. O aylarda aramada ve haritada görünmüyorsanız yılın tek satış dönemini kaçırırsınız. Kendi siteniz olmadığında elinizde bir Instagram hesabı ve haritadaki birkaç veli yorumu kalır; eğitim modelinizi, kadronuzu ve kampüsünüzü anlatacak yer hiçbir yerde yoktur.",
        ],
      },
      pricing: {
        title: "Özel Okul & Kolej Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kurum tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Kurumsal sayfalar, kademe tanıtımları, kampüs ve derslik galerisi, akademik kadro, iletişim ve tek tık ön kayıt talebi. Tek kampüslü kurumlar için yeterli.",
          },
          {
            name: "Ön kayıtlı okul sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Kademeye göre dallanan ön kayıt ve tanışma günü formu, duyuru ve haber yönetimi, akademik takvim, bursluluk sınavı sayfası, servis ve yemek bilgisi. Kayıt sezonunu siteden yönetmek isteyenler için.",
          },
          {
            name: "Veli paneli & mobil",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Veli girişi, duyuru bildirimleri, okul yönetim yazılımıyla entegrasyon ve mobil uygulama. Birden fazla kampüsü ya da kalabalık bir veli kitlesini tek yerden yönetmek gerektiğinde.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Kademelerinizi, kontenjanınızı, eğitim modelinizi ve kayıt sezonu takviminizi konuşuruz. Tek şubeli bir anaokuluyla dört kademeli bir kolejin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Fotoğraf ve içerik",
            body: "Veli kampüsü göremediği okula gelmiyor, o yüzden en çok emek buraya gidiyor. Derslikleri, laboratuvarı, bahçeyi ve yemekhaneyi nasıl çekeceğinizi anlatan bir çekim listesi gönderiyoruz; öğrenci görsellerinde izin durumunu bu aşamada birlikte netleştiriyoruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, velinin kampüsü gezmeden önce içinin rahatlaması. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Duyuruları ve kadroyu kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız; panel kayıt sezonu başlamadan sizin elinizde olur.",
          },
        ],
      },
      checklist: {
        title: "Özel Okul & Kolej Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Ön kayıt formu kademeye göre ayrışıyor mu?",
            body: "Anaokulu velisiyle lise velisi aynı formu doldurmamalı. Gelen talebin hangi sınıfa olduğu belli değilse kayıt ofisi her talebi baştan aramak zorunda kalır ve sezonun en yoğun haftasında geri dönüşler gecikir.",
          },
          {
            title:
              "Duyuru ve akademik takvimi kendiniz güncelleyebiliyor musunuz?",
            body: "Okul yılı boyunca haftalık duyuru çıkar. Her güncelleme için ajansa haber vermek zorundaysanız site birkaç ay içinde geçen yılın sitesine döner ve veli oraya bakmayı bırakır.",
          },
          {
            title: "Öğrenci görsellerinde izin süreci tanımlı mı?",
            body: "Hangi fotoğrafın hangi izinle yayında olduğu belli değilse bir gün bir veli sizi arar. Galerinin nasıl kurulacağını, fotoğrafı kimin yükleyeceğini ve izin kaydının nerede tutulacağını teklif aşamasında konuşun.",
          },
          {
            title: "Ücret ve burs bilgisi tek yerde toplanmış mı?",
            body: "Velinin en çok aradığı iki bilgi bu. Sitede bir karşılığı yoksa veli bu aramayı size değil, veli forumlarına ve rakiplerinizin karşılaştırma sayfalarına yapıyor.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Veli araştırmasının büyük kısmını akşam telefondan yapıyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının kurumunuz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Okullarda alan adı çoğu zaman yıllar önce bir öğretmenin kişisel hesabında açılmış oluyor; devri baştan halledin.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Private School & College Website",
      metaDescription:
        "Website design and online pre-registration for private schools, colleges and kindergartens. Show your campus, win the parent, work on mobile. Get a free quote.",
      eyebrow: "For Private Schools",
      h1: "Private School & College Website",
      intro:
        "Parents decide over a few evenings, not a whole year: they read the faculty, look at the campus, check the bus routes and the fees, then fill in a form for an open day. A site that shows the campus, introduces the teaching staff and takes the enquiry on the spot turns that evening your way. Forpus builds sites for private schools, colleges and kindergartens.",
      shortAnswer: {
        title:
          "What does a private school website include, and what does it cost?",
        body: "A private school website is your own address for explaining your teaching model, showing the campus and collecting pre-registration enquiries. A typical school site Forpus builds has a page per stage (kindergarten, primary, middle and high school), faculty profiles, a campus and classroom gallery, a pre-registration and open-day form, scholarship exam and quota announcements, bus routes and lunch menus, a parent announcements section, and a fast, mobile-first design. A site introducing the institution and its stages runs ₺50,000–85,000 and goes live in one to two weeks. A full site with a working pre-registration form, announcement management and a page per stage runs ₺90,000–150,000 over two to four weeks. Once a parent portal, an integration with your school management software or a mobile app is involved, you are looking at a project starting from ₺220,000. Enquiries compress into a few months of the year, so the pre-registration call sits on the first screen. No stock photography goes in the gallery, and no student appears without written parental consent.",
      },
      benefits: [
        {
          title: "Pre-registration from the site",
          body: "Let parents fill in the open-day and enquiry form from their phone; the season starts on your site, not at the front desk.",
        },
        {
          title: "Trust through seeing",
          body: "Show the classrooms, the campus and the teaching staff so the decision to come and visit is made on your site.",
        },
        {
          title: "Be found on Google",
          body: "Show up on the map and in search for 'private school near me' and neighbourhood college queries.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Stage pages (kindergarten to high school)",
        "Pre-registration and open-day form",
        "Campus, classroom and lab gallery",
        "Faculty and teaching staff profiles",
        "Announcements, news and academic calendar",
        "Bus routes, lunch menu, WhatsApp",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you build a pre-registration form?",
          a: "Yes. From a simple enquiry form up to one that branches by stage and year of birth and lets parents pick a date for an open day. Enquiries land in your inbox and build up as a list in the panel, so the admissions office can track who has been called back through the season.",
        },
        {
          q: "Should we publish our fees?",
          a: "Private schools in Turkey are required to announce their tuition before the academic year begins, so the figure is already public. Hiding it on your own site only means parents find it on a forum or on a competitor's comparison page. We usually publish fees by stage alongside the payment plan, sibling and upfront discounts, and what the fee does and does not cover.",
        },
        {
          q: "Can we update announcements ourselves?",
          a: "Yes, and in this sector it matters more than anything else. Announcements, news, the academic calendar, the lunch menu and staff profiles are all editable from your panel. Schools publish something almost every week; if each edit needs an agency, the site becomes last year's site within months.",
        },
        {
          q: "Can you build a parent portal?",
          a: "Most schools already run school management software. In that case we connect a 'Parent Login' button to the existing system rather than building a second portal. If you have no such software, homework, attendance and grades are a separate project and should not be squeezed into a website package.",
        },
        {
          q: "Can we use photos of our students?",
          a: "Only with written parental consent. The cleanest approach is to include image-use permission in the enrolment paperwork and keep any student without it out of the gallery entirely. Where consent is unclear, well-shot empty classrooms, labs and grounds work surprisingly well.",
        },
        {
          q: "We have more than one campus. How do we show that?",
          a: "A separate page per campus: its own address, stages, quota, bus routes, staff and its own pre-registration form. It also helps you show up for searches made in the district where that campus sits, since parents usually search by neighbourhood.",
        },
      ],
      ctaTitle: "Let's build a site for your school",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "catering",
    image: "/generated/personas/catering.webp",
    service: "web",
    slug: { tr: "catering-firmasi-web-sitesi", en: "catering-company-website" },
    tr: {
      metaTitle: "Kurumsal Catering & Yemek Fabrikası Web Sitesi",
      metaDescription:
        "Kurumsal catering ve toplu yemek firmaları için web sitesi. Kapasitenizi, belgelerinizi ve menünüzü gösteren, teklif toplayan tasarım. Ücretsiz teklif alın.",
      eyebrow: "Catering Firmalarına Özel",
      h1: "Kurumsal Catering & Yemek Fabrikası Web Sitesi",
      intro:
        "Satın alma müdürü üç firmadan teklif toplar ve ilk elemeyi sitenizde yapar: günde kaç porsiyon çıkarıyorsunuz, belgeleriniz güncel mi, bugün kimlere yemek veriyorsunuz. Mutfağınızı gösteren ve teklif talebini eksiksiz toplayan bir site, o listede kalmanızı sağlar. Forpus kurumsal catering firmaları ve yemek fabrikaları için site kuruyor.",
      shortAnswer: {
        title: "Catering web sitesi ne içerir, ne kadar tutar?",
        body: "Kurumsal catering web sitesi, mutfağınızı ve kapasitenizi gösterdiğiniz, satın alma biriminin teklif talebini eksiksiz bıraktığı kendi adresinizdir. Forpus'un kurduğu tipik bir catering sitesinde taşımalı yemek, yerinde üretim, okul ve toplantı ikramı için ayrı hizmet sayfaları, kişi sayısını, öğün adedini ve lokasyonu soran bir teklif formu, haftalık örnek menü bölümü, gerçek mutfak, üretim ve sevkiyat aracı fotoğrafları, gıda güvenliği belgeleri ile sorumlu yönetici bilgisi, kurumsal referans listesi ve mobil uyumlu hızlı bir tasarım bulunur. Kapasitenizi ve belgelerinizi anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Teklif formunun ve menü bölümünün çalıştığı tam bir kurumsal site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Günlük porsiyon bildirimi ve müşteri firma paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Menüyü ve belge tarihlerini panelden kendiniz güncellersiniz. Galeriye stok tabak görseli konmaz; satın almacı sizin mutfağınızı görmek ister. Alan adı ve site sizin adınıza kaydedilir.",
      },
      benefits: [
        {
          title: "Teklife hazır talep",
          body: "Kişi sayısı, öğün adedi ve lokasyon formda sorulsun; ilk cevabınız e-posta değil, teklif olsun.",
        },
        {
          title: "Belgeyle gelen güven",
          body: "Mutfağınızı, kapasitenizi ve gıda güvenliği belgelerinizi görünür kılın; ilk elemeyi geçin.",
        },
        {
          title: "Google'da bulunun",
          body: "'Kurumsal yemek firması' ve 'taşımalı yemek' aramalarında sizi arayan satın almacının karşısına çıkın.",
        },
      ],
      featuresTitle:
        "Kurumsal Catering & Yemek Fabrikası sitenizde neler olur?",
      features: [
        "Taşımalı yemek ve yerinde üretim sayfaları",
        "Kişi sayısı ve öğün soran teklif formu",
        "Haftalık örnek menü bölümü",
        "Mutfak, üretim ve sevkiyat galerisi",
        "Belgeler, sertifikalar ve kapasite bilgisi",
        "Kurumsal referans listesi ve iletişim",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Teklif formu neleri sormalı?",
          a: "Teklifi tek seferde hazırlayacak kadarını: kaç kişi, günde kaç öğün, hangi lokasyon, taşımalı mı yerinde üretim mi, sözleşme süresi ve varsa diyet ya da özel menü ihtiyacı. Formu uzun tutmaktan çekinmeyin; bu formu dolduran kişi zaten karar sürecinde ve soruların ciddiyeti firmanın ciddiyeti hakkında da bir izlenim bırakıyor. Acele edenler için tek tık WhatsApp ve telefon her sayfada durur.",
        },
        {
          q: "Kişi başı fiyatı sitede yazmalı mıyız?",
          a: "Kurumsal tarafta genelde hayır. Kişi başı bedel; kişi sayısına, öğün adedine, mesafeye ve menü kademesine göre değiştiği için tek bir rakam yazmak sizi ya pahalı ya da ucuz gösteriyor. Bunun yerine fiyatı neyin belirlediğini açıkça yazmanızı öneriyoruz — satın almacı bunu okuduğunda teklifi doğru bilgiyle istiyor. Davet ve organizasyon catering'i satıyorsanız orada bir başlangıç fiyatı vermek işe yarıyor.",
        },
        {
          q: "Haftalık menüyü sitede yayınlar mıyız, kendim güncelleyebilir miyim?",
          a: "Evet ve evet. Örnek bir haftalık menü, satın almacıya kalite seviyenizi tek ekranda gösteren en pratik şey. Menü bölümünü panelden kendiniz yükleyeceğiniz şekilde kuruyoruz. Mevcut müşterilerinizin çalışanları da o haftanın menüsüne siteden bakabildiğinde İK'ya gelen soru azalıyor; bu bölüm sadece yeni müşteri için değil, mevcut sözleşme için de çalışıyor.",
        },
        {
          q: "Belgelerimizi ve sertifikalarımızı sitede göstermeli miyiz?",
          a: "Evet, bu sektörde en çok işe yarayan sayfalardan biri. Gıda işletme kayıt belgesi, ISO 22000 ve HACCP gibi sertifikalar, günlük üretim kapasiteniz, araç sayınız ve sorumlu yöneticinizin unvanı ayrı bir sayfada dursun. Belgelerin geçerlilik tarihi geldiğinde güncellemeniz gerektiği için bu bölümü panelden değiştirebileceğiniz şekilde kuruyoruz. Sahip olmadığınız bir belgeyi varmış gibi göstermek ise sözleşme aşamasında geri tepiyor; sadece elinizdekini yazın.",
        },
        {
          q: "İhaleye ve kurumsal satın almaya giren bir firma için ayrıca ne koymalı?",
          a: "İndirilebilir bir tanıtım dosyası, kapasite ve araç filosu bilgisi, hizmet verdiğiniz sektörlerle referans listesi, resmi unvan ile vergi dairesi ve numarası, kurumsal e-posta adresleri. Satın alma birimi teklif dosyasını hazırlarken bu bilgileri sizden istemek yerine siteden alabiliyorsa süreç hızlanıyor. Referansta müşteri adı vermeniz sözleşmeye takılıyorsa sektör ve ölçek üzerinden yazarız.",
        },
        {
          q: "Günlük porsiyon bildirimi için bir panel kurar mısınız?",
          a: "Evet. Müşteri firmanın İK'sı ya da vardiya sorumlusu ertesi günün kişi sayısını siteden bildirir, siz bütün lokasyonların adedini tek ekrandan görürsünüz. Telefonda ve WhatsApp'ta alınan adetlerin yanlış yazılması bu işin en pahalı hatası: eksik çıkan yemek de fazla çıkan yemek de doğrudan zarar. Kaç lokasyona hizmet verdiğinize bakarak bunun size değip değmeyeceğini birlikte konuşuruz.",
        },
        {
          q: "Hem kurumsal hem davet catering'i yapıyoruz, aynı sitede olur mu?",
          a: "Olur ama iki ayrı bölüm gerekiyor. Fabrikaya yemek arayan satın alma müdürüyle düğün ya da açılış organizasyonu için fiyat soran kişi aynı şeyi merak etmiyor; biri kapasite ve belge, diğeri menü ve sunum görüyor olmak istiyor. Ayrı sayfalar kurduğumuzda hem ziyaretçi aradığını buluyor hem Google iki farklı aramada sizi gösterebiliyor.",
        },
        {
          q: "Google'da bulunmama yardım eder misiniz?",
          a: "Evet. Bu sektörde talep haritadan çok metin aramasından geliyor: 'kurumsal yemek firması', 'fabrikaya taşımalı yemek', 'okul yemek hizmeti' gibi aramalar için hizmet ve şehir sayfaları kurarız. Google İşletme Profilinizi de düzenler, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Elinizde referans listesi, menü arşivi veya belge dosyaları varsa bunların yeni yapıya taşınmasını da başta planlarız.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Kurumsal yemek işi tek bir telefonla kapanmıyor. Bir fabrikanın ya da plazanın satın alma birimi üç beş firma listeler, hepsinin sitesine girer ve elemeyi orada yapar. Baktığı şey bellidir: günde kaç porsiyon çıkarabiliyorsunuz, hangi belgelerle çalışıyorsunuz, şu anda kimlere yemek veriyorsunuz. Bu üçü sitede görünmüyorsa listede kalmanız için ortada bir sebep kalmıyor.",
          "İkinci kırılma teklif anında yaşanıyor. Çoğu catering sitesinde 'ad, e-posta, mesaj' kutusundan ibaret bir form var. O kutudan gelen tek satır 'fiyat alabilir miyiz' oluyor; teklifi hazırlamak için gereken kişi sayısı, günlük öğün adedi, servis şekli ve lokasyon bilgisi ise yok. Bilgiyi toplamak iki üç yazışma sürüyor ve bu arada rakip teklifini masaya bırakmış oluyor.",
          "Üçüncüsü güven. Bu işte kurum yemek değil, sorumluluk satın alıyor: yüzlerce çalışanına her gün yemek verecek firmayı seçiyor. Mutfağın gerçek fotoğrafı, üretim düzeni, gıda güvenliği belgeleri ve sorumlu yöneticinin unvanı yerine internetten alınmış tabak görselleri koyduğunuzda, sizi hiç tanımayan bir şirketin içi rahatlamıyor. Sözleşme yenilemeleri ve okul dönemi başlangıcı yılın belli haftalarına toplandığı için, o haftalarda aramada görünmemek doğrudan sezonu kaçırmak oluyor.",
        ],
      },
      pricing: {
        title: "Kurumsal Catering & Yemek Fabrikası Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kurumsal tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Hizmet sayfaları, mutfak ve üretim galerisi, kapasite ve belgeler bölümü, referans listesi, tek tık arama ve WhatsApp. Tek mutfakla çalışan firmalar için yeterli.",
          },
          {
            name: "Teklif toplayan kurumsal site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Kişi sayısı, öğün ve lokasyon soran teklif formu, haftalık menü bölümü, taşımalı yemek ile yerinde üretim için ayrı sayfalar, indirilebilir tanıtım dosyası. Kurumsal ihaleye giren firmalar için.",
          },
          {
            name: "Menü paneli & sipariş sistemi",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Günlük porsiyon bildirimi, müşteri firma girişi, lokasyon bazlı adet takibi ve menü yönetimi. Birden fazla lokasyona hizmet veren, adetleri artık telefonla toplayamayan firmalar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Günlük kapasitenizi, hizmet modelinizi ve hedef müşterinizi konuşuruz. Fabrikalara taşımalı yemek veren bir firmayla plazalara ikram hizmeti veren bir firmanın sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik ve fotoğraf",
            body: "Hizmet kalemlerini, kapasiteyi, belgeleri ve referansları toplarız. Bu işte site mutfak fotoğrafıyla ayakta durduğu için mutfağı, üretim hattını ve sevkiyat aracını nasıl çekeceğinizi anlatan bir çekim listesi gönderiyoruz; uygun kare yoksa birlikte plan yaparız.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, siteyi ilk kez açan satın almacıya ölçeğinizi ve düzeninizi ilk ekranda hissettirmek. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, kurumsal e-posta ve Google İşletme Profili bağlantısı dahil yayına alırız. Menüyü ve belgeleri kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Kurumsal Catering & Yemek Fabrikası Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Teklif formu işe yarar bilgi topluyor mu?",
            body: "Kişi sayısı, öğün adedi, lokasyon ve servis şekli sorulmuyorsa o form teklif toplamıyor, sadece yazışma başlatıyor. Teklif verdiğiniz ajanstan formun soru listesini önceden isteyin.",
          },
          {
            title: "Belgeleri kendiniz güncelleyebiliyor musunuz?",
            body: "Sertifikaların geçerlilik tarihi var. Her yenilemede ajansa haber vermek zorundaysanız sitede kısa sürede süresi geçmiş bir belge asılı kalır ve bu, güven vermesi gereken sayfayı tersine çevirir.",
          },
          {
            title: "Mutfak fotoğrafları gerçek mi?",
            body: "Bu sektörde stok görsel ters teper. Satın almacı çelik tezgahı, üretim düzenini ve sevkiyat aracını görmek ister; internetten alınmış kusursuz bir tabak fotoğrafı güven değil şüphe üretir. Ajans 'görsel bizde' diyorsa neyi kastettiğini sorun.",
          },
          {
            title: "Menü panelden değişiyor mu?",
            body: "Haftalık menü her hafta değişir. Güncellemesi zahmetliyse menü bölümü birkaç ay içinde eskir ve siteyi ziyaret eden mevcut müşteriniz de bunu görür.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Satın alma müdürü de tedarikçiye çoğu zaman telefonundan bakıyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve kurumsal e-posta kime ait?",
            body: "Alan adının şirketiniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Kurumsal e-posta adresleriniz de aynı alan adına bağlı olduğu için bu, bir gün ajans değiştirdiğinizde en kritik madde.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Corporate Catering Company Website",
      metaDescription:
        "Websites for corporate catering and contract catering companies. Show your capacity, certificates and menus, and collect quote requests you can price.",
      eyebrow: "For Catering Companies",
      h1: "Corporate Catering Company Website",
      intro:
        "A purchasing manager gathers quotes from three suppliers and makes the first cut on your website: what is your daily capacity, are your certificates current, who do you cook for today. A site that shows your kitchen and collects a complete quote request keeps you on that shortlist. Forpus builds sites for corporate catering companies and industrial kitchens.",
      shortAnswer: {
        title:
          "What does a catering company website include, and what does it cost?",
        body: "A corporate catering website is your own address for showing your kitchen and your capacity, and for letting a purchasing team leave a request you can actually price. A typical site we build has separate pages for contract catering, on-site kitchens, school meals and meeting hospitality, a quote form that asks for headcount, meals per day and location, a weekly sample menu, real photos of the kitchen, the production line and the delivery vehicles, your food safety certificates and responsible manager details, a client reference list and a fast, mobile-friendly design. A presentation site covering capacity and certificates starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full corporate site with a working quote form and menu section sits in the ₺90,000–150,000 band over two to four weeks. Once daily headcount reporting and a client panel are involved, you are looking at a project starting from ₺220,000. You update the menu and certificate dates yourself from the panel.",
      },
      benefits: [
        {
          title: "Requests you can price",
          body: "Ask for headcount, meals per day and location in the form, so your first reply is a quote instead of a question.",
        },
        {
          title: "Trust backed by documents",
          body: "Put your kitchen, your capacity and your food safety certificates where a buyer can see them.",
        },
        {
          title: "Get found on Google",
          body: "Show up for 'corporate catering company' and 'contract catering' searches, not just word of mouth.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Contract catering and on-site kitchen pages",
        "Quote form asking headcount and meals",
        "Weekly sample menu section",
        "Kitchen, production and delivery gallery",
        "Certificates, capacity and compliance page",
        "Client reference list and corporate contact",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "What should the quote form ask?",
          a: "Enough to price the job in one pass: headcount, meals per day, location, whether it is delivered or cooked on site, contract length and any special or dietary menu needs. Do not be afraid of a longer form — whoever fills it in is already in a buying process. One-tap phone and WhatsApp stay on every page for the ones in a hurry.",
        },
        {
          q: "Should we publish per-person prices?",
          a: "On the corporate side, usually not. The per-person figure moves with headcount, meals per day, distance and menu tier, so a single number makes you look either expensive or cheap. Instead, state clearly what drives the price. For event catering, a starting price does help.",
        },
        {
          q: "Can we publish the weekly menu and update it ourselves?",
          a: "Yes to both. A sample weekly menu is the fastest way to show a buyer your quality level. We build the menu section so you upload it from the panel — and your existing clients' staff use it too, which cuts the questions their HR team fields.",
        },
        {
          q: "Should our certificates be on the site?",
          a: "Yes — it is one of the pages that works hardest here. Food business registration, ISO 22000 and HACCP certificates, daily capacity, vehicle count and your responsible manager belong on their own page. Because certificates expire, we make that section editable from your panel.",
        },
        {
          q: "Can you build a panel for daily headcount reporting?",
          a: "Yes. Your client's HR or shift supervisor submits tomorrow's headcount through the site and you see every location on one screen. Miscounted numbers taken over the phone are the most expensive mistake in this business — both short and surplus meals cost you directly.",
        },
        {
          q: "We do event catering as well. Same site?",
          a: "Yes, but in two distinct sections. A purchasing manager sourcing factory meals and someone pricing a wedding want different answers — one needs capacity and certificates, the other needs menus and presentation. Separate pages also let Google show you for both searches.",
        },
      ],
      ctaTitle: "Let's build a site for your catering company",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "guvenlik",
    image: "/generated/personas/guvenlik.webp",
    service: "web",
    slug: { tr: "ozel-guvenlik-web-sitesi", en: "security-company-website" },
    tr: {
      metaTitle: "Özel Güvenlik Şirketi Web Sitesi",
      metaDescription:
        "Özel güvenlik şirketlerine özel kurumsal web sitesi: tesis bilgisi alan teklif formu, güvenlik görevlisi başvurusu, referans ve belge bölümü.",
      eyebrow: "Özel Güvenlik Şirketine Özel",
      h1: "Özel Güvenlik Şirketi Web Sitesi",
      intro:
        "Bir tesis müdürü güvenlik şirketi ararken üç şeye bakar: kaç personelle çalıştığınıza, hangi belgeye sahip olduğunuza ve bugüne kadar kimlere hizmet verdiğinize. Bunları gösteren ve tesis bilgisini alarak teklif talebi toplayan bir site, sizi telefon listesinden kısa listeye taşır. Forpus özel güvenlik şirketleri için site kuruyor.",
      shortAnswer: {
        title: "Özel güvenlik şirketi web sitesi ne içerir, ne kadar tutar?",
        body: "Özel güvenlik şirketi web sitesi, hizmet kalemlerinizi anlattığınız, faaliyet izninizi ve referanslarınızı gösterdiğiniz, teklif talebiyle personel başvurusunu topladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir güvenlik şirketi sitesinde tesis türüne göre ayrılmış hizmet sayfaları, personel ve vardiya sayısını soran bir teklif formu, güvenlik görevlisi başvuru formu, referans ve hizmet bölgesi listesi, faaliyet izin belgesiyle kalite belgelerinin durduğu kurumsal bölüm, alarm izleme ve kamera tarafını anlatan ayrı bir sayfa, mobil uyumlu hızlı bir tasarım bulunur. Kurumsal tanıtıma odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Hizmetlerin ayrı ayrı sayfalandığı, teklif ve başvuru formlarının çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Başvuru havuzunun ve müşteri raporlamasının panelden yönetildiği bir yapı işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Formlar kişisel veri topladığı için aydınlatma metinleri en baştan kurulur. Alan adı ve site sizin adınıza kaydedilir; referansları ve açık pozisyonları panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Teklife hazır talep",
          body: "Tesis türünü, personel ve vardiya sayısını soran bir form, 'fiyat nedir' telefonunu hesaplanabilir bir teklif talebine çevirir.",
        },
        {
          title: "Belgeyle kurulan güven",
          body: "Faaliyet izninizi, kalite belgelerinizi ve referans listenizi görünür kılın; kurumsal alıcı kısa listeyi buradan yapıyor.",
        },
        {
          title: "Personeli siteden bulun",
          body: "Güvenlik görevlisi başvurularını kendi adresinizde toplayın; kart türü ve vardiya uygunluğu baştan belli olsun.",
        },
      ],
      featuresTitle: "Özel Güvenlik Şirketi sitenizde neler olur?",
      features: [
        "Tesis türüne göre hizmet sayfaları",
        "Personel ve vardiya soran teklif formu",
        "Güvenlik görevlisi başvuru formu",
        "Referans ve hizmet bölgesi listesi",
        "Faaliyet izni ve kalite belgeleri",
        "Mobil uyumlu, hızlı kurumsal tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Teklif formunda hangi bilgileri sormalıyız?",
          a: "Fiyatı belirleyen kalemleri: tesis türünü (site, fabrika, plaza, AVM, şantiye, hastane, okul), hizmet noktası sayısını, istenen personel sayısını, vardiya düzenini (8 veya 12 saat, 7/24 mü), silahlı ya da silahsız görevlendirmeyi, il ve ilçeyi, hizmetin başlayacağı tarihi ve varsa kamera veya kartlı geçiş beklentisini. Bu alanlar dolu geldiğinde teklifi ilk görüşmeden önce hazırlayabilirsiniz; boş gelen bir iletişim formu ise sizi iki üç telefonluk bir bilgi toplama turuna sokar.",
        },
        {
          q: "Güvenlik görevlisi başvurularını siteden alabilir miyiz?",
          a: "Evet, bu sektörde en çok işe yarayan formlardan biri. Adaydan özel güvenlik kimlik kartının silahlı mı silahsız mı olduğunu, kart geçerlilik tarihini, ikamet ilçesini, vardiya ve şehir dışı görev uygunluğunu, sürücü belgesini ve varsa CV'sini alırız. Başvurular panelde birikir, açık pozisyonları siz açıp kapatırsınız. Aday verisi topladığınız için aydınlatma metni ve saklama süresi baştan kurgulanır.",
        },
        {
          q: "Faaliyet izin belgemizi ve kalite belgelerimizi sitede göstermeli miyiz?",
          a: "Evet. 5188 kapsamındaki faaliyet izin belgeniz, varsa kalite ve iş sağlığı güvenliği belgeleriniz, sigorta ve ticaret sicil bilgileriniz kurumsal alıcının ilk baktığı yerdir. Bunları küçük bir logo şeridi olarak değil, belge adı, numarası ve geçerlilik bilgisiyle birlikte gösteririz. Kamu tarafına da özel sektöre de aynı sayfa çalışır.",
        },
        {
          q: "Referans listesinde müşteri adı yazabilir miyiz?",
          a: "Sözleşmenize bakmak gerekir; bazı hizmet sözleşmelerinde gizlilik maddesi bulunur ve müşteri adının tanıtımda kullanılması izne bağlıdır. İzin alabildiğiniz müşterileri adıyla, alamadıklarınızı ise kimliği belli etmeyecek biçimde yazarız: 'bir OSB'de üç vardiya, yirmi dört personel' gibi. İkincisi de ölçeğinizi göstermek için yeterince güçlüdür.",
        },
        {
          q: "Kamu ihalelerine giriyoruz, sitenin bize faydası olur mu?",
          a: "İhale süreci EKAP üzerinden yürür, siteniz o süreci değiştirmez. Ama iki yerde işinize yarar: idareler ve özel sektör alıcıları teklif veren şirketi mutlaka araştırır, orada gördükleri kapasite ve süreklilik izlenimi karar aşamasında etkilidir. İkincisi, ihale dışında kalan site yönetimi, fabrika ve plaza işlerinin girişi doğrudan aramadan gelir; kamu işine bağlı kalmamanızı sağlayan kanal budur.",
        },
        {
          q: "Alarm izleme ve kamera hizmetlerimizi nasıl anlatmalıyız?",
          a: "Ayrı bir sayfada. Personel hizmeti alan müşteriyle kamera, kartlı geçiş veya alarm izleme arayan müşteri farklı sorularla geliyor: biri vardiya ve devir maliyetini, diğeri kurulum, izleme merkezi ve müdahale süresini merak ediyor. İki hizmeti tek sayfada anlatmak ikisini de zayıflatır; ayırdığınızda Google da sizi iki ayrı aramada gösterebilir.",
        },
        {
          q: "Birden fazla ilde hizmet veriyoruz, bunu nasıl gösteriyoruz?",
          a: "Her il için ayrı bir sayfa kurarız: o ildeki hizmet kapsamı, varsa ofis veya operasyon merkezi bilgisi, o bölgeden referanslar ve doğrudan teklif formu. 'İstanbul özel güvenlik şirketi' gibi aramalar il adıyla yapıldığı için tek bir kurumsal sayfayla bu aramalarda görünmek zordur.",
        },
        {
          q: "Sitede fiyat yazmalı mıyız?",
          a: "Bu sektörde net fiyat yazmak yanıltıcı olur, dürüst yanıt budur. Personel maliyeti asgari ücrete, SGK primlerine, vardiya sayısına ve yıllık izin devir yüküne bağlı olarak değişir; bugün yazdığınız rakam birkaç ay sonra tutmaz. Bunun yerine fiyatın hangi kalemlerden oluştuğunu anlatan bir sayfa kurarız. Bu hem beklentiyi doğru yere oturtur hem de en ucuz teklifle karşılaştırıldığınızda arada ne olduğunu anlatmanızı kolaylaştırır.",
        },
        {
          q: "Mevcut sitemizi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Elinizde referans listesi, belge görselleri veya kurumsal tanıtım dosyası varsa bunları yeni yapıya taşırız.",
        },
      ],
      ctaTitle: "Şirketiniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Güvenlik hizmeti alan taraf, karar vermeden önce kısa liste yapar. Site yöneticisi, tesis müdürü ya da satın alma sorumlusu birkaç şirketi arar, adlarını Google'a yazar ve sitelerine bakar. O ekranda kaç personel çalıştırdığınız, hangi illerde hizmet verdiğiniz, faaliyet izninizin bulunduğu ve bugüne kadar hangi tip tesislerde çalıştığınız görünmüyorsa liste kısalırken siz elenirsiniz. Bu sektörde en çok kaybedilen iş, teklif verilemeden kaybedilen iştir.",
          "İkinci kırılma teklif anında olur. Sitede yalnızca bir iletişim formu varsa gelen mesaj 'güvenlik hizmeti almak istiyoruz, fiyat nedir' cümlesinden ibaret kalır. Oysa fiyatı belirleyen şeyler bellidir: kaç noktada, kaç personelle, hangi vardiya düzeniyle, silahlı mı silahsız mı ve hangi tarihte başlanacak. Bu bilgileri formun sorması, aynı bilgiyi telefonda tek tek toplamaya kıyasla hem sizin hem karşı tarafın günlerini geri verir.",
          "Üçüncüsü, bu işte müşteri kadar personel de aranıyor. Sirkülasyon yüksek olduğu için şirketler sürekli kimlik kartlı güvenlik görevlisi arıyor ve başvurular ilan sitelerinden ya da dağınık WhatsApp mesajlarından geliyor. Sitenizde kart türünü, geçerlilik tarihini, ikamet ilini ve vardiya uygunluğunu soran bir başvuru formu yoksa bu havuzu hiç biriktiremezsiniz; her yeni işte aynı arayışa sıfırdan başlarsınız.",
        ],
      },
      pricing: {
        title: "Özel Güvenlik Şirketi Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kurumsal tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Hizmet kalemleri, kurumsal tanıtım, faaliyet izni ve belge bölümü, referans listesi, hizmet bölgeleri ve teklif talebi formu. Tek ilde çalışan şirketler için yeterli.",
          },
          {
            name: "Teklif ve başvuru sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Tesis türüne göre ayrı hizmet sayfaları, tesis ve vardiya bilgisi alan detaylı teklif formu, CV yüklemeli güvenlik görevlisi başvuru formu, il bazlı hizmet bölgesi sayfaları ve alarm izleme bölümü.",
          },
          {
            name: "Operasyon paneli & mobil",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Başvuru havuzu ve aday takibi, personel ile vardiya kayıtları, müşteriye açılan denetim raporu paneli ve mobil uygulama. Çok noktalı, çok illi operasyonlar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hizmet kalemlerinizi, çalıştığınız tesis tiplerini, kaç ilde ve kaç personelle çalıştığınızı konuşuruz. Yalnızca site ve plaza işi yapan bir şirketle fabrika ve kamu ihalesine giren bir şirketin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Belge ve içerik",
            body: "Faaliyet izin belgenizi, kalite ve sigorta belgelerinizi, referans listenizi ve varsa kurumsal tanıtım dosyanızı alırız. Referanslarda ad kullanma izniniz olup olmadığını bu aşamada netleştirir, izin gerekmeyenler için anonim ama ölçeği gösteren bir anlatım kurarız.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, karşı tarafa ciddiyet ve süreklilik hissi vermek; bu sektörde en çok bunun karşılığı var. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, form bildirimleri ve Google İşletme Profili bağlantısı dahil yayına alırız. Referansları, belgeleri ve açık pozisyonları kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Özel Güvenlik Şirketi Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Teklif formu tesis bilgisini alıyor mu?",
            body: "Ad, telefon ve mesaj kutusundan ibaret bir form bu sektörde işe yaramaz. Personel sayısı, vardiya düzeni, silahlı-silahsız ayrımı ve tesis türü sorulmuyorsa teklifi yine telefonda hazırlarsınız.",
          },
          {
            title: "Güvenlik görevlisi başvuru formu var mı?",
            body: "Personel bulmak bu işin sürekli açık kalan tarafı. Kart türü, geçerlilik tarihi, ilçe ve vardiya uygunluğu soran bir başvuru formu, ilan bütçenizi zamanla kendi adresinize çeker.",
          },
          {
            title: "Belgeler ve referanslar güncellenebiliyor mu?",
            body: "Faaliyet izni yenilenir, kalite belgeleri tarih alır, referans listesi büyür. Her değişiklik için ajansa haber vermek zorundaysanız sayfa kısa sürede eskir ve teklif verirken elinizde kullanılamaz hale gelir.",
          },
          {
            title: "Form metinleri KVKK'ya göre yazıldı mı?",
            body: "Aday başvurusu ve teklif talebi kişisel veri toplar; burada veri sorumlusu sizsiniz. Aydınlatma metni, açık rıza kutusu ve saklama süresi teslimde hazır olmalı, sonradan eklenecek bir kalem değil.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Tesis müdürü de aday da siteye çoğunlukla telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının şirketiniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Private Security Company Website",
      metaDescription:
        "Corporate websites for private security firms: a quote form that captures site and shift details, guard applications, references and licence sections.",
      eyebrow: "For Security Firms",
      h1: "Private Security Company Website",
      intro:
        "A facility manager shortlisting security firms checks three things: how many guards you field, which licence you hold and who you already work for. A site that shows all three and collects quote requests with the site details attached moves you from a phone list to a shortlist. Forpus builds websites for private security companies.",
      shortAnswer: {
        title:
          "What does a private security company website include, and what does it cost?",
        body: "A private security company website is your own address for explaining your services, showing your operating licence and references, and collecting both quote requests and guard applications. A typical site Forpus builds has service pages split by facility type, a quote form that asks for headcount and shift pattern, a guard application form, a reference and coverage-area list, a corporate section carrying your operating licence and quality certificates, a separate page for alarm monitoring and CCTV, and a fast, mobile-friendly design. A corporate presentation site runs ₺50,000–85,000 and goes live in one to two weeks. A full site with separate service pages and working quote and application forms runs ₺90,000–150,000 over two to four weeks. Once an applicant pool and client reporting are managed from a panel, you are looking at a project starting from ₺220,000. Because the forms collect personal data, the privacy notices are built in from the start.",
      },
      benefits: [
        {
          title: "Quote-ready enquiries",
          body: "A form that asks for facility type, headcount and shift pattern turns a 'what's your price' phone call into a request you can actually price.",
        },
        {
          title: "Trust built on paperwork",
          body: "Put your operating licence, quality certificates and reference list where buyers look first — that is where the shortlist gets made.",
        },
        {
          title: "Recruit from your own site",
          body: "Collect guard applications at your own address, with licence type and shift availability known up front.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service pages by facility type",
        "Quote form with headcount and shifts",
        "Guard application form",
        "Reference and coverage-area list",
        "Operating licence and certificates",
        "Fast, mobile-friendly corporate design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "What should the quote form ask for?",
          a: "Everything that drives the price: facility type, number of posts, guards required, shift pattern, armed or unarmed deployment, city and district, start date, and any CCTV or access-control expectation. With those fields filled in you can price the job before the first call instead of spending two or three calls collecting the same details.",
        },
        {
          q: "Can we take guard applications through the site?",
          a: "Yes, and it is one of the highest-value forms in this sector. We ask for licence type, licence expiry, district of residence, shift and travel availability, driving licence and an optional CV. Applications collect in a panel and you open and close positions yourself. Since you are handling candidate data, retention and privacy notices are set up from the start.",
        },
        {
          q: "Should we display our operating licence and certificates?",
          a: "Yes. Your operating licence, any quality and occupational-safety certificates, insurance and company registration details are the first things a corporate buyer looks for. We present them as named documents with numbers and validity dates, not as a row of small logos.",
        },
        {
          q: "Can we name clients in our reference list?",
          a: "Check your service contracts first — many carry a confidentiality clause that makes naming the client conditional on permission. We name the ones who agree and describe the rest without identifying them: 'twenty-four guards across three shifts at an industrial estate' still shows your scale.",
        },
        {
          q: "How do we present alarm monitoring and CCTV work?",
          a: "On its own page. Someone buying manned guarding and someone buying cameras or access control arrive with different questions, and covering both on one page weakens both. Separating them also lets Google show you for two different searches.",
        },
        {
          q: "Should we publish prices?",
          a: "Publishing a fixed price here would be misleading. Guarding costs move with the minimum wage, social security contributions, shift count and accrued leave, so a figure you post today will not hold for long. We build a page explaining what makes up the price instead — it sets expectations correctly and helps you explain the gap when you are compared with the cheapest bid.",
        },
      ],
      ctaTitle: "Let's build a site for your company",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "rentacar",
    image: "/generated/personas/rentacar.webp",
    service: "web",
    slug: { tr: "arac-kiralama-web-sitesi", en: "car-rental-website" },
    tr: {
      metaTitle: "Araç Kiralama & Rent A Car Web Sitesi",
      metaDescription:
        "Araç kiralama firmalarına özel web sitesi ve tarihli rezervasyon. Filonuzu gösteren, komisyonsuz talep alan, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Araç Kiralamaya Özel",
      h1: "Araç Kiralama Web Sitesi",
      intro:
        "Araç arayan kişi belli bir tarih aralığı için arar ve karşısına önce kıyaslama platformları çıkar. Filonuzu gösteren, alış-iade tarihi alan ve komisyon kesilmeyen kendi adresiniz, o talebi doğrudan size getirir. Forpus araç kiralama firmaları için site kuruyor.",
      shortAnswer: {
        title: "Araç kiralama web sitesi ne içerir, ne kadar tutar?",
        body: "Araç kiralama web sitesi, filonuzu segment segment gösterdiğiniz, alış ve iade tarihi seçilerek rezervasyon aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir araç kiralama sitesinde segmentlere ayrılmış araç sayfaları, alış-iade tarihi ve ofis seçimiyle çalışan bir rezervasyon formu, günlük, haftalık ve aylık fiyat gösterimi, yaş, ehliyet süresi, depozito ve km limitini yazan bir kiralama şartları sayfası, güvence paketleri, havalimanı ve adrese teslim bilgisi, ofis sayfaları, Google harita bağlantısı ve mobil uyumlu hızlı bir tasarım bulunur. Filoyu ve şartları anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Tarihli rezervasyonun ve dönem fiyatlarının çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Araç bazlı müsaitlik takvimi, online ödeme ve sözleşme akışı işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Kıyaslama platformlarından gelen her rezervasyonda komisyon ödersiniz; kendi sitenizden gelen talepte ödemezsiniz. Alan adı ve site sizin adınıza kaydedilir; araçları ve sezon fiyatlarını panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Tarihli rezervasyon",
          body: "Müşteri alış ve iade tarihiyle saatini kendi seçsin; talep telefon başında değil, siteden toplansın.",
        },
        {
          title: "Komisyonsuz talep",
          body: "Platformdan gelen her kiralamada pay vermek yerine müşteriyi doğrudan kendi adresinize alın.",
        },
        {
          title: "Google'da bulunun",
          body: "'Antalya havalimanı araç kiralama' gibi şehir ve ofis bazlı aramalarda haritada ve sonuçlarda görünün.",
        },
      ],
      featuresTitle: "Araç Kiralama sitenizde neler olur?",
      features: [
        "Segmentlere ayrılmış filo listesi",
        "Alış-iade tarihli rezervasyon formu",
        "Günlük, haftalık ve aylık fiyatlandırma",
        "Kiralama şartları ve güvence paketleri",
        "Ofis, havalimanı ve adrese teslim sayfaları",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Tarihli rezervasyon sistemi kurar mısınız?",
          a: "Evet. Basit bir tarih ve saat seçmeli talep formundan, araç bazında müsaitliği takip eden ve dolu günleri kapatan bir rezervasyon takvimine kadar ihtiyacınıza göre kurarız. On beş araca kadar olan filoların çoğunda tarih formu artı WhatsApp yönlendirmesi yetiyor; araç sayısı ve ofis sayısı arttıkça takvimli yapı kendini gerektiriyor.",
        },
        {
          q: "Araç kiralama web sitesi ne kadar tutar?",
          a: "Filo listesi, kiralama şartları ve WhatsApp yönlendirmeli bir tanıtım sitesi ₺50.000–85.000 aralığında başlar. Alış-iade tarihiyle çalışan rezervasyon formu, dönem fiyatları ve ofis sayfaları olan tam bir site ₺90.000–150.000 aralığındadır. Araç bazlı müsaitlik takvimi, online ödeme ve sözleşme akışı işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Araçları ve fiyatları kendim güncelleyebilir miyim?",
          a: "Evet, bu sektörde şart. Araç ekleme çıkarma, günlük, haftalık ve aylık fiyat bantları, sezon ve bayram tarifesi ile geçici olarak kiralamaya kapattığınız araçlar panelden yönetilir. Filosu değişen bir firmanın her güncelleme için ajansa yazması, sitenin kısa sürede yanlış fiyat göstermesi demek.",
        },
        {
          q: "Online ödeme veya kapora alabilir miyiz?",
          a: "Evet. Sanal POS ile tam ödeme ya da rezervasyonu bağlayan bir kapora tahsilatı kurabiliyoruz; banka veya ödeme kuruluşu anlaşması sizin adınıza açılır, para doğrudan sizin hesabınıza geçer. Teslimde alınan kredi kartı provizyonu ise ayrı bir konu, onu sitede tahsil etmiyoruz; şartlar sayfasında tutarıyla birlikte yazıyoruz.",
        },
        {
          q: "Kıyaslama platformlarında ilanım var, siteye gerek var mı?",
          a: "Platformlar trafik getirir, bunu yadsımıyoruz. Ancak üç şeyi yapmazlar: komisyonsuz rezervasyon getirmek, müşteriyi ikinci kiralamada size bağlamak ve haritada kendi işletmeniz olarak çıkmak. Kurumsal müşteri ve uzun dönem talebi de neredeyse hiç oradan gelmez. İkisi birlikte çalışır; site platformların yerine değil, yanına kurulur.",
        },
        {
          q: "Havalimanı ve şehir bazlı sayfalar yapıyor musunuz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. Aramalar şehir ve teslim noktası üzerinden yapıldığı için gerçekten hizmet verdiğiniz her ofis ve teslim bölgesi için ayrı sayfa kurarız: adres, çalışma saatleri, teslim ücreti, o noktadaki araçlar. Teslim yapmadığınız şehirler için sayfa üretmiyoruz; o yöntem kısa vadede trafik gibi görünüp uzun vadede hem sıralamanıza hem itibarınıza zarar veriyor.",
        },
        {
          q: "Kiralama şartlarını sitede yazmak zorunda mıyım?",
          a: "Zorunlu değil ama en çok işe yarayan sayfalardan biri. Yaş ve ehliyet süresi, provizyon veya depozito tutarı, günlük km limiti ve aşım ücreti, yakıt politikası, ek sürücü, güvence paketlerinin neyi kapsayıp kapsamadığı, HGS geçişleri ve trafik cezası süreci yazılı olduğunda uygun olmayan talep kapıya gelmeden eleniyor. Bu metni birlikte netleştiriyoruz; ne kadar açık yazarsanız teslimdeki tartışma o kadar azalıyor.",
        },
        {
          q: "Uzun dönem ve kurumsal filo kiralama için ayrı bölüm kurar mısınız?",
          a: "Evet, ayrı kurgulanması gerekir. Üç günlüğüne araç arayan kişiyle yirmi dört aylık operasyonel kiralama için teklif toplayan bir şirket aynı sayfada karar vermiyor. Kurumsal tarafta fiyat listesi yerine teklif formu, kiralama modelinin anlatımı, filo kapasitesi ve varsa kurumsal referanslarınız öne çıkar.",
        },
        {
          q: "Google Haritalar'da öne çıkmama yardım eder misiniz?",
          a: "Evet. Her ofisiniz için Google İşletme Profilini kurar veya düzenler, kategori, hizmet bölgesi ve çalışma saatlerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Araç kiralama araması tarihle başlar. Kişi 'şu cumadan pazartesiye kadar, şu şehirde, otomatik vitesli bir araç' diye arar ve karşısına çoğunlukla önce kıyaslama platformları çıkar. Kendi siteniz yoksa o kişi sizi ancak bir listenin içinde, fiyat sırasında ve rakiplerinizle yan yana görür; adınızı hatırlamasının bir yolu yoktur.",
          "İkinci mesele komisyondur. Platform size trafik getirir ama her rezervasyondan pay alır ve müşteriyi kendi müşterisi olarak tutar. Aynı kişi altı ay sonra tekrar araç kiraladığında ödemeyi yine oradan yaparsınız. Kendi siteniz, ikinci kiralamayı komisyonsuz getirebilen tek kanaldır; platformları bırakmanız gerekmez, sadece hepsini tek kapıya bağlamamak gerekir.",
          "Üçüncü kayıp güven ve şart tarafında yaşanır. Müşterinin kafasındaki sorular bellidir: yaş sınırı kaç, ehliyet kaç yıllık olmalı, kredi kartından ne kadar provizyon çekilecek, günlük km limiti ne, hasar ve HGS nasıl işliyor. Bunlar sitede yazılı değilse aynı soruları gün boyu WhatsApp'ta yanıtlarsınız ve teslim noktasında tartışma çıkar. Yazılıysa uygun olmayan talep baştan elenir, kalan müşteri kararını sitede verir.",
        ],
      },
      pricing: {
        title: "Araç Kiralama Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Filo tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Segmentlere ayrılmış filo listesi, kiralama şartları sayfası, ofis ve teslim noktaları, harita ve çalışma saatleri. Tek tık arama ve WhatsApp. Tek ofisli firmalar için yeterli.",
          },
          {
            name: "Rezervasyonlu kiralama sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Alış-iade tarihi ve ofis seçimiyle çalışan rezervasyon formu, günlük, haftalık ve aylık fiyat gösterimi, sezon tarifesi, güvence paketleri, kurumsal ve uzun dönem bölümü. Talebi platformlar yerine siteden toplamak isteyenler için.",
          },
          {
            name: "Filo takvimi & online ödeme",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Araç bazlı müsaitlik takvimi, çift yönlü ofis ve tek yön teslim yönetimi, online ödeme veya kapora tahsilatı, sözleşme ve müşteri kayıt akışı, mobil uygulama. Filo defterle yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Filo büyüklüğünüzü, segmentlerinizi, ofis ve teslim noktalarınızı, günlük kiralama mı yoksa uzun dönem mi ağırlıklı çalıştığınızı konuşuruz. On araçlı tek ofisli bir firmayla havalimanı teslimi yapan altmış araçlı bir firmanın sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Filo ve içerik",
            body: "Araç listesi için şablon gönderiyoruz: marka, model, yıl, vites, yakıt, segment, günlük ve aylık fiyat. Kiralama şartları metnini birlikte netleştiririz. Görselde katalog fotoğrafı yerine kendi araçlarınızın karelerini öneriyoruz; müşteri teslimde gördüğünün sitedekiyle aynı olmasını bekliyor.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Bu sektörde tasarımın ilk işi tarih kutusunu ilk ekrana getirmek; müşteri sayfayı açtığı anda tarihini yazabilmeli. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve her ofis için Google İşletme Profili bağlantısı dahil yayına alırız. Araçları, sezon fiyatlarını ve kapalı tarihleri kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Araç Kiralama Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Tarih ve saat seçilebiliyor mu?",
            body: "Rezervasyon formu alış ve iade tarihini almıyorsa o bir form değil, sadece bir iletişim kutusudur. Saat de önemli: teslim ve iade saati günlük ücreti doğrudan etkilediği için müşterinin baştan seçebilmesi gerekir.",
          },
          {
            title: "Fiyat ve müsaitliği kendiniz güncelleyebiliyor musunuz?",
            body: "Sezon fiyatı ve filo doluluğu haftadan haftaya değişir. Her değişiklik için ajansa haber vermek zorundaysanız site kısa sürede yanlış fiyat gösterir ve kiralamayan araç için rezervasyon alırsınız.",
          },
          {
            title: "Kiralama şartları yazılı mı?",
            body: "Yaş, ehliyet süresi, depozito veya provizyon, km limiti, yakıt politikası ve güvence kapsamı sitede yazılı değilse aynı tartışma her teslimde tekrar eder. Teklif aldığınız ajansa bu sayfanın kapsama dahil olup olmadığını sorun.",
          },
          {
            title: "Şehir sayfaları gerçek mi?",
            body: "Size 'yüzlerce şehir sayfası' vaat eden teklifleri dikkatle okuyun. Hizmet vermediğiniz yerler için üretilen sayfalar hem müşteride hem arama motorunda güven kaybettiriyor; sayfa sayısı değil, gerçekten teslim yaptığınız noktalar önemli.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Araç aramalarının neredeyse tamamı telefondan yapılıyor, üstelik çoğu yolda ya da havalimanında. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının firmanız adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Rezervasyon verilerinizin de sizde kalacağını baştan netleştirin.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Car Rental (Rent A Car) Website",
      metaDescription:
        "Websites for car rental companies with date-based booking. Show your fleet, take commission-free reservations, work on mobile. Get a free quote.",
      eyebrow: "For Car Rental",
      h1: "Car Rental Website",
      intro:
        "People search for a car by date, and comparison platforms usually get in front of you first. Your own address — showing the fleet, taking pick-up and drop-off dates and charging no commission — brings that request straight to you. Forpus builds sites for car rental companies.",
      shortAnswer: {
        title: "What does a car rental website include, and what does it cost?",
        body: "A car rental website is your own address for showing the fleet, publishing your terms and taking bookings with real pick-up and drop-off dates. A typical site Forpus builds has vehicle pages split by segment, a booking form with pick-up and return dates, times and office selection, daily, weekly and monthly pricing, a rental terms page covering age, licence length, deposit and mileage limits, coverage options, airport and address delivery details, office pages, a Google Maps link and a fast, mobile-friendly design. A site covering the fleet and the terms starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full site with working date-based booking and seasonal pricing sits in the ₺90,000–150,000 band over two to four weeks. Once per-vehicle availability, online payment and a contract flow are involved, you are looking at a project starting from ₺220,000. Every booking from a comparison platform carries a commission; one from your own site does not.",
      },
      benefits: [
        {
          title: "Bookings with real dates",
          body: "Let customers pick their own pick-up and drop-off dates and times, so requests arrive on the site instead of the phone.",
        },
        {
          title: "Commission-free requests",
          body: "Take the customer directly instead of paying a cut on every booking that comes through a platform.",
        },
        {
          title: "Be found on Google",
          body: "Show up for city and airport searches like 'car rental Antalya airport', on the map and in results.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Fleet listing split by segment",
        "Booking form with pick-up and return dates",
        "Daily, weekly and monthly pricing",
        "Rental terms and coverage options",
        "Office, airport and address delivery pages",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you build a booking system with dates?",
          a: "Yes. From a simple date-and-time request form up to a calendar that tracks availability per vehicle and closes booked days. Most fleets under fifteen cars do fine with a date form plus WhatsApp; as the fleet and the number of offices grow, a calendar starts to pay for itself.",
        },
        {
          q: "Can I update vehicles and prices myself?",
          a: "Yes, and in this sector it is essential. Adding and removing cars, daily, weekly and monthly price bands, seasonal and holiday rates, and taking a vehicle off the site while it is out — all of it is managed from the panel.",
        },
        {
          q: "Can we take online payment or a deposit?",
          a: "Yes. We can set up full payment or a booking deposit through a payment gateway opened in your name, so the money lands in your account. The card pre-authorisation taken at handover is separate; we don't collect that online, we state it with its amount on the terms page.",
        },
        {
          q: "I already list on comparison platforms. Do I need a site?",
          a: "Platforms bring traffic, no argument there. But they won't bring you a commission-free booking, they won't tie the customer to you for the second rental, and they won't put your business on the map. Corporate and long-term enquiries almost never come from them either. The site goes next to the platforms, not instead of them.",
        },
        {
          q: "Do you build airport and city pages?",
          a: "Yes, and it is the work that pays off most here. Searches happen by city and pick-up point, so we build a page for every office and delivery area you actually serve: address, hours, delivery fee and the cars available there. We do not generate pages for cities you don't serve.",
        },
        {
          q: "Do you write out the rental terms?",
          a: "We build the page and shape it with you: age and licence requirements, deposit or pre-authorisation amount, daily mileage limit and excess charge, fuel policy, additional drivers, what each coverage option does and doesn't include, toll passes and traffic fines. Written down, it filters out unsuitable requests before they reach the counter.",
        },
      ],
      ctaTitle: "Let's build a site for your rental company",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "otogaleri",
    image: "/generated/personas/otogaleri.webp",
    service: "web",
    slug: { tr: "oto-galeri-web-sitesi", en: "car-dealership-website" },
    tr: {
      metaTitle: "Oto Galeri Web Sitesi & Araç Stok Sistemi",
      metaDescription:
        "Oto galeri ve ikinci el araç satıcıları için stok yönetimli web sitesi. Filtreli araç vitrini, takas ve kredi formu, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Oto Galeriye Özel",
      h1: "Oto Galeri Web Sitesi",
      intro:
        "İlan sitesinde aynı model için sıralanan onlarca satıcıdan birisiniz; kendi adresinizde ise stoğunuzu, ekspertiz düzeninizi ve galerinin kendisini gösterirsiniz. Kilometre, hasar kaydı ve takas sorularına telefon çalmadan cevap veren bir vitrin, tereddüt eden alıcıyı avluya getirir. Forpus oto galeriler ve ikinci el araç satıcıları için stok yönetimli siteler kuruyor.",
      shortAnswer: {
        title: "Oto galeri web sitesi ne içerir, ne kadar tutar?",
        body: "Oto galeri web sitesi, stoğunuzdaki araçları kendi adresinizde filtrelenebilir ve tek tek detaylandırılmış biçimde gösterdiğiniz yerdir. Forpus'un kurduğu tipik bir galeri sitesinde araçları kendiniz eklediğiniz bir stok paneli, marka, model, yıl, kilometre, yakıt ve vitese göre filtreleme, her araç için çoklu fotoğraf galerisi ve teknik özellik tablosu, ekspertiz ile hasar kaydı bilgisinin durduğu bir alan, takas talebi ve kredi ön başvuru formu, tek tık WhatsApp ve mobil uyumlu hızlı bir tasarım bulunur. Galeriyi ve seçili araçları tanıtan bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Stoğun panelden yönetildiği, filtreli ve arama motorlarına hazırlanmış tam bir vitrin sitesi ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Kredi hesaplama, takas değerlemesi ve ilan portallarına besleme işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Fotoğraflar katalog kareleriyle değil, avludaki aracın kendi çekimiyle konur. Satılan araç silinmez, \"satıldı\" olarak arşivlenir; hem referans olur hem arama motorundaki sayfa boşa düşmez. Alan adı ve site sizin adınıza kaydedilir; stoğu panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Filtreli araç vitrini",
          body: "Marka, model, yıl ve kilometreye göre süzülen bir stok sayfasıyla alıcı aradığı aracı saniyede bulsun.",
        },
        {
          title: "Stoğu kendiniz yönetin",
          body: "Yeni gelen aracı panelden ekleyin, satılanı arşivleyin; vitrin her gün avludaki gerçek stoğu göstersin.",
        },
        {
          title: "Portala bağımlılığı azaltın",
          body: "İlan aboneliğiniz sürerken kendi adresinizde de bulunun; müşteri komisyon zincirine girmeden doğrudan sizinle konuşsun.",
        },
      ],
      featuresTitle: "Oto Galeri sitenizde neler olur?",
      features: [
        "Araç stok yönetim paneli",
        "Marka, model, yıl ve km filtresi",
        "Çoklu fotoğraf ve video galerisi",
        "Ekspertiz ve hasar kaydı alanı",
        "Takas ve kredi ön başvuru formu",
        "Tek tık WhatsApp ve arama",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Araçları stoğa kendim ekleyebilir miyim?",
          a: "Evet, sitenin asıl işi bu. Panelden marka, model, yıl, kilometre, yakıt, vites, kasa tipi, renk ve fiyat alanlarını doldurur, fotoğrafları sürükleyip bırakırsınız; araç aynı anda vitrinde ve filtrelerde görünür. Satış olduğunda tek tıkla 'satıldı' işaretlersiniz. Girişi hızlandırmak için sık kullandığınız donanım listelerini hazır seçenek olarak tanımlarız, her araçta baştan yazmazsınız.",
        },
        {
          q: "sahibinden ve arabam.com'daki ilanlarımla bağlanır mı?",
          a: "Dürüst cevap: portalların çoğu ilan verisini dışarıya açık biçimde vermiyor, bu yüzden 'otomatik çekeriz' vaadine temkinli yaklaşın. Kurumsal hesabınızda ilan aktarımı tanımlıysa siteyi o akışa bağlayabiliriz. Tanımlı değilse tersini kurarız: araç bilgisi önce sizin sitenizde oluşur, portala oradan kopyalanır. Böylece stoğun tek doğru kaynağı sizde kalır, portal aboneliğiniz bitse bile vitrin ayakta durur.",
        },
        {
          q: "Ekspertiz, hasar kaydı ve kilometreyi sitede yazmalı mıyım?",
          a: "Yazmanızı öneriyoruz. Alıcının en büyük çekincesi tam burada; bilgiyi belirsiz bırakmak tereddüdü büyütüyor, açık yazmak ise sizi listedeki diğer satıcılardan ayırıyor. Araç detay sayfasına ekspertiz özetini, boyalı ve değişen parça durumunu, kilometre ve muayene bilgisini koyarız; isterseniz raporun tamamını dosya olarak bağlarız. Uygun olmayan alıcı baştan elenir, galeriye gelen kişi ikna olmuş gelir.",
        },
        {
          q: "Kredi ve takas formu koyabilir miyiz?",
          a: "Evet, galeri sitelerinde en çok dönüş getiren iki form bunlar. Takas tarafında müşteri kendi aracının marka, model, yıl ve kilometre bilgisiyle birkaç fotoğrafını bırakır; siz değerlendirmeyi görerek yaparsınız, telefonda tahmin yürütmezsiniz. Kredi tarafında peşinat ve vade seçilen bir taksit hesaplayıcıyla ön başvuru formu kurarız. Hesaplayıcının bilgilendirme amaçlı olduğunu, kesin oran ve onayın bankadan çıktığını ekranda açıkça yazarız.",
        },
        {
          q: "Satılan araçları siliyor muyuz?",
          a: "Hayır, arşivliyoruz. Sayfa 'satıldı' etiketiyle yerinde kalır, vitrinde ve filtrelerde görünmez. İki faydası var: satılan araçlar zamanla galerinin referans arşivini oluşturur, bir de arama motorunda birikmiş sayfayı silip her seferinde sıfırdan başlamamış olursunuz. Arşivi tamamen kapatmak isterseniz o da bir ayardır.",
        },
        {
          q: "Araç fotoğraflarını nasıl çekmeliyim?",
          a: "Bu işte fotoğraf tasarımdan daha belirleyici. Her araç için aynı düzeni öneriyoruz: aynı noktalardan çekilmiş dört dış açı, ön ve arka koltuk, kilometre görünecek şekilde gösterge paneli, bagaj ve varsa kusurun yakın çekimi. Kusuru göstermek satışı düşürmüyor, gelen müşterinin niteliğini yükseltiyor. Katalog görseli kullanmayız; alıcı avludaki aracın kendisini görmek ister.",
        },
        {
          q: "Yetki belgesi ve galeri bilgilerini sitede göstermeli miyim?",
          a: "Evet, bu sektörde güvenin en ucuz kanıtı bu. İkinci el motorlu kara taşıtı ticareti yetki belgeniz, ticaret unvanınız, açık adresiniz, vergi bilgileriniz ve satış sonrası verdiğiniz garanti şartları tek bir sayfada dursun. Alıcı bu bilgileri zaten arıyor; bulamadığında galeriyi değil kendi tedirginliğini büyütüyor.",
        },
        {
          q: "Google'da bulunmama yardım eder misiniz?",
          a: "Evet. Google İşletme Profilinizi kurar veya düzenler, kategori, adres ve çalışma saatlerini doğru girer, siteyle bağlantısını sağlarız. Site tarafında araç sayfalarını arama motorunun anlayacağı yapıda kurarız; marka ve model bazlı sayfalar 'ikinci el [model] [şehir]' gibi aramalarda çalışır. Profil sizin sahipliğinizde kalır; doğrulama adımını adresinize gelen kodla sizin tamamlamanız gerekir.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. İçeriğinizi ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Elinizde bir stok listesi veya eski ilan veritabanı varsa, araçları tek tek girmek yerine toplu aktarımla taşınıp taşınamayacağını en başta netleştiririz.",
        },
      ],
      ctaTitle: "Galeriniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Araç arayan kişi işe ilan sitesinden başlar ve orada siz, aynı model için sıralanmış onlarca satıcıdan birisiniz; karşılaştırma çoğunlukla tek bir rakam üzerinden yürür. Galerinin adı ancak müşteri ciddileşince aranır — 'bu galeri güvenilir mi' sorusunun sorulduğu an tam olarak odur. O aramada karşısına çıkacak kendi adresiniz yoksa cevabı sizin kontrolünüzde olmayan yerlerde arar.",
          "İkinci kırılma güvende olur. İkinci el araçta alıcının kafasındaki sorular bellidir: kilometre gerçek mi, hasar kaydı ne durumda, boyalı ya da değişen parça var mı, satış sonrası ne veriliyor. Bu bilgiler sayfada yazılı değilse her biri telefonda tek tek sorulur ve konuşma sohbet değil sorgu haline gelir. Takas ile kredi için de aynısı geçerli: müşteri yola çıkmadan önce 'aracımı sayar mısınız' ve 'taksit ne olur' sorularının cevabını arıyor.",
          "Üçüncüsü stok hızıdır. Bu işte vitrin haftalık değişir; satılmış bir aracın sitede durması, en çok da o araç için gelen aramalarla vakit kaybettirir. Güncellenmeyen bir galeri sitesi, olmayan siteden daha çok zarar verir. Bu yüzden galeri sitesinde asıl mesele tasarım değil, stoğu her gün gerçeğe eşit tutabilmenizdir.",
        ],
      },
      pricing: {
        title: "Oto Galeri Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Galeri tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Galeriyi anlatan bir vitrin: seçili araçlar, fotoğraf galerisi, hizmetler, adres, çalışma saatleri, tek tık arama ve WhatsApp. Stoğu ilan portalından yürüten, siteyi güven ve tanıtım için isteyen galeriler için.",
          },
          {
            name: "Stok yönetimli vitrin",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Araçları panelden eklediğiniz tam bir stok sistemi: marka, model, yıl ve kilometre filtreleri, araç detay sayfaları, ekspertiz ve hasar kaydı alanı, takas talep formu, satıldı arşivi. Vitrinini kendi adresinden yürütmek isteyenler için.",
          },
          {
            name: "Kredi, takas & portal beslemesi",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Taksit hesaplayıcı, takas değerleme akışı, portallara ve sosyal medyaya besleme, çoklu şube ve satış danışmanı yönetimi, müşteri talep takibi. Stok ve ekip defterle yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Stok büyüklüğünüzü, çalıştığınız segmenti ve satışın bugün nereden geldiğini konuşuruz. Kırk araçlık bir avluyla tek markada uzmanlaşmış butik bir galerinin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Stok ve fotoğraf düzeni",
            body: "Araç alanlarını birlikte belirleriz: hangi bilgi her araçta zorunlu olacak, ekspertiz nasıl gösterilecek, fiyat yazılacak mı. Fotoğraf bu işte belirleyici olduğu için standart bir çekim listesi bırakır, mevcut karelerinizi birlikte gözden geçiririz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı ve bir araç detay sayfasını görürsünüz. Tasarımın işi, aracı avluda gördüğünüz netlikte göstermek ve alıcıyı tereddütte bırakmamak. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. İlk araçları birlikte gireriz; stoğu kendiniz yönetebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title: "Oto Galeri Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Stoğu kendiniz güncelleyebiliyor musunuz?",
            body: "Vitrin haftalık değişen bir iş. Her yeni araç ve her satış için ajansa haber vermek zorundaysanız site birkaç ay içinde gerçeği göstermeyi bırakır. Araç ekleme, fiyat değiştirme ve 'satıldı' işaretleme sizin elinizde olsun.",
          },
          {
            title: "Araç detay sayfası gerçekten detaylı mı?",
            body: "Marka ve fiyat yazan bir kutu ilan değildir. Kilometre, yakıt, vites, kasa tipi, muayene tarihi, ekspertiz özeti ve donanım listesi sayfada duruyor mu — teklif alırken örnek bir araç sayfası isteyin, ana sayfa değil.",
          },
          {
            title: "Filtreler gerçek stok üzerinde mi çalışıyor?",
            body: "Bazı sitelerde filtre görüntüde durur ama arkadaki araç verisi düzenli tutulmadığı için sonuç boş döner. Kendi stoğunuzdan üç dört araçla denenmiş bir demo görmeden onay vermeyin.",
          },
          {
            title: "Satılan araç arşivleniyor mu, siliniyor mu?",
            body: "Silinen her araçla birlikte o sayfanın arama motorundaki geçmişi de gider. 'Satıldı' olarak arşivleyen bir yapı hem referans bırakır hem birikimi korur.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Araç bakan kişi telefonda ve on beş fotoğraflı bir galeriyi açıyor. Teklif verenden mevcut işlerinden birinin adresini isteyin, kendi telefonunuzdan bir araç sayfasını açıp galeriyi kaydırın.",
          },
          {
            title: "Alan adı ve stok verisi kime ait?",
            body: "Alan adının galeriniz adına kayıtlı olduğundan ve stok verisinin talep ettiğinizde size teslim edilebileceğinden emin olun; ikisini de sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Car Dealership Website & Stock System",
      metaDescription:
        "Websites with stock management for used car dealerships. A filterable vehicle showcase, trade-in and finance forms, fast on mobile. Get a free quote.",
      eyebrow: "For Car Dealerships",
      h1: "Car Dealership Website",
      intro:
        "On a listing portal you are one of dozens of sellers for the same model. On your own address you show the stock, the inspection reports and the dealership itself. A showcase that answers mileage, damage history and trade-in questions before the phone rings brings the hesitant buyer onto the lot. Forpus builds stock-managed websites for used car dealerships.",
      shortAnswer: {
        title:
          "What does a car dealership website include, and what does it cost?",
        body: "A car dealership website is where you present your stock at your own address, filterable and detailed vehicle by vehicle. A typical dealership site Forpus builds carries a stock panel you manage yourself, filters for make, model, year, mileage, fuel and transmission, a multi-photo gallery and spec table for every car, a place for the inspection summary and damage history, trade-in and finance enquiry forms, one-tap WhatsApp and a fast, mobile-first design. A site introducing the dealership and a selection of cars runs ₺50,000–85,000 and goes live in one to two weeks. A full showcase with panel-managed stock, filters and search-engine groundwork runs ₺90,000–150,000 over two to four weeks. Once a finance calculator, trade-in valuation and portal feeds are involved, you are looking at a project starting from ₺220,000. Photos are shot on your own lot, not taken from catalogues. Sold cars are archived rather than deleted, so the page keeps the history it has earned. The domain and the site are registered in your name, and you update the stock yourself.",
      },
      benefits: [
        {
          title: "A filterable showcase",
          body: "Filters for make, model, year and mileage let a buyer find the right car in seconds.",
        },
        {
          title: "Run the stock yourself",
          body: "Add a new arrival from the panel and archive what sold, so the showcase matches the lot every day.",
        },
        {
          title: "Less portal dependency",
          body: "Keep your listing subscription running and still be found at your own address, where the buyer talks to you directly.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Vehicle stock management panel",
        "Make, model, year and mileage filters",
        "Multi-photo and video gallery",
        "Inspection and damage history section",
        "Trade-in and finance enquiry forms",
        "One-tap WhatsApp and call",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can I add vehicles to the stock myself?",
          a: "Yes, that is the point of the site. From the panel you fill in make, model, year, mileage, fuel, transmission, body type, colour and price, then drag the photos in; the car appears in the showcase and the filters at once. One click marks it sold. We also predefine the option lists you use most, so you are not retyping them for every car.",
        },
        {
          q: "Does it connect to listing portals?",
          a: "An honest answer: most portals do not expose listing data openly, so treat any 'we'll pull it automatically' promise with care. If your corporate account has a listing feed we can connect to it. If it does not, we build it the other way round: the vehicle record is created on your site first and copied to the portal from there, which keeps your site as the single source of truth.",
        },
        {
          q: "Should I publish inspection reports and damage history?",
          a: "We recommend it. This is exactly where a used-car buyer hesitates, and leaving it vague grows the doubt while stating it plainly sets you apart. The vehicle page carries the inspection summary, painted and replaced panels, mileage and inspection date, and we can attach the full report as a file. Buyers who would not have bought filter themselves out; the ones who visit arrive convinced.",
        },
        {
          q: "Can we add trade-in and finance forms?",
          a: "Yes, and they are the two forms that produce the most enquiries on a dealership site. On trade-ins the customer leaves their car's make, model, year and mileage with a few photos, so you value it looking at something real. On finance we build an instalment calculator with deposit and term plus an enquiry form, stating clearly on screen that the figures are indicative and the final rate comes from the bank.",
        },
        {
          q: "What happens to sold cars?",
          a: "They are archived, not deleted. The page stays in place with a 'sold' label and drops out of the showcase and filters. Over time the archive becomes a reference of what you have sold, and you keep the search-engine history of those pages instead of starting over each time.",
        },
        {
          q: "Can you refresh my existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones. If you already hold a stock list or an old listing database, we settle up front whether it can be imported in bulk rather than re-entered car by car.",
        },
      ],
      ctaTitle: "Let's build a site for your dealership",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "dugunsalonu",
    image: "/generated/personas/dugunsalonu.webp",
    service: "web",
    slug: { tr: "dugun-salonu-web-sitesi", en: "wedding-venue-website" },
    tr: {
      metaTitle: "Düğün Salonu & Kır Düğünü Web Sitesi",
      metaDescription:
        "Düğün salonu, kır düğünü ve kına mekânlarına özel web sitesi. Konsept galerileri, kapasite ve menü sayfaları, tarih sorgulama formu. Ücretsiz teklif alın.",
      eyebrow: "Düğün Mekânına Özel",
      h1: "Düğün Salonu & Kır Düğünü Web Sitesi",
      intro:
        "Çift, mekânı gezmeye gelmeden önce kararının yarısını telefonunda verir: kapasite ne, alan nasıl görünüyor, o tarih boş mu. Alanlarınızı gerçek düğün kareleriyle gösteren ve tarih sorgusunu oracıkta alan bir site, sizi gezilecek mekân listesine sokar. Forpus düğün salonları ve kır düğünü mekânları için site kuruyor.",
      shortAnswer: {
        title: "Düğün salonu web sitesi ne içerir, ne kadar tutar?",
        body: "Düğün salonu web sitesi, alanlarınızı ve kapasitenizi gösterdiğiniz, menü ile paketlerinizi yayınladığınız ve tarih sorgusu aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir düğün mekânı sitesinde kapalı salon, kır alanı ve havuz başı için ayrı sayfalar, kış ve yaz düğünlerini ayıran konsept galerileri, kişi başı menü ve paket sayfaları, tarih ile davetli sayısının seçildiği bir keşif randevusu formu, gerçek düğün hikâyeleri, 360 derece tur, gelin odasından otoparka kadar mekân bilgileri ve mobil uyumlu hızlı bir tasarım bulunur. Alanları ve paketleri anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Tarih sorgulama formunun ve konsept galerilerinin çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Müsaitlik takvimi ve teklif paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Sezon bir yıl önceden dolduğu için site, gelecek sezonun tarihlerini toplayacak biçimde kurgulanır. Galeriye stok fotoğraf konmaz; çift kendi düğününü o alanda hayal etmek ister. Alan adı ve site sizin adınıza kaydedilir; dolu tarihleri ve menü fiyatlarını panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Tarihli keşif talebi",
          body: "Çift düğün tarihini ve davetli sayısını kendi yazsın; mekân gezisi randevusu telefon başında değil siteden gelsin.",
        },
        {
          title: "Gezmeden önce ikna",
          body: "Kapalı salonu, kır alanını ve gece düzenini gerçek karelerle gösterin; kısa listeye sitede girin.",
        },
        {
          title: "Komisyonsuz talep",
          body: "Düğün pazaryerlerinden gelen her talebin bir bedeli var; kendi adresinizden geleninki yok.",
        },
      ],
      featuresTitle: "Düğün Salonu & Kır Düğünü sitenizde neler olur?",
      features: [
        "Alan sayfaları (kapalı salon, kır, havuz başı)",
        "Konsept galerisi ve 360 derece mekân turu",
        "Kişi başı menü ve paket sayfaları",
        "Tarih ve davetli sayılı keşif formu",
        "Gerçek düğün hikâyeleri ve yorumlar",
        "Google harita, ulaşım, otopark ve WhatsApp",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Tarih müsaitliğini sitede gösterebilir miyiz?",
          a: "İki yol var. Dolu günleri işaretlenmiş açık bir takvim koyarız; çift boş cumartesileri görür, gereksiz sorular biter. Ya da takvimi göstermeden tarih seçmeli bir sorgu formu kurarız; talep size gelir, cevabı siz verirsiniz. Dürüst tavsiyemiz: yeni sezonu doldurmaya çalışan mekânlar için açık takvim daha çok işe yarıyor, dolu ve seçici çalışan mekânlarda ise sorgu formu yetiyor. Hangisi olursa olsun tarihleri panelden kendiniz kapatabilirsiniz.",
        },
        {
          q: "Fiyatı siteye yazmalı mıyım, rakiplerim görmez mi?",
          a: "Rakipleriniz fiyatınızı zaten biliyor; bilmeyen tek taraf çift. Kişi başı menü bandını, minimum kişi sayısını ve salon kirasının dahil olup olmadığını yazmanızı öneriyoruz. Kesin rakam vermek zorunda değilsiniz — 'kişi başı şu banttan başlıyor, sezon ve güne göre değişir' cümlesi yeterli. Bunu yazan mekânlar daha az ama daha ciddi talep alıyor.",
        },
        {
          q: "Kır düğünü ve kapalı salon için ayrı sayfa şart mı?",
          a: "Şart değil ama kazandırıyor. 'Kır düğünü mekânları' arayanla 'düğün salonu' arayan farklı şeyler merak ediyor: biri yağmur planını, gölgeyi ve akşam ışığını, diğeri klimayı, sahneyi ve kapalı otoparkı. Ayrı sayfalarda hem çift aradığını bulur hem Google sizi iki farklı aramada gösterebilir. Kına, nişan ve after party için de aynısı geçerli.",
        },
        {
          q: "360 derece tur veya drone videosu ekler misiniz?",
          a: "Evet. Mekân turu bu sektörde en çok işe yarayan içeriklerden biri; gezmeye vakti olmayan ya da şehir dışından evlenen çiftlerin kararını sitede vermesini sağlıyor. Turu ve drone videosunu siteye gömeriz. Tek uyarı: ham video dosyası siteyi ağırlaştırdığı için görüntüleri sıkıştırılmış olarak ve ilk ekranı yavaşlatmayacak şekilde yerleştiririz.",
        },
        {
          q: "Düğün pazaryerlerinde ilanım var, kendi siteme gerek var mı?",
          a: "İkisi farklı iş görüyor. Pazaryeri size hazır trafik getirir ama bunun bir paket bedeli vardır, ilanınızın yanında rakipleriniz listelenir ve o sayfanın kurgusunu siz belirlemezsiniz. Kendi siteniz ise Google'dan ve haritadan gelen çifti komisyonsuz karşılar, sadece sizi anlatır ve tarih sorgusunu doğrudan size getirir. Pazaryerini kesmenizi önermiyoruz; oradan gelen çiftin de gerçek mekânı göreceği bir adresiniz olsun diyoruz.",
        },
        {
          q: "Gerçek düğün fotoğraflarını siteye koyabilir miyim?",
          a: "Bu sektörde tanıtım kısıtı yok, yani yorum yayınlamak, kampanya duyurmak ve gerçek düğün karelerini göstermek serbest. Dikkat edilecek iki şey var: fotoğrafın telifi çoğunlukla düğün fotoğrafçısındadır ve karede çiftin kendisi görünür. İkisinden de kısa bir yazılı izin almanızı öneriyoruz — fotoğrafçılar genelde 'mekân adıyla etiketlenmesi' karşılığında memnuniyetle veriyor. İzinli kareleri konsept ve mevsim etiketiyle kalıcı bir galeriye yerleştiririz.",
        },
        {
          q: "Menü, paket ve fiyatları kendim güncelleyebilir miyim?",
          a: "Evet. Menüler, paket içerikleri, kişi başı bantlar ve kampanyalar panelden güncellenir. Bu sektörde fiyatlar sezon başında topluca değiştiği için her seferinde ajansa haber vermek zorunda kalmamanız önemli; aksi halde site bir yıl eski fiyatla kalıyor ve çift kapıda başka rakam duyuyor.",
        },
        {
          q: "Google Haritalar'da öne çıkmama yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. Google İşletme Profilinizi kurar veya düzenler, kategori, kapasite ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Şehir dışından gelen davetliler için ulaşım ve otopark bilgisini de profile işleriz. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Nişanlı çiftlere reklamla ulaşabilir miyiz?",
          a: "Evet, düğün mekânı reklamla en iyi çalışan kategorilerden biri. Meta tarafında ilişki durumu ve ilgi alanı hedeflemesiyle, Google tarafında ise 'kır düğünü mekânı' gibi doğrudan niyet gösteren aramalarla ilerliyoruz. Reklamın hedefi genellikle satış değil, mekân gezisi randevusu oluyor. Bunu ayrı bir hizmet olarak yönetiyoruz; site yayına girmeden reklam başlatmıyoruz, çünkü gelen çiftin ineceği bir sayfa olmadan bütçe boşa gidiyor.",
        },
      ],
      ctaTitle: "Mekânınız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Düğün mekânı araması bir listeyle başlar. Çift birkaç akşam telefonda mekân bakar, on beş yirmi ismi üçe dörde indirir ve sadece o üçünü gezmeye gider. Bu eleme tamamen ekranda yapılır ve üç soruya bakılarak yapılır: kaç kişi alıyor, alan nasıl görünüyor, bizim tarihimizde boş mu. Bu üçü hızlıca görülemiyorsa mekân listeden düşer; kimse aramaz, kimse haber vermez.",
          "İkinci kayıp fiyatta olur. Türkiye'de düğün mekânlarının çoğu 'fiyat için arayınız' der ve bunu rakiplerinden korunmak için yapar. Ama bu, sizi arayanların büyük kısmının bütçesi tutmayan çiftler olması demektir: gün boyu telefonda aynı konuşma, sonunda aynı vazgeçiş. Kişi başı menü bandını ve minimum kişi sayısını yazmak müşteriyi kaçırmaz, yanlış müşteriyi kaçırır; kalanı zaten sizi gezmeye gelmek için arar.",
          "Üçüncüsü tarihtir. Bu işte talep kışın toplanır, düğün yazın olur; sezon çoğu mekânda bir yıl öncesinden kapanır. Çift belirli bir cumartesiyi sorar ve o soruya en hızlı cevap veren mekân randevuyu alır. Kendi siteniz yoksa elinizde bir Instagram hesabı ve düğün pazaryerlerindeki ilanınız kalır — orada her talep ücretlidir, yanınızda on rakip listelenir ve tarih sorusunu soran çift sizi değil, listeyi gezer.",
        ],
      },
      pricing: {
        title: "Düğün Salonu & Kır Düğünü Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Alan ve kapasite sayfaları, düğün galerisi, menü ve paket özeti, ulaşım ile otopark bilgisi, harita ve tek tık WhatsApp. Tek mekânlı işletmeler için yeterli.",
          },
          {
            name: "Tarih sorgulu site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Tarih ve davetli sayısı seçilen keşif formu, kapalı salon ile kır alanı için ayrı sayfalar, mevsim ve konsepte göre süzülen galeri, 360 derece tur, dolu tarih yönetimi ve gerçek düğün hikâyeleri.",
          },
          {
            name: "Müsaitlik takvimi & teklif paneli",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Alan bazlı müsaitlik takvimi, opsiyon ve rezervasyon kaydı, kişi başı menüye göre çalışan teklif hesaplayıcı, çifte özel teklif bağlantısı ve birden fazla mekânın tek panelden yönetimi.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Alanlarınızı, kapasitenizi, hangi bütçe segmentine hitap ettiğinizi ve sezon düzeninizi konuşuruz. Beş yüz kişilik bir kapalı salonla seksen kişilik butik bir kır bahçesinin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Fotoğraf ve içerik",
            body: "Bu sektörde site fotoğrafla ayakta duruyor, o yüzden en çok emek buraya gidiyor. Kurulu masa, gece ışığı, gündüz kır düzeni ve gelin odası gibi eksik kalan kareler için bir çekim listesi gönderir, geçmiş düğünlerin fotoğrafçı izinlerini birlikte toparlarız.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, çiftin kendi düğününü o alanda hayal edebilmesi. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Dolu tarihleri, menü fiyatlarını ve galeriyi kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Düğün Salonu & Kır Düğünü Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Form tarih ve kişi sayısı alıyor mu?",
            body: "Tarih ve davetli sayısı sormayan bir form, form değil sadece bir iletişim kutusudur. Bu iki bilgi olmadan gelen talebe cevap veremezsiniz ve çiftle aynı yazışmayı iki kez yaparsınız.",
          },
          {
            title: "Dolu tarihleri kendiniz kapatabiliyor musunuz?",
            body: "Sezonda takvim haftadan haftaya değişir. Her kapanan cumartesi için ajansa haber vermek zorundaysanız takvim yanlış kalır ve boş sandığınız tarihe randevu verirsiniz.",
          },
          {
            title: "Galeri gerçek düğünlerinizden mi?",
            body: "Boş salon fotoğrafı ve internetten alınmış kusursuz kır düğünü kareleri anında belli oluyor. Çift, kendi düğününün o alanda nasıl görüneceğini merak eder; kurulu masalar, ışık düzeni ve kalabalık olmadan bunu göremez.",
          },
          {
            title: "Kişi başı bant ve kapasite yazılı mı?",
            body: "Kapasite ve fiyat bandı yoksa gelen talebin büyük kısmı size uymayan çiftlerden gelir. Teklif aldığınız ajans 'fiyat yazmayalım' diyorsa, o boşluğun telefonda size kaça mal olduğunu hesaplayın.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Düğün mekânı sitesi ağır fotoğraf ve videoyla dolu olduğu için en çok yavaşlayan site türü budur. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan, wifi olmadan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının işletmeniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Yıllar içinde biriken düğün galerisi ve arama sıralaması o adrese bağlıdır.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Wedding Venue Website Design",
      metaDescription:
        "Websites for wedding venues, banquet halls and outdoor wedding gardens. Concept galleries, capacity and menu pages, date enquiry form. Get a free quote.",
      eyebrow: "For Wedding Venues",
      h1: "Wedding Venue & Garden Website",
      intro:
        "A couple makes half the decision on their phone before they ever visit: what the capacity is, how the space looks, whether their date is free. A site that shows your spaces through real wedding photos and takes a date enquiry on the spot gets you onto the shortlist. Forpus builds sites for wedding venues and outdoor wedding gardens.",
      shortAnswer: {
        title:
          "What does a wedding venue website include, and what does it cost?",
        body: "A wedding venue website is your own address for showing your spaces and capacity, publishing your menus and packages, and taking date enquiries. A typical venue site we build has separate pages for the indoor hall, the garden and the poolside, concept galleries that separate winter from summer weddings, per-head menu and package pages, a site-visit request form with a date and guest count, real wedding stories, a 360-degree tour, practical details from the bridal suite to parking, and a fast mobile-first design. A presentation site covering spaces and packages starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full site with a working date enquiry form and concept galleries sits in the ₺90,000–150,000 band over two to four weeks. Once an availability calendar and a quote panel are involved, you are looking at a project starting from ₺220,000. The season fills a year ahead, so the site is built to collect next season's dates. No stock photography goes in the gallery: a couple wants to picture their own wedding in your space.",
      },
      benefits: [
        {
          title: "Enquiries with real dates",
          body: "Let couples enter their wedding date and guest count; site visits get booked from the site instead of the phone.",
        },
        {
          title: "Convinced before they visit",
          body: "Show the hall, the garden and the evening set-up in real photos so you make the shortlist.",
        },
        {
          title: "Commission-free leads",
          body: "Every lead from a wedding marketplace has a price attached; a lead from your own address does not.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Space pages (hall, garden, poolside)",
        "Concept gallery and 360-degree venue tour",
        "Per-head menu and package pages",
        "Site-visit form with date and guest count",
        "Real wedding stories and reviews",
        "Google Maps, directions, parking and WhatsApp",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can we show date availability on the site?",
          a: "Two ways. We publish an open calendar with booked days marked, so couples see the free Saturdays and pointless enquiries stop. Or we keep the calendar private and use a date-picker enquiry form, so requests come to you and you answer them. Either way you close dates yourself from the panel.",
        },
        {
          q: "Should I publish prices? Won't competitors see them?",
          a: "Your competitors already know your prices; the couple is the only party who doesn't. We recommend publishing a per-head band, your minimum guest count and whether venue hire is included. You don't have to commit to an exact figure — 'per head starts from this band, varies by season and day' is enough, and it filters out the enquiries that were never going to book.",
        },
        {
          q: "Do we need separate pages for the garden and the indoor hall?",
          a: "Not required, but it pays off. Someone searching for an outdoor wedding venue wants the rain plan, the shade and the evening light; someone searching for a banquet hall wants air conditioning, the stage and covered parking. Separate pages let couples find what they came for and let Google show you for both searches.",
        },
        {
          q: "Can you add a 360-degree tour or drone video?",
          a: "Yes. A venue tour is one of the highest-performing pieces of content in this sector, especially for couples marrying from another city. We embed the tour and the drone footage, compressed so it never slows down the first screen.",
        },
        {
          q: "I already advertise on wedding marketplaces. Do I need my own site?",
          a: "They do different jobs. A marketplace brings ready traffic, but it costs a package fee, lists your competitors beside you and you don't control the page. Your own site catches couples coming from Google and Maps with no commission, talks only about you, and sends the date enquiry straight to you. Keep the marketplace — just give the couples it sends you a real address to land on.",
        },
        {
          q: "Can I use real wedding photos on the site?",
          a: "Yes, there are no advertising restrictions in this sector. Two practical points: the photographer usually owns the copyright, and the couple appears in the frame. Get a short written permission from both — photographers are usually happy to agree in exchange for a credit. We then place the approved photos in a permanent gallery tagged by concept and season.",
        },
      ],
      ctaTitle: "Let's build a site for your venue",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "tekstil",
    image: "/generated/personas/tekstil.webp",
    service: "web",
    slug: {
      tr: "tekstil-firmasi-web-sitesi",
      en: "textile-manufacturer-website",
    },
    tr: {
      metaTitle: "Tekstil Firması & Fason Konfeksiyon Web Sitesi",
      metaDescription:
        "İhracat yapan tekstil ve fason konfeksiyon üreticilerine özel web sitesi. Kapasite, sertifika ve teknik dosya yüklemeli teklif formu. Ücretsiz teklif alın.",
      eyebrow: "Tekstil Üreticisine Özel",
      h1: "Tekstil & Fason Konfeksiyon Web Sitesi",
      intro:
        "Fuarda kartvizit verdiğiniz alıcı akşam otel odasında sitenize bakar. Kapasitenizi, sertifikalarınızı ve numuneyi kaç günde çıkardığınızı orada bulamazsa listedeki bir sonraki isme geçer. Forpus ihracat yapan tekstil ve fason konfeksiyon üreticilerine, İngilizcesi gerçekten çalışan siteler kuruyor.",
      shortAnswer: {
        title: "Tekstil firması web sitesi ne içerir, ne kadar tutar?",
        body: "Tekstil ve fason konfeksiyon web sitesi, kapasitenizi, makine parkınızı ve sertifikalarınızı yabancı alıcıya kanıtladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir üretici sitesinde İngilizcenin birincil dil olarak kurgulandığı iki dilli bir yapı, ürün grubuna ayrılmış üretim sayfaları, aylık kapasite ile hat ve makine parkı tablosu, BSCI, Sedex, OEKO-TEX ve GOTS belgelerinin geçerlilik tarihiyle göründüğü bir sertifika sayfası, teknik dosya yüklenebilen numune ve teklif formu, fabrika turu videosu ile gerçek üretim fotoğrafları, numuneden sevkiyata giden sürecin anlatımı ve indirilebilir bir kapasite dosyası bulunur. Fabrikayı ve yetkinlikleri anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Ürün gruplarının ayrı sayfalandığı, dosya yüklemeli teklif formunun çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Alıcıya özel numune ve sipariş takip paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Marka isimleri gizlilik sözleşmeniz elverdiği ölçüde yazılır; yazılamadığı yerde ürün tipi ve adet üzerinden anlatılır. Alan adı ve site firmanız adına kaydedilir; kapasite dosyasını ve ürün gruplarını panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Kanıtlanabilir kapasite",
          body: "Aylık adet, hat sayısı ve makine parkı sayfada dursun; alıcı numune istemeden önce sizin ölçünüze uygun olduğunu görsün.",
        },
        {
          title: "Alıcının dilinde site",
          body: "Sektör terimleriyle yazılmış bir İngilizce sürüm, ihracata alışkın bir firmayla konuştuğunu ilk ekranda hissettirir.",
        },
        {
          title: "Dosyalı teklif talebi",
          body: "Alıcı teknik dosyasını, adedini ve termin beklentisini formdan bıraksın; süreç mail trafiğine dağılmadan başlasın.",
        },
      ],
      featuresTitle: "Tekstil & Fason Konfeksiyon sitenizde neler olur?",
      features: [
        "Ürün grubu bazlı üretim sayfaları",
        "Kapasite, hat ve makine parkı tablosu",
        "Sertifika ve denetim sayfası",
        "Teknik dosya yüklemeli teklif formu",
        "Fabrika turu videosu ve üretim galerisi",
        "İngilizce birincil, iki dilli yapı",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Sitenin İngilizcesini siz mi yazıyorsunuz?",
          a: "Evet, ve bu sektörde işin en belirleyici kısmı bu. Türkçe metni çeviri motoruna verip bırakmıyoruz; kesim, dikim, yıkama, örme, dokuma gibi başlıkların sektörde kullanılan karşılıklarıyla yazıyoruz. Firmanızda ihracat yazışmasını yürüten kişiyle terimleri baştan netleştirir, metni yayına almadan önce ona okuturuz.",
        },
        {
          q: "Tekstil firması web sitesi ne kadar tutar?",
          a: "Fabrikayı, ürün gruplarını ve sertifikaları anlatan iki dilli bir tanıtım sitesi ₺50.000–85.000 bandında başlar. Her ürün grubunun ayrı sayfalandığı, teknik dosya yüklemeli teklif formunun çalıştığı bir üretici sitesi ₺90.000–150.000 aralığındadır. Alıcıya özel giriş, numune ve sipariş takibi işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Çalıştığımız markaların adını siteye yazabilir miyiz?",
          a: "Bu tamamen imzaladığınız gizlilik sözleşmelerine bağlı ve kararı sizin vermeniz gerekir; sözleşmeleri görmeden biz söyleyemeyiz. Yazamadığınız markalar için işe yarayan bir yol var: ürün tipi, yıllık adet ve pazar üzerinden anlatmak. 'Kuzey Avrupa'ya çalışan bir perakende zinciri için yıllık şu kadar adet örme üst grubu' cümlesi, marka adı olmadan da alıcıya ölçünüzü verir.",
        },
        {
          q: "Kapasitemizi ve minimum sipariş adedimizi siteye yazmalı mıyız?",
          a: "Yazmanızı öneriyoruz, dürüst gerekçesiyle birlikte: yazmayan firmalar daha çok talep alıyor ama talebin büyük kısmı boşa gidiyor. 300 adetlik bir koleksiyonla gelen girişimciyle 30.000 adetlik bir zincir aynı formu dolduruyor ve ikisine de vakit harcıyorsunuz. Minimum adet, çalıştığınız ürün grupları ve numune süresi yazıldığında uygun olmayan talep baştan eleniyor.",
        },
        {
          q: "Teklif formuna teknik dosya yüklenebilir mi?",
          a: "Evet, doğru kurgu da budur. Alıcı ölçü tablosunu, teknik dosyayı ve görsellerini forma ekleyebilir; PDF, Excel ve görsel formatlarını kabul eder, büyük dosyalar için bağlantı alanı bırakırız. Gelen her talep hem mailinize düşer hem panelde kayıtlı kalır, böylece fuar dönüşü biriken talepler kimin gelen kutusunda kaldığına bağlı olmaz.",
        },
        {
          q: "Sertifikalarımızı sitede nasıl gösteriyoruz?",
          a: "Belge adı, kapsamı ve geçerlilik tarihiyle birlikte tek bir sayfada gösteriyoruz. Tarihi görünen sertifika, tarihi görünmeyenden daha güçlüdür; buna karşılık süresi geçmiş bir belgenin sitede durması ters teper. O yüzden belgeleri panelden kendiniz güncelleyebileceğiniz bir yapı kurar, yenileme zamanı geldiğinde hangi alanı değiştireceğinizi teslimde gösteririz.",
        },
        {
          q: "Almanca veya başka bir dil ekleyebilir miyiz?",
          a: "Ekleyebiliriz, ama sıralamayı doğru kurmak gerekiyor. İhracatta ortak dil İngilizce olduğu için önce onun düzgün olması gerekir; ikinci dil ancak o pazarda gerçekten bir satış çabanız varsa değer üretir. Her dil ayrıca bakım demek: fiyat, kapasite ya da sertifika değiştiğinde iki değil üç yerde güncellemek gerekir. Hangi pazarın buna değdiğini birlikte konuşuyoruz.",
        },
        {
          q: "Google'da yurt dışından bulunabilir miyiz?",
          a: "Kısmen, ve beklentiyi baştan doğru kurmak istiyoruz. 'Clothing manufacturer Turkey' gibi genel aramalar çok rekabetli; oraya oynamak yıllar süren bir iştir. Buna karşılık ürün ve yöntem birleşimiyle yapılan dar aramalarda, örneğin belirli bir örgü tipi ya da ürün grubu ile birlikte arandığınızda görünmek gerçekçi. Sitenin bu sektördeki asıl işi ise arama değil doğrulamadır: fuardan, aracıdan ve LinkedIn'den gelen alıcı adınızı arattığında karşısına çıkan sayfa.",
        },
        {
          q: "B2B platformlarında zaten varız, siteye gerek var mı?",
          a: "Platformlar sizi listeler ama sizi anlatmaz; orada onlarca benzer firmayla yan yana, çoğunlukla fiyat üzerinden kıyaslanırsınız. Kapasitenizi, hangi işi fabrika içinde yaptığınızı ve neden sizinle çalışılması gerektiğini anlatacak yeriniz olmaz. İkisi birlikte çalışır: platform ilk teması getirir, kendi siteniz alıcının kararını verdiği yerdir.",
        },
      ],
      ctaTitle: "Fabrikanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "İhracatta ilk temas nadiren sitede olur. Alıcı sizi fuarda, bir aracıyla ya da LinkedIn'de tanır; kartvizit cebe girer. Kararın verildiği an ise akşam otel odasında veya birkaç hafta sonra merkez ofiste, firma adınızın yazıldığı arama kutusudur. O ekranda hangi ürün gruplarında çalıştığınızı, aylık kapasitenizi ve numuneyi kaç günde çıkardığınızı bulamayan alıcı sizi elemek için sebep aramaz; sadece listedeki bir sonraki isme geçer.",
          "İkinci kayıp dilde yaşanır. Üretici sitelerinin çoğunda İngilizce, çeviri motorundan geçmiş haliyle duruyor: cümleler kurulmuş ama alıcının aradığı başlıklar hiçbir yerde geçmiyor. Minimum sipariş adedi, numune süresi, teslim şekli, kumaşı kimin temin ettiği, hangi işlemlerin fabrika içinde hangilerinin dışarıda yapıldığı. Alıcı bunu okuduğunda dikiş kalitenize dair bir yargıya varmaz belki, ama yazışmayı, teknik dosyayı ve termini takip edebilecek bir firmayla mı konuştuğuna dair bir yargıya varır.",
          "Üçüncüsü, satın alma tarafının tek kişi olmamasıdır. Ürünü beğenen kişiyle şirketin uyum ekibi aynı kişi değildir; sertifikalarınız, denetim raporlarınız ve çalışma koşullarınıza dair anlattığınız her şey ayrı bir gözle okunur. Bunlar yazılı değilse süreç, birinin size mail atıp belge istemesine kalır ve o mail çoğu zaman hiç yazılmaz. Kendi siteniz olmadığında elinizde bir fuar standı, birkaç aracı ve yalnızca fiyat üzerinden kıyaslandığınız platform listeleri kalır; kime ne ürettiğinizi kendi cümlelerinizle anlatacağınız yer hiçbir yerde yoktur.",
        ],
      },
      pricing: {
        title: "Tekstil & Fason Konfeksiyon Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Fabrika tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Üretim yetkinlikleri, kapasite ve makine parkı, sertifikalar, fabrika galerisi ve iletişim. Türkçe-İngilizce iki dilli. Fuardan ve LinkedIn'den gelen alıcıyı karşılamak için yeterli.",
          },
          {
            name: "Teklif toplayan üretici sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Ürün gruplarına ayrılmış üretim sayfaları, teknik dosya yüklemeli teklif formu, indirilebilir kapasite dosyası, sürdürülebilirlik ve denetim bölümü, arama için hazırlanmış İngilizce metinler.",
          },
          {
            name: "Alıcı paneli & numune takibi",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Alıcıya özel giriş, numune ve sipariş aşamalarının takibi, üretim fotoğraflarının paylaşımı, dosya arşivi ve mevcut sisteminizle bağlantı. Aynı anda çok sayıda modelle çalışan üreticiler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi ürün gruplarında çalıştığınızı, hedef pazarınızı, kapasitenizi ve minimum sipariş adedinizi konuşuruz. Kumaşı kendi temin eden bir üreticiyle yalnızca dikim yapan bir atölyenin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Kapasite dosyası ve içerik",
            body: "Makine listesi, hat ve kapasite bilgileri, sertifikalar ve varsa denetim raporları toplanır. Fabrikanın, numune odasının ve üretim hattının nasıl çekileceğini anlatan bir liste gönderiyoruz; elinizde uygun kare yoksa birlikte plan yaparız.",
          },
          {
            name: "Tasarım ve İngilizce metin",
            body: "Önce ana sayfayı görürsünüz. Aynı aşamada İngilizce metni sektör terimleriyle yazar, ihracat yazışmalarını yürüten kişinizle satır satır geçeriz. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve arama motoru kayıtları dahil yayına alırız; sitenin yurt dışından da hızlı açıldığını ölçerek teslim ederiz. Ürün gruplarını ve sertifikaları güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Tekstil & Fason Konfeksiyon Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "İngilizce sürüm yazılmış mı, çevrilmiş mi?",
            body: "Teklif veren ajanstan İngilizce metni kimin yazacağını sorun. 'Çeviriyoruz' cevabı geliyorsa, alıcının aradığı teknik başlıkların metne girmeyeceğini baştan bilin.",
          },
          {
            title: "Kapasite ve termin bilgisi sayfada var mı?",
            body: "Aylık adet, hat sayısı, minimum sipariş ve numune süresi yazılı değilse site bir tanıtım broşürüdür, teklif toplayan bir araç değil.",
          },
          {
            title: "Teklif formu dosya kabul ediyor mu?",
            body: "Alıcı ölçü tablosunu ve teknik dosyasını yükleyemiyorsa süreç yine maile döner. Formun dosya aldığından ve gelen taleplerin bir yerde kayıtlı kaldığından emin olun.",
          },
          {
            title: "Sertifikaları kendiniz güncelleyebiliyor musunuz?",
            body: "Belgeler her yıl yenileniyor. Her güncelleme için ajansa haber vermek zorundaysanız sitede kısa sürede süresi geçmiş bir sertifika durur ve bu, olmamasından kötüdür.",
          },
          {
            title: "Fotoğraflar sizin fabrikanızdan mı?",
            body: "Stok üretim görselleri bu sektörde anında belli oluyor. Alıcı kendi ürününün dikileceği hattı görmek ister; kendi hattınızın ve numune odanızın çekilmesi bu işin en değerli yatırımıdır.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının firmanız adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Textile & Garment Manufacturer Website",
      metaDescription:
        "Websites for Turkish textile and CMT garment manufacturers that export. Show capacity and certifications, collect RFQs with tech packs. Get a free quote.",
      eyebrow: "For Textile Manufacturers",
      h1: "Textile & Garment Manufacturer Website",
      intro:
        "The buyer you handed a card to at the fair opens your site that evening. If your capacity, your certifications and your sample lead time aren't there, they move to the next name on the list. Forpus builds sites for exporting textile and garment manufacturers, in English that reads like the industry.",
      shortAnswer: {
        title:
          "What does a textile manufacturer website include, and what does it cost?",
        body: "A textile or garment manufacturer website is your own address for proving capacity, machinery and certifications to a foreign buyer. A typical manufacturer site Forpus builds carries a bilingual structure with English as the primary language, production pages split by product group, a capacity table covering monthly output, lines and machine park, a certifications page showing BSCI, Sedex, OEKO-TEX and GOTS with their validity dates, a sample and quotation form that accepts tech pack uploads, a factory tour video with real production photography, and a downloadable capacity profile. A site presenting the factory and its capabilities runs ₺50,000–85,000 and goes live in one to two weeks. A full site with separate product-group pages and a working file-upload RFQ form runs ₺90,000–150,000 over two to four weeks. A buyer portal with sample and order tracking starts at ₺220,000. Client brand names appear only as far as your NDAs allow; where they cannot, the work is described by product type and quantity.",
      },
      benefits: [
        {
          title: "Capacity you can prove",
          body: "Monthly output, line count and machine park on the page, so a buyer sees your scale before asking for a sample.",
        },
        {
          title: "Written in the buyer's language",
          body: "An English version written with the industry's own terms tells a buyer they are dealing with a factory used to exporting.",
        },
        {
          title: "RFQs with files attached",
          body: "Let buyers upload the tech pack, quantity and delivery date they need, so quoting starts before the email thread does.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Production pages by product group",
        "Capacity, lines and machine park table",
        "Certifications and audit page",
        "RFQ form with tech pack upload",
        "Factory tour video and production gallery",
        "English-first bilingual structure",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Do you write the English yourself?",
          a: "Yes, and in this sector it is the part that decides everything. We do not push the Turkish through a translation engine; cutting, sewing, washing, knitting and weaving are written the way the trade writes them. We agree the terminology up front with whoever handles your export correspondence and have them read the copy before it goes live.",
        },
        {
          q: "Can we name the brands we produce for?",
          a: "That depends entirely on the NDAs you have signed, and the call has to be yours. Where you cannot name a brand, there is a way that still works: describe the work by product type, annual quantity and market. A line like 'annual volume of knit tops for a Northern European retail chain' gives the buyer your scale without naming anyone.",
        },
        {
          q: "Should we publish our capacity and minimum order quantity?",
          a: "We recommend it, for an honest reason: factories that hide these numbers get more enquiries but waste most of them. A designer with a 300-piece collection and a chain with a 30,000-piece programme fill in the same form, and you spend time on both. Publishing your MOQ, your product groups and your sample lead time filters out the wrong enquiry before it reaches you.",
        },
        {
          q: "Can buyers upload a tech pack through the form?",
          a: "Yes, and that is the right setup. Buyers can attach measurement sheets, tech packs and reference images; the form takes PDF, Excel and image files, with a link field for anything too large. Every enquiry lands in your inbox and stays recorded in the panel, so the pile that builds up after a fair does not live in one person's mailbox.",
        },
        {
          q: "How do we show our certifications?",
          a: "On a single page, with the scope and validity date next to each certificate. A dated certificate is stronger than an undated one, but an expired certificate sitting on the site works against you. So we build it for you to update yourself, and show you which field to change when renewal comes around.",
        },
        {
          q: "Can you get us found on Google abroad?",
          a: "Partly, and we would rather set the expectation correctly. Broad searches like 'clothing manufacturer Turkey' are extremely competitive and take years to move. Narrow searches that combine a product group with a technique are realistic. In this sector the site's real job is verification, not discovery: it is the page a buyer from a fair, an agent or LinkedIn finds when they search your company name.",
        },
      ],
      ctaTitle: "Let's build a site for your factory",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "kuyumcu",
    image: "/generated/personas/kuyumcu.webp",
    service: "web",
    slug: { tr: "kuyumcu-web-sitesi", en: "jewelry-store-website" },
    tr: {
      metaTitle: "Kuyumcu & Mücevher Web Sitesi",
      metaDescription:
        "Kuyumcu, sarraf ve mücevher atölyelerine özel web sitesi. Canlı altın kuruna bağlı ürün kataloğu, alyans bölümü ve özel tasarım randevusu. Ücretsiz teklif alın.",
      eyebrow: "Kuyumcuya Özel",
      h1: "Kuyumcu & Mücevher Web Sitesi",
      intro:
        "Alyans bakan çift dükkâna girmeden haftalar önce ekranda geziniyor: modeller, ayar, gram, taş ve fiyat. Koleksiyonunuzu düzgün gösteren, rakamı güncel kura bağlayan ve müşteriyi randevuyla vitrine getiren bir site, o gezinmeyi sizin dükkânınızda bitirir. Forpus kuyumcular, sarraflar ve mücevher atölyeleri için site kuruyor.",
      shortAnswer: {
        title: "Kuyumcu web sitesi ne içerir, ne kadar tutar?",
        body: "Kuyumcu web sitesi, koleksiyonunuzu gösterdiğiniz, alyans ve özel tasarım taleplerini topladığınız ve dükkâna randevuyla müşteri getirdiğiniz kendi adresinizdir. Forpus'un kurduğu tipik bir kuyumcu sitesinde alyans, tektaş, set ve günlük takı gibi ayrılmış koleksiyon sayfaları, ayar, gram ve taş bilgisinin göründüğü ürün kartları, canlı gram altın kuruna bağlanabilen fiyat gösterimi, özel tasarım ve alyans provası için randevu formu, tamir ile tadilat talep formu, vitrin ve atölye galerisi, Google harita bağlantısı ve mobil uyumlu hızlı bir tasarım bulunur. Koleksiyonu ve dükkânı anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Ürün kataloğunun, randevu ve özel tasarım formlarının çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Canlı kura bağlı fiyatlandırma, stok yönetimi ve online satış işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Katalog stok görselle değil kendi ürünlerinizin çekimiyle kurulur; tedarikçi kataloğundan alınmış kare aynı anda yüzlerce sitede duruyor. Alan adı ve site sizin adınıza kaydedilir; koleksiyonu, işçilik bantlarını ve kuru panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Koleksiyon vitrini",
          body: "Alyans, tektaş ve özel tasarımlarınızı ayar, gram ve taş bilgisiyle gösterin; müşteri dükkâna kararını yarılamış gelsin.",
        },
        {
          title: "Provaya randevu",
          body: "Alyans provasını ve özel tasarım görüşmesini siteden alın; çiftin geleceği saat de ne istediği de baştan belli olsun.",
        },
        {
          title: "Google'da bulunun",
          body: "'Yakınımdaki kuyumcu' ve 'alyans modelleri' aramalarında haritada ve arama sonuçlarında görünün.",
        },
      ],
      featuresTitle: "Kuyumcu & Mücevher sitenizde neler olur?",
      features: [
        "Koleksiyon sayfaları (alyans, tektaş, set)",
        "Ayar, gram ve taş bilgili ürün kartları",
        "Canlı gram altın kuruna bağlı fiyat",
        "Özel tasarım ve prova randevu formu",
        "Tamir, tadilat ve ölçü talebi",
        "Google harita, çalışma saatleri, WhatsApp",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Ürün fiyatlarını canlı altın kuruna bağlayabilir misiniz?",
          a: "Evet. Gram altın kurunu bir veri kaynağından çeker, ürünün gram ve ayar bilgisiyle hesaplar, işçiliği ekleyip ekranda gösteririz. Kuru kendi bildiğiniz rakamdan yürütmek isterseniz panelden tek alandan günlük güncellenen bir yapı da kurarız; birçok kuyumcu bunu tercih ediyor. Hangi yöntemi seçerseniz seçin, ekrana 'bugünkü kura göre' notunu düşeriz ki rakam bağlayıcı bir teklif gibi okunmasın.",
        },
        {
          q: "Siteden online satış yapmalı mıyım?",
          a: "Her kuyumcu için doğru cevap evet değil. Satışınızın büyük kısmı vitrinde ve elle deneyerek oluyorsa, kataloğun ve randevunun iyi çalıştığı bir site çoğu zaman daha çok iş getiriyor. Online satışa geçmek kargo ve sigorta, ETBİS kaydı, mesafeli satış metinleri ve iade kurgusu demek; ayrıca fiyatı piyasa dalgalanmasına bağlı ürünlerde cayma hakkı istisnası gündeme geliyor. Bu metinleri hukukçunuzla birlikte yazmanızı öneriyoruz, altyapıyı biz kurarız.",
        },
        {
          q: "Alyans için ayrı bir bölüm şart mı?",
          a: "Şart değil ama bu sektörde en çok iş getiren bölüm orası. Alyans arayan çift aylar öncesinden ve çok özel şeyler arayarak geziyor: klasik mi bombeli mi, kaç gram, taşlı mı, ölçü nasıl alınıyor, ne kadar sürede teslim. Bunları ayrı bir bölümde toplayınca hem çift aradığını buluyor hem de Google sizi 'alyans' aramalarında ayrıca gösterebiliyor.",
        },
        {
          q: "Özel tasarım taleplerini siteden toplayabilir miyiz?",
          a: "Evet ve bu formu boş bir 'mesajınız' kutusu olarak kurmuyoruz. Taş tercihi, ayar, bütçe bandı, parmak ölçüsü, teslim edilmesi gereken tarih ve referans görsel yükleme alanı olur. Böylece atölyeye geçmeden önce elinizde konuşulacak somut bir bilgi oluyor ve ilk görüşme fikir toplama değil, fiyat konuşması oluyor.",
        },
        {
          q: "Ürün fotoğraflarını nasıl çözüyoruz?",
          a: "Bu işin en kritik kalemi burası. Altın ve taş, ışığı doğru kurmadığınızda ekranda ucuz görünüyor; bu yüzden ya deneyimli bir çekim öneriyoruz ya da kendi çekiminiz için ışık ve zemin listesi gönderiyoruz. Tedarikçi kataloğundan alınan görselleri kullanmıyoruz: aynı kare rakiplerinizin sitesinde de duruyor ve müşteri bunu fark ediyor.",
        },
        {
          q: "Tamir ve restorasyon işlerimin öncesi-sonrasını yayınlayabilir miyim?",
          a: "Evet, bu alanda reklam ve tanıtım kısıtı yok; öncesi-sonrası karesi, müşteri yorumu ve kampanya duyurusu serbestçe yayınlanabiliyor. Eski bir yüzüğün ya da miras bir kolyenin önce-sonra karesi, atölye kabiliyetinizi anlatan en güçlü kanıt oluyor. Yalnızca kişiye özel, duygusal değeri olan parçalarda sahibinin onayını almanızı öneririz; bu hukuki bir zorunluluk değil, ilişki gereğidir.",
        },
        {
          q: "Hurda altın alımı ve sarrafiye için ayrı bir sayfa gerekir mi?",
          a: "Bu işi yapıyorsanız gerekir, çünkü onu arayan kişi takı arayan kişiden bambaşka bir niyetle geliyor ve koleksiyon sayfalarında kaybolur. Ayrı bir sayfada nasıl ölçüm yaptığınızı, hangi ayarları aldığınızı ve işlemin dükkânda nasıl yürüdüğünü anlatırız. Alım fiyatı yazmak yerine güncel kura ve ölçüme bağlı olduğunu belirtmek daha doğru; rakam gün içinde değişiyor.",
        },
        {
          q: "Google Haritalar'da öne çıkmama yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. Google İşletme Profilinizi kurar veya düzenler, kategori ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Yetki belgesi ve sertifika bilgilerini sitede göstermeli miyim?",
          a: "Göstermenizi öneriyoruz. Kuyum ticareti yetki belgeniz, çalıştığınız yıl sayısı, sertifikalı taşlarda hangi laboratuvarın raporunu verdiğiniz ve tamir-değişim şartlarınız, ziyaretçinin en çok tereddüt ettiği yerleri kapatıyor. Bunları sitenin bir köşesine gömmek yerine, ürün sayfasından da görünen sade bir güven bölümünde toplarız.",
        },
      ],
      ctaTitle: "Dükkânınız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Kuyumcu alışverişi ekranda başlıyor. Nişanlanan çift dükkâna girmeden haftalar önce model geziyor, ayar ile milyemin ne demek olduğunu okuyor, taşın karatına ve kesimine bakıyor, iki üç dükkânı kafasında sıraya koyuyor. Koleksiyonunuz o gezinmede görünmüyorsa listeye hiç girmiyorsunuz; müşteri dükkâna kararının yarısını başka bir yerde vermiş olarak geliyor.",
          "İkinci kırılma fiyatta oluyor. Altın günlük, hatta gün içinde değişiyor; sabit bir fiyat listesi bir günde yanlış hale geliyor ve yanlış fiyat, güveni fiyatın kendisinden çok daha fazla yıpratıyor. Hiç rakam yazmamak da çözüm değil, çünkü bir aralık göremeyen ziyaretçi çoğu zaman sormaya bile geçmiyor. Doğru kurgu ikisinin ortasında: ürünün gramı, ayarı ve işçiliği görünsün, rakam güncel kura bağlansın.",
          "Üçüncüsü güven. Burada satılan şey pahalı, geri dönüşü zor ve çoğu zaman duygusal bir alışveriş. Müşteri kaç yıldır bu işi yaptığınızı, taşın sertifikalı olup olmadığını, tamir ve tadilatta neyi taahhüt ettiğinizi, değişim şartlarınızı bilmek istiyor. Instagram bunların hiçbirini düzenli tutamıyor: akış eskidikçe kare kayboluyor, koleksiyon ırka değil modele göre bile süzülemiyor ve profil haritada çıkmıyor. Kendi siteniz olmadığında elinizde vitrinin fotoğrafı ve haritadaki birkaç yorum kalıyor.",
        ],
      },
      pricing: {
        title: "Kuyumcu & Mücevher Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Koleksiyon tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Koleksiyon sayfaları, vitrin ve atölye galerisi, hizmetler (tamir, tadilat, özel tasarım), harita ve çalışma saatleri, tek tık WhatsApp. Tek dükkânlı kuyumcular için yeterli.",
          },
          {
            name: "Katalog & randevu sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Ayar, gram ve taşa göre süzülebilen ürün kataloğu, ayrı alyans bölümü, özel tasarım ve prova randevu formları, canlı gram altın göstergesi ve kampanya alanı. Aramadan gelen müşteriyi dükkâna getirmek isteyenler için.",
          },
          {
            name: "Fiyatlı katalog & online satış",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Canlı kura bağlı fiyatlandırma, stok ve varyant yönetimi, sepet ve ödeme, kargo ile sigorta akışı, müşteri kaydı ve sipariş takibi. Şubeli ya da online satışa geçen kuyumcular için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Ne sattığınızı ve dükkâna kimin geldiğini konuşuruz. Alyansta yoğunlaşan bir kuyumcuyla hurda altın ve sarrafiye ağırlıklı bir dükkânın sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Ürün çekimi ve içerik",
            body: "Bu sektörde site fotoğrafla ayakta duruyor, o yüzden en çok emek buraya gidiyor. Işık, zemin ve açı için bir çekim listesi gönderiyoruz; elinizde uygun kare yoksa çekim planını birlikte yaparız. Ayar, gram, taş ve işçilik bilgileri için de doldurmanız kolay bir şablon veriyoruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi vitrinin ağırlığını ekrana taşımak: koyu bir zemin, sakin bir düzen ve öne çıkan tek şey olarak ürün. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Koleksiyonu, kampanyayı ve kuru kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Kuyumcu & Mücevher Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Ürün fotoğrafları gerçekten sizin mi?",
            body: "Tedarikçi kataloğundan gelen görseller aynı anda onlarca sitede duruyor ve müşteri bunu fark ediyor. Teklif veren ajans 'görsel bizde' diyorsa neyi kastettiğini net sorun.",
          },
          {
            title: "Kur ve fiyatlar sizin elinizde mi?",
            body: "Altın gün içinde değişiyor; her güncelleme için ajansa haber vermek zorundaysanız site bir günde yanlış rakam gösterir. Kuru ya otomatik çeken ya da panelden tek alandan güncellenen bir yapı isteyin.",
          },
          {
            title: "Koleksiyonu kendiniz ekleyip çıkarabiliyor musunuz?",
            body: "Yeni gelen modeli aynı gün yayına almak, satılanı kaldırmak sizin elinizde olmalı. Bunu yapamayan bir katalog birkaç ay içinde vitrininizle uyuşmayı bırakır.",
          },
          {
            title: "Randevu ve talep formları nereye düşüyor?",
            body: "Özel tasarım ve prova talepleri sadece bir e-posta kutusuna gidiyorsa kaçırılıyor demektir. Formun WhatsApp'a ya da telefonunuza bildirim düşürdüğünden emin olun.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Yüksek çözünürlüklü ürün fotoğrafları doğru işlenmediğinde site telefonda ağırlaşıyor ve ziyaretçinin çoğu telefondan geliyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının işletmeniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Jewellery Store & Goldsmith Website",
      metaDescription:
        "Websites for jewellery stores and goldsmiths: a catalogue tied to the live gold rate, a wedding band section and design appointments. Get a free quote.",
      eyebrow: "For Jewellers",
      h1: "Jewellery Store & Goldsmith Website",
      intro:
        "A couple looking for wedding bands spends weeks on a screen before they walk into a store: models, karat, weight, stones and price. A site that shows your collection properly, ties the figure to today's gold rate and books the fitting turns that browsing into a visit. Forpus builds sites for jewellery stores, goldsmiths and bespoke workshops.",
      shortAnswer: {
        title:
          "What does a jewellery store website include, and what does it cost?",
        body: "A jewellery store website is your own address for showing the collection, collecting wedding band and bespoke design requests, and bringing customers into the store by appointment. A typical site Forpus builds carries collection pages split by category, product cards showing karat, weight and stone details, prices that can be tied to the live gram gold rate, an appointment form for fittings and bespoke consultations, a repair and resizing request form, a gallery of the window and the workshop, a Google Maps link and a fast mobile-first design. A presentation site covering the collection and the store runs ₺50,000–85,000 and goes live in one to two weeks. A full site with a working catalogue and appointment forms runs ₺90,000–150,000 over two to four weeks. Once live-rate pricing, stock management and online sales are involved, you are looking at a project starting from ₺220,000. The catalogue is built from photographs of your own pieces, never supplier stock images that sit on a hundred other sites.",
      },
      benefits: [
        {
          title: "A proper collection window",
          body: "Show wedding bands, solitaires and bespoke work with karat, weight and stone details so customers arrive half-decided.",
        },
        {
          title: "Fittings by appointment",
          body: "Take fitting and bespoke consultation bookings from the site, so you know who is coming, when and what for.",
        },
        {
          title: "Get found on Google",
          body: "Show up on the map and in search for 'jeweller near me' and wedding band queries.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Collection pages (bands, solitaires, sets)",
        "Product cards with karat, weight and stone",
        "Prices tied to the live gold rate",
        "Bespoke design and fitting appointments",
        "Repair, resizing and sizing requests",
        "Google Maps, opening hours, WhatsApp",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you tie prices to the live gold rate?",
          a: "Yes. We pull the gram gold rate from a data source, calculate against each piece's weight and karat, add your workmanship and show the figure on screen. If you would rather run your own rate, we build a panel where you update it from a single field each day. Either way we label it as today's rate so it does not read as a binding offer.",
        },
        {
          q: "Should I sell online?",
          a: "Not every jeweller should. If most of your sales happen at the counter with pieces tried on, a strong catalogue and a booking flow usually bring in more work. Going online means shipping and insurance, distance-selling terms and a return policy — and pieces priced off a fluctuating market raise their own withdrawal-right questions. Write those terms with your lawyer; we build the infrastructure.",
        },
        {
          q: "Do we need a separate wedding band section?",
          a: "Not required, but it is the section that brings in the most work. Couples search months ahead with very specific questions: classic or domed, what weight, stones or not, how sizing works, how long delivery takes. A dedicated section answers them and lets Google show you for those searches separately.",
        },
        {
          q: "Can we collect bespoke design requests through the site?",
          a: "Yes, and we do not build it as an empty message box. The form asks for stone preference, karat, budget band, ring size, the date the piece is needed and a reference image upload. You start the first conversation with real information instead of gathering it from scratch.",
        },
        {
          q: "How do we handle product photography?",
          a: "This is the make-or-break item. Gold and stones look cheap on screen when the light is wrong, so we either recommend a proper shoot or send you a lighting and surface list for your own. We do not use supplier catalogue images — the same frame sits on your competitors' sites and customers notice.",
        },
        {
          q: "Can we publish reviews, campaigns and before-and-after repairs?",
          a: "Yes, there are no advertising restrictions in this trade. Customer reviews, campaign announcements and before-and-after shots of restoration work can all be published, and the restoration frames are the strongest proof of what your workshop can do.",
        },
      ],
      ctaTitle: "Let's build a site for your store",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "yurt",
    image: "/generated/personas/yurt.webp",
    service: "web",
    slug: { tr: "ogrenci-yurdu-web-sitesi", en: "student-dormitory-website" },
    tr: {
      metaTitle: "Özel Öğrenci Yurdu & Apart Web Sitesi",
      metaDescription:
        "Özel öğrenci yurdu ve apartlara özel web sitesi. Oda tipleri, sanal tur ve online ön kayıt. Veliye güven veren, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Öğrenci Yurduna Özel",
      h1: "Özel Öğrenci Yurdu & Apart Web Sitesi",
      intro:
        "Kayıt kararını çoğu zaman başka bir şehirdeki veli, telefonundan bakarak veriyor. Odaları, ücrete dahil olanları ve güvenlik düzenini gösteren, ön kaydı oracıkta alan bir site o kararı sizin lehinize çevirir. Forpus özel öğrenci yurtları ve apartlar için site kuruyor.",
      shortAnswer: {
        title: "Öğrenci yurdu web sitesi ne içerir, ne kadar tutar?",
        body: "Öğrenci yurdu web sitesi, odalarınızı ve ücrete neyin dahil olduğunu gösterdiğiniz, veliden ön kayıt topladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir yurt sitesinde oda tiplerine göre ayrılmış konaklama sayfaları, gerçek oda, etüt ve yemekhane fotoğraflarıyla kurulan bir galeri, 360 derece sanal tur, dönemlik ücret ve dahil olan kalemler tablosu, ön kayıt ile yurt gezisi randevu formu, kampüse mesafe ve ulaşım haritası, güvenlik ve giriş-çıkış kuralları, kurum bilgileri, veliye ayrılmış bir sık sorulanlar bölümü ve mobil uyumlu hızlı bir tasarım bulunur. Yurdu ve şartları anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Ön kayıt formunun, sanal turun ve oda tipi sayfalarının çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Yatak bazlı doluluk takibi ve kayıt paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Talep yerleştirme sonuçlarının ardından birkaç haftaya sıkıştığı için teslim tarihi o döneme göre geriye doğru planlanır. Alan adı ve site sizin adınıza kaydedilir; ücreti ve boş oda bilgisini panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Online ön kayıt",
          body: "Veli oda tipini seçip yer ayırtsın; kayıt dönemini telefon başında değil, panelde biriken listeyle yönetin.",
        },
        {
          title: "Görünce güvenen veli",
          body: "Odaları, etüt salonunu ve yemekhaneyi sanal turla gösterin; başka şehirdeki aile yola çıkmadan karar versin.",
        },
        {
          title: "Google'da bulunun",
          body: "'Kız öğrenci yurdu' gibi şehir ve üniversite adıyla yapılan aramalarda haritada ve listede görünün.",
        },
      ],
      featuresTitle: "Özel Öğrenci Yurdu & Apart sitenizde neler olur?",
      features: [
        "Oda tipi ve ücret sayfaları",
        "360° sanal tur ve gerçek fotoğraf galerisi",
        "Online ön kayıt ve yer ayırtma formu",
        "Ücrete dahil olanlar ve ödeme planı",
        "Kampüse mesafe, ulaşım ve harita",
        "Veli için kurallar ve güvenlik bölümü",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Online ön kayıt formu kurar mısınız?",
          a: "Evet. Basit bir 'yer ayırtmak istiyorum' formundan; öğrencinin üniversitesini, bölümünü, istediği oda tipini, dönemi ve veli iletişimini alan, panelinizde biriken tam bir ön kayıt akışına kadar ihtiyacınıza göre kurarız. Küçük apartlarda form artı WhatsApp yönlendirmesi yetiyor; kapasite büyüdükçe ön kayıtların tek yerde toplanması ve durumunun işaretlenebilmesi gerekiyor.",
        },
        {
          q: "Sanal tur gerçekten işe yarıyor mu?",
          a: "Bu sektörde en çok işe yarayan içeriklerden biri, çünkü ailelerin önemli bir kısmı başka şehirden bakıyor ve gelmeden karar vermek zorunda kalıyor. 360 derece tur ya da odaların düzgün çekilmiş bir video turu, telefonda anlatmaya çalıştığınız her şeyi tek seferde anlatıyor. Dürüst uyarı: tur ancak gerçeği gösterirse işe yarar. Dağınıkken ya da yıllar önce çekilmiş bir tur, hiç tur olmamasından daha kötü sonuç veriyor.",
        },
        {
          q: "Boş oda bilgisini sitede gösterebilir miyiz?",
          a: "Evet, iki şekilde kurabiliriz. Basiti: her oda tipi için 'yer var / sınırlı / doldu' etiketini panelden siz güncellersiniz. Kapsamlısı: yatak bazlı doluluk takibi kurar, ön kayıt geldikçe sayı otomatik düşer. Çoğu yurt için ilki yeterli, ama kayıt döneminde günde birkaç kez güncellemeniz gerekeceğini baştan söyleyelim; yoksa dolmuş oda için telefon almaya devam edersiniz.",
        },
        {
          q: "Ücreti siteye yazmalı mıyım?",
          a: "Yazmanızı öneriyoruz. Ücreti gizleyen yurtlar kayıt döneminde telefonu yalnızca fiyat sormak için arayan yüzlerce kişiyle uğraşıyor ve bunların çoğu zaten bütçesi tutmayan aileler oluyor. Dönemlik veya aylık ücreti, depozitoyu ve ücrete neyin dahil olduğunu — yemek, faturalar, internet, temizlik, çamaşırhane — tablo halinde yazdığınızda hem doğru aile arıyor hem de kapıda pazarlık azalıyor. Rakamı sık güncellemek isterseniz o tabloyu panelden kendiniz değiştirirsiniz.",
        },
        {
          q: "Öğrenci yurdu web sitesi ne kadar tutar?",
          a: "Oda tipleri, galeri, ücret bilgisi ve WhatsApp yönlendirmeli bir tanıtım sitesi ₺50.000–85.000 aralığında başlar. Ön kayıt formu, sanal tur ve oda tipi bazlı sayfaları olan tam bir yurt sitesi ₺90.000–150.000 aralığındadır. Yatak bazlı doluluk takibi, ön kayıt yönetimi ve kayıt paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Kız ve erkek yurdumuz ayrı binalarda, nasıl gösteriyoruz?",
          a: "Her bina için ayrı bir sayfa kurarız: kendi galerisi, oda tipleri, ücreti, adresi ve ön kayıt formu. Bunun iki faydası var. Aile aradığı binayı doğrudan bulur, karışıklık olmaz; ayrıca 'kız öğrenci yurdu' ile 'erkek öğrenci yurdu' farklı aramalar olduğu için ikisinde de görünme şansınız artar. Semt ve üniversite adıyla arayanlar için de aynı mantık geçerli.",
        },
        {
          q: "Veli ve öğrenci için ayrı bölüm gerekli mi?",
          a: "Ayrı sayfa şart değil ama içeriği ikiye ayırmak gerekiyor, çünkü iki kişi farklı şeye bakıyor. Öğrenci odayı, interneti, ortak alanları ve kampüse mesafeyi arar; veli güvenliği, giriş-çıkış düzenini, yemeği, temizliği ve ücretin kapsamını sorar. Sayfayı yalnızca birine göre yazarsanız diğeri cevabını bulamadan çıkıyor. Genelde ana sayfada öğrenciyi çeken görselleri, hemen altında veliyi rahatlatan başlıkları ve ayrı bir 'yurt kuralları' sayfasını birlikte kuruyoruz.",
        },
        {
          q: "İzin ve kurum bilgilerini sitede göstermeli miyiz?",
          a: "Öneriyoruz. Bu işletmeler izinle çalışıyor ve denetleniyor; kurum bilgilerinizi, açık adresinizi ve sorumlu yöneticiyi sitede göstermek velinin en çok tereddüt ettiği yeri kapatıyor. Tanıtım tarafında bir kısıt yok: veli ve öğrenci yorumlarını yayınlayabilir, erken kayıt indirimi veya kardeş indirimi duyurabilir, fotoğraf ve video kullanabilirsiniz.",
        },
        {
          q: "Site kayıt dönemine yetişir mi?",
          a: "Bu sektörde teslim tarihi kapsamdan daha önemli, o yüzden işi sonuçların açıklanacağı tarihe göre geriye doğru planlıyoruz. Tanıtım sitesi bir ila iki hafta, ön kayıtlı site iki ila dört hafta sürüyor; fotoğraf ve sanal tur çekimi için ayrıca birkaç gün ayırmak gerekiyor. Sonuçlara az kala gelirseniz kapsamı küçültüp önce yayına alır, geri kalanını dönem içinde tamamlarız — kayıt döneminde eksik bir site, olmayan bir siteden iyidir.",
        },
      ],
      ctaTitle: "Yurdunuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Yurt seçiminde iki kişi var ve ikisi farklı şeye bakıyor. Öğrenci odayı, interneti, ortak alanları ve kampüse yürüme mesafesini merak eder; veli güvenliği, giriş-çıkış düzenini, temizliği, yemeği ve ücretin neyi kapsadığını sorar. Sitede bu iki soru grubundan biri cevapsız kalırsa aile karar veremez, listeye devam eder.",
          "İkinci kırılma zamanlamada yaşanır. Yerleştirme sonuçları açıklandıktan sonra talep birkaç haftaya sıkışır ve aynı hafta içinde yüzlerce aile aynı üç soruyu sorar: yer var mı, ücret ne kadar, gelip görebilir miyiz. O haftalarda sitede ön kayıt ve gezi randevusu formu yoksa bütün trafik telefona ve WhatsApp'a biner; kayıt döneminde cevapsız kalan mesaj doğrudan kaybedilen kayıttır.",
          "Üçüncüsü mesafedir. Ailelerin önemli bir bölümü başka bir şehirden bakıyor ve yurdu gelmeden görmek istiyor. Gerçek oda fotoğrafı, etüt ve yemekhane kareleri, mümkünse bir sanal tur yoksa geriye haritadaki birkaç yorum kalır. Yurdunuzu anlatan yer kendi siteniz olmadığında anlatımı forumlar ve yorum siteleri devralıyor.",
        ],
      },
      pricing: {
        title: "Özel Öğrenci Yurdu & Apart Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Oda tipleri, gerçek fotoğraf galerisi, ücrete dahil olanlar, yurt kuralları, kampüse mesafe ve harita. Tek tık arama ve WhatsApp. Tek binalı yurtlar ve apartlar için yeterli.",
          },
          {
            name: "Ön kayıtlı site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Online ön kayıt ve yurt gezisi randevu formu, oda tipi bazlı sayfalar, 360 derece sanal tur, bina veya şube ayrımı, erken kayıt kampanyası bölümü. Kayıt dönemini siteden yönetmek isteyenler için.",
          },
          {
            name: "Doluluk takibi & kayıt paneli",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Yatak bazlı doluluk takibi, ön kayıtların durum yönetimi, sözleşme ve ödeme takibi, veli bilgilendirme. Birden fazla binası olan, kaydı defterle yönetemeyecek düzeydeki yurtlar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Kapasitenizi, oda tiplerini, kız ve erkek ayrımını, kaç binanız olduğunu, hangi kampüslere yakın olduğunuzu ve kayıt takviminizi konuşuruz. Yüz yataklı bir yurtla on odalı bir apartın sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Fotoğraf ve içerik",
            body: "Bu sektörde site fotoğrafla ayakta duruyor, o yüzden en çok emek buraya gidiyor. Oda, etüt salonu, yemekhane, banyo, ortak alan ve bina girişi için bir çekim listesi gönderiyoruz; sanal tur isteniyorsa çekimi de planlıyoruz. Aynı aşamada ücret tablosunu, dahil olan kalemleri ve yurt kurallarını sizden alıyoruz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi bu sektörde ikili: öğrenciye 'burada kalırım' dedirtmek, veliyi ilk ekranda rahatlatmak. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Ön kayıt formunun nereye düştüğünü gösterir, boş oda ve ücret bilgisini kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız. Teslim tarihini kayıt döneminin öncesine göre planlarız.",
          },
        ],
      },
      checklist: {
        title:
          "Özel Öğrenci Yurdu & Apart Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Oda fotoğrafları gerçek mi?",
            body: "Stok fotoğraf bu sektörde anında belli oluyor ve tersine çalışıyor; veli gerçek odayı göremediği yurdu listeden çıkarıyor. Ajans 'görselleri biz hallederiz' diyorsa neyi kastettiğini sorun. Cevap 'internetten uygun görsel buluruz' ise başka teklife bakın.",
          },
          {
            title: "Ön kayıt formu ne topluyor?",
            body: "Sadece ad ve telefon toplayan bir form, iletişim kutusundan başka bir şey değildir. Formun üniversite, bölüm, oda tipi, dönem ve veli iletişimini alması gerekir; kayıt döneminde bu bilgiler olmadan gelen talebi sıraya koyamazsınız.",
          },
          {
            title: "Ücret ve dahil olan kalemler yazılı mı?",
            body: "Aylık ya da dönemlik ücret, depozito ve ücrete neyin dahil olduğu yazılı değilse aynı konuşma her telefonda baştan tekrar eder, kapıda da beklenti tutmaz. Yemek, faturalar, internet, temizlik ve çamaşırhanenin tek tek yazılmasını isteyin.",
          },
          {
            title: "Boş oda ve ücreti kendiniz güncelleyebiliyor musunuz?",
            body: "Kayıt döneminde doluluk günden güne değişir. Her değişiklik için ajansa haber vermek zorundaysanız site birkaç gün içinde yanlış bilgi verir hale gelir ve dolmuş odalar için telefon almaya devam edersiniz.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Öğrencilerin tamamına yakını, velilerin de çoğu siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan, kendi hattınızla açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının işletmeniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Ön kayıt formuna düşen kayıtların da size ait olduğunu ve dışa aktarılabildiğini baştan netleştirin.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Student Dormitory & Housing Website",
      metaDescription:
        "Websites for private student dormitories and student apartments. Room types, virtual tours and online pre-registration. Built for parents. Get a free quote.",
      eyebrow: "For Student Housing",
      h1: "Student Dormitory & Housing Website",
      intro:
        "The decision is usually made by a parent in another city, looking at a phone. A site that shows the rooms, spells out exactly what the fee covers and takes a pre-registration on the spot turns that decision your way. Forpus builds sites for private student dormitories and student apartments.",
      shortAnswer: {
        title:
          "What does a student dormitory website include, and what does it cost?",
        body: "A student dormitory website is your own address for showing the rooms, explaining what the fee covers and collecting pre-registrations. A typical site we build has room-type pages, a gallery of the real rooms, study hall and dining room, a 360° virtual tour, a fee table listing exactly what is included, a pre-registration form and a visit-booking form, a map with walking distance to campus, the security and curfew rules, and a fast, mobile-friendly design. A presentation site covering rooms and terms starts in the ₺50,000–85,000 band and goes live in one to two weeks. A full site with a working pre-registration form, virtual tour and room-type pages sits in the ₺90,000–150,000 band over two to four weeks. Once bed-level occupancy tracking and a registration panel are involved, you are looking at a project starting from ₺220,000. Demand compresses into a few weeks after placement results, so we plan delivery backwards from that window.",
      },
      benefits: [
        {
          title: "Online pre-registration",
          body: "Let parents pick a room type and hold a place, so registration season runs off a list in your panel instead of your phone.",
        },
        {
          title: "Trust through seeing",
          body: "Show the rooms, the study hall and the dining room with a virtual tour so families can decide before they travel.",
        },
        {
          title: "Be found on Google",
          body: "Show up on the map and in results for city, university and girls'/boys' dormitory searches.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Room-type and fee pages",
        "360° virtual tour and real photo gallery",
        "Online pre-registration and room hold form",
        "What the fee covers and payment plan",
        "Distance to campus, transport and map",
        "Rules and security section for parents",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you build an online pre-registration form?",
          a: "Yes. From a simple 'I'd like to hold a place' form up to a full intake that captures the university, department, room type, term and parent contact and collects everything in your panel. Small apartments do fine with a form plus WhatsApp; as capacity grows you need every pre-registration in one place with a status you can mark.",
        },
        {
          q: "Does a virtual tour actually help?",
          a: "It is one of the highest-value things you can publish here, because many families are looking from another city and have to decide without visiting. A 360° tour, or a properly shot video walkthrough, says in one go what you keep repeating on the phone. Honest warning: it only helps if it shows the truth. A messy or years-old tour performs worse than no tour at all.",
        },
        {
          q: "Can we show room availability on the site?",
          a: "Yes, two ways. The simple one: you set a 'available / limited / full' label per room type from the panel. The thorough one: bed-level occupancy that counts down as pre-registrations arrive. Most dormitories are fine with the first, as long as you accept it needs updating a few times a day during registration season.",
        },
        {
          q: "Should we publish our prices?",
          a: "We recommend it. Dormitories that hide the fee spend registration season on the phone with people who only want the number, most of whom were never within budget. Publishing the term or monthly fee, the deposit and exactly what is included — meals, utilities, internet, cleaning, laundry — brings the right families and cuts the haggling at the door.",
        },
        {
          q: "We have separate buildings for women and men. How do we show that?",
          a: "We build a page per building: its own gallery, room types, fee, address and pre-registration form. Families land directly on the right one, and because 'girls' dormitory' and 'boys' dormitory' are separate searches, you get a shot at both. The same logic applies to neighbourhood and university searches.",
        },
        {
          q: "Will the site be ready for registration season?",
          a: "We plan backwards from the date placement results are announced. A presentation site takes one to two weeks, a site with pre-registration two to four, plus a few days for photography and the virtual tour. If you come to us close to the date, we cut scope, go live first and finish the rest during the season.",
        },
      ],
      ctaTitle: "Let's build a site for your dormitory",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "fizyoterapi",
    image: "/generated/personas/fizyoterapi.webp",
    service: "web",
    slug: { tr: "fizik-tedavi-web-sitesi", en: "physiotherapy-website" },
    tr: {
      metaTitle: "Fizik Tedavi & Rehabilitasyon Merkezi Web Sitesi",
      metaDescription:
        "Fizik tedavi ve rehabilitasyon merkezlerine özel web sitesi. Tedavi alanları, kadro ve cihaz altyapısı, randevu talep formu; mobil uyumlu. Ücretsiz teklif alın.",
      eyebrow: "Fizik Tedaviye Özel",
      h1: "Fizik Tedavi & Rehabilitasyon Merkezi Web Sitesi",
      intro:
        "Ağrıyla yaşayan ya da ameliyattan yeni çıkmış bir hasta, kendisine kimin, hangi programla ve kaç seansta bakacağını bilmek ister. Tedavi alanlarınızı, kadronuzu ve merkezin fiziksel koşullarını anlatan bir site, o kararı telefonda değil ekranda verdirir. Forpus fizik tedavi ve rehabilitasyon merkezleri için site kuruyor.",
      shortAnswer: {
        title: "Fizik tedavi merkezi web sitesi ne içerir, ne kadar tutar?",
        body: "Fizik tedavi ve rehabilitasyon merkezi web sitesi, tedavi alanlarınızı anlattığınız, kadronuzu ve cihaz altyapınızı gösterdiğiniz, randevu talebini topladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir merkez sitesinde ortopedik, nörolojik, sporcu ve pediatrik rehabilitasyon gibi ayrı ayrı açılan tedavi alanı sayfaları, fizyoterapist ve hekim kadrosunun tanıtımı, cihaz ve uygulama envanteri, seans düzeninin nasıl işlediğini anlatan bir bölüm, randevu talep formu ve WhatsApp yönlendirmesi, anlaşmalı kurum bilgisi, otopark ve engelli erişimi dahil ulaşım sayfası, Google harita bağlantısı ve mobil uyumlu hızlı bir tasarım bulunur. Merkezi ve tedavi alanlarını anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Her tedavi alanının ayrı sayfalandığı, randevu talebinin siteden geldiği tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Seans takibi ve hasta paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. İçerik sağlıkta tanıtım mevzuatı çerçevesinde, iyileşme vaadi kurmadan yazılır. Merkeze hasta yönlendiren hekimlerin de baktığı bir adres olduğu için kadro ve cihaz bilgisi eksiksiz durur. Alan adı ve site sizin adınıza kaydedilir.",
      },
      benefits: [
        {
          title: "Tedavi alanınız anlaşılsın",
          body: "Ortopedik, nörolojik, sporcu ve pediatrik rehabilitasyonu ayrı ayrı anlatın; hasta doğru kapıya gelsin.",
        },
        {
          title: "Randevu talebi siteden gelsin",
          body: "Hasta tedavi alanını ve uygun saat aralığını formdan bildirsin; telefon trafiği seans saatinize dağılmasın.",
        },
        {
          title: "Google'da bulunun",
          body: "'Fizik tedavi merkezi' ve semt bazlı aramalarda haritada ve arama sonuçlarında görünün.",
        },
      ],
      featuresTitle:
        "Fizik Tedavi & Rehabilitasyon Merkezi sitenizde neler olur?",
      features: [
        "Tedavi alanı sayfaları (ortopedik, nörolojik, sporcu)",
        "Fizyoterapist ve hekim kadrosu tanıtımı",
        "Cihaz ve uygulama envanteri",
        "Randevu talep formu / WhatsApp yönlendirmesi",
        "Anlaşmalı kurumlar ve ulaşım bilgisi",
        "Mobil uyumlu, erişilebilir, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Sağlıkta tanıtım mevzuatı sitemi nasıl etkiliyor?",
          a: "Fizik tedavi ve rehabilitasyon bir sağlık hizmeti olduğu için site içeriği reklam değil bilgilendirme tarafında kalmak zorunda. Pratikte şu demek: kampanya ve indirim duyurusu, seans ücreti ilanı, hasta yorumu ve değerlendirme puanı, öncesi-sonrası görselleri, 'ağrınızdan kurtulun' türü sonuç vaadi ve 'en iyi merkez' gibi karşılaştırmalı üstünlük iddiası sorun yaratır. Serbest olan taraf ise geniş: tedavi alanlarınızı, uyguladığınız yöntemleri, cihaz altyapınızı, kadronuzun eğitim ve unvan bilgisini, seansın nasıl işlediğini ve çalışma saatlerinizi tarafsız bir dille anlatabilirsiniz. Denetim ve ceza ajansa değil, sağlık kuruluşuna ve mesul müdüre kesiliyor; bedelini meslek mensubu ödüyor. Bu yüzden sınırda gördüğümüz her başlığı size ayrıca söyler, kesin yorum için il sağlık müdürlüğü ve bağlı olduğunuz meslek kuruluşuyla teyitleşmenizi öneririz.",
        },
        {
          q: "Tedavi alanlarını ayrı ayrı sayfalamak gerekli mi?",
          a: "Gerekli, çünkü hasta tek bir 'fizik tedavi' araması yapmıyor. Diz protezi sonrası rehabilitasyon arayanla inme sonrası rehabilitasyon arayan bambaşka şeyler merak ediyor; biri ne zaman yürüyeceğini, diğeri denge ve yürüme terapisinin merkezde olup olmadığını. Ortopedik, nörolojik, sporcu, pediatrik ve kadın sağlığı gibi alanları ayrı sayfalara açtığımızda hem hasta aradığını buluyor hem Google sizi bu aramaların her birinde gösterebiliyor.",
        },
        {
          q: "Online randevu sistemi kurar mısınız?",
          a: "Kurarız ama bu sektörde önerimiz kademeli. Fizik tedavide seans süresi, salon kapasitesi ve cihaz doluluğu birbirine bağlı olduğu için hastanın takvimden doğrudan saat seçmesi çoğu merkezde karışıklık üretiyor. Başlangıç için tedavi alanı, hekim raporu durumu ve tercih edilen zaman aralığı sorulan bir talep formu artı WhatsApp yönlendirmesi daha sağlıklı çalışıyor; siz teyit ederek programa yerleştiriyorsunuz. Seans yoğunluğu elle yönetilemeyecek düzeye geldiğinde takvimli yapıya geçiyoruz.",
        },
        {
          q: "Cihazlarımızı sitede nasıl anlatmalıyız?",
          a: "Cihaz sayfası bu sektörde en çok okunan sayfalardan biri, ama tedavi vaadine döndüğü anda mevzuat sorunu oluyor. Doğru kurgu şu: cihazın adı, hangi tedavi alanında kullanıldığı ve seansın nasıl geçtiği yazılır; 'şu kadar seansta geçer' denmez. ESWT, robotik rehabilitasyon, izokinetik sistem ya da terapi havuzu gibi ayırt edici bir altyapınız varsa bunu ayrı bir sayfaya açmaya değer — yönlendiren hekimin baktığı ilk yerlerden biri burasıdır.",
        },
        {
          q: "SGK ve özel sigorta anlaşmalarını sitede yazabilir miyim?",
          a: "Evet. Anlaşmalı olduğunuz kurumları belirtmek bilgilendirme sayılıyor; bunu ücret ilanıyla karıştırmamak gerekiyor. Hastaların büyük kısmı merkezi ararken ilk bunu soruyor, bu yüzden anlaşmalı kurum listesini gizlemeden, sizin güncelleyebileceğiniz bir sayfada gösteriyoruz. Rapor ve sevk sürecinin nasıl işlediğini anlatan kısa bir açıklama da aynı sayfada duruyor; telefonda en çok tekrarlanan konuşma bu.",
        },
        {
          q: "Evde fizyoterapi hizmeti veriyoruz, siteye nasıl koyalım?",
          a: "Ayrı bir sayfa açıyoruz, çünkü bunu arayan kişi merkeze gelemeyen bir hastanın yakını oluyor ve tamamen farklı sorular soruyor: hangi ilçelere gidiliyor, seans kaç dakika, evde hangi ekipman kullanılıyor, gelen fizyoterapist kim. Bu hizmetin ruhsat ve izin çerçevesi merkez içi tedaviden farklı işlediği için metni sizin izin belgenizin kapsamına göre yazıyoruz; neyi yazabileceğimizi başta netleştiriyoruz.",
        },
        {
          q: "Erişilebilirlik konusunda ne yapıyorsunuz?",
          a: "İki tarafı var. Fiziksel taraf sitede yazılı olmalı: otopark, asansör, giriş rampası, tekerlekli sandalye erişimi, servis varsa güzergâhı. Dijital taraf ise sitenin kendisi — ziyaretçilerin bir kısmı yaşlı ya da hareket kısıtlı olduğu için yazı boyutunu, kontrastı, dokunma alanlarının büyüklüğünü ve klavyeyle gezinmeyi standart olarak gözetiyoruz. Bu sektörde erişilebilirlik süs değil, doğrudan hasta kazandıran bir ayrıntı.",
        },
        {
          q: "Fizik tedavi merkezi web sitesi ne kadar tutar?",
          a: "Tedavi alanlarını, kadroyu ve ulaşımı anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında başlar. Her tedavi alanının ayrı sayfalandığı, randevu talep formlu ve arama motorlarına hazırlanmış bir merkez sitesi ₺90.000–150.000 aralığındadır. Seans takibi, egzersiz programının hastayla paylaşımı ve hasta paneli işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Eski sitede mevzuata takılan hasta yorumu, ücret listesi ya da sonuç vaadi kuran bölümler varsa bunları taşımadan önce ayıklar, hangi bölümü neden çıkardığımızı size yazılı bildiririz.",
        },
      ],
      ctaTitle: "Merkeziniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Fizik tedaviye gelen kişi çoğunlukla bir ortopedi ya da nöroloji hekiminden çıkmış, elinde bir tanı ve bir tedavi önerisiyle geliyor. Aradığı şey artık 'ne olmuş' değil, 'bunu kim, nerede, hangi cihazla ve kaç seansta yapacak'. Tedavi alanları tek bir 'hizmetlerimiz' listesine sıkıştırılmışsa bu sorunun cevabı sitenin hiçbir yerinde yok ve hasta arama sonuçlarındaki bir sonraki merkeze geçiyor.",
          "İkinci kırılma fiziksel koşullarda oluyor. Bu hastaların bir kısmı koltuk değneğiyle, bir kısmı refakatçiyle, bir kısmı tekerlekli sandalyeyle geliyor ve haftada üç gün, iki ay boyunca gelmeyi göze alıyor. Otopark var mı, asansör var mı, giriş basamaklı mı, hangi kurumlarla anlaşmanız var — bunlar sitede yazmadığında telefonda tek tek sorulan, çoğu zaman da sorulmadan vazgeçilen sorulardır.",
          "Üçüncüsü, bu alanda yönlendirmenin ne kadar belirleyici olduğu. Merkezinize hasta gönderen hekim de sizi internetten kontrol ediyor: kadronuzda kim var, hangi cihazlar duruyor, rehabilitasyonun hangi dalında derinsiniz. Sosyal medya bunu taşıyamaz; orada hem içerik sürekli mevzuat sınırında geziniyor hem de kadro ve cihaz bilgisi akışın içinde kayboluyor. Kendi siteniz, hem hastanın hem yönlendiren hekimin baktığı tek kalıcı yer.",
        ],
      },
      pricing: {
        title: "Fizik Tedavi & Rehabilitasyon Merkezi Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Tedavi alanları, kadro, cihaz altyapısı, anlaşmalı kurumlar, ulaşım ve çalışma saatleri tek bir yapıda. Tek tık arama ve WhatsApp. Tedavi çeşidi sınırlı, tek merkezli kuruluşlar için yeterli.",
          },
          {
            name: "Merkez sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Ortopedik, nörolojik, sporcu ve pediatrik rehabilitasyonun ayrı sayfalandığı, randevu talep formlu, cihaz ve erişim sayfaları olan, arama motorlarına hazırlanmış yapı. Hastasının çoğunu aramadan alan merkezler için.",
          },
          {
            name: "Seans takibi & hasta paneli",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Seans ve devam takibi, egzersiz programının hastaya dijital olarak iletilmesi, fizyoterapist bazlı çalışma planı ve yönetim paneli. Birden fazla salon ve geniş kadroyla çalışan merkezler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hangi tedavi alanlarında yoğunlaştığınızı, kadronuzu, cihaz altyapınızı ve hasta profilinizi konuşuruz. Sporcu rehabilitasyonu ağırlıklı bir merkezle nörolojik rehabilitasyon yapan bir merkezin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik ve mevzuat taraması",
            body: "Tedavi alanı metinleri, kadro ve cihaz bilgileri için doldurması kolay bir şablon gönderiyoruz. Gelen metinleri sağlıkta tanıtım çerçevesinden geçirir, sonuç vaadi kuran ifadeleri birlikte yeniden yazarız.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, ağrıyla gelen bir ziyaretçiyi yormadan doğru tedavi alanına götürmek; okunaklı yazı ve büyük dokunma alanları bu yüzden baştan kurulur. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Google Search Console ve İşletme Profili bağlantısı dahil yayına alırız. Kadro, cihaz ve anlaşmalı kurum bilgilerini kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Fizik Tedavi & Rehabilitasyon Merkezi Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Ajans sağlıkta tanıtım kurallarını biliyor mu?",
            body: "Bu alanda mevzuata aykırı bir bölümün bedelini ajans değil, sağlık kuruluşu ve mesul müdür ödüyor. Teklif veren firmaya hasta yorumu ve kampanya bölümü koyup koymayacağını sorun; 'koyarız, herkes koyuyor' diyorsa o teklifi bir kenara ayırın.",
          },
          {
            title: "Tedavi alanları ayrı sayfa mı, tek liste mi?",
            body: "Tek bir 'hizmetlerimiz' sayfasına sıkıştırılmış on tedavi alanı, aramaların hiçbirinde görünmez. Her alanın kendi sayfası olup olmayacağını teklifte yazılı görün.",
          },
          {
            title:
              "Kadro ve cihaz bilgisini kendiniz güncelleyebiliyor musunuz?",
            body: "Fizyoterapist kadrosu değişir, cihaz envanteri büyür. Her değişiklik için ajansa haber vermek zorundaysanız sayfa kısa sürede eskir; yönlendiren hekimin bakacağı bilgi yanlış kalır.",
          },
          {
            title: "Ulaşım ve erişim bilgisi var mı?",
            body: "Otopark, asansör, rampa, tekerlekli sandalye erişimi ve anlaşmalı kurum bilgisi yazılı değilse bu sorular telefonda sorulur; çoğu zaman da sorulmadan başka merkeze geçilir.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Hastaların neredeyse tamamı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının merkeziniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Ajansın kendi hesabına aldığı bir alan adı, ayrılmak istediğinizde sitenizi rehin bırakır.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Physiotherapy & Rehabilitation Centre Website",
      metaDescription:
        "Websites for physiotherapy and rehabilitation centres: treatment areas, clinical team, equipment and appointment requests, built mobile-first.",
      eyebrow: "For Physiotherapy Centres",
      h1: "Physiotherapy & Rehabilitation Website",
      intro:
        "A patient living with pain, or one just out of surgery, wants to know who will treat them, with what programme and over how many sessions. A site that sets out your treatment areas, your clinical team and the practicalities of getting there settles that decision on screen. Forpus builds sites for physiotherapy and rehabilitation centres.",
      shortAnswer: {
        title:
          "What does a physiotherapy website include, and what does it cost?",
        body: "A physiotherapy and rehabilitation centre website is your own address for explaining your treatment areas, introducing your clinical team and equipment, and collecting appointment requests. A typical centre site Forpus builds carries separate pages for orthopaedic, neurological, sports and paediatric rehabilitation, profiles of physiotherapists and physicians, an equipment and modality list, a section explaining how a course of sessions works, an appointment request form with WhatsApp, insurance agreement information, an access page covering parking, lifts and step-free entry, a Google Maps link and a fast, mobile-friendly design. A presentation site covering the centre and its treatment areas runs ₺50,000–85,000 and goes live in one to two weeks. A full site with every treatment area on its own page and requests arriving from the site runs ₺90,000–150,000 over two to four weeks. Session tracking and a patient panel start at ₺220,000. Copy stays inside Türkiye's health promotion rules: no outcome promises, no published session fees. The domain stays in your name.",
      },
      benefits: [
        {
          title: "Your treatment areas, made clear",
          body: "Set out orthopaedic, neurological, sports and paediatric rehabilitation separately so patients arrive at the right door.",
        },
        {
          title: "Requests arrive from the site",
          body: "Patients state their treatment area and preferred hours in a form instead of calling in the middle of a session.",
        },
        {
          title: "Be found on Google",
          body: "Appear on the map and in search for 'physiotherapy centre' and neighbourhood-level queries.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Treatment area pages (orthopaedic, neurological, sports)",
        "Physiotherapist and physician profiles",
        "Equipment and modality list",
        "Appointment request form / WhatsApp",
        "Insurance agreements and access information",
        "Fast, accessible, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "How do health promotion rules in Türkiye affect my site?",
          a: "Physiotherapy is a health service, so the site has to stay on the informing side rather than the advertising side. In practice that rules out promotional offers, published session fees, patient testimonials and star ratings, before-and-after imagery, outcome promises and comparative claims. What stays open is broad: your treatment areas, the methods you apply, your equipment, the qualifications and titles of your team, how a session works and your opening hours. Inspections and fines land on the health facility and its responsible director, not on the agency, so we flag anything borderline and ask you to confirm it with your provincial health directorate and your professional body.",
        },
        {
          q: "Do we need a separate page per treatment area?",
          a: "Yes, because nobody searches for 'physiotherapy' on its own. Someone looking for rehabilitation after a knee replacement and someone looking for post-stroke rehabilitation want different answers. Separate pages let each patient find what they came for, and let Google show you for every one of those searches.",
        },
        {
          q: "Can you set up online booking?",
          a: "We can, but we suggest doing it in stages. Session length, room capacity and equipment availability are tied together in physiotherapy, so letting patients pick a slot directly tends to create clashes. Most centres do better starting with a request form that asks for the treatment area, whether a physician's report exists and a preferred time window, plus WhatsApp; you confirm and place it. Once volume outgrows manual scheduling, we move to a calendar.",
        },
        {
          q: "How should we present our equipment?",
          a: "The equipment page is one of the most-read pages in this sector, but it becomes a compliance problem the moment it turns into a treatment promise. The right structure is the name of the device, the treatment area it is used in and what a session feels like — never 'cured in X sessions'. If you have distinctive infrastructure such as ESWT, robotic rehabilitation, an isokinetic system or a therapy pool, it is worth its own page: referring physicians look there first.",
        },
        {
          q: "Do you handle accessibility?",
          a: "On both sides. The physical side belongs in writing on the site: parking, lifts, ramps, wheelchair access and any shuttle route. The digital side is the site itself — many of these visitors are older or have limited mobility, so type size, contrast, tap target size and keyboard navigation are treated as standard rather than as extras.",
        },
        {
          q: "Can you refresh my existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones. If the old site carries sections that fall outside the health promotion rules, we strip them out before migrating and tell you in writing what came out and why.",
        },
      ],
      ctaTitle: "Let's build a site for your centre",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "huzurevi",
    image: "/generated/personas/huzurevi.webp",
    service: "web",
    slug: { tr: "huzurevi-web-sitesi", en: "nursing-home-website" },
    tr: {
      metaTitle: "Huzurevi & Özel Bakım Merkezi Web Sitesi",
      metaDescription:
        "Huzurevi ve özel yaşlı bakım merkezlerine özel web sitesi. Oda tiplerini, ekibi ve kabul koşullarını gösteren, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Huzurevine Özel",
      h1: "Huzurevi & Özel Bakım Merkezi Web Sitesi",
      intro:
        "Kararı çoğu zaman yaşlının kendisi değil, başka şehirdeki evladı verir; o da önce odaları, bakım kadrosunu ve günün nasıl geçtiğini görmek ister. Oda tiplerinizi, ekibinizi ve kabul koşullarınızı anlatan, yerinde görme randevusu alabildiğiniz bir site bu kararı sizin lehinize çevirir. Forpus huzurevleri ve özel bakım merkezleri için site kuruyor.",
      shortAnswer: {
        title: "Huzurevi web sitesi ne içerir, ne kadar tutar?",
        body: "Huzurevi ve özel bakım merkezi web sitesi, oda tiplerinizi, bakım kadronuzu ve günlük düzeninizi anlattığınız, ailenin yerinde görme randevusu aldığı kendi adresinizdir. Forpus'un kurduğu tipik bir kuruluş sitesinde bakım seviyesine göre ayrılmış sayfalar, gerçek oda ve ortak alan fotoğrafları, hekim, hemşire ve bakım personelinden oluşan ekip tanıtımı, örnek günlük program, ziyaret ve yerinde görme randevusu formu, kabul koşulları ile gerekli belgeler sayfası, ruhsat ve sorumlu müdür bilgisi, KVKK'ya uygun iletişim formu ve mobil uyumlu hızlı bir tasarım bulunur. Kuruluşu tanıtan bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Bakım tiplerinin ayrı ayrı sayfalandığı, yerinde görme randevusunun çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Aile bilgilendirme paneli ve mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Sakin fotoğrafları yazılı açık rıza olmadan yayınlanmaz; metinler tedavi vaadi vermeyen bir bilgilendirme çerçevesinde kurgulanır. Alan adı ve site sizin adınıza kaydedilir; oda durumunu ve içerikleri panelden kendiniz güncellersiniz. Aracı ilan sitelerinden farkı şudur: gelen talep doğrudan size düşer.",
      },
      benefits: [
        {
          title: "Odayı görerek karar",
          body: 'Oda tiplerini, ortak alanları ve bahçeyi gösterin; ailenin "buraya emanet ederim" kararı daha siteyi gezerken şekillensin.',
        },
        {
          title: "Yerinde görme randevusu",
          body: "Aile uygun günü siteden seçsin; kuruluşu gezmeye gelen ziyaretçi telefon trafiğine takılmadan gelsin.",
        },
        {
          title: "Google'da bulunun",
          body: '"Ataşehir huzurevi" ve "yakınımdaki yaşlı bakım merkezi" gibi semt aramalarında haritada ve aramada görünün.',
        },
      ],
      featuresTitle: "Huzurevi & Özel Bakım Merkezi sitenizde neler olur?",
      features: [
        "Bakım tiplerine göre hizmet sayfaları",
        "Oda tipleri ve ortak alan galerisi",
        "Ekip tanıtımı: hekim, hemşire, bakım personeli",
        "Yerinde görme ve ziyaret randevusu formu",
        "Kabul koşulları ve gerekli belgeler",
        "Ruhsat, sorumlu müdür ve harita bilgisi",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Huzurevi web sitesi ne kadar tutar?",
          a: "Oda tiplerini, ekibi ve kabul koşullarını anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında başlar. Bakım seviyelerinin ayrı ayrı sayfalandığı, yerinde görme randevusunun siteden alındığı tam bir site ₺90.000–150.000 aralığındadır. Aile bilgilendirme paneli ve mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız.",
        },
        {
          q: "Tanıtımda mevzuat sınırı var mı, neyi yazamayız?",
          a: "Var. Özel huzurevleri ve yaşlı bakım merkezleri Aile ve Sosyal Hizmetler Bakanlığı izniyle çalışır; tanıtımın gerçeğe uygun olması ve izin verilen kapasiteyi, kadroyu, hizmet kapsamını aşan bir vaat içermemesi gerekir. Bünyenizde hekim, hemşire veya fizyoterapi hizmeti varsa sağlıkta tanıtım mevzuatının sınırları da devreye girer: tedavi ve iyileşme vaadi, karşılaştırmalı üstünlük iddiası, sakin ya da hasta anlatımlarının tanıklık olarak kullanılması, indirim ve kampanya duyurusu sorun yaratır. Serbest olan taraf geniştir ve zaten ailenin sorduğu taraftır: oda tipleri, bakım seviyeleri, personel yapısı, günlük program, yemek düzeni, ziyaret saatleri, kabul koşulları, ruhsat ve sorumlu müdür bilgisi rahatça yazılır. Önemli nokta şu: idari yaptırım ajansa değil, kuruluşa ve sorumlu müdüre kesilir. Bu yüzden siteyi bu çerçeveyi gözeterek kurgular, sınırda gördüğümüz başlıkları size ayrıca söyleriz; kesin yorum için bağlı olduğunuz il müdürlüğü veya mevzuat danışmanınızla teyitleşmenizi öneririz.",
        },
        {
          q: "Sakinlerimizin fotoğraflarını sitede kullanabilir miyiz?",
          a: "Yalnızca yazılı açık rıza varsa. Sakin fotoğrafı kişisel veridir; sağlık durumunu ima ettiği ölçüde özel nitelikli kişisel veri sayılır ve rıza olmadan yayınlanamaz. Bilişsel durumu nedeniyle rıza veremeyecek sakinlerde yasal temsilcinin onayı gerekir, ki bu her başlıkta yeterli bir çözüm değildir. Pratikte en rahat yol şudur: yüz gösteren kareler yerine odaları, ortak alanları, yemekhaneyi, bahçeyi ve fizyoterapi salonunu boşken fotoğraflarız. Aile zaten mekânı görmek istiyor, sakini değil.",
        },
        {
          q: "Ücretlerimizi sitede yazmalı mıyız?",
          a: "Çoğu kuruluş yazmıyor ve bunun makul bir sebebi var: ücret bakım seviyesine, oda tipine ve refakat ihtiyacına göre değiştiği için tek bir rakam yanıltıcı olur. Ama sayfayı tamamen boş bırakmak da aileyi kaçırıyor. Önerdiğimiz orta yol, ücrete neyin dahil olduğunu — barınma, yemek, bakım personeli, temizlik, çamaşır, rutin sağlık takibi — ve neyin ayrıca faturalandığını, örneğin hasta bezi, ilaç ve hastane transferini yazmak. Rakamı görüşmeye bırakırsınız, aile de neyin karşılığını ödeyeceğini bilerek arar.",
        },
        {
          q: "Demans ve alzheimer bakımı için ayrı sayfa şart mı?",
          a: 'Şart değil ama işe yarayan ayrımlardan biri. "Alzheimer bakım merkezi" arayan aile ile "yatağa bağımlı hasta bakımı" arayan aile bambaşka şeyler merak ediyor: biri kaçma riskine karşı alınan önlemleri ve gündüz etkinliklerini, diğeri pozisyon değişimini, yara bakımını ve hemşire kadrosunu soruyor. Ayrı sayfalarda hem aile aradığını bulur hem de arama motorunda iki farklı sorguya karşılık verebilirsiniz. Sunmadığınız bir bakım seviyesi için sayfa açmayız; gelmemesi gereken talep en pahalı taleptir.',
        },
        {
          q: "Aileye düzenli bilgilendirme yapabileceğimiz bir alan kurabilir misiniz?",
          a: "Evet, bu sektörde işleyişi en çok rahatlatan modüllerden biri. Her sakin için aileye özel bir bağlantı üretiriz; uyku, iştah, kilo takibi, ilaç saatleri, katıldığı etkinlikler ve hekim ziyareti gibi kayıtları panelden girersiniz, aile bağlantıdan görür. Bu, uzaktaki evladın en çok ihtiyaç duyduğu şeyi verir ve gün içinde aynı soruyu soran telefonları azaltır. Alan sağlık verisi taşıdığı için erişim yetkisi, saklama süresi ve kayıt tutma tarafını KVKK'ya uygun kurarız; hangi ailenin neyi göreceğini siz belirlersiniz.",
        },
        {
          q: "İlan ve aracı sitelerinden talep alıyoruz, kendi sitemize gerek var mı?",
          a: "İkisi birbirinin yerine geçmiyor. Aracı siteler talep getirir ama o talebi önce kendileri görür, sizi başka kuruluşlarla aynı listede gösterir ve anlatacaklarınızı birkaç satıra sıkıştırır. Kendi siteniz kuruluşunuzun adını aratan aileyi doğrudan karşılar, kadronuzu ve mekânınızı anlatacak yeri size verir, gelen talep aracısız size düşer. Pratikte aileler çoğu zaman önce aracıdan bulup sonra kuruluşun adını aratıyor; o aramada karşılarına çıkacak bir yeriniz olması gerekiyor.",
        },
        {
          q: "Google Haritalar'da bulunmama yardım eder misiniz?",
          a: "Evet. Google İşletme Profilinizi kurar veya düzenler, kategori, hizmet ve iletişim bilgilerini doğru girer, siteyle bağlantısını sağlarız. Bu sektörde aramaların büyük kısmı semt ve ilçe adıyla yapıldığı için hizmet verdiğiniz bölgeye göre içerik kurmak işe yarıyor. Profil sizin sahipliğinizde kalır; doğrulama kodu kuruluş adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
        {
          q: "Mevcut sitemi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Yenileme sırasında sakin görsellerini ve rıza durumunu da gözden geçiririz; eski kuruluş sitelerinde en sık bu tarafta sorun buluyoruz.",
        },
      ],
      ctaTitle: "Kuruluşunuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Huzurevi araması rahat bir araştırmayla başlamaz; çoğu zaman bir kriz anında başlar. Hastaneden taburcu tarihi verilmiştir, bir düşme yaşanmıştır ya da evdeki bakım artık taşınamaz hale gelmiştir. Aramayı da genelde yaşlının kendisi değil, çoğu zaman başka bir şehirde yaşayan evladı yapar. İlk sorduğu şey fiyat değildir: geceleri kim var, ilacı kim veriyor, acil bir durumda ne oluyor, ben ne sıklıkla ziyaret edebilirim.",
          'İkinci kırılma bilginin yokluğunda olur. Oda tipleri, kabul ettiğiniz bakım seviyeleri, ücrete neyin dahil olduğu ve kabul için hangi belgelerin istendiği hiçbir yerde yazmıyorsa aile telefon etmez, listedeki bir sonraki kuruluşa geçer. Bu işte net rakam yazmamak anlaşılırdır, ücret bakım seviyesine göre değişir; ama hiçbir şey yazmamak aileyi "burası bana anlatmıyor" noktasına götürür.',
          "Üçüncüsü, kendi siteniz yoksa aile sizi ilan ve aracı sitelerinde bulur. Orada yan yana dizilmiş onlarca kuruluştan biri olursunuz, anlatacaklarınız birkaç satıra sıkışır ve gelen talep önce aracının eline düşer. Ruhsatınız, sorumlu müdürünüz, hemşire kadronuz, mutfağınız, fizyoterapi salonunuz ve ziyaret düzeniniz — ailenin asıl merak ettiği her şey — anlatılacak bir yer bulamaz.",
        ],
      },
      pricing: {
        title: "Huzurevi & Özel Bakım Merkezi Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kuruluş tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Oda tipleri, ortak alan galerisi, ekip tanıtımı, örnek günlük program, kabul koşulları, ruhsat ve sorumlu müdür bilgisi, harita, çalışma saatleri ve tek tık arama. Tek kuruluşu olan işletmeler için yeterli.",
          },
          {
            name: "Bakım sayfalı, randevulu site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Her bakım seviyesi için ayrı sayfa, yerinde görme randevusu formu, ücrete dahil olan ve olmayan kalemler, sıkça sorulanlar, semt bazlı içerik ve bilgilendirme yazıları için blog altyapısı. Aramadan talep toplamak isteyen kuruluşlar için.",
          },
          {
            name: "Aile bilgilendirme paneli & mobil",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Sakin bazlı kayıt, aileye özel erişim, ilaç ve etkinlik takibi, yatak doluluk yönetimi ve mobil uygulama. Yatak sayısı defterle yönetilemeyecek düzeydeyse ve aile bilgilendirmesi telefon trafiğini boğuyorsa.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Yatak kapasitenizi, kabul ettiğiniz bakım seviyelerini, kadro yapınızı ve hizmet verdiğiniz bölgeyi konuşuruz. Yirmi yataklı butik bir huzurevi ile yatağa bağımlı bakım veren bir merkezin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Fotoğraf ve içerik",
            body: "Aile mekânı görmek istediği için en çok emek buraya gidiyor. Odaları, ortak alanları, yemekhaneyi, bahçeyi ve fizyoterapi salonunu boşken nasıl çekeceğinizi anlatan bir çekim listesi gönderiyoruz; sakin görseli kullanılacaksa rıza metinlerini de bu aşamada hazırlarız.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, kaygıyla gelen ailenin sayfada rahatlaması: sakin bir tipografi, gerçek fotoğraf ve okunaklı bir düzen. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Oda durumunu, ekibi ve kabul koşullarını kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Huzurevi & Özel Bakım Merkezi Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Ruhsat ve sorumlu müdür bilgisi sitede var mı?",
            body: "Aile bunu arıyor ve çoğu sitede bulamıyor. Açılış izni bilgisini, sorumlu müdürün adını ve bağlı olduğunuz il müdürlüğünü sitede göstermek, tasarımın tek başına sağlayamadığı güveni sağlıyor. Teklif verene bu bölümün dahil olup olmadığını sorun.",
          },
          {
            title: "Sakin görselleri için yazılı rıza alınmış mı?",
            body: "Sakin fotoğrafı kişisel veridir, sağlık durumunu ima ettiğinde özel nitelikli veri sayılır. Ajansınız bunu biliyor mu, yoksa siteyi yayınlayıp riski size mi bırakıyor? İzinsiz bir karenin bedelini ajans değil kuruluş öder.",
          },
          {
            title: "Kabul koşulları ve gerekli belgeler yazılı mı?",
            body: "Hangi bakım seviyelerini kabul ettiğiniz, hangi durumlarda kabul edemediğiniz, istenen sağlık raporu ve belgeler, deneme süresi ve ziyaret saatleri yazılı değilse aynı tartışma her ailede baştan başlar.",
          },
          {
            title: "Bakım seviyeleri ayrı ayrı anlatılıyor mu?",
            body: 'Tek bir "hizmetlerimiz" sayfası bu sektörde yetmiyor. Yaşlı bakımı, demans bakımı, yatağa bağımlı bakım ve geçici konaklama farklı sorulara cevap veriyor; hepsini tek sayfada birleştiren site aramaların hiçbirine tam karşılık vermiyor.',
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Bu aramalar çoğunlukla akşam saatlerinde telefondan yapılıyor. Teklif verenden mevcut işlerinden birinin adresini isteyin, kendi telefonunuzdan açın ve ilk üç saniyede ekranda ne gördüğünüze bakın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının kuruluşunuz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın. Aile paneli gibi veri tutan bir modül varsa verilerin nerede tutulduğunu ve yollarınız ayrılırsa ne olacağını da baştan sorun.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Nursing Home & Care Centre Website",
      metaDescription:
        "Websites for nursing homes and private elderly care centres. Show your rooms, your care team and your admission rules. Get a free quote.",
      eyebrow: "For Care Homes",
      h1: "Nursing Home & Care Centre Website",
      intro:
        "The decision is usually made by an adult child in another city, late at night, under pressure. A site that shows the rooms, the care team and how a day actually runs — and lets a family book a visit — turns that decision your way. Forpus builds sites for nursing homes and private care centres.",
      shortAnswer: {
        title:
          "What does a nursing home website include, and what does it cost?",
        body: "A nursing home or private care centre website is your own address for showing room types, introducing the care team and letting a family book a visit before they decide. A typical site Forpus builds carries a page for each level of care, real photographs of the rooms and shared areas, profiles of the doctor, nurses and care staff, a sample daily programme, a visit request form, a page listing admission conditions and the documents required, licence and responsible-manager details, a KVKK-compliant contact form and a fast, mobile-first design. A site that introduces the facility runs ₺50,000–85,000 and goes live in one to two weeks. A full site with a page per care type and a working visit request runs ₺90,000–150,000 over two to four weeks. Once a family information panel and a mobile app are involved, you are looking at a project starting from ₺220,000. Resident photographs are never published without written consent, and the copy stays within information rather than promotion.",
      },
      benefits: [
        {
          title: "A decision made by seeing",
          body: "Show the room types, the shared areas and the garden so the family settles the question while still on your site.",
        },
        {
          title: "Visits booked from the site",
          body: "Let families pick a day to come and see the place, without the back-and-forth on the phone.",
        },
        {
          title: "Be found on Google",
          body: "Show up on the map and in search for district-level queries like 'nursing home in Ataşehir'.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Pages for each level of care",
        "Room types and shared area gallery",
        "Team profiles: doctor, nurses, care staff",
        "Visit request and appointment form",
        "Admission conditions and required documents",
        "Licence, responsible manager and map details",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "What does a nursing home website cost?",
          a: "A presentation site covering room types, the team and admission conditions starts in the ₺50,000–85,000 band. A full site with a page per level of care and a working visit request sits in the ₺90,000–150,000 band. Once a family information panel and a mobile app are involved, you are looking at a project starting from ₺220,000.",
        },
        {
          q: "Are there rules on what we may say about ourselves?",
          a: "Yes. Private care homes in Türkiye operate under a licence from the Ministry of Family and Social Services, and their promotion must be accurate and must not promise beyond the licensed capacity and scope. If a doctor, nurses or physiotherapy are part of your service, the health-sector promotion rules apply on top: promises of treatment or recovery, claims of superiority over others, resident or patient accounts used as testimony, and discount or campaign announcements all create exposure. What remains open is wide and is what families actually ask about: room types, levels of care, staffing, the daily programme, meals, visiting hours, admission conditions, licence and responsible-manager details. The sanction lands on the facility and its responsible manager, not on the agency, so we build within that frame and flag anything borderline.",
        },
        {
          q: "Can we publish photographs of our residents?",
          a: "Only with written explicit consent. A resident photograph is personal data, and where it implies a health condition it counts as special-category data. Where a resident cannot give consent, their legal representative's approval is required, and that is not always a sufficient answer. In practice the calmer route is to photograph the rooms, the shared areas, the dining hall, the garden and the physiotherapy room while empty. Families want to see the place.",
        },
        {
          q: "Should we publish our fees?",
          a: "Most facilities do not, and for a fair reason: the fee changes with the level of care, the room type and whether one-to-one support is needed, so a single figure misleads. Leaving the page empty loses families, though. The middle path we suggest is to write what the fee covers — accommodation, meals, care staff, cleaning, laundry, routine health monitoring — and what is billed separately, such as incontinence supplies, medication and hospital transfers.",
        },
        {
          q: "Can you build a family information panel?",
          a: "Yes. We create a private link for each resident; you enter sleep, appetite, weight, medication times, activities and doctor visits from the panel, and the family opens the link. It gives a relative living far away exactly what they need and cuts the repeat phone calls. Because the area carries health data, we set up access rights, retention and audit logging in line with KVKK, and you decide which family sees what.",
        },
        {
          q: "Can you refresh our existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones. During the rebuild we also review resident images and the consent behind them — that is where we most often find a problem on older sites.",
        },
      ],
      ctaTitle: "Let's build a site for your care home",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "gumruk",
    image: "/generated/personas/gumruk.webp",
    service: "web",
    slug: { tr: "gumruk-musavirligi-web-sitesi", en: "customs-broker-website" },
    tr: {
      metaTitle: "Gümrük Müşavirliği Web Sitesi",
      metaDescription:
        "Gümrük müşavirliği ve dış ticaret firmalarına özel kurumsal web sitesi: rejim sayfaları, yetki alanı, evrak listeleri ve dosya takip portalı.",
      eyebrow: "Gümrük Müşavirliğine Özel",
      h1: "Gümrük Müşavirliği Web Sitesi",
      intro:
        "İthalat yapacak bir firma, işini emanet edeceği müşaviri ilk yükleme hareket etmeden önce internetten kontrol eder: hangi gümrük müdürlüklerinde çalışıyorsunuz, hangi rejimlerde ekibiniz var, dosyayı kim takip ediyor. Bu üç sorunun yazılı cevabı olan kurumsal bir site, gelen talebin isabetini artırır. Forpus gümrük müşavirliği firmalarına ve dış ticaret danışmanlıklarına özel siteler tasarlıyor.",
      shortAnswer: {
        title: "Gümrük müşavirliği web sitesi ne içerir, ne kadar tutar?",
        body: "Gümrük müşavirliği web sitesi, hizmet kapsamınızı, çalıştığınız gümrük müdürlüklerini ve dosya takip düzeninizi anlattığınız, yeni ithalatçının size ulaştığı kendi adresinizdir. Forpus'un kurduğu tipik bir müşavirlik sitesinde ithalat, ihracat, transit, antrepo ve serbest bölge işlemleri için ayrı hizmet sayfaları, yetki alanınızdaki gümrük müdürlüklerini gösteren bir bölüm, dahilde işleme, YYS ve GTİP tespiti gibi danışmanlık başlıkları, KVKK'ya uygun bir teklif formu, evrak listesi sayfaları, mevzuat yazıları için blog altyapısı ve kurumsal, mobil uyumlu bir tasarım bulunur. Tanıtıma odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Hizmetlerin ve rejimlerin ayrı ayrı sayfalandığı kurumsal bir firma sitesi ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Müşterinin dosya durumunu ve belgelerini gördüğü bir portal işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Meslek mevzuatı gereği ücret ilanı ve iş getirici ifade kullanılmaz. Alan adı ajansın değil sizin hesabınızda durur. Firmalar müşaviri çoğunlukla gümrük müdürlüğü adıyla arar; bu yüzden yetki alanınız ayrı bir sayfada, tek tek yazılır.",
      },
      benefits: [
        {
          title: "Kapsamınız net",
          body: "İthalat, ihracat, transit, antrepo ve serbest bölge işlemlerini ayrı ayrı anlatın; talep doğru rejimle gelsin.",
        },
        {
          title: "Yetki alanınız yazılı",
          body: "Hangi gümrük müdürlüklerinde işlem yaptığınız sitede dursun; firmanın sorduğu ilk soru bu.",
        },
        {
          title: "Google'da bulunun",
          body: "'Gümrük müşaviri + şehir' ve gümrük müdürlüğü adıyla yapılan aramalarda görünecek şekilde kurulur.",
        },
      ],
      featuresTitle: "Gümrük Müşavirliği sitenizde neler olur?",
      features: [
        "Hizmet sayfaları (ithalat, ihracat, transit, antrepo)",
        "Yetki alanı ve gümrük müdürlükleri sayfası",
        "Danışmanlık başlıkları (dahilde işleme, YYS, GTİP)",
        "Evrak listesi ve süreç anlatımı sayfaları",
        "KVKK uyumlu teklif ve iletişim formu",
        "Mevzuat blogu ve kurumsal, mobil uyumlu tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Hangi gümrük müdürlüklerinde çalıştığımızı sitede nasıl gösteriyoruz?",
          a: "Yetki alanınızı ayrı bir sayfada, müdürlük müdürlük yazarız: hangi gümrükte hangi rejimde işlem yapıyorsunuz, orada şubeniz mi var yoksa temsil yoluyla mı çalışıyorsunuz. Bu sayfa hem firmanın ilk sorduğu soruyu baştan cevaplar hem de müdürlük adıyla yapılan aramalarda görünmenize yardımcı olur.",
        },
        {
          q: "Meslek mevzuatı sitemi nasıl etkiliyor?",
          a: "Gümrük müşavirliği izin belgesine bağlı bir meslek; gümrük mevzuatı ve bağlı olduğunuz müşavir derneğinin meslek kuralları reklam ile iş getirici faaliyeti sınırlar, site bilgilendirme çerçevesinde kalmalıdır. Pratikte ücret ilanı vermek, sonuç veya iş vaadinde bulunmak, meslektaşlarla karşılaştırmalı üstünlük iddia etmek ve müşteri adına başarı hikâyesi kurmak sorun yaratır. Serbest olan taraf geniştir: hizmet kapsamınızı, çalıştığınız rejimleri, evrak listelerini, süreç anlatımlarını, ekibinizin deneyimini ve mevzuat yazılarını yayınlayabilirsiniz. Sitede yazanın sorumluluğu size aittir; izin belgesi sizin adınıza olduğu için disiplin süreci ajansa değil meslek mensubuna işler. Bu yüzden siteyi bu çerçeveyi gözeterek kurgular, son onayı size bırakırız; üyesi olduğunuz derneğin güncel düzenlemesiyle teyitleşmenizi öneririz.",
        },
        {
          q: "Hizmet ücretlerimizi sitede yayınlayabilir miyiz?",
          a: "Yayınlamanızı önermiyoruz. Gümrük müşavirliğinde Ticaret Bakanlığı'nca yayımlanan bir asgari ücret tarifesi var; tanıtımı ücret üzerinden kurmak, tarifenin altında iş alma iddiasını da beraberinde getirir. Sitede rakam yerine kapsamı anlatırız: hangi işlem hangi adımlardan oluşuyor, hangi belgeler isteniyor, süre neye bağlı. Teklif, formdan gelen bilgiye göre birebir verilir.",
        },
        {
          q: "Müşteri dosya durumunu siteden takip edebilir mi?",
          a: "Evet, portal kademesinde kurduğumuz iş bu. Müşteri kendi firmasına ait dosyaları, beyanname tescil bilgisini, yüklediği belgeleri ve ödeme evrakını görür; siz de hangi dosyada hangi belgenin eksik olduğunu tek ekrandan takip edersiniz. Küçük ofislerin çoğunda buna gerek olmuyor, e-posta ve WhatsApp yürüyor. Dosya sayısı arttıkça 'dosyam ne durumda' telefonları portalı kendi kendine haklı çıkarıyor.",
        },
        {
          q: "Evrak listeleri ve süreç anlatımları yayınlamak işe yarar mı?",
          a: "Bu alanda en çok işe yarayan içerik türü bu. Firmalar 'A.TR nasıl alınır', 'menşe şahadetnamesi hangi durumda isteniyor', 'antrepo beyannamesi için hangi belgeler gerekli' diye arıyor ve bu aramaların çoğu bir müşavir arayışının ilk adımı oluyor. Doğru yazılmış bir evrak listesi sayfası hem sizi bulunur kılar hem de operasyonda aynı soruyu tekrar tekrar cevaplamaktan kurtarır. İçeriğin doğruluğunun son onayı sizden geçer; mevzuat sık değiştiği için güncelleme düzenini de birlikte kurarız.",
        },
        {
          q: "Yetkilendirilmiş gümrük müşavirliği hizmetimizi aynı sitede anlatabilir miyiz?",
          a: "Anlatabilirsiniz ama ayrı bir bölümde. YGM tespit işlemleri farklı bir yetkiye dayanıyor ve bağımsızlık gerektiriyor; tespit hizmetiyle müşavirlik hizmetini aynı sayfada tek bir paket gibi sunmak hem ziyaretçiyi yanıltır hem sizi zor durumda bırakabilir. Tespit işlemlerini ayrı sayfalandırır, hangi hizmetin hangi yetkiyle verildiğini açıkça yazarız. Sınırda gördüğümüz başlıkları size ayrıca söyleriz.",
        },
        {
          q: "Gümrük müşavirliği web sitesi ne kadar tutar?",
          a: "Hizmet kapsamı, yetki alanı ve ekip odaklı kurumsal bir tanıtım sitesi ₺50.000–85.000 aralığında başlar. Her rejimin ve danışmanlık başlığının ayrı sayfalandığı, evrak listeleri ve mevzuat blogu olan bir firma sitesi ₺90.000–150.000 aralığındadır. Müşteri dosya takip portalı işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "İngilizce sürüm gerekli mi?",
          a: "İhracat tarafında yurt dışındaki alıcı, nakliyeci ya da yabancı sermayeli firmalarla temasınız varsa gerekli; bu firmalar müşaviri kendi dillerinde okuyabildikleri yerden seçiyor. Ancak makine çevirisi bir dil sürümü değildir. İngilizce sayfaları ayrı yazar, iki dilin arama motorlarındaki karşılığını doğru bağlarız. Yalnızca yurt içi ithalatçıyla çalışıyorsanız bu maliyeti şimdilik ertelemenizi söyleriz.",
        },
        {
          q: "Mevcut sitemizi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Yıllardır yayında olan bir mevzuat arşiviniz varsa hangi yazıların hâlâ doğru olduğunu birlikte gözden geçiririz; yürürlükten kalkmış bir tebliği anlatan yazı bu meslekte itibar kaybettirir.",
        },
      ],
      ctaTitle: "Firmanız için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Gümrük müşavirliğinde iş büyük ölçüde referansla gelir; ama tavsiye edilen firmayı herkes bir de internetten kontrol eder. İlk ithalatını yapacak bir üretici, müşavirini değiştirmeye karar vermiş bir ihracatçı ya da bir lojistik firmasının satın alma birimi, teklif istemeden önce sizi aratır.",
          "O aramada karşısına çıkan şey çoğu zaman bir logo, bir telefon numarası ve 'dış ticaretin her alanında hizmet' cümlesidir. Hangi gümrük müdürlüklerinde işlem yaptığınız, antrepo ve transit tarafında ekibinizin olup olmadığı, dahilde işleme veya YYS dosyası hazırlayıp hazırlamadığınız hiçbir yerde yazmaz. Firma bunu öğrenmek için telefon etmek zorunda kalır; çoğu etmez, listeye devam eder.",
          "Asıl kayıp yanlış eşleşmede yaşanır. Deniz yolu konteyner ithalatına göre kurulmuş bir ofise sürekli mikro ihracat ve ETGB sorusu gelmesi iki taraf için de vakit kaybıdır. Operasyon başladıktan sonra en çok tekrarlanan soru ise 'dosyam ne durumda' sorusudur; bunun cevabı yalnızca telefonda veriliyorsa ekibinizin günü telefonda geçer.",
        ],
      },
      pricing: {
        title: "Gümrük Müşavirliği Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Firma tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Kurumsal bir dijital varlık: hizmet kapsamı, yetki alanı, ekip ve iletişim. Tek ofisle çalışan, işini ağırlıklı referansla alan müşavirlikler için yeterli.",
          },
          {
            name: "Kurumsal firma sitesi",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Her rejimin ve danışmanlık başlığının ayrı sayfalandığı, evrak listeleri ve mevzuat yazıları için blog altyapılı yapı. Gümrük müdürlüğü bazlı sayfalar ve İngilizce sürüm seçeneği. Yeni müşteriyi aramadan getirmek isteyen firmalar için.",
          },
          {
            name: "Müşteri dosya portalı",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Müşterinin kendi dosyalarını, beyanname bilgisini, yüklediği belgeleri ve ödeme evrakını gördüğü güvenli portal; ofis içi eksik belge takip paneli. Dosya trafiği e-postayla yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Hizmet kapsamınızı, çalıştığınız gümrük müdürlüklerini ve hedef müşteri profilinizi konuşuruz. Konteyner ithalatına göre kurulmuş bir ofisle e-ihracat ve ETGB tarafında yoğunlaşan birinin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik toplama",
            body: "Hizmet açıklamaları, evrak listeleri, yetki alanı ve ekip özgeçmişleri için şablon gönderiyoruz. Mevzuata dayanan içeriğin doğruluğu size ait olduğu için son onay her zaman sizden geçer.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Bu alanda tasarımın işi, operasyonunu emanet edecek firmaya ciddiyet ve kurumsallık hissi vermek. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası, Search Console ve Google İşletme Profili bağlantısı dahil yayına alırız. Evrak listelerini ve mevzuat yazılarını kendiniz ekleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Gümrük Müşavirliği Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Meslek mevzuatı biliniyor mu?",
            body: "Gümrük müşavirliğinde reklam ve iş getirici faaliyet sınırlıdır; ücret ilanı, sonuç vaadi ve karşılaştırmalı üstünlük iddiası sorun yaratabilir. İzin belgesi sizin adınıza olduğu için disiplin süreci ajansa değil size işler. Bunu bilmeyen bir ajans sizi derneğiniz ve idare nezdinde zor durumda bırakabilir.",
          },
          {
            title: "Yetki alanınız yazılı mı?",
            body: "Firmanın ilk sorusu 'bizim gümrükte işlem yapıyor musunuz' oluyor. Bu bilgi sitede müdürlük müdürlük yazmıyorsa ziyaretçi telefon etmek yerine listeye devam eder.",
          },
          {
            title: "Rejimler ayrı ayrı sayfalanıyor mu?",
            body: "'Dış ticaretin her alanında hizmet' cümlesi hiçbir aramaya girmez. İthalat, ihracat, transit, antrepo, serbest bölge ve dahilde işleme ayrı sayfa ister; hepsini tek torbada sunan bir site hem ziyaretçiyi hem Google'ı kaybettirir.",
          },
          {
            title: "İçeriği kendiniz güncelleyebilecek misiniz?",
            body: "Gümrük mevzuatı tebliğ düzeyinde sık değişir. Her güncelleme için ajansa bağımlı kalırsanız sitedeki bilgi bir yıl içinde yanlış hale gelir; bu meslekte yanlış bilgi, eksik bilgiden pahalıdır.",
          },
          {
            title: "Belge ve dosya paylaşımı nasıl olacak?",
            body: "Müşteri fatura, çeki listesi ve konşimento gönderecek. Bunun için e-posta yeterli mi, yoksa güvenli bir yükleme alanı mı gerekiyor? Ticari sır niteliğindeki belgenin nerede durduğunu ve KVKK tarafını baştan kararlaştırın; sonradan eklemek daha pahalı.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının firmanız adına kayıtlı olduğundan ve teslimde site dosyalarıyla panel erişiminin size verildiğinden emin olun; sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Customs Broker Website",
      metaDescription:
        "Corporate websites for customs brokerage and foreign trade firms: service pages, customs offices covered, document checklists and a file portal.",
      eyebrow: "For Customs Brokers",
      h1: "Customs Broker Website",
      intro:
        "An importer checks the broker they were referred to before the first shipment moves: which customs offices you clear at, which regimes your team handles, who follows the file. A corporate site that answers those three in writing brings you better-matched enquiries. Forpus builds sites for customs brokerage and foreign trade firms.",
      shortAnswer: {
        title:
          "What does a customs broker website include, and what does it cost?",
        body: "A customs broker's website is your firm's own address for setting out your scope, the customs offices you clear at and how a file is followed, so a new importer can reach you. A typical site Forpus builds carries separate pages for import, export, transit, bonded warehouse and free zone procedures, a section listing the customs offices you are authorised at, advisory topics such as inward processing, authorised economic operator status and tariff classification, a KVKK-compliant quote form, document checklist pages, a blog for regulatory articles, and a corporate, mobile-first design. A site focused on introducing the firm runs ₺50,000–85,000 and goes live in one to two weeks. A corporate site with every regime on its own page runs ₺90,000–150,000 over two to four weeks. A client portal where importers follow their own files starts at ₺220,000. Professional rules keep fee lists and work-soliciting claims off the site, and the domain stays in your account, not the agency's.",
      },
      benefits: [
        {
          title: "Clear scope",
          body: "Import, export, transit, warehousing and free zone work explained separately, so enquiries arrive under the right regime.",
        },
        {
          title: "Customs offices in writing",
          body: "List the offices you clear at; it is the first thing an importer asks before calling.",
        },
        {
          title: "Found on Google",
          body: "Built to appear for 'customs broker + city' and for searches made by customs office name.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service pages (import, export, transit, warehousing)",
        "Customs offices and authorisations page",
        "Advisory topics (inward processing, AEO, classification)",
        "Document checklists and process explainers",
        "KVKK-compliant quote and contact form",
        "Regulatory blog, corporate mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "How do professional rules affect the site?",
          a: "Customs brokerage is a licensed profession in Turkey, and both the customs regulations and the brokers' association rules restrict advertising and work-soliciting activity, so the site has to stay on the informational side. In practice that rules out published fee lists, promises of outcomes, and comparative claims against colleagues. What stays open is wide: your scope, the regimes you work in, document checklists, process explainers, your team's experience and regulatory articles. The licence is in your name, so responsibility for what the site says rests with the broker, not the agency. We build within that frame and leave the final approval to you.",
        },
        {
          q: "Can we publish our fees?",
          a: "We advise against it. A minimum fee tariff for customs brokerage is published in Turkey, and promoting the work on price invites the claim that you are undercutting it. We explain scope instead: the steps in each procedure, the documents required and what drives the timeline. Quotes go out one by one, based on what comes through the form.",
        },
        {
          q: "Can clients follow their files from the site?",
          a: "Yes, at the portal tier. A client sees their own files, the declaration registration details, the documents they uploaded and the payment records, while your team tracks which file is missing which document from one screen. Smaller offices usually manage fine on email; as file volume grows, the 'where is my file' calls make the portal pay for itself.",
        },
        {
          q: "Can you show which customs offices we work at?",
          a: "Yes, on a page of its own, office by office, with the regimes handled at each and whether you have a branch there or work through representation. It answers the question importers ask first and helps you appear in searches made by customs office name.",
        },
        {
          q: "Do we need an English version?",
          a: "If you work the export side with foreign buyers, forwarders or foreign-owned companies, yes - they pick a broker they can read in their own language. Machine translation is not a language version, though: we write the English pages separately and link the two properly for search engines.",
        },
        {
          q: "Can you refresh our existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones. If you have years of regulatory articles, we review together which ones are still accurate before they go back up.",
        },
      ],
      ctaTitle: "Let's build a site for your firm",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "anaokulu",
    image: "/generated/personas/anaokulu.webp",
    service: "web",
    slug: { tr: "anaokulu-web-sitesi", en: "preschool-website" },
    tr: {
      metaTitle: "Özel Anaokulu & Kreş Web Sitesi",
      metaDescription:
        "Özel anaokulu ve kreşler için web sitesi ve online ön kayıt. Eğitim programını, günlük akışı ve okulu gösteren, mobil uyumlu tasarım. Ücretsiz teklif alın.",
      eyebrow: "Anaokuluna Özel",
      h1: "Özel Anaokulu & Kreş Web Sitesi",
      intro:
        "Veli, çocuğunu bırakacağı yeri kapıdan girmeden önce ekranda seçiyor: sınıfları, bahçeyi, günlük akışı ve öğretmen kadrosunu görmek istiyor. Eğitim yaklaşımınızı anlatan ve okul gezisi randevusunu oracıkta alan bir site, kayıt döneminin en yoğun haftalarını sizin lehinize çevirir. Forpus özel anaokulları ve kreşler için site kuruyor.",
      shortAnswer: {
        title: "Anaokulu web sitesi ne içerir, ne kadar tutar?",
        body: "Anaokulu web sitesi, eğitim yaklaşımınızı ve günlük akışınızı anlattığınız, velinin okul gezisi randevusu alıp ön kayıt bıraktığı kendi adresinizdir. Forpus'un kurduğu tipik bir anaokulu sitesinde yaş gruplarına göre ayrılmış sınıf sayfaları, eğitim programının anlatıldığı bir bölüm, saat saat günlük akış, aylık yemek menüsü, öğretmen kadrosu ve sertifikaları, gerçek sınıf ve bahçe fotoğrafları, güvenlik ile giriş-çıkış düzeni, servis güzergâhları, okul gezisi randevu formu, ön kayıt formu, MEB kurum bilgileri ve mobil uyumlu hızlı bir tasarım bulunur. Okulu ve programı anlatan bir tanıtım sitesi ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Yaş gruplarının ayrı sayfalandığı, randevu ve ön kayıt formlarının çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Veli paneli ve günlük bilgilendirme uygulaması işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Kayıt talebi nisan ile ağustos arasında toplandığı için site o takvime göre kurgulanır. Çocuk fotoğrafları veli açık rızası olmadan yayımlanmaz. Alan adı ve site sizin adınıza kaydedilir; aylık menüyü ve duyuruları panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Okul gezisi randevusu",
          body: "Veli okulu gezme randevusunu siteden alsın; kayıt dönemi telefon başında değil, sizin takviminizde başlasın.",
        },
        {
          title: "Görünce güvenen veli",
          body: "Sınıfları, bahçeyi ve günlük akışı gösterin; 'çocuğumu buraya bırakırım' kararı daha siteye bakarken olgunlaşsın.",
        },
        {
          title: "Google'da bulunun",
          body: "'Yakınımdaki anaokulu' ve semt adıyla yapılan kreş aramalarında haritada görünün.",
        },
      ],
      featuresTitle: "Özel Anaokulu & Kreş sitenizde neler olur?",
      features: [
        "Yaş gruplarına göre sınıf sayfaları",
        "Okul gezisi randevu ve ön kayıt formu",
        "Saat saat günlük akış ve aylık menü",
        "Sınıf, bahçe ve oyun alanı galerisi",
        "Öğretmen kadrosu ve eğitim programı",
        "Servis güzergâhı, harita, WhatsApp",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Online ön kayıt ve okul gezisi randevusu kurar mısınız?",
          a: "Evet. Basit bir ön kayıt formundan, velinin gün ve saat seçtiği bir gezi randevusu takvimine kadar ihtiyacınıza göre kurarız. Küçük kurumların çoğunda çocuğun doğum tarihini, başlamak istediği dönemi ve iletişim bilgisini alan bir form artı WhatsApp yönlendirmesi yetiyor; kayıt döneminde günde onlarca gezi talebi geliyorsa çakışmayı önleyen takvimli yapı kendini gerektiriyor. Formdan gelen talepler e-postanıza ve isterseniz WhatsApp'a düşer, hiçbiri sadece panelde beklemez.",
        },
        {
          q: "Ücretlerimizi sitede yazmalı mıyız?",
          a: "Zorunlu değil ve okulların çoğu yazmıyor; ama velinin siteye girdikten sonra aradığı ilk iki şeyden biri bu. Dürüst yanıt şu: hiç yazmazsanız her telefonun ilk sorusu aynı olur ve bütçesi tutmayan veliyle vakit harcarsınız, yazarsanız pazarlık alanınız daralır. Çalıştığımız okulların çoğu ortada duruyor: tam gün ve yarım gün için bir başlangıç bandı, kardeş ve erken kayıt indirimlerinin varlığı, güncel liste için form. Hangisinin size uyduğuna doluluk hedefinize bakarak birlikte karar veririz.",
        },
        {
          q: "Çocukların fotoğraflarını sitede yayınlayabilir miyiz?",
          a: "Evet, ama veli açık rızası olmadan olmaz. Çocuk fotoğrafı kişisel veridir ve üzerine en çok düşülmesi gereken başlıklardan biridir: rıza yazılı alınmalı, hangi mecrada kullanılacağı açıkça yazmalı ve veli istediğinde geri çekebilmelidir. Pratikte kurduğumuz düzen şu: galerinin omurgası çocuk görünmeyen karelerden kurulur — sınıflar, bahçe, atölye masası, yemekhane, etkinlik düzeni. Rızası alınmış kareler ayrı bir bölümde durur ve rıza geri çekildiğinde tek tek kaldırılabilir. Rıza metnini hazırlayan taraf biz değiliz ama galeriyi bu düzene göre kurar, hangi karenin nereye gireceğini gösteririz.",
        },
        {
          q: "Kreş, anaokulu ve yaş grupları için ayrı sayfa şart mı?",
          a: "Şart değil ama en çok kazandıran ayrımlardan biri. İki yaşındaki çocuğu için bakım arayan veliyle beş yaşındaki çocuğu için okula hazırlık arayan veli farklı şeyler soruyor: biri uyku ve beslenme düzenini, öğretmen başına düşen çocuk sayısını merak ediyor; diğeri okuma yazmaya hazırlığı, İngilizceyi ve ilkokula geçişi. Ayrı sayfalarda hem veli aradığını bulur hem de 'kreş' ile 'anaokulu' aramalarının ikisinde birden görünürsünüz; bunlar Google'da farklı aramalar.",
        },
        {
          q: "Servis güzergâhımızı sitede göstermek işe yarar mı?",
          a: "Çok yarıyor, iki sebeple. Birincisi velinin ikinci sorusu neredeyse her zaman 'bizim mahalleye servis var mı' oluyor; cevabı sitede bulamayan veli aramak yerine bir sonraki okula geçiyor. İkincisi arama tarafı: veliler bu kelimeleri genelde semt adıyla birlikte aratıyor, servis verdiğiniz semtleri sayfaya yazmak o aramalarda görünmenize yardımcı oluyor. Güzergâhları panelden güncelleyebileceğiniz bir yapı kurarız, her dönem değişebiliyor.",
        },
        {
          q: "Kayıt dönemine yetiştirebilir misiniz?",
          a: "Kayıt talebi ilkbaharda başlayıp yaz boyunca sürdüğü için sitenin en geç mart ayında yayında olmasını öneriyoruz; şubat-mart aralığında başlanan bir iş rahat yetişir. Tanıtım sitesi, içerikleriniz hazırsa bir ila iki hafta; ön kayıtlı bir site iki ila dört hafta sürüyor. Zaman darsa önce ön kayıt formu ve okul tanıtımıyla yayına çıkar, yaş grubu sayfalarını ve galeriyi yayından sonra tamamlarız. Kayıt döneminde yayında olmayan bir site bir yıl bekliyor demektir.",
        },
        {
          q: "Veli paneli veya mobil uygulama gerçekten gerekli mi?",
          a: "Tek şubeli, üç dört sınıflı bir okulda WhatsApp grupları işi görüyorsa gerekmez, dürüst yanıt budur. Ancak sınıf sayısı arttıkça aynı fotoğrafı gruplara tek tek atmak, duyuruların akışta kaybolması ve devamsızlık bilgisinin dağılması gerçek bir yük haline geliyor. O eşiğe geldiyseniz veli girişli bir panel ya da uygulama günlük bilgilendirmeyi, fotoğraf paylaşımını, duyuruları ve ödeme hatırlatmasını tek yerde toplar. Kararı sınıf ve şube sayınıza bakarak birlikte veririz.",
        },
        {
          q: "Veli yorumu, kampanya ve erken kayıt indirimi duyurabilir miyiz?",
          a: "Evet, serbest. Bu sektör sağlık ve meslek mevzuatındaki tanıtım kısıtlarına tabi değil; veli yorumlarını, Google değerlendirmelerinizi, erken kayıt ve kardeş indirimlerini sitede gösterebilirsiniz. Panelden kendiniz yayına alabileceğiniz bir duyuru alanı kurarız. Dikkat edilecek tek şey kurum adının yazılışı: MEB kurum açma izninizde geçen tam adı kullanmak ve kurum bilgilerini sitede doğru göstermek gerekiyor, zaten veli için de bu bir güven işareti.",
        },
        {
          q: "Google Haritalar'da bulunmama yardım eder misiniz?",
          a: "Evet, bu sektörde en çok işe yarayan iş bu. Google İşletme Profilinizi kurar veya düzenler, kategori ve hizmet bilgilerini doğru girer, siteyle bağlantısını sağlarız. Profil sizin sahipliğinizde kalır; doğrulama kodu adresinize geldiği için o adımı sizin tamamlamanız gerekir.",
        },
      ],
      ctaTitle: "Okulunuz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Anaokulu araması alışveriş gibi başlamaz, tedirginlikle başlar. Veli önce oturduğu semtte üç beş okul çıkarır, sonra teker teker sitelerine girer ve hep aynı şeyleri arar: sınıfta kaç çocuk var, öğretmenler kim, güvenlik ve giriş-çıkış nasıl işliyor, gün içinde ne yapılıyor, ne yeniyor. Bu sorulara cevap veremeyen site listeden ilk elenen olur; çünkü elemenin veliye hiçbir maliyeti olmadığı tek an bu andır.",
          "Sosyal medya bu işi kısmen görür ama eğitim programınızı, aylık menünüzü, yaş gruplarına göre düzeninizi ve servis güzergâhlarınızı orada anlatamazsınız. Üstelik veli bir okulun ciddiyetini kurumsal görünürlüğünden ölçüyor; çocuğunu bir yıllığına emanet edeceği kurumun tek adresi bir Instagram profiliyse aklındaki soru değişiyor. Randevu tarafı da öyle: karar anına gelmiş bir veliye mesaj yazdırmak, tek tıkla form doldurtmaktan her zaman daha zordur.",
          "Üçüncüsü bu işin takvimidir. Kayıt talebi ilkbaharda başlar, yaz boyunca sürer ve okul açıldığında biter; kaçırılan veli bir sonraki ay değil, bir sonraki yıl geri gelir. Kontenjan da esnek değildir: yirmi kişilik bir sınıfta boş kalan üç koltuk, üç haftalık değil dokuz aylık bir gelir kaybıdır. O yüzden anaokulu sitesinin işi vitrin olmakla bitmez; kayıt döneminde talebi toplayacak, gezi randevusunu alacak ve veliyi kapıya kadar getirecek biçimde kurulması gerekir.",
        ],
      },
      pricing: {
        title: "Özel Anaokulu & Kreş Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Okul tanıtımı, eğitim yaklaşımı, günlük akış, aylık menü, öğretmen kadrosu, sınıf ve bahçe galerisi, harita ve tek tık WhatsApp. Tek şubeli okullar için yeterli.",
          },
          {
            name: "Ön kayıtlı site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Okul gezisi randevu formu, ön kayıt formu, yaş grubu bazlı ayrı sayfalar, servis güzergâhı sayfaları, duyuru ve erken kayıt bölümü. Kayıt döneminin talebini siteden toplamak isteyenler için.",
          },
          {
            name: "Veli paneli & mobil uygulama",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Veli girişi, günlük bilgilendirme, sınıf bazlı fotoğraf paylaşımı, duyuru akışı, devamsızlık ve kayıt takibi. Sınıf ya da şube sayısı WhatsApp gruplarıyla yönetilemeyecek düzeydeyse.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Kapasitenizi, yaş gruplarınızı, eğitim yaklaşımınızı, servis bölgelerinizi ve kayıt takviminizi konuşuruz. Tek şubeli bir mahalle kreşiyle üç yaş grubuna ayrı program uygulayan bir anaokulunun sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "Fotoğraf ve içerik",
            body: "Bu sektörde veliyi ikna eden şey mekân, o yüzden en çok emek buraya gidiyor. Sınıfları, bahçeyi, yemekhaneyi ve etkinlik alanlarını nasıl çekeceğinizi anlatan bir çekim listesi gönderiyoruz. Aynı aşamada aylık menüyü, günlük akışı ve kadro bilgilerini toplar, çocuk görünen karelerde veli rızasının alınmış olduğunu birlikte kontrol ederiz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, velinin sınıfı görüp içinin rahatlaması ve randevu formuna kadar yürümesi. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Ön kayıt ve randevu formlarının hangi adrese düşeceğini birlikte ayarlar, menüyü ve duyuruları kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Özel Anaokulu & Kreş Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Kayıt takvimine göre kurgulanmış mı?",
            body: "Anaokulunda talep birkaç aya sıkışır. Ön kayıt çağrısının, kontenjan durumunun ve gezi randevusunun kayıt döneminde ilk ekranda olması gerekir. Bunları sezon geldiğinde öne çıkarabiliyor musunuz, teklif verene sorun.",
          },
          {
            title: "Çocuk fotoğrafları için veli rızası nasıl toplanıyor?",
            body: "Çocuk görselleri kişisel veridir ve yazılı açık rıza olmadan yayınlanamaz. Ajans galeriye çocuk fotoğrafı koyup rıza işini tamamen size mi bırakıyor, yoksa rızalı ve rızasız kareleri ayıran bir düzen mi kuruyor?",
          },
          {
            title:
              "Menüyü, duyuruyu ve kadroyu kendiniz güncelleyebiliyor musunuz?",
            body: "Aylık menü her ay, kadro her dönem, duyurular her hafta değişir. Her değişiklik için ajansa haber vermek zorundaysanız site birkaç ay içinde geçmiş bir menüyü göstermeye başlar.",
          },
          {
            title: "Sınıf ve bahçe fotoğrafları gerçek mi?",
            body: "Bu sektörde stok görsel ters teper. Veli çocuğunun oturacağı sınıfı görmek ister; internetten alınmış kusursuz bir sınıf karesi güven değil şüphe üretir. Size 'görsel bizde' diyen ajansa neyi kastettiğini sorun.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Velilerin neredeyse tamamı siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının kurumunuz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Private Preschool & Daycare Website",
      metaDescription:
        "Websites for private preschools and daycare centres, with online pre-registration and tour booking. Show your classrooms and daily routine. Get a free quote.",
      eyebrow: "For Preschools",
      h1: "Private Preschool & Daycare Website",
      intro:
        "Parents shortlist a preschool on a screen long before they walk through the door: they want to see the classrooms, the garden, the daily routine and who does the teaching. A site that explains your approach and books the school tour on the spot turns the busiest weeks of enrolment season your way. Forpus builds sites for private preschools and daycare centres.",
      shortAnswer: {
        title: "What does a preschool website include, and what does it cost?",
        body: "A preschool website is your own address for explaining how your day runs, showing the classrooms and taking tour bookings and pre-registrations. A typical school site Forpus builds carries classroom pages split by age group, a section on the curriculum and approach, an hour-by-hour daily routine, the monthly menu, teaching staff and their qualifications, real photos of the classrooms and garden, security and drop-off arrangements, bus routes, a tour booking form, a pre-registration form and a fast, mobile-first design. A presentation site covering the school and its programme runs ₺50,000–85,000 and goes live in one to two weeks. A full site with separate age-group pages and working booking and pre-registration forms runs ₺90,000–150,000 over two to four weeks. Once a parent panel and a daily-update app are involved, you are looking at a project starting from ₺220,000. Enrolment demand collects between spring and late summer, so the site is built around that calendar. No photo of a child is published without written parental consent.",
      },
      benefits: [
        {
          title: "Tour bookings from the site",
          body: "Let parents book their visit online, so enrolment season starts in your calendar instead of on the phone.",
        },
        {
          title: "Trust through seeing",
          body: "Show the classrooms, the garden and the daily routine so the decision is half made before the visit.",
        },
        {
          title: "Be found on Google",
          body: "Show up on the map for 'preschool near me' and neighbourhood daycare searches.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Classroom pages by age group",
        "Tour booking and pre-registration forms",
        "Hour-by-hour routine and monthly menu",
        "Classroom, garden and play area gallery",
        "Teaching staff and curriculum pages",
        "Bus routes, Google Maps, WhatsApp",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you set up online pre-registration and tour booking?",
          a: "Yes. From a simple pre-registration form up to a booking calendar where parents pick a day and time. Most small schools do fine with a form that collects the child's date of birth, the intended start term and contact details, plus a WhatsApp redirect; once you are taking dozens of tour requests a day, a calendar that prevents clashes starts to pay for itself. Requests land in your inbox, not only in a panel.",
        },
        {
          q: "Should we publish our fees on the site?",
          a: "Not required, and most schools don't — but it is one of the first two things parents look for. The honest trade-off: leave fees out entirely and every call opens with the same question and time spent on parents whose budget was never going to work; publish them and you lose room to negotiate. Most schools we work with land in the middle: a starting band for full and half days, a note that sibling and early-enrolment discounts exist, and a form for the current list.",
        },
        {
          q: "Can we publish photos of the children?",
          a: "Yes, but never without written parental consent. A child's photo is personal data and deserves more care than any other asset on the site: consent must be written, must name where the images will appear, and must be withdrawable. In practice we build the gallery's backbone from frames with no children in them — classrooms, the garden, the craft table, the dining room — and keep consented frames in a separate section so any one of them can be pulled when consent is withdrawn.",
        },
        {
          q: "Do we need separate pages for daycare and each age group?",
          a: "Not required, but it is one of the splits that pays off most. A parent looking for care for a two-year-old asks about sleep and feeding routines and the adult-to-child ratio; a parent of a five-year-old asks about school readiness, English and the move to primary. Separate pages let each parent find their answer, and let you appear for both 'daycare' and 'preschool' searches — they are different searches.",
        },
        {
          q: "Can you have it ready for enrolment season?",
          a: "Demand starts in spring and runs through the summer, so we recommend being live by March; a project started in February or early March makes that comfortably. A presentation site takes one to two weeks if your content is ready, a site with booking and pre-registration two to four. If time is tight we launch first with the pre-registration form and the school introduction, then finish the age-group pages and gallery after go-live.",
        },
        {
          q: "Do we really need a parent panel or a mobile app?",
          a: "If WhatsApp groups still work for a single site with three or four classrooms, no — that is the honest answer. But as the classroom count grows, sending the same photo to each group, losing announcements in the scroll and tracking absences across chats becomes real work. Past that point a parent login gathers daily updates, photos, announcements and payment reminders in one place. We decide together based on your class and branch count.",
        },
      ],
      ctaTitle: "Let's build a site for your school",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "siteyonetim",
    image: "/generated/personas/siteyonetim.webp",
    service: "web",
    slug: { tr: "site-yonetimi-web-sitesi", en: "property-management-website" },
    tr: {
      metaTitle: "Site & Apartman Yönetim Şirketi Web Sitesi",
      metaDescription:
        "Site ve apartman yönetim şirketlerine özel web sitesi, teklif formu ve sakin paneli. Referanslarınızı gösterin, yeni iş alın. Ücretsiz teklif alın.",
      eyebrow: "Site Yönetimine Özel",
      h1: "Site & Apartman Yönetim Şirketi Web Sitesi",
      intro:
        "Yönetim değişikliği konuşulan bir sitede karar birkaç haftada verilir: yönetim kurulu üç dört şirketin adını toplar ve hepsini tek tek aratır. Kimi yönettiğinizi, hizmetinizin neyi kapsadığını ve aidatı nasıl raporladığınızı gösteren bir site, o kısa listede kalmanızı sağlar. Forpus site ve apartman yönetim şirketlerine özel siteler kuruyor.",
      shortAnswer: {
        title: "Site yönetimi web sitesi ne içerir, ne kadar tutar?",
        body: "Site yönetim şirketi web sitesi, hizmet kapsamınızı anlattığınız, yönettiğiniz projeleri gösterdiğiniz ve yeni yönetim teklifi topladığınız kendi adresinizdir. Forpus'un kurduğu tipik bir yönetim şirketi sitesinde daire ve blok sayısına göre doldurulan bir teklif formu, referans projeler sayfası, aidat tahsilatından personel yönetimine ve teknik bakıma uzanan hizmet sayfaları, raporlama ve şeffaflık anlatımı, sakinler için ayrı bir giriş bağlantısı, ekip ve belge tanıtımı, Google harita bağlantısı ve mobil uyumlu hızlı bir tasarım bulunur. Kurumsal tanıtıma odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Her hizmetin ayrı sayfalandığı, teklif formunun ve referans kartlarının çalıştığı tam bir site ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Aidat sorgulama, arıza talebi ve duyuru akışı içeren sakin paneli ile mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Referans olarak yazdığınız site adları için yönetimden izin almanızı öneririz. Alan adı ve site sizin adınıza kaydedilir; duyuru ve referansları panelden kendiniz güncellersiniz.",
      },
      benefits: [
        {
          title: "Nitelikli teklif talebi",
          body: "Daire ve blok sayısıyla dolan bir form, siz telefonu açmadan önce işin büyüklüğünü bilmenizi sağlar.",
        },
        {
          title: "Referansla ikna",
          body: "Yönettiğiniz projeleri daire sayısı ve hizmet kapsamıyla gösterin, yönetim kurulunun kısa listesinde kalın.",
        },
        {
          title: "Sakin kendi işini görsün",
          body: "Aidat, duyuru ve arıza talebi siteye taşınınca yöneticinin telefonu gün boyu çalmaz.",
        },
      ],
      featuresTitle: "Site & Apartman Yönetim Şirketi sitenizde neler olur?",
      features: [
        "Teklif formu (daire, blok, hizmet)",
        "Referans projeler ve hizmet kapsamı",
        "Aidat sorgulama ve arıza talebi",
        "Duyuru akışı ve belge arşivi",
        "Sakin girişi ve bölge sayfaları",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Bu siteden gerçekten yeni yönetim işi gelir mi?",
          a: "Bu sektörde işin çoğu tavsiyeyle geliyor; bunu değiştirdiğimizi iddia etmiyoruz. Değişen şu: tavsiyeyi alan yönetim kurulu üyesi şirket adınızı mutlaka aratıyor ve karşısına çıkan ilk şey kararını etkiliyor. Kaç daire yönettiğiniz, hangi hizmetlerin kendi ekibinizde olduğu ve aidatı nasıl raporladığınız yazılı değilse kısa listede kalmak zorlaşıyor. Sitenin asıl işi sıfırdan müşteri yaratmak değil, gelen tavsiyeyi doğrulamak.",
        },
        {
          q: "Sakinler için aidat sorgulama ve arıza talebi ekleyebilir misiniz?",
          a: "Evet. En sade hâli, sakinin yalnızca kendi dairesine ait bakiyeyi ve son ödemeleri gördüğü bir giriş ile fotoğraf eklenebilen bir arıza talebi formudur. Talepler yöneticinin panelinde açık, işlemde ve kapandı olarak izlenir. Asıl faydası şeffaflıktan çok telefon trafiğinin düşmesi: aynı soruyu yüz daireye tek tek cevaplamak yöneticinin gününü yiyen iştir.",
        },
        {
          q: "Mevcut yönetim programımızla bağlanır mı?",
          a: "Programın dışarıya veri açması gerekiyor. Türkiye'de kullanılan site yönetim yazılımlarının bir kısmında hazır bir bağlantı arayüzü var, bir kısmında yok. İlk görüşmede hangi programı kullandığınızı sorup üreticiyle teyit ediyoruz. Bağlantı yoksa iki yol kalıyor: aidat verisini dönemsel olarak dosyayla aktarmak ya da paneli sıfırdan kurmak. Hangisinin size uygun olduğunu daire sayınıza bakarak söylüyoruz.",
        },
        {
          q: "Yönettiğimiz siteleri referans olarak yazabilir miyiz?",
          a: "Yazabilirsiniz, önünde bir mevzuat engeli yok. Yine de site adını ve fotoğrafını yayınlamadan önce yönetim kurulundan izin almanızı öneriyoruz; bu hukuki bir zorunluluktan çok ilişki gereğidir. İzin alınamayan projeleri 'Ataşehir'de 240 daireli bir konut projesi' gibi isimsiz ama somut biçimde yazıyoruz — sayı, çoğu zaman adın kendisinden daha ikna edici oluyor.",
        },
        {
          q: "Her yönettiğimiz site için ayrı sayfa açalım mı?",
          a: "Hepsi için gerek yok. Ama bölge bazlı sayfalar işe yarıyor: 'Beylikdüzü site yönetimi' gibi aramalar gerçek ve bu aramayı yapan kişi çoğunlukla yönetim değiştirmeye karar vermiş bir kat maliki oluyor. Çalıştığınız ilçeler için ayrı sayfa açıp o bölgedeki referanslarınızı orada göstermek, tek bir 'hizmet bölgelerimiz' listesinden çok daha iyi sonuç veriyor.",
        },
        {
          q: "Site yönetimi web sitesi ne kadar tutar?",
          a: "Hizmet kapsamı, referans projeler ve teklif formu olan bir kurumsal site ₺50.000–85.000 aralığında başlar. Her hizmetin ayrı sayfalandığı, bölge sayfaları ve detaylı teklif formu olan bir site ₺90.000–150.000 aralığındadır. Aidat sorgulama, arıza talebi ve duyuru akışı içeren sakin paneli ile mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Mobil uygulama şart mı?",
          a: "Şart değil. Yönettiğiniz daire sayısı birkaç yüzü geçmiyorsa telefondan tarayıcıyla açılan bir sakin paneli aynı işi görür ve uygulama mağazalarıyla uğraşmazsınız. Uygulamanın gerçekten fark yarattığı yer bildirimdir: aidat hatırlatması, su kesintisi duyurusu ve genel kurul çağrısı sakinin ekranına düştüğünde okunma oranı e-postayla kıyaslanmaz. Binlerce daire yönetiyorsanız bu tek başına yeterli bir gerekçedir.",
        },
        {
          q: "Google'da site yönetimi aramalarında çıkabilir miyiz?",
          a: "Şehir genelinde rekabet sert, ilçe ve semt bazında ise çok daha yumuşak. Bu yüzden stratejiyi çalıştığınız bölgeler üzerine kuruyoruz. Google İşletme Profilinizi de kurar veya düzenleriz; ofis adresiniz üzerinden haritada görünmek kurumsal görünmenin en ucuz yollarından biri. Profil sizin sahipliğinizde kalır, doğrulama adımını adres sizin olduğu için sizin tamamlamanız gerekir.",
        },
        {
          q: "Mevcut sitemizi yenileyebilir misiniz?",
          a: "Evet. Mevcut adresinizdeki içerikleri ve arama motorlarındaki birikiminizi koruyarak yeniden kurar, eski adresleri yenilerine yönlendiririz. Elinizde sakin girişi olan bir yapı varsa mevcut kullanıcıların yeni sisteme nasıl taşınacağını başta netleştiririz.",
        },
      ],
      ctaTitle: "Şirketiniz için bir site kuralım",
      ctaText:
        "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Bu sektörde müşteri neye bakıyor?",
        body: [
          "Yönetim değişikliği kararı genelde bir toplantıda, birkaç şikâyetin üstüne alınır: aidat toplanamıyordur, asansör iki haftadır beklemektedir ya da kimse parasının nereye gittiğini bilmiyordur. Ardından yönetim kurulu üç dört şirket adı toplar ve hepsini tek tek aratır. O aramada karşısına çıkan şey bir kartvizit görselinden ibaretse, şirket listeden sessizce düşer.",
          "İkinci kırılma kapsam sorusunda olur. Kat maliki 'siz tam olarak ne yapıyorsunuz' diye sorduğunda cevap 'her şeyi hallediyoruz' olamaz. Aidat tahsilatı, işletme projesi hazırlığı, personel bordrosu ve SGK, asansör ve hidrofor bakımı, temizlik, güvenlik, peyzaj — bunların hangisi sizin ekibinizde, hangisi taşeronda, hangisi teklife dahil değil? Bunu yazılı gösteren şirket, teklifi konuşmaya bir adım önde başlar.",
          "Üçüncüsü işin devamlılık tarafıdır. Sözleşme imzalandıktan sonra asıl yük sakinlerle iletişimdir: bakiye soranlar, arıza bildirenler, duyuruyu görmeyenler. Bunların tamamı yöneticinin telefonuna düştüğünde şirket büyüdükçe operasyon ağırlaşır ve hizmet kalitesi düşer. Yeni site kazanmak kadar, kazandığınız siteyi elde tutmak da bu iletişimin nereye kurulduğuna bağlıdır.",
        ],
      },
      pricing: {
        title: "Site & Apartman Yönetim Şirketi Web Sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Kurumsal tanıtım sitesi",
            price: "₺50.000 – 85.000",
            timeline: "~1–2 hafta",
            body: "Hizmet kapsamı, referans projeler, ekip tanıtımı ve teklif formu. Tek şehirde çalışan, portföyünü büyütmek isteyen şirketler için yeterli.",
          },
          {
            name: "Teklif odaklı kurumsal site",
            price: "₺90.000 – 150.000",
            timeline: "~2–4 hafta",
            body: "Her hizmet için ayrı sayfa, referans proje kartları, çalıştığınız ilçeler için bölge sayfaları, daire ve blok sayısı soran detaylı teklif formu, sakinler için giriş bağlantısı.",
          },
          {
            name: "Sakin paneli & mobil uygulama",
            price: "₺220.000'den başlayan",
            timeline: "Projeye özel",
            body: "Aidat sorgulama, arıza talebi takibi, duyuru akışı, belge arşivi ve toplantı çağrısı bildirimi. Yönettiğiniz daire sayısı telefonla ve tabloyla taşınmıyorsa.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "İşleyişinizi aksatmayan bir akış kurduk. Sizden toplam birkaç saatlik katılım yetiyor.",
        steps: [
          {
            name: "Tanışma görüşmesi",
            body: "Portföyünüzü, kaç daire yönettiğinizi, hangi hizmetlerin kendi ekibinizde hangilerinin taşeronda olduğunu ve hedeflediğiniz bölgeleri konuşuruz. Üç apartman yöneten bir şirketle beş bin daire yöneten bir şirketin sitesi aynı olmaz. Buradan net bir kapsam ve sabit fiyat çıkar.",
          },
          {
            name: "İçerik ve referanslar",
            body: "Hizmet kapsamı metinlerini birlikte yazarız; bu sektörde en çok kaybettiren şey belirsiz kapsam anlatımıdır. Referans projeleri, daire sayılarını ve yayın izinlerini toplarız, elinizdeki belge ve sertifikaları değerlendiririz.",
          },
          {
            name: "Tasarım ve onay",
            body: "Önce ana sayfayı görürsünüz. Tasarımın işi, siteyi ilk kez açan yönetim kurulu üyesine kurumsal ve şeffaf bir izlenim vermek. Değişiklikler bu aşamada ücretsizdir.",
          },
          {
            name: "Yayın ve teslim",
            body: "Alan adı, güvenlik sertifikası ve Google İşletme Profili bağlantısı dahil yayına alırız. Duyuruları ve referans projeleri kendiniz güncelleyebilmeniz için kısa bir kullanım kaydı bırakırız.",
          },
        ],
      },
      checklist: {
        title:
          "Site & Apartman Yönetim Şirketi Web Sitesi yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Teklif formu sitenin büyüklüğünü soruyor mu?",
            body: "Sadece ad, telefon ve mesaj isteyen bir form size iş değil telefon trafiği getirir. Daire ve blok sayısı, ilçe, mevcut hizmetler ve sözleşme bitiş tarihi sorulduğunda teklifi daha ilk aramada konuşabilirsiniz.",
          },
          {
            title: "Sakin paneli mevcut programınızla konuşuyor mu?",
            body: "Aidat verisini iki ayrı yerde tutmak kısa sürede iki farklı rakama dönüşür. Panel kurulacaksa mevcut yönetim yazılımınızın veri paylaşıp paylaşmadığı ilk günden netleşmeli.",
          },
          {
            title: "Borç bilgisini kim görüyor?",
            body: "Daire bazlı bakiye kişisel veridir; giriş yapan sakin yalnızca kendi dairesini görmelidir. Tüm listeyi herkese açan bir panel, kapı girişine borçlu listesi asmakla aynı sorunu üretir.",
          },
          {
            title: "Referanslar gerçek ve izinli mi?",
            body: "Hiç yönetmediği projeyi referans bölümüne koyan örnekler görüyoruz. Yazdığınız her proje için yönetimden izin alın; yanlış bir referans tek bir telefonla ortaya çıkar.",
          },
          {
            title: "Mobilde gerçekten hızlı mı?",
            body: "Hem teklif arayan kat maliki hem panele giren sakin siteye telefondan giriyor. Teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan açın.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının şirketiniz adına kayıtlı olduğundan emin olun ve sözleşmeye yazdırın.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Property Management Company Website",
      metaDescription:
        "Websites for residential estate and apartment management companies: proposal forms, reference projects and a resident portal. Get a free quote.",
      eyebrow: "For Property Management",
      h1: "Property Management Company Website",
      intro:
        "When a board decides to change management companies, the shortlist is built in a week: three or four names, every one of them searched online. A site that shows what you manage, what your service actually covers and how you report the dues keeps you on that list. Forpus builds sites for residential estate and apartment management companies.",
      shortAnswer: {
        title:
          "What does a property management website include, and what does it cost?",
        body: "A property management website is your own address for setting out what your service covers, showing the estates you already manage and collecting proposal requests. A typical site Forpus builds carries a request form that asks for unit and block counts, a reference projects page, separate service pages spanning dues collection, staff payroll and technical maintenance, a section on reporting and transparency, a resident login link, team and credential pages, a Google Maps link and a fast, mobile-friendly design. A corporate presentation site runs ₺50,000–85,000 and goes live in one to two weeks. A full site with every service on its own page and a working proposal form runs ₺90,000–150,000 over two to four weeks. Once a resident portal with dues lookup, maintenance requests and an announcement feed plus a mobile app are involved, you are looking at a project starting from ₺220,000. The domain and the site are registered in your company's name.",
      },
      benefits: [
        {
          title: "Qualified proposal requests",
          body: "A form that asks for unit and block counts tells you the size of the job before you pick up the phone.",
        },
        {
          title: "Proof through references",
          body: "Show the estates you manage with unit counts and service scope, and stay on the board's shortlist.",
        },
        {
          title: "Residents serve themselves",
          body: "Move dues, announcements and maintenance requests onto the site and the manager's phone stops ringing all day.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Proposal form (units, blocks, services)",
        "Reference projects and service scope",
        "Dues lookup and maintenance requests",
        "Announcement feed and document archive",
        "Resident login and district pages",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can you add dues lookup and maintenance requests for residents?",
          a: "Yes. At its simplest, a resident logs in and sees only their own balance and recent payments, and files a maintenance request with a photo. Requests show up in the manager's panel as open, in progress or closed. The real gain is not transparency but the drop in phone traffic: answering the same question for a hundred units one by one is what eats a manager's day.",
        },
        {
          q: "Does it connect to our existing management software?",
          a: "Your software has to expose its data. Some of the management platforms used in Turkey have a ready interface for this, some do not. We ask which one you use and confirm it with the vendor up front. If there is no connection, two options remain: transferring the dues data periodically by file, or building the portal from scratch. We tell you which fits based on how many units you manage.",
        },
        {
          q: "Can we list the estates we manage as references?",
          a: "Yes, nothing restricts it. We still recommend getting the board's permission before publishing an estate's name or photos — a matter of the relationship rather than the law. Projects without permission go up unnamed but concrete, as in 'a 240-unit residential complex in Ataşehir'; the number usually convinces more than the name does.",
        },
        {
          q: "Do we need a mobile app?",
          a: "Not necessarily. Below a few hundred units, a resident portal opened in a phone browser does the same job without app-store overhead. Where an app genuinely changes things is notifications: dues reminders, water outage notices and meeting invitations land on the screen and get read at a rate email cannot match. Above a few thousand units, that alone justifies it.",
        },
        {
          q: "Can we rank for management searches in our districts?",
          a: "City-wide the competition is hard; district by district it is far softer. So we build the strategy around the areas you actually work in, with a page for each. We also set up or clean up your Google Business Profile so your office shows on the map — one of the cheapest ways to look established.",
        },
        {
          q: "Can you refresh our existing site?",
          a: "Yes. We rebuild while keeping your content and your search-engine history, and redirect the old URLs to the new ones. If you already have a resident login, we settle up front how existing users move to the new system.",
        },
      ],
      ctaTitle: "Let's build a site for your management company",
      ctaText:
        "In a free call we'll clarify what you need and give you a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
  {
    key: "ozelyazilim",
    image: "/generated/personas/ozelyazilim.webp",
    service: "web",
    slug: { tr: "ozel-yazilim-gelistirme", en: "custom-software-development" },
    tr: {
      metaTitle: "Özel Yazılım Geliştirme — Panel, CRM, ERP",
      metaDescription:
        "Panel, CRM ve ERP için özel yazılım geliştirme. Sipariş, müşteri, stok ve ödeme tek sistemde. Kapsam baştan yazılı, kaynak kod sizin. Ücretsiz teklif alın.",
      eyebrow: "Panel, CRM ve ERP",
      h1: "Özel Yazılım Geliştirme",
      intro:
        "Hazır programlar işi bir yere kadar taşır. Kendi akışınız hazır bir şablona sığmadığında sistemi işe değil, işi sisteme uydurmaya başlarsınız; özel yazılım bu noktada gerekir. Siparişten ekip atamasına, müşteri takibinden (CRM) stok ve maliyet planlamasına (ERP) kadar süreci kendi çalışma biçiminize göre kuran paneller geliştiriyoruz. Temizlik Express'in sipariş, ekip ataması, ödeme ve yönetim panelinden oluşan canlı operasyon sistemini; DoldurKabı'nın platform, panel ve mobil uygulamasını bu şekilde kurduk.",
      shortAnswer: {
        title: "Özel yazılım ne demek, ne kadar tutar?",
        body: "Özel yazılım, işletmenin kendi çalışma biçimine göre sıfırdan yazılan bir panel, CRM veya ERP sistemidir. CRM müşteri ve satış kayıtlarının tutulduğu, ERP ise stok, sipariş, üretim ve muhasebenin tek yerde birleştiği sistemin adıdır. Hazır programda süreç yazılıma uydurulur; özel yazılımda yazılım sürece uydurulur. Fark pratikte şurada görünür: hazır programın kullanmadığınız bölümü için de ödersiniz, ihtiyacınız olan tek ekranı ise hiç ekleyemezsiniz. Forpus'un yazdığı sistemler arasında Temizlik Express'in siparişi, ekip atamasını ve ödemeyi yürüten operasyon sistemi ile DoldurKabı'nın platformu ve yönetim paneli var. Fiyat üç bantta toplanıyor. Tek bir işi baştan sona yürüten bir panel — teklif takibi, saha ekibi ataması, stok — ₺250.000–400.000 aralığındadır ve dört ila altı haftada teslim edilir. Sipariş, müşteri, ödeme ve raporlamanın tek yerde toplandığı bir işletme sistemi ₺450.000–700.000 aralığındadır ve iki ila dört ayda kurulur. Birden çok tarafın kullandığı, dış sistemlerle konuşan bir platform ₺800.000'den başlar; süresi kapsama göre belirlenir. Kaynak kod müşteriye teslim edilir: sistemi başka bir ekiple sürdürmek isterseniz elinizde her şey olur. Kapsam işe başlamadan yazılır; ilk sürümde neyin olmayacağı da aynı belgede yer alır. Tüm fiyatlar KDV hariçtir.",
      },
      benefitsTitle: "Özel yazılım işinize ne kazandırır?",
      benefits: [
        {
          title: "İş akışınıza göre",
          body: "Sistem sizin çalışma biçiminize uyar; süreci hazır bir programın kabul ettiği şekle sokmak zorunda kalmazsınız.",
        },
        {
          title: "Tek yerde toplanır",
          body: "Sipariş, müşteri, ekip ve ödeme aynı panelde durur; Excel dosyaları ile WhatsApp grupları arasında veri taşımak biter.",
        },
        {
          title: "Kaynak kod sizin",
          body: "Sistem sizin mülkünüz olur; yarın başka bir ekiple sürdürmek isterseniz elinizde her şey bulunur.",
        },
      ],
      featuresTitle: "Özel yazılımda neler geliştiriyoruz?",
      features: [
        "Yönetim paneli ve raporlama ekranları",
        "Müşteri ve satış takibi (CRM)",
        "Sipariş, iş emri ve ekip atama akışı",
        "Stok, satın alma ve maliyet takibi (ERP)",
        "Rol bazlı kullanıcı ve yetki yönetimi",
        "Ödeme, e-fatura ve muhasebe entegrasyonu",
        "Mevcut sistemlerle entegrasyon (API, veri aktarımı)",
        "Saha ekibi için mobil uygulama",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
        {
          q: "Özel yazılım yaptırmak ne kadar tutar?",
          a: "Tek bir işi çözen bir panel — sipariş takibi, saha ekibi yönetimi, üretim kaydı gibi — ₺250.000–400.000 aralığında başlar. Birden fazla bölümün aynı sistemde çalıştığı bir işletme sistemi ₺450.000–700.000 bandındadır. Dış sistemlerle konuşan, çok taraflı bir platform ₺800.000'den başlar. Sitedeki ₺50.000'lik taban fiyat web sitesi işleri içindir; özel yazılım onun üstünde bir kademedir ve tüm fiyatlar KDV hariçtir.",
        },
        {
          q: "Ne kadar sürede kullanmaya başlarız?",
          a: "Tek işlevli bir panel 4–6 haftada devreye girer. İşletme sistemi 2–4 ay sürer, ama bu sürenin sonunu beklemezsiniz: ilk çalışan bölüm erken elinize geçer ve kullanmaya oradan başlarsınız. Süreyi en çok uzatan şey teknik zorluk değil, yol ortasında değişen kapsamdır; bu yüzden ilk sürümde neyin olmayacağını da baştan yazıya dökeriz.",
        },
        {
          q: "Hazır bir program almak yerine neden özel yazılım?",
          a: "Hazır program çoğu iş için doğru tercihtir; işiniz standart yürüyorsa ona para verin, bunu söylemekten çekinmeyiz. Özel yazılım, işin akışını programa uydurmak zorunda kaldığınızda ya da üç ayrı programın arasında veriyi elle taşıdığınızda anlam kazanır. Temizlik Express'te sipariş alma, ekip atama, ödeme ve yönetim tek sistemde birleşti; o akışın karşılığı hazır bir üründe yoktu. Ayrıca kullanıcı başına aylık ödeme yapmazsınız, ekip büyüdükçe maliyet artmaz.",
        },
        {
          q: "Kaynak kod bende mi kalır?",
          a: "Evet. Kaynak kod, veri tabanı ve teknik dokümantasyon size teslim edilir; sunucu ve hesaplar sizin adınıza açılır. Sistemi başka bir ekiple sürdürmek isterseniz elinizde eksik bir parça olmaz. Bu, sözleşmede yazılı olarak yer alır.",
        },
        {
          q: "Mevcut verilerimiz taşınır mı?",
          a: "Taşınır. Excel dosyaları, kullandığınız programın dışa aktarımı ya da eski veri tabanı — hangisi varsa oradan aktarılır. Taşımadan önce hangi alanların geleceğini, hangilerinin geride kalacağını birlikte kararlaştırırız; yıllardır biriken kayıtların bir kısmı çoğu zaman zaten kullanılmıyordur. Aktarımdan sonra kayıtları örnekleyerek kontrol eder, eski sistemi bir süre yedekte tutarız.",
        },
        {
          q: "Muhasebe ve e-fatura sistemimize bağlanır mı?",
          a: "Kullandığınız muhasebe programının veya e-fatura sağlayıcısının dışarıya açtığı bir bağlantı varsa bağlanır; fatura ve cari bilgisi iki sistem arasında elle girilmeden akar. Bazı programlar böyle bir bağlantı vermez, o zaman dosya üzerinden aktarım kurar ya da sınırın nerede olduğunu baştan söyleriz. Hangi programı kullandığınızı ilk görüşmede sorarız, çünkü bu cevabı tahminle vermeyiz.",
        },
        {
          q: "Mobil uygulaması da olur mu?",
          a: "Olur. Sahada çalışan ekibiniz varsa genellikle de gerekir: iş emrini telefonda görmek, fotoğraf eklemek ve işi kapatmak masaüstünden yürümez. DoldurKabı'nda platform, yönetim paneli ve mobil uygulama aynı sistem üzerinde çalışıyor. Mobil tarafı ilk sürüme koymak da sonraya bırakmak da mümkün; kararı, kimin nerede çalıştığına bakarak veririz.",
        },
        {
          q: "Ekibimiz kullanmayı öğrenebilir mi?",
          a: "Sistemi kullanacak kişiyi tasarım aşamasında görmeye çalışırız; ekranlar, o kişinin işi bugün nasıl yaptığına göre kurulur. Teslimde eğitim yapar, sık kullanılan işlerin kısa bir kullanım kaydını bırakırız. İlk haftalarda takıldığınız yerler olur; bunlar çoğunlukla ekranda yapılan küçük düzeltmelerle çözülür ve devreye alma sürecinin normal bir parçasıdır.",
        },
        {
          q: "Siz bırakırsanız ne olur?",
          a: "Yazılımı yaptırdığınız yere bağımlı kalmak gerçek bir risktir; sorulmasını doğru buluyoruz. Kaynak kod, veri tabanı ve teknik dokümantasyon sizde durur; sunucu ve hesaplar sizin adınıza açılır, yani sistem bizden bağımsız çalışmaya devam eder. Başka bir ekip devraldığında kodu okuyup sürdürebilir — dokümantasyonu teslimin bir parçası saymamızın sebebi bu. Ayrılma noktasında bir devir toplantısı yapar, elimizde ne varsa aktarırız.",
        },
      ],
      ctaTitle: "Kendi sisteminizi konuşalım",
      ctaText:
        "Mevcut akışınızı kısa bir görüşmede birlikte çıkaralım; kapsamı, süreyi ve sabit fiyatı yazılı olarak verelim.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "İşiniz büyüdü, sisteminiz büyümedi",
        body: [
          "Her işletme aynı yerden başlar: birkaç Excel dosyası, bir WhatsApp grubu ve işi bilen birkaç kişi. Bu düzen belli bir büyüklüğe kadar çalışır. Sonra iş hacmi artar, ekip büyür ve bilginin tamamı artık tek bir yerde durmaz; bir işin nerede kaldığını öğrenmek için birini aramak gerekir. Kritik bilgi kimin aklındaysa, o kişi izne çıktığında iş de onunla birlikte durur.",
          "Bunun üzerine çoğu işletme hazır bir program dener. Hazır programlar ortalama bir işletme düşünülerek yazılır; sizin işinizi ayıran şey — fiyatlama biçiminiz, onay sıranız, sahadaki o fazladan adım — genelde o ortalamanın dışında kalır. Ekip bir süre sonra programın yarısını boş bırakır, gerçek takibi yine kenarda tuttuğu bir dosyadan yapar. İşleyiş programa uydurulmaya çalışıldıkça ikisi de yarım kalır.",
          "Üçüncü aşamada her yeni ihtiyaç için ayrı bir araç alınır: teklif için biri, saha takibi için biri, muhasebe için bir başkası. Hiçbiri diğerini görmediğinden aynı bilgi üç ayrı yere elle girilir ve üçünde farklı kalır. Ay sonunda ne satıldığını, hangi işin kâr ettiğini görmek isteyen kişi, tabloyu yine elle birleştirir. Buradaki asıl maliyet aboneliklerin toplamı değil, o birleştirmeye giden zaman ve orada yapılan hatadır.",
        ],
      },
      pricing: {
        title: "Özel yazılım geliştirme fiyatları",
        lead: 'Özel yazılımın fiyatı sorulduğunda alışılmış cevap "projeye göre değişir" olur; doğrudur ama karar vermenize yaramaz. Aşağıdaki üç bant 2026 için geçerli başlangıç rakamlarıdır ve işinizin hangi büyüklükte olduğunu görüşmeden önce görmeniz için yazılmıştır.',
        tiers: [
          {
            name: "Tek işlevli panel",
            price: "₺250.000 – 400.000",
            timeline: "~4–6 hafta",
            body: "Tek bir işi baştan sona yürüten panel: teklif takibi, randevu ve iş emri, stok hareketi ya da müşteri kaydı. Kullanıcı rolleri, yetki ayrımı, listeleme, arama ve temel raporlarla gelir. Bir sürecin Excel dosyalarıyla yürütüldüğü ve dosyanın artık yetmediği işletmeler için.",
          },
          {
            name: "İşletme sistemi",
            price: "₺450.000 – 700.000",
            timeline: "~2–4 ay",
            body: "Birbirine bağlı birkaç sürecin tek sistemde toplanması: müşteri ve satış takibi, operasyon, faturalama, personel ve yönetim raporları. Verinin bir kez girildiği, her rolün kendi ekranını gördüğü ve yöneticinin durumu tek yerden okuduğu bir yapı kurulur. Bölümlerin ayrı dosyalarla çalıştığı, aynı bilgiyi birkaç yere ikinci kez girdiği şirketler için.",
          },
          {
            name: "Platform ve entegrasyon",
            price: "₺800.000'den başlayan",
            timeline: "Projeye özel",
            body: "Dışarıya açılan sistemler: müşterinin veya bayinin kendi hesabıyla girdiği platform, aynı veriyi paylaşan mobil uygulama ile panel; muhasebe, e-fatura, kargo ya da banka tarafıyla veri alışverişi. Bu kademedeki işler tek teslimde bitmez; yayına girdikten sonra da geliştirilmeye devam eder. Yazılımın işin yardımcısı değil kendisi olduğu şirketler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsama, rol ve ekran sayısına, bağlanacak dış sistemlere göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — teklifteki kapsam değişmedikçe faturaya sonradan kalem eklenmez, kapsam değişirse yeni fiyatı önce yazılı veririz. Tüm fiyatlar KDV hariçtir.",
      },
      caseRef: {
        title: "Temizlik Express: sipariş, ekip ve ödeme tek sistemde",
        body: "Temizlik Express'in müşteriden gelen siparişi alması, ekibi atayıp yönlendirmesi, ödemeyi tahsil etmesi ve tüm işi yönetim panelinden takip etmesi aynı sistemin içinde yürüyor. Hazır bir programla kurulamayacak bir akış olduğu için sıfırdan yazıldı.",
        projectSlug: "temizlikexpress",
        linkLabel: "İşi incele",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Bu tür projelerde işi zora sokan şey teknik zorluk değil, işin nasıl yürüdüğünün eksik anlaşılmasıdır. Bu yüzden süreç boyunca sizden düzenli ama kısa katılım isteriz; her aşamanın sonunda elinizde deneyebileceğiniz bir şey olur.",
        steps: [
          {
            name: "Keşif ve kapsam yazımı",
            body: "İşin bugün nasıl yürüdüğünü konuşuruz: hangi bilgi nereye giriliyor, hangi dosya kimde duruyor, hangi adımda tıkanıyor. Buradaki en değerli iş, ilk sürüme neyin girmeyeceğine karar vermektir; kapsamın yol boyunca büyümesi bu projelerde gecikmenin bir numaralı sebebidir. Çıktı: yazılı kapsam, ekran listesi ve sabit fiyat.",
          },
          {
            name: "Akış ve ekran tasarımı",
            body: "Hangi rolün hangi ekranı göreceğini ve veriyi hangi sırayla gireceğini tasarlarız. Tıklanabilir bir taslak veririz; sistemi, kod yazılmadan önce işi fiilen yapan kişi dener. Değişiklik yapmanın en ucuz olduğu an burasıdır.",
          },
          {
            name: "Geliştirme ve ara teslimler",
            body: "Sistemi bölüm bölüm geliştirir, düzenli aralıklarla çalışan bir sürüm açarız. Test hesabınızla kendi tarayıcınızdan girer, biten bölümü kendi verinizin bir kopyasıyla denersiniz. Yanlış anlaşılmış bir akış teslimde değil, o hafta ortaya çıkar.",
          },
          {
            name: "Veri göçü ve eğitim",
            body: "Excel dosyalarında veya eski programda duran müşteri, stok ve geçmiş kayıtlar yeni sisteme aktarılır; aktarımdan önce hangi alanın nereye gideceğini birlikte kontrol ederiz. Ardından ekibe kendi ekranları üzerinden kısa bir eğitim verir, eğitimin kaydını bırakırız — sonradan işe giren personel aynı kaydı izler.",
          },
          {
            name: "Yayın ve bakım",
            body: "İlk dönemde eski yöntem ile yeni sistem bir süre birlikte yürür; sistem oturmadan kimseyi arada bırakmayız. Yayınla birlikte kaynak kod size teslim edilir, sunucu ve yedekleme kurulur. Sonrasında hata takibi, güncelleme ve yeni bölüm geliştirme, sözleşmede yazılı koşullarla sürer.",
          },
        ],
      },
      checklist: {
        title: "Özel yazılım yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Bu bütçedeki bir işte yanlış kararın bedeli yüksek; teklif aldığınız her firmaya aynı soruları sorun.",
        items: [
          {
            title: "Bu işi hazır bir program çözer mi?",
            body: "Bazen çözer; o zaman doğrusu hazır programdır. Ön muhasebe, e-fatura, standart stok takibi ve klasik satış takibi için olgun paketler var; abonelikle bugün kullanmaya başlarsınız ve maliyeti bu sayfadaki ₺250.000'lik alt kademenin çok altında kalır. Özel yazılım, süreciniz hiçbir pakete oturmuyorsa, iki programın arasını Excel'le elle kapatıyorsanız ya da o süreç işinizin ayırt edici tarafıysa anlamlı olur. Teklif aldığınız firmaya hangi hazır programa baktığını ve neden yetmediğini sorun; cevabı yoksa bakmamıştır.",
          },
          {
            title: "Kaynak kod ve hesaplar kimin adına?",
            body: "Sözleşmede kaynak kodun size teslim edileceği yazmalı. Sunucu, veritabanı ve alan adı hesapları da doğrudan şirketiniz adına açılmalı; başka bir firmanın hesabında duran sisteme yıllar sonra erişmek zahmetli olur. Günlük işinizi yürüten bir panelde bu madde bir web sitesindekinden çok daha ağır basar: sistem durduğunda iş durur.",
          },
          {
            title: "Kapsam yazılı mı, ilk sürümde ne yok?",
            body: 'İyi bir teklif neyin yapılacağı kadar neyin yapılmayacağını da yazar. Panel ve ERP işlerinde kapsam sessizce büyür; her "bir de şu olsa" ya bütçeye ya takvime yazılır. İlk sürümde olmayan maddeleri baştan listeletin, sonraki sürüme bırakılanları da yazdırın — böylece ne aldığınız ve neyi ne zaman alacağınız ortada olur.',
          },
          {
            title: "Mevcut veriniz nasıl taşınacak?",
            body: "Yıllardır Excel'de, eski bir programda ya da defterde duran kayıtlarınız var. Bu verinin aktarılması ayrı bir iştir: fiyata dahil mi, veriyi kim temizleyecek, hangi alanlar taşınmayacak — üçü de baştan konuşulmalı. Canlıya geçmeden önce deneme aktarımı yapılmasını ve bir süre eski sistemle birlikte çalışılmasını isteyin; veri kaybı en çok bu geçişte olur.",
          },
          {
            title: "Bir yıl sonra sistemi kim sürdürecek?",
            body: "Her gün kullanılan bir panel canlı bir şeydir: yeni rapor istenir, vergi oranı değişir, yeni bir rol eklenir. Bakım koşulları, dönüş süresi ve değişiklik taleplerinin nasıl fiyatlanacağı sözleşmede yazılı olsun. Bir de şunu sorun: kodu başka bir ekip devralabilir mi? Bunun karşılığı kaynak kodun yanında kurulum ve yapı belgelerinin de teslim edilmesidir.",
          },
          {
            title: "Veri nerede duruyor, kim görebiliyor?",
            body: "Müşteri ve çalışan bilgisi tutan her sistem KVKK kapsamındadır; verinin sorumlusu sizsiniz, yazılımı yapan firma veri işleyen tarafta kalır ve aranızda yazılı bir sözleşme bulunması kanunun aradığı bir zorunluluktur. Sunucunun nerede olduğunu, yedeğin hangi sıklıkta alındığını ve yedekten geri dönüşün hiç denenip denenmediğini sorun. Panelin içinde de her kullanıcı her şeyi görmemeli; rol bazlı yetki ve kimin neye baktığının kaydı baştan istenmeli.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Custom Software Development — Panels, CRM, ERP",
      metaDescription:
        "Custom software for panels, CRM and ERP. Orders, customers, stock and payments in one system. Scope in writing, source code yours. Get a free quote.",
      eyebrow: "Panels, CRM and ERP",
      h1: "Custom Software Development",
      intro:
        "Off-the-shelf software carries a business up to a point. Once your own workflow no longer fits the template, you stop shaping the software around the work and start shaping the work around the software. That is where custom software earns its cost. We build panels that follow how you already operate — from orders and team assignment to customer tracking (CRM) and stock and cost planning (ERP). Temizlik Express runs on a live operations system we built this way: orders, team assignment, payment and an admin panel. DoldurKabı runs on a platform with its own panel and mobile app.",
      shortAnswer: {
        title: "What is custom software, and what does it cost?",
        body: "Custom software is a panel, CRM or ERP written from scratch around the way a business actually works. CRM is the system that holds customer and sales records; ERP is the one that brings stock, orders, production and accounting together in a single place. With an off-the-shelf product the process is bent to fit the software; with custom software the software is written to fit the process. The difference shows up like this: you pay for the parts of the package you never use, and the one screen you do need cannot be added at all. Among the systems Forpus has built are the operations system that runs orders, team assignment and payment for Temizlik Express, and the platform and admin panel behind DoldurKabı. Pricing falls into three bands. A panel that runs one job end to end — quote tracking, field team assignment, stock — costs ₺250,000 – 400,000 and is delivered in four to six weeks. A business system that brings orders, customers, payments and reporting into one place costs ₺450,000 – 700,000 and takes two to four months. A platform that several parties use and that talks to outside systems starts from ₺800,000, with the timeline set by scope. The source code is handed over: if you decide to carry the system on with another team, you have everything you need. Scope is written down before work begins, and what the first version will not include is set out in the same document. All prices exclude VAT.",
      },
      benefitsTitle: "What does custom software give you?",
      benefits: [
        {
          title: "Built around your workflow",
          body: "The system follows how you work. You are not forced to bend your process into the shape an off-the-shelf tool accepts.",
        },
        {
          title: "Everything in one place",
          body: "Orders, customers, teams and payments sit in the same panel. Carrying data between spreadsheets and WhatsApp groups stops.",
        },
        {
          title: "The source code is yours",
          body: "The system is your property. If you carry on with another team tomorrow, everything they need is already in your hands — the code, the database and the documentation.",
        },
      ],
      featuresTitle: "What we build",
      features: [
        "Admin panel and reporting screens",
        "Customer and sales tracking (CRM)",
        "Orders, work orders and team assignment",
        "Stock, purchasing and cost tracking (ERP)",
        "Role-based users and permissions",
        "Payment, e-invoice and accounting integrations",
        "Integration with your existing systems (API, data transfer)",
        "Mobile app for field teams",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "What does custom software cost?",
          a: "A panel that solves one job — order tracking, field team management, production records — starts in the ₺250,000 – 400,000 range. A business system, where several parts of the company work inside the same system, sits at ₺450,000 – 700,000. A multi-sided platform that talks to outside systems starts at ₺800,000. The ₺50,000 floor quoted elsewhere on this site is for website work; custom software is a step above it. All prices exclude VAT.",
        },
        {
          q: "How soon can we start using it?",
          a: "A single-purpose panel goes live in four to six weeks. A business system takes two to four months, but you do not wait for the end of that: the first working section reaches you early and you can start using it right away. What stretches a timeline is rarely technical difficulty — it is scope that changes halfway through. That is why what the first version will not include is put in writing at the start.",
        },
        {
          q: "Why build custom software instead of buying an off-the-shelf program?",
          a: "For most businesses an off-the-shelf program is the right choice; if your work runs the standard way, pay for that, and we will say so. Custom software earns its cost when you have to bend the way you work to fit the program, or when you are moving data by hand between three separate programs. At Temizlik Express, order intake, team assignment, payment and management came together in one system; no off-the-shelf product covered that flow. You also do not pay per user per month, so the cost does not climb as the team grows.",
        },
        {
          q: "Do we own the source code?",
          a: "Yes. The source code, the database and the technical documentation are handed over to you, and the servers and accounts are opened in your name. If you decide to continue with another team, nothing is missing on your side. This is written into the contract.",
        },
        {
          q: "Can our existing data be moved over?",
          a: "It can. Excel files, an export from the program you use today, or an old database — whichever you have is where it comes from. Before the move we decide together which fields come across and which stay behind; a good part of the records built up over the years is usually no longer in use. After the transfer we sample the records and check them, and the old system stays in reserve for a while.",
        },
        {
          q: "Will it connect to our accounting and e-invoice system?",
          a: "If the accounting program or e-invoice provider you use exposes a connection, it will; invoice and account data then moves between the two systems without being typed in twice. Some programs offer no such connection. In that case we set up a file-based transfer, or tell you at the start where the limit is. We ask which program you use in the first conversation, because it is not an answer we are willing to guess at.",
        },
        {
          q: "Can it have a mobile app as well?",
          a: "It can, and if you have a team in the field it usually needs one: seeing the work order on a phone, adding a photo and closing the job do not work from a desktop. At DoldurKabı the platform, the admin panel and the mobile app run on the same system. Mobile can go into the first version or come later; the decision follows from who works where.",
        },
        {
          q: "Can our team learn to use it?",
          a: "We try to meet the person who will actually use the system while it is still being designed; the screens are built around how that person does the job today. At handover we run training and leave a short recording of the tasks used most often. There will be points where you get stuck in the first weeks. Those are usually solved with small corrections on the screen and are a normal part of going live.",
        },
        {
          q: "What happens if you stop working with us?",
          a: "Being dependent on whoever built your software is a real risk, and it is fair to ask about it. The source code, the database and the technical documentation stay with you; the servers and accounts are opened in your name, so the system keeps running without us. Another team can read the code and carry it on — that is why documentation counts as part of the handover, not an extra. At the point of separation we hold a handover meeting and hand over everything we have.",
        },
      ],
      ctaTitle: "Let's talk about your own system",
      ctaText:
        "In a short call we'll map your current workflow together, then give you the scope, the timeline and a fixed price in writing.",
      ctaButton: "Get a Free Quote",

      problem: {
        title: "Your business grew, your systems didn't",
        body: [
          "Every business starts the same way: a few spreadsheets, a WhatsApp group and a handful of people who know how the work runs. That setup holds up to a certain size. Then volume rises, the team grows, and no single place holds the whole picture any more; to find out where a job stands, someone has to make a call. When a critical detail lives only in one person's head, the work goes on leave with them.",
          "The usual next step is off-the-shelf software. Off-the-shelf tools are written for an average company, and the things that make your work yours — how you price, the order your approvals follow, that extra step out in the field — tend to fall outside that average. After a while the team leaves half the fields empty and keeps the real tracking in a file off to the side. The more the work is bent to fit the software, the less either one does its job.",
          "The third stage is a separate tool for every new need: one for quotes, one for field tracking, another for accounting. None of them can see the others, so the same record is typed in three places and ends up different in all three. At month end, whoever wants to know what was sold and which jobs made money merges the numbers by hand. The real cost is not the subscriptions added up. It is the hours that merge takes and the mistakes made inside it.",
        ],
      },
      pricing: {
        title: "Custom software development pricing",
        lead: 'Ask what custom software costs and the usual answer is "it depends on the project". That is true, and it helps you decide nothing. The three bands below are starting figures for 2026, written so you can place your own job on the scale before we ever speak.',
        tiers: [
          {
            name: "Single-purpose panel",
            price: "₺250,000 – 400,000",
            timeline: "~4–6 weeks",
            body: "One job handled end to end in a single panel: quote tracking, appointments and work orders, stock movements, or a customer register. It comes with user roles, permission levels, listing, search and basic reports. The right size when a process still runs on Excel files and the file has stopped keeping up.",
          },
          {
            name: "Business system",
            price: "₺450,000 – 700,000",
            timeline: "~2–4 months",
            body: "Several connected processes brought into one system: customers and sales, operations, invoicing, staff and management reports. Data is entered once, each role sees its own screens, and the manager reads the current state from one place. For companies where departments work from separate files and the same information gets typed in a second time somewhere else.",
          },
          {
            name: "Platform and integrations",
            price: "From ₺800,000",
            timeline: "Project-specific",
            body: "Systems that open outward: a platform your customers or dealers log into with their own accounts, a mobile app and an admin panel sharing the same data, and data exchange with accounting, e-invoicing, shipping or banking. Work at this level does not finish at a single handover; it keeps being developed after it goes live. For companies where the software is the business, not an aid to it.",
          },
        ],
        note: "These are starting bands. The figure moves with scope, with the number of roles and screens, and with the outside systems you connect to. At the end of the call you get a fixed-price quote broken down line by line — as long as the agreed scope does not change, nothing is added to the bill later; if the scope changes we put the new price in writing first. All prices exclude VAT.",
      },
      caseRef: {
        title: "Temizlik Express: orders, teams and payment in one system",
        body: "Temizlik Express takes the customer's order, assigns and dispatches the team, collects payment and tracks the whole job from an admin panel — all inside the same system. The flow could not be built on an off-the-shelf product, so it was written from scratch.",
        projectSlug: "temizlikexpress",
        linkLabel: "See the project",
      },
      process: {
        title: "How we work",
        lead: "What makes these projects hard is rarely the technical side; it is an incomplete picture of how the work actually runs today. So we ask for regular but short involvement from you throughout, and at the end of every stage there is something you can try yourself.",
        steps: [
          {
            name: "Discovery and written scope",
            body: "We go through how the work runs now: where each piece of information gets entered, who holds which file, and at which step things jam. The most valuable decision made here is what stays out of the first version; scope growing along the way is the number one cause of delay in these projects. Output: a written scope, a screen list and a fixed price.",
          },
          {
            name: "Flows and screen design",
            body: "We design which role sees which screen and in what order data gets entered. You get a clickable draft, and the person who actually does the job tries the system before any code is written. This is the cheapest point at which to change something.",
          },
          {
            name: "Development and interim releases",
            body: "We build the system section by section and open a working version at regular intervals. You log in from your own browser with a test account and try the finished part against a copy of your own data. A flow we got wrong surfaces that week, not at handover.",
          },
          {
            name: "Data migration and training",
            body: "Customer, stock and historical records sitting in Excel files or an old program are moved into the new system; before the transfer we check together which field goes where. Then we run a short training session for your team on their own screens and leave the recording behind — anyone who joins later watches the same recording.",
          },
          {
            name: "Launch and maintenance",
            body: "For the first stretch the old method and the new system run side by side; nobody is left in between while the system settles. At launch the source code is handed over to you, and the server and backups are set up. After that, bug tracking, updates and new sections continue on terms written into the contract.",
          },
        ],
      },
      checklist: {
        title: "What should you check before commissioning custom software?",
        lead: "These points are worth knowing whether or not you work with us. At this budget the wrong decision is expensive, so ask every firm you get a quote from the same questions.",
        items: [
          {
            title: "Would an off-the-shelf product solve this?",
            body: "Sometimes it would, and then off-the-shelf is the right answer. Bookkeeping, e-invoicing, standard stock control and ordinary sales tracking are covered by mature packages you can subscribe to and start using today, at a cost well below the ₺250,000 entry tier on this page. Custom software earns its price when your process fits no package, when you are bridging two programs by hand in Excel, or when that process is the part of the business that sets you apart. Ask the firm quoting you which packaged product they looked at and why it fell short. If there is no answer, they never looked.",
          },
          {
            title: "Whose name are the source code and the accounts in?",
            body: "The contract should state that the source code is handed over to you. The server, database and domain accounts should be opened directly in your company's name; reaching a system that sits in another firm's account becomes difficult years later. On a panel that runs your daily work this weighs far more than it does on a website: when the system stops, the work stops.",
          },
          {
            title:
              "Is the scope written down, and what is missing from the first version?",
            body: 'A good quote states what will not be built as plainly as what will. Scope grows quietly on panel and ERP work; every "and could it also do this" lands on either the budget or the calendar. Have the items left out of the first version listed at the start, and have anything deferred written down as belonging to a later release. Then you know what you are buying, and what arrives when.',
          },
          {
            title: "How does your existing data get moved?",
            body: "Your records sit in Excel, in an old program, or in a ledger. Moving them is a job of its own: is it included in the price, who cleans the data, which fields will not come across — settle all three up front. Ask for a trial migration before go-live and for a period of running the old system alongside the new one. Data goes missing in this handover more than anywhere else.",
          },
          {
            title: "Who keeps the system running a year from now?",
            body: "A panel used every day is a living thing: a new report gets asked for, a tax rate changes, a new role is added. Put maintenance terms, response times and the pricing of change requests in the contract. Then ask one more question: could another team take the code over? Answering yes means the setup and architecture documentation is handed over alongside the source code.",
          },
          {
            title: "Where does the data sit, and who can see it?",
            body: "Any system holding customer and employee records falls under KVKK, Turkey's data protection law. You are the data controller; the firm building the software sits on the processor side, and a written agreement between the two of you is something the law asks for. Ask where the server is, how often backups are taken, and whether restoring from a backup has ever been tested. Inside the panel, not every user should see everything either — ask for role-based permissions and a record of who looked at what from the start.",
          },
        ],
      },
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
      shortAnswer: {
        title: "Mobil uygulama yaptırmak ne içerir, ne kadar tutar?",
        body: "Mobil uygulama geliştirme, bir fikrin tasarımdan mağaza yayınına kadar iOS ve Android'de çalışır hale getirilmesidir. Forpus tek kod tabanıyla çalışır: iki platform için ayrı ekip kurulmaz, bu yüzden ayrı ayrı ödemezsiniz. Tipik bir projede UI/UX tasarımı ve tıklanabilir prototip, iOS ile Android geliştirme, içeriği yönettiğiniz bir panel ve kullanıcı sistemi, bildirim, ödeme ve harita entegrasyonları, App Store ile Google Play yayını, yayın sonrası bakım bulunur. İlk sürüm — yani fikri doğrulayacak kadar özellik taşıyan bir MVP — ₺250.000–400.000 aralığında ve altı ila on haftada mağazaya çıkar. Tam kapsamlı bir uygulama ₺450.000–800.000 aralığında ve üç ila beş ayda tamamlanır. Uzun soluklu bir platform kuruyorsanız ₺800.000'den başlayan bir projeden söz ediyoruz. Mağaza hesapları sizin adınıza açılır; uygulama sizin mülkünüz olur. Kaynak kod size teslim edilir; uygulamayı başka bir ekiple sürdürmek isterseniz elinizde her şey olur. İlk sürümde neyin OLMADIĞI da yazılı olarak kararlaştırılır — kapsamın yol boyunca büyümesi, mobil projelerde gecikmenin bir numaralı sebebidir.",
      },
      benefitsTitle: "Mobil uygulama işinize ne kazandırır?",
      benefits: [
        {
          title: "iOS + Android tek seferde",
          body: "Modern teknolojiyle iki platforma birden yayın; maliyet ve süre yarı yarıya.",
        },
        {
          title: "Fikirden mağazaya",
          body: "Tasarım, geliştirme, test ve App Store / Google Play yayını — hepsi tek ekipte.",
        },
        {
          title: "Panelli, ölçeklenir sistem",
          body: "Kullanıcı yönetimi, bildirim ve yönetim paneliyle büyümeye hazır bir altyapı.",
        },
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
        {
          q: "Hem iOS hem Android çıkar mı?",
          a: "Evet. Tek kod tabanıyla her iki platforma birden yayınlar, süre ve maliyetten tasarruf ederiz.",
        },
        {
          q: "Uygulamayı mağazada siz mi yayınlıyorsunuz?",
          a: "Evet. App Store ve Google Play hesap kurulumundan yayına kadar süreci biz yönetiriz.",
        },
        {
          q: "Fikrim var ama teknik bilmiyorum, olur mu?",
          a: "Tam da bunun için varız. Fikri birlikte netleştirir, uçtan uca hayata geçiririz.",
        },
        {
          q: "Mobil uygulama yaptırmak ne kadar tutar?",
          a: "Fikrin en sade çalışan hali olan bir ilk sürüm ₺250.000–400.000 aralığında, yaklaşık 6–10 haftada yayına çıkar. Ödeme, harita, bildirim ve çok rollü kullanıcı sistemi olan tam kapsamlı bir uygulama ₺450.000–800.000 bandındadır. Pazaryeri gibi karmaşık platformlar ₺800.000'den başlar. Kesin rakam özellik listesi netleştiğinde belli olur.",
        },
        {
          q: "iOS ve Android için ayrı ayrı mı ödeyeceğim?",
          a: "Hayır. Tek kod tabanıyla geliştiriyoruz; aynı geliştirmeden iki platform da çıkıyor. Bu yaklaşım maliyeti neredeyse yarıya indiriyor ve iki platformun aynı anda güncellenmesini sağlıyor. Yalnızca çok özel donanım gereksinimleri olan projelerde ayrı geliştirme gerekir.",
        },
        {
          q: "Uygulamayı mağazada yayınlamayı da siz mi yapıyorsunuz?",
          a: "Evet, uçtan uca. Mağaza metinleri, ekran görüntüleri, gizlilik formları ve başvuru sürecinin tamamını biz yürütürüz. Apple veya Google ret verirse gerekçeyi çözer, düzeltip yeniden göndeririz. Hesaplar sizin adınıza açılır, sahiplik her zaman sizde kalır.",
        },
        {
          q: "Ne kadar sürede yayına çıkarım?",
          a: "İlk sürüm için 6–10 hafta gerçekçi bir süredir. Kapsam büyüdükçe bu 3–5 aya çıkar. Süreyi en çok uzatan şey teknik zorluk değil, karar değişiklikleridir; bu yüzden kapsamı baştan netleştirmeye bu kadar önem veriyoruz.",
        },
        {
          q: "Yayından sonra destek veriyor musunuz?",
          a: "Evet. İşletim sistemi güncellemeleri ve mağaza kuralları değiştikçe uygulamanın bakımı gerekir; bakımsız bir uygulama bir yıl içinde çalışmaz hale gelebilir. Bakım ve destek koşullarını sözleşmede net yazarız.",
        },
        {
          q: "Yazılım bilmiyorum, süreci takip edebilir miyim?",
          a: "Evet, müşterilerimizin çoğu yazılımcı değil. Teknik terimlerle konuşmuyoruz; her aşamada telefonunuzda gezebileceğiniz somut bir çıktı veriyoruz. Prototipi ilk haftalarda elinize alıyorsunuz.",
        },
      ],
      ctaTitle: "Uygulama fikrinizi konuşalım",
      ctaText:
        "Fikrinizi kısa bir görüşmede netleştirip yol haritası ve net bir teklif sunalım.",
      ctaButton: "Ücretsiz Teklif Al",

      problem: {
        title: "Fikriniz var, yazılım ekibiniz yok",
        body: [
          "Uygulama fikri olan çoğu kişinin takıldığı yer teknik değil, başlangıçtır. Kime sorulacağı, ne kadar tutacağı ve nereden başlanacağı belirsizdir; bu belirsizlik yüzünden iyi fikirler yıllarca beklemede kalır.",
          "İkinci tuzak fazla büyük başlamaktır. Aklınızdaki tüm özellikleri ilk sürüme koymak, maliyeti üçe katlar ve lansmanı aylarca geciktirir. Üstelik kullanıcının hangi özelliği gerçekten kullanacağını lansmandan önce bilemezsiniz.",
          "Bizim yaklaşımımız şu: fikri en sade çalışan haliyle yayına almak, gerçek kullanıcıdan veri toplamak ve büyümeyi o veriye göre yapmak. DoldurKabı ve Temizlik Express bu şekilde ilerledi.",
        ],
      },
      pricing: {
        title: "Mobil uygulama geliştirme fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "MVP / ilk sürüm",
            price: "₺250.000 – 400.000",
            timeline: "~6–10 hafta",
            body: "Fikrin en sade çalışan hali: temel akış, kullanıcı girişi, yönetim paneli ve iki mağazada yayın. Fikri gerçek kullanıcıyla test etmek için doğru başlangıç.",
          },
          {
            name: "Tam kapsamlı uygulama",
            price: "₺450.000 – 800.000",
            timeline: "~3–5 ay",
            body: "Çok rollü kullanıcı sistemi, ödeme, harita, bildirim ve gerçek zamanlı özellikler. Kapsamlı yönetim paneli ve analitik. Ürünü asıl işi yapacak hale getirmek için.",
          },
          {
            name: "Platform / uzun soluklu ürün",
            price: "₺800.000'den başlayan",
            timeline: "Projeye özel",
            body: "Çok taraflı pazaryeri, karmaşık iş akışları, dış sistem entegrasyonları ve sürekli geliştirme. Uygulamanın işin kendisi olduğu projeler için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur. Tüm fiyatlar KDV hariçtir.",
      },
      caseRef: {
        title: "Yaptığımız uygulama",
        body: "DoldurKabı, Türkiye'nin hayvanseverler platformu: sahiplendirme, kayıp ilanı, veteriner ve mama noktası haritası. Hem web hem mobil tarafını uçtan uca biz kurduk ve App Store ile Google Play'de yayınladık. Temizlik Express'te ise hizmet talebinden ödeme akışına kadar tüm süreci uygulamaya taşıdık. İkisi de fikirden mağazaya bizim ellerimizden geçti.",
        projectSlug: "doldurkabi",
        linkLabel: "Uygulamalarımıza bakın",
      },
      process: {
        title: "Nasıl ilerliyoruz?",
        lead: "Uygulama projeleri diğer işlerden farklı yürür; her aşamada çalışan bir şey görürsünüz.",
        steps: [
          {
            name: "Keşif ve kapsam",
            body: "Fikri, hedef kullanıcıyı ve asıl çözülecek problemi konuşuruz. Buradaki en değerli iş, ilk sürüme neyin girmeyeceğine karar vermektir. Çıktı: net özellik listesi ve sabit fiyat.",
          },
          {
            name: "Tasarım ve prototip",
            body: "Ekranları tasarlar, tıklanabilir bir prototip veririz. Uygulamayı kod yazılmadan önce telefonunuzda gezersiniz; değişiklik yapmanın en ucuz olduğu an burasıdır.",
          },
          {
            name: "Geliştirme",
            body: "iOS ve Android'i tek kod tabanıyla geliştiririz; iki ayrı ekip maliyeti ödemezsiniz. Süreç boyunca düzenli olarak test sürümü yükler, ilerlemeyi kendi telefonunuzdan takip edersiniz.",
          },
          {
            name: "Mağaza yayını ve sonrası",
            body: "App Store ve Google Play başvurularını, gerekli metin ve görselleri biz hazırlarız; ret gelirse düzeltmeleri de biz yaparız. Yayından sonra hata takibi ve güncelleme desteği devam eder.",
          },
        ],
      },
      checklist: {
        title: "Mobil uygulama yaptırırken nelere dikkat etmeli?",
        lead: "Bu maddeler bizden iş almasanız da işinize yarar. Teklif aldığınız her ajansa aynı soruları sorun.",
        items: [
          {
            title: "Kaynak kod kime ait?",
            body: "Sözleşmede kaynak kodun ve tüm hesapların size ait olduğu yazmalı. Aksi halde ajans değiştirmek istediğinizde uygulamanız rehin kalır; bu sektörde en çok yaşanan mağduriyet budur.",
          },
          {
            title: "Mağaza hesapları sizin adınıza mı?",
            body: "Apple Developer ve Google Play hesapları sizin veya şirketiniz adına açılmalı. Ajansın hesabından yayınlanan uygulamayı taşımak zahmetli, bazen imkânsızdır.",
          },
          {
            title: "İlk sürümde ne yok?",
            body: "İyi bir ajans neyi yapmayacağını da söyler. Aklınızdaki her özelliği ilk sürüme koymayı kabul eden bir teklif, ya maliyeti şişirir ya da lansmanı sürüncemede bırakır.",
          },
          {
            title: "Yayın sonrası ne oluyor?",
            body: "Uygulama yayınlanınca iş bitmez: işletim sistemi güncellemeleri, hata düzeltmeleri ve mağaza kuralları sürekli bakım gerektirir. Destek koşulları yazılı olsun.",
          },
          {
            title: "Tek kod tabanı mı, iki ayrı mı?",
            body: "Çoğu iş için tek kod tabanıyla iki platforma çıkmak hem daha ucuz hem daha hızlıdır. İki ayrı native uygulama öneriliyorsa neden gerektiğini sorun.",
          },
          {
            title: "Test sürümünü görebiliyor musunuz?",
            body: "Süreç boyunca uygulamayı kendi telefonunuzda deneyemiyorsanız, teslimde sürprizle karşılaşırsınız. Düzenli test sürümü verilmesini şart koşun.",
          },
        ],
      },
    },
    en: {
      metaTitle: "Mobile App Development",
      metaDescription:
        "Mobile app development for iOS and Android. From idea to store: design, development, admin panel and publishing. End-to-end. Get a free quote.",
      eyebrow: "Mobile Apps",
      h1: "Mobile App Development",
      intro:
        "A good idea gains value when it lives in the user's pocket. We build fast, smooth apps for iOS and Android from a single codebase, handling everything from design to store release. We've shipped real products like DoldurKabı and Temizlik Express.",
      shortAnswer: {
        title:
          "What does mobile app development involve, and what does it cost?",
        body: "Mobile app development takes an idea from design to store release on both iOS and Android. Forpus works from a single codebase, so you do not hire two teams and you do not pay twice. A typical project covers UI/UX design and a clickable prototype, iOS and Android development, an admin panel and user system, integrations for notifications, payment and maps, App Store and Google Play release, and post-launch maintenance. A first version — an MVP carrying just enough to prove the idea — runs ₺250,000–400,000 and reaches the stores in six to ten weeks. A full-scope app runs ₺450,000–800,000 and takes three to five months. A long-lived platform starts at ₺800,000. Store accounts are opened in your name and the source code is handed over, so the app is yours. What the first version will not include is agreed in writing.",
      },
      benefits: [
        {
          title: "iOS + Android at once",
          body: "Ship to both platforms with modern tech; cost and time cut roughly in half.",
        },
        {
          title: "From idea to store",
          body: "Design, development, testing and App Store / Google Play release — all in one team.",
        },
        {
          title: "Scalable, panel-driven",
          body: "A foundation ready to grow with user management, notifications and an admin panel.",
        },
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
        {
          q: "Do you ship both iOS and Android?",
          a: "Yes. With a single codebase we release to both platforms, saving time and cost.",
        },
        {
          q: "Do you publish the app to the stores?",
          a: "Yes. We manage the process from App Store and Google Play account setup to release.",
        },
        {
          q: "I have an idea but no technical background — is that ok?",
          a: "That's exactly what we're here for. We clarify the idea together and build it end to end.",
        },
      ],
      ctaTitle: "Let's talk about your app idea",
      ctaText:
        "In a short call we'll clarify your idea and give you a roadmap and a clear quote.",
      ctaButton: "Get a Free Quote",
    },
  },
];

/**
 * Anahtardan çözüme. `solutionIndex` ile eşleşme dosyanın sonundaki derleme
 * kontrolüyle garanti; çağıranlar bulunamama hâlini ele almak zorunda değil.
 */
const ANAHTARA_GORE = new Map(solutions.map((s) => [s.key, s]));

export const solutionByKey = (key: string) => ANAHTARA_GORE.get(key);

export function solutionByTrSlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug.tr === slug);
}
export function solutionByEnSlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug.en === slug);
}

// Language pickers shared by the landing pages, footer and SEO helpers.
export const contentOf = (s: Solution, lang: "tr" | "en") =>
  lang === "tr" ? s.tr : s.en;
export const slugOf = (s: Solution, lang: "tr" | "en") =>
  lang === "tr" ? s.slug.tr : s.slug.en;

// Shared chrome strings for the solution pages (page content lives per-solution above).
/**
 * Sektör sayfalarının içeriği en son bu tarihte elden geçti.
 *
 * İki yer okuyor: `app/sitemap.ts` (lastmod) ve `SolutionArticle` (Service
 * şemasındaki `dateModified`). Sitemap'te sabit olarak duruyordu, şema ise
 * hiç tarih taşımıyordu — yapay zekâ aramalarında 3 aydan yeni içerik
 * belirgin biçimde daha çok alıntılanıyor ve tarihsiz sayfa o yarışa hiç
 * girmiyor.
 *
 * İÇERİĞİ GERÇEKTEN DEĞİŞTİRDİĞİNDE BU TARİHİ GÜNCELLE. Build zamanı
 * kullanmak yanlış olur: her deploy "değişti" der, sinyal değersizleşir.
 */
export const SOLUTIONS_LASTMOD = "2026-08-31";

// ============================================================================
// Build zamanı tutarlılık kontrolleri
//
// Bu repoda test koşucusu yok. Aşağıdaki kontroller modül yüklenirken çalışır,
// yani `next build` sırasında. Bir şey tutmazsa build patlar — sessizce bozuk
// bir sayfa yayına çıkmaz.
// ============================================================================

/**
 * Her sektörün her dili. Aşağıdaki kontroller bunun üstünde geziyor.
 *
 * Aynı iki dilli döngü dört kontrolde ayrı ayrı yazılmıştı ve varyantları
 * ayrışmıştı — biri hata mesajına dili yazıyor, biri yazmıyordu. Yeni kontrol
 * eklerken kopyalanacak bir kalıp kalmasın diye tek yere alındı.
 */
const HER_DIL = solutions.flatMap((s) => [
  { s, dil: "tr" as const, c: s.tr },
  { s, dil: "en" as const, c: s.en },
]);

// 1) Hafif indeks (istemci tarafı) ile içerik burada senkron kalmalı.
{
  const idx = new Set(solutionIndex.map((r) => r.key));
  const full = new Set(solutions.map((s) => s.key));
  for (const k of full) {
    if (!idx.has(k))
      throw new Error(`solutions: "${k}" lib/solution-index.ts içinde yok`);
  }
  for (const k of idx) {
    if (!full.has(k))
      throw new Error(`solution-index: "${k}" lib/solutions.ts içinde yok`);
  }
  for (const r of solutionIndex) {
    const s = solutionByKey(r.key)!;
    if (s.slug.tr !== r.slug.tr || s.slug.en !== r.slug.en) {
      throw new Error(`solutions: "${r.key}" slug'ı indeksle uyuşmuyor`);
    }
    // `image` iki dosyada da elle yazılıyor ve İKİSİ de okunuyor: sayfa hero'su
    // içerikteki değeri (SolutionArticle), pill şeridi indekstekini. Ayrışırsa
    // sayfa ile şerit farklı görsel gösterir ve hiçbir şey uyarmazdı.
    if (s.image !== r.image) {
      throw new Error(`solutions: "${r.key}" görseli indeksle uyuşmuyor`);
    }
  }
}

// 2) caseRef gerçek bir projeye işaret etmeli. Proje silindiğinde (H&N Yapı'da
//    olduğu gibi) ilgili bölüm sessizce kaybolmasın, build uyarsın.
{
  const known = new Set(webProjects.map((p) => p.slug));
  for (const { s, dil, c } of HER_DIL) {
    if (c.caseRef && !known.has(c.caseRef.projectSlug)) {
      throw new Error(
        `solutions: "${s.key}" (${dil}) → bilinmeyen proje "${c.caseRef.projectSlug}"`,
      );
    }
  }
}

// 3) Sitede ilan edilen taban fiyatın altında HİÇBİR rakam geçmemeli.
//    Ana sayfa meta açıklaması ve Paketler bölümü "₺50.000'den başlayan" diyor.
//
//    Kontrol önce yalnızca `pricing.tiers[0]`a bakıyordu ve düz metni hiç
//    okumuyordu. Ölçüldü: beş SSS cevabı tabanın altında rakam veriyordu —
//    üçü ₺40.000, ikisi ₺45.000. Restoran sayfası kendi içinde çelişiyordu:
//    kısa cevabı ₺50.000–80.000 derken SSS'i aynı iş için ₺40.000 diyordu.
//    Fiyat sorusuna iki farklı cevap veren bir sayfa, güveni fiyattan önce
//    kaybediyor.
//
//    Artık sayfanın TÜM metni taranıyor: kısa cevap, SSS, faydalar, problem,
//    süreç, kontrol listesi ve fiyat bantları. Türkçe binlik ayracı nokta,
//    İngilizce virgül; ikisi de yakalanıyor.
{
  for (const { s, dil, c } of HER_DIL) {
    // Alan alan gezmek yerine tüm içeriği tek dizede tarıyoruz: `SolutionContent`
    // on ikiden fazla alan taşıyor ve elle yazılan bir alan listesi her yeni
    // alanda sessizce eksik kalırdı — kontrolün ilk hâlinin hatası tam buydu,
    // yalnız `pricing.tiers[0]`a bakıyordu.
    for (const n of fiyatlariOku(JSON.stringify(c))) {
      if (n < PRICE_FLOOR) {
        throw new Error(
          `solutions: "${s.key}" (${dil}) metninde ₺${n.toLocaleString("tr-TR")} geçiyor. ` +
            `Site "₺${PRICE_FLOOR.toLocaleString("tr-TR")}'den başlayan" diyor; bu rakam onun altında. ` +
            `Gerçekten proje fiyatı değilse (aylık bakım, reklam bütçesi gibi) ₺ işaretsiz yazın.`,
        );
      }
    }
  }
}

/**
 * caseRef → proje birleşimi.
 *
 * Bileşen her render'da `webProjects.find()` yapıp sonucu koşullu çiziyordu
 * (`{c.caseRef && caseProject && ...}`) — yani yukarıdaki kontrolün zaten
 * imkânsız kıldığı bir duruma karşı ölü bir dal. Birleşimi kontrolün yanına
 * alıyoruz; bileşenin arama yapması gerekmiyor.
 */
export const caseRefProject = (c: SolutionContent) =>
  c.caseRef
    ? webProjects.find((p) => p.slug === c.caseRef!.projectSlug)!
    : undefined;

// 4) Mevzuat kısıtı olan sektörlerde yasaklı vaatler.
//
// NEDEN BURADA: Bu, depodaki tek "doğruluk kuralı"ydı ki derleyicisi yoktu, ve
// elle tarama iki kez üst üste yarım kaldı — veteriner girdisinin Türkçesi
// düzeltilip İngilizcesi atlandı, sonra aynı şey diş hekimi ve diyetisyende
// tekrarlandı. Kural insanın gözünde kalınca sektör başına iki dil taramak
// gerekiyor ve biri mutlaka kaçıyor.
//
// NEDEN ÖZELLİKLE `features` VE fayda başlıkları: `features` süs değil.
// SolutionArticle onu SektorBrief'e geçiriyor, orada teklif formunda
// KUTUCUĞA dönüşüyor ve seçilen metin panele yazılı talep olarak düşüyor.
// Yani "Hasta yorumları" bir kutucukken, hekime yasak olan modülü sipariş
// listesinde sunmuş oluyorduk.
//
// CEZANIN MUHATABI MÜŞTERİDİR, biz değiliz — bu yüzden kontrol uyarı değil,
// build'i durduran bir hata.
const MEVZUAT_SEKTORLERI: Record<string, "saglik" | "veteriner" | "meslek"> = {
  doktor: "saglik",
  dishekimi: "saglik",
  diyetisyen: "saglik",
  psikolog: "saglik",
  veteriner: "veteriner",
  avukat: "meslek",
  musavir: "meslek",
  sacekimi: "saglik",
  fizyoterapi: "saglik",
  huzurevi: "saglik",
  gumruk: "meslek",
};

// Güzellik bilerek DIŞARIDA: kozmetik bakım tarafında kampanya ve yorum
// serbest, yalnız medikal estetik işlemleri kısıt altında. İkisi tek girdide
// olduğu için kaba bir kalıp yanlış yakalar; nüans o sayfanın SSS'inde duruyor.

{
  const YASAK =
    /yorum|puan|review|rating|testimonial|kampanya|indirim|campaign|discount|vitrin|storefront|showcase/i;
  const MEVZUAT_SSS =
    /mevzuat|reklam yasa|tanıtım kural|meslek etiği|etik kural|advertis|restriction/i;

  // Yasak modül ve vaat taraması: her dilde ayrı ayrı, çünkü kusur iki kez
  // yalnız bir dilde düzeltilip diğeri atlanarak oluştu.
  for (const { s, dil, c } of HER_DIL) {
    if (!(s.key in MEVZUAT_SEKTORLERI)) continue;

    for (const f of c.features) {
      if (YASAK.test(f)) {
        throw new Error(
          `solutions: "${s.key}" (${dil}) mevzuat kısıtlı bir sektör ama features içinde "${f}" var. ` +
            `Bu metin teklif formunda kutucuğa dönüşüyor; müşteriye yasak olan bir modülü sipariş edilebilir kılma.`,
        );
      }
    }
    for (const b of c.benefits) {
      if (YASAK.test(b.title)) {
        throw new Error(
          `solutions: "${s.key}" (${dil}) fayda başlığı "${b.title}" mevzuat kısıtlı sektörde vaat edilemez.`,
        );
      }
    }
  }

  // Kısıtın ANLATILDIĞI yer yalnız Türkçe sayfa; bu yüzden dil döngüsünün
  // içinde değil, sektör başına bir kez. Müşteri kuralı bizden öğrenmezse
  // rakip ajanstan hiç öğrenmiyor.
  for (const s of solutions) {
    if (!(s.key in MEVZUAT_SEKTORLERI)) continue;
    if (!s.tr.faq.some((f) => MEVZUAT_SSS.test(f.q) || MEVZUAT_SSS.test(f.a))) {
      throw new Error(
        `solutions: "${s.key}" mevzuat kısıtlı bir sektör ama Türkçe SSS'inde kısıtı anlatan bir soru yok.`,
      );
    }
  }
}

// 5) Meta açıklaması arama sonucunda kesilmemeli.
//
// Google açıklamayı ~160 karakterde kesiyor. Ölçtük: 82 açıklamanın 14'ü
// bunu aşıyordu ve hepsinde kesilen kısım aynı şeydi — sondaki "Ücretsiz
// teklif alın." / "Get a free quote." çağrısı. Yani tıklamayı isteyen cümle,
// tam da tıklanacak yerde görünmüyordu.
//
// Kontrol burada, çünkü sınır bir yazım tercihi değil ölçülebilir bir eşik ve
// sektör eklerken kimse karakter saymıyor. 42 sektöre çıkarken 22 açıklama
// tek turda yazıldı; gözle tutulabilecek bir kural değil.
{
  const SINIR = 160;
  for (const { s, dil, c } of HER_DIL) {
    if (c.metaDescription.length > SINIR) {
      throw new Error(
        `solutions: "${s.key}" (${dil}) meta açıklaması ${c.metaDescription.length} karakter — ` +
          `arama sonucunda ${SINIR}'ta kesilir, sondaki çağrı görünmez.`,
      );
    }
  }
}
