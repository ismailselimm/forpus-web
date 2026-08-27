// SEO landing pages ("çözümler" / solutions). Each targets a high-intent, lower-competition
// search (e.g. "doktor web sitesi") in both TR and EN. Rendered as static HTML so Google can
// index the copy. Routes: /cozumler/[slug] (tr) and /en/solutions/[slug] (en).
import type { ServiceKey } from "./services";
import { solutionIndex } from "./solution-index";
import { webProjects } from "./projects";
import { PRICE_FLOOR } from "./pricing";

/**
 * Kısa cevap bloğunun içeriği. Blog yazıları da aynı bloğu kullandığı için
 * tip burada dışa açık: `lib/blog.ts` bunu `import type` ile alıyor, yani
 * çalışma zamanında hiçbir şey taşınmıyor — bu dosya sektör başına 900+
 * kelime içeriyor ve istemci paketine asla girmemeli.
 */
export type KisaCevapIcerigi = { title: string; body: string };

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
   */
  shortAnswer?: KisaCevapIcerigi;

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
        note: "Bu rakamlar başlangıç bandıdır; sayfa sayısı, içerik üretimi ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        "Hasta yorumları ve bilgilendirme blogu",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        "Patient reviews and info blog",
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
        "Diyetisyenlere özel web sitesi ve online randevu. Danışan çeken, mobil uyumlu, Google'da bulunan bir dijital vitrin. Ücretsiz teklif alın.",
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
          title: "Danışan çeken vitrin",
          body: "Yaklaşımınızı ve sonuçlarınızı öne çıkaran bir tasarımla ilk izlenimi kazanın.",
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
        "Danışan yorumları bölümü",
        "Mobil uyumlu, hızlı tasarım",
        "Google ve sosyal medya bağlantıları",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
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
            body: "Tek veya az sayfalı, sıcak bir dijital vitrin. Hakkınızda, çalışma yönteminiz, paketler ve WhatsApp yönlendirmesi. Yeni başlayan diyetisyenler için yeterli.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
      benefits: [
        {
          title: "A storefront that converts",
          body: "Win the first impression with a design that highlights your approach and results.",
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
        "Client testimonials section",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        body: "E-ticaret sitesi kurmak, ürünlerinizi pazaryeri komisyonu ödemeden kendi adresinizde sattığınız bir vitrin ve arka uç kurmak demektir. Forpus'un kurduğu tipik bir e-ticaret sitesinde varyantlı ürün kataloğu, sepet ve güvenli ödeme entegrasyonu, kargo ile fatura akışları, indirim ve kupon sistemi, mobil uyumlu hızlı bir vitrin ve Google Alışveriş'i de kapsayan SEO ayarları bulunur. Hazır bir altyapı üzerine kurulum ₺80.000–140.000 aralığında ve iki ila üç haftada yayına girer; ürün sayınız azsa ve akışınız standartsa genellikle doğru başlangıç budur. Markanıza özel tasarlanmış, kendi akışlarınıza göre kurgulanmış bir e-ticaret sitesi ₺150.000–280.000 aralığında ve dört ila yedi haftada tamamlanır. Özel yazılım, ERP ya da pazaryeri entegrasyonu gerekiyorsa ₺350.000'den başlayan bir projeden söz ediyoruz. Mevcut ürünleriniz toplu aktarımla taşınır. Ödeme altyapısı sizin şirketiniz adına açılır, para doğrudan sizin hesabınıza geçer. Mesafeli satış sözleşmesi, iptal-iade ve gizlilik metinleri teslimle birlikte hazır gelir. Reklam ölçümü kurulmadan yayına alınmaz: hangi ürünün hangi reklamdan satıldığını göremezseniz bütçe kör harcanır.",
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
          a: "Yaygın bir altyapı üzerine markanıza uyarlanmış bir mağaza ₺80.000 bandında başlar. Tamamen size özel tasarlanmış, kampanya ve varyant yapısı kurgulanmış bir e-ticaret sitesi ₺150.000–280.000 aralığındadır. ERP entegrasyonu, bayi fiyatlandırması veya mobil uygulama işin içine girdiğinde ₺350.000'den başlayan bir projeden söz ediyoruz.",
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
            price: "₺350.000'den başlayan",
            timeline: "Projeye özel",
            body: "ERP veya muhasebe entegrasyonu, bayi ve toptan fiyatlandırma, abonelik satışı, mobil uygulama. Standart altyapıların yetmediği operasyonlar için.",
          },
        ],
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
          a: "Dijital menü ve mekân tanıtımı odaklı bir site ₺40.000 bandında başlar. Online rezervasyon, çok dilli menü ve kampanya bölümü olan bir site ₺80.000–140.000 aralığındadır. Kendi sipariş ve teslimat sisteminiz işin içine girdiğinde ₺200.000'den başlayan bir projeden söz ediyoruz.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
          a: "Tek sayfalık, sizi anlatan güçlü bir site ₺40.000 bandında başlar. Hizmetlerin ayrı sayfalandığı, blog ve bülten altyapılı bir marka sitesi ₺80.000–130.000 aralığındadır. Kurs veya üyelik satışı işin içine girdiğinde ₺180.000'den başlayan bir projeden söz ediyoruz.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
          a: "Hizmet listesi, galeri ve WhatsApp yönlendirmeli bir tanıtım sitesi ₺40.000 bandında başlar. Online randevu formu ve stilist yönlendirmeli bir site ₺80.000–130.000 aralığındadır. Takvimli randevu yönetimi ve mobil uygulama işin içine girdiğinde ₺180.000'den başlayan bir projeden söz ediyoruz.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        "Dostlarının sağlığı söz konusu olunca sahipler aceleyle en yakın ve en güvenilir kliniği arıyor. Sıcak, güven veren ve randevuya yönlendiren bir site, kliniğinizi öne çıkarır. Forpus veteriner kliniklerine özel siteler tasarlıyor.",
      shortAnswer: {
        title: "Veteriner klinik web sitesi ne içerir, ne kadar tutar?",
        body: "Veteriner klinik web sitesi, hizmetlerinizi anlattığınız, nöbet ve acil bilgisini duyurduğunuz ve randevu aldığınız kendi adresinizdir. Forpus'un kurduğu tipik bir klinik sitesinde aşı, cerrahi ve check-up gibi hizmetler için ayrı sayfalar, online randevu ile WhatsApp yönlendirmesi, ilk ekranda görünen acil iletişim ve nöbet bilgisi, ekip ile klinik tanıtımı, Google harita bağlantısı ve çalışma saatleri, mobil uyumlu hızlı bir tasarım bulunur. Klinik tanıtımına odaklı bir site ₺50.000–85.000 aralığında ve bir ila iki haftada yayına girer. Randevunun siteden alındığı, hizmetlerin ayrı ayrı anlatıldığı tam bir klinik sitesi ₺90.000–150.000 aralığında ve iki ila dört haftada tamamlanır. Randevu ve hasta kayıt sistemi işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz. Acil arayan sahip için en kritik bilgi telefondur; ilk ekrana konur. Alan adı ve site sizin adınıza kaydedilir; çalışma saatlerini ve nöbet günlerini panelden kendiniz güncellersiniz. Google İşletme Profili bağlantısı teslimde kurulur — \"en yakın veteriner\" aramalarının neredeyse tamamı haritadan geliyor.",
      },
      benefitsTitle: "Veteriner web sitesi kliniğinize ne kazandırır?",
      benefits: [
        {
          title: "Acil erişim",
          body: "Adres, telefon ve nöbet bilgisi tek dokunuşta; sahip vakit kaybetmeden ulaşsın.",
        },
        {
          title: "Güven veren vitrin",
          body: "Ekip, hizmet ve klinik tanıtımıyla sahibin içini rahatlatın.",
        },
        {
          title: "Google'da bulunun",
          body: "'Yakınımdaki veteriner' aramalarında ve haritada öne çıkın.",
        },
      ],
      featuresTitle: "Veteriner sitenizde neler olur?",
      features: [
        "Hizmet sayfaları (aşı, cerrahi, check-up)",
        "Online randevu / WhatsApp",
        "Acil iletişim ve nöbet bilgisi",
        "Ekip ve klinik tanıtımı",
        "Google harita ve çalışma saatleri",
        "Mobil uyumlu, hızlı tasarım",
      ],
      faqTitle: "Sık sorulan sorular",
      faq: [
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
          a: "Hizmet, ekip ve acil iletişim odaklı bir tanıtım sitesi ₺50.000 bandında başlar. Her hizmetin ayrı sayfalandığı, bilgilendirme blogu ve randevu yönlendirmeli bir klinik sitesi ₺90.000–150.000 aralığındadır. Takvimli randevu ve hasta kayıt sistemi işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
        },
        {
          q: "Aşı hatırlatma sistemi kurabilir misiniz?",
          a: "Evet, kliniklerin en çok fayda gördüğü özelliklerden biri. Hayvanın aşı tarihini sisteme girdiğinizde, zamanı geldiğinde sahibe otomatik SMS veya e-posta gider. Bu hem hayvan sağlığı için iyi hem de kliniğe düzenli hasta dönüşü sağlar. Hasta kayıt sistemi kapsamında kurulur.",
        },
        {
          q: "Google Haritalar'da öne çıkmama yardım eder misiniz?",
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
          "Kendi siteniz olmadığında bu iki senaryoda da haritadaki kısa bilgiye ve yorumlara mahkûm kalırsınız. Nöbet saatleriniz, uzmanlık alanlarınız ve kliniğin sıcaklığı hiçbir yerde görünmez.",
        ],
      },
      pricing: {
        title: "Veteriner web sitesi fiyatları",
        lead: "Fiyatı görüşmede söyleyen ajanslara alışkınsınız. Biz bandı baştan yazıyoruz ki vaktinizi boşa harcamayalım. Aşağıdaki aralıklar 2026 için geçerli başlangıç rakamlarıdır.",
        tiers: [
          {
            name: "Klinik tanıtım sitesi",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        "Website and online booking for veterinary clinics and pet health. Trustworthy, mobile-friendly design that ranks on Google. Get a free quote.",
      eyebrow: "For Vets",
      h1: "Veterinary Clinic Website",
      intro:
        "When a pet's health is on the line, owners urgently look for the nearest, most trustworthy clinic. A warm, reassuring site that drives bookings puts your clinic first. Forpus builds sites for veterinary clinics.",
      benefits: [
        {
          title: "Reachable in an emergency",
          body: "Address, phone and on-call info in one tap so owners reach you without losing time.",
        },
        {
          title: "A reassuring storefront",
          body: "Put owners at ease with your team, services and clinic showcase.",
        },
        {
          title: "Get found on Google",
          body: "Stand out in 'vet near me' searches and on the map.",
        },
      ],
      featuresTitle: "What's included?",
      features: [
        "Service pages (vaccines, surgery, check-ups)",
        "Online booking / WhatsApp",
        "Emergency contact and on-call info",
        "Team and clinic showcase",
        "Google map and opening hours",
        "Fast, mobile-friendly design",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
          a: "Kategorili galeriler ve iletişim odaklı bir portfolyo sitesi ₺45.000 bandında başlar. Her çekimin kendi seri sayfası olduğu, paket ve rezervasyon formu bulunan bir site ₺85.000–150.000 aralığındadır. Müşteri galerisi ve teslim sistemi işin içine girdiğinde ₺200.000'den başlayan bir projeden söz ediyoruz.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
          a: "Paket, galeri ve deneme dersi formu olan bir tanıtım sitesi ₺45.000 bandında başlar. Ders programı takvimi ve antrenör profilleri bulunan bir site ₺90.000–150.000 aralığındadır. Online üyelik satışı, ders rezervasyonu ve mobil uygulama işin içine girdiğinde ₺220.000'den başlayan bir projeden söz ediyoruz.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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
        note: "Bu rakamlar başlangıç bandıdır; kapsam ve entegrasyonlara göre değişir. Görüşmenin sonunda kalem kalem, sabit fiyatlı bir teklif alırsınız — sonradan eklenen sürpriz kalem yoktur.",
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

export function solutionByTrSlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug.tr === slug);
}
export function solutionByEnSlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug.en === slug);
}

