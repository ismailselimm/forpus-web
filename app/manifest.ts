import type { MetadataRoute } from "next";

export const dynamic = "force-static"; // statik export (GitHub Pages) için

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Forpus Yazılım",
    short_name: "Forpus",
    description:
      "Web, mobil uygulama, reklam ve tasarım — tek çatı altında. Fikrinizi büyüyen dijital ürünlere dönüştürüyoruz.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f8f5",
    theme_color: "#11cdd9",
    lang: "tr",
    categories: ["business", "productivity", "technology"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
