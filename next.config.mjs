import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Statik export (GitHub Pages) — site tamamen statik, sunucu özelliği yok.
  // Çıktı `out/` klasörüne üretilir; form client-side (Web3Forms) çalışmaya devam eder.
  output: "export",
  outputFileTracingRoot: __dirname,
  // Pages'te sunucu görsel optimizasyonu yok → next/image görselleri olduğu gibi servis edilir.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
