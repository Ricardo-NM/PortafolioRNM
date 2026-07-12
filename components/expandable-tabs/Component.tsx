"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { gsap } from "gsap";

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
  const [settledSelected, setSettledSelected] = React.useState(selected);
  const labelRefs = React.useRef(new Map<number, HTMLSpanElement>());
  const hasAnimatedLabels = React.useRef(false);

  React.useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const shouldSettleImmediately = !hasAnimatedLabels.current || reduceMotion;
    const timeline = gsap.timeline({
      onComplete: () => setSettledSelected(selected),
    });

    labelRefs.current.forEach((label, index) => {
      const isSelected = selected === index;
      const isNewSelection = isSelected && settledSelected !== selected;
      const targetWidth = isSelected ? label.scrollWidth : 0;

      gsap.killTweensOf(label);

      if (shouldSettleImmediately) {
        gsap.set(label, {
          width: targetWidth,
          opacity: isSelected ? 1 : 0,
        });
        return;
      }

      if (isNewSelection) {
        gsap.set(label, { width: 0, opacity: 0 });
      }

      timeline.to(
        label,
        {
          width: targetWidth,
          opacity: isSelected ? 1 : 0,
          duration: 0.42,
          ease: "power3.out",
          overwrite: "auto",
        },
        0,
      );
    });

    hasAnimatedLabels.current = true;

    if (shouldSettleImmediately && settledSelected !== selected) {
      setSettledSelected(selected);
    }
  }, [selected, settledSelected, tabs]);

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
        const shouldRenderLabel =
          selected === index || settledSelected === index;

        return (
          <a
            key={tab.title}
            href={tab.href}
            aria-label={tab.ariaLabel ?? tab.title}
            aria-current={selected === index ? "page" : undefined}
            data-section-id={tab.sectionId}
            onClick={(event) => handleSelect(event, index, tab)}
            className={cn(
              "relative flex min-h-9 shrink-0 items-center rounded-xl py-2 text-sm font-medium transition-[background-color,color,gap,padding] duration-300 ease-out",
              isLastTabItem ? "mr-0" : "mr-2",
              selected === index
                ? cn("gap-2 bg-muted px-4", activeColor)
                : "gap-0 px-2 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon size={20} />
            <span
              ref={(element) => {
                if (element) {
                  labelRefs.current.set(index, element);
                  return;
                }

                labelRefs.current.delete(index);
              }}
              aria-hidden="true"
              className={cn(
                "inline-block overflow-hidden whitespace-nowrap",
                shouldRenderLabel ? "max-w-32 opacity-100" : "max-w-0 opacity-0",
              )}
            >
              {shouldRenderLabel ? tab.title : null}
            </span>
          </a>
        );
      })}
      {trailingAction && (
        <div
          aria-hidden={!trailingActionVisible}
          className={cn(
            "flex h-9 w-11 shrink-0 overflow-hidden pl-2",
            trailingActionVisible ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 transition-all duration-300 ease-out",
              trailingActionVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-3 opacity-0",
            )}
          >
            {trailingAction}
          </div>
        </div>
      )}
    </div>
  );
}
