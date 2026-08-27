import type { Metadata } from "next";

import IletisimSayfasi from "@/components/contact/IletisimSayfasi";
import { iletisimIcerigi } from "@/lib/iletisim";

const c = iletisimIcerigi.tr;

export const metadata: Metadata = {
  // `title.template` markayı zaten ekliyor; başlıkta ikinci kez yazılmıyor.
  title: "İletişim — İstanbul'da Web ve Mobil Yazılım Stüdyosu",
  description: c.aciklama,
  alternates: {
    canonical: "/iletisim",
    languages: {
      "tr-TR": "/iletisim",
      "en-US": "/en/contact",
      "x-default": "/iletisim",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/iletisim",
    title: c.baslik,
    description: c.aciklama,
  },
};

export default function Sayfa() {
  return <IletisimSayfasi lang="tr" />;
}
