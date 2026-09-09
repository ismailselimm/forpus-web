import { chromium } from "playwright";
import fs from "fs";
const OUT = process.env.HOME + "/Desktop/FORPUS/gorseller/hikaye/ham";
const [slug, url] = [process.argv[2], process.argv[3]];
const tarayici = await chromium.launch();
for (const [tip, vp, dsf] of [["masaustu",{width:1440,height:900},2],["mobil",{width:390,height:844},3]]) {
  const yol = `${OUT}/${slug}-${tip}.png`;
  try {
    const ctx = await tarayici.newContext({ viewport: vp, deviceScaleFactor: dsf,
      userAgent: tip==="mobil" ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" : undefined,
      isMobile: tip==="mobil", hasTouch: tip==="mobil" });
    const p = await ctx.newPage();
    // networkidle bu sitede hiç gelmiyor (sürekli istek var); domcontentloaded + bekleme.
    await p.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await p.waitForTimeout(9000);
    for (const s of ['button:has-text("Kabul")','button:has-text("Tamam")','button:has-text("Accept")','#onetrust-accept-btn-handler']) {
      try { const el = await p.$(s); if (el && await el.isVisible()) { await el.click({timeout:1500}); await p.waitForTimeout(700); } } catch {}
    }
    await p.evaluate(() => window.scrollTo(0,0));
    await p.waitForTimeout(1500);
    await p.screenshot({ path: yol });
    await ctx.close();
    console.log(`  ✓ ${slug}-${tip}  ${vp.width*dsf}×${vp.height*dsf}  ${Math.round(fs.statSync(yol).size/1024)}KB`);
  } catch(e) { console.log(`  ✗ ${slug}-${tip}: ${String(e).slice(0,90)}`); }
}
await tarayici.close();
