import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import PortGenerator from "@/components/sections/PortGenerator";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "Port Generator";
const description =
  "Generate random or sequential local development ports with presets, filters, and a common ports reference table.";
const path = "/tools/port-generator";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function PortGeneratorPage() {
  return (
    <PageContainer title="Port Generator">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <PortGenerator />
    </PageContainer>
  );
}
