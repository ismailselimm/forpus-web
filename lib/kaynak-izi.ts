/**
 * Ziyaretçinin nereden geldiğini yakalar ve ziyaret boyunca saklar.
 *
 * Neden var: reklam parasının iş getirip getirmediğini ölçebilmek için
 * "bu lead nereden geldi" bilgisi lazım. Onsuz panel iki ayrı rapor
 * gösteriyor — solda harcama, sağda lead — ve aralarında çizgi çizemiyor.
 *
 * Neden iniş anında yakalanıyor: kullanıcı reklamdan bir blog yazısına
 * inip sonra iletişim formuna gidebilir. Form açıldığında URL'deki
 * etiketler çoktan kaybolmuş olur; iz o yüzden ilk yüklemede alınıyor.
 *
 * Neden sessionStorage: atıf ziyaret başına anlamlı. Bugün reklamdan gelen
 * biri gelecek hafta doğrudan girerse, o ziyaret reklama yazılmamalı.
 */

const ANAHTAR = "forpus-kaynak-izi";

export type KaynakIzi = {
  utmKaynak?: string;
  utmOrtam?: string;
  utmKampanya?: string;
  utmIcerik?: string;
  utmTerim?: string;
  /** Meta reklam tıklaması bu parametreyi ekliyor — UTM unutulsa bile kaynağı ele veriyor. */
  fbclid?: string;
  /** Google Ads karşılığı. */
  gclid?: string;
  /** Dış yönlendiren. Site içi gezinme buraya yazılmıyor. */
  yonlendiren?: string;
  /** Ziyaretçinin siteye ilk indiği sayfa — hangi içerik lead getiriyor sorusu için. */
  girisSayfasi?: string;
  /** ISO zaman damgası. */
  ilkGorulme?: string;
};

const ALANLAR: [keyof KaynakIzi, string][] = [
  ["utmKaynak", "utm_source"],
  ["utmOrtam", "utm_medium"],
  ["utmKampanya", "utm_campaign"],
  ["utmIcerik", "utm_content"],
  ["utmTerim", "utm_term"],
  ["fbclid", "fbclid"],
  ["gclid", "gclid"],
];

/** Çok uzun değerler panelde ve veritabanında yer kaplamasın. */
const kirp = (deger: string) => deger.slice(0, 200);

function oku(): KaynakIzi | null {
  try {
    const ham = sessionStorage.getItem(ANAHTAR);
    if (!ham) return null;
    const cozulen: unknown = JSON.parse(ham);
    // Tip iddiası yetmiyor: aynı anahtara başkası "[]" ya da "3" yazmışsa
    // (eski bir sürüm, bir eklenti, elle kurcalama) o değer olduğu gibi
    // panele gidiyordu. Nesne değilse iz yok sayılıyor.
    if (!cozulen || typeof cozulen !== "object" || Array.isArray(cozulen)) return null;
    return cozulen as KaynakIzi;
  } catch {
    // Gizli sekmede veya depolama kapalıyken sessizce vazgeç: atıf kaybolur
    // ama form çalışmaya devam eder. Lead kaybetmek atıf kaybetmekten pahalı.
    return null;
  }
}

/**
 * İzi yakalar. Sayfa ilk yüklendiğinde bir kez çağrılıyor.
 *
 * Kural: ziyaretin ilk izi korunur, ama URL'de açık bir kampanya işareti
 * varsa KAYNAK alanlarının üzerine yazılır. Sebebi: kullanıcı organik girip
 * sonra reklama tıkladıysa, o tıklama daha güçlü ve daha yeni bir sinyal.
 *
 * `girisSayfasi` ve `ilkGorulme` bu kuralın DIŞINDA: ikisi de "ilk" diyor ve
 * ilk kalıyorlar. Kaynak değişebilir, ziyaretin başladığı yer değişmez.
 */
export function iziYakala(): void {
  if (typeof window === "undefined") return;

  const parametreler = new URLSearchParams(window.location.search);
  const yeni: KaynakIzi = {};
  for (const [alan, ad] of ALANLAR) {
    const deger = parametreler.get(ad);
    if (deger) yeni[alan] = kirp(deger);
  }

  const kampanyaIsareti = Object.keys(yeni).length > 0;
  const mevcut = oku();
  if (mevcut && !kampanyaIsareti) return;

  // Site içi gezinmede document.referrer kendi alan adımızı gösterir; onu
  // "yönlendiren" saymak yanıltıcı olur.
  const yonlendiren = document.referrer;
  const disYonlendiren =
    yonlendiren && !yonlendiren.startsWith(window.location.origin) ? kirp(yonlendiren) : undefined;

  try {
    sessionStorage.setItem(
      ANAHTAR,
      JSON.stringify({
        ...yeni,
        yonlendiren: disYonlendiren,
        // "İlk" gerçekten ilk kalıyor. Kampanya işareti görüldüğünde iz
        // baştan yazıldığı için bu iki alan da eziliyordu: organik olarak /
        // üzerinden girip blog okuyan, sonra aynı sekmede bir reklama tıklayıp
        // /cozumler/... adresine inen ziyaretçide giriş sayfası ikinci iniş
        // olarak kaydediliyordu. "Hangi içerik lead getiriyor" sorusu yanlış
        // cevaplanıyor, hukuki metindeki iki "ilk" iddiası da tutmuyordu.
        // UTM ve tıklama kimlikleri üzerine yazılmaya devam ediyor: yeni
        // tıklama daha güçlü bir kaynak sinyali, ama giriş noktası değil.
        girisSayfasi: mevcut?.girisSayfasi ?? kirp(window.location.pathname),
        ilkGorulme: mevcut?.ilkGorulme ?? new Date().toISOString(),
      } satisfies KaynakIzi),
    );
  } catch {
    /* depolama yoksa atıf olmadan devam */
  }
}

/** Form gönderiminde panele eklenecek iz. Yoksa boş nesne. */
export function kaynakIzi(): KaynakIzi {
  return oku() ?? {};
}

/**
 * İzi okunabilir tek satıra çevirir.
 *
 * Panelde yapısal alanlar da saklanacak, ama Web3Forms'a giden e-postada
 * ve panelin mesaj gövdesinde insan gözüyle okunabilir bir özet işe yarıyor:
 * atıf verisi bir yerde bozulsa bile mailde kalıyor.
 */
export function iziOzetle(iz: KaynakIzi): string {
  const parcalar: string[] = [];
  if (iz.utmKaynak) parcalar.push(`kaynak: ${iz.utmKaynak}`);
  if (iz.utmOrtam) parcalar.push(`ortam: ${iz.utmOrtam}`);
  if (iz.utmKampanya) parcalar.push(`kampanya: ${iz.utmKampanya}`);
  if (!iz.utmKaynak && iz.fbclid) parcalar.push("kaynak: meta (fbclid)");
  if (!iz.utmKaynak && iz.gclid) parcalar.push("kaynak: google ads (gclid)");
  if (iz.yonlendiren) parcalar.push(`yönlendiren: ${iz.yonlendiren}`);
  if (iz.girisSayfasi) parcalar.push(`giriş: ${iz.girisSayfasi}`);
  return parcalar.join(" · ");
}
