import type { Metadata } from "next";
import PageContainer from "@/components/common/PageContainer";
import ContextCalculator from "@/components/sections/ContextCalculator";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Browser-based web tools including an AI context window calculator for estimating token counts across popular models.",
};

export default function ToolsPage() {
  return (
    <PageContainer title="Tools">
      <ContextCalculator />
    </PageContainer>
  );
}
