# Forpus Yazılım — Kurumsal Web Sitesi

Forpus'un tanıtım sitesi. **Next.js 15 + React 19 + TypeScript + Tailwind v4 + Motion + Lenis** ile yazıldı.
Çift dilli (TR/EN), tamamen animasyonlu, açık/ferah tema. Aesthetic: **"Organik Akış"** — yeşil→cyan→mavi gradyan, cam (glass) kartlar, aurora, parçacık hero.

## Çalıştırma

```bash
npm install        # bağımlılıklar
npm run dev        # geliştirme sunucusu  -> http://localhost:3000
npm run build      # production derleme
npm run start      # derlenmiş sürümü çalıştır
```

> Not: `npm run dev` çalışırken `npm run build` ÇALIŞTIRMA — ikisi de `.next` klasörünü kullanır ve çakışır.

## Yapı

```
app/
  layout.tsx        # fontlar (Montserrat/Manrope/JetBrains), provider'lar, global efektler, Nav, Footer
  page.tsx          # bölümlerin sırası
  globals.css       # TASARIM SİSTEMİ (renkler, gradyanlar, glass, animasyonlar) — tek kaynak
components/
  providers/LanguageProvider.tsx   # TR/EN dil yönetimi (useLang)
  layout/Nav.tsx, Footer.tsx
  fx/               # SmoothScroll, CustomCursor, Grain, Aurora, ParticleField, Reveal, Magnetic
  ui/Logo.tsx
  sections/         # Hero, Marquee, Services, Process, Work, Mobile, Stats, Team, Testimonials, CTA, Contact
lib/
  i18n/dictionary.ts   # TÜM METİNLER (TR + EN) — içerik buradan değişir
  projects.ts          # referans projeler + mobil uygulamalar verisi
public/
  brand/            # logo + yazı
  work/             # canlı site ekran görüntüleri
  work/apps/        # uygulama ekran görüntüleri
  generated/        # ComfyUI ile üretilmiş marka görselleri
scripts/            # ekran görüntüsü + görsel üretim araçları
```

## İçeriği güncelleme

- **Metinler:** `lib/i18n/dictionary.ts` (tr ve en birlikte).
- **Referans projeler / mobil uygulamalar:** `lib/projects.ts`.
- **Renkler / tasarım:** `app/globals.css` içindeki `@theme` bloğu.

## ⚠️ DEĞİŞTİRİLMESİ GEREKEN PLACEHOLDER'LAR

Aşağıdakiler örnek/yer tutucu olarak konuldu — gerçek bilgilerinizle değiştirin:

1. **İletişim bilgileri** — `lib/i18n/dictionary.ts` → `contact.info`:
   - `email` (şu an `info@forpusyazilim.com`)
   - `phone` (şu an `+90 5xx xxx xx xx`)
   - `location`
2. **Sosyal medya linkleri** — `components/layout/Footer.tsx` ve `components/sections/Contact.tsx` içindeki `href="#"` → gerçek Instagram/LinkedIn/WhatsApp adresleri.
3. **İstatistikler** — `dictionary.ts` → `stats.items` (20+, 15+, 6+, 100%) gerçek rakamlarla.
4. **Müşteri yorumları** — `dictionary.ts` → `testimonials.items` gerçek yorumlarla (isim/şirket).
5. **Esen Kuruyemiş** — sitesi şu an erişilemez olduğu için (Cloudflare 522) "İşler" bölümüne eklenmedi. Site açılınca: `npm run shots` ile ekran görüntüsü alıp `lib/projects.ts` → `webProjects` dizisine ekleyin.
6. **Ekip sosyal linkleri** — `components/sections/Team.tsx` içindeki LinkedIn/GitHub `href="#"`.

İletişim formu, backend gerektirmeyecek şekilde **mailto** ile çalışır (form gönderilince e-posta uygulaması açılır). İleride form servisi (Formspree, Resend, vb.) bağlanabilir.

## Görselleri yeniden üretme

- **Site ekran görüntüleri:** `npm run shots` (Playwright; `scripts/capture-screenshots.mjs`).
- **AI marka görselleri:** ComfyUI çalışırken `python3 scripts/generate_images.py` (yerel ComfyUI API, JuggernautXL).

## Yayına alma

Statik export'a uygun. Önerilen: **Vercel** (Next.js) — repo'yu bağlayıp deploy edin. Alternatif: `npm run build` + `npm run start` kendi sunucunuzda.
