"use client";

import {
  useEffect,
  useRef,
  useState,
  Fragment,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import Image from "next/image";
import {
  FileUser,
  Github,
  Linkedin,
  MapPin,
  Star,
  ArrowUpRight,
} from "lucide-react";

import linkedInBanner from "@/assets/images/bannerL.png";
import experienceOne from "@/assets/images/experienceOne.png";
import experienceSecond from "@/assets/images/experienceSecond.png";
import linkedInProfile from "@/assets/images/profileL.jpg";
import profilePicture from "@/assets/images/profilePicture.jpeg";
import projectO from "@/assets/images/projectO.svg";
import projectS from "@/assets/images/projectS.svg";
import projectT from "@/assets/images/projectT.svg";
import { Blueprint } from "@/components/blueprint";
import { AnimatedTabs } from "@/components/animated-tabs/Component";
import { ContactDrawer } from "@/components/contact-drawer";
import { PortfolioExpandableTabs } from "@/components/expandable-tabs/Usage";
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
  "h-9 w-full min-w-0 gap-1.5 border-[#d4d4d8] bg-transparent px-2.5 text-[11px] font-semibold leading-none text-[#52525c] transition-colors duration-300 ease-in-out hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] dark:border-[#3f3f46] dark:text-[#a1a1aa] dark:hover:border-[#fff] dark:hover:bg-[#fff] dark:hover:text-[#18181b] min-[1440px]:w-auto min-[1440px]:gap-2 min-[1440px]:px-3 [&_svg]:shrink-0 [&_span]:leading-none";

const profileContactButtonClass =
  "h-9 w-full min-w-0 gap-1.5 border-[#000] bg-[#000] px-2.5 text-[11px] font-semibold leading-none text-[#d4d4d8] hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] dark:border-[#fff] dark:bg-[#fff] dark:text-[#52525c] dark:hover:border-[#d4d4d8] dark:hover:bg-[#d4d4d8] dark:hover:text-[#000] min-[1440px]:w-auto min-[1440px]:gap-2 min-[1440px]:px-3 [&_svg]:shrink-0";

const experiences = [
  {
    id: "kpuga",
    company: "KPUGA",
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

export function getNextAutoSkillIndex(
  currentIndex: number | null,
  totalItems: number,
  random = Math.random,
) {
  if (totalItems <= 0) {
    return null;
  }

  if (totalItems === 1) {
    return 0;
  }

  const nextIndex = Math.floor(random() * totalItems);

  return nextIndex === currentIndex ? (nextIndex + 1) % totalItems : nextIndex;
}

function ViewportGuideLine({
  position,
  scope,
}: {
  position: "top" | "bottom";
  scope:
    | "experience"
    | "experience-detail"
    | "profile"
    | "projects"
    | "skills"
    | "github-activity";
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

const experienceContentInitial = {
  opacity: 0,
  scale: 0.96,
  x: -10,
  filter: "blur(8px)",
};

const experienceContentAnimate = {
  opacity: 1,
  scale: 1,
  x: 0,
  filter: "blur(0px)",
};

const experienceContentTransition = {
  duration: 0.32,
  ease: "circInOut",
  type: "spring",
} satisfies MotionProps["transition"];

const experienceGuideFadeTransition = {
  duration: 0.14,
  ease: "easeOut",
} satisfies MotionProps["transition"];

function ExperienceMotionBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`experience-content-motion ${className}`}
      initial={experienceContentInitial}
      animate={experienceContentAnimate}
      transition={experienceContentTransition}
    >
      {children}
    </motion.div>
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
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 z-50 h-0 w-full ${verticalPosition} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={experienceGuideFadeTransition}
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
    </motion.div>
  );
}

function GitHubPreviewCard() {
  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-full z-[90] hidden w-[262px] origin-left -translate-y-1/2 group-hover/github-preview:pointer-events-auto group-focus-within/github-preview:pointer-events-auto min-[1440px]:block"
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
      className="pointer-events-none absolute top-1/2 left-full z-[90] hidden w-[262px] origin-left -translate-y-1/2 group-hover/linkedin-preview:pointer-events-auto group-focus-within/linkedin-preview:pointer-events-auto min-[1440px]:block"
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

function ExperienceTabLabel({
  experience,
}: {
  experience: (typeof experiences)[number];
}) {
  return (
    <span className="flex min-w-0 items-center justify-center gap-2">
      <span className="experience-tab-logo grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[#e4e4e7] bg-[#fff] p-0.5 shadow-[0_1px_4px_rgba(24,24,27,0.1)] dark:border-[#27272a] dark:shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
        <Image
          src={experience.image}
          alt=""
          sizes="24px"
          className="h-full w-full object-contain"
        />
      </span>
      <span className="truncate">{experience.company}</span>
    </span>
  );
}

function ExperienceDetails({
  experience,
}: {
  experience: (typeof experiences)[number];
}) {
  return (
    <article className="experience-tab-panel relative">
      <div className="experience-detail-heading-grid grid grid-cols-[minmax(0,1fr)_max-content] gap-x-4 gap-y-1 pt-3 pb-3">
        <ExperienceMotionBlock className="flex min-w-0 items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#e4e4e7] bg-[#fff] shrink-0 p-1 shadow-[0_1px_4px_rgba(24,24,27,0.1)] dark:border-[#27272a] dark:shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
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
        </ExperienceMotionBlock>

        <ExperienceMotionBlock className="min-w-0 text-right">
          <p className="text-xs font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5] sm:text-[13px]">
            {experience.date}
          </p>
          <p className="mt-1 text-xs font-medium leading-none text-[#71717a] dark:text-[#a1a1aa] sm:mt-2">
            {experience.mode}
          </p>
        </ExperienceMotionBlock>
      </div>

      <div className="experience-detail-stat-row relative -mx-3 px-3">
        <ContentGuideLine position="top" />
        <ContentGuideLine
          position="middle"
          className="min-[1200px]:hidden"
          centerDot
          lineClassName="stats-row-guide-line"
          dotClassName="stats-row-guide-dot"
        />

        <div className="grid auto-rows-fr grid-cols-2 min-[1200px]:grid-cols-4">
          {experience.stats.map((stat, statIndex) => (
            <div
              key={`${experience.id}-${stat.label}`}
              className="relative flex min-h-14 flex-col items-center justify-center px-3 py-3 text-center min-[1200px]:px-4"
            >
              {statIndex % 2 === 0 ? (
                <span
                  aria-hidden="true"
                  className="stats-column-guide blueprint-mask-y pointer-events-none absolute top-0 right-0 h-full w-[2px] translate-x-1/2 text-foreground opacity-[0.18] min-[1200px]:hidden"
                />
              ) : null}
              {statIndex % 2 === 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="stats-column-guide-dot blueprint-dot pointer-events-none absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 min-[1200px]:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="stats-column-guide-dot blueprint-dot pointer-events-none absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 min-[1200px]:hidden"
                  />
                </>
              ) : null}
              {statIndex < experience.stats.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="stats-column-guide blueprint-mask-y pointer-events-none absolute top-0 right-0 hidden h-full w-[2px] translate-x-1/2 text-foreground opacity-[0.18] min-[1200px]:block"
                />
              ) : null}
              {statIndex < experience.stats.length - 1 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="stats-column-guide-dot blueprint-dot pointer-events-none absolute top-0 right-0 hidden translate-x-1/2 -translate-y-1/2 min-[1200px]:block"
                  />
                  <span
                    aria-hidden="true"
                    className="stats-column-guide-dot blueprint-dot pointer-events-none absolute right-0 bottom-0 hidden translate-x-1/2 translate-y-1/2 min-[1200px]:block"
                  />
                </>
              ) : null}
              <ExperienceMotionBlock>
                <p className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase leading-none text-[#71717a] dark:text-[#71717a]">
                  {stat.label}
                </p>
              </ExperienceMotionBlock>
            </div>
          ))}
        </div>

        <ContentGuideLine position="bottom" />
      </div>

      <div className="experience-detail-bullet-row relative -mx-3 px-3">
        <ExperienceMotionBlock>
          <ul className="list-disc space-y-2 py-4 pl-4 text-justify text-[13px] font-medium leading-5 text-[#52525c] dark:text-[#a1a1aa]">
            {experience.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </ExperienceMotionBlock>

        <ContentGuideLine position="bottom" />
      </div>

      <ExperienceMotionBlock className="flex flex-wrap gap-2 pt-3 pb-1">
        {experience.badges.map((badge) => (
          <span
            key={`${experience.id}-${badge}`}
            className="rounded border border-[#e4e4e7] bg-[#f4f4f5] px-2 py-1 text-[11px] font-medium leading-none text-[#52525c] dark:border-[#27272a] dark:bg-[#18181b] dark:text-[#d4d4d8]"
          >
            {badge}
          </span>
        ))}
      </ExperienceMotionBlock>
    </article>
  );
}

const experienceTabs = experiences.map((experience) => ({
  id: experience.id,
  label: <ExperienceTabLabel experience={experience} />,
  content: <ExperienceDetails experience={experience} />,
}));

function ExperienceSection() {
  return (
    <section
      id="experiencia"
      aria-labelledby="experience-title"
      className="relative scroll-mt-24 bg-background px-3"
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

      <AnimatedTabs
        tabs={experienceTabs}
        defaultTab={experiences[0]?.id}
        panelAnimation="fade"
        className="py-3"
      />
    </section>
  );
}

const projectsData = [
  {
    id: "gestionO",
    name: "Gestión operativa – Comercio exterior",
    description:
      "Sistema privado orientado a centralizar procesos operativos, administrativos y documentales relacionados con gestión logística, seguimiento de referencias, control de documentos, facturación, reportes, comunicación interna y actividades de recursos humanos.",
    image: projectO,
    link: "https://ricardo-nm.github.io/K-PUGA-Docs/",
    tech: [
      { name: "React", iconSlug: "react" },
      { name: "Tailwind CSS", iconSlug: "tailwindcss" },
      { name: "Node.js", iconSlug: "nodedotjs" },
      { name: "MySQL", iconSlug: "mysql" },
      { name: "VPS Linux", iconSlug: "linux" },
      { name: "NGINX", iconSlug: "nginx" },
      { name: "PM2", iconSlug: "pm2" },
    ],
  },
  {
    id: "gestionB",
    name: "Totis® | Gestión de bienes",
    description:
      "Sistema web orientado a la gestión y control operativo de activos fijos contables. Su propósito es centralizar información, facilitar solicitudes internas, mantener trazabilidad de movimientos y apoyar la generación de documentos relacionados con asignaciones, bajas, devoluciones y traspasos.",
    image: projectS,
    link: "https://ricardo-nm.github.io/totis-gdb-docs/",
    tech: [
      { name: "C#", iconSlug: "sharp" },
      { name: ".NET", iconSlug: "dotnet" },
      { name: "JavaScript", iconSlug: "javascript" },
      { name: "CSS", iconSlug: "css" },
      { name: "Bootstrap", iconSlug: "bootstrap" },
      { name: "MySQL", iconSlug: "mysql" },
      { name: "IIS", iconSlug: "googlecloudstorage" },
      { name: "Active Directory", iconSlug: "springsecurity" },
    ],
  },
  {
    id: "saldoC",
    name: "Saldo Claro",
    description:
      "Aplicación móvil para centralizar deudas, pagos próximos y pagos realizados. El proyecto sigue en desarrollo y está enfocado en una primera versión funcional para uso personal.",
    image: projectT,
    link: "https://github.com/Ricardo-NM/SaldoClaro",
    tech: [
      { name: "React Native", iconSlug: "react" },
      { name: "Expo", iconSlug: "expo" },
      { name: "TypeScript", iconSlug: "typescript" },
      { name: "NestJS", iconSlug: "nestjs" },
      { name: "Prisma", iconSlug: "prisma" },
      { name: "PostgreSQL", iconSlug: "postgresql" },
      { name: "Docker", iconSlug: "docker" },
      { name: "NGINX", iconSlug: "nginx" },
    ],
  },
];

const skillsData = [
  { name: "JavaScript", iconSlug: "javascript" },
  { name: "TypeScript", iconSlug: "typescript" },
  { name: "HTML5", iconSlug: "html5" },
  { name: "CSS", iconSlug: "css" },
  { name: "Tailwind CSS", iconSlug: "tailwindcss" },
  { name: "React", iconSlug: "react" },
  { name: "Expo", iconSlug: "expo" },
  { name: "Prisma ORM", iconSlug: "prisma" },
  { name: "Flutter", iconSlug: "flutter" },
  { name: "C#", iconSlug: "sharp" },
  { name: ".NET", iconSlug: "dotnet" },
  { name: "Node.js", iconSlug: "nodedotjs" },
  { name: "NestJS", iconSlug: "nestjs" },
  { name: "Express.js", iconSlug: "express" },
  { name: "MongoDB", iconSlug: "mongodb" },
  { name: "MySQL", iconSlug: "mysql" },
  { name: "PostgreSQL", iconSlug: "postgresql" },
  { name: "Redis", iconSlug: "redis" },
  { name: "Git", iconSlug: "git" },
  { name: "GitHub", iconSlug: "github" },
  { name: "VPS Linux", iconSlug: "linux" },
  { name: "Nginx", iconSlug: "nginx" },
  { name: "PM2", iconSlug: "pm2" },
  { name: "IIS", iconSlug: "googlecloudstorage" },
  { name: "Docker", iconSlug: "docker" },
  { name: "Figma", iconSlug: "figma" },
];

type GitHubContributionDay = {
  contributionCount: number;
  contributionLevel: string;
  date: string;
  weekday: number;
};

type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
  firstDay: string;
};

type GitHubContributionMonth = {
  firstDay: string;
  name: string;
  totalWeeks: number;
  year: number;
};

type GitHubActivity = {
  months: GitHubContributionMonth[];
  totalContributions: number;
  weeks: GitHubContributionWeek[];
};

const githubContributionLevelClassNames = [
  "bg-[#f4f4f5] dark:bg-[#18181b]",
  "bg-[#d4d4d8] dark:bg-[#3f3f46]",
  "bg-[#a1a1aa] dark:bg-[#71717a]",
  "bg-[#52525c] dark:bg-[#d4d4d8]",
  "bg-[#18181b] dark:bg-[#f4f4f5]",
];

const githubContributionLevelMap: Record<string, number> = {
  FIRST_QUARTILE: 1,
  FOURTH_QUARTILE: 4,
  NONE: 0,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
};

const githubMonthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const githubActivityFallbackStartDate = Date.UTC(2025, 6, 6);
const millisecondsPerDay = 24 * 60 * 60 * 1000;

const githubActivityFallbackWeeks = Array.from({ length: 53 }, (_, index) => {
  const firstDay = new Date(
    githubActivityFallbackStartDate + index * 7 * millisecondsPerDay,
  );

  return {
    contributionDays: Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(firstDay.getTime() + dayIndex * millisecondsPerDay);

      return {
        contributionCount: 0,
        contributionLevel: "NONE",
        date: date.toISOString().slice(0, 10),
        weekday: dayIndex,
      };
    }),
    firstDay: firstDay.toISOString().slice(0, 10),
  };
});

