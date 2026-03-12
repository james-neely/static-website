import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import TextCounter from "@/components/sections/TextCounter";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "Text Counter";
const description =
  "Count characters, words, and sentences in pasted text with a simple browser-based tool.";
const path = "/tools/text-counter";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function TextCounterPage() {
  return (
    <PageContainer title="Text Counter">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <TextCounter />
    </PageContainer>
  );
}
