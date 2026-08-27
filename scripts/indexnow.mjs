import { readFile } from "node:fs/promises";

/**
 * INDEXNOW — yayından sonra arama motorlarına "şu adresler değişti" der.
 *
 * NEDEN: site 16 Temmuz 2026'da indekse girdi ve 41 günde 85 gösterim
 * aldı. Yeni ve otoritesiz bir alan adında tarayıcı nadiren uğruyor;
 * IndexNow o beklemeyi atlıyor. Bing ve Yandex protokolü destekliyor,
 * bildirim ikisine birden gidiyor (tek uç nokta paylaşımlı).
 *
 * Bing indeksi ayrıca Copilot'un yapay zekâ cevaplarını besliyor — yani
 * bu, GEO tarafında da doğrudan bir kanal.
 *
 * Google IndexNow'ı KULLANMIYOR; onun için sitemap ve Search Console var.
 * Bu script Google'a bir şey iddia etmiyor.
 *
 * Anahtar doğrulaması: `public/<anahtar>.txt` dosyası aynı anahtarı
 * içeriyor ve kök dizinden servis ediliyor. Sunucu onu okuyup bildirimin
 * gerçekten site sahibinden geldiğini doğruluyor.
 */
const ANAHTAR = "582a77f8b203e10e277985f95ae73b7b";
const SITE = "forpusyazilim.com";

const sitemap = await readFile("out/sitemap.xml", "utf8");
const adresler = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (adresler.length === 0) {
  console.log("  IndexNow: sitemap boş, bildirim atlandı");
  process.exit(0);
}

const cevap = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: SITE,
    key: ANAHTAR,
    keyLocation: `https://${SITE}/${ANAHTAR}.txt`,
    urlList: adresler,
  }),
});

// 200 ve 202 ikisi de başarı: 202 "aldım, sıraya koydum" demek.
console.log(
  cevap.ok
    ? `  IndexNow: ${adresler.length} adres bildirildi (HTTP ${cevap.status})`
    : `  IndexNow: bildirim başarısız (HTTP ${cevap.status}) — yayını engellemiyor`,
);
