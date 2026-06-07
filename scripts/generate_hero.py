#!/usr/bin/env python3
"""Generate software/tech-themed hero visual options (on-brand glass, green->cyan->blue, light bg)."""
import json, os, shutil, time, urllib.request

COMFY = "http://127.0.0.1:8188"
CKPT = "juggernautXL_v9.safetensors"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "generated")
COMFY_OUTPUT = "/Users/ismailselim/ComfyUI/output"
os.makedirs(OUT, exist_ok=True)

STYLE = ("elegant abstract 3d render, glossy translucent glass material, emerald green, turquoise cyan and sky blue "
         "gradient, soft airy off-white background, volumetric soft studio light, minimal, generous negative space, "
         "premium, ultra clean, high detail, octane render, 8k")
NEG = ("leaf, plant, flower, nature, tree, grass, water drop, text, words, letters, typography, watermark, logo, "
       "people, person, face, hands, ugly, deformed, blurry, noisy, low quality, jpeg artifacts, dark, gloomy, "
       "black background, cluttered, busy, oversaturated, neon")

JOBS = [
    ("hero-opt-1", "a glowing sphere formed of interconnected glowing nodes and thin connecting lines, "
                   "network constellation, floating data points, digital connectivity, centered", 88011),
    ("hero-opt-2", "a single floating translucent frosted glass smartphone, subtle glowing app interface cards "
                   "floating around it, soft reflections, centered, lots of empty space", 88022),
    ("hero-opt-3", "abstract flowing translucent ribbons of light interwoven with a subtle glowing dot grid, "
                   "digital data stream, sense of motion and flow, dreamy", 88033),
    ("hero-opt-4", "a single floating glossy crystalline geometric orb, faceted translucent glass, gentle inner "
                   "glow, soft reflections, centered, lots of empty space", 88044),
]


def graph(prompt, w, h, seed, name):
    return {
        "3": {"class_type": "KSampler", "inputs": {"seed": seed, "steps": 30, "cfg": 6.0, "sampler_name": "dpmpp_2m",
              "scheduler": "karras", "denoise": 1.0, "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0]}},
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CKPT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": w, "height": h, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": NEG, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": "forpus/" + name, "images": ["8", 0]}},
    }


def post(path, payload):
    req = urllib.request.Request(COMFY + path, data=json.dumps(payload).encode(), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def get(path):
    with urllib.request.urlopen(COMFY + path, timeout=30) as r:
        return json.loads(r.read().decode())


def run(name, extra, seed):
    g = graph(extra + ", " + STYLE, 1024, 1024, seed, name)
    print(f"[{name}] queue", flush=True)
    pid = post("/prompt", {"prompt": g, "client_id": "forpus-hero"}).get("prompt_id")
    if not pid:
        print(f"[{name}] FAIL queue", flush=True); return
    deadline = time.time() + 900
    while time.time() < deadline:
        time.sleep(4)
        try:
            hist = get(f"/history/{pid}")
        except Exception:
            continue
        if pid in hist:
            for _nid, out in hist[pid].get("outputs", {}).items():
                for img in out.get("images", []):
                    src = os.path.join(COMFY_OUTPUT, img.get("subfolder", ""), img["filename"])
                    if os.path.exists(src):
                        shutil.copyfile(src, os.path.join(OUT, name + ".png"))
                        print(f"[{name}] DONE", flush=True); return
            print(f"[{name}] finished no image", flush=True); return
    print(f"[{name}] TIMEOUT", flush=True)


for (n, e, s) in JOBS:
    try:
        run(n, e, s)
    except Exception as ex:
        print(f"[{n}] EXC {ex}", flush=True)
print("=== hero options done ===", flush=True)
