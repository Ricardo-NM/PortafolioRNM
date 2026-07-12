"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  href?: string;
  ariaLabel?: string;
  sectionId?: string;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  defaultSelected?: number | null;
  selectedIndex?: number | null;
  trailingAction?: React.ReactNode;
  trailingActionVisible?: boolean;
  onChange?: (index: number | null) => void;
  onTabSelect?: (
    tab: Tab,
    index: number,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition: Transition = {
  delay: 0.1,
  type: "spring",
  bounce: 0,
  duration: 0.6,
};

const trailingActionTransition: Transition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
};

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  defaultSelected = null,
  selectedIndex,
  trailingAction,
  trailingActionVisible = Boolean(trailingAction),
  onChange,
  onTabSelect,
}: ExpandableTabsProps) {
  const [internalSelected, setInternalSelected] = React.useState<number | null>(
    defaultSelected,
  );
  const selected = selectedIndex ?? internalSelected;
  const isControlled = selectedIndex !== undefined;

  const handleSelect = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
    tab: Tab,
  ) => {
    if (tab.href?.startsWith("#")) {
      event.preventDefault();
    }

    if (!isControlled) {
      setInternalSelected(index);
    }

    onChange?.(index);
    onTabSelect?.(tab, index, event);
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center rounded-2xl border bg-background p-1 shadow-sm",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isLastTabItem = index === tabs.length - 1;

        return (
          <motion.a
            key={tab.title}
            href={tab.href}
            aria-label={tab.ariaLabel ?? tab.title}
            aria-current={selected === index ? "page" : undefined}
            data-section-id={tab.sectionId}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={(event) => handleSelect(event, index, tab)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              isLastTabItem ? "mr-0" : "mr-2",
              selected === index
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        );
      })}
      {trailingAction && (
        <motion.div
          aria-hidden={!trailingActionVisible}
          initial={false}
          animate={{
            width: trailingActionVisible ? 44 : 0,
          }}
          transition={trailingActionTransition}
          className={cn(
            "flex h-9 shrink-0 overflow-hidden pl-2 will-change-[width]",
            trailingActionVisible ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: trailingActionVisible ? 1 : 0,
              x: trailingActionVisible ? 0 : -12,
            }}
            transition={trailingActionTransition}
            className="flex h-9 w-9 shrink-0 will-change-[transform,opacity]"
          >
            {trailingAction}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
