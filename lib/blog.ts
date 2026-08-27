// Blog yazıları.
//
// Neden var: sektör sayfaları "doktor web sitesi" gibi ticari aramaları
// hedefliyor. Ama insanlar ajans aramadan önce bilgi arıyor — "web sitesi ne
// kadar tutar", "nelere dikkat etmeli". Bu aramalar hem daha yüksek hacimli
// hem de yeni bir alan adının gerçekten kazanabileceği tek yer.
//
// Kural: dolgu yazı yok. Her yazı, okurun başka yerde kolayca bulamadığı bir
// şey vermeli — gerçek rakam, gerçek süre, gerçek tuzak. Sektör sayfalarında
// yaptığımız hatayı (250 kelimelik ince içerik) burada tekrarlamıyoruz.
//
// Şimdilik yalnızca Türkçe: gösterimlerin 68/81'i Türkiye'den geliyor.

import { assertSolutionKeys } from "./solution-index";
import type { KisaCevapIcerigi } from "./kisa-cevap";

export type BlogSection = {
  heading: string;
  body?: string[];
  /** Sıralı adım veya madde listesi. */
  bullets?: { title: string; body: string }[];
  /** Karşılaştırma tablosu — fiyat/süre gibi taranabilir veriler için. */
  table?: { caption?: string; head: string[]; rows: string[][] };
  /** Vurgulanan not — uyarı veya dürüst tavsiye. */
  callout?: { title: string; body: string };
};

export type BlogPost = {
  slug: string;
  /** Sayfadaki h1. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Liste sayfasında ve yazının girişinde görünen özet. */
  excerpt: string;
  /** ISO tarih. Yapılandırılmış veride ve sitemap'te kullanılır. */
  published: string;
  updated?: string;
  tag: string;
  readingMinutes: number;
  intro: string[];
  /**
   * Girişten hemen sonraki alıntılanabilir pasaj — sektör sayfalarındakiyle
   * aynı blok. Yazıların ikisinde zaten "Kısa cevap" başlıklı bir bölüm
   * vardı ama içi TABLOYDU: tablo taranır, alıntılanmaz. Tablo duruyor,
   * yanına düzyazı cevabı geldi.
   */
  shortAnswer: KisaCevapIcerigi;
  sections: BlogSection[];
  faq?: { q: string; a: string }[];
  /** İlgili çözüm sayfalarının anahtarları — iç bağlantı için. */
  relatedSolutions?: string[];
};