const githubActivityFallbackMonths = [
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
].map((name, index) => ({
  firstDay: "",
  name,
  totalWeeks: index % 2 === 0 ? 4 : 5,
  year: 2026,
}));

function getGitHubContributionLevelIndex(contributionLevel: string) {
  return githubContributionLevelMap[contributionLevel] ?? 0;
}

function getGitHubWeekDate(week: GitHubContributionWeek) {
  const date =
    week.contributionDays.find((day) => day.date)?.date ?? week.firstDay;
  const timestamp = Date.parse(`${date}T00:00:00.000Z`);

  return Number.isNaN(timestamp) ? null : new Date(timestamp);
}

function getGitHubMonthLabels(
  weeks: GitHubContributionWeek[],
  fallbackMonths: GitHubContributionMonth[],
) {
  const labels: Array<GitHubContributionMonth & { monthKey: string }> = [];

  weeks.forEach((week) => {
    const weekDate = getGitHubWeekDate(week);

    if (!weekDate) {
      if (labels.length > 0) {
        labels[labels.length - 1].totalWeeks += 1;
      }

      return;
    }

    const month = weekDate.getUTCMonth();
    const year = weekDate.getUTCFullYear();
    const monthKey = `${year}-${month}`;
    const lastLabel = labels[labels.length - 1];

    if (lastLabel?.monthKey === monthKey) {
      lastLabel.totalWeeks += 1;
      return;
    }

    labels.push({
      firstDay: weekDate.toISOString().slice(0, 10),
      monthKey,
      name: githubMonthNames[month],
      totalWeeks: 1,
      year,
    });
  });

  return labels.length > 0 ? labels : fallbackMonths;
}

