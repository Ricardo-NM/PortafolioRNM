"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";
import bannerDark from "@/assets/images/bannerDark.png";
import bannerLight from "@/assets/images/bannerLight.png";
import { ThemeToggle } from "@/components/theme-toggle";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeBanner() {
  const { resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className="theme-banner-frame relative overflow-hidden bg-background">
      <motion.div
        aria-hidden="true"
        className="theme-banner-layer"
        style={{ backgroundImage: `url(${bannerLight.src})` }}
        animate={{ opacity: isDark ? 0 : 1 }}
        initial={false}
        transition={{ duration: 0.32, ease: "easeOut" }}
      />

      <motion.div
        aria-hidden="true"
        className="theme-banner-layer"
        style={{ backgroundImage: `url(${bannerDark.src})` }}
        animate={{ opacity: isDark ? 1 : 0 }}
        initial={false}
        transition={{ duration: 0.32, ease: "easeOut" }}
      />

      <div className="theme-banner-scrim bg-background/10" />

      <div className="absolute right-3 bottom-3 z-10">
        <ThemeToggle className="h-8 min-w-8 w-8 rounded-md p-0" iconSize={14} />
      </div>
    </div>
  );
}
