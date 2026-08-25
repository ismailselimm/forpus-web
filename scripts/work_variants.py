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

WORK = os.path.join(os.path.dirname(__file__), "..", "public", "work")
WIDTHS = (640, 1120)
SUFFIXES = tuple(f"-{w}" for w in WIDTHS)


def base_shots():
    """Türev olmayan kaynak .webp dosyaları."""
    for name in sorted(os.listdir(WORK)):
        stem, ext = os.path.splitext(name)
        if ext == ".webp" and not stem.endswith(SUFFIXES):
            yield name


def eksik_turevler():
    """Kaynagi olup henuz uretilmemis ya da bayat kalmis turevler."""
    eksik = []
    for name in base_shots():
        src = os.path.join(WORK, name)
        for w in WIDTHS:
            dst = os.path.join(WORK, name.replace(".webp", f"-{w}.webp"))
            if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
                eksik.append(os.path.basename(dst))
    return eksik


def main():
    # Turevler depoya commit ediliyor; CI'da yeniden uretmeye gerek yok.
    # GitHub Actions makinesinde Pillow kurulu degil ve bu betik prebuild'e
    # bagli oldugu icin TUM dagitimi patlatiyordu — site uc push boyunca
    # eski surumde kaldi. Artik: yapacak is yoksa PIL hic import edilmiyor.
    eksik = eksik_turevler()
    if not eksik:
        print("  turevler guncel, uretilecek bir sey yok")
        return

    try:
        from PIL import Image
    except ModuleNotFoundError:
        # Burada sessiz gecmek yanlis olur: eksik turevle derlenen site
        # bozuk gorsel adresleri uretir. Eksik varsa yuksek sesle dur.
        print(
            "HATA: uretilmesi gereken turev var ama Pillow kurulu degil.\n"
            "  Eksik: " + ", ".join(eksik[:6]) + ("..." if len(eksik) > 6 else "") + "\n"
            "  Cozum: pip install Pillow  (ya da turevleri yerelde uretip commit edin)",
            file=sys.stderr,
        )
        sys.exit(1)

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
