import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import FileHashVerifier from "@/components/sections/FileHashVerifier";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "File Hash Verifier";
const description =
  "Calculate a file hash in the browser and compare it against an expected digest for verification.";
const path = "/tools/file-hash-verifier";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function FileHashVerifierPage() {
  return (
    <PageContainer title="File Hash Verifier">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <FileHashVerifier />
    </PageContainer>
  );
}
