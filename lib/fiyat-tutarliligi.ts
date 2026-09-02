import { posts, type BlogPost } from "./blog";
import { solutions } from "./solutions";
import { PRICE_FLOOR, fiyatlariOku } from "./pricing";

/**
 * BLOG FİYATLARI SEKTÖR BANTLARIYLA TUTUYOR MU — derleme zamanı kontrolü.
 *
 * NEDEN: yazılar fiyat tablolarını ELLE taşıyor ve bu doğru. Blog tablosu
 * (`caption/head/rows`, dört taranabilir sütun) ile satış kartı
 * (`{name, price, timeline, body}`) farklı şeyler; birini diğerinden
 * türetmek editoryal yapıyı bir bileşenin şekline büker. Ama `avukat`
 * sektörünün bandı şu an `solutions.ts` dışında ÜÇ yerde daha yazılı ve
 * sektör sayfasındaki rakamı değiştiren kişinin bir blog yazısının onu
 * alıntıladığını bilmesinin hiçbir yolu yok.
 *
 * Sitenin bütün iddiası "gerçek rakam yazıyoruz". Aynı sorguda çıkan iki
 * sayfanın aynı iş için farklı fiyat söylemesi, o iddiayı bozan tek şey.
 * Kontrol elle yazmayı serbest bırakıyor, sessizce ayrışmayı yasaklıyor.
 *
 * NEDEN AYRI DOSYADA: bir ara `lib/blog.ts`in içindeydi ve orada
 * `solutions`ı DEĞER olarak içe aktarıyordu. Sonuç, blogu okuyan her
 * bileşenin 248 kB'lık içerik dosyasına dolaylı olarak bağlanmasıydı —
 * `solution-index.ts` ve `solution-ui.ts` tam da bunu önlemek için var.
 * Kontrol bir veri modülü değil, bir derleme adımı; ikisini ayırmak
 * grafiği temiz tutuyor. `app/sitemap.ts` zaten ikisini de okuyor ve
 * derleme zamanında çalışıyor, çağıran orası.
 *
 * Kapsam: yalnızca sektör bandı biçimindeki rakamlar (`PRICE_FLOOR` ve üstü).
 * Rakip tekliflerinden söz eden "₺5.000'e web sitesi" gibi ifadeler
 * kasıtlı olarak sektör listesinde yok; eşik onları dışarıda bırakıyor.
 */
export function assertBlogFiyatlari() {
  const bandlar = new Set<number>();
  for (const s of solutions) {
    for (const c of [s.tr, s.en]) {
      for (const t of c.pricing?.tiers ?? []) {
        for (const n of fiyatlariOku(t.price)) bandlar.add(n);
      }
    }
  }
  const metin = (y: BlogPost) =>
    [
      ...y.intro,
      y.shortAnswer.body,
      ...y.sections.flatMap((b) => [
        ...(b.body ?? []),
        ...(b.bullets ?? []).flatMap((m) => [m.title, m.body]),
        ...(b.table ? b.table.rows.flat() : []),
        ...(b.callout ? [b.callout.title, b.callout.body] : []),
      ]),
      ...(y.faq ?? []).flatMap((f) => [f.q, f.a]),
    ].join(" ");

  for (const y of posts) {
    for (const sayi of fiyatlariOku(metin(y))) {
      if (sayi < PRICE_FLOOR) continue;
      if (!bandlar.has(sayi)) {
        throw new Error(
          `blog: "${y.slug}" ₺${sayi.toLocaleString("tr-TR")} diyor ama bu rakam hiçbir sektörün fiyat bandında yok — biri güncellenmiş, diğeri unutulmuş olabilir`,
        );
      }
    }
  }
}