// Short sector labels for the compact link index (pills on the homepage). Keyed by
// solution.key; falls back to the page h1 when a key is missing.
export const sectorName: Record<string, { tr: string; en: string }> = {
  doktor: { tr: "Doktor", en: "Doctor" },
  dishekimi: { tr: "Diş Hekimi", en: "Dentist" },
  diyetisyen: { tr: "Diyetisyen", en: "Dietitian" },
  psikolog: { tr: "Psikolog", en: "Psychologist" },
  avukat: { tr: "Avukat", en: "Lawyer" },
  emlak: { tr: "Emlak", en: "Real Estate" },
  eticaret: { tr: "E-Ticaret", en: "E-Commerce" },
  restoran: { tr: "Restoran & Kafe", en: "Restaurant & Cafe" },
  kisiselmarka: { tr: "Kişisel Marka", en: "Personal Brand" },
  kuafor: { tr: "Kuaför & Berber", en: "Hair & Barber" },
  guzellik: { tr: "Güzellik & Estetik", en: "Beauty & Aesthetics" },
  veteriner: { tr: "Veteriner", en: "Veterinary" },
  mimar: { tr: "Mimar & İç Mimar", en: "Architect" },
  musavir: { tr: "Mali Müşavir", en: "Accountant" },
  fotografci: { tr: "Fotoğrafçı", en: "Photographer" },
  spor: { tr: "Spor Salonu", en: "Gym & Trainer" },
  mobil: { tr: "Mobil Uygulama", en: "Mobile App" },
};

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
export const SOLUTIONS_LASTMOD = "2026-08-27";

