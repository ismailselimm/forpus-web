import { postsForSolution } from "@/lib/blog";
import { solutionUi } from "@/lib/solutions";
import YaziListesi from "@/components/ui/YaziListesi";

/**
 * Sektör sayfasından blog'a köprü.
 *
 * Sektör sayfaları site içinde en çok bağlanan ve en çok gösterim alan
 * sayfalar; oradan blog'a bağlantı vermek yazıları grafiğin merkezine
 * çekiyor. Ziyaretçi için de doğru: "avukat web sitesi" arayıp gelen biri
 * için reklam yasağını anlatan yazı, o sayfadaki en yararlı ikinci adım.
 *
 * YALNIZCA TÜRKÇE: blog tek dilli (`lib/routes.ts`, TR_ONLY_PREFIXES).
 * Kararı `YapilanIsler` gibi çağıranda değil burada tutuyoruz — İngilizce
 * yazı yayınlandığı gün yalnız bu koşul değişecek.
 *
 * Çizim `YaziListesi`nde: aynı liste blog yazılarının sonunda da duruyor ve
 * ikisinin farklı görünmesi için bir sebep yok.
 */
export default function IlgiliYazilar({
  sektorAnahtari,
  lang,
}: {
  sektorAnahtari: string;
  lang: "tr" | "en";
}) {
  if (lang !== "tr") return null;
  const L = solutionUi[lang];
  return (
    <YaziListesi
      yazilar={postsForSolution(sektorAnahtari)}
      baslik={L.yazilarBasligi}
      lead={L.yazilarLead}
    />
  );
}
