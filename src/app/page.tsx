import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import DownloadCVSection from "@/components/DownloadCVSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <HeroSection />
      <PhilosophySection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
      <DownloadCVSection />
      <TestimonialsSection />
    </div>
  );
}
