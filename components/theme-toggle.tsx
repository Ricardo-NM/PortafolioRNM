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
};

export function ThemeToggle({ className, iconSize = 16 }: ThemeToggleProps) {
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
      className={cn(className)}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      onClick={() => setTheme(getNextTheme(resolvedTheme))}
    >
      <motion.span
        aria-hidden="true"
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
