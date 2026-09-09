import { chromium } from "playwright";
const url = process.argv[2], ad = process.argv[3];
const OUT = process.env.HOME + "/Desktop/FORPUS/demolar/cobas-avukatlik/notlar";
const t = await chromium.launch();
for (const [tip, vp, dsf] of [["masaustu",{width:1440,height:1000},2],["mobil",{width:390,height:844},3]]) {
  const c = await t.newContext({ viewport: vp, deviceScaleFactor: dsf, isMobile: tip==="mobil", hasTouch: tip==="mobil" });
  const p = await c.newPage();
  const hatalar = [];
  p.on("console", m => { if (m.type()==="error") hatalar.push(m.text()); });
  p.on("requestfailed", r => hatalar.push("YÜKLENMEDİ: " + r.url().split("/").pop()));
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `${OUT}/${ad}-${tip}.png`, fullPage: true });
  const olcu = await p.evaluate(() => ({
    yatayTasma: document.documentElement.scrollWidth > window.innerWidth + 1,
    yukseklik: document.documentElement.scrollHeight,
    fontlar: [...document.fonts].filter(f => f.status === "loaded").map(f => f.family + " " + f.weight),
  }));
  console.log(`  ${tip}: ${olcu.yukseklik}px | yatay taşma: ${olcu.yatayTasma ? "VAR ✗" : "yok ✓"} | yüklü font: ${[...new Set(olcu.fontlar)].join(", ")}`);
  if (hatalar.length) console.log("   hata:", [...new Set(hatalar)].slice(0,6).join(" | "));
  await c.close();
}
await t.close();
