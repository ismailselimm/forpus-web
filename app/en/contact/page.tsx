import IletisimSayfasi from "@/components/contact/IletisimSayfasi";
import { iletisimMetadata } from "@/lib/iletisim";

export const metadata = iletisimMetadata("en");

export default function Sayfa() {
  return <IletisimSayfasi lang="en" />;
}
