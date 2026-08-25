// Hukuki sayfalar: gizlilik, KVKK aydınlatma, kullanım şartları.
//
// Neden var: site iletişim formuyla ad, e-posta, şirket ve mesaj topluyor;
// bunları hem Web3Forms üzerinden e-postaya çeviriyor hem de kendi panelimize
// kaydediyor. Ziyaretin geldiği kaynak da form gönderilirken birlikte gidiyor.
// Türkiye'de bu, 6698 sayılı kanun kapsamında aydınlatma yükümlülüğü doğuruyor.
// Meta uygulaması da yayın için gizlilik politikası URL'si istiyor.
//
// KURAL: burada YALNIZCA gerçekten yaptığımız şey yazılı. Çerez kullanmıyoruz,
// Google Analytics yok, Meta Pixel yok, üçüncü parti izleyici yok — ve bunlar
// sayfada açıkça "yok" diye yazıyor. Şablon hukuk metni kopyalanmadı; her
// cümlenin karşılığı kodda var (components/sections/Contact.tsx,
// lib/kaynak-izi.ts, panelin /api/intake/site ucu).
//
// İçerik burada, sunum components/ui/HukukiSayfa.tsx'te. Sitemap de bu listeden
// besleniyor, yani yeni bir hukuki sayfa eklemek tek dosyaya dokunmak demek.

import type { Metadata } from "next";

export type HukukiMadde = { baslik?: string; govde: string };

export type HukukiTablo = {
  basliklar: string[];
  satirlar: string[][];
  aciklama?: string;
};

export type HukukiBolum = {
  baslik: string;
  paragraflar?: string[];
  /** Kısa, taranabilir maddeler. */
  liste?: string[];
  /** Başlıklı alt maddeler — hukuki sebep, aktarım kalemleri gibi. */
  maddeler?: HukukiMadde[];
  tablo?: HukukiTablo;
  /** Tablodan/listeden sonra gelen kapanış paragrafları. */
  kapanis?: string[];
  /** Diğer hukuki sayfalara veya siteye iç bağlantı. */
  baglantilar?: { metin: string; href: string }[];
};

export type HukukiSayfa = {
  /** Adres: /gizlilik gibi. Başında eğik çizgi yok. */
  slug: string;
  /** Sayfadaki h1. */
  baslik: string;
  /** Kırıntıda ve footer'da görünen kısa ad. */
  kisaBaslik: string;
  metaBaslik: string;
  metaAciklama: string;
  ozet: string;
  /** ISO tarih. Sayfadaki "son güncelleme" ve sitemap lastmod aynı yerden gelir. */
  sonGuncelleme: string;
  bolumler: HukukiBolum[];
};

const EPOSTA = "forpusyazilim@gmail.com";

/**
 * Veri sorumlusunun kimliği.
 *
 * Kurucuların ad-soyadları bu sayfadan KALDIRILDI ve geri eklenmeyecek:
 * herkese açık bir sayfada gerçek kişi adı yayımlamak, kanunun istediğinden
 * fazlasını yapıp kurucuların kendi kişisel verisini ifşa ediyordu.
 *
 * Yerine iletişim kanalı duruyor. Md.11 başvurusu için ilgili kişinin
 * ihtiyacı olan şey ulaşılabilir bir adres; kimlik bilgisi başvuru üzerine
 * doğrudan verilebilir. İşletme tescil edildiğinde buraya resmî unvan yazılır.
 */
const VERI_SORUMLUSU =
  `Veri sorumlusu: “Forpus Yazılım” adıyla hareket eden işletme. Her türlü başvuru, ` +
  `soru ve talep için: ${EPOSTA}`;

/** Üç sayfa da aynı gün yazıldı; içeriği değiştiren kişi burayı da günceller. */
const SON_GUNCELLEME = "2026-08-25";

// Aynı gerçekler iki sayfada anlatılıyor (gizlilik + KVKK). Metni tek yerde
// tutmak, birinin diğerinden ayrışmasını engelliyor.
const SAKLAMA_SURESI: string[] = [
  "Başvurunuz iş ilişkisine dönüşürse kayıtları ilişki sürdüğü sürece ve sonrasında ticari, mali ve hukuki yükümlülüklerin gerektirdiği makul süre boyunca saklıyoruz.",
  "İşe dönüşmeyen başvurular için kuralımız en fazla 2 yıl. Dürüst olalım: bu silme işlemi şu an otomatik bir görevle değil, elle yapılıyor.",
  "Panelde silinen bir başvuru önce arşive düşüyor — yanlışlıkla kaldırılan bir kayıt geri getirilebilsin diye. Panelde kalıcı silme düğmesi yok: kalıcı silme talebini elle, doğrudan veritabanı üzerinden yerine getiriyoruz ve 30 günlük süre buna da işliyor.",
  "Aynı iletişim bilgisiyle 10 dakika içinde ikinci kez form gönderirseniz yeni bir kayıt açılmıyor; mevcut kayda tekrar gönderim yapıldığı notu düşüyor.",
  "E-posta olarak gelen mesajlar Gmail kutumuzda kalıyor. Kaydınızı sildiğimizde ilgili yazışmayı da siliyoruz.",
];

