#!/usr/bin/env python3
"""Generate atmospheric per-persona background images via local ComfyUI (SDXL / JuggernautXL).

Art direction: moody, cinematic, premium, dark, soft depth of field — each image is a
subtle THEMATIC texture that sits UNDER a dark brand-tinted scrim behind the persona card,
so white text stays legible and the mosaic reads as one cohesive premium set (not slop).
Outputs -> public/generated/personas/<key>.png. Run all, or a subset: `python3 scripts/generate_personas.py doktor tekne`.
"""
import json, os, shutil, sys, time, urllib.request

COMFY = "http://127.0.0.1:8188"
CKPT = "juggernautXL_v9.safetensors"
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "generated", "personas")
COMFY_OUTPUT = "/Users/ismailselim/ComfyUI/output"
os.makedirs(OUT_DIR, exist_ok=True)

STYLE = (
    "cinematic atmospheric photograph, moody, dark, premium, elegant, minimal, "
    "soft shallow depth of field, volumetric soft light, gentle bokeh, subtle teal and deep blue undertones, "
    "muted refined color, high detail, tasteful, no text"
)
NEG = (
    "text, words, letters, typography, watermark, signature, logo, people, person, face, hands, "
    "ugly, deformed, blurry mess, noisy, grainy, low quality, jpeg artifacts, oversaturated, garish, neon, "
    "cluttered, busy, chaotic, bright, overexposed, harsh flash, frame, border, collage, kitsch"
)

# key: (subject prompt, seed)  — portrait 832x1216 for all (object-cover crops per card)
JOBS = {
    "doktor":      ("modern minimalist medical clinic interior, soft clean daylight, a stethoscope and a small plant on a desk, calm, blurred background", 88101),
    "diyetisyen":  ("fresh green vegetables, avocado and a healthy grain bowl on a dark stone table, wellness, soft overhead light", 88102),
    "psikolog":    ("cozy calm therapy room, a soft armchair beside a warm glowing lamp, serene, softly blurred", 88103),
    "eticaret":    ("elegant e-commerce packaging, kraft boxes and a paper shopping bag on a clean surface, soft studio light", 88104),
    "girisimci":   ("startup workspace at night, a glowing open laptop and a coffee cup, city lights bokeh through a window", 88105),
    "tekne":       ("luxury yacht sailing on calm turquoise sea, aerial view, soft golden hour light, cinematic seascape", 88106),
    "restoran":    ("cozy elegant restaurant interior in the evening, warm ambient bokeh lights, a beautifully set dining table, moody", 88107),
    "kisiselmarka":("minimalist creative desk, a laptop, notebook and a small plant, soft window light, elegant personal workspace", 88108),
    "avukat":      ("elegant classic law office, rows of leather-bound law books on warm wooden shelves, soft lamp light", 88109),
    "emlak":       ("modern luxury house exterior with large glass windows at dusk, contemporary architecture, warm interior glow", 88110),
    # 31.08.2026 — 22 yeni sektör sayfası eklendi, görselleri buradan üretildi.
    "sanayi":      ("industrial machine hall at dusk, a precision CNC machine and polished steel parts, warm overhead work light, blurred factory depth", 88111),
    "lojistik":    ("long haul truck cab on an empty highway at dawn, misty road stretching to the horizon, cool blue light", 88112),
    "temizlik":    ("professional cleaning trolley with neatly stacked white towels, spray bottles and a mop in a bright hotel corridor, clean and orderly", 88213),
    "insaat":      ("modern residential construction site at golden hour, clean concrete structure and scaffolding silhouette, calm", 88114),
    "ges":         ("rows of solar panels on a rooftop at sunset, reflective glass surfaces, warm sky, clean geometry", 88115),
    "otel":        ("boutique hotel room at dusk, made bed with linen throw and a bedside lamp, blurred window with sea beyond", 88116),
    "sacekimi":    ("modern medical procedure room, an adjustable treatment chair under a surgical light, stainless instrument tray, clean clinical setting", 88217),
    "okul":        ("empty modern classroom in soft afternoon light, wooden desks in rows, blurred bookshelf behind", 88118),
    "catering":    ("professional stainless steel kitchen at rest, plated dishes on a pass, warm overhead light, blurred depth", 88119),
    "guvenlik":    ("security control room at night, a wall of dim monitors, soft blue glow, quiet and orderly", 88120),
    "rentacar":    ("a row of clean white and grey family sedans parked in an outdoor rental lot at dusk, orderly, soft even light, no sports car", 88221),
    "otogaleri":   ("indoor used car dealership showroom at evening, a row of ordinary family hatchbacks and sedans under soft ceiling lights, glossy floor, no sports car, no supercar", 88222),
    "dugunsalonu": ("elegant wedding reception hall before guests arrive, set round tables and warm string lights, dusk", 88123),
    "tekstil":     ("textile workshop at dusk, rolls of fabric stacked on shelves and an industrial sewing machine, warm lamp", 88124),
    "kuyumcu":     ("elegant jewellery shop display case, gold rings and bracelets arranged on dark velvet under warm focused light, plain unbranded velvet, luxurious", 88225),
    "yurt":        ("student dormitory room with a bunk bed, a study desk with an open notebook and a desk lamp, bookshelf and backpack, institutional but tidy, soft window light", 88226),
    "fizyoterapi": ("calm physiotherapy room, a treatment table and exercise equipment, soft daylight, muted tones", 88127),
    "huzurevi":    ("warm quiet care home lounge, comfortable armchairs by a large window, soft afternoon light, serene", 88128),
    "gumruk":      ("container terminal at dawn, stacked shipping containers in soft mist, cool blue light, orderly", 88129),
    "anaokulu":    ("bright tidy preschool classroom, small wooden chairs and soft toys on low shelves, gentle morning light", 88130),
    "siteyonetim": ("modern apartment complex courtyard at dusk, clean landscaping and lit entrance lobby, calm", 88131),
}
W, H = 832, 1216


