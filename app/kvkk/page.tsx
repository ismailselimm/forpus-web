import HukukiSayfa from "@/components/ui/HukukiSayfa";
import { hukukiMetadata, hukukiSayfa } from "@/lib/hukuki";

export const metadata = hukukiMetadata("kvkk");

export default function Sayfa() {
  return <HukukiSayfa veri={hukukiSayfa("kvkk")} />;
}
