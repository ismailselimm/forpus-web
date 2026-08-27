import IletisimSayfasi from "@/components/contact/IletisimSayfasi";
import { iletisimMetadata } from "@/lib/iletisim";

export const metadata = iletisimMetadata("tr");

export default function Sayfa() {
  return <IletisimSayfasi lang="tr" />;
}
