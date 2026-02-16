import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import PageContainer from "@/components/common/PageContainer";
import SkillCategory from "@/components/sections/SkillCategory";
import resumeData from "@/data/resumeData";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills and areas of expertise for James Neely.",
};

export default function SkillsPage() {
  return (
    <PageContainer title="Skills">
      <Grid container spacing={3}>
        {resumeData.skills.map((group) => (
          <Grid key={group.category} size={{ xs: 12, sm: 6, md: 3 }}>
            <SkillCategory {...group} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
