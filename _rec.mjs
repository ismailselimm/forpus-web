import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: "/tmp/spvid", size: { width: 1280, height: 800 } },
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
});
const p = await ctx.newPage();
await p.goto("https://seapleasure.com.tr/", { waitUntil: "load", timeout: 45000 }).catch(e=>console.log("goto:",e.message));
// force all videos to play muted (ensure hero background is moving in the recording)
await p.evaluate(() => document.querySelectorAll("video").forEach(v => { v.muted = true; v.loop = true; v.play().catch(()=>{}); }));
await p.waitForTimeout(11000); // ~11s of hero
await p.close();      // finalizes the recorded video
await ctx.close();
await b.close();
console.log("kayıt bitti");