function isGitHubActivity(
  value: GitHubActivity | { error?: string },
): value is GitHubActivity {
  return (
    "months" in value &&
    "totalContributions" in value &&
    "weeks" in value &&
    Array.isArray(value.months) &&
    Array.isArray(value.weeks) &&
    typeof value.totalContributions === "number"
  );
}

const techIconColorByTheme = {
  light: {
    base: "71717a",
    hover: "18181b",
  },
  dark: {
    base: "a1a1aa",
    hover: "fff",
  },
} as const;

function getSimpleIconUrl(
  iconSlug: string,
  theme: keyof typeof techIconColorByTheme,
  state: keyof (typeof techIconColorByTheme)["light"],
) {
  return `https://cdn.simpleicons.org/${iconSlug}/${techIconColorByTheme[theme][state]}`;
}

function TechIcon({ iconSlug, name }: { iconSlug: string; name: string }) {
  const iconUrls = {
    lightBase: getSimpleIconUrl(iconSlug, "light", "base"),
    lightHover: getSimpleIconUrl(iconSlug, "light", "hover"),
    darkBase: getSimpleIconUrl(iconSlug, "dark", "base"),
    darkHover: getSimpleIconUrl(iconSlug, "dark", "hover"),
  };

  return (
    <span
      aria-hidden="true"
      className="relative block h-3.5 w-3.5 overflow-hidden"
    >
      <span
        className="tech-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-100 transition-opacity duration-300 group-hover/card:opacity-0 group-active/card:opacity-0 group-hover/tooltip:opacity-0 dark:opacity-0 dark:group-hover/card:opacity-100 dark:group-active/card:opacity-100 dark:group-hover/tooltip:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.lightBase})` }}
      />
      <span
        className="tech-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-300 group-hover/tooltip:opacity-100 group-hover/card:group-hover/tooltip:opacity-0 group-active/card:group-hover/tooltip:opacity-0 dark:opacity-0 dark:group-hover/tooltip:opacity-0 dark:group-hover/card:group-hover/tooltip:opacity-100 dark:group-active/card:group-hover/tooltip:opacity-100"
        style={{ backgroundImage: `url(${iconUrls.lightHover})` }}
      />
      <span
        className="tech-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 group-active/card:opacity-100 group-hover/tooltip:opacity-0 dark:opacity-100 dark:group-hover/card:opacity-0 dark:group-active/card:opacity-0 dark:group-hover/tooltip:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.darkBase})` }}
      />
      <span
        className="tech-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-300 group-hover/card:group-hover/tooltip:opacity-100 group-active/card:group-hover/tooltip:opacity-100 dark:group-hover/tooltip:opacity-100 dark:group-hover/card:group-hover/tooltip:opacity-0 dark:group-active/card:group-hover/tooltip:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.darkHover})` }}
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}

function ProjectsSection() {
  return (
    <section
      id="proyectos"
      aria-labelledby="projects-title"
      className="relative scroll-mt-24 bg-background px-3"
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
        <span
          aria-hidden="true"
          className="projects-guide-dot blueprint-dot pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 z-50 md:block"
        />
      </div>

      <div className="relative -mx-3">
        <span
          aria-hidden="true"
          className="blueprint-mask-y pointer-events-none absolute top-0 left-1/2 hidden h-full w-[2px] -translate-x-1/2 text-foreground opacity-[0.18] z-20 md:block"
        />
        <span
          aria-hidden="true"
          className="projects-skills-intersection-dot blueprint-dot pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 z-50 md:block"
        />

        <div className="grid grid-cols-1 md:grid-cols-2">
          {projectsData.map((project, index) => {
            const isMobileLast = index === projectsData.length - 1;
            const isDesktopRight = index % 2 === 1;
            const isDesktopLastRow =
              index >=
              projectsData.length - (projectsData.length % 2 === 0 ? 2 : 1);

            return (
              <Fragment key={project.id}>
                <div className="relative flex px-4 py-4 sm:px-6 sm:py-6">
                  <article className="group/card relative flex flex-col w-full rounded-xl border border-[#e4e4e7] bg-[#fff] p-4 transition-all duration-300 hover:border-[#27272a] hover:bg-[#18181b] active:border-[#27272a] active:bg-[#18181b] dark:border-[#27272a] dark:bg-[#18181b] dark:hover:border-[#e4e4e7] dark:hover:bg-[#fff] dark:active:border-[#e4e4e7] dark:active:bg-[#fff]">
                    <div className="relative mb-4 w-full overflow-hidden rounded-lg border border-[#e4e4e7] bg-[#f4f4f5]/50 transition-colors duration-300 group-hover/card:!border-transparent group-hover/card:bg-[#27272a]/30 group-active/card:!border-transparent group-active/card:bg-[#27272a]/30 dark:border-[#27272a] dark:bg-[#27272a]/30 dark:group-hover/card:!border-transparent dark:group-hover/card:bg-[#f4f4f5]/50 dark:group-active/card:!border-transparent dark:group-active/card:bg-[#f4f4f5]/50">
                      <div className="relative w-full aspect-[4/3] overflow-hidden border-[#e4e4e7] transition-colors duration-300 group-hover/card:!border-transparent group-active/card:!border-transparent dark:border-[#3f3f46] dark:group-hover/card:!border-transparent dark:group-active/card:!border-transparent">
                        <Image
                          src={project.image}
                          alt={project.name}
                          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/card:scale-[1.025] group-active/card:scale-[1.025]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-bold leading-tight text-[#18181b] transition-colors duration-300 group-hover/card:text-[#f4f4f5] group-active/card:text-[#f4f4f5] dark:text-[#f4f4f5] dark:group-hover/card:text-[#18181b] dark:group-active/card:text-[#18181b]">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-left text-[13px] font-medium leading-relaxed text-[#52525c] transition-colors duration-300 group-hover/card:text-[#a1a1aa] group-active/card:text-[#a1a1aa] dark:text-[#a1a1aa] dark:group-hover/card:text-[#52525c] dark:group-active/card:text-[#52525c]">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-end justify-between gap-3 pt-3 border-t border-[#e4e4e7] transition-colors duration-300 group-hover/card:border-[#27272a] group-active/card:border-[#27272a] dark:border-[#27272a] dark:group-hover/card:border-[#e4e4e7] dark:group-active/card:border-[#e4e4e7]">
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-2">
                        {project.tech.map((t) => (
                          <div
                            key={t.name}
                            className="group/tooltip relative flex items-center justify-center"
                          >
                            <TechIcon iconSlug={t.iconSlug} name={t.name} />

                            <span className=" pointer-events-none  absolute -top-6 left-1/2 z-10 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded bg-[#18181b] px-2 py-0.5 text-[10px] font-medium text-white transition-all duration-300 ease-out group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100 opacity-0 dark:bg-white dark:text-[#18181b]">
                              {t.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        className="group/link flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-semibold tracking-wider text-[#a1a1aa] transition-colors duration-300 hover:text-[#18181b] group-hover/card:text-[#71717a] group-hover/card:hover:text-[#fff] group-active/card:text-[#71717a] dark:text-[#71717a] dark:hover:text-[#fff] dark:group-hover/card:text-[#a1a1aa] dark:group-hover/card:hover:text-[#18181b] dark:group-active/card:text-[#a1a1aa]"
                      >
                        Ver proyecto
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                </div>

                {!isMobileLast && (
                  <div
                    aria-hidden="true"
                    className="col-span-1 md:hidden relative h-0 w-full"
                  >
                    <div className="experience-detail-local-guide-line blueprint-mask-x absolute left-0 top-0 z-20 h-[2px] w-full -translate-y-1/2 text-foreground opacity-[0.18]" />
                    <span className="experience-detail-guide-dot blueprint-dot absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
                    <span className="experience-detail-guide-dot blueprint-dot absolute right-0 top-0 translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}

                {isDesktopRight && !isDesktopLastRow && (
                  <div
                    aria-hidden="true"
                    className="col-span-2 hidden md:block relative h-0 w-full"
                  >
                    <div className="experience-detail-local-guide-line blueprint-mask-x absolute left-0 top-0 z-20 h-[2px] w-full -translate-y-1/2 text-foreground opacity-[0.18]" />
                    <span className="experience-detail-guide-dot blueprint-dot absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
                    <span className="experience-detail-guide-dot blueprint-dot absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
                    <span className="experience-detail-guide-dot blueprint-dot absolute right-0 top-0 translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillIcon({ iconSlug, name }: { iconSlug: string; name: string }) {
  const iconUrls = {
    lightBase: getSimpleIconUrl(iconSlug, "light", "base"),
    lightHover: getSimpleIconUrl(iconSlug, "dark", "hover"),
    darkBase: getSimpleIconUrl(iconSlug, "dark", "base"),
    darkHover: getSimpleIconUrl(iconSlug, "light", "hover"),
  };

  return (
    <span
      aria-hidden="true"
      className="relative block h-3.5 w-3.5 shrink-0 overflow-hidden"
    >
      <span
        className="skill-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-100 transition-opacity duration-700 ease-in-out group-hover/skill:opacity-0 group-data-[auto-active=true]/skill:opacity-0 dark:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.lightBase})` }}
      />
      <span
        className="skill-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-700 ease-in-out group-hover/skill:opacity-100 group-data-[auto-active=true]/skill:opacity-100 dark:opacity-0 dark:group-hover/skill:opacity-0 dark:group-data-[auto-active=true]/skill:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.lightHover})` }}
      />
      <span
        className="skill-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-700 ease-in-out dark:opacity-100 dark:group-hover/skill:opacity-0 dark:group-data-[auto-active=true]/skill:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.darkBase})` }}
      />
      <span
        className="skill-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-700 ease-in-out dark:group-hover/skill:opacity-100 dark:group-data-[auto-active=true]/skill:opacity-100"
        style={{ backgroundImage: `url(${iconUrls.darkHover})` }}
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}

function SkillsSection() {
  const [autoActiveSkillIndex, setAutoActiveSkillIndex] = useState<
    number | null
  >(null);
  const [isAutoSkillPaused, setIsAutoSkillPaused] = useState(false);

  useEffect(() => {
    if (isAutoSkillPaused) {
      return;
    }

    const activateNextSkill = () => {
      setAutoActiveSkillIndex((currentIndex) =>
        getNextAutoSkillIndex(currentIndex, skillsData.length),
      );
    };

    activateNextSkill();

    const intervalId = window.setInterval(activateNextSkill, 1800);

    return () => window.clearInterval(intervalId);
  }, [isAutoSkillPaused]);

  function pauseAutoSkillHover() {
    setIsAutoSkillPaused(true);
    setAutoActiveSkillIndex(null);
  }

  function resumeAutoSkillHover() {
    setIsAutoSkillPaused(false);
  }

  return (
    <section
      id="habilidades"
      aria-labelledby="skills-title"
      className="relative scroll-mt-24 bg-background px-3"
    >
      <div className="skills-section-title-row relative flex h-12 items-center">
        <ViewportGuideLine position="top" scope="skills" />

        <h2
          id="skills-title"
          className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]"
        >
          Habilidades y Tecnologías
        </h2>

        <ViewportGuideLine position="bottom" scope="skills" />
      </div>

      <div
        className="flex flex-wrap gap-2 py-4"
        data-auto-skills="true"
        onBlur={resumeAutoSkillHover}
        onFocus={pauseAutoSkillHover}
        onPointerEnter={pauseAutoSkillHover}
        onPointerLeave={resumeAutoSkillHover}
      >
        {skillsData.map((skill, index) => (
          <div
            key={skill.name}
            className="group/skill flex h-8 flex-auto basis-auto items-center justify-center gap-2 rounded-md border border-[#d4d4d8] bg-transparent px-3 text-[12px] font-medium leading-none text-[#52525c] transition-colors duration-700 ease-in-out hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] data-[auto-active=true]:border-[#18181b] data-[auto-active=true]:bg-[#18181b] data-[auto-active=true]:text-[#fff] dark:border-[#3f3f46] dark:text-[#a1a1aa] dark:hover:border-[#fff] dark:hover:bg-[#fff] dark:hover:text-[#18181b] dark:data-[auto-active=true]:border-[#fff] dark:data-[auto-active=true]:bg-[#fff] dark:data-[auto-active=true]:text-[#18181b]"
            data-auto-active={autoActiveSkillIndex === index}
          >
            <SkillIcon iconSlug={skill.iconSlug} name={skill.name} />
            <span className="min-w-0 truncate">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function GitHubActivitySection() {
  const [activity, setActivity] = useState<GitHubActivity | null>(null);
  const [activityError, setActivityError] = useState<string | null>(null);
  const activityScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubActivity() {
      try {
        const response = await fetch("/api/github-activity");
        const payload = (await response.json()) as
          | GitHubActivity
          | { error?: string };

        if (!isMounted) {
          return;
        }

        const errorMessage = "error" in payload ? payload.error : undefined;

        if (!response.ok || errorMessage || !isGitHubActivity(payload)) {
          setActivityError(
            errorMessage ?? "No se pudo cargar la actividad de GitHub.",
          );
          return;
        }

        setActivity(payload);
      } catch {
        if (isMounted) {
          setActivityError("No se pudo cargar la actividad de GitHub.");
        }
      }
    }

    loadGitHubActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const scrollElement = activityScrollRef.current;

    if (!scrollElement) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollElement.scrollLeft =
        scrollElement.scrollWidth - scrollElement.clientWidth;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activity]);

  const weeks = activity?.weeks ?? githubActivityFallbackWeeks;
  const months = getGitHubMonthLabels(
    weeks,
    activity?.months ?? githubActivityFallbackMonths,
  );
  const totalContributions = activity?.totalContributions;

  return (
    <section
      aria-labelledby="github-activity-title"
      className="relative bg-background px-3"
    >
      <div className="github-activity-section-title-row relative flex h-12 items-center">
        <ViewportGuideLine position="top" scope="github-activity" />

        <h2
          id="github-activity-title"
          className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]"
        >
          Actividad de GitHub
        </h2>

        <ViewportGuideLine position="bottom" scope="github-activity" />
      </div>

      <div className="github-activity-calendar py-4">
        <div
          aria-label="Calendario de contribuciones"
          className="github-activity-frame rounded-md border border-[#e4e4e7] bg-transparent dark:border-[#27272a]"
          role="img"
        >
          <div
            ref={activityScrollRef}
            className="github-activity-scroll overflow-x-auto p-3"
          >
            <div className="github-activity-grid min-w-[686px] w-full">
              <div
                aria-hidden="true"
                className="grid w-full gap-[3px] overflow-visible text-[11px] font-medium leading-none text-[#71717a] dark:text-[#a1a1aa]"
                style={{
                  gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
                }}
              >
                {months.map((month) => (
                  <span
                    key={`${month.name}-${month.year}-${month.firstDay}`}
                    className="whitespace-nowrap last:justify-self-end"
                    style={{ gridColumn: `span ${month.totalWeeks}` }}
                  >
                    {month.name}
                  </span>
                ))}
              </div>

              <div className="mt-2">
                <div
                  className="grid w-full auto-cols-[minmax(10px,1fr)] grid-flow-col grid-rows-7 gap-[3px]"
                  role="presentation"
                >
                  {weeks.map((week) =>
                    week.contributionDays.map((day) => {
                      const levelIndex = getGitHubContributionLevelIndex(
                        day.contributionLevel,
                      );

                      return (
                        <span
                          key={`${week.firstDay}-${day.weekday}-${day.date}`}
                          aria-label={
                            day.date
                              ? `${day.contributionCount} contribuciones el ${day.date}`
                              : "Sin contribuciones"
                          }
                          className={`aspect-square w-full rounded-[2px] ${githubContributionLevelClassNames[levelIndex]}`}
                          title={
                            day.date
                              ? `${day.contributionCount} contribuciones el ${day.date}`
                              : undefined
                          }
                        />
                      );
                    }),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="github-activity-summary-row flex items-center justify-between gap-3 px-3 pb-3">
            <p className="github-activity-summary-text min-w-0 truncate text-[11px] font-semibold leading-none text-[#18181b] dark:text-[#f4f4f5] sm:text-[13px]">
              {typeof totalContributions === "number"
                ? `${totalContributions} contribuciones en el último año`
                : "Cargando actividad de GitHub"}
            </p>

            <div className="github-activity-legend ml-auto flex shrink-0 items-center justify-end gap-1.5 text-[10px] font-medium leading-none text-[#52525c] dark:text-[#d4d4d8] sm:text-[11px]">
              <span>Menos</span>
              {githubContributionLevelClassNames.map((levelClassName) => (
                <span
                  key={levelClassName}
                  aria-hidden="true"
                  className={`h-[7px] w-[7px] rounded-[2px] sm:h-[8px] sm:w-[8px] ${levelClassName}`}
                />
              ))}
              <span>Más</span>
            </div>
          </div>
        </div>

        {activityError && (
          <p className="github-activity-error-message mt-2 text-right text-[11px] font-medium leading-snug text-[#71717a] dark:text-[#a1a1aa]">
            {activityError}
          </p>
        )}
      </div>
    </section>
  );
}

export function HomeSurface() {
  return (
    <main
      id="inicio"
      className="relative min-h-dvh scroll-mt-24 overflow-hidden bg-background text-foreground"
    >
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

        <div className="fixed top-4 left-1/2 z-[120] w-full max-w-[min(100%-1rem,42rem)] -translate-x-1/2 px-2">
          <PortfolioExpandableTabs />
        </div>

        <section
          id="acerca-de-mi"
          aria-labelledby="profile-summary-title"
          className="relative bg-background px-3 py-3"
        >
          <h2 id="profile-summary-title" className="sr-only">
            Perfil profesional
          </h2>

          <div className="relative z-[60] grid gap-y-5 min-[1440px]:grid-cols-[minmax(0,1fr)_max-content] min-[1440px]:items-start min-[1440px]:gap-x-0">
            <div className="min-w-0 min-[1440px]:pr-5">
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

              <div className="mt-5 hidden items-center justify-start min-[1440px]:flex">
                <ContactDrawer className={profileContactButtonClass} />
              </div>
            </div>

            <div className="col-span-full grid grid-cols-2 items-center gap-2 sm:grid-cols-4 min-[1440px]:hidden">
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
                  <span className="min-[1440px]:hidden">CV</span>
                  <span className="hidden min-[1440px]:inline">Curriculum</span>
                </a>
              </Button>
            </div>

            <div className="hidden flex-col items-end gap-2 min-[1440px]:flex min-[1440px]:min-w-28">
              <div className="group/github-preview relative z-[80]">
                <Button asChild className={profileActionButtonClass}>
                  <a
                    href="https://github.com/Ricardo-NM"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={13} strokeWidth={2} aria-hidden="true" />
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
                    <Linkedin size={13} strokeWidth={2} aria-hidden="true" />
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
                  <FileUser size={13} strokeWidth={2} aria-hidden="true" />
                  <span className="min-[1440px]:hidden">CV</span>
                  <span className="hidden min-[1440px]:inline">Curriculum</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <GitHubActivitySection />
      </header>
    </main>
  );
}
