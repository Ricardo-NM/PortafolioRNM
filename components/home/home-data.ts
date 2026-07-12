import experienceOne from "@/assets/images/experienceOne.png";
import experienceSecond from "@/assets/images/experienceSecond.png";
import projectO from "@/assets/images/projectO.svg";
import projectS from "@/assets/images/projectS.svg";
import projectT from "@/assets/images/projectT.svg";
export const profileSummary = [
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

export const profileActionButtonClass =
  "h-9 w-full min-w-0 gap-1.5 border-[#d4d4d8] bg-transparent px-2.5 text-[11px] font-semibold leading-none text-[#52525c] transition-colors duration-300 ease-in-out hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] dark:border-[#3f3f46] dark:text-[#a1a1aa] dark:hover:border-[#fff] dark:hover:bg-[#fff] dark:hover:text-[#18181b] min-[1440px]:w-auto min-[1440px]:gap-2 min-[1440px]:px-3 [&_svg]:shrink-0 [&_span]:leading-none";

export const profileContactButtonClass =
  "h-9 w-full min-w-0 gap-1.5 border-[#000] bg-[#000] px-2.5 text-[11px] font-semibold leading-none text-[#d4d4d8] hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] dark:border-[#fff] dark:bg-[#fff] dark:text-[#52525c] dark:hover:border-[#d4d4d8] dark:hover:bg-[#d4d4d8] dark:hover:text-[#000] min-[1440px]:w-auto min-[1440px]:gap-2 min-[1440px]:px-3 [&_svg]:shrink-0";

export const experiences = [
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

export const projectsData = [
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

export const skillsData = [
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
