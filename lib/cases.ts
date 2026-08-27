// Vaka sayfaları — /isler/[slug]
//
// Neden var: portföy ana sayfada tek bir grid içinde hapisti, her işin kendi
// adresi yoktu. Google 9 gerçek referansı ayrı ayrı indeksleyemiyordu ve
// "restoran web sitesi örnekleri" gibi aramalara girecek sayfamız yoktu.
// Ayrıca sektör sayfalarındaki referans bloklarının bağlanacağı bir yer
// gerekiyordu.
//
// İçerik kuralı: UYDURMA SONUÇ YOK. "Satışları %40 artırdık" gibi ölçmediğimiz
// bir iddia yazılmaz. Yazdığımız her şey ya canlı sitede görünür ya da bizim
// verdiğimiz bir karardır. Aşağıdaki bilgiler canlı sitelerden doğrulandı.
//
// Veri ikiliği yok: isim, adres, görsel ve kategori lib/projects.ts'te duruyor;
// burada yalnızca vaka anlatısı var, slug ile eşleşiyor. Eşleşmeyen bir slug
// build'i patlatır (dosya sonundaki kontrol).

import { webProjects } from "./projects";
import { assertSolutionKeys } from "./solution-index";

export type CaseStudy = {
  /** lib/projects.ts içindeki webProjects[].slug ile aynı olmalı. */
  slug: string;
  /** Sayfadaki h1 — proje adından farklı, arama odaklı. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Bir cümlede iş ne yapıyor. */
  summary: string;
  /** ISO tarih. Sitemap bunu kullanır — TR_LASTMOD'a bağlı kalmaz. */
  published: string;
  updated?: string;
  /** "Neye ihtiyaç vardı" — 2-3 paragraf. */
  challenge: string[];
  /** Ne kurduk. */
  built: { title: string; body: string }[];
  /** Öne çıkan karar — bu işi diğerlerinden ayıran şey. */
  highlight: { title: string; body: string };
  /**
   * Bu işten çıkan, benzer durumdaki herkese yarayacak ders.
   * Uydurma sonuç yazmıyoruz; onun yerine genellenebilir bilgi veriyoruz.
   */
  takeaway: { title: string; body: string[] };
  /** İlgili çözüm sayfası anahtarları (lib/solution-index.ts). Build'de doğrulanır. */
  relatedSolutions: string[];
};

