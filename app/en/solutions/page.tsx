import CozumlerHub from "@/components/solutions/CozumlerHub";
import { hubMetadata } from "@/lib/cozumler-hub";

export const metadata = hubMetadata("en");

export default function SolutionsIndex() {
  return <CozumlerHub lang="en" />;
}
