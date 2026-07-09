"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  FileUser,
  Github,
  Linkedin,
  MapPin,
  Star,
} from "lucide-react";

import linkedInBanner from "@/assets/images/bannerL.png";
import experienceOne from "@/assets/images/experienceOne.png";
import experienceSecond from "@/assets/images/experienceSecond.png";
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

const experiences = [
  {
    id: "kpuga",
    company: "KPUGA | Consultoria en comercio exterior",
    role: "Desarrollador Full Stack",
    date: "Enero 2026 - Junio 2026",
    mode: "Hibrido",
    image: experienceSecond,
    stats: [
      { value: "+15", label: "USUARIOS" },
      { value: "En producción", label: "VPS LINUX" },
      { value: "Centralización", label: "DE LA INFORMACIÓN" },
      { value: "ERP", label: "INTERNO" },
    ],
    bullets: [
      "Diseñé y desarrollé una plataforma empresarial para centralizar la gestión operativa, documental y administrativa de procesos relacionados con comercio exterior.",
      "Implementé arquitectura Full Stack utilizando Vite, React, Node.js, JavaScript, Tailwind CSS y MySQL.",
      "Desarrollé APIs REST seguras mediante JWT y control de acceso basado en roles.",
      "Incorporé funcionalidades en tiempo real mediante Socket.io para mejorar la comunicación interna y el seguimiento de operaciones.",
      "Administré la infraestructura productiva sobre VPS Linux utilizando NGINX, PM2, HTTPS y políticas de seguridad orientadas a disponibilidad y protección de la información.",
      "Participé directamente en el análisis de requerimientos, diseño técnico e implementación de funcionalidades alineadas con necesidades operativas del cliente.",
    ],
    badges: [
      "FrontEnd",
      "BackEnd",
      "APIs REST",
      "Comercio exterior",
      "Arquitectura cloud",
      "Tiempo real",
      "Desarrollo incremental",
    ],
  },

  {
    id: "ardabytec",
    company: "ArdabyTec",
    role: "Desarrollador Full Stack",
    date: "Mayo 2025 - Diciembre 2025",
    mode: "Presencial",
    image: experienceOne,
    stats: [
      { value: "4", label: "PROYECTOS" },
      { value: "Colaboración", label: "CON GIT" },
      { value: "Despliegue", label: "DE SISTEMAS" },
      { value: "Digitalización", label: "DE PROCESOS" },
    ],
    bullets: [
      "Desarrollo y mantenimiento de aplicaciones web empresariales utilizando tecnologías Full Stack.",
      "Diseño e implementación de APIs para integración entre sistemas internos y servicios externos.",
      "Administración de bases de datos relacionales y no relacionales para almacenamiento y consulta de información operativa.",
      "Participación en levantamiento de requerimientos, análisis funcional y planificación bajo metodología SCRUM.",
      "Despliegue y soporte de aplicaciones en entornos Windows Server mediante IIS.",
      "Implementación de soluciones digitales que permitieron sustituir procesos manuales y mejorar la eficiencia operativa.",
    ],
    badges: [
      "FrontEnd",
      "BackEnd",
      "Consumo de APIs",
      "Soporte técnico",
      "Optimización de UI/UX",
      "Documentación técnica",
    ],
  },
];

export function getNextExperienceTransition(
  activeId: string | null,
  requestedId: string,
) {
  if (activeId === requestedId) {
    return { activeId: null, pendingId: null };
  }

  if (activeId) {
    return { activeId: null, pendingId: requestedId };
  }

  return { activeId: requestedId, pendingId: null };
}

