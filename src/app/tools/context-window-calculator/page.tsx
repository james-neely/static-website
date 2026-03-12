import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import ContextCalculator from "@/components/sections/ContextCalculator";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "Context Window Calculator";
const description =
  "Estimate token counts for pasted text and compare usage across popular AI model context windows.";
const path = "/tools/context-window-calculator";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function ContextWindowCalculatorPage() {
  return (
    <PageContainer title="Context Window Calculator">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <ContextCalculator />
    </PageContainer>
  );
}
