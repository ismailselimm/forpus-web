import { postsByDate } from "@/lib/blog";
import { cases } from "@/lib/cases";
import { EPOSTA } from "@/lib/marka";
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
 */
export const dynamic = "force-static";

export function GET() {
  const govde = `# Forpus Yazılım

> Forpus, fikirleri büyüyen dijital ürünlere dönüştüren bir yazılım stüdyosudur. Web, mobil uygulama, Meta & Google reklamları, sosyal medya ve tasarım — tek çatı altında. (Forpus is a software studio that turns ideas into digital products that grow: web, mobile apps, ads, social media and design — under one roof.)

Forpus Yazılım, iki mühendis kurucu (biri mobil uygulama & sistem, diğeri web & arayüz odaklı) ve birlikte çalıştığı tasarımcı, reklam ve içerik ekibinden oluşur. Türkiye merkezlidir ve uzaktan çalışır. Markaları uçtan uca dijitale taşır: keşif/strateji, tasarım, geliştirme, lansman ve büyüme.

## Hizmetler (Services)
- Web Yazılım & Geliştirme: kurumsal web siteleri, web uygulamaları, e-ticaret, SEO & performans.
- Mobil Uygulama: iOS & Android, Flutter, App Store & Google Play yayını, bildirim & analitik.
- Reklam & Performans: Meta Ads, Google Ads, dönüşüm takibi, A/B test.
- Sosyal Medya & Tasarım: sosyal medya yönetimi, marka kimliği, UI/UX ve grafik tasarım.

## Kimler için (Who we build for)
Forpus sektöre özel çözümler kurar. Her satırda niş ve o niş için açılmış sayfa var.
${solutions.map((c) => `- ${c.tr.h1}: ${SITE}/cozumler/${c.slug.tr}`).join("\n")}

## Seçili İşler (Selected work)
${cases.map((v) => `- ${v.h1}: ${SITE}/isler/${v.slug}`).join("\n")}

## Yazılar (Articles)
${postsByDate.map((y) => `- ${y.title} (${y.published}): ${SITE}/blog/${y.slug}`).join("\n")}

## İletişim (Contact)
- E-posta: ${EPOSTA}
- Konum: Türkiye (uzaktan çalışır)
- Web: ${SITE}

## Notlar (Notes)
- Diller: Türkçe (varsayılan) ve İngilizce.
- Teknoloji: Next.js, React, Flutter; modern, hızlı ve ölçeklenebilir çözümler.
- Yeni proje teklifi için 48 saat içinde dönüş yapılır.
`;

  return new Response(govde, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
