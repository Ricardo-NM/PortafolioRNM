"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getNextAutoSkillIndex } from "@/components/home/auto-skills";
import { skillsData } from "@/components/home/home-data";
import { getSimpleIconUrl } from "@/components/home/simple-icons";
import { ViewportGuideLine } from "@/components/home/viewport-guide-line";
function SkillIcon({ iconSlug, name }: { iconSlug: string; name: string }) {
  const iconUrls = {
    lightBase: getSimpleIconUrl(iconSlug, "light", "base"),
    lightHover: getSimpleIconUrl(iconSlug, "dark", "hover"),
    darkBase: getSimpleIconUrl(iconSlug, "dark", "base"),
    darkHover: getSimpleIconUrl(iconSlug, "light", "hover"),
  };

  return (
    <span
      aria-hidden="true"
      className="relative block h-3.5 w-3.5 shrink-0 overflow-hidden"
    >
      <span
        className="skill-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-100 transition-opacity duration-700 ease-in-out group-hover/skill:opacity-0 group-data-[auto-active=true]/skill:opacity-0 dark:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.lightBase})` }}
      />
      <span
        className="skill-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-700 ease-in-out group-hover/skill:opacity-100 group-data-[auto-active=true]/skill:opacity-100 dark:opacity-0 dark:group-hover/skill:opacity-0 dark:group-data-[auto-active=true]/skill:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.lightHover})` }}
      />
      <span
        className="skill-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-700 ease-in-out dark:opacity-100 dark:group-hover/skill:opacity-0 dark:group-data-[auto-active=true]/skill:opacity-0"
        style={{ backgroundImage: `url(${iconUrls.darkBase})` }}
      />
      <span
        className="skill-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-700 ease-in-out dark:group-hover/skill:opacity-100 dark:group-data-[auto-active=true]/skill:opacity-100"
        style={{ backgroundImage: `url(${iconUrls.darkHover})` }}
      />
      <span className="sr-only">{name}</span>
    </span>
  );
}

export function SkillsSection() {
  const [autoActiveSkillIndex, setAutoActiveSkillIndex] = useState<
    number | null
  >(null);
  const [isAutoSkillPaused, setIsAutoSkillPaused] = useState(true);
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const isSkillsInViewRef = useRef(false);
  const isWindowScrollingRef = useRef(false);
  const isSkillInteractionPausedRef = useRef(false);

  const syncAutoSkillPause = useCallback(() => {
    const shouldPause =
      !isSkillsInViewRef.current ||
      isWindowScrollingRef.current ||
      isSkillInteractionPausedRef.current;

    setIsAutoSkillPaused(shouldPause);

    if (shouldPause) {
      setAutoActiveSkillIndex(null);
    }
  }, []);

  useEffect(() => {
    if (isAutoSkillPaused) {
      return;
    }

    const activateNextSkill = () => {
      setAutoActiveSkillIndex((currentIndex) =>
        getNextAutoSkillIndex(currentIndex, skillsData.length),
      );
    };

    activateNextSkill();

    const intervalId = window.setInterval(activateNextSkill, 1800);

    return () => window.clearInterval(intervalId);
  }, [isAutoSkillPaused]);

  useEffect(() => {
    const skillsElement = skillsContainerRef.current;

    if (!skillsElement || typeof IntersectionObserver === "undefined") {
      isSkillsInViewRef.current = true;
      syncAutoSkillPause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSkillsInViewRef.current = entry.isIntersecting;
        syncAutoSkillPause();
      },
      { threshold: 0.15 },
    );

    observer.observe(skillsElement);

    return () => observer.disconnect();
  }, [syncAutoSkillPause]);

  useEffect(() => {
    function handleWindowScroll() {
      isWindowScrollingRef.current = true;
      syncAutoSkillPause();

      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        isWindowScrollingRef.current = false;
        syncAutoSkillPause();
      }, 180);
    }

    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);

      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [syncAutoSkillPause]);

  function pauseAutoSkillHover() {
    isSkillInteractionPausedRef.current = true;
    syncAutoSkillPause();
  }

  function resumeAutoSkillHover() {
    isSkillInteractionPausedRef.current = false;
    syncAutoSkillPause();
  }

  return (
    <section
      id="habilidades"
      aria-labelledby="skills-title"
      className="relative scroll-mt-24 bg-background px-3"
      data-scroll-section
    >
      <div className="skills-section-title-row relative flex h-12 items-center">
        <ViewportGuideLine position="top" scope="skills" />

        <h2
          id="skills-title"
          className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]"
        >
          Habilidades y Tecnologías
        </h2>

        <ViewportGuideLine position="bottom" scope="skills" />
      </div>

      <div
        className="flex flex-wrap gap-2 py-4"
        data-auto-skills="true"
        ref={skillsContainerRef}
        onBlur={resumeAutoSkillHover}
        onFocus={pauseAutoSkillHover}
        onPointerEnter={pauseAutoSkillHover}
        onPointerLeave={resumeAutoSkillHover}
      >
        {skillsData.map((skill, index) => (
          <div
            key={skill.name}
            className="group/skill flex h-8 flex-auto basis-auto items-center justify-center gap-2 rounded-md border border-[#d4d4d8] bg-transparent px-3 text-[12px] font-medium leading-none text-[#52525c] transition-colors duration-700 ease-in-out hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] data-[auto-active=true]:border-[#18181b] data-[auto-active=true]:bg-[#18181b] data-[auto-active=true]:text-[#fff] dark:border-[#3f3f46] dark:text-[#a1a1aa] dark:hover:border-[#fff] dark:hover:bg-[#fff] dark:hover:text-[#18181b] dark:data-[auto-active=true]:border-[#fff] dark:data-[auto-active=true]:bg-[#fff] dark:data-[auto-active=true]:text-[#18181b]"
            data-auto-active={autoActiveSkillIndex === index}
            data-skill-item
          >
            <SkillIcon iconSlug={skill.iconSlug} name={skill.name} />
            <span className="min-w-0 truncate">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

