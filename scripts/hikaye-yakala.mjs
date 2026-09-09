import { chromium } from "playwright";
import fs from "fs";
const OUT = process.env.HOME + "/Desktop/FORPUS/gorseller/hikaye/ham";
const SITES = [
  ["doldurkabi","https://doldurkabi.com/"],
  ["temizlikexpress","https://temizlikexpress.com/"],
  ["seapleasure","https://seapleasure.com.tr/"],
  ["diyetisyenece","https://diyetisyeneceozturk.com/"],
  ["sagemakine","https://sagemakine.com/"],
  ["merak","https://meraketogren.com/"],
  ["dryasin","https://dryasinkurtbogan.com.tr/"],
  ["cekictrans","https://cekictrans.com/"],
];
const tarayici = await chromium.launch();
for (const [slug, url] of SITES) {
  for (const [tip, vp, dsf] of [["masaustu",{width:1440,height:900},2],["mobil",{width:390,height:844},3]]) {
    const yol = `${OUT}/${slug}-${tip}.png`;
    try {
      const ctx = await tarayici.newContext({ viewport: vp, deviceScaleFactor: dsf,
        userAgent: tip==="mobil" ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" : undefined,
        isMobile: tip==="mobil", hasTouch: tip==="mobil" });
      const p = await ctx.newPage();
      await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await p.waitForTimeout(3500);
      // çerez/kapanan katmanları kapat
      for (const s of ['button:has-text("Kabul")','button:has-text("Tamam")','button:has-text("Accept")','[aria-label*="apat"]','.cookie-accept','#onetrust-accept-btn-handler']) {
        try { const el = await p.$(s); if (el && await el.isVisible()) { await el.click({timeout:1500}); await p.waitForTimeout(600); } } catch {}
      }
      await p.evaluate(() => window.scrollTo(0,0));
      await p.waitForTimeout(800);
      await p.screenshot({ path: yol });
      await ctx.close();
      const kb = Math.round(fs.statSync(yol).size/1024);
      console.log(`  ✓ ${slug}-${tip}  ${vp.width*dsf}×${vp.height*dsf}  ${kb}KB`);
    } catch(e) { console.log(`  ✗ ${slug}-${tip}: ${String(e).slice(0,80)}`); }
  }
}
await tarayici.close();