function ViewportGuideLine({
  position,
  scope,
}: {
  position: "top" | "bottom";
  scope: "experience" | "experience-detail" | "profile";
}) {
  const verticalPosition = position === "top" ? "top-0" : "bottom-0";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 z-50 h-0 w-screen -translate-x-1/2 ${verticalPosition}`}
    >
      <div
        className={`${scope}-guide-line blueprint-mask-x absolute left-0 top-0 z-20 h-[2px] w-full -translate-y-1/2 text-foreground opacity-[0.18]`}
      />
      <span
        className={`${scope}-guide-dot blueprint-dot absolute top-0 -translate-x-1/2 -translate-y-1/2 left-[var(--content-left)]`}
      />
      <span
        className={`${scope}-guide-dot blueprint-dot absolute top-0 -translate-x-1/2 -translate-y-1/2 left-[var(--content-right)]`}
      />
    </div>
  );
}

function ContentGuideLine({
  position,
  className = "",
  centerDot = false,
  lineClassName = "experience-detail-local-guide-line",
  dotClassName = "experience-detail-guide-dot",
}: {
  position: "top" | "middle" | "bottom";
  className?: string;
  centerDot?: boolean;
  lineClassName?: string;
  dotClassName?: string;
}) {
  const verticalPosition =
    position === "top"
      ? "top-0"
      : position === "middle"
        ? "top-1/2"
        : "bottom-0";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 z-50 h-0 w-full ${verticalPosition} ${className}`}
    >
      <div
        className={`${lineClassName} blueprint-mask-x absolute left-0 top-0 z-20 h-[2px] w-full -translate-y-1/2 text-foreground opacity-[0.18]`}
      />
      <span
        className={`${dotClassName} blueprint-dot absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2`}
      />
      {centerDot ? (
        <span
          className={`${dotClassName} blueprint-dot absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2`}
        />
      ) : null}
      <span
        className={`${dotClassName} blueprint-dot absolute right-0 top-0 translate-x-1/2 -translate-y-1/2`}
      />
    </div>
  );
}

