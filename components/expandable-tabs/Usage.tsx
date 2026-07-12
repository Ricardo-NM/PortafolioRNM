"use client";

import * as React from "react";
import {
  BriefcaseBusiness,
  CodeXml,
  FolderKanban,
  House,
} from "lucide-react";

import { ExpandableTabs } from "@/components/expandable-tabs/Component";

const portfolioTabs = [
  {
    title: "Inicio",
    icon: House,
    href: "#inicio",
    sectionId: "inicio",
    ariaLabel: "Ir a Inicio",
  },
  {
    title: "Experiencia",
    icon: BriefcaseBusiness,
    href: "#experiencia",
    sectionId: "experiencia",
    ariaLabel: "Ir a Experiencia",
  },
  {
    title: "Proyectos",
    icon: FolderKanban,
    href: "#proyectos",
    sectionId: "proyectos",
    ariaLabel: "Ir a Proyectos",
  },
  {
    title: "Habilidades",
    icon: CodeXml,
    href: "#habilidades",
    sectionId: "habilidades",
    ariaLabel: "Ir a Habilidades",
  },
];

export function PortfolioExpandableTabs() {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  React.useEffect(() => {
    const sectionEntries = portfolioTabs
      .map((tab, index) => ({
        index,
        element: document.getElementById(tab.sectionId),
      }))
      .filter(
        (entry): entry is { index: number; element: HTMLElement } =>
          Boolean(entry.element),
      );

    if (!sectionEntries.length) {
      return;
    }

    function syncActiveSection() {
      const viewportAnchor = window.innerHeight * 0.28;
      const closestEntry = sectionEntries.reduce((closest, entry) => {
        const distance = Math.abs(
          entry.element.getBoundingClientRect().top - viewportAnchor,
        );

        return distance < closest.distance
          ? { index: entry.index, distance }
          : closest;
      }, {
        index: sectionEntries[0].index,
        distance: Number.POSITIVE_INFINITY,
      });

      setActiveTabIndex(closestEntry.index);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top),
          );

        const activeEntry = visibleEntries[0];
        const activeIndex = sectionEntries.find(
          (entry) => entry.element === activeEntry?.target,
        )?.index;

        if (typeof activeIndex === "number") {
          setActiveTabIndex(activeIndex);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0, 0.2, 0.6],
      },
    );

    sectionEntries.forEach((entry) => observer.observe(entry.element));
    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, []);

  return (
    <nav
      aria-label="Navegación principal del portafolio"
      className="flex justify-center"
    >
      <ExpandableTabs
        tabs={portfolioTabs}
        selectedIndex={activeTabIndex}
        activeColor="text-[#18181b] dark:text-[#f4f4f5]"
        className="w-auto max-w-full justify-center border-[#e4e4e7] bg-[#fff]/90 shadow-[0_18px_50px_rgba(24,24,27,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#fff]/70 dark:border-[#27272a] dark:bg-[#09090b]/90 dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)] dark:supports-[backdrop-filter]:bg-[#09090b]/70"
        onTabSelect={(tab, index) => {
          setActiveTabIndex(index);
          document.getElementById(tab.sectionId ?? "")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          if (tab.href) {
            window.history.replaceState(null, "", tab.href);
          }
        }}
      />
    </nav>
  );
}