export const solutionUi: Record<
  "tr" | "en",
  {
    home: string;
    more: string;
    moreLead: string;
    seeAll: string;
    islerEyebrow: string;
    /** "%s" sektör etiketiyle değişiyor. */
    islerBaslik: string;
    islerLead: string;
    isiIncele: string;
    yazilarBasligi: string;
    yazilarLead: string;
  }
> = {
  tr: {
    home: "Ana Sayfa",
    more: "Diğer çözümler",
    moreLead:
      "Başka bir alanda mı çalışıyorsunuz? Size uygun çözümü birlikte bulalım.",
    seeAll: "Tüm hizmetleri gör",
    islerEyebrow: "Gerçek işler",
    islerBaslik: "%s tarafında yaptığımız işler",
    islerLead:
      "Ekran görüntüsü değil, canlı siteler. Her birinin neye ihtiyaç duyduğunu ve ne kurduğumuzu ayrı ayrı yazdık.",
    isiIncele: "İşi incele",
    yazilarBasligi: "Karar vermeden önce",
    yazilarLead:
      "Bu alanda en çok sorulan şeyleri ayrı ayrı yazdık — fiyat, süreç ve dikkat edilecekler.",
  },
  en: {
    home: "Home",
    more: "Other solutions",
    moreLead:
      "Working in a different field? Let's find the right fit together.",
    seeAll: "See all services",
    islerEyebrow: "Real work",
    islerBaslik: "What we built for %s clients",
    islerLead:
      "Live sites, not mockups. We wrote up what each one needed and what we built.",
    isiIncele: "See the project",
    yazilarBasligi: "Before you decide",
    yazilarLead:
      "We wrote up the questions that come up most — pricing, process and what to watch for.",
  },
};

