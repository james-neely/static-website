import type { Metadata } from "next";
import PageContainer from "@/components/common/PageContainer";
import ProjectItem from "@/components/sections/ProjectItem";
import resumeData from "@/data/resumeData";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects and initiatives by James Neely.",
};

export default function ProjectsPage() {
  return (
    <PageContainer title="Projects & Initiatives">
      {resumeData.projects.map((project) => (
        <ProjectItem key={project.name} {...project} />
      ))}
    </PageContainer>
  );
}