export const posts: BlogPost[] = [
  // ───────────────────────────────────────────────────────── FİYAT
  {
    slug: "web-sitesi-fiyatlari",
    title: "Web Sitesi Fiyatları: 2026'da Ne Kadar Tutar?",
    metaTitle: "Web Sitesi Fiyatları 2026 — Ne Kadar Tutar?",
    metaDescription:
      "Web sitesi ne kadar tutar? 2026 için gerçek fiyat aralıkları, maliyeti neyin belirlediği ve teklif alırken sorulacak sorular. Rakamlarla, dolgusuz.",
    excerpt:
      "Ajansların çoğu fiyatı görüşmede söylüyor. Biz bandı baştan yazıyoruz: hangi site ne kadar tutar, maliyeti ne belirler ve nerede fazla ödersiniz.",
    published: "2026-08-25",
    updated: "2026-08-27",
    tag: "Fiyat Rehberi",
    readingMinutes: 7,
    intro: [
      'Bu sorunun tek bir cevabı yok, ama "duruma göre değişir" demek de işe yaramıyor. Aşağıda 2026 için gerçek aralıkları, o aralıkları neyin belirlediğini ve hangi durumda fazla ödediğinizi yazdık.',
      "Rakamlar Türkiye piyasası için ve kurumsal iş yapan ekiplerin bandını yansıtıyor. Çok daha ucuz teklifler de göreceksiniz; onların neden ucuz olduğunu da açıklıyoruz — her zaman kötü değil, ama neyi almadığınızı bilmeniz gerekiyor.",
    ],
    shortAnswer: {
      title: "Kısa cevap: web sitesi ne kadar tutar?",
      body: "Türkiye'de 2026 için web sitesi fiyatları, sitenin tipine göre dört banda ayrılıyor. Tek veya az sayfalı bir tanıtım sitesi ₺50.000–90.000 arasında ve bir ila iki haftada teslim edilir. Hizmetlerin ayrı ayrı sayfalandığı, arama motorlarına hazırlanmış kurumsal bir site ₺100.000–180.000 arasında ve iki ila dört hafta sürer. E-ticaret, hazır altyapı üzerine kurulumdan markaya özel tasarıma göre ₺80.000–280.000 arasında değişir ve iki ila yedi haftada tamamlanır. Randevu sistemi, müşteri paneli ya da özel yazılım gerektiren işler ₺250.000'den başlar ve süresi kapsama göre belirlenir. Fiyatı asıl belirleyen sayfa sayısı değil, dört şey: tasarımın size özel mi hazır tema mı olduğu, içeriği kimin yazdığı, arkada yönetilecek bir sistem olup olmadığı ve kaç dil desteklendiği. Çok daha ucuz teklifler de görürsünüz; sorun ucuz olmaları değil, neyin dahil olmadığının yazılı olmaması. Bir de çoğu teklifte hiç konuşulmayan gizli maliyet var: birkaç yıl sonraki yenileme. Adres yapısı korunmadan yenilenen bir site, arama motorlarındaki birikimini de birlikte götürüyor ve o birikimi yeniden kurmak ilk kurulumdan pahalıya geliyor.",
    },
    sections: [
      {
        heading: "Site tipine göre fiyat bandları",
        body: [
          "Web sitesi denince çok farklı işler kastediliyor. Tek sayfalık bir tanıtım sitesiyle ödeme alan bir e-ticaret mağazası arasında on kat fark olması normal. Aşağıdaki tablo en yaygın dört tipi ve 2026 başlangıç bandlarını gösteriyor.",
        ],
        table: {
          caption:
            "2026 başlangıç fiyatları — Türkiye, kurumsal iş yapan ekipler",
          head: ["Site tipi", "Fiyat bandı", "Süre", "Kime uygun"],
          rows: [
            [
              "Tanıtım sitesi",
              "₺50.000 – 90.000",
              "1–2 hafta",
              "Yeni açılan işletme, serbest çalışan, dijital kartvizit ihtiyacı",
            ],
            [
              "Kurumsal site",
              "₺100.000 – 180.000",
              "2–4 hafta",
              "Hizmetleri ayrı sayfalanan, arama motorlarında görünmek isteyen firma",
            ],
            [
              "E-ticaret",
              "₺80.000 – 280.000",
              "2–7 hafta",
              "Ürün satan marka; alt sınır hazır altyapı, üst sınır özel tasarım",
            ],
            [
              "Panel / özel yazılım",
              "₺250.000'den başlayan",
              "Projeye özel",
              "Randevu, üyelik, rezervasyon gibi bir sistem kuran işletme",
            ],
          ],
        },
      },
      {
        heading: "Fiyatı asıl ne belirliyor?",
        body: [
          'Çoğu insan "kaç sayfa olacak" diye soruyor. Sayfa sayısı maliyetin küçük bir parçası; asıl belirleyiciler şunlar:',
        ],
        bullets: [
          {
            title: "Tasarım size özel mi, hazır tema mı?",
            body: "Hazır tema alıp renklerini değiştirmek birkaç gün sürer ve ucuzdur. Sıfırdan tasarım haftalar alır. İkisi arasındaki fark fiyatın en büyük kalemi — ve piyasadaki fiyat farklarının çoğu buradan geliyor.",
          },
          {
            title: "İçeriği kim yazıyor?",
            body: "Metinler, fotoğraflar ve ürün açıklamaları sizde hazırsa süre kısalır. Yazdırılacaksa bu ayrı bir iştir ve fiyata eklenir. Projeleri geciktiren şey genellikle teknik zorluk değil, içerik beklemesidir.",
          },
          {
            title: "Sistem var mı?",
            body: 'Randevu takvimi, üyelik girişi, ödeme, stok takibi... Bunların her biri siteyi "tanıtım" olmaktan çıkarıp yazılıma dönüştürür. Fiyat bandı da ona göre sıçrar.',
          },
          {
            title: "İçeriği kendiniz güncelleyecek misiniz?",
            body: "Yönetim paneli maliyet ekler. Yılda birkaç kez değişen bir tanıtım sitesinde gereksizdir; düzenli yazı veya ilan ekleyecekseniz şarttır. Bu kararı baştan vermek sonradan eklemekten çok daha ucuz.",
          },
          {
            title: "Kaç dil?",
            body: "İkinci dil tasarımı değil, içeriği ve bakımı ikiye katlar. Gerçekten yabancı müşteriye hizmet vermiyorsanız ertelenebilir bir kalemdir.",
          },
        ],
      },
      {
        heading: "Neden bazı teklifler çok daha ucuz?",
        body: [
          "₺5.000'e web sitesi teklifleri gerçek. Ucuz olmaları genellikle şu üç sebepten biri:",
          "Birincisi hazır tema: piyasadaki bir şablon alınır, logo ve renk değiştirilir, içerik yerleştirilir. Bu bir dolandırıcılık değil — bütçesi kısıtlı işletmeler için makul bir başlangıç olabilir. Ama benzer görünen yüzlerce siteden biri olursunuz ve tema güncellemeleri zamanla siteyi bozar.",
          "İkincisi site kurucu platformlar: aylık abonelikle çalışırsınız, site platformun sunucusunda durur. Başlangıç maliyeti düşüktür ama abonelik ömür boyu devam eder ve platformdan çıkmak istediğinizde siteyi taşıyamazsınız.",
          "Üçüncüsü kapsamın dar tutulması: teklif sadece tasarımı içerir; alan adı, güvenlik sertifikası, KVKK metinleri, arama motoru ayarları ve teslim sonrası destek ayrı ücretlendirilir. Toplam maliyet ilk duyduğunuz rakamın iki katına çıkabilir.",
        ],
        callout: {
          title: "Ucuz her zaman yanlış değil",
          body: "Yeni açılmış bir işletmenin ilk sitesi için hazır tema tamamen makul bir tercih. Kötü olan, ne aldığınızı bilmeden karar vermek. Teklifin hangi kategoride olduğunu sorun; utanılacak bir soru değil.",
        },
      },
      {
        heading: "Fiyata dahil olması gerekenler",
        body: [
          "Teklifi karşılaştırırken sadece rakama bakmak yanıltıcı. Aşağıdakiler bir sitenin yayına çıkması için zaten gerekli; teklifte yoksa sonradan fatura olarak gelirler.",
        ],
        bullets: [
          {
            title: "Alan adı ve barındırma kurulumu",
            body: "Alan adı sizin adınıza kayıtlı olmalı. Ajansın kendi hesabına alması yaygın bir uygulama ve ayrılmak istediğinizde siteniz rehin kalıyor.",
          },
          {
            title: "SSL güvenlik sertifikası",
            body: "Adres çubuğundaki kilit. Bugün ücretsiz seçenekleri var, ayrı kalem olarak faturalandırılması gerekmez.",
          },
          {
            title: "Mobil uyum",
            body: 'Ziyaretçilerin büyük kısmı telefondan geliyor. "Mobil uyumlu" bir ek özellik değil, asgari beklenti.',
          },
          {
            title: "Temel SEO ayarları",
            body: "Başlık yapısı, site haritası, arama motoru kaydı. Bu ayarlar siteyi ilk sıraya çıkarmaz ama olmadan hiç görünmezsiniz.",
          },
          {
            title: "KVKK metinleri",
            body: "İletişim formu varsa aydınlatma metni ve açık rıza kutucuğu zorunlu. Şaşırtıcı sayıda site bunlar olmadan yayında.",
          },
          {
            title: "Teslim sonrası destek",
            body: "Ne kadar süre, neleri kapsıyor, sorun çıkınca kime ulaşacaksınız? Yazılı olsun.",
          },
        ],
      },
      {
        heading: "Bir de gizli maliyet var: yenileme",
        body: [
          "Sitenizi doğru kurulmamış bir yerden aldıysanız iki üç yıl içinde baştan yaptırmanız gerekir. O zaman sadece yeni siteyi değil, arama motorlarındaki birikiminizi de riske atarsınız.",
          "Site yenilenirken eski adreslerin yenilerine yönlendirilmesi gerekir. Bu adım atlanırsa Google'daki mevcut sıralamanız sıfırlanır ve aylarca toparlanmaz. En sık gördüğümüz ve en pahalıya patlayan hata budur.",
          "Yani ilk seferde biraz fazla ödemek, çoğu zaman ikinci kez ödemekten ucuza gelir.",
        ],
      },
    ],
    faq: [
      {
        q: "En ucuz web sitesi kaç paraya yapılır?",
        a: "Site kurucu platformlarla aylık birkaç yüz liraya kendiniz kurabilirsiniz. Bir ajanstan alacağınız en basit tanıtım sitesi ise ₺50.000 bandında başlıyor. Aradaki fark tasarımın size özel olması, sitenin size ait olması ve teslim sonrası destek.",
      },
      {
        q: "Web sitesi kaç günde hazır olur?",
        a: "İçerikleriniz hazırsa tanıtım sitesi 1–2 hafta, kurumsal site 2–4 hafta sürer. Randevu veya ödeme gibi sistemler işin içine girdiğinde 6–10 haftaya çıkar. Süreyi en çok uzatan şey teknik zorluk değil, içerik beklemesi ve karar değişiklikleridir.",
      },
      {
        q: "Aylık ödeme mi, tek seferlik mi?",
        a: "Kurumsal işlerde standart, projenin tek seferlik ücretlendirilmesidir; alan adı ve barındırma yıllık küçük bir kalem olarak devam eder. Aylık abonelik modeli genellikle site kurucu platformlarda geçerlidir ve siteyi asla sahiplenmezsiniz.",
      },
      {
        q: "Site sonrası bakım ücreti ödemek zorunda mıyım?",
        a: "Zorunlu değil, ama tavsiye edilir. Basit bir tanıtım sitesi bakımsız uzun süre çalışır. Sistem içeren bir sitede güvenlik güncellemeleri ve entegrasyon değişiklikleri düzenli bakım gerektirir; aksi halde bir yıl içinde sorun çıkar.",
      },
      {
        q: "Fiyat teklifinde nelere dikkat etmeliyim?",
        a: "Üç şeye: kapsamın kalem kalem yazılı olması, alan adı ve kaynak kodun size ait olduğunun belirtilmesi, teslim sonrası desteğin süresi. Bu üçü net değilse rakam ne olursa olsun karşılaştırma yapamazsınız.",
      },
    ],
    relatedSolutions: ["eticaret", "kisiselmarka", "mobil"],
  },

  // ───────────────────────────────────────────────────────── MOBİL
  {
    slug: "mobil-uygulama-maliyeti",
    title: "Mobil Uygulama Yaptırmak Ne Kadar Tutar?",
    metaTitle: "Mobil Uygulama Fiyatları 2026 — Maliyet Rehberi",
    metaDescription:
      "Mobil uygulama yaptırmak ne kadar tutar? 2026 fiyat aralıkları, maliyeti neyin belirlediği ve bütçeyi ikiye katlayan yaygın hatalar.",
    excerpt:
      "Uygulama fikri olan çoğu kişi bütçeyi bilmediği için hiç başlamıyor. Gerçek rakamlar, süreler ve maliyeti şişiren en yaygın hata.",
    published: "2026-08-25",
    updated: "2026-08-27",
    tag: "Fiyat Rehberi",
    readingMinutes: 6,
    intro: [
      "Uygulama fikri olan çoğu kişinin takıldığı yer teknik değil, belirsizlik. Ne kadar tutacağı bilinmediği için karar verilemiyor ve iyi fikirler yıllarca beklemede kalıyor.",
      "Aşağıda 2026 için gerçek bandları, o bandları neyin belirlediğini ve bütçeyi en çok şişiren hatayı yazdık.",
    ],
    shortAnswer: {
      title: "Kısa cevap: mobil uygulama ne kadar tutar?",
      body: "Türkiye'de 2026 için mobil uygulama maliyeti, kapsama göre üç banda ayrılıyor. Fikri doğrulayacak kadar özellik taşıyan bir ilk sürüm — MVP — ₺250.000–400.000 arasında ve altı ila on haftada mağazaya çıkar. Ödeme, harita ve bildirim gibi entegrasyonların bulunduğu tam kapsamlı bir uygulama ₺450.000–800.000 arasında ve üç ila beş ay sürer. Çok taraflı bir pazaryeri ya da uzun soluklu bir platform ₺800.000'den başlar ve süresi kapsama göre belirlenir. Bütçeyi ikiye katlayan en yaygın hata, her özelliği ilk sürüme koymaya çalışmak: kapsam yol boyunca büyüdükçe hem maliyet hem takvim katlanıyor. iOS ve Android için ayrı ayrı ödeme yapmanız gerekmez; tek kod tabanıyla çalışan ekipler iki platformu birlikte çıkarır. Fiyata mağaza yayını, yönetim paneli ve yayın sonrası bakımın dahil olup olmadığını mutlaka yazılı olarak sorun. Uygulama mağazaya çıktığında iş bitmiyor: işletim sistemi güncellemeleri, değişen mağaza kuralları ve hata düzeltmeleri için yıllık bir bakım kalemi ayırmanız gerekiyor. Mağaza hesaplarının ve kaynak kodun kime ait olacağını da sözleşmede yazılı isteyin.",
    },
    sections: [
      {
        heading: "Kapsama göre fiyat bandları",
        table: {
          caption: "2026 başlangıç fiyatları — iOS + Android, tek kod tabanı",
          head: ["Kapsam", "Fiyat bandı", "Süre", "Ne içerir"],
          rows: [
            [
              "İlk sürüm (MVP)",
              "₺250.000 – 400.000",
              "6–10 hafta",
              "Temel akış, kullanıcı girişi, yönetim paneli, iki mağazada yayın",
            ],
            [
              "Tam kapsamlı",
              "₺450.000 – 800.000",
              "3–5 ay",
              "Ödeme, harita, bildirim, çok rollü kullanıcı, analitik",
            ],
            [
              "Platform",
              "₺800.000'den başlayan",
              "Projeye özel",
              "Çok taraflı pazaryeri, dış sistem entegrasyonları, sürekli geliştirme",
            ],
          ],
        },
      },
      {
        heading: "Bütçeyi ikiye katlayan hata: her şeyi ilk sürüme koymak",
        body: [
          "Uygulama projelerinde en pahalı karar, aklınızdaki tüm özellikleri ilk sürüme sıkıştırmaktır. Maliyeti katlar, lansmanı aylarca geciktirir ve en kötüsü: kullanıcının hangi özelliği gerçekten kullanacağını lansmandan önce bilemezsiniz.",
          "Sağlıklı yaklaşım, fikri en sade çalışan haliyle yayına almak, gerçek kullanıcıdan veri toplamak ve büyümeyi o veriye göre yapmaktır. Çoğu projede ilk sürümde planlanan özelliklerin üçte biri hiç kullanılmıyor.",
          "Bu yüzden iyi bir ekip size neyi yapmayacağını da söyler. Her isteğinizi kabul eden bir teklif, ya maliyeti şişirir ya da projeyi sürüncemede bırakır.",
        ],
      },
      {
        heading: "Hangi özellik ne kadar ekliyor?",
        body: [
          'Fiyatı asıl belirleyen, uygulamanın "ne yaptığı". Aşağıdaki tablo, temel bir uygulamaya eklendiğinde maliyeti ne kadar büyüttüklerine göre en yaygın özellikleri gösteriyor. Rakamlar mutlak değil, birbirine göre ağırlığı anlamanız için.',
        ],
        table: {
          caption: "Özelliklerin maliyete etkisi — temel uygulamaya ek olarak",
          head: ["Özellik", "Ek maliyet", "Neden"],
          rows: [
            [
              "Kullanıcı girişi",
              "Düşük",
              "Standart çözümlerle hızlı kurulur; e-posta, telefon veya sosyal hesapla giriş.",
            ],
            [
              "Bildirim gönderme",
              "Düşük",
              "Altyapısı hazır; asıl iş hangi olayda kime gideceğinin kurgulanması.",
            ],
            [
              "Harita ve konum",
              "Orta",
              "Gösterim kolay; rota, mesafe hesabı ve canlı takip işi büyütür.",
            ],
            [
              "Ödeme alma",
              "Orta",
              "Entegrasyon standart, ama iade, fatura ve hata durumları ciddi test gerektirir.",
            ],
            [
              "Sohbet / mesajlaşma",
              "Yüksek",
              "Gerçek zamanlı bağlantı, okundu bilgisi, geçmiş, bildirim — kendi başına bir proje.",
            ],
            [
              "Çok rollü panel",
              "Yüksek",
              "Müşteri, kurye, yönetici gibi her rol ayrı ekranlar ve yetki kuralları demek.",
            ],
            [
              "Çevrimdışı çalışma",
              "Yüksek",
              "Veriyi cihazda tutup sonra eşitlemek, yazılımın en zor konularından biri.",
            ],
          ],
        },
      },
      {
        heading: "Nasıl ilerler: fikirden mağazaya",
        body: [
          "İyi yürüyen bir uygulama projesi dört aşamadan geçer. Aşamaların sırası önemli — özellikle tasarımın geliştirmeden önce onaylanması, sonradan yapılacak değişikliklerin maliyetini büyük ölçüde düşürür.",
        ],
        bullets: [
          {
            title: "1. Kapsam görüşmesi",
            body: "Fikir, hedef kullanıcı ve çözülecek asıl problem konuşulur. Buradaki en değerli iş, ilk sürüme neyin GİRMEYECEĞİNE karar vermektir. Çıktı: net özellik listesi ve sabit fiyat.",
          },
          {
            title: "2. Tasarım ve prototip",
            body: "Ekranlar tasarlanır, tıklanabilir bir prototip verilir. Uygulamayı kod yazılmadan önce telefonunuzda gezersiniz. Değişiklik yapmanın en ucuz olduğu an burasıdır; bu aşamayı atlayan projeler sonradan pahalıya patlar.",
          },
          {
            title: "3. Geliştirme",
            body: "Süreç boyunca düzenli test sürümü almalısınız. İlerlemeyi kendi telefonunuzdan göremiyorsanız, teslimde sürprizle karşılaşma ihtimaliniz yüksek.",
          },
          {
            title: "4. Mağaza yayını",
            body: "App Store ve Google Play başvuruları, metinler, görseller, gizlilik formları. İlk başvurunun reddedilmesi olağandır; düzeltip yeniden göndermek sürecin normal parçası. Bu aşama için 1–2 hafta pay bırakın.",
          },
        ],
      },
      {
        heading: "iOS ve Android için ayrı ayrı mı ödenir?",
        body: [
          "Hayır — en azından artık gerekmiyor. Tek kod tabanıyla geliştirme yapıldığında aynı çalışmadan iki platform da çıkıyor. Bu yaklaşım maliyeti neredeyse yarıya indiriyor ve iki platformun aynı anda güncellenmesini sağlıyor.",
          "Ayrı ayrı geliştirme yalnızca çok özel donanım gereksinimleri olan projelerde mantıklı. Size iki ayrı fiyat veriliyorsa neden gerektiğini sorun; ikna edici bir cevap yoksa gereksiz ödüyorsunuz demektir.",
        ],
      },
      {
        heading: "Fiyata dahil olması gerekenler",
        bullets: [
          {
            title: "Tasarım ve prototip",
            body: "Kod yazılmadan önce uygulamayı telefonunuzda gezebilmelisiniz. Değişiklik yapmanın en ucuz olduğu an burasıdır.",
          },
          {
            title: "Yönetim paneli",
            body: "Uygulamadaki içeriği, kullanıcıları ve siparişleri yöneteceğiniz arayüz. Bu olmadan her değişiklik için geliştiriciye bağımlı kalırsınız.",
          },
          {
            title: "Mağaza yayını",
            body: "App Store ve Google Play başvuruları, metinler, ekran görüntüleri, gizlilik formları. Ret gelirse düzeltmeler de dahil olmalı.",
          },
          {
            title: "Hesaplar sizin adınıza",
            body: "Apple Developer ve Google Play hesapları sizin veya şirketiniz adına açılmalı. Ajansın hesabından yayınlanan uygulamayı taşımak zahmetli, bazen imkânsızdır.",
          },
          {
            title: "Kaynak kod sahipliği",
            body: "Sözleşmede kaynak kodun size ait olduğu yazmalı. Bu sektörde en çok yaşanan mağduriyet, ajans değiştirmek isteyince uygulamanın rehin kalması.",
          },
        ],
      },
      {
        heading: "Yayından sonra biten bir iş değil",
        body: [
          "Uygulama mağazaya çıkınca iş bitmiyor. İşletim sistemi her yıl güncelleniyor, mağaza kuralları değişiyor, kütüphaneler eskiyor. Bakımsız bir uygulama bir yıl içinde çalışmaz hale gelebilir veya mağazadan kaldırılabilir.",
          "Bu yüzden yıllık bütçenize bakım kalemi eklemek gerekiyor. Teklif alırken bakımın kapsamını ve süresini yazılı isteyin.",
        ],
        callout: {
          title: "Önce web mi, önce uygulama mı?",
          body: "Fikrinizi test etmek istiyorsanız çoğu durumda önce mobil uyumlu bir web uygulaması yapmak daha ucuz ve daha hızlı. Kullanıcının uygulamayı indirmesini gerektiren bir sebep (bildirim, çevrimdışı kullanım, kamera, konum) yoksa mağazaya çıkmak için acele etmeyin.",
        },
      },
    ],
    faq: [
      {
        q: "Uygulama fikrimi kimseyle paylaşmadan fiyat alabilir miyim?",
        a: "Fiyat kapsama bağlı olduğu için fikri en azından genel hatlarıyla anlatmanız gerekir. Ciddi ekipler gizlilik sözleşmesi imzalamaktan çekinmez; talep etmekten çekinmeyin.",
      },
      {
        q: "Yazılım bilmiyorum, süreci takip edebilir miyim?",
        a: "Evet. İyi bir ekip teknik terimlerle konuşmaz ve her aşamada telefonunuzda gezebileceğiniz somut bir çıktı verir. Prototipi ilk haftalarda elinize almalısınız.",
      },
      {
        q: "Uygulamayı mağazaya kim yükler?",
        a: "Geliştirici ekip yükler, ama hesaplar sizin adınıza açılmalıdır. Yayın süreci, metinler ve görseller dahil, teklifin içinde olmalı.",
      },
      {
        q: "Ne kadar sürede yayına çıkarım?",
        a: "İlk sürüm için 6–10 hafta gerçekçi. Kapsam büyüdükçe 3–5 aya çıkar. Süreyi en çok uzatan şey karar değişiklikleridir, bu yüzden kapsamı baştan netleştirmek kritik.",
      },
    ],
    relatedSolutions: ["mobil", "eticaret"],
  },

  // ───────────────────────────────────────────────────────── AVUKAT
  {
    slug: "avukat-web-sitesi-rehberi",
    title: "Avukat Web Sitesi: Reklam Yasağı ve Bilmeniz Gerekenler",
    metaTitle: "Avukat Web Sitesi Rehberi — Reklam Yasağı",
    metaDescription:
      "Avukat web sitesi yaptırırken reklam yasağı nasıl işliyor, sitede ne yazılabilir, ne yazılamaz? Meslek kurallarına uygun site kurmanın çerçevesi.",
    excerpt:
      "Hukuk bürolarının en çok takıldığı konu meslek kuralları. Sitede ne yazabilirsiniz, ne yazamazsınız ve ajansınızın bunu bilmemesi sizi nasıl zor durumda bırakır?",
    published: "2026-08-25",
    updated: "2026-08-27",
    tag: "Rehber",
    readingMinutes: 8,
    intro: [
      "Avukatlar için web sitesi, diğer mesleklerden farklı bir iş. Sebep teknik değil: Avukatlık Kanunu ve meslek kuralları tanıtımı sınırlıyor ve bu sınırları bilmeyen bir ajans, farkında olmadan sizi baro nezdinde zor durumda bırakabiliyor.",
      "Aşağıda çerçeveyi, pratikte neyin yazılıp neyin yazılamadığını ve yine de rekabetçi kalmanın yollarını yazdık. Şunu baştan söyleyelim: bu bir hukuki görüş değil, işin yazılım tarafından gördüğümüz pratik. Kesin sınırlar için bağlı olduğunuz baronun güncel düzenlemesine bakın.",
    ],
    shortAnswer: {
      title: "Kısa cevap: sitede ne yazılabilir, ne yazılamaz?",
      body: "Avukatlık Kanunu ve meslek kuralları, hukuk bürolarının tanıtımını sınırlıyor; ama sınır bilgilendirmeye değil reklama konuyor. Serbest olanlar: hangi çalışma alanlarında hizmet verdiğinizi belirtmek, avukatların özgeçmişini, eğitimini ve yayınlarını paylaşmak, bilgilendirme amaçlı hukuki makale yayınlamak, iletişim ve konum bilgisi vermek. Sorunlu olanlar: müvekkil yorumu ve referans — tanıklığa dayalı tanıtım reklam sayılıyor — başarı oranı ya da kazanılmış dava sayısı iddiası, karşılaştırmalı üstünlük ifadeleri ve iş getirmeye yönelik çağrılar. Bu çerçevede rekabetçi kalmanın yolu makale yayınlamaktan geçiyor: çalışma alanınızla ilgili gerçek soruları yanıtlayan içerik, hem yasağa takılmaz hem de arama sonuçlarında görünmenin en sağlam yoludur. Ajansınızın bu çerçeveyi bilip bilmediğini teklif aşamasında sorun — bilmeyen bir ekip, farkında olmadan sizi baro nezdinde zor durumda bırakabilir. Bu bir hukuki görüş değil; kesin sınırlar için baronuzun güncel düzenlemesine bakın. Teknik tarafta iki asgari şart var: iletişim formundan gelen mesajların güvenli iletilmesi ve KVKK aydınlatma metinlerinin sitede bulunması. Bir de kontrolünüz dışında bir alan var — üçüncü taraf rehber sitelerdeki yorumlar; onları kaldıramazsınız ama kendi sitenizle o aramaların önüne geçebilirsiniz.",
    },
    sections: [
      {
        heading: "Çerçeve: bilgilendirme serbest, reklam değil",
        body: [
          "Mevzuatın kurduğu ayrım şu: avukat kendini ve çalışma alanlarını tanıtabilir, ama iş getirmeye yönelik reklam yapamaz. Uygulamada bu ayrım her zaman keskin olmuyor ve gri alanlar var; ama net olan bazı sınırlar var.",
          "Sitenin varlığı sorun değil. Kurumsal bir web sitesi, çalışma alanlarını anlatmak, özgeçmiş paylaşmak ve iletişim bilgisi vermek meşru bilgilendirmedir. Sorun, anlatımın satış diline kaymasında başlıyor.",
        ],
        table: {
          caption: "Pratikte sık karşılaşılan durumlar",
          head: ["Unsur", "Durum", "Neden"],
          rows: [
            [
              "Çalışma alanları",
              "Serbest",
              "Hangi alanlarda hizmet verdiğinizi belirtmek bilgilendirmedir.",
            ],
            [
              "Özgeçmiş, eğitim, yayınlar",
              "Serbest",
              "Mesleki geçmişin paylaşılması tanıtımın meşru parçası.",
            ],
            [
              "Hukuki makale ve bilgi yazıları",
              "Serbest",
              "Bilgilendirme amaçlı içerik açıkça uygun; en çok işe yarayan yöntem de bu.",
            ],
            [
              "Müvekkil yorumu / referans",
              "Sorunlu",
              "Tanıklığa dayalı tanıtım reklam sayılıyor; ayrıca müvekkil gizliliği riski var.",
            ],
            [
              "Kazanılmış dava sayısı, başarı oranı",
              "Sorunlu",
              "İş vaadi ve sonuç garantisi izlenimi yaratıyor.",
            ],
            [
              '"Türkiye\'nin en iyi..." gibi ifadeler',
              "Sorunlu",
              "Karşılaştırmalı üstünlük iddiası mevzuatın açıkça sınırladığı alan.",
            ],
            [
              "Ücret listesi",
              "Sorunlu",
              "Ücretin ilan yoluyla duyurulması genellikle uygun görülmüyor.",
            ],
            [
              "Ücretsiz danışmanlık kampanyası",
              "Sorunlu",
              "İş getirmeye yönelik teşvik olarak değerlendiriliyor.",
            ],
          ],
        },
        callout: {
          title: "Ajansınıza sorun: bu konuyu biliyor mu?",
          body: "Bu maddelerin çoğu genel web tasarımında tamamen normal — hatta önerilir. Müvekkil yorumu bölümü, başarı istatistiği ve kampanya duyurusu, sizi zor durumda bırakabilecek unsurlar. Teklif aldığınız ekibin bu ayrımı bilmesi, tasarım kalitesinden daha önemli.",
        },
      },
      {
        heading: "Peki nasıl rekabetçi olacaksınız?",
        body: [
          "Reklam yapamıyorsanız görünürlük nasıl artacak? Cevap, bu alanda en çok işe yarayan yöntemin zaten reklam olmaması: bilgilendirici içerik.",
          'İnsanlar avukat aramadan önce sorunlarını aratıyor. "İşten çıkarıldım tazminat alabilir miyim", "kira artış oranı ne kadar olabilir", "velayet davası ne kadar sürer". Bu sorulara doğru ve anlaşılır yanıt veren bir yazı, sizi hem bulunur hem güvenilir kılıyor — ve tamamen mevzuata uygun.',
          "Üstelik bu yöntem, reklam verenlere göre daha kalıcı. Reklam bütçesi bittiğinde trafik durur; iyi bir yazı yıllarca ziyaretçi getirmeye devam eder.",
        ],
        bullets: [
          {
            title: "Çalışma alanlarını ayrı ayrı anlatın",
            body: 'Boşanma davası arayan kişiyle iş davası arayan kişi farklı şeyler soruyor. Hepsi tek bir "çalışma alanlarımız" listesinde toplanırsa ne danışan aradığını bulur ne de arama motorları hangi alanda uzman olduğunuzu anlar.',
          },
          {
            title: "Sık sorulan soruları yanıtlayın",
            body: "Danışanların telefonda en çok sorduğu on soruyu düşünün ve yazılı yanıtlayın. Bu hem site içeriği hem de günlük iş yükünüzü azaltan bir kaynak.",
          },
          {
            title: "Süreç ve beklenti anlatın",
            body: '"Dava ne kadar sürer", "hangi belgeler gerekli", "ilk görüşmede ne konuşulur". Bu içerikler mevzuat açısından güvenli ve danışanın en çok ihtiyaç duyduğu bilgi.',
          },
          {
            title: "Ekip ve özgeçmişi öne çıkarın",
            body: "Eğitim, yayınlar, üyelikler, varsa akademik geçmiş. Bu alanda güven, iddiayla değil geçmişle kurulur.",
          },
        ],
      },
      {
        heading: "Teknik tarafta dikkat edilecekler",
        bullets: [
          {
            title: "İletişim formu güvenli mi?",
            body: 'Danışan formda dosyasıyla ilgili hassas bilgi paylaşabilir. Bağlantının şifreli olması, verinin nasıl saklandığının belirtilmesi ve gereksiz alan istenmemesi gerekir. "Sorununuzu anlatın" diye açık uçlu bir kutu koymak hem gizlilik riski hem de ulaşma oranını düşüren bir tercih.',
          },
          {
            title: "KVKK metinleri",
            body: "Aydınlatma metni ve açık rıza kutucuğu zorunlu. Hukuk bürosu sitesinde bunların eksik olması, ironik biçimde en sık gördüğümüz durumlardan biri.",
          },
          {
            title: "Alan adı ve site kime ait?",
            body: "Alan adının sizin veya büronuz adına kayıtlı olduğundan emin olun. Sözleşmeye alan adının ve kaynak kodun size ait olduğunu yazdırın.",
          },
          {
            title: "Mobilde hızlı mı?",
            body: "Ziyaretçilerin büyük kısmı telefondan geliyor ve hukuki destek arayan kişi genellikle acele ediyor. Teklif verenden mevcut bir işini isteyin, kendi telefonunuzdan açın.",
          },
        ],
      },
      {
        heading: "Bir de şu var: yorumlar sizin kontrolünüzde değil",
        body: [
          "Sitede müvekkil yorumu yayınlamıyorsunuz, ama Google İşletme Profilinizde yorumlar birikiyor ve siz istemeseniz de görünüyor. Bu, mevzuatın kapsamadığı ama itibarınızı doğrudan etkileyen bir alan.",
          "Yapılabilecek şey yorumları silmek değil — zaten mümkün de değil. Profilin size ait olduğundan emin olmak, bilgilerin doğru olmasını sağlamak ve yanıt hakkınızı kullanmak. Yanıt verirken de aynı çerçeve geçerli: dosya detayına girmeden, ölçülü bir dille.",
        ],
      },
    ],
    faq: [
      {
        q: "Avukat web sitesi yaptırmak yasak mı?",
        a: "Hayır. Kurumsal bir web sitesi kurmak, çalışma alanlarını anlatmak, özgeçmiş paylaşmak ve iletişim bilgisi vermek meşru bilgilendirmedir. Sınırlanan şey site kurmak değil, sitenin iş getirmeye yönelik reklam aracına dönüşmesi.",
      },
      {
        q: "Sitemde müvekkil yorumu yayınlayabilir miyim?",
        a: "Önermiyoruz. Tanıklığa dayalı tanıtım reklam kapsamında değerlendirilebiliyor ve ayrıca müvekkil gizliliği açısından risk taşıyor. Güveni yorumla değil; çalışma alanlarınızı net anlatarak, mesleki geçmişinizi göstererek ve bilgilendirici içerik üreterek kurmak hem daha güvenli hem daha kalıcı.",
      },
      {
        q: "Google reklamı verebilir miyim?",
        a: "Bu doğrudan mevzuat sorusu ve yanıtı bağlı olduğunuz baronun güncel düzenlemesine göre değişebiliyor. Genel eğilim, ücretli reklamın meslek kurallarıyla bağdaşmadığı yönünde. Karar vermeden önce baronuzla teyitleşmenizi öneririz; bu konuda ajansın sözüne güvenmeyin.",
      },
      {
        q: "Hukuki makale yazmak için ne kadar zaman ayırmalıyım?",
        a: "Ayda iki yazı bile fark yaratıyor. Önemli olan sıklık değil, sorulara gerçekten yanıt vermesi. Yazıların hukuki doğruluğu size ait olmak kaydıyla altyapıyı, yayın düzenini ve arama motoru tarafını biz kurarız.",
      },
      {
        q: "Avukat web sitesi ne kadar tutar?",
        a: "Az sayfalı bir tanıtım sitesi ₺50.000 bandında başlar. Çalışma alanlarının ayrı sayfalandığı, ekip ve makale bölümlü kurumsal bir büro sitesi ₺100.000–170.000 aralığındadır. Müvekkil portalı işin içine girdiğinde ₺250.000'den başlayan bir projeden söz ediyoruz.",
      },
    ],
    relatedSolutions: ["avukat", "musavir"],
  },

  // ───────────────────────────────────────────────────────── YENİLEME
  {
    slug: "web-sitesi-yenileme",
    title: "Web Sitesi Yenilerken Google Sıralamanızı Nasıl Korursunuz?",
    metaTitle: "Web Sitesi Yenileme — Sıralama Kaybetmeden",
    metaDescription:
      "Site yenilerken trafik kaybetmenin en yaygın sebebi yönlendirme eksikliği. Yenileme öncesi kontrol listesi ve sıralamanızı koruma adımları.",
    excerpt:
      "Yenilenen sitelerin trafiği neden düşer? Sebep tasarım değil, atlanan tek bir teknik adım. Yenileme öncesi yapılması gerekenler.",
    published: "2026-08-25",
    updated: "2026-08-27",
    tag: "Rehber",
    readingMinutes: 6,
    intro: [
      "Sitesini yenileten işletmelerin sık yaşadığı bir durum var: yeni site çok daha güzel ama Google'dan gelen ziyaretçi düşüyor. Bazen yarı yarıya.",
      "Sebep neredeyse her zaman aynı ve tasarımla ilgisi yok. Aşağıda ne olduğunu, nasıl önleneceğini ve yenileme öncesi yapılması gereken hazırlığı yazdık.",
    ],
    shortAnswer: {
      title: "Kısa cevap: sıralama neden düşer, nasıl korunur?",
      body: "Yenilenen sitelerin trafiği, tasarım değiştiği için değil, sayfa adresleri değişip eski adreslerden yenilerine yönlendirme kurulmadığı için düşer. Google sıralamayı alan adına değil tek tek sayfalara verir; eski adres 404 dönmeye başladığında o sayfanın yıllar içinde biriktirdiği değer kaybolur. Korunması gereken şey içerik değil, adres haritasıdır. Yenilemeden önce mevcut bütün adreslerin listesini çıkarın — sitemap'ten, Search Console'dan ve sunucu kayıtlarından — hangi sayfaların gerçekten trafik aldığını not edin ve her eski adresi yeni karşılığına eşleyen bir tablo hazırlayın. Yayına aldıktan sonra ilk hafta Search Console'da tarama hatalarını, 404 sayısını ve sıralama değişimlerini günlük takip edin. Kalıcı taşımalarda 301 yönlendirme kullanılır; 302 geçici demektir ve değeri aktarmaz. Yönlendirme zinciri kurmayın: eski adres doğrudan nihai adrese gitmeli. Yenilemeden önce şu soruyu da sorun: gerçekten yenilemeli misiniz? Trafiği yerinde olan bir sitede sorun çoğu zaman tasarım değil, eksik içerik ve yavaş açılan sayfalardır; ikisi de siteyi baştan kurmadan düzeltilebilir ve hiçbir adres değişmediği için hiçbir risk taşımaz.",
    },
    sections: [
      {
        heading: "Ne oluyor: adresler değişiyor, yönlendirme kurulmuyor",
        body: [
          "Google sitenizi adres adres tanıyor. Yıllar içinde her sayfanız için bir itibar birikiyor ve bu itibar adrese bağlı — sayfanın kendisine değil.",
          "Site yenilendiğinde adres yapısı genellikle değişiyor. Eski adres artık yok; ziyaretçi ve Google oraya gittiğinde 404 hatası alıyor. O sayfanın yıllarca biriktirdiği itibar hiçbir yere aktarılmıyor ve sıfırlanıyor.",
          "Çözüm basit ve standart: eski her adresin yeni karşılığına kalıcı olarak yönlendirilmesi. Buna 301 yönlendirmesi deniyor ve itibarın büyük kısmını yeni adrese taşıyor. Basit olmasına rağmen en sık atlanan adım bu.",
        ],
        callout: {
          title: "Teklif alırken sorun",
          body: '"Mevcut sayfalarımın adresleri değişecek mi? Değişecekse 301 yönlendirmeleri kuruluyor mu?" Bu soruya net cevap veremeyen bir ekiple yenileme yapmayın. Sonradan kurtarmak, baştan yapmaktan çok daha zor ve aylar alıyor.',
        },
      },
      {
        heading: "Yenileme öncesi hazırlık",
        body: [
          "Yenilemeye başlamadan önce mevcut sitenizin bir envanterini çıkarmak gerekiyor. Bu iş bir günde biter ve projenin en değerli saatidir.",
        ],
        bullets: [
          {
            title: "1. Mevcut adres listesini çıkarın",
            body: "Sitenizdeki tüm sayfaların adresini bir listeye alın. Google Search Console'a erişiminiz varsa hangi sayfaların gerçekten ziyaretçi aldığını da görebilirsiniz — öncelik onlarda.",
          },
          {
            title: "2. En çok ziyaret alan 20 sayfayı işaretleyin",
            body: "Trafiğin büyük kısmı genellikle az sayıda sayfadan geliyor. Bu sayfaların yeni sitede mutlaka bir karşılığı olmalı; içerikleri silinmemeli, sadece yeniden düzenlenmeli.",
          },
          {
            title: "3. Eski → yeni eşleştirme tablosu yapın",
            body: 'Her eski adresin yeni karşılığını yazın. Karşılığı olmayan bir sayfa varsa en yakın konudaki sayfaya yönlendirin; ana sayfaya yönlendirmek işe yaramıyor, Google bunu "içerik kayboldu" olarak okuyor.',
          },
          {
            title: "4. Mevcut trafiği kayıt altına alın",
            body: "Yenileme öncesi aylık ziyaretçi sayınızı not edin. Sonrasında karşılaştırma yapabilmek için bu tek referansınız olacak. Ölçmediğiniz bir düşüşü fark edemezsiniz.",
          },
          {
            title: "5. İçerikleri saklayın",
            body: "Eski sitedeki metinleri silmeden önce bir kopyasını alın. Yeni tasarım hazır olduğunda içeriği yeniden yazmak isteyebilirsiniz ama elinizde eski hali olması her zaman işinize yarar.",
          },
        ],
      },
      {
        heading: "Yayına aldıktan sonraki ilk hafta",
        bullets: [
          {
            title: "Yönlendirmeleri elle test edin",
            body: "Listenizdeki en önemli 20 eski adresi tarayıcıya tek tek yazın. Her biri doğru yeni sayfaya gitmeli. Bir tanesi 404 veriyorsa yönlendirme eksik demektir.",
          },
          {
            title: "Yeni site haritasını gönderin",
            body: "Google Search Console'dan yeni sitemap'i gönderin. Bu, yeni adreslerin taranmasını hızlandırıyor.",
          },
          {
            title: "Kapsam raporunu izleyin",
            body: "Search Console'daki hata sayısında artış varsa yönlendirmelerde eksik var demektir. İlk hafta bunu günlük kontrol edin.",
          },
          {
            title: "Trafiği haftalık karşılaştırın",
            body: "Küçük bir dalgalanma normal; yenileme sonrası Google'ın yeni yapıyı öğrenmesi birkaç hafta sürüyor. Ama belirgin ve süren bir düşüş varsa teknik bir sorun vardır ve beklemekle geçmez.",
          },
        ],
      },
      {
        heading: "Önce şunu sorun: gerçekten yenilemeli misiniz?",
        body: [
          "Bu yazıyı yenileme hizmeti veren bir ekip yazıyor, o yüzden şunu söylemek biraz garip: sitelerin bir kısmının yenilenmesi gerekmiyor. Sorun tasarımda değil başka bir yerde olabilir ve o zaman yeni site parayı boşa harcamak olur.",
          "Ziyaretçi geliyor ama kimse aramıyorsa sorun genellikle tasarım değil, ziyaretçinin ne yapacağını bilmemesi. İletişim yolunun görünür olması, tek bir düğmenin yeri veya telefon numarasının tıklanabilir olması bazen tüm farkı yaratıyor — bunlar mevcut sitede birkaç saatlik iş.",
          "Ziyaretçi hiç gelmiyorsa sorun sitede değil görünürlükte. Yeni bir site kurmak, kimsenin bulamadığı bir sitenin yerine yine kimsenin bulamayacağı bir site koymak demek. Önce arama motorlarında neden görünmediğinize bakmak gerekiyor.",
        ],
        bullets: [
          {
            title: "Yenileme gerçekten gerekli olduğunda",
            body: "Site mobilde bozuk görünüyorsa, açılması saniyeler sürüyorsa, içeriği kendiniz güncelleyemiyorsanız veya altyapı güvenlik güncellemesi almıyorsa — bunlar yamayla çözülmez, yenileme gerekir.",
          },
          {
            title: "Yenileme gereksiz olduğunda",
            body: 'Site çalışıyor, hızlı ve mobil uyumlu ama "biraz eski duruyor" diyorsanız, önce içeriği ve dönüşüm yolunu iyileştirmeyi deneyin. Aynı bütçeyle çok daha fazla sonuç alabilirsiniz.',
          },
          {
            title: "Kısmi yenileme de bir seçenek",
            body: "Tüm siteyi değiştirmek yerine yalnızca ana sayfayı yenilemek veya yeni bir hizmet bölümü eklemek çoğu zaman yeterli oluyor. Adres yapısı korunduğu için sıralama riski de olmuyor.",
          },
        ],
      },
      {
        heading: "Sıklıkla atlanan diğer şeyler",
        bullets: [
          {
            title: "Görsel adresleri",
            body: "Görsel arama üzerinden ziyaretçi alıyorsanız görsel adreslerinin de yönlendirilmesi gerekir. Küçük bir detay ama görsel trafiği olan sitelerde farkı hissediliyor.",
          },
          {
            title: "Eski blog yazıları",
            body: '"Blogu zaten kullanmıyoruz, kaldıralım" en pahalı kararlardan biri olabiliyor. O yazılar hâlâ ziyaretçi getiriyorsa silmek doğrudan trafik kaybı. Önce hangi yazıların ziyaret aldığını kontrol edin.',
          },
          {
            title: "Site haritası ve robots dosyası",
            body: "Yeni sitenin arama motorlarına açık olduğundan emin olun. Geliştirme sırasında siteyi kapatmak için konan bir ayarın yayında unutulması, gördüğümüz en sessiz ve en yıkıcı hata.",
          },
          {
            title: "Analitik ve dönüşüm takibi",
            body: "Yeni sitede ölçüm kodları yeniden kurulmalı. Aksi halde yenilemenin işe yarayıp yaramadığını hiç öğrenemezsiniz.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Site yenileyince Google'daki sıralamam sıfırlanır mı?",
        a: "Yönlendirmeler doğru kurulursa hayır. Kısa süreli bir dalgalanma olabilir ama birkaç hafta içinde toparlar. Yönlendirmeler atlanırsa evet, o sayfaların birikimi büyük ölçüde kaybolur ve yeniden kazanmak aylar alır.",
      },
      {
        q: "Adres yapısını hiç değiştirmesek olmaz mı?",
        a: 'En güvenlisi bu ve mümkünse öneririz. Eski adresler anlamlı ve düzgünse korumak, yönlendirme ihtiyacını tamamen ortadan kaldırır. Adres yapısını yalnızca gerçekten bozuksa değiştirin — "daha güzel dursun" diye değiştirmek gereksiz risk.',
      },
      {
        q: "Yenileme ne kadar sürer?",
        a: "Mevcut içerik korunuyorsa kurumsal bir site 2–4 hafta. Süreyi uzatan şey genellikle içeriğin yeniden yazılması ve karar değişiklikleri. Yönlendirme hazırlığı bu sürenin içinde, ayrı bir kalem değil.",
      },
      {
        q: "Eski sitemi ne zaman kapatmalıyım?",
        a: "Yeni site yayına girdikten sonra eski barındırmayı hemen iptal etmeyin. En az bir ay elinizde tutun; yönlendirmelerde eksik çıkarsa veya bir içeriğe ihtiyaç duyarsanız geri dönebilmelisiniz.",
      },
    ],
    relatedSolutions: ["kisiselmarka", "eticaret", "avukat"],
  },

  // ───────────────────────────────────────────────────────── DİKKAT
  {
    slug: "web-sitesi-yaptirirken-dikkat-edilecekler",
    title: "Web Sitesi Yaptırırken Nelere Dikkat Edilmeli?",
    metaTitle: "Web Sitesi Yaptırırken Nelere Dikkat Edilmeli?",
    metaDescription:
      "Web sitesi yaptırmadan önce sorulacak 10 soru: alan adı kime ait, kaynak kod sizin mi, teslim sonrası ne oluyor? Pahalıya patlayan hatalar ve nasıl önlenir.",
    excerpt:
      "Teklif aldığınız her ajansa sorabileceğiniz 10 soru. Çoğu ucuz, hepsi sonradan pahalıya patlayan hataları önlüyor.",
    published: "2026-08-25",
    updated: "2026-08-27",
    tag: "Rehber",
    readingMinutes: 8,
    intro: [
      "Web sitesi yaptırmak çoğu işletme için birkaç yılda bir yapılan bir iş. Bu yüzden neyin sorulacağı bilinmiyor ve aynı hatalar tekrarlanıyor.",
      "Aşağıdaki maddeleri bizden iş almasanız da kullanabilirsiniz. Teklif aldığınız her ajansa aynı soruları sorun; cevapların netliği, ekibin ciddiyeti hakkında fiyattan daha çok şey söyler.",
    ],
    shortAnswer: {
      title: "Kısa cevap: neyi yazılı olarak isteyin?",
      body: "Web sitesi yaptırırken en pahalıya patlayan hatalar teknik değil, sahiplikle ilgili olanlardır. Teklif almadan önce üç şeyi yazılı olarak netleştirin: alan adı kimin hesabında kayıtlı olacak, barındırma kimin adına açılacak ve teslimden sonra içeriği kim güncelleyebilecek. Ajansın hesabında duran bir alan adı, ilişki bittiği gün sitenizin rehin kalması demektir. Kalite tarafında sorulacak sorular şunlar: tasarım size özel mi yoksa satın alınmış bir tema mı, içeriği kim yazıyor, site telefonda gerçekten hızlı açılıyor mu ve teslim edilen sitede temel SEO ayarları ile KVKK metinleri hazır mı. Uyarı işaretleri: fiyatı yazmayan, neyin dahil olmadığını söylemeyen, referans sitelerini gösteremeyen ve teslimden sonrasını konuşmayan teklifler. Teklifleri karşılaştırırken toplam rakama değil, aynı kapsamın karşılığına bakın. Teklif istemeden önce hazırlayacağınız üç şey süreci kısaltır: kaç sayfa istediğiniz, elinizde hangi metin ve görsellerin hazır olduğu, beğendiğiniz üç örnek site. Bu üçü olmadan gelen teklifler tahmine dayanır ve yol boyunca değişir — fiyat da onunla birlikte.",
    },
    sections: [
      {
        heading: "Sahiplik: sitenin gerçekten sizin olduğundan emin olun",
        bullets: [
          {
            title: "1. Alan adı kimin adına kayıtlı?",
            body: "Alan adı sizin veya şirketinizin adına kayıtlı olmalı. Bazı ajanslar kendi hesabına alır; ayrılmak istediğinizde siteniz rehin kalır ve yıllarca kurduğunuz adres başkasının elinde olur. Kayıt bilgisini görmek isteyin.",
          },
          {
            title: "2. Kaynak kod size ait mi?",
            body: "Sözleşmede kaynak kodun size ait olduğu açıkça yazmalı. Yazmıyorsa, ileride başka bir ekiple çalışmak istediğinizde siteyi sıfırdan yaptırmanız gerekebilir.",
          },
          {
            title: "3. Hesaplara erişiminiz var mı?",
            body: 'Barındırma paneli, alan adı yönetimi, Google Search Console, analitik. Bunların tamamına erişiminiz olmalı. "Biz hallederiz" cevabı yeterli değil; erişim sizde olsun, yönetimi onlar yapsın.',
          },
        ],
      },
      {
        heading: "Kalite: neyi satın aldığınızı bilin",
        bullets: [
          {
            title: "4. Hazır tema mı, size özel tasarım mı?",
            body: "İkisi de meşru, ama fiyatları ve sonuçları çok farklı. Hazır tema ucuzdur ve hızlıdır; karşılığında benzer görünen yüzlerce siteden biri olursunuz ve tema güncellemeleri zamanla siteyi bozabilir. Farkı baştan sorun.",
          },
          {
            title: "5. Mobilde gerçekten hızlı mı?",
            body: "En kolay test: teklif verenden mevcut işlerinden birinin adresini isteyin ve kendi telefonunuzdan, kendi bağlantınızla açın. Üç saniyede açılmıyorsa ziyaretçi beklemez. Portfolyodaki güzel ekran görüntüleri bunu göstermez.",
          },
          {
            title: "6. Ziyaretçi ne yapacak?",
            body: "Ana sayfayı açtığınızda ne yapmanız gerektiği ilk ekranda belli mi? Arama, form, WhatsApp — hangisiyse görünür olmalı. Bu, tasarımın en çok atlanan ve en çok iş kaybettiren detayı.",
          },
        ],
      },
      {
        heading: "Yasal ve teknik asgariler",
        bullets: [
          {
            title: "7. KVKK metinleri dahil mi?",
            body: "İletişim formu varsa aydınlatma metni ve açık rıza kutucuğu zorunlu. Sağlık gibi özel nitelikli veri topluyorsanız kapsam daha da dar tutulmalı. Teklifte yoksa sonradan sizin sorununuz olur.",
          },
          {
            title: "8. Arama motoru ayarları yapılıyor mu?",
            body: "Başlık yapısı, site haritası, Search Console kaydı, hız optimizasyonu. Bunlar siteyi ilk sıraya çıkarmaz ama olmadan hiç görünmezsiniz. Teslimde yapılmış olmalı.",
          },
          {
            title: "9. Mevcut siteniz varsa yönlendirmeler kuruluyor mu?",
            body: "Yenileme yapıyorsanız bu madde en kritiği. Eski adreslerin yenilerine yönlendirilmesi gerekir; atlanırsa Google'daki mevcut sıralamanız sıfırlanır ve aylarca toparlanmaz. En sık gördüğümüz ve en pahalıya patlayan hata budur.",
          },
        ],
      },
      {
        heading: "Sonrası",
        bullets: [
          {
            title: "10. Teslimden sonra ne oluyor?",
            body: "Bakım kapsamı, süresi ve sorun çıktığında kime ulaşacağınız yazılı olsun. Sitenin yayına alınması işin sonu değil başıdır; destek verilmeyen siteler bir yıl içinde güncelliğini yitirir.",
          },
        ],
        callout: {
          title: "İçeriği kendiniz güncelleyebilecek misiniz?",
          body: "Bu soru bütçeyi doğrudan etkiliyor. Yılda birkaç kez değişen bir tanıtım sitesinde yönetim paneli gereksiz maliyettir. Düzenli yazı, ilan veya fiyat güncellemesi yapacaksanız panelsiz site kısa sürede güncelliğini yitirir. Kararı baştan verin — sonradan eklemek çok daha pahalı.",
        },
      },
      {
        heading: "Teklif istemeden önce hazırlayın",
        body: [
          "Aldığınız tekliflerin birbirinden çok farklı çıkmasının en yaygın sebebi, ajansların farklı şeyler anlaması. Aşağıdakileri önceden netleştirirseniz hem daha isabetli fiyat alırsınız hem de süreç kısalır.",
        ],
        bullets: [
          {
            title: "Sitenin asıl işi ne?",
            body: 'Telefon getirmesi mi, randevu alması mı, ürün satması mı, sadece güven vermesi mi? Tek cümleyle söyleyebiliyorsanız doğru teklifi alırsınız. "Güzel bir site olsun" cümlesi her ajansta farklı bir rakama dönüşür.',
          },
          {
            title: "Beğendiğiniz 3 site",
            body: "Rakip olması gerekmez, sektörünüzden bile olmayabilir. Neyi beğendiğinizi de yazın — düzeni mi, renkleri mi, anlatım tonu mu? Bu üç bağlantı, sayfalarca brief'ten daha çok iş görür.",
          },
          {
            title: "İçerik kimde?",
            body: "Metinler ve fotoğraflar sizde varsa süre kısalır ve fiyat düşer. Yoksa bunu baştan söyleyin; sonradan çıkan bir kalem olmasın.",
          },
          {
            title: "Kaba bütçe aralığı",
            body: "Bütçe söylemek pazarlık gücünüzü kaybettirmez; tam tersine size uygun kapsamda teklif gelmesini sağlar. Bütçe söylenmediğinde ajanslar ya çok yüksek ya çok düşük kapsamda teklif veriyor.",
          },
        ],
      },
      {
        heading: "Uyarı işaretleri",
        body: [
          'Bu maddelerin hiçbiri tek başına "kaç" demek değil, ama üst üste geldiklerinde durup düşünmek gerekir.',
        ],
        bullets: [
          {
            title: "Google'da ilk sıra garantisi",
            body: "Kimse Google'da sıralama garantisi veremez; algoritmayı Google belirliyor. Bunu vaat eden bir teklif, ya bilmiyordur ya da bilerek yanlış söylüyordur.",
          },
          {
            title: "Kapsamı kalem kalem yazmaktan kaçınma",
            body: '"Her şey dahil" cümlesi bir kapsam tanımı değil. Neyin dahil olduğunu yazılı isteyin; vermekten çekiniliyorsa teslimde de aynı belirsizlikle karşılaşırsınız.',
          },
          {
            title: "Tamamı peşin ödeme talebi",
            body: "Yaygın uygulama iki veya üç taksittir. Tamamını peşin isteyen bir yapıda, iş yarım kaldığında elinizde hiçbir kaldıraç kalmaz.",
          },
          {
            title: "Referans site gösterememe",
            body: "Yayında olan işleri isteyin ve kendi telefonunuzdan açın. Ekran görüntüsü yeterli değil — canlı adres olmalı.",
          },
          {
            title: "Aşırı kısa süre vaadi",
            body: '"Yarın hazır" demek, hazır bir şablona içerik yerleştirileceği anlamına gelir. Bu bir tercih olabilir, ama ne aldığınızı bilerek seçin.',
          },
        ],
      },
      {
        heading: "Teklifleri karşılaştırırken",
        body: [
          "İki teklif arasındaki fiyat farkı çoğu zaman kapsam farkıdır. Yan yana koyarken şuna bakın: her iki teklif de aynı işi mi tarif ediyor? Biri alan adını, KVKK metinlerini ve üç aylık desteği içeriyor, diğeri sadece tasarımı içeriyorsa rakamları karşılaştırmanın anlamı yok.",
          "En sağlıklısı, kapsamı kalem kalem yazılı istemek. Bunu vermekten çekinen bir ekiple çalışmayın; teslim sırasında da aynı belirsizlikle karşılaşırsınız.",
        ],
      },
    ],
    faq: [
      {
        q: "Ajansla mı yoksa serbest çalışanla mı çalışmalıyım?",
        a: "İkisi de olur. Serbest çalışan genellikle daha uygun fiyatlıdır ve küçük projelerde hızlı sonuç verir; riski, tek kişiye bağımlı olmanız ve destek sürekliliğidir. Ekip daha pahalıdır ama tasarım, geliştirme ve içerik aynı çatı altındadır. Proje büyüdükçe ekip tercih edilir.",
      },
      {
        q: "Sözleşme yapmak şart mı?",
        a: "Evet. Kapsam, teslim tarihi, ödeme planı, revizyon hakkı ve sahiplik yazılı olmalı. Sözleşmesiz çalışmak iki taraf için de risk; ciddi bir ekip zaten kendisi önerir.",
      },
      {
        q: "Ödeme nasıl yapılır?",
        a: "Yaygın uygulama peşin ve teslimde olmak üzere iki veya üç taksit. Tamamını peşin isteyen bir teklife dikkat edin; tamamını teslimde ödemek de ekip açısından makul değildir.",
      },
      {
        q: "Kaç revizyon hakkım var?",
        a: "Bu sözleşmede yazılı olmalı. Sağlıklı bir süreçte tasarım aşamasında revizyon serbesttir; geliştirme başladıktan sonra yapılan değişiklikler süre ve maliyet ekler. Bu yüzden tasarımı onaylamadan geliştirmeye geçilmemeli.",
      },
      {
        q: "Site yayına girdikten sonra Google'da hemen çıkar mıyım?",
        a: "Hayır. Yeni bir sitenin arama motorlarında yer edinmesi aylar alır. Marka adınızla birkaç hafta içinde çıkarsınız, ama rekabetçi aramalarda görünmek düzenli içerik ve zaman gerektirir. Bunu hemen vaat eden tekliflere şüpheyle yaklaşın.",
      },
    ],
    relatedSolutions: ["kisiselmarka", "eticaret", "doktor"],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

/** Yeniden en yeniye sıralı — liste sayfası ve sitemap için. */
export const postsByDate = [...posts].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export const blogUi = {
  eyebrow: "Blog",
  title: "Yazılar",
  lead: "Fiyat, süreç ve karar rehberleri. Satış metni değil; teklif alırken işinize yarayacak bilgiler.",
  home: "Ana Sayfa",
  readingSuffix: "dk okuma",
  faqTitle: "Sık sorulan sorular",
  relatedTitle: "İlgili çözümler",
  ctaTitle: "Projenizi konuşalım",
  ctaText:
    "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
  ctaButton: "Ücretsiz Teklif Al",
  updatedPrefix: "Güncellendi",
};

// ============================================================================
/**
 * Bir çözüm sayfasının gösterebileceği yazılar — `relatedSolutions`in TERSİ.
 *
 * `casesForSolution` ile aynı hikâye: eşleşme yazıların içinde zaten
 * yazılıydı ama yalnız tek yönde okunuyordu. Ölçüldü: beş blog yazısının
 * HER BİRİNE tek bir bağlantı geliyordu, o da /blog listesinden. Aynı
 * ölçümde /isler ve /blog 56 bağlantı alıyor (footer sitenin her
 * sayfasında). Yani sitenin uzun kuyruk için en değerli varlığı, iç
 * bağlantı grafiğinin en zayıf ucundaydı.
 *
 * Ekranda da doğru: "avukat web sitesi" arayıp gelen biri için reklam
 * yasağını anlatan yazı, o sayfadaki en yararlı ikinci adım.
 */
export const postsForSolution = (solutionKey: string) =>
  postsByDate.filter((y) => y.relatedSolutions?.includes(solutionKey));

// Build zamanı kontrol: relatedSolutions gerçek bir çözüm anahtarı olmalı.
// Yanlış anahtar sessizce çiziliyor değil — hiç çizilmiyordu; bir çözüm
// yeniden adlandırıldığında blogdan giden iç bağlantılar izsiz kaybolurdu.
// ============================================================================
assertSolutionKeys("blog", posts);
