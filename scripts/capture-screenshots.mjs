// Capture real screenshots of Forpus reference sites for the Work showcase.
// Desktop hero shots at retina (2x). Saves to public/work/<slug>.png
import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "work");

const SITES = [
  { slug: "doldurkabi", url: "https://doldurkabi.com/" },
  { slug: "temizlikexpress", url: "https://temizlikexpress.com/" },
  { slug: "harmanapps", url: "https://harmanapps.com/" },
  { slug: "esenkuruyemis", url: "https://esenkuruyemis.com/" },
  { slug: "sagemakine", url: "https://sagemakine.com/" },
  { slug: "dryasin", url: "https://dryasinkurtbogan.com.tr/" },
  { slug: "merak", url: "http://meraketogren.com/" },
  { slug: "cekictrans", url: "https://cekictrans.com/" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
});

let ok = 0;
for (const s of SITES) {
  const page = await context.newPage();
  try {
    console.log(`-> ${s.slug}: ${s.url}`);
    await page.goto(s.url, { waitUntil: "networkidle", timeout: 45000 }).catch(async () => {
      await page.goto(s.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(4500); // let fonts/animations settle
    const out = path.join(OUT, `${s.slug}.png`);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    console.log(`   saved ${out}`);
    ok++;
  } catch (e) {
    console.log(`   FAILED ${s.slug}: ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\n=== screenshots: ${ok}/${SITES.length} ===`);
