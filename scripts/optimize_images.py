#!/usr/bin/env python3
"""One-off: shrink the oversized raster assets that make the site load slowly.

`images: { unoptimized: true }` (static export) means Next serves each file as-is,
so the only lever is the source file. Opaque photos/screenshots -> WebP; the two
alpha logos stay PNG (kept small) so metadata/icon refs don't change.
"""
import os
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), "..", "public")


def kb(path):
    return os.path.getsize(path) / 1024


def to_webp(rel, max_side=None, quality=80):
    src = os.path.join(ROOT, rel)
    dst = os.path.splitext(src)[0] + ".webp"
    im = Image.open(src)
    before = kb(src)
    if max_side and max(im.size) > max_side:
        s = max_side / max(im.size)
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=quality, method=6)
    after = kb(dst)
    if os.path.abspath(dst) != os.path.abspath(src):
        os.remove(src)
    print(f"  {rel:38s} {before:8.1f}KB -> {os.path.basename(dst)} {after:7.1f}KB  ({im.size[0]}x{im.size[1]})")


def resize_png(rel, size):
    src = os.path.join(ROOT, rel)
    before = kb(src)
    im = Image.open(src)
    im.thumbnail(size, Image.LANCZOS)
    im.save(src, "PNG", optimize=True)
    print(f"  {rel:38s} {before:8.1f}KB -> {kb(src):7.1f}KB  ({im.size[0]}x{im.size[1]})  [png/alpha]")


def rm(rel):
    p = os.path.join(ROOT, rel)
    if os.path.exists(p):
        print(f"  sil {rel:34s} ({kb(p):7.1f}KB)")
        os.remove(p)


print("== Hero / dekor (opak -> webp) ==")
to_webp("generated/hero-device.png", max_side=960, quality=82)
to_webp("generated/hero-flow.png", max_side=1280, quality=78)

print("== Work masaüstü ekran görüntüleri (opak -> webp) ==")
for f in ["temizlikexpress", "esenkuruyemis", "merak", "dryasin", "cekictrans"]:
    to_webp(f"work/{f}.png", max_side=1760, quality=80)

print("== Mobil app ekran görüntüleri (opak -> webp) ==")
to_webp("work/apps/temizlikexpress.png", quality=82)
to_webp("work/apps/merak.png", quality=82)

print("== Logolar (alfa -> küçük png, referanslar değişmez) ==")
resize_png("brand/forpus-yazi.png", (480, 480))
resize_png("brand/forpus-logo.png", (320, 320))

print("== Ölü asset temizliği (kodda referansı yok) ==")
for f in [
    "generated/hero-opt-1.png", "generated/hero-opt-2.png",
    "generated/hero-opt-3.png", "generated/hero-opt-4.png",
    "generated/mesh-soft.png", "generated/orb-glass.png",
    "generated/wave-contours.png", "generated/ribbon-tall.png",
    "work/apps/doldurkabi-poster.png",
    "work/apps/doldurkabi-2.png", "work/apps/merak-2.png",
]:
    rm(f)
