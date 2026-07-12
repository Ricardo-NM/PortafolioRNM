"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
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
      onClick={() => setTheme(getNextTheme(resolvedTheme))}
    >
      <motion.span
        aria-hidden="true"
        className={cn(
          "inline-flex items-center justify-center",
          appearance === "tab" &&
            "text-[#18181b] opacity-100 dark:text-[#f4f4f5]",
        )}
        animate={{ rotate: isDark ? 0 : 90, scale: 1 }}
        initial={false}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {isDark ? (
          <Moon size={iconSize} strokeWidth={1.75} />
        ) : (
          <Sun size={iconSize} strokeWidth={1.75} />
        )}
      </motion.span>
    </Button>
  );
}
