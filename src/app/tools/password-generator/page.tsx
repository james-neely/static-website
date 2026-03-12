import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import PasswordGenerator from "@/components/sections/PasswordGenerator";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "Password Generator";
const description =
  "Generate strong passwords entirely in the browser with configurable length and character sets.";
const path = "/tools/password-generator";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function PasswordGeneratorPage() {
  return (
    <PageContainer title="Password Generator">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <PasswordGenerator />
    </PageContainer>
  );
}
