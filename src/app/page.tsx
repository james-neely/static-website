import HeroSection from "@/components/sections/HeroSection";
import OverviewCards from "@/components/sections/OverviewCards";
import ProfessionalSummary from "@/components/sections/ProfessionalSummary";
import resumeData from "@/data/resumeData";

export default function HomePage() {
  const { hero, professionalSummary } = resumeData;

  return (
    <main>
      <HeroSection name={hero.name} title={hero.title} summary={hero.summary} />
      <OverviewCards />
      <ProfessionalSummary summary={professionalSummary} />
    </main>
  );
}
