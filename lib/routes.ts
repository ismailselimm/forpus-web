/**
 * Route'un iki dilli olup olmadığı.
 *
 * Site iki dilli ama her sayfa değil: blog yazıları ve vaka sayfaları yalnızca
 * Türkçe (gösterimlerin 68/81'i Türkiye'den geliyor, güç orada toplandı).
 * Bu bilgi daha önce hiçbir yerde kodlanmamıştı; sonuç olarak dil değiştirici
 * bu sayfalarda yalnızca menüyü çeviriyor, gövde Türkçe kalıyordu — üstelik
 * `html.lang="en"` yazılırken sayfadaki JSON-LD `inLanguage: "tr"` diyordu.
 *
 * Tek dilli bir bölüm eklerken listeye eklemeyi unutmayın.
 */
const TR_ONLY_PREFIXES = ["/blog", "/isler"] as const;

export const isBilingualRoute = (pathname: string) =>
  !TR_ONLY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