// ============================================================================
// Build zamanı tutarlılık kontrolleri
//
// Bu repoda test koşucusu yok. Aşağıdaki kontroller modül yüklenirken çalışır,
// yani `next build` sırasında. Bir şey tutmazsa build patlar — sessizce bozuk
// bir sayfa yayına çıkmaz.
// ============================================================================

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
    const s = solutions.find((x) => x.key === r.key)!;
    if (s.slug.tr !== r.slug.tr || s.slug.en !== r.slug.en) {
      throw new Error(`solutions: "${r.key}" slug'ı indeksle uyuşmuyor`);
    }
  }
}

// 2) caseRef gerçek bir projeye işaret etmeli. Proje silindiğinde (H&N Yapı'da
//    olduğu gibi) ilgili bölüm sessizce kaybolmasın, build uyarsın.
{
  const known = new Set(webProjects.map((p) => p.slug));
  for (const s of solutions) {
    for (const c of [s.tr, s.en]) {
      if (c.caseRef && !known.has(c.caseRef.projectSlug)) {
        throw new Error(
          `solutions: "${s.key}" → bilinmeyen proje "${c.caseRef.projectSlug}"`,
        );
      }
    }
  }
}

// 3) Sektör fiyat bantları, sitede ilan edilen taban fiyatın altına düşmemeli.
//    Ana sayfa meta açıklaması ve Paketler bölümü "₺50.000'den başlayan" diyor.
{
  for (const s of solutions) {
    for (const c of [s.tr, s.en]) {
      const first = c.pricing?.tiers[0]?.price;
      if (!first) continue;
      const n = Number(first.match(/[\d.]+/)?.[0].replace(/\./g, ""));
      if (Number.isFinite(n) && n < PRICE_FLOOR) {
        throw new Error(
          `solutions: "${s.key}" fiyat bandı ₺${n} — ilan edilen taban ₺${PRICE_FLOOR} altında`,
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