// ═══════════════════════════════════════════════════════════════════════
// GİZLİLİK POLİTİKASI
// ═══════════════════════════════════════════════════════════════════════

const gizlilik: HukukiSayfa = {
  slug: "gizlilik",
  baslik: "Gizlilik Politikası",
  kisaBaslik: "Gizlilik Politikası",
  metaBaslik: "Gizlilik Politikası",
  metaAciklama:
    "Forpus Yazılım sitesinde hangi bilgileri topluyoruz, neyi toplamıyoruz ve topladığımız az sayıda bilgiye ne oluyor. Çerez yok, Google Analytics yok, reklam pikseli yok.",
  ozet:
    "Bu sitede ne topluyoruz, neyi toplamıyoruz ve topladığımız az sayıda bilgiye ne oluyor — hepsi tek sayfada, süslemesiz.",
  sonGuncelleme: SON_GUNCELLEME,
  bolumler: [
    {
      baslik: "Kısaca",
      liste: [
        "Sizden bilgi yalnızca iletişim formunu doldurduğunuzda alıyoruz. Formu doldurmadan gezerseniz bize hiçbir kişisel bilginiz ulaşmıyor.",
        "Çerez (cookie) kullanmıyoruz. Bu yüzden çerez onay penceresi de görmüyorsunuz.",
        "Google Analytics, Meta Pixel veya başka bir üçüncü parti izleme kodu sitede yok.",
        "Verilerinizi satmıyoruz, reklam ağlarıyla paylaşmıyoruz, bülten listesine eklemiyoruz.",
        `Silinmesini isterseniz ${EPOSTA} adresine yazmanız yeterli.`,
      ],
    },
    {
      baslik: "Veri sorumlusu",
      paragraflar: [
        "Forpus Yazılım, iki mühendisin yürüttüğü bir şahıs girişimi. Henüz tüzel kişilik olarak tescil edilmiş bir şirket değil; bu yüzden bu sayfada ticaret unvanı, sicil numarası veya kayıtlı adres bulunmuyor. Olmayan bir bilgiyi uydurmaktansa boş bırakmayı tercih ettik.",
        "Tescilli bir tüzel kişilik olmadığımız için verilerinizden sorumlu olan taraf, bu işi yürüten gerçek kişilerdir. Adlarını açıkça yazıyoruz ki başvurunuz muhatapsız kalmasın.",
        VERI_SORUMLUSU,
        `Her soru, talep ve şikâyet için tek adres: ${EPOSTA}`,
      ],
    },
    {
      baslik: "Formda hangi bilgileri istiyoruz",
      paragraflar: [
        "Sitedeki tek veri toplama noktası iletişim formu. İstediğimiz alanların tamamı şunlar:",
      ],
      tablo: {
        basliklar: ["Alan", "Zorunlu mu", "Ne işe yarıyor"],
        satirlar: [
          ["Adınız", "Zorunlu", "Size nasıl hitap edeceğimizi bilmek için"],
          ["E-posta", "Zorunlu", "Dönüş yapabilmek için"],
          ["Şirket / Marka", "İsteğe bağlı", "İşinizi görüşmeden önce anlamak için"],
          ["İlgilendiğiniz hizmet", "Listeden seçilir", "Talebi doğru kişiye yönlendirmek için"],
          ["Mesajınız", "Zorunlu", "Ne istediğinizi anlatmanız için"],
        ],
      },
      kapanis: [
        "Form telefon numarası istemiyor. Mesaj alanına numaranızı veya başka bir bilgiyi kendiniz yazarsanız o da bize ulaşır; bu tamamen sizin tercihiniz.",
        "Formda bir de sizin görmediğiniz gizli bir alan var. İnsanlar onu boş bırakır, botlar doldurur; dolduğunda gönderim sessizce iptal edilir. Bu alan hiçbir kişisel bilgi taşımıyor.",
      ],
    },
    {
      baslik: "Ziyaretin nereden geldiği bilgisi",
      paragraflar: [
        "Reklam verdiğimizde harcadığımız paranın gerçekten iş getirip getirmediğini görmek istiyoruz. Bunun için tarayıcınızda küçük bir not tutuyoruz: siteye hangi bağlantıyla geldiğiniz.",
        "Tutulan alanlar şunlar: adresteki kampanya etiketleri (utm_source, utm_medium, utm_campaign, utm_content, utm_term), reklam tıklama kimlikleri (Meta için fbclid, Google Ads için gclid), sizi buraya yönlendiren dış adres, siteye ilk indiğiniz sayfa ve ilk gelişinizin saati. Her değer 200 karakterle sınırlanıyor.",
        "Bu not tarayıcınızın sessionStorage alanında duruyor ve sekmeyi kapattığınızda siliniyor. Bize ulaşmasının tek yolu formu göndermeniz. Form göndermezseniz bu bilgi tarayıcınızdan hiç çıkmaz.",
        "Site içindeki gezinme yönlendiren sayılmıyor: yalnızca siteye dışarıdan geldiğiniz adres kaydediliyor. Kişiyi tanıyan bir kimlik numarası üretmiyoruz; bu not sizi değil, bağlantıyı tarif ediyor.",
      ],
    },
    {
      baslik: "Çerez kullanmıyoruz",
      paragraflar: [
        "Aradaki fark önemli: çerez, siteye yaptığınız her istekle birlikte otomatik olarak sunucuya gönderilir. sessionStorage ve localStorage ise yalnızca tarayıcınızda durur; site kodu okuyup göndermedikçe hiçbir yere gitmez.",
        "Tarayıcınızda tuttuğumuz kayıtların tamamı bu üçü:",
      ],
      tablo: {
        basliklar: ["Kayıt", "Nerede", "Ne kadar kalıyor", "Ne için"],
        satirlar: [
          [
            "forpus-kaynak-izi",
            "sessionStorage",
            "Sekmeyi kapatınca silinir",
            "Ziyaretin geldiği kaynak — yalnızca formu gönderirseniz bize ulaşır",
          ],
          [
            "forpus:acilis",
            "sessionStorage",
            "Sekmeyi kapatınca silinir",
            "Açılış animasyonunun oturumda bir kez oynaması",
          ],
          [
            "forpus-lang",
            "localStorage",
            "Siz silene kadar",
            "Site dili tercihiniz (TR / EN) — bize hiç gönderilmez",
          ],
        ],
      },
      kapanis: [
        "Üçü de kimliğinizi taşımıyor. Tarayıcı ayarlarınızdan site verilerini temizleyerek hepsini silebilirsiniz; site çalışmaya devam eder, yalnızca dil tercihiniz sıfırlanır.",
      ],
    },
    {
      baslik: "Sitede olmayan izleyiciler",
      paragraflar: [
        "Olmayan bir şeyi tek tek saymak tuhaf görünebilir. Ama bu listenin uzun, bir önceki bölümün kısa olması bilinçli bir tercih:",
      ],
      liste: [
        "Google Analytics veya benzeri bir ziyaretçi analiz aracı yok.",
        "Meta Pixel, TikTok Pixel, LinkedIn Insight gibi reklam pikselleri yok.",
        "Isı haritası ve oturum kaydı araçları (Hotjar, Clarity vb.) yok.",
        "Yeniden hedefleme (retargeting) kodu yok.",
        "Gömülü YouTube veya Vimeo oynatıcı yok; sitedeki videolar kendi sunucumuzdan geliyor.",
        "Yazı tipleri Google'dan canlı çekilmiyor. Site derlenirken indirilip kendi adresimizden sunuluyor, yani tarayıcınız bu sayfa için Google'a istek atmıyor.",
        "Reklam gösterimi, yorum eklentisi, sohbet balonu gibi dışarıdan yüklenen hiçbir bileşen yok.",
      ],
    },
    {
      baslik: "Bilgileriniz nereye gidiyor",
      paragraflar: ["Formu gönderdiğinizde mesajınız iki yola birden çıkıyor:"],
      maddeler: [
        {
          baslik: "1. E-posta — Web3Forms üzerinden",
          govde:
            "Form içeriği web3forms.com adlı servise gidiyor; bu servis mesajı e-postaya çevirip Gmail hesabımıza iletiyor. Yani mesajınız Web3Forms'un ve Google'ın sunucularından geçiyor ve Gmail kutumuzda saklanıyor. Her ikisinin de sunucuları yurt dışında.",
        },
        {
          baslik: "2. Kendi başvuru panelimiz",
          govde:
            "Aynı bilgiler, ziyaretin geldiği kaynak notuyla birlikte kendi yönetimimizdeki panele kaydediliyor. Takibi orada yapıyoruz: başvuru hangi aşamada, ne zaman dönüş yapıldı. Panele yalnızca kurucular şifreyle giriyor.",
        },
      ],
      kapanis: [
        "İkisini birlikte kullanmamızın sebebi basit: biri erişilemez olduğunda mesajınız kaybolmasın.",
        "Bunların dışında verilerinizi kimseyle paylaşmıyoruz. Satmıyoruz, reklam ağlarına aktarmıyoruz, toplu gönderim listelerine eklemiyoruz. Yalnızca yasal bir zorunluluk doğarsa (mahkeme veya yetkili kurum talebi) paylaşmak durumunda kalırız.",
        "Site GitHub Pages üzerinde barındırılıyor. Her web sunucusu gibi GitHub'ın da teknik bağlantı kayıtları (IP adresi, tarayıcı bilgisi) tuttuğunu varsaymak doğru olur; bu kayıtlara bizim erişimimiz yok.",
        "Google Search Console kullanıyoruz. Bu araç sitede hiçbir kod çalıştırmıyor; Google'ın kendi arama verilerinin toplu özetini gösteriyor (hangi aramada kaç kez göründüğümüz gibi) ve kişi bazında bilgi içermiyor.",
      ],
    },
    {
      baslik: "IP adresiniz",
      paragraflar: [
        "Panelin form ucu, kötüye kullanımı engellemek için aynı IP adresinden dakikada en fazla üç gönderim kabul ediyor. IP adresi yalnızca bu sayacı tutmak için sunucunun belleğinde kullanılıyor; veritabanına yazılmıyor ve süresi dolan kayıt bir sonraki istekte bellekten siliniyor. Sunucu yeniden başladığında zaten hiçbiri kalmıyor.",
        "Formun yanında iki koruma daha var: gönderim yalnızca kendi alan adımızdan kabul ediliyor ve formda botlar için gizli bir tuzak alan bulunuyor.",
      ],
    },
    {
      baslik: "Ne kadar süre saklıyoruz",
      paragraflar: SAKLAMA_SURESI,
    },
    {
      baslik: "Haklarınız",
      paragraflar: [
        "6698 sayılı Kişisel Verilerin Korunması Kanunu size verilerinizle ilgili bir dizi hak veriyor: verinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve diğerleri. Hakların tam listesi ve başvurunun nasıl yapılacağı KVKK Aydınlatma Metni sayfasında yazılı.",
        `Pratikte tek yapmanız gereken ${EPOSTA} adresine yazmak. Talebinizi en geç 30 gün içinde sonuçlandırıyoruz.`,
      ],
      baglantilar: [{ metin: "KVKK Aydınlatma Metni", href: "/kvkk" }],
    },
    {
      baslik: "Güvenlik",
      paragraflar: [
        "Site ve panel yalnızca HTTPS üzerinden çalışıyor. Panele giriş şifreyle korunuyor ve panele yalnızca iki kurucu erişiyor.",
        "Kimse mutlak güvenlik sözü veremez. Verdiğimiz söz şu: topladığımız veriyi mümkün olduğunca az tutuyoruz. Toplamadığımız veri sızmaz.",
      ],
    },
    {
      baslik: "Bu metin değişirse",
      paragraflar: [
        "Sayfayı güncellediğimizde başlığın altındaki tarihi değiştiriyoruz. Yeni bir araç eklemek gibi anlamlı bir değişiklik olursa burada açıkça yazacağız — sessizce eklemeyeceğiz.",
      ],
    },
    {
      baslik: "İletişim",
      paragraflar: [`Bu sayfayla ilgili her soru için: ${EPOSTA}`],
      baglantilar: [
        { metin: "KVKK Aydınlatma Metni", href: "/kvkk" },
        { metin: "Kullanım Şartları", href: "/kullanim-sartlari" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// KVKK AYDINLATMA METNİ
// ═══════════════════════════════════════════════════════════════════════

const kvkk: HukukiSayfa = {
  slug: "kvkk",
  baslik: "KVKK Aydınlatma Metni",
  kisaBaslik: "KVKK Aydınlatma Metni",
  metaBaslik: "KVKK Aydınlatma Metni",
  metaAciklama:
    "6698 sayılı Kanun kapsamında Forpus Yazılım aydınlatma metni: işlenen veri kategorileri, işleme amacı, hukuki sebep, aktarım, saklama süresi ve madde 11 hakları.",
  ozet:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca, iletişim formuyla topladığımız kişisel verilere dair aydınlatma.",
  sonGuncelleme: SON_GUNCELLEME,
  bolumler: [
    {
      baslik: "Veri sorumlusu",
      paragraflar: [
        "Kanun, veri sorumlusunun kimliğini bildirmeyi zorunlu kılıyor ve bunu gerçek ya da tüzel bir kişi olarak tanımlıyor (md.3/1-ı). Forpus Yazılım, iki mühendisin yürüttüğü bir şahıs girişimi; henüz tescilli bir tüzel kişilik değil. Bu yüzden ticaret unvanı ve vergi numarası yerine, sorumluluğu gerçekten taşıyan kişileri adlandırıyoruz.",
        VERI_SORUMLUSU,
      ],
    },
    {
      baslik: "İşlenen kişisel veriler",
      paragraflar: [
        "Yalnızca iletişim formuna yazdığınız bilgileri ve ziyaretinizin geldiği kaynağa dair notu işliyoruz.",
      ],
      tablo: {
        basliklar: ["Veri kategorisi", "İçerdiği veriler"],
        satirlar: [
          ["Kimlik", "Ad (formda yazdığınız şekliyle)"],
          ["İletişim", "E-posta adresi"],
          [
            "Müşteri işlem",
            "Şirket / marka adı, ilgilendiğiniz hizmet seçimi, mesaj içeriği, başvurunun durumu ve panelde tarafımızca eklenen notlar",
          ],
          ["İşlem güvenliği", "IP adresi — yalnızca gönderim sayacı için, anlık olarak"],
          [
            "Pazarlama / kaynak",
            "Kampanya etiketleri (utm_source, utm_medium, utm_campaign, utm_content, utm_term), reklam tıklama kimlikleri (fbclid, gclid), dış yönlendiren adres, siteye ilk girdiğiniz sayfa",
          ],
        ],
      },
      kapanis: [
        "Mesaj alanına kendi isteğinizle yazdığınız her ek bilgi (örneğin telefon numarası) de bu kapsama girer.",
        "Özel nitelikli kişisel veri (sağlık, din, biyometrik veri vb.) talep etmiyoruz ve işlemiyoruz; lütfen mesajınıza da yazmayın.",
      ],
    },
    {
      baslik: "Toplama yöntemi",
      paragraflar: [
        "Veriler tamamen elektronik ortamda, sitedeki iletişim formu aracılığıyla ve otomatik yolla toplanıyor.",
        "Telefonda veya yüz yüze bir görüşmede bize kendiniz ilettiğiniz bilgileri de aynı panele elle kaydedebiliyoruz; bu durumda veriyi siz doğrudan paylaşmış olursunuz.",
      ],
    },
    {
      baslik: "İşleme amaçları",
      liste: [
        "Talebinizi yanıtlamak ve sorularınızı cevaplamak",
        "Size teklif ve yol haritası hazırlamak",
        "İş ilişkisi kurulursa iletişimi sürdürmek ve süreci takip etmek",
        "Hangi kanalın (arama, reklam, yönlendirme) başvuru getirdiğini ölçmek",
        "Form üzerinden gelen spam ve kötüye kullanımı engellemek",
      ],
      kapanis: [
        "Bunların dışında bir amaç yok. Pazarlama e-postası, bülten veya toplu gönderim yapmıyoruz; verilerinizi profilleme ya da reklam hedeflemesi için kullanmıyoruz.",
      ],
    },
    {
      baslik: "Hukuki sebep",
      paragraflar: ["Kanun'un 5. maddesinin 2. fıkrasındaki şu sebeplere dayanıyoruz:"],
      maddeler: [
        {
          baslik: "5/2-c — Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması",
          govde:
            "Ad, e-posta, şirket adı, hizmet seçimi ve mesaj içeriği: teklif hazırlamak ve iş ilişkisini kurmak için gerekli veriler.",
        },
        {
          baslik: "5/2-f — Meşru menfaat",
          govde:
            "Ziyaretin kaynağına dair veriler ve gönderim sayacında kullanılan IP adresi: reklam bütçesinin karşılığını ölçmek ve formu kötüye kullanıma karşı korumak için işleniyor. Bu işleme, temel hak ve özgürlüklerinize zarar vermeyecek şekilde ve en az veriyle yapılıyor.",
        },
      ],
      kapanis: [
        "Açık rızaya dayanan bir işleme yapmıyoruz, çünkü rıza gerektirecek bir kullanımımız (pazarlama gönderimi, profilleme, reklam hedefleme) yok.",
      ],
    },
    {
      baslik: "Aktarım",
      paragraflar: ["Verileriniz aşağıdaki üç yer dışında kimseye aktarılmıyor:"],
      tablo: {
        basliklar: ["Kime", "Ne aktarılıyor", "Neden", "Yurt dışı mı"],
        satirlar: [
          [
            "Web3Forms (web3forms.com)",
            "Form içeriğinin tamamı",
            "Formu e-postaya çevirmek",
            "Evet",
          ],
          [
            "Google (Gmail)",
            "Form içeriğinin tamamı",
            "E-postanın alınması ve saklanması",
            "Evet",
          ],
          [
            "Kendi başvuru panelimiz",
            "Form içeriği ve ziyaretin kaynak notu",
            "Başvuru takibi",
            "Hayır — kendi yönetimimizdeki sunucu",
          ],
        ],
      },
      kapanis: [
        "İlk iki hizmetin sunucuları yurt dışında. Bu, Kanun'un 9. maddesi kapsamında yurt dışına aktarım anlamına geliyor; formu göndermeden önce bilmenizi istediğimiz için açıkça yazıyoruz.",
        "Dayanağımızı da yazalım: Kurul'un yeterlilik kararı bulunan bir ülke, imzalanmış bir standart sözleşme ya da bağlayıcı şirket kuralı yok. Aktarımı, Kanun'un 9/6. maddesindeki arızi aktarım istisnasına dayandırıyoruz: aktarım süreklilik taşımıyor, yalnızca siz iletişim formunu gönderdiğinizde ve kurulmasını istediğiniz iletişimin gereği olarak yapılıyor. Bu zeminin sizin için yeterli olmadığını düşünüyorsanız formu kullanmak zorunda değilsiniz — aynı bilgileri doğrudan e-posta ile de iletebilirsiniz; o zaman Web3Forms devreye hiç girmez.",
        "Yasal olarak zorunlu olduğumuz hâllerde yetkili kamu kurum ve kuruluşlarıyla paylaşabiliriz. Bunun dışında reklam ağlarına, veri simsarlarına veya üçüncü kişilere hiçbir aktarım yapmıyoruz.",
        "Site GitHub Pages üzerinde barındırılıyor. Formu doldurmasanız bile, her web sunucusunda olduğu gibi barındırma sağlayıcısının teknik bağlantı kayıtları tuttuğunu varsaymak doğru olur; bu kayıtlara erişimimiz yok.",
      ],
    },
    {
      baslik: "Saklama süresi",
      paragraflar: SAKLAMA_SURESI,
    },
    {
      baslik: "İlgili kişi olarak haklarınız (Madde 11)",
      paragraflar: [
        "Kanun'un 11. maddesi uyarınca veri sorumlusuna başvurarak kendinizle ilgili şu haklara sahipsiniz:",
      ],
      liste: [
        "Kişisel verinizin işlenip işlenmediğini öğrenme",
        "İşlenmişse buna ilişkin bilgi talep etme",
        "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
        "Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme",
        "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
        "Kanun'un 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
        "Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme",
        "İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç çıkmasına itiraz etme",
        "Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
      ],
    },
    {
      baslik: "Başvuru yolu",
      paragraflar: [
        `Haklarınızı kullanmak için ${EPOSTA} adresine yazmanız yeterli. Kimliğinizi doğrulayabilmemiz için başvurunuzu, formda kullandığınız e-posta adresinden göndermenizi rica ediyoruz.`,
        "Başvurunuzu, talebin niteliğine göre en kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırıyoruz (Kanun md. 13). İşlem ayrıca bir maliyet gerektirirse Kişisel Verileri Koruma Kurulu'nun belirlediği tarifedeki ücret istenebilir.",
        "Başvurunuz reddedilirse ya da yanıtı yetersiz bulursanız, yanıtı öğrendiğiniz tarihten itibaren 30 gün ve her hâlde başvuru tarihinden itibaren 60 gün içinde Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz (Kanun md. 14).",
      ],
    },
    {
      baslik: "Otomatik karar verilmiyor",
      paragraflar: [
        "Başvurunuz hakkında münhasıran otomatik bir sistem karar vermiyor. Panelimiz kayıtları tutuyor ve sıralıyor; mesajınızı okuyan ve dönüş yapan kişi bir insan.",
      ],
    },
    {
      baslik: "İletişim",
      paragraflar: [
        VERI_SORUMLUSU,
        "Hangi verinin nereye gittiğini teknik ayrıntısıyla anlattığımız sayfa Gizlilik Politikası'dır.",
      ],
      baglantilar: [
        { metin: "Gizlilik Politikası", href: "/gizlilik" },
        { metin: "Kullanım Şartları", href: "/kullanim-sartlari" },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// KULLANIM ŞARTLARI
// ═══════════════════════════════════════════════════════════════════════

const kullanimSartlari: HukukiSayfa = {
  slug: "kullanim-sartlari",
  baslik: "Kullanım Şartları",
  kisaBaslik: "Kullanım Şartları",
  metaBaslik: "Kullanım Şartları",
  metaAciklama:
    "Forpus Yazılım sitesini kullanırken geçerli kurallar: içeriğin niteliği, fiyat bilgilerinin bağlayıcılığı, fikri mülkiyet ve iletişim formunun kullanımı.",
  ozet:
    "Bu siteyi kullanırken geçerli olan kurallar: içeriğin niteliği, fiyatların bağlayıcılığı ve formu kullanırken beklediklerimiz.",
  sonGuncelleme: SON_GUNCELLEME,
  bolumler: [
    {
      baslik: "Kısaca",
      liste: [
        "Site tanıtım amaçlı. Buradaki bilgiler genel bilgidir, projenize özel danışmanlık değildir.",
        "Sitede yazan fiyatlar başlangıç aralığıdır; bağlayıcı fiyat yalnızca size özel yazılı teklifle verilir.",
        "Site içeriği ve tasarımı bize ait; referans markaların adları ve logoları sahiplerine ait.",
        "Formu kendi adınıza ve gerçek bilgilerinizle doldurun.",
      ],
    },
    {
      baslik: "Kimin sitesi",
      paragraflar: [
        `Bu site Forpus Yazılım tarafından işletiliyor. Forpus Yazılım henüz tescilli bir tüzel kişilik değil; iki mühendisin yürüttüğü bir şahıs girişimi. İletişim: ${EPOSTA}`,
        "Siteyi kullanarak bu şartları kabul etmiş sayılıyorsunuz. Kabul etmiyorsanız siteyi kullanmamanızı rica ederiz.",
      ],
    },
    {
      baslik: "Sitedeki bilgilerin niteliği",
      paragraflar: [
        "Hizmet sayfaları, çözüm sayfaları ve blog yazıları genel bilgilendirme amacıyla hazırlandı. İçlerindeki süre, fiyat ve yaklaşım tahminleri gerçek deneyimimize dayanıyor; ama her proje farklı, bunları sizin projeniz için verilmiş bir taahhüt olarak okumayın.",
        "İçeriği güncel tutmaya çalışıyoruz. Yine de bir bilginin her an eksiksiz ve güncel olduğunu garanti edemeyiz. Bir hata görürseniz yazın, düzeltelim.",
      ],
    },
    {
      baslik: "Fiyatlar ve teklif",
      paragraflar: [
        "Sitede paket ve fiyat aralıkları yayınlıyoruz. Bunu bilerek yapıyoruz: fiyatı görüşmeye saklamak kimsenin işine yaramıyor.",
        "Ancak bu rakamlar bağlayıcı bir teklif (icap) değil. Geçerli olan, kapsam netleştikten sonra size özel hazırlanan yazılı tekliftir. Sitedeki fiyatlar önceden haber verilmeksizin değişebilir.",
      ],
    },
    {
      baslik: "İletişim formunu kullanırken",
      liste: [
        "Verdiğiniz bilgilerin doğru olmasına dikkat edin; e-posta adresi yanlış yazılırsa size dönemeyiz.",
        "Başkasının kişisel bilgilerini, onayı olmadan formda paylaşmayın.",
        "Formu reklam, toplu gönderim, zararlı yazılım veya yasa dışı içerik iletmek için kullanmayın.",
        "Sistemi otomatik araçlarla zorlamayın. Aynı IP adresinden dakikada en fazla üç gönderim kabul ediliyor; bu sınır kötüye kullanıma karşı.",
      ],
      kapanis: [
        "Kötüye kullanım tespit edersek gönderimleri engelleyebilir, gerekirse yasal yollara başvurabiliriz.",
        "Formla paylaştığınız verilere ne olduğunu iki sayfada ayrıntısıyla anlatıyoruz:",
      ],
      baglantilar: [
        { metin: "Gizlilik Politikası", href: "/gizlilik" },
        { metin: "KVKK Aydınlatma Metni", href: "/kvkk" },
      ],
    },
    {
      baslik: "Fikri mülkiyet",
      paragraflar: [
        "Sitedeki metinler, tasarım, görseller, kod ve Forpus markası ile logosu Forpus Yazılım'a ait. Yazılı iznimiz olmadan ticari amaçla kopyalanamaz veya çoğaltılamaz.",
        "Kaynak göstererek kısa alıntı yapmak serbest; bir yazının tamamını kendi sitenize taşımak değil.",
        "Referans olarak gösterilen projelerin marka adları, logoları ve görselleri ilgili sahiplerine ait ve yalnızca yaptığımız işi göstermek amacıyla kullanılıyor.",
      ],
    },
    {
      baslik: "Dış bağlantılar",
      paragraflar: [
        "Site; müşteri projelerinin adreslerine, App Store ve Google Play sayfalarına ve benzeri dış adreslere bağlantı veriyor. Bu sitelerin içeriğinden, gizlilik uygulamalarından veya erişilebilirliğinden sorumlu değiliz.",
      ],
    },
    {
      baslik: "Sitenin sürekliliği",
      paragraflar: [
        "Site statik olarak GitHub Pages üzerinde yayınlanıyor. Erişimin kesintisiz olacağını taahhüt etmiyoruz; bakım, sağlayıcı kaynaklı kesinti veya güncelleme sırasında geçici erişim sorunları olabilir.",
        "Sayfaları, içerikleri ve hizmet kapsamını önceden haber vermeksizin değiştirebilir veya yayından kaldırabiliriz.",
      ],
    },
    {
      baslik: "Sorumluluğun sınırı",
      paragraflar: [
        "Sitedeki bilgilere dayanarak aldığınız kararların sonuçlarından sorumlu değiliz.",
        "Bir iş ilişkisi kurulduğunda tarafların hak ve yükümlülüklerini sitedeki metinler değil, aramızdaki yazılı teklif ve sözleşme belirler.",
      ],
    },
    {
      baslik: "Uygulanacak hukuk",
      paragraflar: [
        "Bu şartlara ve sitenin kullanımına Türkiye Cumhuriyeti hukuku uygulanır.",
      ],
    },
    {
      baslik: "Değişiklikler",
      paragraflar: [
        "Bu şartları güncelleyebiliriz. Yürürlükteki sürüm her zaman bu sayfada durur; başlığın altındaki tarih son güncellemeyi gösterir.",
      ],
    },
    {
      baslik: "İletişim",
      paragraflar: [`Sorularınız için: ${EPOSTA}`],
      baglantilar: [
        { metin: "Gizlilik Politikası", href: "/gizlilik" },
        { metin: "KVKK Aydınlatma Metni", href: "/kvkk" },
      ],
    },
  ],
};

export const hukukiSayfalar: HukukiSayfa[] = [gizlilik, kvkk, kullanimSartlari];

export const hukukiSayfa = (slug: string): HukukiSayfa => {
  const bulunan = hukukiSayfalar.find((s) => s.slug === slug);
  // Slug'lar bu dosyada sabit; bulunamıyorsa yazım hatası var demektir ve
  // sessizce boş sayfa üretmek yerine derleme/çalışma anında patlaması daha iyi.
  if (!bulunan) throw new Error(`Hukuki sayfa bulunamadı: ${slug}`);
  return bulunan;
};

/** Sayfa metadata'sı — üç route dosyasında kopyalanmasın diye burada. */
export function hukukiMetadata(slug: string): Metadata {
  const s = hukukiSayfa(slug);
  const yol = `/${s.slug}`;
  return {
    title: s.metaBaslik,
    description: s.metaAciklama,
    // Sayfalar yalnızca Türkçe yayınlanıyor; x-default de TR'ye bakıyor.
    alternates: { canonical: yol, languages: { "tr-TR": yol, "x-default": yol } },
  };
}

/** Sayfanın üstünde ve her metnin başında duran uyarı. */
export const HUKUKI_UYARI =
  "Bu metin bilgilendirme amaçlıdır ve bağlayıcı bir hukuki görüş değildir. Kendi durumunuz için kesin bir değerlendirme gerekiyorsa bir avukata danışın.";

export const HUKUKI_UI = {
  anaSayfa: "Ana sayfa",
  eyebrow: "Yasal",
  sonGuncelleme: "Son güncelleme",
  uyariBasligi: "Önce şunu söyleyelim",
} as const;
