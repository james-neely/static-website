import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import RandomNameGenerator from "@/components/sections/RandomNameGenerator";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "Random Name Generator";
const description =
  "Generate random first and last names in the browser for demos, examples, fixtures, and test data.";
const path = "/tools/random-name-generator";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function RandomNameGeneratorPage() {
  return (
    <PageContainer title="Random Name Generator">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <RandomNameGenerator />
    </PageContainer>
  );
}
