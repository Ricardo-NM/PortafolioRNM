"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
  panelAnimation?: "content" | "fade";
}

const defaultTabs: Tab[] = [
  {
    id: "tab1",
    label: "Tab 1",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <div
          aria-hidden="true"
          className="h-60 w-full rounded-lg border border-[#27272a] bg-[#18181b]"
        />

        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 1
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab2",
    label: "Tab 2",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <div
          aria-hidden="true"
          className="h-60 w-full rounded-lg border border-[#27272a] bg-[#18181b]"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 2
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tab3",
    label: "Tab 3",
    content: (
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <div
          aria-hidden="true"
          className="h-60 w-full rounded-lg border border-[#27272a] bg-[#18181b]"
        />
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold mb-0 text-white mt-0 !m-0">
            Tab 3
          </h2>
          <p className="text-sm text-gray-200 mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
  panelAnimation = "content",
}: AnimatedTabsProps) => {
  const initialTab = defaultTab ?? tabs[0]?.id ?? "";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const activeTabData = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const tablistRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const tablist = tablistRef.current;
    const indicator = indicatorRef.current;
    const selectedTab = tablist?.querySelector<HTMLElement>(
      `[data-tab-id="${activeTab}"]`,
    );

    if (!tablist || !indicator || !selectedTab) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.to(indicator, {
      x: selectedTab.offsetLeft,
      y: selectedTab.offsetTop,
      width: selectedTab.offsetWidth,
      height: selectedTab.offsetHeight,
      duration: reduceMotion ? 0 : 0.38,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [activeTab, tabs]);

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.fromTo(
      panel,
      {
        autoAlpha: panelAnimation === "fade" ? 0 : 0.2,
        x: panelAnimation === "fade" ? 0 : -8,
        scale: panelAnimation === "fade" ? 1 : 0.985,
      },
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: reduceMotion ? 0 : panelAnimation === "fade" ? 0.18 : 0.34,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "transform,opacity,visibility",
      },
    );
  }, [activeTabData?.id, panelAnimation]);

  if (!tabs?.length || !activeTabData) return null;

  return (
    <div className={cn("flex w-full flex-col gap-y-2", className)}>
      <div
        ref={tablistRef}
        role="tablist"
        className="relative flex flex-wrap gap-2 rounded-lg border border-[#e4e4e7] bg-[#fff]/80 p-1 shadow-[0_1px_8px_rgba(24,24,27,0.06)] backdrop-blur-sm dark:border-[#27272a] dark:bg-[#09090b]/80"
      >
        <div
          ref={indicatorRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 rounded-md border border-[#d4d4d8] bg-[#f4f4f5] shadow-[0_1px_8px_rgba(24,24,27,0.08)] dark:border-[#3f3f46] dark:bg-[#18181b]"
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`${tab.id}-tab`}
            data-tab-id={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative flex min-h-10 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md px-3 py-2 text-center text-sm font-semibold text-[#52525c] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#18181b]/25 dark:text-[#a1a1aa] dark:focus-visible:ring-[#fff]/25 sm:flex-none",
              activeTab === tab.id
                ? "text-[#18181b] dark:text-[#f4f4f5]"
                : "hover:bg-[#f4f4f5] hover:text-[#18181b] dark:hover:bg-[#18181b] dark:hover:text-[#f4f4f5]",
            )}
          >
            <span className="relative z-10 flex w-full justify-center">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className="min-h-60 rounded-lg border border-[#e4e4e7] bg-transparent px-3 pb-3 text-[#18181b] dark:border-[#27272a] dark:text-[#f4f4f5]">
        <div
          ref={panelRef}
          key={activeTabData.id}
          id={`${activeTabData.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTabData.id}-tab`}
        >
          {activeTabData.content}
        </div>
      </div>
    </div>
  );
};

export { AnimatedTabs };
