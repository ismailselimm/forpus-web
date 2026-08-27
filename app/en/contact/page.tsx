import type { Metadata } from "next";

import IletisimSayfasi from "@/components/contact/IletisimSayfasi";
import { iletisimIcerigi } from "@/lib/iletisim";

const c = iletisimIcerigi.en;

export const metadata: Metadata = {
  title: "Contact — Web & Mobile Software Studio in Istanbul",
  description: c.aciklama,
  alternates: {
    canonical: "/en/contact",
    languages: {
      "tr-TR": "/iletisim",
      "en-US": "/en/contact",
      "x-default": "/iletisim",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en/contact",
    title: c.baslik,
    description: c.aciklama,
  },
};

export default function Page() {
  return <IletisimSayfasi lang="en" />;
}
