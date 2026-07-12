import { Blueprint } from "@/components/blueprint";
import { ThemeBanner } from "@/components/theme-banner";
import { ExperienceSection } from "@/components/home/experience-section";
import { GitHubActivitySection } from "@/components/home/github-activity-section";
import { ProfileSection } from "@/components/home/profile-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { SkillsSection } from "@/components/home/skills-section";

export function HomeSurface() {
  return (
    <main
      id="inicio"
      className="relative min-h-dvh scroll-mt-24 overflow-hidden bg-background text-foreground"
    >
      <Blueprint />

      <header className="content-column relative">
        <ThemeBanner />
        <ProfileSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <GitHubActivitySection />
      </header>
    </main>
  );
}
