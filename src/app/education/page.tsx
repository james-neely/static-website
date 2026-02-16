import type { Metadata } from "next";
import PageContainer from "@/components/common/PageContainer";
import EducationItem from "@/components/sections/EducationItem";
import resumeData from "@/data/resumeData";

export const metadata: Metadata = {
  title: "Education",
  description: "Academic background and educational credentials for James Neely.",
};

export default function EducationPage() {
  return (
    <PageContainer title="Education">
      {resumeData.education.map((entry) => (
        <EducationItem key={`${entry.institution}-${entry.credential}`} {...entry} />
      ))}
    </PageContainer>
  );
}
