/**
 * MARKA KİMLİĞİ — Forpus'un dışarıya görünen hesapları.
 *
 * Ayrı dosyada, `site.ts`te değil: `site.ts` derleme zamanı kökeni tutuyor ve
 * sitemap, robots, metadata gibi 12 modül oradan yalnız `SITE_URL` çekiyor.
 * O dosyanın İÇE AKTARMASIZ kalması bilinçli — biri oraya bir import
 * eklediği gün istemci paketine girer. Buradaki liste ise hem sunucuda
 * (JSON-LD) hem istemcide (footer, iletişim) okunuyor.
 */

/**
 * SOSYAL PROFİLLER — hesabın KİMLİĞİ.
 *
 * "Profil" ile "iletişim kanalı" bilerek ayrı: bunlar kalıcı, herkese açık
 * `https://` adresleri ve schema.org'un `sameAs` alanına olduğu gibi
 * giriyorlar. WhatsApp bu listede DEĞİL ve olmamalı — o bir kanal, bir kimlik
 * değil; `sameAs`a bir `wa.me` bağlantısı koymak yapısal veriyi kirletir.
 *
 * WhatsApp geldiğinde buraya YAZILMAYACAK: adresi sayfadan sayfaya değişiyor
 * (ön doldurulmuş `?text=`), yani sabit bir dize değil bir fonksiyon olmak
 * zorunda. Geldiğinde kendi yardımcısıyla bu dosyaya eklenecek.
 */
/**
 * İletişim adresi. Çevrilebilir bir içerik DEĞİL: sözlükte `emailLabel`
 * ("E-posta" / "Email") çevriliyor ama adresin kendisi iki dilde de aynı.
 * Yine de altı yerde ayrı ayrı yazılıydı — ikisi sözlüğün iki dilinde,
 * ikisi JSON-LD'de, biri KVKK modülünde, biri llms.txt'te. Adresi
 * değiştirmek altı dosyaya dokunmak demekti ve derleyici yardım etmiyordu;
 * sessizce ayrışacak olan da KVKK md.11 başvuru adresiydi, yani yasal
 * yükümlülük taşıyan kopya.
 */
export const EPOSTA = "forpusyazilim@gmail.com";

export type SosyalProfil = {
  ad: "Instagram" | "Facebook" | "LinkedIn";
  href: string;
};

export const SOSYAL_PROFILLER: readonly SosyalProfil[] = [
  { ad: "Instagram", href: "https://www.instagram.com/forpusyazilim" },
  { ad: "Facebook", href: "https://www.facebook.com/1250844311452202" },
  { ad: "LinkedIn", href: "https://www.linkedin.com/company/forpusyazilim" },
];

/**
 * Yapısal veri için profil adresleri.
 *
 * `sameAs` "bu site ile bu hesaplar aynı varlığa ait" demek; Google'ın
 * marka bilgi panelini birleştirmesi buradan geçiyor. Ekrandaki ikonlarla
 * AYNI listeden besleniyor ki biri güncellenip diğeri unutulmasın.
 */
export const sameAs = SOSYAL_PROFILLER.map((h) => h.href);
