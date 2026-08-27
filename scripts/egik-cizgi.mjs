import { readdir, mkdir, copyFile, access } from "node:fs/promises";
import { join, relative } from "node:path";

/**
 * SONDAKİ EĞİK ÇİZGİ — derleme sonrası, tek seferde, kalıcı.
 *
 * Statik export `out/iletisim.html` üretiyor; GitHub Pages bunu `/iletisim`
 * adresinde sunuyor ama `/iletisim/` adresinde 404 veriyor. Ölçüldü: bütün
 * çözüm sayfaları, `/blog/`, `/isler/`. Reklam panelleri, sohbet
 * uygulamaları ve elle kopyalanan bağlantılar adres sonuna eğik çizgi
 * eklemekte fazlasıyla cömert.
 *
 * BU SCRIPT her `X.html` için `X/index.html` kopyası yazıyor. Sonuç:
 * `/iletisim/` artık **HTTP 200 ve gerçek sayfa** döndürüyor.
 *
 * NEDEN BURADA, 404 SAYFASINDA DEĞİL: ilk çözüm 404 sayfasına konmuş bir
 * tarayıcı script'iydi ve üç şeyi birden kaçırıyordu.
 *   1. Sunucu yine de 404 statüsü döndürüyordu. WhatsApp, Slack, LinkedIn
 *      önizleme botları ve Google Ads'in hedef denetleyicisi JavaScript
 *      çalıştırmaz — yani korunmak istenen kanalların tam da hepsi hata
 *      görüyordu.
 *   2. Googlebot için sonuç yumuşak-404'tü; sonu eğik çizgili gelen dış
 *      bağlantının değeri gerçek sayfaya geçmiyordu.
 *   3. Düzeltme `location.pathname`in — yani dışarıdan gelen bir dizenin —
 *      aktığı katmanda durduğu için açık yönlendirmeye yol açtı ve bir
 *      commit sonra kendi güvenlik yamasını gerektirdi. Derleme zamanında
 *      öyle bir girdi yok; açığın tamamı katmanla birlikte kayboluyor.
 *
 * NEDEN `trailingSlash: true` DEĞİL: o seçenek sitedeki BÜTÜN adresleri
 * eğik çizgili biçime çevirip indekste bulunan her sayfayı 301 zincirine
 * sokardı. Site 41 günlük ve 17 sayfası gösterim alıyor. Buradaki çözüm
 * çalışan hiçbir adrese dokunmuyor — sadece kırık olanı çalışır kılıyor.
 *
 * Çift içerik riski yok: canonical'lar eğik çizgisiz biçimi işaret ediyor
 * (`app/layout.tsx`, `lib/solution-seo.ts`, `lib/hukuki.ts`).
 */

const CIKTI = "out";

/** `X.html` → `X/index.html`. Zaten klasör olarak varsa dokunmuyor. */
async function gez(dizin) {
  const girdiler = await readdir(dizin, { withFileTypes: true });
  const klasorler = new Set(
    girdiler.filter((g) => g.isDirectory()).map((g) => g.name),
  );
  let sayac = 0;

  for (const girdi of girdiler) {
    const yol = join(dizin, girdi.name);

    if (girdi.isDirectory()) {
      sayac += await gez(yol);
      continue;
    }
    if (!girdi.name.endsWith(".html")) continue;

    const taban = girdi.name.slice(0, -".html".length);

    // `index.html` zaten klasörün kendisi. `404.html` GitHub Pages'in
    // hata sayfası — kopyalanırsa `/404/` diye gerçek bir sayfa olurdu.
    if (taban === "index" || taban === "404") continue;

    // Aynı adda klasör olması tek başına yetmiyor: `out/blog.html` ile
    // `out/blog/` (yazılar) yan yana duruyor ama `out/blog/index.html`
    // yoktu, yani `/blog/` hâlâ 404 veriyordu. Asıl soru klasörün varlığı
    // değil, İÇİNDE index.html olup olmadığı.
    if (klasorler.has(taban)) {
      const varMi = await access(join(dizin, taban, "index.html")).then(
        () => true,
        () => false,
      );
      if (varMi) continue;
    }

    await mkdir(join(dizin, taban), { recursive: true });
    await copyFile(yol, join(dizin, taban, "index.html"));
    sayac++;
  }
  return sayac;
}

const adet = await gez(CIKTI);
console.log(
  `  sondaki eğik çizgi: ${adet} sayfa için ${relative(".", CIKTI)}/…/index.html kopyası yazıldı`,
);
