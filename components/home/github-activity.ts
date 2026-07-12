export type GitHubContributionDay = {
  contributionCount: number;
  contributionLevel: string;
  date: string;
  weekday: number;
};

export type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
  firstDay: string;
};

export type GitHubContributionMonth = {
  firstDay: string;
  name: string;
  totalWeeks: number;
  year: number;
};

export type GitHubActivity = {
  months: GitHubContributionMonth[];
  totalContributions: number;
  weeks: GitHubContributionWeek[];
};

export const githubContributionLevelClassNames = [
  "bg-[#f4f4f5] dark:bg-[#18181b]",
  "bg-[#d4d4d8] dark:bg-[#3f3f46]",
  "bg-[#a1a1aa] dark:bg-[#71717a]",
  "bg-[#52525c] dark:bg-[#d4d4d8]",
  "bg-[#18181b] dark:bg-[#f4f4f5]",
];

const githubContributionLevelMap: Record<string, number> = {
  FIRST_QUARTILE: 1,
  FOURTH_QUARTILE: 4,
  NONE: 0,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
};

const githubMonthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const githubActivityFallbackStartDate = Date.UTC(2025, 6, 6);
const millisecondsPerDay = 24 * 60 * 60 * 1000;

export const githubActivityFallbackWeeks = Array.from({ length: 53 }, (_, index) => {
  const firstDay = new Date(
    githubActivityFallbackStartDate + index * 7 * millisecondsPerDay,
  );

  return {
    contributionDays: Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(firstDay.getTime() + dayIndex * millisecondsPerDay);

      return {
        contributionCount: 0,
        contributionLevel: "NONE",
        date: date.toISOString().slice(0, 10),
        weekday: dayIndex,
      };
    }),
    firstDay: firstDay.toISOString().slice(0, 10),
  };
});

export const githubActivityFallbackMonths = [
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
].map((name, index) => ({
  firstDay: "",
  name,
  totalWeeks: index % 2 === 0 ? 4 : 5,
  year: 2026,
}));

export function getGitHubContributionLevelIndex(contributionLevel: string) {
  return githubContributionLevelMap[contributionLevel] ?? 0;
}

export function getGitHubWeekDate(week: GitHubContributionWeek) {
  const date =
    week.contributionDays.find((day) => day.date)?.date ?? week.firstDay;
  const timestamp = Date.parse(`${date}T00:00:00.000Z`);

  return Number.isNaN(timestamp) ? null : new Date(timestamp);
}

export function getGitHubMonthLabels(
  weeks: GitHubContributionWeek[],
  fallbackMonths: GitHubContributionMonth[],
) {
  const labels: Array<GitHubContributionMonth & { monthKey: string }> = [];

  weeks.forEach((week) => {
    const weekDate = getGitHubWeekDate(week);

    if (!weekDate) {
      if (labels.length > 0) {
        labels[labels.length - 1].totalWeeks += 1;
      }

      return;
    }

    const month = weekDate.getUTCMonth();
    const year = weekDate.getUTCFullYear();
    const monthKey = `${year}-${month}`;
    const lastLabel = labels[labels.length - 1];

    if (lastLabel?.monthKey === monthKey) {
      lastLabel.totalWeeks += 1;
      return;
    }

    labels.push({
      firstDay: weekDate.toISOString().slice(0, 10),
      monthKey,
      name: githubMonthNames[month],
      totalWeeks: 1,
      year,
    });
  });

  return labels.length > 0 ? labels : fallbackMonths;
}

export function isGitHubActivity(
  value: GitHubActivity | { error?: string },
): value is GitHubActivity {
  return (
    "months" in value &&
    "totalContributions" in value &&
    "weeks" in value &&
    Array.isArray(value.months) &&
    Array.isArray(value.weeks) &&
    typeof value.totalContributions === "number"
  );
}