def graph(prompt, seed, name):
    return {
        "3": {"class_type": "KSampler", "inputs": {"seed": seed, "steps": 28, "cfg": 6.0,
              "sampler_name": "dpmpp_2m", "scheduler": "karras", "denoise": 1.0,
              "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0]}},
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CKPT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": W, "height": H, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": NEG, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": "forpus-persona/" + name, "images": ["8", 0]}},
    }


def post_json(path, payload):
    req = urllib.request.Request(COMFY + path, data=json.dumps(payload).encode(), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def get_json(path):
    with urllib.request.urlopen(COMFY + path, timeout=30) as r:
        return json.loads(r.read().decode())


def run(name, subject, seed):
    g = graph(subject + ", " + STYLE, seed, name)
    print(f"[{name}] queue {W}x{H} ...", flush=True)
    pid = post_json("/prompt", {"prompt": g, "client_id": "forpus-persona"}).get("prompt_id")
    if not pid:
        print(f"[{name}] queue FAILED", flush=True); return False
    end = time.time() + 600
    while time.time() < end:
        time.sleep(4)
        try:
            hist = get_json(f"/history/{pid}")
        except Exception:
            continue
        if pid in hist:
            if hist[pid].get("status", {}).get("status_str") == "error":
                print(f"[{name}] ERROR", flush=True); return False
            for _, out in hist[pid].get("outputs", {}).items():
                for img in out.get("images", []):
                    src = os.path.join(COMFY_OUTPUT, img.get("subfolder", ""), img["filename"])
                    if os.path.exists(src):
                        shutil.copyfile(src, os.path.join(OUT_DIR, name + ".png"))
                        print(f"[{name}] DONE", flush=True); return True
    print(f"[{name}] TIMEOUT", flush=True); return False


if __name__ == "__main__":
    keys = sys.argv[1:] or list(JOBS.keys())
    ok = 0
    for k in keys:
        if k in JOBS:
            ok += run(k, *JOBS[k])
    print(f"\n=== {ok}/{len(keys)} done ===", flush=True)
