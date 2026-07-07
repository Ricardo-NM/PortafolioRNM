import Image from "next/image";
import { Download, Github, Linkedin, Mail } from "lucide-react";

import profilePicture from "@/assets/images/profilePicture.jpeg";
import { Blueprint } from "@/components/blueprint";
import { ThemeBanner } from "@/components/theme-banner";
import { Button } from "@/components/ui/button";

const profileSummary = [
  [
    { text: "Desarrollador Full Stack", highlight: true },
    {
      text: " especializado en sistemas empresariales, plataformas administrativas y aplicaciones web.",
    },
  ],
  [
    { text: "Dominio de herramientas y tecnologías de desarrollo para " },
    { text: "resolver problemas", highlight: true },
    {
      text: " técnicos y crear soluciones funcionales, escalables y bien estructuradas.",
    },
  ],
  [
    { text: "Participación en todo el " },
    { text: "ciclo de desarrollo", highlight: true },
    {
      text: ", desde el análisis y diseño hasta el despliegue, mejora continua y optimización de los sistemas.",
    },
  ],
];

const profileActionButtonClass =
  "h-8 w-full min-w-0 gap-1.5 border-[#52525c] px-2 text-[10px] font-bold leading-none text-[#52525c] hover:border-[#52525c] hover:bg-transparent hover:text-[#52525c] dark:border-[#d4d4d8] dark:text-[#d4d4d8] dark:hover:border-[#d4d4d8] dark:hover:bg-transparent dark:hover:text-[#d4d4d8] md:h-9 md:px-2.5 md:text-[11px] lg:w-auto lg:gap-2 lg:px-3 [&_svg]:shrink-0 [&_span]:leading-none";

const profileContactButtonClass =
  "h-8 w-full min-w-0 gap-1.5 border-[#000] bg-[#000] px-2 text-[10px] font-bold leading-none text-[#d4d4d8] hover:border-[#000] hover:bg-[#000] hover:text-[#d4d4d8] dark:border-[#fff] dark:bg-[#fff] dark:text-[#52525c] dark:hover:border-[#fff] dark:hover:bg-[#fff] dark:hover:text-[#52525c] md:h-9 md:px-2.5 md:text-[11px] lg:w-auto lg:gap-2 lg:px-3 [&_svg]:shrink-0";

export function HomeSurface() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <Blueprint />

      <header className="content-column relative">
        <ThemeBanner />

        <div className="profile-section relative flex flex-col items-center bg-background px-3 pb-5 text-center">
          <div className="relative z-30 -mt-3 h-[clamp(4.75rem,18vw,5.75rem)] w-[clamp(4.75rem,18vw,5.75rem)] shrink-0 rounded-lg bg-border p-px">
            <Image
              src={profilePicture}
              alt="Ricardo Nava Mayoral"
              priority
              sizes="(min-width: 768px) 8vw, 22vw"
              className="h-full w-full rounded-md object-cover"
            />
          </div>

          <div className="mt-3 min-w-0">
            <h1 className="truncate text-sm font-semibold uppercase leading-none">
              Ricardo Nava Mayoral
            </h1>
            <p className="mt-2 truncate text-xs font-mono font-normal leading-none">
              Desarrollador Full Stack
            </p>
          </div>
        </div>

        <section
          aria-labelledby="profile-summary-title"
          className="relative bg-background px-3 py-6"
        >
          <h2 id="profile-summary-title" className="sr-only">
            Perfil profesional
          </h2>

          <div className="relative z-30 grid gap-y-5 lg:grid-cols-[minmax(0,1fr)_max-content] lg:items-start lg:gap-x-0">
            <div className="min-w-0 lg:pr-5">
              <ul className="list-disc space-y-2 pl-4 text-justify text-[13px] font-medium leading-5 text-[#52525c] dark:text-[#d4d4d8]">
                {profileSummary.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.map((part) =>
                      part.highlight ? (
                        <span
                          key={part.text}
                          className="font-bold text-[#000] dark:text-[#fff]"
                        >
                          {part.text}
                        </span>
                      ) : (
                        part.text
                      ),
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-5 hidden items-center justify-start lg:flex">
                <Button asChild className={profileContactButtonClass}>
                  <a href="mailto:" aria-label="Enviar email de contacto">
                    <Mail size={13} strokeWidth={2.5} aria-hidden="true" />
                    Contacto
                  </a>
                </Button>
              </div>
            </div>

            <div className="col-span-full grid grid-cols-4 items-center gap-1.5 md:gap-2 lg:hidden">
              <Button asChild className={profileContactButtonClass}>
                <a href="mailto:" aria-label="Enviar email de contacto">
                  <Mail size={13} strokeWidth={2.5} aria-hidden="true" />
                  Contacto
                </a>
              </Button>

              <Button asChild className={profileActionButtonClass}>
                <a
                  href="https://github.com/Ricardo-NM"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={13} strokeWidth={2.5} aria-hidden="true" />
                  GitHub
                </a>
              </Button>

              <Button asChild className={profileActionButtonClass}>
                <a
                  href="https://www.linkedin.com/in/ricardo-nava-mayoral/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={13} strokeWidth={2.5} aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>

              <Button asChild className={profileActionButtonClass}>
                <a
                  href="/api/cv"
                  download="CV-Ricardo_Nava_Mayoral.pdf"
                  aria-label="Descargar CV"
                >
                  <Download size={13} strokeWidth={2.5} aria-hidden="true" />
                  <span className="lg:hidden">CV</span>
                  <span className="hidden lg:inline">Descargar CV</span>
                </a>
              </Button>
            </div>

            <div className="hidden flex-col items-end gap-2 lg:flex lg:min-w-28">
              <Button asChild className={profileActionButtonClass}>
                <a
                  href="https://github.com/Ricardo-NM"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={13} strokeWidth={2.5} aria-hidden="true" />
                  GitHub
                </a>
              </Button>

              <Button asChild className={profileActionButtonClass}>
                <a
                  href="https://www.linkedin.com/in/ricardo-nava-mayoral/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={13} strokeWidth={2.5} aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>

              <Button asChild className={profileActionButtonClass}>
                <a
                  href="/api/cv"
                  download="CV-Ricardo_Nava_Mayoral.pdf"
                  aria-label="Descargar CV"
                >
                  <Download size={13} strokeWidth={2.5} aria-hidden="true" />
                  <span className="lg:hidden">CV</span>
                  <span className="hidden lg:inline">Descargar CV</span>
                </a>
              </Button>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="blueprint-mask-x pointer-events-none absolute bottom-0 left-1/2 z-20 h-[2px] w-screen -translate-x-1/2 translate-y-1/2 text-foreground opacity-[0.18]"
          />
        </section>
      </header>
    </main>
  );
}
