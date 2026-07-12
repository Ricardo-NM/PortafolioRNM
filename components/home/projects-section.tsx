import { FocusRail, type FocusRailItem } from "@/components/focus-rail/focus-rail";
import { projectsData } from "@/components/home/home-data";
import { ViewportGuideLine } from "@/components/home/viewport-guide-line";

const projectRailItems: FocusRailItem[] = projectsData.map((project) => ({
  id: project.id,
  title: project.name,
  description: project.description,
  imageSrc: project.image.src,
  href: project.link,
  tech: project.tech,
}));
export function ProjectsSection() {
  return (
    <section
      id="proyectos"
      aria-labelledby="projects-title"
      className="relative scroll-mt-24 bg-background px-3"
      data-scroll-section
    >
      <div className="projects-section-title-row relative flex h-12 items-center">
        <ViewportGuideLine position="top" scope="projects" />

        <h2
          id="projects-title"
          className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]"
        >
          Proyectos
        </h2>
        <ViewportGuideLine position="bottom" scope="projects" />
      </div>

      <div className="relative -mx-3">
        <div className="project-focus-rail-shell">
          <FocusRail items={projectRailItems} autoPlay={false} loop={true} />
        </div>
      </div>
    </section>
  );
}

