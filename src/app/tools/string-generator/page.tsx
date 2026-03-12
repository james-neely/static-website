import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import StringGenerator from "@/components/sections/StringGenerator";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "String Generator";
const description =
  "Generate random strings for slugs, tokens, and test data directly in the browser.";
const path = "/tools/string-generator";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function StringGeneratorPage() {
  return (
    <PageContainer title="String Generator">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <StringGenerator />
    </PageContainer>
  );
}
