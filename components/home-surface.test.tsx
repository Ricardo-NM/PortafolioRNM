import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";

import {
  getNextAutoSkillIndex,
  getNextExperienceTransition,
  HomeSurface,
} from "@/components/home-surface";
import {
  contactFormConfig,
  hasContactDraft,
  isContactFormComplete,
} from "@/components/contact-drawer";

vi.mock("next/image", () => ({
  default: ({ alt, className }: { alt: string; className?: string }) => (
    <span aria-label={alt} className={className} role="img" />
  ),
}));

vi.mock("@/assets/images/profilePicture.jpeg", () => ({
  default: { src: "/profilePicture.jpeg", height: 500, width: 500 },
}));

vi.mock("@/assets/images/bannerLight.png", () => ({
  default: { src: "/bannerLight.png", height: 781, width: 2014 },
}));

vi.mock("@/assets/images/bannerDark.png", () => ({
  default: { src: "/bannerDark.png", height: 781, width: 2014 },
}));

vi.mock("@/assets/images/bannerL.png", () => ({
  default: { src: "/bannerL.png", height: 400, width: 1200 },
}));

vi.mock("@/assets/images/profileL.jpg", () => ({
  default: { src: "/profileL.jpg", height: 500, width: 500 },
}));

vi.mock("@/assets/images/experienceOne.png", () => ({
  default: { src: "/experienceOne.png", height: 256, width: 256 },
}));

vi.mock("@/assets/images/experienceSecond.png", () => ({
  default: { src: "/experienceSecond.png", height: 256, width: 256 },
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: vi.fn() }),
}));

