import Image from "next/image";
import { Download, Github, Linkedin, MapPin, Star } from "lucide-react";

import linkedInBanner from "@/assets/images/bannerL.jpg";
import linkedInProfile from "@/assets/images/profileL.jpg";
import profilePicture from "@/assets/images/profilePicture.jpeg";
import { Blueprint } from "@/components/blueprint";
import { ContactDrawer } from "@/components/contact-drawer";
import { ThemeBanner } from "@/components/theme-banner";
import { Button } from "@/components/ui/button";

const profileSummary = [
  [
    { text: "Especialista", highlight: true },
    {
      text: " en el desarrollo de sistemas empresariales, plataformas administrativas y aplicaciones web.",
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
  "h-8 w-full min-w-0 gap-1.5 border-[#52525c] px-2 text-[10px] font-bold leading-none text-[#52525c] hover:border-[#52525c] hover:bg-[#52525c]/10 hover:text-[#18181b] dark:border-[#d4d4d8] dark:text-[#d4d4d8] dark:hover:border-[#fff] dark:hover:bg-[#d4d4d8]/10 dark:hover:text-[#fff] md:h-9 md:px-2.5 md:text-[11px] lg:w-auto lg:gap-2 lg:px-3 [&_svg]:shrink-0 [&_span]:leading-none";

const profileContactButtonClass =
  "h-8 w-full min-w-0 gap-1.5 border-[#000] bg-[#000] px-2 text-[10px] font-bold leading-none text-[#d4d4d8] hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] dark:border-[#fff] dark:bg-[#fff] dark:text-[#52525c] dark:hover:border-[#d4d4d8] dark:hover:bg-[#d4d4d8] dark:hover:text-[#000] md:h-9 md:px-2.5 md:text-[11px] lg:w-auto lg:gap-2 lg:px-3 [&_svg]:shrink-0";

function GitHubPreviewCard() {
  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-full z-50 hidden w-[262px] origin-left -translate-y-1/2 group-hover/github-preview:pointer-events-auto group-focus-within/github-preview:pointer-events-auto lg:block"
    >
      <div className="profile-preview-sweep relative origin-left opacity-0 transition-[clip-path,opacity] delay-0 duration-300 ease-out [clip-path:polygon(0_50%,0_50%,0_50%,0_50%)] group-hover/github-preview:delay-300 group-hover/github-preview:opacity-100 group-hover/github-preview:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] group-focus-within/github-preview:delay-300 group-focus-within/github-preview:opacity-100 group-focus-within/github-preview:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
        <span className="absolute top-1/2 left-3 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l border-[#e4e4e7] bg-[#fff] dark:border-[#27272a] dark:bg-[#09090b]" />

        <div className="ml-3 rounded-lg border border-[#e4e4e7] bg-[#fff] px-4 py-4 text-left dark:border-[#27272a] dark:bg-[#09090b]">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#e4e4e7] bg-[#f4f4f5] dark:border-[#27272a] dark:bg-[#18181b]">
              <Image
                src={profilePicture}
                alt=""
                sizes="48px"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5]">
                Ricardo Nava Mayoral
              </p>
              <p className="mt-1 text-xs font-medium leading-none text-[#71717a] dark:text-[#71717a]">
                Ricardo-NM
              </p>
            </div>
          </div>

          <p className="mt-4 text-[12px] font-normal leading-none text-[#3f3f46] dark:text-[#d4d4d8]">
            Full Stack Developer
          </p>

          <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#a1a1aa] dark:text-[#71717a]">
            <MapPin size={14} strokeWidth={2} aria-hidden="true" />
            <span>Hidalgo, MX (UTC -06:00)</span>
          </div>

          <div className="my-4 h-px bg-[#e4e4e7] dark:bg-[#27272a]" />

          <div className="flex items-center justify-between gap-3 text-[13px] leading-none text-[#71717a] dark:text-[#71717a]">
            <p>
              <strong className="font-bold text-[#18181b] dark:text-[#f4f4f5]">
                13
              </strong>{" "}
              Repositorios
            </p>

            <span
              className="inline-flex items-center gap-1 rounded-full border-1 border-[#826ef8] px-1.5 py-0.5 text-[11px] font-bold leading-none text-[#826ef8]"
              style={{ borderColor: "#826ef8" }}
            >
              <Star
                size={12}
                strokeWidth={2}
                aria-hidden="true"
                className="text-[#52525c] dark:text-[#d4d4d8]"
              />
              PRO
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function LinkedInPreviewCard() {
  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-full z-50 hidden w-[262px] origin-left -translate-y-1/2 group-hover/linkedin-preview:pointer-events-auto group-focus-within/linkedin-preview:pointer-events-auto lg:block"
    >
      <div className="profile-preview-sweep relative origin-left opacity-0 transition-[clip-path,opacity] delay-0 duration-300 ease-out [clip-path:polygon(0_50%,0_50%,0_50%,0_50%)] group-hover/linkedin-preview:delay-300 group-hover/linkedin-preview:opacity-100 group-hover/linkedin-preview:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] group-focus-within/linkedin-preview:delay-300 group-focus-within/linkedin-preview:opacity-100 group-focus-within/linkedin-preview:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
        <span className="absolute top-1/2 left-3 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-l border-[#e4e4e7] bg-[#fff] dark:border-[#27272a] dark:bg-[#09090b]" />

        <div className="ml-3 overflow-hidden rounded-lg border border-[#e4e4e7] bg-[#fff] text-left dark:border-[#27272a] dark:bg-[#09090b] dark:shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
          <div className="relative h-16">
            <Image
              src={linkedInBanner}
              alt=""
              sizes="262px"
              className="h-full w-full object-cover"
            />

            <div className="absolute left-4 -bottom-7 h-14 w-14 overflow-hidden rounded-full border-2 border-[#fff] bg-[#f4f4f5] dark:border-[#09090b] dark:bg-[#18181b]">
              <Image
                src={linkedInProfile}
                alt=""
                sizes="56px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="px-4 pt-9 pb-4">
            <p className="truncate text-sm font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5]">
              Ricardo Nava Mayoral
            </p>

            <p className="mt-3 text-[12px] font-normal leading-none text-[#3f3f46] dark:text-[#d4d4d8]">
              Desarrollador Full Stack
            </p>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#a1a1aa] dark:text-[#71717a]">
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              <span>Tizayuca, Hidalgo, México</span>
            </div>

            <div className="my-4 h-px bg-[#e4e4e7] dark:bg-[#27272a]" />

            <div className="flex justify-start text-[13px] leading-none text-[#71717a] dark:text-[#71717a]">
              <p>
                <strong className="font-bold text-[#18181b] dark:text-[#f4f4f5]">
                  3
                </strong>{" "}
                Seguidores
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

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
                <ContactDrawer className={profileContactButtonClass} />
              </div>
            </div>

            <div className="col-span-full grid grid-cols-4 items-center gap-1.5 md:gap-2 lg:hidden">
              <ContactDrawer className={profileContactButtonClass} />

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
              <div className="group/github-preview relative">
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

                <GitHubPreviewCard />
              </div>

              <div className="group/linkedin-preview relative">
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

                <LinkedInPreviewCard />
              </div>

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
