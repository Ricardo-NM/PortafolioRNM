"use client";

import { useEffect, useRef, useState } from "react";

import {
  getGitHubContributionLevelIndex,
  getGitHubMonthLabels,
  githubActivityFallbackMonths,
  githubActivityFallbackWeeks,
  githubContributionLevelClassNames,
  isGitHubActivity,
  type GitHubActivity,
} from "@/components/home/github-activity";
import { ViewportGuideLine } from "@/components/home/viewport-guide-line";
export function GitHubActivitySection() {
  const [activity, setActivity] = useState<GitHubActivity | null>(null);
  const [activityError, setActivityError] = useState<string | null>(null);
  const activityScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubActivity() {
      try {
        const response = await fetch("/api/github-activity");
        const payload = (await response.json()) as
          | GitHubActivity
          | { error?: string };

        if (!isMounted) {
          return;
        }

        const errorMessage = "error" in payload ? payload.error : undefined;

        if (!response.ok || errorMessage || !isGitHubActivity(payload)) {
          setActivityError(
            errorMessage ?? "No se pudo cargar la actividad de GitHub.",
          );
          return;
        }

        setActivity(payload);
      } catch {
        if (isMounted) {
          setActivityError("No se pudo cargar la actividad de GitHub.");
        }
      }
    }

    loadGitHubActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const scrollElement = activityScrollRef.current;

    if (!scrollElement) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollElement.scrollLeft =
        scrollElement.scrollWidth - scrollElement.clientWidth;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activity]);

  const weeks = activity?.weeks ?? githubActivityFallbackWeeks;
  const months = getGitHubMonthLabels(
    weeks,
    activity?.months ?? githubActivityFallbackMonths,
  );
  const totalContributions = activity?.totalContributions;

  return (
    <section
      aria-labelledby="github-activity-title"
      className="relative bg-background px-3"
      data-scroll-section
    >
      <div className="github-activity-section-title-row relative flex h-12 items-center">
        <ViewportGuideLine position="top" scope="github-activity" />

        <h2
          id="github-activity-title"
          className="text-base font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]"
        >
          Actividad de GitHub
        </h2>

        <ViewportGuideLine position="bottom" scope="github-activity" />
      </div>

      <div className="github-activity-calendar py-4">
        <div
          aria-label="Calendario de contribuciones"
          className="github-activity-frame rounded-md border border-[#e4e4e7] bg-transparent dark:border-[#27272a]"
          role="img"
        >
          <div
            ref={activityScrollRef}
            className="github-activity-scroll overflow-x-auto p-3"
          >
            <div className="github-activity-grid min-w-[686px] w-full">
              <div
                aria-hidden="true"
                className="grid w-full gap-[3px] overflow-visible text-[11px] font-medium leading-none text-[#71717a] dark:text-[#a1a1aa]"
                style={{
                  gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
                }}
              >
                {months.map((month) => (
                  <span
                    key={`${month.name}-${month.year}-${month.firstDay}`}
                    className="whitespace-nowrap last:justify-self-end"
                    style={{ gridColumn: `span ${month.totalWeeks}` }}
                  >
                    {month.name}
                  </span>
                ))}
              </div>

              <div className="mt-2">
                <div
                  className="grid w-full auto-cols-[minmax(10px,1fr)] grid-flow-col grid-rows-7 gap-[3px]"
                  role="presentation"
                >
                  {weeks.map((week) =>
                    week.contributionDays.map((day) => {
                      const levelIndex = getGitHubContributionLevelIndex(
                        day.contributionLevel,
                      );

                      return (
                        <span
                          key={`${week.firstDay}-${day.weekday}-${day.date}`}
                          aria-label={
                            day.date
                              ? `${day.contributionCount} contribuciones el ${day.date}`
                              : "Sin contribuciones"
                          }
                          className={`aspect-square w-full rounded-[2px] ${githubContributionLevelClassNames[levelIndex]}`}
                          title={
                            day.date
                              ? `${day.contributionCount} contribuciones el ${day.date}`
                              : undefined
                          }
                        />
                      );
                    }),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="github-activity-summary-row flex items-center justify-between gap-3 px-3 pb-3">
            <p className="github-activity-summary-text min-w-0 truncate text-[11px] font-semibold leading-none text-[#18181b] dark:text-[#f4f4f5] sm:text-[13px]">
              {typeof totalContributions === "number"
                ? `${totalContributions} contribuciones en el último año`
                : "Cargando actividad de GitHub"}
            </p>

            <div className="github-activity-legend ml-auto flex shrink-0 items-center justify-end gap-1.5 text-[10px] font-medium leading-none text-[#52525c] dark:text-[#d4d4d8] sm:text-[11px]">
              <span>Menos</span>
              {githubContributionLevelClassNames.map((levelClassName) => (
                <span
                  key={levelClassName}
                  aria-hidden="true"
                  className={`h-[7px] w-[7px] rounded-[2px] sm:h-[8px] sm:w-[8px] ${levelClassName}`}
                />
              ))}
              <span>Más</span>
            </div>
          </div>
        </div>

        {activityError && (
          <p className="github-activity-error-message mt-2 text-right text-[11px] font-medium leading-snug text-[#71717a] dark:text-[#a1a1aa]">
            {activityError}
          </p>
        )}
      </div>
    </section>
  );
}