describe("HomeSurface", () => {
  it("detects contact form drafts when any field has text", () => {
    expect(
      hasContactDraft({
        fullName: "",
        email: "",
        message: "",
        website: "",
      }),
    ).toBe(false);
    expect(
      hasContactDraft({
        fullName: "Ricardo",
        email: "",
        message: "",
        website: "",
      }),
    ).toBe(true);
    expect(
      hasContactDraft({
        fullName: "",
        email: "ricardo@example.com",
        message: "",
        website: "",
      }),
    ).toBe(true);
    expect(
      hasContactDraft({
        fullName: "",
        email: "",
        message: "Hola",
        website: "",
      }),
    ).toBe(true);
  });

  it("requires all contact form fields to be filled before submit", () => {
    expect(
      isContactFormComplete({
        fullName: "",
        email: "",
        message: "",
        website: "",
      }),
    ).toBe(false);
    expect(
      isContactFormComplete({
        fullName: "Ricardo Nava",
        email: "ricardo@example.com",
        message: "",
        website: "",
      }),
    ).toBe(false);
    expect(
      isContactFormComplete({
        fullName: "Ricardo Nava",
        email: "ricardo@example.com",
        message: "Hola",
        website: "",
      }),
    ).toBe(true);
  });

  it("uses the required contact field names", () => {
    expect(contactFormConfig.fields).toEqual({
      fullName: "fi-sender-fullName",
      email: "fi-sender-email",
      message: "fi-text-message",
    });
  });

  it("renders the profile summary and action links", () => {
    const html = renderToStaticMarkup(<HomeSurface />);
    const text = html.replace(/<[^>]+>/g, "");

    expect(text).toContain(
      "Especialista en el desarrollo de sistemas empresariales, plataformas administrativas y aplicaciones web.",
    );
    expect(text).toContain(
      "Dominio de herramientas y tecnologías de desarrollo para resolver problemas técnicos y crear soluciones funcionales, escalables y bien estructuradas.",
    );
    expect(text).toContain(
      "Participación en todo el ciclo de desarrollo, desde el análisis y diseño hasta el despliegue, mejora continua y optimización de los sistemas.",
    );
    expect(html).toContain(
      "font-medium leading-5 text-[#52525c] dark:text-[#d4d4d8]",
    );
    expect(html).toContain("min-[1440px]:gap-x-0");
    expect(html).toContain("min-[1440px]:pr-5");
    expect(html).toContain(
      "grid grid-cols-2 items-center gap-2 sm:grid-cols-4 min-[1440px]:hidden",
    );
    expect(html).toContain(
      "h-9 w-full min-w-0 gap-1.5 border-[#d4d4d8] bg-transparent px-2.5 text-[11px] font-semibold leading-none text-[#52525c]",
    );
    expect(html).toContain("transition-colors duration-300 ease-in-out");
    expect(html).toContain(
      "hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff]",
    );
    expect(html).toContain("px-2.5 text-[11px]");
    expect(html).toContain(
      "min-[1440px]:w-auto min-[1440px]:gap-2 min-[1440px]:px-3",
    );
    expect(html).toContain("[&amp;_svg]:shrink-0");
    expect(html).toContain("[&amp;_span]:leading-none");
    expect(html).toContain("dark:border-[#3f3f46] dark:text-[#a1a1aa]");
    expect(html).toContain(
      "dark:hover:border-[#fff] dark:hover:bg-[#fff] dark:hover:text-[#18181b]",
    );
    expect(html).toContain(
      "h-9 w-full min-w-0 gap-1.5 border-[#000] bg-[#000] px-2.5 text-[11px] font-semibold leading-none text-[#d4d4d8]",
    );
    expect(html).toContain('stroke-width="2.5"');
    expect(html).toContain(
      "dark:border-[#fff] dark:bg-[#fff] dark:text-[#52525c]",
    );
    expect(html).toContain(
      "profile-section relative flex flex-col items-center bg-background px-3 pt-0 pb-3 text-center",
    );
    expect(html).toContain("profile-guide-line");
    expect(html).toContain("profile-guide-dot");
    expect(html).not.toContain(
      "top-[calc(var(--banner-height)+var(--profile-height))]",
    );
    expect(html).toContain(
      'aria-labelledby="profile-summary-title" class="relative bg-background px-3 py-3"',
    );
    expect(html).toContain('aria-label="Cambiar a tema claro"');
    expect(html).toContain(
      "border-[#d4d4d8] bg-[#fff] text-[#52525c] transition-colors duration-300 ease-in-out hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] dark:border-[#3f3f46] dark:bg-[#000] dark:text-[#a1a1aa] dark:hover:border-[#fff] dark:hover:bg-[#fff] dark:hover:text-[#18181b] h-8 min-w-8 w-8 rounded-md p-0",
    );
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain("Abrir formulario de contacto");
    expect(html).not.toContain('href="mailto:');
    expect(html).toContain('href="/api/cv"');
    expect(html).toContain('download="CV-Ricardo_Nava_Mayoral.pdf"');
    expect(html).toContain('aria-label="Curriculum"');
    expect(html).toContain('<span class="min-[1440px]:hidden">CV</span>');
    expect(html).toContain(
      '<span class="hidden min-[1440px]:inline">Curriculum</span>',
    );
    expect(html).toContain('href="https://github.com/Ricardo-NM"');
    expect(html).toContain("group-hover/github-preview:pointer-events-auto");
    expect(html).toContain("group/github-preview relative z-[80]");
    expect(html).toContain("left-full z-[90] hidden w-[262px]");
    expect(html).toContain("origin-left");
    expect(html).toContain("transition-[clip-path,opacity]");
    expect(html).toContain("profile-preview-sweep");
    expect(html).not.toContain("transition-[opacity,transform]");
    expect(html).not.toContain("scale-75");
    expect(html).toContain("group-hover/github-preview:delay-300");
    expect(html).toContain("group-focus-within/github-preview:delay-300");
    expect(html).toContain("[clip-path:polygon(0_50%,0_50%,0_50%,0_50%)]");
    expect(html).toContain(
      "group-hover/github-preview:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]",
    );
    expect(html).toContain("group-hover/github-preview:opacity-100");
    expect(html).toContain("absolute top-1/2 left-3");
    expect(html).toContain("Ricardo-NM");
    expect(html).toContain("Full Stack Developer");
    expect(html).toContain("Hidalgo, MX (UTC -06:00)");
    expect(html).toContain(
      '<strong class="font-bold text-[#18181b] dark:text-[#f4f4f5]">13</strong>',
    );
    expect(html).toContain("Repositorios");
    expect(html).toContain("lucide-star");
    expect(html).toContain("border-1 border-[#826ef8]");
    expect(html).toContain('style="border-color:#826ef8"');
    expect(html).toContain("text-[#52525c] dark:text-[#d4d4d8]");
    expect(html).toContain("PRO");
    expect(html).toContain(
      'href="https://www.linkedin.com/in/ricardo-nava-mayoral/"',
    );
    const desktopActionsStart = html.indexOf(
      "hidden flex-col items-end gap-2 min-[1440px]:flex min-[1440px]:min-w-28",
    );
    expect(desktopActionsStart).toBeGreaterThan(-1);
    expect(
      html.indexOf("group/linkedin-preview", desktopActionsStart),
    ).toBeGreaterThan(desktopActionsStart);
    expect(html).toContain("group/linkedin-preview");
    expect(html).toContain("group/linkedin-preview relative z-[80]");
    expect(html).toContain("group-hover/linkedin-preview:pointer-events-auto");
    expect(html).toContain("group-hover/linkedin-preview:delay-300");
    expect(html).toContain("group-focus-within/linkedin-preview:delay-300");
    expect(html).toContain(
      "group-hover/linkedin-preview:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]",
    );
    expect(html).toContain("group-hover/linkedin-preview:opacity-100");
    expect(html).toContain("h-16");
    expect(html).toContain("rounded-full border-2");
    expect(html).toContain("Desarrollador Full Stack");
    expect(html).toContain("Tizayuca, Hidalgo, México");
    expect(html).toContain(
      '<strong class="font-bold text-[#18181b] dark:text-[#f4f4f5]">3</strong>',
    );
    expect(html).toContain("Seguidores");
  });

  it("renders the experience section below the profile summary", () => {
    const html = renderToStaticMarkup(<HomeSurface />);
    const text = html.replace(/<[^>]+>/g, "");

    expect(text.indexOf("Perfil profesional")).toBeGreaterThan(-1);
    expect(text.indexOf("Experiencia")).toBeGreaterThan(
      text.indexOf("Perfil profesional"),
    );
    expect(text).toContain("ArdabyTec");
    expect(text).toContain("Mayo 2025 - Diciembre 2025");
    expect(text).toContain("Presencial");
    expect(text).toContain("KPUGA | Consultoria en comercio exterior");
    expect(text).toContain("Enero 2026 - Junio 2026");
    expect(text).toContain("Hibrido");

    expect(html).toContain('aria-labelledby="experience-title"');
    expect(html).toContain("experience-section-title-row");
    expect(html).toContain("flex h-12 items-center");
    expect(html).not.toContain(
      "experience-section-title-row relative flex h-16",
    );
    expect(html).toContain("text-base font-bold");
    expect(html).toContain("experience-guide-line");
    expect(html).toContain("experience-guide-dot");
    expect(html).toContain(
      "experience-guide-dot blueprint-dot absolute top-0 -translate-x-1/2 -translate-y-1/2 left-[var(--content-left)]",
    );
    expect(html).toContain(
      "experience-guide-dot blueprint-dot absolute top-0 -translate-x-1/2 -translate-y-1/2 left-[var(--content-right)]",
    );
    expect(html).toContain(
      "absolute left-1/2 z-50 h-0 w-screen -translate-x-1/2",
    );
    expect(html).not.toContain("h-[3px] w-[3px]");
    expect(html).toContain("top-0");
    expect(html).toContain("bottom-0");
    expect(html).toContain("py-3");
    expect(html).toContain("gap-x-3 gap-y-0 py-3");
    expect(html).toContain("col-start-2 mt-2 flex");
    expect(html).toContain("sm:mt-0");
    expect(html).not.toContain("gap-y-2 py-5");
    expect(html).toContain(
      "min-[1200px]:grid-cols-[40px_minmax(0,1fr)_max-content_20px]",
    );
    expect(html).toContain("min-[1200px]:contents");
    expect(html).toContain("min-[1200px]:col-start-3 min-[1200px]:row-start-1");
    expect(html).toContain("min-[1200px]:col-start-4 min-[1200px]:row-start-1");
    expect(html).toContain("min-[1200px]:text-right");
    expect(html).not.toContain("sm:grid-cols-[40px_minmax(0,1fr)_max-content]");
    expect(html).toContain("mt-0.5 text-xs font-medium");
    expect(html).toContain("sm:mt-1 sm:text-sm");
    expect(html).toContain("mt-1 text-xs font-medium leading-none");
    expect(html).toContain("sm:mt-2");
    expect(html).toContain('aria-label="Expandir experiencia en ArdabyTec"');
    expect(html).toContain(
      "grid h-10 w-10 place-items-center rounded-lg border border-[#e4e4e7] bg-[#fff]",
    );
    expect(html).toContain("object-contain");
    expect(html).toContain("dark:border-[#27272a]");
    expect(html).toContain("dark:text-[#f4f4f5]");
    expect(html).toContain("dark:text-[#a1a1aa]");
    expect(html).toContain("h-5 w-5");
    expect(html).toContain("hover:bg-transparent");
    expect(html).not.toContain(
      "h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md border border-transparent",
    );
    expect(html).toContain("lucide-chevron-down");
  });

  it("renders project technologies with theme-aware Simple Icons URLs", () => {
    const html = renderToStaticMarkup(<HomeSurface />);
    const text = html.replace(/<[^>]+>/g, "");

    expect(text).toContain("React");
    expect(text).toContain("Tailwind CSS");
    expect(text).toContain("Node.js");
    expect(text).toContain("MySQL");
    expect(text).toContain("VPS Linux");
    expect(text).toContain("NGINX");
    expect(text).toContain("PM2");
    expect(text).toContain("C#");
    expect(text).toContain(".NET");
    expect(text).toContain("IIS");
    expect(text).toContain("Active Directory");
    expect(text).toContain("Expo");
    expect(text).toContain("React Native");
    expect(text).toContain("NestJS");
    expect(text).toContain("Prisma");
    expect(text).toContain("PostgreSQL");
    expect(text).toContain("Docker");

    expect(html).toContain("https://cdn.simpleicons.org/react/71717a");
    expect(html).toContain("https://cdn.simpleicons.org/react/18181b");
    expect(html).toContain("https://cdn.simpleicons.org/react/a1a1aa");
    expect(html).toContain("https://cdn.simpleicons.org/react/fff");
    expect(html).toContain("tech-icon-layer");
    expect(html).toContain("dark:group-hover/tooltip:opacity-100");
    expect(html).toContain("group-hover/tooltip:opacity-100");
    expect(html).not.toContain("lucide-globe");
    expect(html).not.toContain("lucide-database");
  });

  it("inverts project card colors and technology icon variants on card hover", () => {
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).toContain("group/card");
    expect(html).toContain("hover:border-[#27272a]");
    expect(html).toContain("hover:bg-[#18181b]");
    expect(html).toContain("group-hover/card:text-[#f4f4f5]");
    expect(html).toContain("group-hover/card:text-[#a1a1aa]");
    expect(html).toContain("hover:border-[#27272a]");
    expect(html).toContain("dark:hover:border-[#e4e4e7]");
    expect(html).toContain("dark:hover:bg-[#fff]");
    expect(html).toContain("dark:group-hover/card:text-[#18181b]");
    expect(html).toContain("dark:group-hover/card:text-[#52525c]");
    expect(html).toContain("dark:hover:border-[#e4e4e7]");
    expect(html).toContain("group-hover/card:opacity-0");
    expect(html).toContain("group-hover/card:opacity-100");
    expect(html).toContain("dark:group-hover/card:opacity-0");
    expect(html).toContain("dark:group-hover/card:opacity-100");
  });

  it("inverts project card colors and technology icon variants while pressed", () => {
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).toContain("active:border-[#27272a]");
    expect(html).toContain("active:bg-[#18181b]");
    expect(html).toContain("group-active/card:text-[#f4f4f5]");
    expect(html).toContain("group-active/card:text-[#a1a1aa]");
    expect(html).toContain("dark:active:border-[#e4e4e7]");
    expect(html).toContain("dark:active:bg-[#fff]");
    expect(html).toContain("dark:group-active/card:text-[#18181b]");
    expect(html).toContain("dark:group-active/card:text-[#52525c]");
    expect(html).toContain("group-active/card:opacity-0");
    expect(html).toContain("group-active/card:opacity-100");
    expect(html).toContain("dark:group-active/card:opacity-0");
    expect(html).toContain("dark:group-active/card:opacity-100");
  });

  it("keeps project image borders by default and hides them on card hover", () => {
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).toContain("group-hover/card:bg-[#27272a]/30");
    expect(html).toContain("dark:group-hover/card:bg-[#f4f4f5]/50");
    expect(html).toContain(
      "rounded-lg border border-[#e4e4e7] bg-[#f4f4f5]/50 transition-colors duration-300 group-hover/card:!border-transparent",
    );
    expect(html).toContain(
      "dark:border-[#27272a] dark:bg-[#27272a]/30 dark:group-hover/card:!border-transparent",
    );
    expect(html).toContain(
      "aspect-[4/3] overflow-hidden border-[#e4e4e7] transition-colors duration-300 group-hover/card:!border-transparent",
    );
    expect(html).toContain(
      "dark:border-[#3f3f46] dark:group-hover/card:!border-transparent",
    );
    expect(html).not.toContain(
      "aspect-[4/3] overflow-hidden dark:border-[#3f3f46]",
    );
    expect(html).not.toContain(
      "bg-[#f4f4f5]/50 transition-colors duration-300 group-hover/card:border-[#27272a]",
    );
    expect(html).not.toContain(
      "aspect-[4/3] overflow-hidden border-[#e4e4e7] transition-colors duration-300 group-hover/card:border-[#3f3f46]",
    );
  });

  it("keeps project cards free of hover glow while preserving image zoom", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).not.toContain("project-card");
    expect(css).not.toContain("project-border-glow");
    expect(css).not.toContain(".project-card::before");
    expect(css).not.toContain(".project-card::after");
    expect(css).not.toContain("drop-shadow");
    expect(html).toContain("group-hover/card:scale-[1.025]");
    expect(html).toContain("transition-transform duration-300 ease-out");
  });

  it("renders projects and skills section headers with full viewport guide lines", () => {
    const html = renderToStaticMarkup(<HomeSurface />);
    const text = html.replace(/<[^>]+>/g, "");
    const skillsText = text.slice(text.indexOf("Habilidades"));

    expect(text.indexOf("Proyectos")).toBeGreaterThan(
      text.indexOf("Experiencia"),
    );
    expect(text.indexOf("Habilidades y Tecnologías")).toBeGreaterThan(
      text.indexOf("Saldo Claro"),
    );
    expect(html).toContain("projects-guide-line");
    expect(html).toContain("skills-guide-line");
    expect(html).toContain("skills-guide-dot");
    expect(html).toContain("projects-skills-intersection-dot");
    expect(html).toContain(
      "projects-skills-intersection-dot blueprint-dot pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 z-50 md:block",
    );
    expect(html).toContain('aria-labelledby="skills-title"');
    expect(html).not.toContain("Frontend");
    expect(html).not.toContain("Backend");
    expect(html).not.toContain("Infraestructura");
    expect(html).toContain("JavaScript");
    expect(html).toContain("HTML5");
    expect(html).toContain("Express.js");
    expect(html).toContain("MongoDB");
    expect(html).toContain("GitHub");
    expect(html).toContain("Figma");
    expect(skillsText.indexOf("Prisma ORM")).toBeGreaterThan(
      skillsText.indexOf("Expo"),
    );
    expect(skillsText.indexOf("Flutter")).toBeGreaterThan(
      skillsText.indexOf("Prisma ORM"),
    );
    expect(skillsText.indexOf("Redis")).toBeGreaterThan(
      skillsText.indexOf("PostgreSQL"),
    );
    expect(skillsText.indexOf("VPS Linux")).toBeGreaterThan(
      skillsText.indexOf("GitHub"),
    );
    expect(skillsText.indexOf("Nginx")).toBeGreaterThan(
      skillsText.indexOf("VPS Linux"),
    );
    expect(skillsText.indexOf("PM2")).toBeGreaterThan(
      skillsText.indexOf("Nginx"),
    );
    expect(html).toContain("group/skill");
    expect(html).toContain("skill-icon-layer");
    expect(html).toContain("data-auto-active");
    expect(html).toContain("data-auto-skills");
    expect(html).toContain("data-[auto-active=true]:border-[#18181b]");
    expect(html).toContain("dark:data-[auto-active=true]:border-[#fff]");
    expect(html).toContain("group-data-[auto-active=true]/skill:opacity-0");
    expect(html).toContain(
      "dark:group-data-[auto-active=true]/skill:opacity-100",
    );
    expect(html).toContain("hover:border-[#18181b]");
    expect(html).toContain("dark:hover:border-[#fff]");
    expect(html).toContain("flex flex-wrap gap-2");
    expect(html).toContain("flex-auto");
    expect(html).toContain("duration-700");
    expect(html).toContain("ease-in-out");
    expect(html).toContain("https://cdn.simpleicons.org/javascript/71717a");
    expect(html).toContain("https://cdn.simpleicons.org/javascript/fff");
    expect(html).toContain("https://cdn.simpleicons.org/javascript/a1a1aa");
    expect(html).toContain("https://cdn.simpleicons.org/javascript/18181b");
  });

  it("renders a GitHub activity header with the shared viewport guide style", () => {
    const html = renderToStaticMarkup(<HomeSurface />);
    const text = html.replace(/<[^>]+>/g, "");

    expect(text.indexOf("Actividad de GitHub")).toBeGreaterThan(
      text.indexOf("Habilidades y TecnologÃ­as"),
    );
    expect(html).toContain('aria-labelledby="github-activity-title"');
    expect(html).toContain("github-activity-guide-line");
    expect(html).toContain("github-activity-guide-dot");
    expect(html).toContain(
      "github-activity-section-title-row relative flex h-12 items-center",
    );
    expect(html).not.toContain('data-auto-github-activity="true"');
  });

  it("renders the GitHub activity calendar shell with inverted theme palettes", () => {
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).toContain("github-activity-calendar");
    expect(html).toContain('class="github-activity-calendar py-4"');
    expect(html).toContain("Cargando actividad de GitHub");
    expect(html).toContain("Menos");
    expect(html).toContain("Más");
    expect(html).toContain(">Ene<");
    expect(html).toContain(">Abr<");
    expect(html).toContain(">Ago<");
    expect(html).toContain(">Dic<");
    expect(html).toContain("github-activity-summary-row");
    expect(html).toContain("github-activity-summary-text");
    expect(html).toContain("github-activity-legend ml-auto");
    expect(html).toContain("bg-[#18181b] dark:bg-[#f4f4f5]");
    expect(html).toContain("bg-[#52525c] dark:bg-[#d4d4d8]");
    expect(html).toContain("aria-label=\"Calendario de contribuciones\"");
    expect(html).toContain("github-activity-frame rounded-md border");
    expect(html).toContain("github-activity-scroll overflow-x-auto");
    expect(html).toContain("github-activity-grid min-w-[686px] w-full");
    expect(html).not.toContain("github-activity-legend sticky right-0");
    expect(html.indexOf("github-activity-summary-row")).toBeGreaterThan(
      html.indexOf("github-activity-scroll overflow-x-auto"),
    );
    expect(html.lastIndexOf(">Jul<")).toBeGreaterThan(
      html.indexOf(">Jun<"),
    );
    expect(html).toContain(
      "grid w-full gap-[3px] overflow-visible text-[11px]",
    );
    expect(html).toContain(
      "whitespace-nowrap last:justify-self-end",
    );
    expect(html).toContain(
      "grid w-full auto-cols-[minmax(10px,1fr)] grid-flow-col grid-rows-7",
    );
    expect(html).toContain("aspect-square w-full rounded-[2px]");
    expect(html).not.toContain("grid-cols-[auto_1fr]");
    expect(html).not.toContain(">Mon<");
    expect(html).not.toContain(">Wed<");
    expect(html).not.toContain(">Fri<");
    expect(html).not.toContain(">Jan<");
    expect(html).not.toContain(">Apr<");
    expect(html).not.toContain(">Aug<");
    expect(html).not.toContain(">Dec<");
    expect(html).not.toContain(
      'aria-labelledby="github-activity-title" class="relative bg-background px-3 pb-8"',
    );

    const source = readFileSync(
      join(process.cwd(), "components", "home-surface.tsx"),
      "utf8",
    );
    expect(source).toContain(
      "scrollElement.scrollWidth - scrollElement.clientWidth",
    );
  });

  it("keeps equal vertical padding around the skills pills before the next guide line", () => {
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).toContain('aria-labelledby="skills-title"');
    expect(html).toContain("flex flex-wrap gap-2 py-4");
    expect(html).not.toContain(
      'aria-labelledby="skills-title" class="relative bg-background px-3 pb-8"',
    );
  });

  it("selects a different automatic skill hover target when possible", () => {
    expect(getNextAutoSkillIndex(null, 0, () => 0)).toBeNull();
    expect(getNextAutoSkillIndex(null, 1, () => 0)).toBe(0);
    expect(getNextAutoSkillIndex(2, 5, () => 0.4)).toBe(3);
    expect(getNextAutoSkillIndex(2, 5, () => 0.8)).toBe(4);
  });

  it("queues experience accordion changes so one panel closes before the next opens", () => {
    expect(getNextExperienceTransition(null, "kpuga")).toEqual({
      activeId: "kpuga",
      pendingId: null,
    });
    expect(getNextExperienceTransition("kpuga", "kpuga")).toEqual({
      activeId: null,
      pendingId: null,
    });
    expect(getNextExperienceTransition("kpuga", "ardabytec")).toEqual({
      activeId: null,
      pendingId: "ardabytec",
    });
  });

  it("starts with the experience accordion closed", () => {
    const html = renderToStaticMarkup(<HomeSurface />);
    const text = html.replace(/<[^>]+>/g, "");

    expect(html).not.toContain('id="kpuga-details"');
    expect(html).not.toContain('aria-expanded="true"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain("grid auto-rows-fr grid-cols-2 md:grid-cols-4");
    expect(text).not.toContain("+15");
    expect(text).not.toContain("USUARIOS");
    expect(text).not.toContain("VPS LINUX");
  });

  it("clips the animated experience details while collapsing", () => {
    const source = readFileSync(
      join(process.cwd(), "components", "home-surface.tsx"),
      "utf8",
    );

    expect(source).toContain(
      'className="col-span-full -mx-3 overflow-hidden px-3"',
    );
    expect(source).not.toContain(
      'className="col-span-full -mx-3 overflow-visible px-3"',
    );
  });

  it("keeps mobile experience spacing out of the animated grid row gap", () => {
    const source = readFileSync(
      join(process.cwd(), "components", "home-surface.tsx"),
      "utf8",
    );

    expect(source).toContain(
      'className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-0 py-3',
    );
    expect(source).toContain(
      'className="col-start-2 mt-2 flex min-w-0 items-start justify-between gap-3 sm:mt-0',
    );
    expect(source).not.toContain(
      'className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-2 py-3',
    );
  });

  it("uses a tablet reading layout through hub-sized viewports before the desktop breakpoint", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    const source = readFileSync(
      join(process.cwd(), "components", "home-surface.tsx"),
      "utf8",
    );

    expect(css).toContain("@media (min-width: 768px)");
    expect(css).toContain(
      "@media (min-width: 1200px) and (max-width: 1439px)",
    );
    expect(css).toContain("--content-width: 76%");
    expect(css).toContain("@media (min-width: 1440px)");
    expect(css).not.toContain("@media (min-width: 1280px)");
    expect(css).not.toContain("@media (min-width: 1024px)");
    expect(source).toContain(
      "grid auto-rows-fr grid-cols-2 min-[1200px]:grid-cols-4",
    );
    expect(source).toContain("grid grid-cols-1 md:grid-cols-2");
    expect(source).toContain("hidden -translate-x-1/2 translate-y-1/2 z-50 md:block");
    expect(source).not.toContain("grid auto-rows-fr grid-cols-2 lg:grid-cols-4");
    expect(source).not.toContain("grid grid-cols-1 lg:grid-cols-2");
  });

  it("lets project technology icons wrap without squeezing the project link", () => {
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).toContain(
      "mt-4 flex flex-wrap items-end justify-between gap-3 pt-3 border-t",
    );
    expect(html).toContain(
      "flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-2",
    );
    expect(html).toContain(
      "group/link flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px]",
    );
    expect(html).toContain("Ver proyecto");
    expect(html).not.toContain("mt-4 flex items-center justify-between pt-3 border-t");
  });

  it("keeps experience detail guide lines aligned with the page grid", () => {
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).not.toContain("experience-detail-stat-row");
    expect(html).not.toContain("experience-detail-bullet-row");
    expect(html).toContain("experience-item-guide-line");
    expect(html).toContain("experience-item-guide-dot");
    expect(html).toContain(
      "experience-item-guide-line blueprint-mask-x absolute left-0 top-0 z-20 h-[2px] w-full",
    );
    expect(html).toContain(
      "pointer-events-none absolute -left-3 z-50 h-0 w-[calc(100%+1.5rem)]",
    );
    expect(html).toContain(
      "experience-item-guide-dot blueprint-dot absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2",
    );
    expect(html).toContain(
      "experience-item-guide-dot blueprint-dot absolute right-0 top-0 translate-x-1/2 -translate-y-1/2",
    );
    expect(html).not.toContain(
      "experience-detail-guide-line blueprint-mask-x pointer-events-none absolute left-0",
    );
    expect(html).not.toContain("bg-foreground/45");
    expect(html).not.toContain("border-r border-dotted");
    expect(html).not.toContain("odd:border-r");
  });

  it("uses one shared blueprint dot and line style across guide systems", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(css).toContain("background-size: 7px 2px");
    expect(css).toContain("background-size: 2px 7px");
    expect(css).toContain("z-index: 70");
    expect(css).toContain("width: 2px");
    expect(css).toContain("height: 2px");
    expect(css).toContain("border-radius: 9999px");
    expect(css).toContain("background: #000");
    expect(css).toContain(".dark .blueprint-dot");
    expect(css).toContain('[data-theme="dark"] .blueprint-dot');
    expect(css).toContain("background: #fff");
    expect(html).not.toContain("rounded-full bg-[#000] dark:bg-[#fff]");
  });

  it("hides the system scrollbar while keeping the page scrollable", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

    expect(css).not.toContain("scrollbar-gutter: stable");
    expect(css).toContain("scrollbar-width: none");
    expect(css).toContain("-ms-overflow-style: none");
    expect(css).toContain("*::-webkit-scrollbar");
    expect(css).toContain("::-webkit-scrollbar");
    expect(css).toContain("display: none");
  });
});
