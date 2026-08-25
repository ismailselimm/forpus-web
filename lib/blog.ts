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

import { solutionIndex } from "./solution-index";

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
    tag: "Fiyat Rehberi",
    readingMinutes: 7,
    intro: [
      "Bu sorunun tek bir cevabı yok, ama \"duruma göre değişir\" demek de işe yaramıyor. Aşağıda 2026 için gerçek aralıkları, o aralıkları neyin belirlediğini ve hangi durumda fazla ödediğinizi yazdık.",
      "Rakamlar Türkiye piyasası için ve kurumsal iş yapan ekiplerin bandını yansıtıyor. Çok daha ucuz teklifler de göreceksiniz; onların neden ucuz olduğunu da açıklıyoruz — her zaman kötü değil, ama neyi almadığınızı bilmeniz gerekiyor.",
    ],
    sections: [
      {
        heading: "Kısa cevap: site tipine göre bandlar",
        body: [
          "Web sitesi denince çok farklı işler kastediliyor. Tek sayfalık bir tanıtım sitesiyle ödeme alan bir e-ticaret mağazası arasında on kat fark olması normal. Aşağıdaki tablo en yaygın dört tipi ve 2026 başlangıç bandlarını gösteriyor.",
        ],
        table: {
          caption: "2026 başlangıç fiyatları — Türkiye, kurumsal iş yapan ekipler",
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
          "Çoğu insan \"kaç sayfa olacak\" diye soruyor. Sayfa sayısı maliyetin küçük bir parçası; asıl belirleyiciler şunlar:",
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
            body: "Randevu takvimi, üyelik girişi, ödeme, stok takibi... Bunların her biri siteyi \"tanıtım\" olmaktan çıkarıp yazılıma dönüştürür. Fiyat bandı da ona göre sıçrar.",
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
            body: "Ziyaretçilerin büyük kısmı telefondan geliyor. \"Mobil uyumlu\" bir ek özellik değil, asgari beklenti.",
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
    tag: "Fiyat Rehberi",
    readingMinutes: 6,
    intro: [
      "Uygulama fikri olan çoğu kişinin takıldığı yer teknik değil, belirsizlik. Ne kadar tutacağı bilinmediği için karar verilemiyor ve iyi fikirler yıllarca beklemede kalıyor.",
      "Aşağıda 2026 için gerçek bandları, o bandları neyin belirlediğini ve bütçeyi en çok şişiren hatayı yazdık.",
    ],
    sections: [
      {
        heading: "Kısa cevap: kapsama göre bandlar",
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
          "Fiyatı asıl belirleyen, uygulamanın \"ne yaptığı\". Aşağıdaki tablo, temel bir uygulamaya eklendiğinde maliyeti ne kadar büyüttüklerine göre en yaygın özellikleri gösteriyor. Rakamlar mutlak değil, birbirine göre ağırlığı anlamanız için.",
        ],
        table: {
          caption: "Özelliklerin maliyete etkisi — temel uygulamaya ek olarak",
          head: ["Özellik", "Ek maliyet", "Neden"],
          rows: [
            ["Kullanıcı girişi", "Düşük", "Standart çözümlerle hızlı kurulur; e-posta, telefon veya sosyal hesapla giriş."],
            ["Bildirim gönderme", "Düşük", "Altyapısı hazır; asıl iş hangi olayda kime gideceğinin kurgulanması."],
            ["Harita ve konum", "Orta", "Gösterim kolay; rota, mesafe hesabı ve canlı takip işi büyütür."],
            ["Ödeme alma", "Orta", "Entegrasyon standart, ama iade, fatura ve hata durumları ciddi test gerektirir."],
            ["Sohbet / mesajlaşma", "Yüksek", "Gerçek zamanlı bağlantı, okundu bilgisi, geçmiş, bildirim — kendi başına bir proje."],
            ["Çok rollü panel", "Yüksek", "Müşteri, kurye, yönetici gibi her rol ayrı ekranlar ve yetki kuralları demek."],
            ["Çevrimdışı çalışma", "Yüksek", "Veriyi cihazda tutup sonra eşitlemek, yazılımın en zor konularından biri."],
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

  // ───────────────────────────────────────────────────────── DİKKAT
  {
    slug: "web-sitesi-yaptirirken-dikkat-edilecekler",
    title: "Web Sitesi Yaptırırken Nelere Dikkat Edilmeli?",
    metaTitle: "Web Sitesi Yaptırırken Nelere Dikkat Edilmeli? 10 Madde",
    metaDescription:
      "Web sitesi yaptırmadan önce sorulacak 10 soru: alan adı kime ait, kaynak kod sizin mi, teslim sonrası ne oluyor? Pahalıya patlayan hatalar ve nasıl önlenir.",
    excerpt:
      "Teklif aldığınız her ajansa sorabileceğiniz 10 soru. Çoğu ucuz, hepsi sonradan pahalıya patlayan hataları önlüyor.",
    published: "2026-08-25",
    tag: "Rehber",
    readingMinutes: 8,
    intro: [
      "Web sitesi yaptırmak çoğu işletme için birkaç yılda bir yapılan bir iş. Bu yüzden neyin sorulacağı bilinmiyor ve aynı hatalar tekrarlanıyor.",
      "Aşağıdaki maddeleri bizden iş almasanız da kullanabilirsiniz. Teklif aldığınız her ajansa aynı soruları sorun; cevapların netliği, ekibin ciddiyeti hakkında fiyattan daha çok şey söyler.",
    ],
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
            body: "Barındırma paneli, alan adı yönetimi, Google Search Console, analitik. Bunların tamamına erişiminiz olmalı. \"Biz hallederiz\" cevabı yeterli değil; erişim sizde olsun, yönetimi onlar yapsın.",
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
            body: "Telefon getirmesi mi, randevu alması mı, ürün satması mı, sadece güven vermesi mi? Tek cümleyle söyleyebiliyorsanız doğru teklifi alırsınız. \"Güzel bir site olsun\" cümlesi her ajansta farklı bir rakama dönüşür.",
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
          "Bu maddelerin hiçbiri tek başına \"kaç\" demek değil, ama üst üste geldiklerinde durup düşünmek gerekir.",
        ],
        bullets: [
          {
            title: "Google'da ilk sıra garantisi",
            body: "Kimse Google'da sıralama garantisi veremez; algoritmayı Google belirliyor. Bunu vaat eden bir teklif, ya bilmiyordur ya da bilerek yanlış söylüyordur.",
          },
          {
            title: "Kapsamı kalem kalem yazmaktan kaçınma",
            body: "\"Her şey dahil\" cümlesi bir kapsam tanımı değil. Neyin dahil olduğunu yazılı isteyin; vermekten çekiniliyorsa teslimde de aynı belirsizlikle karşılaşırsınız.",
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
            body: "\"Yarın hazır\" demek, hazır bir şablona içerik yerleştirileceği anlamına gelir. Bu bir tercih olabilir, ama ne aldığınızı bilerek seçin.",
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
export const postsByDate = [...posts].sort((a, b) => b.published.localeCompare(a.published));

export const blogUi = {
  eyebrow: "Blog",
  title: "Yazılar",
  lead: "Fiyat, süreç ve karar rehberleri. Satış metni değil; teklif alırken işinize yarayacak bilgiler.",
  home: "Ana Sayfa",
  readingSuffix: "dk okuma",
  faqTitle: "Sık sorulan sorular",
  relatedTitle: "İlgili çözümler",
  ctaTitle: "Projenizi konuşalım",
  ctaText: "Ücretsiz bir görüşmede ihtiyacınızı netleştirip net bir teklif sunalım.",
  ctaButton: "Ücretsiz Teklif Al",
  updatedPrefix: "Güncellendi",
};

// ============================================================================
// Build zamanı kontrol: relatedSolutions gerçek bir çözüm anahtarı olmalı.
// Yanlış anahtar sessizce çiziliyor değil — hiç çizilmiyordu; bir çözüm
// yeniden adlandırıldığında blogdan giden iç bağlantılar izsiz kaybolurdu.
// ============================================================================
{
  const keys = new Set(solutionIndex.map((r) => r.key));
  for (const p of posts) {
    for (const k of p.relatedSolutions ?? []) {
      if (!keys.has(k)) throw new Error(`blog: "${p.slug}" → bilinmeyen çözüm "${k}"`);
    }
  }
}
