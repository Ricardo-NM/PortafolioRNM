"use client";

import { gsap } from "gsap";
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
  const lightLayerRef = React.useRef<HTMLDivElement | null>(null);
  const darkLayerRef = React.useRef<HTMLDivElement | null>(null);
  const mounted = React.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const isDark = mounted ? resolvedTheme === "dark" : true;

  React.useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.to(lightLayerRef.current, {
      autoAlpha: isDark ? 0 : 1,
      duration: reduceMotion ? 0 : 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(darkLayerRef.current, {
      autoAlpha: isDark ? 1 : 0,
      duration: reduceMotion ? 0 : 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [isDark]);

  return (
    <div className="theme-banner-frame relative overflow-hidden bg-background">
      <div
        ref={lightLayerRef}
        aria-hidden="true"
        className="theme-banner-layer"
        style={{
          backgroundImage: `url(${bannerLight.src})`,
          opacity: isDark ? 0 : 1,
        }}
      />

      <div
        ref={darkLayerRef}
        aria-hidden="true"
        className="theme-banner-layer"
        style={{
          backgroundImage: `url(${bannerDark.src})`,
          opacity: isDark ? 1 : 0,
        }}
      />

      <div className="theme-banner-scrim bg-background/10" />

      <div className="absolute right-3 bottom-3 z-10">
        <ThemeToggle className="h-8 min-w-8 w-8 rounded-md p-0" iconSize={14} />
      </div>
    </div>
  );
}
