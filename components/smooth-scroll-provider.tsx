"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

type SmoothScrollToDetail = {
  targetId?: string;
  href?: string;
  onComplete?: () => void;
};

const reduceMotionQuery = "(prefers-reduced-motion: reduce)";
const touchViewportQuery = "(pointer: coarse)";
const scrollToEventName = "portfolio:smooth-scroll-to";

function getAnchorTarget(detail: SmoothScrollToDetail) {
  const rawTarget = detail.href ?? detail.targetId;
  const targetId = rawTarget?.startsWith("#")
    ? rawTarget.slice(1)
    : rawTarget;

  return targetId ? document.getElementById(targetId) : null;
}

function shouldPreventLenis(node: HTMLElement) {
  return Boolean(
    node.closest(
      [
        "[data-lenis-prevent]",
        "[data-lenis-prevent-wheel]",
        "[role='dialog']",
        ".github-activity-scroll",
        "input",
        "select",
        "textarea",
      ].join(","),
    ),
  );
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(reduceMotionQuery);
    const touchViewport = window.matchMedia(touchViewportQuery);

    if (reduceMotion.matches || touchViewport.matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.92,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.08,
      wheelMultiplier: 0.92,
      gestureOrientation: "vertical",
      prevent: shouldPreventLenis,
      autoRaf: false,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tickLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const sectionTargets = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-section]",
      );
      const revealTargets = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-reveal]",
      );

      const revealIn = (targets: Element[]) => {
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.54,
          ease: "power3.out",
          stagger: 0.055,
          overwrite: "auto",
        });
      };

      const revealOut = (targets: Element[]) => {
        gsap.to(targets, {
          autoAlpha: 0,
          y: 26,
          scale: 0.99,
          duration: 0.32,
          ease: "power2.out",
          stagger: 0.035,
          overwrite: "auto",
        });
      };

      gsap.set(sectionTargets, {
        autoAlpha: 0,
        y: 30,
        scale: 0.99,
        willChange: "transform, opacity",
      });

      ScrollTrigger.batch(sectionTargets, {
        start: "top 88%",
        end: "bottom 12%",
        onEnter: revealIn,
        onEnterBack: revealIn,
        onLeave: revealOut,
        onLeaveBack: revealOut,
      });

      gsap.set(revealTargets, {
        autoAlpha: 0,
        y: 22,
        scale: 0.985,
        willChange: "transform, opacity",
      });

      ScrollTrigger.batch(revealTargets, {
        start: "top 88%",
        end: "bottom 10%",
        onEnter: revealIn,
        onEnterBack: revealIn,
        onLeave: revealOut,
        onLeaveBack: revealOut,
      });

      gsap.to(".theme-banner-layer", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: ".theme-banner-frame",
          start: "top top",
          end: "bottom top",
          scrub: 0.55,
        },
      });

      gsap.fromTo(
        ".profile-section",
        { autoAlpha: 0, y: 16, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        },
      );
    }, scopeRef);

    const refreshFrame = window.requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    function handleSmoothScrollTo(event: Event) {
      const customEvent = event as CustomEvent<SmoothScrollToDetail>;
      const target = getAnchorTarget(customEvent.detail ?? {});

      if (!target) {
        return;
      }

      customEvent.preventDefault();
      lenis.scrollTo(lenis.scroll, {
        immediate: true,
        force: true,
      });
      lenis.scrollTo(target, {
        offset: 0,
        lerp: 0.12,
        duration: undefined,
        easing: undefined,
        force: true,
        onComplete: () => customEvent.detail?.onComplete?.(),
      });
    }

    window.addEventListener(scrollToEventName, handleSmoothScrollTo);

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener(scrollToEventName, handleSmoothScrollTo);
      context.revert();
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(tickLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={scopeRef} data-smooth-scroll-root>
      {children}
    </div>
  );
}
