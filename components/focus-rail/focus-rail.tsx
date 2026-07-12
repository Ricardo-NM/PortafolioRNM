"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  type PanInfo,
  type Transition,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  tech?: FocusRailTech[];
};

type FocusRailTech = {
  name: string;
  iconSlug: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

function wrap(min: number, max: number, value: number) {
  const rangeSize = max - min;

  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

const BASE_SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const TAP_SPRING: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 18,
  mass: 1,
};

const projectActionButtonClass =
  "h-9 w-full min-w-0 gap-1.5 border-[#000] bg-[#000] px-2.5 text-[11px] font-semibold leading-none text-[#d4d4d8] hover:border-[#18181b] hover:bg-[#18181b] hover:text-[#fff] dark:border-[#fff] dark:bg-[#fff] dark:text-[#52525c] dark:hover:border-[#d4d4d8] dark:hover:bg-[#d4d4d8] dark:hover:text-[#000] min-[1440px]:w-auto min-[1440px]:gap-2 min-[1440px]:px-3 [&_svg]:shrink-0";

const techIconColorByTheme = {
  light: {
    base: "71717a",
    hover: "000",
  },
  dark: {
    base: "a1a1aa",
    hover: "fff",
  },
} as const;

function getSimpleIconUrl(
  iconSlug: string,
  theme: keyof typeof techIconColorByTheme,
  state: keyof (typeof techIconColorByTheme)["light"],
) {
  return `https://cdn.simpleicons.org/${iconSlug}/${techIconColorByTheme[theme][state]}`;
}

function ProjectTechIcon({ iconSlug, name }: FocusRailTech) {
  const iconUrls = {
    lightBase: getSimpleIconUrl(iconSlug, "light", "base"),
    lightHover: getSimpleIconUrl(iconSlug, "light", "hover"),
    darkBase: getSimpleIconUrl(iconSlug, "dark", "base"),
    darkHover: getSimpleIconUrl(iconSlug, "dark", "hover"),
  };

  return (
    <span
      aria-label={name}
      className="group/project-tech relative grid h-8 w-8 place-items-center rounded-md bg-transparent"
      title={name}
    >
      <span className="relative block h-4 w-4 overflow-hidden">
        <span
          className="project-tech-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-100 transition-opacity duration-300 group-hover/project-tech:opacity-0 dark:opacity-0"
          style={{ backgroundImage: `url(${iconUrls.lightBase})` }}
        />
        <span
          className="project-tech-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-300 group-hover/project-tech:opacity-100 dark:opacity-0 dark:group-hover/project-tech:opacity-0"
          style={{ backgroundImage: `url(${iconUrls.lightHover})` }}
        />
        <span
          className="project-tech-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-300 dark:opacity-100 dark:group-hover/project-tech:opacity-0"
          style={{ backgroundImage: `url(${iconUrls.darkBase})` }}
        />
        <span
          className="project-tech-icon-layer absolute inset-0 bg-contain bg-center bg-no-repeat opacity-0 transition-opacity duration-300 dark:group-hover/project-tech:opacity-100"
          style={{ backgroundImage: `url(${iconUrls.darkHover})` }}
        />
      </span>
    </span>
  );
}

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const count = items.length;
  const activeIndex = count > 0 ? wrap(0, count, active) : 0;
  const activeItem = items[activeIndex];
  const isMobileRail = useMediaQuery("(max-width: 639px)");

  const handlePrev = React.useCallback(() => {
    if (count === 0 || (!loop && active === 0)) {
      return;
    }

    setActive((current) => current - 1);
  }, [active, count, loop]);

  const handleNext = React.useCallback(() => {
    if (count === 0 || (!loop && active === count - 1)) {
      return;
    }

    setActive((current) => current + 1);
  }, [active, count, loop]);

  React.useEffect(() => {
    if (!autoPlay || isHovering || count <= 1) {
      return;
    }

    const timer = window.setInterval(handleNext, interval);

    return () => window.clearInterval(timer);
  }, [autoPlay, count, handleNext, interval, isHovering]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      handlePrev();
    }

    if (event.key === "ArrowRight") {
      handleNext();
    }
  }

  const swipeConfidenceThreshold = 10000;

  function swipePower(offset: number, velocity: number) {
    return Math.abs(offset) * velocity;
  }

  function handleCardDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  }

  const visibleRailItems = React.useMemo(() => {
    if (count === 0) {
      return [];
    }

    const visibleOffsets = count <= 3 ? [-1, 0, 1] : [-2, -1, 0, 1, 2];

    return visibleOffsets.flatMap((offset) => {
      const absoluteIndex = active + offset;

      if (!loop && (absoluteIndex < 0 || absoluteIndex >= count)) {
        return [];
      }

      return [
        {
          distance: Math.abs(offset),
          isCenter: offset === 0,
          item: items[wrap(0, count, absoluteIndex)],
          offset,
        },
      ];
    });
  }, [active, count, items, loop]);

  if (count === 0 || !activeItem) {
    return null;
  }

  return (
    <div
      aria-label="Carrusel de proyectos"
      className={cn(
        "group relative flex min-h-[520px] w-full flex-col overflow-hidden bg-background text-foreground outline-none select-none",
        className,
      )}
      data-project-focus-rail="true"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="region"
      tabIndex={0}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          alt=""
          className="hidden scale-110 object-cover opacity-[0.08] blur-3xl saturate-150 dark:opacity-[0.16] sm:block"
          fill
          sizes="(min-width: 768px) 68vw, 100vw"
          src={activeItem.imageSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center py-6">
        <div className="relative mx-auto flex h-[220px] w-full max-w-5xl touch-pan-y items-center justify-center overflow-visible [perspective:900px] sm:h-[300px] sm:[perspective:1200px]">
          {visibleRailItems.map(({ distance, isCenter, item, offset }) => {
            const xOffset = offset * (isMobileRail ? 210 : 320);
            const zOffset = -distance * (isMobileRail ? 80 : 180);
            const sideScale = isMobileRail ? 0.92 : 0.84;
            const scale = isCenter ? 1 : sideScale;
            const rotateY = isMobileRail ? 0 : offset * -20;
            const opacity = isCenter ? 1 : Math.max(0.24, 1 - distance * 0.34);
            const shouldUseHeavyEffects = !isMobileRail;
            const blur = shouldUseHeavyEffects ? distance * 3 : 0;
            const brightness = shouldUseHeavyEffects ? (isCenter ? 1 : 0.72) : 1;

            return (
              <motion.button
                aria-label={`Ver ${item.title}`}
                animate={{
                  filter: shouldUseHeavyEffects
                    ? `blur(${blur}px) brightness(${brightness})`
                    : "none",
                  opacity,
                  rotateY,
                  scale,
                  x: xOffset,
                  z: zOffset,
                }}
                className={cn(
                  "project-focus-rail-card absolute aspect-[4/3] w-[78vw] max-w-[292px] overflow-hidden rounded-lg outline-none transition-shadow duration-300 sm:w-[360px] sm:max-w-none",
                  isCenter
                    ? "z-30 cursor-grab active:cursor-grabbing"
                    : "z-20 cursor-pointer",
                )}
                data-active={isCenter}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                dragMomentum={false}
                dragSnapToOrigin
                initial={false}
                key={item.id}
                onClick={() => {
                  if (!isCenter) {
                    setActive((current) => current + offset);
                  }
                }}
                onDragEnd={isCenter ? handleCardDragEnd : undefined}
                style={{
                  willChange: "transform, opacity",
                }}
                transition={{
                  filter: BASE_SPRING,
                  opacity: BASE_SPRING,
                  rotateY: BASE_SPRING,
                  scale: TAP_SPRING,
                  x: BASE_SPRING,
                  z: BASE_SPRING,
                }}
                type="button"
                whileTap={isCenter ? { scale: 0.98 } : undefined}
              >
                <Image
                  alt={item.title}
                  className="object-contain"
                  draggable={false}
                  fill
                  loading={isCenter ? "eager" : "lazy"}
                  sizes="(min-width: 640px) 360px, 250px"
                  src={item.imageSrc}
                />
                {!isCenter && shouldUseHeavyEffects ? (
                  <span className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" />
                ) : null}
              </motion.button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col items-center justify-between gap-5 px-4 sm:px-6 min-[1200px]:flex-row">
          <div className="min-h-28 flex-1 text-center min-[1200px]:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="project-copy-motion"
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                key={activeItem.id}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5] sm:text-2xl">
                  {activeItem.title}
                </h3>
                {activeItem.description ? (
                  <p className="mt-3 max-w-2xl text-[13px] font-medium leading-relaxed text-[#52525c] dark:text-[#a1a1aa] sm:text-sm">
                    {activeItem.description}
                  </p>
                ) : null}
                {activeItem.tech?.length ? (
                  <ul className="mt-4 flex flex-wrap justify-center gap-2 min-[1200px]:justify-start">
                    {activeItem.tech.map((tech) => (
                      <li key={`${activeItem.id}-${tech.name}`}>
                        <ProjectTechIcon
                          iconSlug={tech.iconSlug}
                          name={tech.name}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {activeItem.href ? (
              <motion.div
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="project-action-motion shrink-0"
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                key={activeItem.id}
                transition={{ duration: 0.28, delay: 0.05 }}
              >
                <Button asChild className={projectActionButtonClass}>
                  <Link href={activeItem.href} target="_blank">
                    Ver proyecto
                    <ArrowUpRight size={13} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
