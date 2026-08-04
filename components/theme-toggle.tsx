"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { flushSync } from "react-dom";
import { getNextTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type ThemeToggleProps = {
  className?: string;
  iconSize?: number;
  appearance?: "banner" | "tab";
};

const themeToggleButtonClass =
  "border-[#d4d4d8] bg-[#fff] text-[#52525c] transition-colors duration-300 ease-in-out hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] dark:border-[#3f3f46] dark:bg-[#000] dark:text-[#a1a1aa] dark:hover:border-[#fff] dark:hover:bg-[#fff] dark:hover:text-[#18181b]";

const themeTabButtonClass =
  "h-9 min-w-9 w-9 rounded-xl border-0 bg-muted p-0 text-[#18181b] shadow-none hover:border-0 hover:bg-muted hover:text-[#18181b] dark:bg-muted dark:text-[#f4f4f5] dark:hover:bg-muted dark:hover:text-[#f4f4f5]";

const themeFadeDuration = 320;

export function ThemeToggle({
  className,
  iconSize = 16,
  appearance = "banner",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const themeFadeTimeoutRef = React.useRef<number | null>(null);

  const handleTouchThemeChange = (nextTheme: "light" | "dark") => {
    const root = document.documentElement;

    if (themeFadeTimeoutRef.current !== null) {
      window.clearTimeout(themeFadeTimeoutRef.current);
    }

    root.classList.remove(
      "theme-fade",
      "theme-fade-ready",
      "theme-fade-to-light",
      "theme-fade-to-dark",
    );
    root.classList.add(
      "theme-fade",
      nextTheme === "light" ? "theme-fade-to-light" : "theme-fade-to-dark",
    );

    setTheme(nextTheme);

    window.requestAnimationFrame(() => {
      root.classList.add("theme-fade-ready");
    });

    themeFadeTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove(
        "theme-fade",
        "theme-fade-ready",
        "theme-fade-to-light",
        "theme-fade-to-dark",
      );
      themeFadeTimeoutRef.current = null;
    }, themeFadeDuration + 40);
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = getNextTheme(resolvedTheme);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (
      typeof document === "undefined" ||
      !document.startViewTransition ||
      reduceMotion ||
      isTouchDevice
    ) {
      if (isTouchDevice && !reduceMotion && typeof document !== "undefined") {
        handleTouchThemeChange(nextTheme);
      } else {
        setTheme(nextTheme);
      }
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 260,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <Button
      type="button"
      size="icon"
      variant={appearance === "tab" ? "ghost" : "outline"}
      className={cn(
        appearance === "tab" ? themeTabButtonClass : themeToggleButtonClass,
        className,
      )}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      onClick={handleToggle}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center transition-transform duration-150 ease-out",
          appearance === "tab" &&
            "text-[#18181b] opacity-100 dark:text-[#f4f4f5]",
        )}
        style={{ rotate: isDark ? "0deg" : "90deg" }}
      >
        {isDark ? (
          <Moon size={iconSize} strokeWidth={1.75} />
        ) : (
          <Sun size={iconSize} strokeWidth={1.75} />
        )}
      </span>
    </Button>
  );
}
