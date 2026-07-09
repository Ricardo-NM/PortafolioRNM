import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";

import {
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
    expect(html).toContain("lg:gap-x-0");
    expect(html).toContain("lg:pr-5");
    expect(html).toContain(
      "grid grid-cols-4 items-center gap-1.5 md:gap-2 lg:hidden",
    );
    expect(html).toContain(
      "h-8 w-full min-w-0 gap-1.5 border-[#52525c] px-2 text-[10px] font-bold leading-none text-[#52525c]",
    );
    expect(html).toContain("md:h-9 md:px-2.5 md:text-[11px]");
    expect(html).toContain("lg:w-auto lg:gap-2 lg:px-3");
    expect(html).toContain("[&amp;_svg]:shrink-0");
    expect(html).toContain("[&amp;_span]:leading-none");
    expect(html).toContain("dark:border-[#d4d4d8] dark:text-[#d4d4d8]");
    expect(html).toContain(
      "h-8 w-full min-w-0 gap-1.5 border-[#000] bg-[#000] px-2 text-[10px] font-bold leading-none text-[#d4d4d8]",
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
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain("Abrir formulario de contacto");
    expect(html).not.toContain('href="mailto:');
    expect(html).toContain('href="/api/cv"');
    expect(html).toContain('download="CV-Ricardo_Nava_Mayoral.pdf"');
    expect(html).toContain('aria-label="Curriculum"');
    expect(html).toContain('<span class="lg:hidden">CV</span>');
    expect(html).toContain('<span class="hidden lg:inline">Curriculum</span>');
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
      "hidden flex-col items-end gap-2 lg:flex lg:min-w-28",
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
    expect(html).toContain("gap-x-3 gap-y-2 py-3 sm:gap-y-0");
    expect(html).not.toContain("gap-y-2 py-5");
    expect(html).toContain("lg:grid-cols-[40px_minmax(0,1fr)_max-content]");
    expect(html).not.toContain("sm:grid-cols-[40px_minmax(0,1fr)_max-content]");
    expect(html).toContain("mt-0.5 text-xs font-medium");
    expect(html).toContain("sm:mt-1 sm:text-sm");
    expect(html).toContain("mt-1 text-xs font-medium leading-none");
    expect(html).toContain("sm:mt-2");
    expect(html).toContain('aria-label="Expandir experiencia en ArdabyTec"');
    expect(html).toContain(
      'aria-label="Contraer experiencia en KPUGA | Consultoria en comercio exterior"',
    );
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

  it("renders expanded experience details with stats, bullets, and badges", () => {
    const html = renderToStaticMarkup(<HomeSurface />);
    const text = html.replace(/<[^>]+>/g, "");

    expect(html).toContain('id="kpuga-details"');
    expect(html).toContain('aria-controls="kpuga-details"');
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain("grid auto-rows-fr grid-cols-2 md:grid-cols-4");
    expect(html).toContain(
      "relative flex min-h-14 flex-col items-center justify-center px-3 py-3 text-center md:px-4",
    );
    expect(html).toContain("experience-detail-local-guide-line");
    expect(html).toContain("text-justify");
    expect(text).toContain("+15");
    expect(text).toContain("USUARIOS");
    expect(text).toContain("VPS LINUX");
    expect(text).toContain("Comercio exterior");
    expect(text).toContain("MySQL");
  });

  it("keeps experience detail guide lines aligned with the page grid", () => {
    const html = renderToStaticMarkup(<HomeSurface />);

    expect(html).toContain("experience-detail-local-guide-line");
    expect(html).toContain("experience-detail-guide-dot");
    expect(html).toContain("experience-detail-stat-row");
    expect(html).toContain("experience-detail-bullet-row");
    expect(html).toContain("experience-item-guide-line");
    expect(html).toContain("experience-item-guide-dot");
    expect(html).toContain("col-span-full -mx-3 overflow-visible px-3");
    expect(html).toContain("absolute left-0 z-50 h-0 w-full");
    expect(html).toContain("absolute -left-3 z-50 h-0 w-[calc(100%+1.5rem)]");
    expect(html).not.toContain(
      "experience-detail-guide-line blueprint-mask-x pointer-events-none absolute left-0",
    );
    expect(html).toContain("-mx-3 px-3");
    expect(html).toContain("stats-column-guide blueprint-mask-y");
    expect(html).toContain("stats-column-guide-dot");
    expect(html).toContain("stats-row-guide-line");
    expect(html).toContain("stats-row-guide-dot");
    expect(html).toContain("top-1/2 md:hidden");
    expect(html).toContain("left-1/2 top-0 -translate-x-1/2");
    expect(html).toContain("md:hidden");
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
