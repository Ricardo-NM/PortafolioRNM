"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
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

const fadePanelMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.16, ease: "easeOut" },
} satisfies Pick<MotionProps, "initial" | "animate" | "exit" | "transition">;

const contentPanelMotion = {
  initial: {
    opacity: 0,
    scale: 0.95,
    x: -10,
    filter: "blur(10px)",
  },
  animate: { opacity: 1, scale: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" },
  transition: {
    duration: 0.5,
    ease: "circInOut",
    type: "spring",
  },
} satisfies Pick<MotionProps, "initial" | "animate" | "exit" | "transition">;

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
  const panelMotion =
    panelAnimation === "fade" ? fadePanelMotion : contentPanelMotion;

  if (!tabs?.length) return null;

  return (
    <div className={cn("flex w-full flex-col gap-y-2", className)}>
      <div
        role="tablist"
        className="flex flex-wrap gap-2 rounded-lg border border-[#e4e4e7] bg-[#fff]/80 p-1 shadow-[0_1px_8px_rgba(24,24,27,0.06)] backdrop-blur-sm dark:border-[#27272a] dark:bg-[#09090b]/80"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`${tab.id}-tab`}
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
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded-md border border-[#d4d4d8] bg-[#f4f4f5] shadow-[0_1px_8px_rgba(24,24,27,0.08)] dark:border-[#3f3f46] dark:bg-[#18181b]"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex w-full justify-center">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className="min-h-60 rounded-lg border border-[#e4e4e7] bg-transparent px-3 pb-3 text-[#18181b] dark:border-[#27272a] dark:text-[#f4f4f5]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTabData.id}
            id={`${activeTabData.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeTabData.id}-tab`}
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={panelMotion.transition}
          >
            {activeTabData.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export { AnimatedTabs };
