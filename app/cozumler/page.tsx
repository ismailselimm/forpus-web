import CozumlerHub from "@/components/solutions/CozumlerHub";
import { hubMetadata } from "@/lib/cozumler-hub";

export const metadata = hubMetadata("tr");

export default function CozumlerIndex() {
  return <CozumlerHub lang="tr" />;
}
