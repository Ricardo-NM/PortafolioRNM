"use client";

import * as React from "react";
import {
  BriefcaseBusiness,
  CodeXml,
  FolderKanban,
  House,
} from "lucide-react";

import { ExpandableTabs } from "@/components/expandable-tabs/expandable-tabs";
import { ThemeToggle } from "@/components/theme-toggle";

const smoothScrollToEventName = "portfolio:smooth-scroll-to";

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

export function PortfolioTabs() {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [showThemeTab, setShowThemeTab] = React.useState(false);
  const activeTabIndexRef = React.useRef(activeTabIndex);
  const lockedTabIndexRef = React.useRef<number | null>(null);
  const unlockTimerRef = React.useRef<number | null>(null);
  const fallbackTimerRef = React.useRef<number | null>(null);
  const scrollRequestIdRef = React.useRef(0);

  React.useEffect(() => {
    activeTabIndexRef.current = activeTabIndex;
  }, [activeTabIndex]);

  React.useEffect(() => {
    return () => {
      if (unlockTimerRef.current) {
        window.clearTimeout(unlockTimerRef.current);
      }

      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

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

    let frameId = 0;

    function syncActiveSection() {
      if (lockedTabIndexRef.current !== null) {
        return;
      }

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

      if (closestEntry.index !== activeTabIndexRef.current) {
        setActiveTabIndex(closestEntry.index);
      }
    }

    function scheduleActiveSectionSync() {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        syncActiveSection();
      });
    }

    syncActiveSection();
    window.addEventListener("scroll", scheduleActiveSectionSync, {
      passive: true,
    });
    window.addEventListener("resize", scheduleActiveSectionSync);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleActiveSectionSync);
      window.removeEventListener("resize", scheduleActiveSectionSync);
    };
  }, []);

  React.useEffect(() => {
    const banner = document.querySelector<HTMLElement>(".theme-banner-frame");

    if (!banner) {
      return;
    }

    const themeBanner = banner;
    let frameId = 0;
    let isThemeTabVisible = false;

    function syncThemeTabVisibility() {
      const bannerBottom = themeBanner.getBoundingClientRect().bottom;
      const shouldShow = bannerBottom <= -8;
      const shouldHide = bannerBottom > 16;

      if (shouldShow && !isThemeTabVisible) {
        isThemeTabVisible = true;
        setShowThemeTab(true);
        return;
      }

      if (shouldHide && isThemeTabVisible) {
        isThemeTabVisible = false;
        setShowThemeTab(false);
      }
    }

    function scheduleThemeTabSync() {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        syncThemeTabVisibility();
      });
    }

    syncThemeTabVisibility();
    window.addEventListener("scroll", scheduleThemeTabSync, { passive: true });
    window.addEventListener("resize", scheduleThemeTabSync);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleThemeTabSync);
      window.removeEventListener("resize", scheduleThemeTabSync);
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
        className="w-[min(100%,24rem)] max-w-full justify-center border-[#e4e4e7] bg-[#fff]/90 shadow-[0_18px_50px_rgba(24,24,27,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#fff]/70 dark:border-[#27272a] dark:bg-[#09090b]/90 dark:shadow-[0_18px_60px_rgba(0,0,0,0.55)] dark:supports-[backdrop-filter]:bg-[#09090b]/70"
        trailingActionVisible={showThemeTab}
        trailingAction={
          <ThemeToggle
            appearance="tab"
            iconSize={20}
            className="shrink-0"
          />
        }
        onTabSelect={(tab, index) => {
          const targetElement = document.getElementById(tab.sectionId ?? "");
          const scrollRequestId = scrollRequestIdRef.current + 1;
          scrollRequestIdRef.current = scrollRequestId;

          lockedTabIndexRef.current = index;
          activeTabIndexRef.current = index;
          setActiveTabIndex(index);

          const unlockActiveSync = () => {
            if (scrollRequestIdRef.current !== scrollRequestId) {
              return;
            }

            if (unlockTimerRef.current) {
              window.clearTimeout(unlockTimerRef.current);
            }

            unlockTimerRef.current = window.setTimeout(() => {
              lockedTabIndexRef.current = null;
              activeTabIndexRef.current = index;
              setActiveTabIndex(index);
            }, 80);
          };

          if (unlockTimerRef.current) {
            window.clearTimeout(unlockTimerRef.current);
          }

          if (fallbackTimerRef.current) {
            window.clearTimeout(fallbackTimerRef.current);
          }

          unlockTimerRef.current = window.setTimeout(unlockActiveSync, 1400);

          const smoothScrollEvent = new CustomEvent(smoothScrollToEventName, {
            cancelable: true,
            detail: {
              targetId: tab.sectionId,
              onComplete: unlockActiveSync,
            },
          });

          const wasHandled = !window.dispatchEvent(smoothScrollEvent);

          const scrollWithNativeFallback = () => {
            if (scrollRequestIdRef.current !== scrollRequestId) {
              return;
            }

            targetElement?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            unlockTimerRef.current = window.setTimeout(unlockActiveSync, 900);
          };

          if (!wasHandled) {
            scrollWithNativeFallback();
          } else if (targetElement) {
            const initialDistance = Math.abs(
              targetElement.getBoundingClientRect().top,
            );

            fallbackTimerRef.current = window.setTimeout(() => {
              if (scrollRequestIdRef.current !== scrollRequestId) {
                return;
              }

              const currentDistance = Math.abs(
                targetElement.getBoundingClientRect().top,
              );
              const scrollDidStart = currentDistance < initialDistance - 8;

              if (!scrollDidStart && currentDistance > 24) {
                scrollWithNativeFallback();
              }
            }, 140);
          }

          if (tab.href) {
            window.history.replaceState(null, "", tab.href);
          }
        }}
      />
    </nav>
  );
}


