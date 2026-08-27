"use client";

import KisaCevap from "@/components/ui/KisaCevap";
import { useLang } from "@/components/providers/LanguageProvider";
import { TANIM } from "@/lib/marka";

/**
 * ANA SAYFANIN KISA CEVABI — "Forpus Yazılım ne yapar?"
 *
 * KONUM: müşteri logolarından hemen sonra, hizmetlerden önce. Sayfa böyle
 * okunuyor — iddia (kahraman), kanıt (logolar), sonra ne olduğumuz. Ölçüldü:
 * bu noktada sayfanın %15'indeyiz, yani alıntıların %44'ünün çıktığı ilk
 * %30'un içinde.
 *
 * NEDEN GEREKLİ: ana sayfa 1.489 kelime taşıyor ama en uzun paragrafı 25
 * kelimeydi. Bir motora "Forpus Yazılım nedir" diye sorulduğunda
 * alıntılayacak tek bir bütün cümle grubu yoktu; on üç bölüme dağılmış
 * pazarlama cümleleri vardı.
 *
 * Metin `lib/marka.ts`te, burada değil: aynı paragraf `Organization`
 * şemasının `description` alanına da giriyor. Ekranda yazan ile makineye
 * söylenen aynı olmak zorunda — ayrı yazılsalardı ilk düzenlemede ayrışırdı.
 */
export default function KisaTanim() {
  const { lang } = useLang();
  return (
    <KisaCevap
      icerik={{ title: TANIM.baslik[lang], body: TANIM.govde[lang] }}
      className="section !pt-4 !pb-0"
    />
  );
}
