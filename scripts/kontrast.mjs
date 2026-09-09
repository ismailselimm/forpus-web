import { chromium } from "playwright";
const t = await chromium.launch(); const p = await (await t.newContext({viewport:{width:1440,height:1000}})).newPage();
await p.goto("http://127.0.0.1:8899/", { waitUntil: "networkidle" });
const sonuc = await p.evaluate(() => {
  const parse = c => { const m = c.match(/[\d.]+/g).map(Number); return m.slice(0,3); };
  const lin = v => { v /= 255; return v <= .03928 ? v/12.92 : Math.pow((v+.055)/1.055, 2.4); };
  const L = ([r,g,b]) => .2126*lin(r) + .7152*lin(g) + .0722*lin(b);
  const oran = (a,b) => { const l1 = L(a), l2 = L(b); return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05); };
  const zemin = el => {
    const katman = []; let n = el;
    while (n) { const bg = getComputedStyle(n).backgroundColor;
      if (bg && !/rgba\(0, 0, 0, 0\)/.test(bg)) { const v = bg.match(/[\d.]+/g).map(Number); katman.push([v[0],v[1],v[2], v.length>3?v[3]:1]); if (v.length<4||v[3]===1) break; }
      n = n.parentElement; }
    katman.push([16,20,24,1]);
    let sonuc = katman[katman.length-1].slice(0,3);
    for (let i = katman.length-2; i >= 0; i--) { const [r,g,b,a]=katman[i];
      sonuc = [r*a+sonuc[0]*(1-a), g*a+sonuc[1]*(1-a), b*a+sonuc[2]*(1-a)]; }
    return sonuc; };
  const kotu = [];
  document.querySelectorAll("p, h1, h2, h3, h4, a, span, li, summary, label").forEach(el => {
    if (!el.textContent.trim() || el.offsetHeight === 0) return;
    const s = getComputedStyle(el);
    const px = parseFloat(s.fontSize), kalin = parseInt(s.fontWeight) >= 700;
    const esik = (px >= 24 || (px >= 18.66 && kalin)) ? 3 : 4.5;
    const o = oran(parse(s.color), zemin(el));
    if (o < esik) kotu.push({ metin: el.textContent.trim().slice(0,42), oran: +o.toFixed(2), esik, px: Math.round(px), sinif: el.className });
  });
  const gorulen = new Set(); return kotu.filter(k => !gorulen.has(k.sinif+k.oran) && gorulen.add(k.sinif+k.oran)).slice(0,14);
});
sonuc.length ? sonuc.forEach(k => console.log(`  ${k.oran} (gerekli ${k.esik}) ${k.px}px · ${k.sinif} · "${k.metin}"`)) : console.log("  ✓ metin kontrastı geçti");
await t.close();
