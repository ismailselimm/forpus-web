import { postsByDate } from "@/lib/blog";
import { dictionary } from "@/lib/i18n/dictionary";
import { cases } from "@/lib/cases";
import { EPOSTA, SEHIR, TANIM, ULKE, YANIT_SURESI } from "@/lib/marka";
import { SITE_URL as SITE } from "@/lib/site";
import { solutions } from "@/lib/solutions";

/**
 * llms.txt — AI tarayıcılarının şirketi anlamak için okuduğu özet.
 *
 * ÜRETİLİYOR, elle yazılmıyor. Önce `public/llms.txt` diye statik bir dosyaydı
 * ve ölçüldüğünde çoktan ayrışmıştı: 17 çözüm sayfasının 10'unu listeliyor,
 * 9 vakanın 6'sını sayıyor, 5 blog yazısının hiçbirinden söz etmiyordu.
 * Üstelik olmayan iki nişi (tekne, girişimci) sayıyordu. Yani sitenin
 * hizmet sayfalarının %40'ı, tam da bu dosyanın var oluş sebebi olan yerde
 * görünmüyordu.
 *
 * `robots.ts`, `sitemap.ts` ve `manifest.ts` zaten bu deseni kullanıyor;
 * llms.txt tek istisnaydı.
 *
 * Marka paragrafı da artık `TANIM`dan geliyor; dosyadaki son elle yazılmış
 * metin oydu ve çoktan ayrışmıştı — hizmetler arasında sosyal medyayı
 * sayıyor, fiyat bandından hiç söz etmiyor, kurucuları sitedekinden farklı
 * tarif ediyordu. Aynı soruyu ("Forpus ne yapar?") cevaplayan iki metin
 * vardı ve biri kimsenin bakmadığı yerdeydi.
 *
 * Aşağıdaki Konum satırı ayrı bir beyan: şehir + hizmet alanı. O, iletişim
 * sayfasındaki ifadeyle (`lib/iletisim.ts`) aynı şeyi söylüyor ve doğru.
 */
export const dynamic = "force-static";

export function GET() {
  const govde = `# Forpus Yazılım

> Forpus, fikirleri büyüyen dijital ürünlere dönüştüren bir yazılım stüdyosudur. Web, mobil uygulama, Meta & Google reklamları, sosyal medya ve tasarım — tek çatı altında. (Forpus is a software studio that turns ideas into digital products that grow: web, mobile apps, ads, social media and design — under one roof.)

${TANIM.govde.tr}

${TANIM.govde.en}

## Hizmetler (Services)
${dictionary.tr.services.items
  .map(
    (h, i) =>
      `- ${h.name} / ${dictionary.en.services.items[i].name}: ${h.features.join(", ")}.`,
  )
  .join("\n")}

## Kimler için (Who we build for)
Forpus sektöre özel çözümler kurar. Her satırda niş ve o niş için açılmış sayfa var.
${solutions
  .map(
    (c) =>
      `- ${c.tr.h1}: ${SITE}/cozumler/${c.slug.tr}\n  ${c.en.h1}: ${SITE}/en/solutions/${c.slug.en}`,
  )
  .join("\n")}

## Seçili İşler (Selected work)
${cases.map((v) => `- ${v.h1}: ${SITE}/isler/${v.slug}`).join("\n")}

## Yazılar (Articles)
${postsByDate.map((y) => `- ${y.title} (${y.published}): ${SITE}/blog/${y.slug}`).join("\n")}

## İletişim (Contact)
- E-posta: ${EPOSTA}
- Konum / Location: ${SEHIR.tr}, ${ULKE.tr} — ofis ${SEHIR.tr}'da; Türkiye geneline ve yurt dışına hizmet veriyor. (Office in ${SEHIR.en}; serving all of ${ULKE.en} and internationally.)
- İletişim sayfası / Contact page: ${SITE}/iletisim (TR) · ${SITE}/en/contact (EN)
- Web: ${SITE} (TR) · ${SITE}/en (EN)

## Notlar (Notes)
- Diller: Türkçe (varsayılan) ve İngilizce.
- Teknoloji: Next.js, React, Flutter; modern, hızlı ve ölçeklenebilir çözümler.
- ${YANIT_SURESI.tam.tr} (${YANIT_SURESI.tam.en})
`;

  return new Response(govde, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
