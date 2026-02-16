import type { Metadata } from "next";
import PageContainer from "@/components/common/PageContainer";
import ExperienceItem from "@/components/sections/ExperienceItem";
import resumeData from "@/data/resumeData";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional work history and career highlights for James Neely.",
};

export default function ExperiencePage() {
  return (
    <PageContainer title="Experience">
      {resumeData.experience.map((entry) => (
        <ExperienceItem key={`${entry.company}-${entry.role}`} {...entry} />
      ))}
    </PageContainer>
  );
}