export const cases: CaseStudy[] = [
  {
    slug: "doldurkabi",
    h1: "DoldurKabı — Hayvanseverler Platformu",
    metaTitle: "DoldurKabı Vaka Çalışması — Platform ve Mobil Uygulama",
    metaDescription:
      "Sahiplendirme, kayıp ilanı, veteriner rehberi ve haritayı tek platformda toplayan DoldurKabı'nın web ve mobil uygulamasını nasıl kurduk.",
    published: "2026-08-25",
    summary:
      "Sokak hayvanları için sahiplendirme, kayıp ilanları, veteriner rehberi ve topluluk forumunu tek çatı altında toplayan bir platform. Web ve mobil uygulamayı uçtan uca biz geliştirdik.",
    challenge: [
      "Hayvanseverlerin ihtiyacı olan şeyler internette dağınık duruyordu: sahiplendirme ilanları sosyal medya gruplarında, kayıp duyuruları mahalle sayfalarında, veteriner bilgisi haritada. Hiçbiri birbirini görmüyordu ve acil bir durumda insanlar nereye bakacağını bilmiyordu.",
      "Bu, tek bir tanıtım sitesiyle çözülecek bir iş değildi. Kullanıcıların ilan girdiği, birbirine mesaj attığı, konum bazlı arama yaptığı ve mobilde de aynı deneyimi yaşadığı gerçek bir platform gerekiyordu.",
      "Üstelik iki ayrı kitleye hizmet etmesi gerekiyordu: hayvan sahipleri ve veteriner klinikleri. İkisinin ihtiyaçları farklıydı ama aynı sistemde yaşamak zorundaydı.",
    ],
    built: [
      {
        title: "Sahiplendirme ve kayıp ilanı sistemi",
        body: "Kullanıcıların fotoğraflı ilan açtığı, filtreleyip arayabildiği ve doğrudan iletişime geçebildiği bir yapı. Kayıp ilanlarında zaman kritik olduğu için akış mümkün olan en kısa hale getirildi.",
      },
      {
        title: "Konum bazlı veteriner rehberi ve harita",
        body: "Kliniklerin harita üzerinde görüldüğü, hizmetlerine göre filtrelenebildiği bir rehber. Acil bir durumda en yakın açık kliniği bulmak sitenin en çok kullanılan işlevi.",
      },
      {
        title: "Klinikler için dijital profil",
        body: "Veteriner kliniklerinin kendi profilini yönettiği taraf. Platform yalnızca hayvan sahiplerine değil, kliniklere de değer üretiyor — bu da içeriğin kendi kendine büyümesini sağlıyor.",
      },
      {
        title: "Topluluk forumu ve sağlık takibi",
        body: "Soru-cevap alanı ve evcil hayvan sağlık kaydı. Platformu tek seferlik bir ihtiyaç aracı olmaktan çıkarıp düzenli kullanılan bir yere dönüştüren bölümler.",
      },
      {
        title: "iOS, Android ve AppGallery yayını",
        body: "Tek kod tabanıyla geliştirilen mobil uygulama üç mağazada da yayında. Web ve mobil aynı sistemi kullanıyor; bir tarafta girilen ilan diğerinde anında görünüyor.",
      },
    ],
    highlight: {
      title: "Neden mobil şarttı",
      body: "Kayıp hayvan ilanı, olayın olduğu yerde ve o anda girilir. Fotoğrafı çekip konumu işaretlemek telefonda olmalı; bilgisayara gidip ilan açmak için geçen süre bu işte doğrudan sonuç değiştiriyor. Uygulamanın varlık sebebi bu.",
    },
    takeaway: {
      title: "Platform kurmak isteyenlere",
      body: [
        "Platform işlerinde en çok yapılan hata, tek bir kullanıcı tipini düşünüp başlamak. DoldurKabı'da hayvan sahibi kadar veteriner kliniğinin de bir sebebi olması gerekiyordu; klinikler profillerini yönetmese içerik güncelliğini yitirir, kullanıcılar da gelmezdi. İki taraflı bir sistem kuruyorsanız, her iki tarafın da neden geleceğini baştan yanıtlayın.",
        "İkinci ders içeriğin nereden geleceği. Platformun değeri içeriğinden gelir ama içeriği siz üretemezsiniz — kullanıcı üretmeli. Bu yüzden ilan açma akışının kısalığı, tasarımın en çok üzerinde durulan yeri oldu. Bir ilanı girmek üç dakika sürüyorsa kimse girmez ve platform boş kalır.",
        "Üçüncüsü kapsam. Sahiplendirme, kayıp ilanı, veteriner rehberi, forum ve sağlık takibi aynı anda yapılmadı. Böyle bir projede her şeyi ilk sürüme koymak hem maliyeti katlar hem de hangi bölümün gerçekten kullanılacağını görmenizi engeller.",
      ],
    },
    relatedSolutions: ["mobil", "veteriner"],
  },

  {
    slug: "temizlikexpress",
    h1: "Temizlik Express — Hizmet Platformu",
    metaTitle: "Temizlik Express Vaka Çalışması — Platform ve Mobil Uygulama",
    metaDescription:
      "Ev temizliği ve halı yıkama hizmetlerini firma karşılaştırma, randevu ve online ödemeyle birleştiren Temizlik Express platformunu nasıl kurduk.",
    published: "2026-08-25",
    summary:
      "Ev temizliği, halı yıkama ve benzeri hizmetler için firma karşılaştırma, randevu ve online ödemeyi birleştiren bir platform. Web sitesi, mobil uygulama ve reklam tarafını birlikte yürüttük.",
    challenge: [
      "Temizlik hizmeti almak isteyen kişi genellikle birkaç firmayı telefonla arayıp fiyat sorar. Bu süreç hem müşteri hem firma için yorucu: fiyat sormak zaman alır, karşılaştırma yapmak zordur ve güven unsuru belirsiz kalır.",
      "İhtiyaç, bu telefon trafiğini yapılandırılmış bir akışa çevirmekti: adres gir, firmaları gör, karşılaştır, randevu al, güvenle öde. Bunun için bir tanıtım sitesi değil, iki taraflı bir sistem gerekiyordu.",
      "Ayrıca hizmet bölgesel bir iş; İstanbul'daki bir kullanıcıya Ankara'daki firma gösterilmemeli. Konum, sistemin merkezinde olmak zorundaydı.",
    ],
    built: [
      {
        title: "Üç adımlı sipariş akışı",
        body: "Adres girme, firma karşılaştırma, randevu ve ödeme. Akış bilinçli olarak üç adıma indirildi; her ek adım, sipariş tamamlama oranını düşürüyor.",
      },
      {
        title: "Bölge bazlı firma eşleştirme",
        body: "Türkiye haritasından bölge seçimi ve kullanıcının adresine göre hizmet veren firmaların listelenmesi. Sistemin çalışması bu eşleştirmenin doğruluğuna bağlı.",
      },
      {
        title: "Online ödeme ve randevu yönetimi",
        body: "Kullanıcının hizmeti seçip güvenle ödediği, randevusunu yönettiği akış. Ödeme sonrası her iki tarafa da bildirim gidiyor.",
      },
      {
        title: "Mobil uygulama (üç mağaza)",
        body: "iOS, Android ve AppGallery'de yayında. Düzenli hizmet alan kullanıcı için uygulama, siteden çok daha pratik bir tekrar sipariş yolu.",
      },
      {
        title: "Fiyat şeffaflığı ve SSS",
        body: '"Temizlik fiyatları nasıl belirlenir" gibi bölümler, arama motorlarından gelen bilgi amaçlı trafiği yakalıyor ve aynı zamanda müşterinin en çok takıldığı soruyu baştan yanıtlıyor.',
      },
    ],
    highlight: {
      title: "Reklam ve ürünün aynı ekipte olması",
      body: "Platformu kuran ekiple reklamı yürüten ekip aynı olduğunda, dönüşüm düştüğünde sorunun reklamda mı sitede mi olduğu tartışılmıyor — akışın hangi adımında kullanıcı düştüğü görülüp orası düzeltiliyor. Bu projede iki tarafı da biz yürüttük.",
    },
    takeaway: {
      title: "Pazaryeri modeli düşünenlere",
      body: [
        "Hizmet pazaryerlerinde asıl zorluk yazılım değil, arz-talep dengesi. Kullanıcı geldiğinde bölgesinde firma yoksa bir daha gelmiyor; firma geldiğinde iş gelmiyorsa platformdan çıkıyor. Bu yüzden bölge bazlı eşleştirmenin doğruluğu, sistemin en kritik parçası oldu.",
        'İkinci ders akışın uzunluğu. Sipariş akışındaki her adım, tamamlama oranını düşürüyor. Adres, karşılaştırma, randevu ve ödemeyi üç ekrana sığdırmak tasarım tercihi değil, zorunluluktu. Akış tasarlarken "bu adım gerçekten gerekli mi" sorusunu her ekran için ayrı sorun.',
        "Üçüncüsü, ürünü kuran ekiple reklamı yürüten ekibin aynı olmasının pratik faydası. Reklamdan gelen kullanıcı akışın üçüncü adımında düşüyorsa, bunu görmek ve düzeltmek iki ayrı firmayla haftalar sürebilecek bir iş; aynı ekipteyken aynı gün çözülüyor.",
      ],
    },
    relatedSolutions: ["mobil", "eticaret"],
  },

  {
    slug: "seapleasure",
    h1: "Sea Pleasure — Tekne Kiralama Sitesi",
    metaTitle: "Sea Pleasure Vaka Çalışması — Tekne Kiralama Web Sitesi",
    metaDescription:
      "İstanbul Boğazı'nda özel tekne kiralama için videolu, rezervasyon odaklı bir tanıtım sitesi. Turizm sektöründe görselin nasıl satış yaptığını anlatıyoruz.",
    published: "2026-08-25",
    summary:
      "İstanbul Boğazı'nda özel tekne ve yat kiralama hizmeti için sinematik bir tanıtım sitesi. Turlar, fiyata dahil olanlar ve tek tıkla WhatsApp rezervasyonu.",
    challenge: [
      "Tekne kiralama, kararın duyguyla verildiği bir hizmet. Kimse teknenin teknik özelliklerini karşılaştırarak seçmiyor; güvertede geçirilecek günü hayal edip karar veriyor. Site bu hayali kurabilmeli.",
      "Bunun karşılığı görsel ağırlıklı bir tasarım demek, ama görsel ağırlık siteyi yavaşlatırsa etki tersine dönüyor. Turizm sitelerinin klasik açmazı bu: kaliteli göstermek için büyük dosya gerekiyor, büyük dosya ziyaretçiyi kaçırıyor.",
      "İkinci mesele rezervasyonun kolaylığı. Karar duygusal olduğu için hızlı verilir ve hızlı geçer; o anda ne yapacağını bilemeyen ziyaretçi bir sonraki firmaya gidiyor.",
    ],
    built: [
      {
        title: "Videolu, sinematik açılış",
        body: "Boğaz'da geçen bir günü anlatan video, sitenin ilk saniyesinde devreye giriyor. Video yalnızca görünür olduğunda oynatılıyor; sayfa açılışında indirilmiyor, o ana kadar poster görüntüsü gösteriliyor.",
      },
      {
        title: "Tur kartları ve fiyata dahil olanlar",
        body: 'Boğaz turu, gün batımı turu gibi seçeneklerin ayrı ayrı anlatıldığı bölüm. "Fiyata neler dahil" başlığı, bu sektörde en çok sorulan soruyu baştan kapatıyor.',
      },
      {
        title: "Tek tıkla WhatsApp rezervasyonu",
        body: "Karar anı kısa olduğu için rezervasyon yolu da kısa: her bölümden tek tıkla WhatsApp'a. Form doldurma zorunluluğu bilinçli olarak kaldırıldı.",
      },
      {
        title: "Galeri ve kalkış bilgisi",
        body: "Gerçek çekimlerden oluşan galeri ve kalkış noktasının net gösterimi. Turizmde belirsizlik bırakmak doğrudan iptal demek.",
      },
    ],
    highlight: {
      title: "Görsel zenginlik ile hız arasındaki denge",
      body: "Bu sitede en çok emek harcanan yer tasarım değil, görsellerin nasıl servis edildiğiydi. Her görsel birden fazla boyutta üretilip ziyaretçinin ekranına uygun olanı gönderiliyor; video ise ancak görünür olduğunda yükleniyor. Sonuç: sinematik hissi veren ama telefonda hızlı açılan bir site.",
    },
    takeaway: {
      title: "Görsel ağırlıklı site yaptıracaklara",
      body: [
        "Turizm, restoran, düğün, mimarlık — görselin satış yaptığı her işte aynı açmaz var: kaliteli göstermek büyük dosya gerektirir, büyük dosya siteyi yavaşlatır, yavaş site ziyaretçiyi kaçırır. Bu açmazın çözümü görsel kalitesinden ödün vermek değil, görselleri doğru servis etmek.",
        "Pratikte şu demek: her görsel birden fazla boyutta üretilir ve ziyaretçinin ekranına uygun olanı gönderilir; telefondaki kullanıcı masaüstü boyutundaki dosyayı indirmez. Video ise sayfa açılışında değil, görünür olduğunda yüklenir. Teklif alırken bunun yapılıp yapılmadığını sorun — çoğu sitede yapılmıyor.",
        "İkinci ders rezervasyon yolunun kısalığı. Duygusal kararla alınan hizmetlerde karar hızlı verilir ve hızlı geçer. Form doldurtmak yerine tek tıkla WhatsApp'a yönlendirmek, bu tür işlerde ölçülebilir fark yaratıyor.",
      ],
    },
    relatedSolutions: ["restoran", "kisiselmarka"],
  },

  {
    slug: "diyetisyenece",
    h1: "Dyt. Ece Öztürk — Diyetisyen Web Sitesi",
    metaTitle: "Diyetisyen Web Sitesi Vaka Çalışması — Dyt. Ece Öztürk",
    metaDescription:
      "Danışan getiren bir diyetisyen sitesi nasıl kurulur? Hesaplama araçları, hizmet sayfaları ve randevu akışıyla Dyt. Ece Öztürk sitesi.",
    published: "2026-08-25",
    summary:
      "Beslenme danışmanlığı için sıcak, yargılamayan ve randevuya yönlendiren bir tanıtım sitesi. Hizmet sayfaları, hesaplama araçları, blog ve WhatsApp randevu.",
    challenge: [
      'Beslenme danışmanlığında tonun kendisi bir tasarım problemi. Danışan adayı çoğu zaman tereddütlü geliyor ve iddialı, "şu kadar kiloyu şu sürede verin" diyen bir dil onu yaklaştırmak yerine uzaklaştırıyor.',
      "İkinci mesele, ziyaretçiyi sayfada tutmak. Bir diyetisyen sitesine giren kişi genellikle birkaç saniye bakıp çıkıyor. Ona sayfada kalmak için bir sebep vermek gerekiyordu.",
      'Üçüncüsü doğru danışanla eşleşmek. Sporcu beslenmesi arayan biriyle klinik beslenme desteği arayan biri farklı şeyler soruyor; hepsi tek bir "hizmetler" listesinde kaybolursa ne danışan aradığını buluyor ne de arama motorları uzmanlık alanını anlıyor.',
    ],
    built: [
      {
        title: "Sürdürülebilirlik vurgulu anlatım",
        body: 'Sitenin ana mesajı bilinçli olarak iddia değil düzen üzerine kuruldu: "Diyet değil, sürdürebileceğiniz bir düzen." Bu tercih, tereddütlü ziyaretçinin kendini yargılanmış hissetmemesini sağlıyor.',
      },
      {
        title: "Altı ayrı hizmet sayfası",
        body: "Kilo yönetimi, klinik beslenme, yeme davranışı, sporcu beslenmesi, online danışmanlık ve kurumsal beslenme ayrı ayrı anlatılıyor. Hem danışan doğru yeri buluyor hem her alan kendi aramasında görünebiliyor.",
      },
      {
        title: "Hesaplama araçları",
        body: "Ziyaretçinin kendi durumunu 30 saniyede görebildiği araçlar. Bu bölüm sitede kalma süresini belirgin şekilde artırıyor ve danışanı randevuya çok daha hazır hale getiriyor.",
      },
      {
        title: "Blog altyapısı",
        body: "Beslenme içeriği üretmek, bu alanda arama motorlarından düzenli ziyaretçi getirmenin en etkili yolu. Altyapı kendi yönetebileceği şekilde kuruldu.",
      },
      {
        title: "WhatsApp randevu",
        body: "Türkiye'de bu sektörde randevunun büyük kısmı WhatsApp'tan alınıyor. Her bölümden tek tıkla ulaşılabiliyor.",
      },
    ],
    highlight: {
      title: "Araç koymak, metin yazmaktan daha çok işe yarıyor",
      body: 'Bu sitede en çok fark yaratan bölüm hesaplama araçları oldu. Ziyaretçi bir şey okumak yerine bir şey yapıyor; kendi durumunu görüyor ve o andan itibaren konuşma "acaba gerekli mi" olmaktan çıkıp "nasıl ilerleriz" oluyor.',
    },
    takeaway: {
      title: "Danışan getiren site kurmak isteyenlere",
      body: [
        'Sağlık ve danışmanlık alanlarında sitenin tonu, içeriğinden daha belirleyici olabiliyor. Tereddütlü bir ziyaretçi iddialı bir dil gördüğünde yaklaşmıyor. "Şu sürede şu kadar" vaadi yerine sürdürülebilirlik vurgusu, bu alanda çok daha iyi çalışıyor.',
        'İkinci ders: ziyaretçiye okuyacak bir şey değil, yapacak bir şey verin. Hesaplama araçları bu sitede en çok fark yaratan bölüm oldu; ziyaretçi kendi durumunu görüyor ve konuşma "acaba gerekli mi"den "nasıl ilerleriz"e geçiyor. Bu prensip diyetisyenlik dışında da geçerli — bir hesaplayıcı, bir test, bir kontrol listesi.',
        'Üçüncüsü uzmanlık alanlarını ayırmak. Tek bir "hizmetler" listesi hem ziyaretçiyi kaybettiriyor hem de arama motorlarının hangi konuda uzman olduğunuzu anlamasını engelliyor. Her alanın kendi sayfası olması, bu iki sorunu birden çözüyor.',
      ],
    },
    relatedSolutions: ["diyetisyen", "psikolog"],
  },

  {
    slug: "sagemakine",
    h1: "SAGE Makine — Endüstriyel Kurumsal Site",
    metaTitle: "SAGE Makine Vaka Çalışması — Endüstriyel Web Sitesi",
    metaDescription:
      "Renk ayırma ve X-Ray gıda kontrol makineleri için kurumsal site: ürün kataloğu, sektörel çözümler ve teklif akışı. B2B'de site nasıl satış yapar?",
    published: "2026-08-25",
    summary:
      "Renk ayırma ve X-Ray gıda kontrol makineleri üreten bir firma için kurumsal site. Makine kataloğu, sektörel çözümler, ürün bazlı anlatım ve teklif akışı.",
    challenge: [
      "Endüstriyel makine satışı, web sitesinin doğrudan satış yapmadığı bir alan. Kimse siteden sepete atıp makine almıyor. Sitenin işi farklı: teknik alıcının doğru makineyi bulmasını sağlamak ve firmanın ciddiyetini göstermek.",
      'Zorluk, iki farklı okuyucuya aynı anda hitap etmek. Bir tarafta "kuru meyvemdeki taşı ayıklamak istiyorum" diyen üretici var; diğer tarafta modelin teknik özelliklerini karşılaştıran mühendis. İkisi aynı sayfada kaybolmamalı.',
      "Bir de şu var: bu makineler pahalı ve alıcı riski somut olarak hissetmeli. Tek bir yabancı maddenin bir konteyner ürünü geri getirebileceği gerçeği, teknik özelliklerden daha ikna edici bir argüman.",
    ],
    built: [
      {
        title: "Ürün bazlı giriş",
        body: "Kuru meyve, kuruyemiş, antep fıstığı, bakliyat, dondurulmuş gıda, patates... Ziyaretçi kendi ürününden başlıyor. Teknik modelden değil, kendi probleminden yola çıkan bir yapı.",
      },
      {
        title: "İki teknoloji, ayrı anlatım",
        body: "Renk ayırma ve X-Ray farklı problemleri çözüyor. Her ikisi de kendi bölümünde, hangi durumda hangisinin gerektiği açıkça yazılarak anlatılıyor.",
      },
      {
        title: "Makine kataloğu",
        body: "DMAX, IDS, VALOR gibi modeller kendi sayfalarında. Teknik alıcı doğrudan modele gidebiliyor, karşılaştırma yapabiliyor.",
      },
      {
        title: '"Dört adımda doğru makine" akışı',
        body: "Ne aradığını bilmeyen ziyaretçiyi doğru modele götüren rehberli bir yol. B2B'de en çok işe yarayan yapı, alıcıyı eğiten yapı.",
      },
      {
        title: "Satış sonrası vurgusu",
        body: '"Sadece makine satmıyoruz, hattınızı ayakta tutuyoruz" bölümü. Bu fiyat segmentinde alıcının en büyük endişesi arıza anında yalnız kalmak; site bunu doğrudan karşılıyor.',
      },
    ],
    highlight: {
      title: "Riski somutlaştırmak, özellik saymaktan daha ikna edici",
      body: 'Sitenin en güçlü cümlesi bir teknik özellik değil: "Tek bir yabancı madde, bir konteynerinize mal olabilir." B2B satışta alıcı, kazancı değil kaybı hesaplıyor. Anlatımı bu gerçeğin üzerine kurduk.',
    },
    takeaway: {
      title: "B2B site yaptıracaklara",
      body: [
        'Endüstriyel satışta web sitesi doğrudan satış yapmaz; işi, doğru alıcıyı doğru ürüne götürmek ve firmanın ciddiyetini göstermektir. Bu yüzden B2B sitelerinde "sepete ekle" değil, "teklif al" akışı kurulur ve asıl yatırım ürün anlatımına yapılır.',
        'En önemli ders: ziyaretçiyi kendi probleminden başlatın, sizin ürün kataloğunuzdan değil. "Kuru meyvemdeki taşı ayıklamak istiyorum" diyen üretici, model numaralarından oluşan bir listeye girdiğinde kayboluyor. Ürün bazlı giriş, teknik katalogdan çok daha iyi çalışıyor.',
        'İkinci ders: bu fiyat segmentinde alıcı kazancı değil kaybı hesaplıyor. "Şu özelliklere sahip" cümlesi, "tek bir yabancı madde bir konteynerinize mal olabilir" cümlesi kadar ikna edici olmuyor. Riski somutlaştırmak, özellik saymaktan daha etkili.',
        "Üçüncüsü satış sonrası. Pahalı ekipman alan kişinin en büyük endişesi arıza anında yalnız kalmak. Bu endişeyi sitede açıkça karşılamak, teklif alma kararını doğrudan etkiliyor.",
      ],
    },
    relatedSolutions: ["eticaret", "musavir"],
  },

  {
    slug: "merak",
    h1: "Merak Et Öğren — Uygulama Tanıtım Sitesi",
    metaTitle: "Merak Et Öğren Vaka Çalışması — Uygulama Tanıtım Sitesi",
    metaDescription:
      "Sesli mikro-öğrenme uygulaması için indirme odaklı tanıtım sitesi. Bir mobil uygulamanın web sitesi neyi başarmalı?",
    published: "2026-08-25",
    summary:
      "Günde beş dakikalık sesli öğrenme uygulaması için tanıtım sitesi. Kategoriler, premium üyelik, blog ve mağaza yönlendirmeleri.",
    challenge: [
      "Bir mobil uygulamanın tanıtım sitesinin tek bir işi var: ziyaretçiyi indirmeye ikna etmek. Bu, kurumsal bir siteden tamamen farklı bir tasarım problemi — okutmak değil, harekete geçirmek gerekiyor.",
      'Zorluk, uygulamanın ne yaptığını indirmeden anlatabilmek. "Sesli öğrenme uygulaması" cümlesi kimseyi ikna etmiyor; insanın kafasında bir kullanım anı canlanması gerekiyor.',
      "Ayrıca uygulamanın mağaza sayfası zaten var. Sitenin mağaza sayfasının tekrarı olmaması, ondan fazlasını yapması lazımdı.",
    ],
    built: [
      {
        title: "Somut içerikle giriş",
        body: "Site soyut bir vaatle değil, gerçek bir içerik başlığıyla açılıyor. Ziyaretçi uygulamanın ne sunduğunu tarif üzerinden değil örnek üzerinden anlıyor.",
      },
      {
        title: "Kullanım anını anlatan bölümler",
        body: '"5 dakikada akıllı içerikler", "sohbette anlatacak şeyler", "çevrimdışı dinle" — özellik listesi değil, uygulamanın hayatta nereye oturduğunu anlatan başlıklar.',
      },
      {
        title: "Kategori ve içerik vitrini",
        body: "15 kategorinin görünür olduğu bölüm. İçerik çeşitliliği, bu tür uygulamalarda indirme kararını en çok etkileyen unsur.",
      },
      {
        title: "Premium üyelik anlatımı",
        body: "Ücretsiz ve premium arasındaki farkın net yazıldığı bölüm. Bu netlik, mağazada yaşanan hayal kırıklığını ve kötü yorumu önlüyor.",
      },
      {
        title: "Blog ve sözlük",
        body: "Arama motorlarından gelen trafiği yakalayan bölümler. Uygulama adını bilmeyen kişinin siteye ulaşabildiği tek kapı burası.",
      },
    ],
    highlight: {
      title: "Uygulama sitesi, mağaza sayfasının kopyası olmamalı",
      body: "Mağaza sayfası zaten uygulamayı tanıtıyor. Sitenin değeri, mağazada yapılamayanı yapmak: arama motorlarından bulunmak, içerikle güven kurmak ve uygulamayı hiç duymamış kişiye ulaşmak. Bu yüzden blog ve sözlük bölümleri süs değil, sitenin asıl işi.",
    },
    takeaway: {
      title: "Uygulama tanıtım sitesi yaptıracaklara",
      body: [
        "Bir mobil uygulamanın sitesinin en sık düştüğü tuzak, mağaza sayfasının kopyası olmak. Mağaza sayfası zaten uygulamayı tanıtıyor ve o işi sizden iyi yapıyor. Sitenin değeri, mağazada yapılamayanı yapmakta: arama motorlarından bulunmak ve uygulamayı hiç duymamış kişiye ulaşmak.",
        "Bu yüzden blog ve sözlük gibi bölümler süs değil, sitenin asıl işi. Uygulamanızın adını bilen kişi zaten mağazaya gidiyor; siteye ihtiyacı yok. Siteye ihtiyaç duyan kişi, çözdüğünüz problemi arayan ama sizi bilmeyen kişi.",
        'İkinci ders anlatım biçimi. "Sesli öğrenme uygulaması" cümlesi kimseyi ikna etmiyor. Somut bir içerik başlığı göstermek veya "sohbette anlatacak şeyler" gibi kullanım anını tarif etmek, özellik listesinden çok daha iyi çalışıyor. İnsanlar özellik değil, kendi hayatlarında bir an satın alıyor.',
      ],
    },
    relatedSolutions: ["mobil", "kisiselmarka"],
  },

  {
    slug: "dryasin",
    h1: "Dr. Yasin Kurtboğan — Medikal Estetik Sitesi",
    metaTitle: "Doktor Web Sitesi Vaka Çalışması — Dr. Yasin Kurtboğan",
    metaDescription:
      "Medikal estetik hekimi için kurumsal tanıtım sitesi: uygulama sayfaları, galeri ve randevu talebi. Sağlıkta güven veren tasarım nasıl kurulur?",
    published: "2026-08-25",
    summary:
      "Medikal estetik hekimi için kurumsal tanıtım sitesi. Uygulamaların ayrı ayrı anlatıldığı, hekimi öne çıkaran ve randevu talebine yönlendiren bir yapı.",
    challenge: [
      "Medikal estetikte tasarımın en zor işi bir dengeyi kurmak: hizmeti çekici göstermek ile tıbbi ciddiyeti korumak. Fazla ticari duran bir site güven kaybettiriyor, fazla klinik duran bir site ise ilgi çekmiyor.",
      'İkinci mesele uygulamaların çeşitliliği. Botoks arayan kişiyle PRP arayan kişi farklı şeyler soruyor; hepsi tek bir "hizmetlerimiz" listesinde toplanırsa ne hasta aradığını buluyor ne de arama motorları hangi uygulamada uzmanlık olduğunu anlıyor.',
      "Üçüncüsü mevzuat. Sağlık hizmetlerinde tanıtım ile bilgilendirme ayrı şeyler; kampanya duyurusu, fiyat ilanı ve karşılaştırmalı üstünlük iddiası sorun yaratabiliyor. Site bu çerçeveyi gözeterek kurgulanmalıydı.",
    ],
    built: [
      {
        title: "Uygulama bazlı sayfa yapısı",
        body: "Botoks, dolgu, mezoterapi, ip askı, PRP ve exosome uygulamaları ayrı ayrı anlatılıyor. Hasta doğrudan ilgilendiği uygulamaya gidebiliyor.",
      },
      {
        title: "Hekimi öne çıkaran anlatım",
        body: "Bu alanda hasta kliniği değil hekimi seçiyor. Özgeçmiş ve yaklaşım, sitenin merkezinde konumlandırıldı.",
      },
      {
        title: "Galeri",
        body: "Uygulamaların ve ortamın görsel anlatımı. Sağlıkta tanıtım kurallarının sınırları içinde kalan, abartılı vaat içermeyen bir kurgu.",
      },
      {
        title: "Randevu talebi akışı",
        body: "Her uygulama sayfasından ulaşılabilen randevu formu. Ayrıca telefon ve e-posta doğrudan tıklanabilir; hasta hangi kanalı tercih ederse etsin bir tık uzakta.",
      },
      {
        title: "Ferah ve abartısız görsel dil",
        body: "Sağlık alanında tasarımın işi etkilemesi, sakin ve temiz durmasından geçiyor. Renk ve tipografi seçimleri güven hissi üzerinden yapıldı.",
      },
    ],
    highlight: {
      title: "Sağlıkta mevzuat, tasarımın parçası",
      body: 'Bu alanda "güzel site" yetmiyor; kampanya duyurusu veya karşılaştırmalı üstünlük iddiası gibi unsurlar hekimi zor durumda bırakabiliyor. Siteyi bu çerçeveyi bilerek kurguluyoruz — bunu bilmeyen bir ajans, riski farkında olmadan hekime bırakıyor.',
    },
    takeaway: {
      title: "Sağlık alanında site yaptıracaklara",
      body: [
        "Sağlıkta tasarımın işi iki şeyi aynı anda tutmak: hizmeti çekici göstermek ve tıbbi ciddiyeti korumak. Fazla ticari duran bir site güven kaybettiriyor, fazla klinik duran bir site ilgi çekmiyor. Denge, renk ve tipografi kadar anlatım tonuyla da kuruluyor.",
        "En kritik ders mevzuat. Türkiye'de sağlık hizmetlerinde tanıtım ile bilgilendirme mevzuatta ayrı şeyler; kampanya duyurusu, fiyat ilanı, hasta yorumu ve karşılaştırmalı üstünlük iddiası sorun yaratabiliyor. Bunu bilmeyen bir ajans, riski farkında olmadan hekime bırakıyor. Teklif aldığınız ekibe bu konuyu mutlaka sorun.",
        "İkinci ders uygulamaları ayırmak. Botoks arayan kişiyle PRP arayan kişi farklı şeyler soruyor. Hepsi tek listede toplanırsa ne hasta aradığını buluyor ne de arama motorları hangi uygulamada uzmanlık olduğunu anlıyor.",
        "Üçüncüsü: bu alanda hasta kliniği değil hekimi seçiyor. Özgeçmiş ve yaklaşımın sitenin merkezinde olması, kurumsal bir vitrin kurmaktan daha çok işe yarıyor.",
      ],
    },
    relatedSolutions: ["doktor", "guzellik"],
  },

  {
    slug: "cekictrans",
    h1: "Çekiç Trans — Uluslararası Lojistik Sitesi",
    metaTitle: "Çekiç Trans Vaka Çalışması — Lojistik Web Sitesi",
    metaDescription:
      "Türkiye'den Balkanlara uluslararası karayolu taşımacılığı için kurumsal site. B2B lojistikte deneyimin nasıl anlatıldığını gösteren bir vaka.",
    published: "2026-08-25",
    summary:
      "Türkiye'den Balkanlara uluslararası karayolu taşımacılığı yapan bir firma için kurumsal site. Hizmetler, rotalar, filo ve teklif akışı.",
    challenge: [
      "Uluslararası nakliyede müşteri bir hizmet değil, bir güvence satın alıyor. Yükü sınırda takılmayacak, gümrükte beklemeyecek, zamanında varacak. Bu güvenceyi bir web sitesinde anlatmak, hizmet listesi yazmaktan çok farklı bir iş.",
      'Bu sektörde herkes aynı şeyleri yazıyor: "güvenilir", "hızlı", "müşteri odaklı". Bu kelimeler hiçbir şey ifade etmiyor ve firmayı diğerlerinden ayırmıyor.',
      "Firmanın asıl gücü ise somut ve anlatılabilir bir şeydi: yılların getirdiği rota ve sınır kapısı deneyimi. Anlatımı bunun üzerine kurmak gerekiyordu.",
    ],
    built: [
      {
        title: "Deneyimi somutlaştıran anlatım",
        body: 'Genel geçer sıfatlar yerine gerçek detaylar: bir hat üzerinde altı ülke, yılların getirdiği sınır kapısı bilgisi, aynı yolu yıllardır bilen şoförler. Bu tür somutluk, "güvenilir firmayız" cümlesinden çok daha ikna edici.',
      },
      {
        title: "Hizmetlerin ayrı ayrı anlatımı",
        body: "Komple yük, gümrük operasyonu, kapıdan kapıya teslimat, proje ve endüstriyel yük. Her biri kendi bölümünde; alıcı ihtiyacına karşılık geleni doğrudan buluyor.",
      },
      {
        title: "Rotalar ve filo",
        body: "Hangi hatlarda çalışıldığı ve filonun görünür olması. B2B'de kapasite göstermek, teklif alma kararını doğrudan etkiliyor.",
      },
      {
        title: "Teklif akışı",
        body: 'Sitenin her yerinden ulaşılabilen teklif talebi. Lojistikte fiyat yüke göre değiştiği için akış "fiyat gör" değil "teklif al" üzerine kurgulandı.',
      },
      {
        title: "7/24 operasyon vurgusu",
        body: "Yükü yolda olan müşterinin en büyük endişesi, bir sorun çıktığında ulaşamamak. Bu endişeyi karşılayan bölüm öne çıkarıldı.",
      },
    ],
    highlight: {
      title: "Sektör klişelerinden kaçınmak",
      body: "Lojistik sitelerinin çoğu birbirinin aynısı çünkü hepsi aynı sıfatları kullanıyor. Bu projede en çok emek, firmanın gerçekten neyi farklı yaptığını bulup onu somut cümlelere çevirmeye harcandı. İyi metin, iyi tasarımdan daha çok iş yapıyor.",
    },
    takeaway: {
      title: "Lojistik ve B2B hizmet siteleri için",
      body: [
        "Bu sektörün sitelerinin çoğu birbirinin aynısı çünkü hepsi aynı sıfatları kullanıyor: güvenilir, hızlı, müşteri odaklı. Bu kelimeler hiçbir şey ifade etmiyor ve firmayı diğerlerinden ayırmıyor. Alıcı da zaten hepsinde aynı şeyi okuduğu için fiyata bakmak zorunda kalıyor.",
        'Ayrışmanın yolu somutluk. "Otuz yıllık deneyim" cümlesi yerine bir hat üzerinde altı ülke, aynı yolu yıllardır bilen şoförler ve sınır kapısı deneyimi gibi detaylar yazmak — bunlar doğrulanabilir, hatırlanabilir ve rakibin kopyalayamayacağı şeyler.',
        "İkinci ders: bu tür projelerde en çok emeği tasarım değil metin istiyor. Firmanın gerçekten neyi farklı yaptığını bulmak, onu somut cümlelere çevirmekten daha zor. Ama bulunduğunda, sıradan bir tasarımla bile fark yaratıyor.",
        'Üçüncüsü akışın doğru kurgulanması. Lojistikte fiyat yüke göre değişir; "fiyat listesi" göstermeye çalışmak yanlış olur. Akış "teklif al" üzerine kurulmalı ve her sayfadan ulaşılabilmeli.',
      ],
    },
    relatedSolutions: ["musavir", "emlak"],
  },

  {
    slug: "esenkuruyemis",
    h1: "Esen Kuruyemiş — E-Ticaret Sitesi",
    metaTitle: "Kuruyemiş E-Ticaret Vaka Çalışması — Esen Kuruyemiş",
    metaDescription:
      "Kuruyemiş markası için e-ticaret sitesi: ürün kataloğu, ağırlık bazlı varyantlar, sepet ve ödeme. Gıda e-ticaretinin kendine özgü sorunları.",
    published: "2026-08-25",
    summary:
      "Kuruyemiş markası için e-ticaret sitesi. Ürün kataloğu, ağırlık bazlı varyantlar, sepet ve ödeme akışı.",
    challenge: [
      "Gıda e-ticaretinin kendine özgü bir sorunu var: ürün ağırlığa göre satılıyor. Aynı üründen 250 gram, 500 gram ve 1 kilo seçeneği olması gerekiyor ve bunların her biri ayrı fiyatlandırılıyor. Standart bir ürün-varyant yapısı bunu doğru kurgulamazsa hem yönetimi hem satın almayı zorlaştırıyor.",
      "İkincisi görsel. Kuruyemiş, iştah açan bir fotoğrafla satılan bir ürün; ama yüksek çözünürlüklü ürün fotoğrafları mağazayı yavaşlatırsa dönüşüm düşüyor.",
      "Üçüncüsü sepete giden yol. Gıda alışverişinde sepet genellikle çok kalemli oluyor; her ürün için uzun bir akış varsa müşteri yarıda bırakıyor.",
    ],
    built: [
      {
        title: "Ağırlık bazlı varyant yapısı",
        body: "Her ürünün farklı gramajlarda satılabildiği, fiyatın ona göre hesaplandığı bir kurgu. Yönetim tarafında tek üründen birden fazla seçenek yönetiliyor.",
      },
      {
        title: "İştah açan ürün vitrini",
        body: "Ürünü öne çıkaran, sade bir katalog. Görseller birden fazla boyutta üretilip ziyaretçinin ekranına uygun olanı gönderiliyor.",
      },
      {
        title: "Kısa sepet akışı",
        body: "Ürünü sepete atmaktan ödemeye kadar geçen adımlar mümkün olan en aza indirildi. Çok kalemli alışverişte her ek adım, tamamlanma oranını düşürüyor.",
      },
      {
        title: "Ödeme ve kargo entegrasyonu",
        body: "Güvenli ödeme ve kargo akışları kuruldu. Başvurular marka adına yapıldı; teknik entegrasyon bizde.",
      },
    ],
    highlight: {
      title: "Tasarımın işi, yoldaki engelleri kaldırmak",
      body: "Bu tür işlerde tasarımın görevi ürünü güzel göstermek kadar, satın alma yolundaki her gereksiz adımı kaldırmak. Güzel ama beş adımlı bir akış, sade ama iki adımlı bir akıştan daha az satış yapıyor.",
    },
    takeaway: {
      title: "Gıda e-ticareti kuracaklara",
      body: [
        "Gıda e-ticaretinin standart e-ticaretten ayrıldığı ilk yer varyant yapısı. Ürün ağırlığa göre satılıyor ve her gramaj ayrı fiyatlandırılıyor. Bu doğru kurgulanmazsa hem yönetim zorlaşıyor hem müşteri kafası karışıyor. Altyapı seçerken bu ilk sorulacak soru.",
        "İkinci ders sepetin çok kalemli olması. Gıda alışverişinde müşteri tek ürün almıyor; her ürün için uzun bir akış varsa yarıda bırakıyor. Ürünü sepete atmaktan ödemeye kadar geçen adımları kısaltmak, tasarımı güzelleştirmekten daha çok satış getiriyor.",
        "Üçüncüsü görseller. Gıda fotoğrafla satılıyor ama işlenmemiş ürün fotoğrafları mağazayı yavaşlatıyor. Görsellerin otomatik olarak ekrana göre boyutlandırılması, bu tür mağazalarda en çok ihmal edilen ve en çok kaybettiren teknik detay.",
        "Son olarak ödeme altyapısı: sanal POS başvurusu sizin şirketiniz adına yapılır ve komisyon oranları doğrudan sizinle banka arasındadır. Ajansın kendi hesabı üzerinden tahsilat önermesi ciddi bir uyarı işareti.",
      ],
    },
    relatedSolutions: ["eticaret", "restoran"],
  },
];

