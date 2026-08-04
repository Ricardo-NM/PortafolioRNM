"use client";

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
      <div
        aria-hidden="true"
        className={`theme-banner-layer transition-opacity duration-150 ease-out ${isDark ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${bannerLight.src})` }}
      />

      <div
        aria-hidden="true"
        className={`theme-banner-layer transition-opacity duration-150 ease-out ${isDark ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url(${bannerDark.src})` }}
      />

      <div className="theme-banner-scrim bg-background/10" />

      <div className="absolute right-3 bottom-3 z-10">
        <ThemeToggle className="h-8 min-w-8 w-8 rounded-md p-0" iconSize={14} />
      </div>
    </div>
  );
}
