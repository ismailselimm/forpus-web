#!/usr/bin/env python3
"""Generate brand-aligned abstract visuals via the local ComfyUI API (SDXL / JuggernautXL).

Aesthetic: "Organik Akis" — flowing translucent ribbons in leaf-green -> cyan -> sky-blue
on a soft, airy off-white background. Calm, premium, lots of negative space.
Outputs land in public/generated/.
"""
import json
import os
import shutil
import time
import urllib.request
import urllib.error

COMFY = "http://127.0.0.1:8188"
CKPT = "juggernautXL_v9.safetensors"
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "generated")
COMFY_OUTPUT = "/Users/ismailselim/ComfyUI/output"
os.makedirs(OUT_DIR, exist_ok=True)

STYLE = (
    "elegant abstract 3d render, flowing translucent glass ribbons and silky liquid forms, "
    "leaf green, turquoise cyan and sky blue gradient, soft airy off-white background, "
    "smooth glossy surfaces, volumetric soft studio light, minimal, generous negative space, "
    "premium, calm, serene, ultra clean, high detail, octane render, 8k"
)
NEG = (
    "text, words, letters, typography, watermark, signature, logo, people, person, face, hands, "
    "ugly, deformed, blurry, noisy, grainy, low quality, jpeg artifacts, dark, gloomy, black background, "
    "cluttered, busy, chaotic, oversaturated, neon, harsh shadows, frame, border"
)

# name, extra-prompt, width, height, seed
JOBS = [
    ("hero-flow", "wide cinematic composition, a single graceful ribbon of light arcing across the frame, "
                  "dreamy bokeh, sense of motion and flow", 1216, 704, 77001),
    ("orb-glass", "a single floating glossy translucent sphere, frosted glass, gentle inner glow, "
                  "soft reflections, centered, lots of empty space around it", 1024, 1024, 77002),
    ("wave-contours", "abstract topographic flowing contour lines, smooth parallel waves, gentle dunes of color, "
                      "soft gradient mesh", 1216, 704, 77003),
    ("mesh-soft", "smooth abstract gradient mesh, silky fluid blend of mint green and sky blue, "
                  "dreamy, soft focus, watercolor smoothness", 1024, 1024, 77004),
    ("ribbon-tall", "vertical flowing ribbon of liquid glass twisting upward, elegant, tall composition, "
                    "soft light, minimal", 768, 1152, 77005),
]


def graph(prompt, neg, w, h, seed, name):
    return {
        "3": {"class_type": "KSampler", "inputs": {
            "seed": seed, "steps": 30, "cfg": 6.0, "sampler_name": "dpmpp_2m",
            "scheduler": "karras", "denoise": 1.0,
            "model": ["4", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["5", 0]}},
        "4": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": CKPT}},
        "5": {"class_type": "EmptyLatentImage", "inputs": {"width": w, "height": h, "batch_size": 1}},
        "6": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["4", 1]}},
        "7": {"class_type": "CLIPTextEncode", "inputs": {"text": neg, "clip": ["4", 1]}},
        "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["4", 2]}},
        "9": {"class_type": "SaveImage", "inputs": {"filename_prefix": "forpus/" + name, "images": ["8", 0]}},
    }


def post_json(path, payload):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(COMFY + path, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def get_json(path):
    with urllib.request.urlopen(COMFY + path, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def run_job(name, extra, w, h, seed):
    prompt = extra + ", " + STYLE
    g = graph(prompt, NEG, w, h, seed, name)
    print(f"[{name}] queueing ({w}x{h}) ...", flush=True)
    resp = post_json("/prompt", {"prompt": g, "client_id": "forpus-gen"})
    pid = resp.get("prompt_id")
    if not pid:
        print(f"[{name}] FAILED to queue: {resp}", flush=True)
        return False
    # poll history
    deadline = time.time() + 900
    while time.time() < deadline:
        time.sleep(4)
        try:
            hist = get_json(f"/history/{pid}")
        except Exception as e:
            continue
        if pid in hist:
            entry = hist[pid]
            status = entry.get("status", {})
            if status.get("status_str") == "error":
                print(f"[{name}] ERROR during generation", flush=True)
                return False
            outputs = entry.get("outputs", {})
            for node_id, out in outputs.items():
                for img in out.get("images", []):
                    src = os.path.join(COMFY_OUTPUT, img.get("subfolder", ""), img["filename"])
                    dst = os.path.join(OUT_DIR, name + ".png")
                    if os.path.exists(src):
                        shutil.copyfile(src, dst)
                        print(f"[{name}] DONE -> {dst}", flush=True)
                        return True
            # finished but no image found
            if outputs:
                print(f"[{name}] finished but no image located", flush=True)
                return False
    print(f"[{name}] TIMEOUT", flush=True)
    return False


def main():
    ok = 0
    for (name, extra, w, h, seed) in JOBS:
        try:
            if run_job(name, extra, w, h, seed):
                ok += 1
        except Exception as e:
            print(f"[{name}] EXCEPTION: {e}", flush=True)
    print(f"\n=== Generation complete: {ok}/{len(JOBS)} succeeded ===", flush=True)


if __name__ == "__main__":
    main()
