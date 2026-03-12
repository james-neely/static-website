import type { Metadata } from "next";
import { ToolPageJsonLd } from "@/components/common/ToolJsonLd";
import PageContainer from "@/components/common/PageContainer";
import UrlEncoderDecoder from "@/components/sections/UrlEncoderDecoder";
import { buildToolMetadata } from "@/app/tools/toolSeo";

const title = "URL Encoder and Decoder";
const description =
  "Encode and decode URL-safe values directly in the browser for debugging and utility work.";
const path = "/tools/url-encoder-decoder";

export const metadata: Metadata = buildToolMetadata({ title, description, path });

export default function UrlEncoderDecoderPage() {
  return (
    <PageContainer title="URL Encoder and Decoder">
      <ToolPageJsonLd title={title} description={description} path={path} />
      <UrlEncoderDecoder />
    </PageContainer>
  );
}
