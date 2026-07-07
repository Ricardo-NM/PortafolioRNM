import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { HomeSurface } from "@/components/home-surface";

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

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: vi.fn() }),
}));

describe("HomeSurface", () => {
  it("renders the profile summary and action links", () => {
    const html = renderToStaticMarkup(<HomeSurface />);
    const text = html.replace(/<[^>]+>/g, "");

    expect(text).toContain(
      "Desarrollador Full Stack especializado en sistemas empresariales, plataformas administrativas y aplicaciones web.",
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
      '<span class="font-bold text-[#000] dark:text-[#fff]">Desarrollador Full Stack</span>',
    );
    expect(html).toContain(
      '<span class="font-bold text-[#000] dark:text-[#fff]">resolver problemas</span>',
    );
    expect(html).toContain(
      '<span class="font-bold text-[#000] dark:text-[#fff]">ciclo de desarrollo</span>',
    );
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
    expect(html).toContain(
      "dark:border-[#d4d4d8] dark:text-[#d4d4d8]",
    );
    expect(html).toContain(
      "h-8 w-full min-w-0 gap-1.5 border-[#000] bg-[#000] px-2 text-[10px] font-bold leading-none text-[#d4d4d8]",
    );
    expect(html).toContain('stroke-width="2.5"');
    expect(html).toContain(
      "dark:border-[#fff] dark:bg-[#fff] dark:text-[#52525c]",
    );

    expect(html).toContain('href="mailto:');
    expect(html).toContain('href="/api/cv"');
    expect(html).toContain('download="CV-Ricardo_Nava_Mayoral.pdf"');
    expect(html).toContain('aria-label="Descargar CV"');
    expect(html).toContain('<span class="lg:hidden">CV</span>');
    expect(html).toContain(
      '<span class="hidden lg:inline">Descargar CV</span>',
    );
    expect(html).toContain('href="https://github.com/Ricardo-NM"');
    expect(html).toContain(
      'href="https://www.linkedin.com/in/ricardo-nava-mayoral/"',
    );
  });
});
