import HeroSection from "@/components/sections/HeroSection";
import OverviewCards from "@/components/sections/OverviewCards";
import resumeData from "@/data/resumeData";

export default function HomePage() {
  const { hero } = resumeData;

  return (
    <main>
      <HeroSection name={hero.name} title={hero.title} summary={hero.summary} />
      <OverviewCards />
    </main>
  );
}
