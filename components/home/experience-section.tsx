import Image from "next/image";
import { type ReactNode } from "react";

import { AnimatedTabs } from "@/components/animated-tabs/animated-tabs";
import { ContentGuideLine } from "@/components/home/content-guide-line";
import { experiences } from "@/components/home/home-data";
import { ViewportGuideLine } from "@/components/home/viewport-guide-line";
function ExperienceMotionBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`experience-content-motion ${className}`}
    >
      {children}
    </div>
  );
}

function ExperienceTabLabel({
  experience,
}: {
  experience: (typeof experiences)[number];
}) {
  return (
    <span className="flex min-w-0 items-center justify-center gap-2">
      <span className="experience-tab-logo grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[#e4e4e7] bg-[#fff] p-0.5 shadow-[0_1px_4px_rgba(24,24,27,0.1)] dark:border-[#27272a] dark:shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
        <Image
          src={experience.image}
          alt=""
          sizes="24px"
          className="h-full w-full object-contain"
        />
      </span>
      <span className="truncate">{experience.company}</span>
    </span>
  );
}

function ExperienceDetails({
  experience,
}: {
  experience: (typeof experiences)[number];
}) {
  return (
    <article className="experience-tab-panel relative">
      <div className="experience-detail-heading-grid grid grid-cols-[minmax(0,1fr)_max-content] gap-x-4 gap-y-1 pt-3 pb-3">
        <ExperienceMotionBlock className="flex min-w-0 items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#e4e4e7] bg-[#fff] shrink-0 p-1 shadow-[0_1px_4px_rgba(24,24,27,0.1)] dark:border-[#27272a] dark:shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            <Image
              src={experience.image}
              alt=""
              sizes="40px"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5] sm:text-[15px]">
              {experience.company}
            </h3>
            <p className="mt-0.5 text-xs font-medium leading-tight text-[#52525c] dark:text-[#a1a1aa] sm:mt-1 sm:text-sm">
              {experience.role}
            </p>
          </div>
        </ExperienceMotionBlock>

        <ExperienceMotionBlock className="min-w-0 text-right">
          <p className="text-xs font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5] sm:text-[13px]">
            {experience.date}
          </p>
          <p className="mt-1 text-xs font-medium leading-none text-[#71717a] dark:text-[#a1a1aa] sm:mt-2">
            {experience.mode}
          </p>
        </ExperienceMotionBlock>
      </div>

      <div className="experience-detail-stat-row relative -mx-3 px-3">
        <ContentGuideLine position="top" />
        <ContentGuideLine
          position="middle"
          className="min-[1200px]:hidden"
          centerDot
          lineClassName="stats-row-guide-line"
          dotClassName="stats-row-guide-dot"
        />

        <div className="grid auto-rows-fr grid-cols-2 min-[1200px]:grid-cols-4">
          {experience.stats.map((stat, statIndex) => (
            <div
              key={`${experience.id}-${stat.label}`}
              className="relative flex min-h-14 flex-col items-center justify-center px-3 py-3 text-center min-[1200px]:px-4"
            >
              {statIndex % 2 === 0 ? (
                <span
                  aria-hidden="true"
                  className="stats-column-guide blueprint-mask-y pointer-events-none absolute top-0 right-0 h-full w-[2px] translate-x-1/2 text-foreground opacity-[0.18] min-[1200px]:hidden"
                />
              ) : null}
              {statIndex % 2 === 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="stats-column-guide-dot blueprint-dot pointer-events-none absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 min-[1200px]:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="stats-column-guide-dot blueprint-dot pointer-events-none absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 min-[1200px]:hidden"
                  />
                </>
              ) : null}
              {statIndex < experience.stats.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="stats-column-guide blueprint-mask-y pointer-events-none absolute top-0 right-0 hidden h-full w-[2px] translate-x-1/2 text-foreground opacity-[0.18] min-[1200px]:block"
                />
              ) : null}
              {statIndex < experience.stats.length - 1 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="stats-column-guide-dot blueprint-dot pointer-events-none absolute top-0 right-0 hidden translate-x-1/2 -translate-y-1/2 min-[1200px]:block"
                  />
                  <span
                    aria-hidden="true"
                    className="stats-column-guide-dot blueprint-dot pointer-events-none absolute right-0 bottom-0 hidden translate-x-1/2 translate-y-1/2 min-[1200px]:block"
                  />
                </>
              ) : null}
              <ExperienceMotionBlock>
                <p className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase leading-none text-[#71717a] dark:text-[#71717a]">
                  {stat.label}
                </p>
              </ExperienceMotionBlock>
            </div>
          ))}
        </div>

        <ContentGuideLine position="bottom" />
      </div>

      <div className="experience-detail-bullet-row relative -mx-3 px-3">
        <ExperienceMotionBlock>
          <ul className="list-disc space-y-2 py-4 pl-4 text-justify text-[13px] font-medium leading-5 text-[#52525c] dark:text-[#a1a1aa]">
            {experience.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </ExperienceMotionBlock>

        <ContentGuideLine position="bottom" />
      </div>

      <ExperienceMotionBlock className="flex flex-wrap gap-2 pt-3 pb-1">
        {experience.badges.map((badge) => (
          <span
            key={`${experience.id}-${badge}`}
            className="rounded border border-[#e4e4e7] bg-[#f4f4f5] px-2 py-1 text-[11px] font-medium leading-none text-[#52525c] dark:border-[#27272a] dark:bg-[#18181b] dark:text-[#d4d4d8]"
          >
            {badge}
          </span>
        ))}
      </ExperienceMotionBlock>
    </article>
  );
}

const experienceTabs = experiences.map((experience) => ({
  id: experience.id,
  label: <ExperienceTabLabel experience={experience} />,
  content: <ExperienceDetails experience={experience} />,
}));

export function ExperienceSection() {
  return (
    <section
      id="experiencia"
      aria-labelledby="experience-title"
      className="relative scroll-mt-24 bg-background px-3"
      data-scroll-section
    >
      <div className="experience-section-title-row relative flex h-12 items-center">
        <ViewportGuideLine position="top" scope="experience" />

        <h2
          id="experience-title"
          className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]"
        >
          Experiencia
        </h2>

        <ViewportGuideLine position="bottom" scope="experience" />
      </div>

      <AnimatedTabs
        tabs={experienceTabs}
        defaultTab={experiences[0]?.id}
        panelAnimation="fade"
        className="py-3"
      />
    </section>
  );
}
