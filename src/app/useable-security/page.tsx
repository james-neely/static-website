import type { Metadata } from "next";
import PageContainer from "@/components/common/PageContainer";
import ManifestoContent from "@/components/sections/ManifestoContent";

export const metadata: Metadata = {
  title: "Useable Security",
  description:
    "A manifesto on useable security: why security should enable people to build, not obstruct them.",
};

export default function UseableSecurityPage() {
  return (
    <PageContainer title="Useable Security">
      <ManifestoContent />
    </PageContainer>
  );
}
