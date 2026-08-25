import HukukiSayfa from "@/components/ui/HukukiSayfa";
import { hukukiMetadata, hukukiSayfa } from "@/lib/hukuki";

export const metadata = hukukiMetadata("kullanim-sartlari");

export default function Sayfa() {
  return <HukukiSayfa veri={hukukiSayfa("kullanim-sartlari")} />;
}
