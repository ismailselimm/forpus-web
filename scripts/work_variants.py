#!/usr/bin/env python3
"""public/work/*.webp için duyarlı görsel türevleri üretir.

Neden gerekli: `images: { unoptimized: true }` (statik export zorunluluğu)
yüzünden next/image srcset üretmiyor ve `sizes` prop'u HTML'e hiç yazılmıyor —
ne yazarsak yazalım ham dosya iniyor. Ölçüldü: /isler listesi 9 tam boy
ekran görüntüsüyle 779KB indiriyordu, hepsi ~460 CSS px'lik kartlarda.

Türevleri lib/projects.ts içindeki shotAt() adresliyor:
  640  → kart bağlamları (liste sayfası, "diğer işler")
  1120 → vaka sayfası hero'su
Ham dosya ana sayfadaki büyük öne çıkan görselde kullanılmaya devam ediyor.

YENİ REFERANS EKLEDİKTEN SONRA BUNU ÇALIŞTIRIN:
    npm run shots && python3 scripts/work_variants.py
Unutulursa build patlar (lib/projects.ts sonundaki kontrol).
"""
import os
import sys
from PIL import Image

WORK = os.path.join(os.path.dirname(__file__), "..", "public", "work")
WIDTHS = (640, 1120)
SUFFIXES = tuple(f"-{w}" for w in WIDTHS)


def base_shots():
    """Türev olmayan kaynak .webp dosyaları."""
    for name in sorted(os.listdir(WORK)):
        stem, ext = os.path.splitext(name)
        if ext == ".webp" and not stem.endswith(SUFFIXES):
            yield name


def main():
    made = skipped = 0
    for name in base_shots():
        src = os.path.join(WORK, name)
        im = Image.open(src)
        for w in WIDTHS:
            dst = os.path.join(WORK, name.replace(".webp", f"-{w}.webp"))
            # Kaynak değişmediyse yeniden üretme.
            if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
                skipped += 1
                continue
            out = im
            if im.width > w:
                out = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            out.save(dst, "WEBP", quality=80, method=6)
            print(f"  {os.path.basename(dst):34s} {os.path.getsize(dst)//1024:>4} KB")
            made += 1
    print(f"\n{made} türev üretildi, {skipped} güncel.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