function ItemGuideLine({ position }: { position: "top" | "bottom" }) {
  const verticalPosition = position === "top" ? "top-0" : "bottom-0";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -left-3 z-50 h-0 w-[calc(100%+1.5rem)] ${verticalPosition}`}
    >
      <div className="experience-item-guide-line blueprint-mask-x absolute left-0 top-0 z-20 h-[2px] w-full -translate-y-1/2 text-foreground opacity-[0.18]" />
      <span className="experience-item-guide-dot blueprint-dot absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      <span className="experience-item-guide-dot blueprint-dot absolute right-0 top-0 translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

function GitHubPreviewCard() {
  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-full z-[90] hidden w-[262px] origin-left -translate-y-1/2 group-hover/github-preview:pointer-events-auto group-focus-within/github-preview:pointer-events-auto lg:block"
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
      className="pointer-events-none absolute top-1/2 left-full z-[90] hidden w-[262px] origin-left -translate-y-1/2 group-hover/linkedin-preview:pointer-events-auto group-focus-within/linkedin-preview:pointer-events-auto lg:block"
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

function ExperienceSection() {
  const [openExperienceId, setOpenExperienceId] = useState<string | null>(null);
  const [pendingExperienceId, setPendingExperienceId] = useState<string | null>(
    null,
  );

  function handleExperienceToggle(experienceId: string) {
    if (pendingExperienceId) {
      setPendingExperienceId(
        pendingExperienceId === experienceId ? null : experienceId,
      );
      return;
    }

    const nextTransition = getNextExperienceTransition(
      openExperienceId,
      experienceId,
    );

    setOpenExperienceId(nextTransition.activeId);
    setPendingExperienceId(nextTransition.pendingId);
  }

  function handleDetailsExitComplete() {
    if (!pendingExperienceId) {
      return;
    }

    setOpenExperienceId(pendingExperienceId);
    setPendingExperienceId(null);
  }

  return (
    <section
      aria-labelledby="experience-title"
      className="relative bg-background px-3"
    >
      <div className="experience-section-title-row relative flex h-12 items-center">
        <ViewportGuideLine position="top" scope="experience" />

        <h2
          id="experience-title"
          className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]"
        >
          Experiencia
        </h2>

        <ViewportGuideLine position="bottom" scope="experience" />
      </div>

      <div>
        {experiences.map((experience) => {
          const isOpen = openExperienceId === experience.id;
          const detailsId = `${experience.id}-details`;

          return (
            <article
              key={experience.company}
              className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 gap-y-2 py-3 sm:gap-y-0 lg:grid-cols-[40px_minmax(0,1fr)_max-content] lg:items-start lg:gap-x-4"
            >
              <div className="row-span-2 grid h-10 w-10 place-items-center rounded-lg border border-[#e4e4e7] bg-[#fff] p-1 shadow-[0_1px_4px_rgba(24,24,27,0.1)] dark:border-[#27272a] dark:shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                <Image
                  src={experience.image}
                  alt=""
                  sizes="40px"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5] sm:text-[15px]">
                  {experience.company}
                </h3>
                <p className="mt-0.5 text-xs font-medium leading-tight text-[#52525c] dark:text-[#a1a1aa] sm:mt-1 sm:text-sm">
                  {experience.role}
                </p>
              </div>

              <div className="col-start-2 flex min-w-0 items-start justify-between gap-3 lg:col-start-3 lg:row-start-1 lg:min-w-40 lg:justify-end">
                <div className="text-left lg:text-right">
                  <p className="text-xs font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5] sm:text-[13px]">
                    {experience.date}
                  </p>
                  <p className="mt-1 text-xs font-medium leading-none text-[#71717a] dark:text-[#a1a1aa] sm:mt-2">
                    {experience.mode}
                  </p>
                </div>

                <button
                  type="button"
                  aria-controls={detailsId}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? "Contraer" : "Expandir"} experiencia en ${experience.company}`}
                  onClick={() => handleExperienceToggle(experience.id)}
                  className="grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded-sm text-[#52525c] transition-colors duration-200 hover:bg-transparent hover:text-[#18181b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18181b]/25 dark:text-[#d4d4d8] dark:hover:text-[#fff] dark:focus-visible:ring-[#fff]/25"
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="grid place-items-center"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <ChevronDown
                      size={13}
                      strokeWidth={2.1}
                      aria-hidden="true"
                    />
                  </motion.span>
                </button>
              </div>

              <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={handleDetailsExitComplete}
              >
                {isOpen ? (
                  <motion.div
                    key={detailsId}
                    id={detailsId}
                    className="col-span-full -mx-3 overflow-visible px-3"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.22, ease: "easeOut" },
                    }}
                  >
                    <div className="experience-detail-stat-row relative -mx-3 mt-3 px-3">
                      <ContentGuideLine position="top" />
                      <ContentGuideLine
                        position="middle"
                        className="md:hidden"
                        centerDot
                        lineClassName="stats-row-guide-line"
                        dotClassName="stats-row-guide-dot"
                      />

                      <div className="grid auto-rows-fr grid-cols-2 md:grid-cols-4">
                        {experience.stats.map((stat, statIndex) => (
                          <div
                            key={`${experience.id}-${stat.label}`}
                            className="relative flex min-h-14 flex-col items-center justify-center px-3 py-3 text-center md:px-4"
                          >
                            {statIndex % 2 === 0 ? (
                              <span
                                aria-hidden="true"
                                className="stats-column-guide blueprint-mask-y pointer-events-none absolute top-0 right-0 h-full w-[2px] translate-x-1/2 text-foreground opacity-[0.18] md:hidden"
                              />
                            ) : null}
                            {statIndex % 2 === 0 ? (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="stats-column-guide-dot blueprint-dot pointer-events-none absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 md:hidden"
                                />
                                <span
                                  aria-hidden="true"
                                  className="stats-column-guide-dot blueprint-dot pointer-events-none absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 md:hidden"
                                />
                              </>
                            ) : null}
                            {statIndex < experience.stats.length - 1 ? (
                              <span
                                aria-hidden="true"
                                className="stats-column-guide blueprint-mask-y pointer-events-none absolute top-0 right-0 hidden h-full w-[2px] translate-x-1/2 text-foreground opacity-[0.18] md:block"
                              />
                            ) : null}
                            {statIndex < experience.stats.length - 1 ? (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="stats-column-guide-dot blueprint-dot pointer-events-none absolute top-0 right-0 hidden translate-x-1/2 -translate-y-1/2 md:block"
                                />
                                <span
                                  aria-hidden="true"
                                  className="stats-column-guide-dot blueprint-dot pointer-events-none absolute right-0 bottom-0 hidden translate-x-1/2 translate-y-1/2 md:block"
                                />
                              </>
                            ) : null}
                            <p className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]">
                              {stat.value}
                            </p>
                            <p className="mt-2 text-[10px] font-bold uppercase leading-none text-[#71717a] dark:text-[#71717a]">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <ContentGuideLine position="bottom" />
                    </div>

                    <div className="experience-detail-bullet-row relative -mx-3 px-3">
                      <ul className="list-disc space-y-2 py-4 pl-4 text-justify text-[13px] font-medium leading-5 text-[#52525c] dark:text-[#a1a1aa]">
                        {experience.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>

                      <ContentGuideLine position="bottom" />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-3 pb-1">
                      {experience.badges.map((badge) => (
                        <span
                          key={`${experience.id}-${badge}`}
                          className="rounded border border-[#e4e4e7] bg-[#f4f4f5] px-2 py-1 text-[11px] font-medium leading-none text-[#52525c] dark:border-[#27272a] dark:bg-[#18181b] dark:text-[#d4d4d8]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <ItemGuideLine position="bottom" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function HomeSurface() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <Blueprint />

      <header className="content-column relative">
        <ThemeBanner />

        <div className="profile-section relative flex flex-col items-center bg-background px-3 pt-0 pb-3 text-center">
          <div className="relative z-30 -mt-3 h-[clamp(4.75rem,18vw,5.75rem)] w-[clamp(4.75rem,18vw,5.75rem)] shrink-0 rounded-lg bg-border p-px">
            <Image
              src={profilePicture}
              alt="Ricardo Nava Mayoral"
              priority
              sizes="(min-width: 768px) 8vw, 22vw"
              className="h-full w-full rounded-md object-cover"
            />
          </div>

          <div className="min-w-0">
            <h1 className="my-3 truncate text-sm font-semibold uppercase leading-none">
              Ricardo Nava Mayoral
            </h1>
            <p className="truncate text-xs font-mono font-normal leading-none">
              Desarrollador Full Stack
            </p>
          </div>

          <ViewportGuideLine position="bottom" scope="profile" />
        </div>

        <section
          aria-labelledby="profile-summary-title"
          className="relative bg-background px-3 py-3"
        >
          <h2 id="profile-summary-title" className="sr-only">
            Perfil profesional
          </h2>

          <div className="relative z-[60] grid gap-y-5 lg:grid-cols-[minmax(0,1fr)_max-content] lg:items-start lg:gap-x-0">
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
                  aria-label="Curriculum"
                >
                  <FileUser size={13} strokeWidth={2.5} aria-hidden="true" />
                  <span className="lg:hidden">CV</span>
                  <span className="hidden lg:inline">Curriculum</span>
                </a>
              </Button>
            </div>

            <div className="hidden flex-col items-end gap-2 lg:flex lg:min-w-28">
              <div className="group/github-preview relative z-[80]">
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

              <div className="group/linkedin-preview relative z-[80]">
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
                  aria-label="Curriculum"
                >
                  <FileUser size={13} strokeWidth={2.5} aria-hidden="true" />
                  <span className="lg:hidden">CV</span>
                  <span className="hidden lg:inline">Curriculum</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        <ExperienceSection />
      </header>
    </main>
  );
}
