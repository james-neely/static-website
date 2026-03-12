import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import UuidGenerator from "@/components/sections/UuidGenerator";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "UUID Generator";
const description =
  "Generate UUIDv7 by default, with support for earlier UUID versions when compatibility matters.";
const path = "/tools/uuid-generator";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function UuidGeneratorPage() {
  return (
    <PageContainer title="UUID Generator">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <UuidGenerator />
    </PageContainer>
  );
}