/**
 * Vaka + projesi tek nesnede.
 *
 * Eşleşme daha önce dört ayrı çağrı noktasında tekrar aranıyordu ve her biri
 * farklı bir sessiz fallback'e sahipti (`return null`, `?? "/og.png"`,
 * `notFound()`). Aşağıdaki build kontrolü eşleşmeyi zaten garantiliyor;
 * birleştirmeyi tek yerde yapıp fallback dallarını tamamen kaldırıyoruz.
 */
export const caseCards = cases.map((c) => {
  const project = webProjects.find((p) => p.slug === c.slug);
  if (!project)
    throw new Error(`cases: "${c.slug}" lib/projects.ts içinde yok`);
  return { ...c, project };
});

export const caseCardBySlug = (slug: string) =>
  caseCards.find((c) => c.slug === slug);

/**
 * Bir çözüm sayfasının gösterebileceği işler — `relatedSolutions`in TERSİ.
 *
 * Eşleşme zaten vaka dosyasında yazılıydı ama yalnızca tek yönde okunuyordu:
 * vaka sayfasından çözüme gidiliyor, çözüm sayfasından vakaya gidilmiyordu.
 * Bunun iki bedeli vardı. Aramada: dokuz vaka sayfasına yalnız /isler
 * listesinden ve footer'dan bağlanılıyordu, yani sitenin en özgün içeriğine
 * bağlam içinden hiç bağlantı yoktu. Ekranda: "avukat web sitesi" arayıp gelen
 * bir avukat, o sayfada gerçekten yaptığımız bir işi göremiyordu — hemen
 * altındaki brief formu ona bir şey soruyor ama karşılığında kanıt vermiyordu.
 *
 * Tek yerde türetiliyor: elle ikinci bir liste tutulsaydı ilk yeniden
 * adlandırmada ayrışırdı.
 *
 * DİL KARARI BURADA. Vaka metinleri tek dilli (`lib/routes.ts`,
 * TR_ONLY_PREFIXES) ve İngilizce bir sayfadan Türkçe bir vakaya bağlamak
 * ziyaretçiyi anlamadığı bir sayfaya düşürür. Bu koşul önce çağıran tarafta
 * `{lang === "tr" && <YapilanIsler .../>}` olarak duruyordu: bileşenin
 * sözleşmesinin parçasıydı ama tipinde görünmüyordu ve ikinci bir çağrı
 * yerinde tekrar yazılması gerekirdi. İngilizce vakalar yayınlandığında
 * yalnız burası değişecek — hiçbir bileşen, hiçbir çağrı yeri.
 */
export const casesForSolution = (solutionKey: string, lang: "tr" | "en") =>
  lang === "en"
    ? []
    : caseCards.filter((c) => c.relatedSolutions.includes(solutionKey));

export const caseUi = {
  home: "Ana Sayfa",
  work: "İşler",
  visit: "Siteyi Ziyaret Et",
  challengeTitle: "Neye ihtiyaç vardı?",
  builtTitle: "Ne kurduk?",
  relatedTitle: "İlgili çözümler",
  otherTitle: "Diğer işler",
  ctaTitle: "Sıradaki proje sizinki olsun",
  ctaText:
    "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
  ctaButton: "Ücretsiz Teklif Al",
};

// ============================================================================
// Build zamanı kontroller
//
// Proje eşleşmesi caseCards türetmesinde zaten patlıyor. Burada kalan iki şey:
// relatedSolutions anahtarları ve portföy listelerinin senkronu.
// ============================================================================

// 1) relatedSolutions gerçek bir çözüm anahtarına işaret etmeli. Aksi halde
//    bir çözüm yeniden adlandırıldığında iç bağlantılar sessizce kayboluyor —
//    bu sayfaların var olma sebebi tam olarak o iç bağlantı.
assertSolutionKeys("cases", cases);

// 2) Her web projesinin bir vakası olmalı. Aksi halde 10. proje eklendiğinde
//    ana sayfada görünür ama /isler'de ve sitemap'te sessizce yok olur.
{
  const withCase = new Set(cases.map((c) => c.slug));
  for (const p of webProjects) {
    if (!withCase.has(p.slug)) {
      throw new Error(
        `cases: "${p.slug}" projesinin vaka sayfası yok (lib/cases.ts)`,
      );
    }
  }
}
