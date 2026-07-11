export const runtime = "nodejs";

const githubGraphqlEndpoint = "https://api.github.com/graphql";
const githubLogin = "Ricardo-NM";

const contributionCalendarQuery = `
  query ContributionCalendar($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          months {
            firstDay
            name
            totalWeeks
            year
          }
          weeks {
            firstDay
            contributionDays {
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

type GitHubContributionCalendarResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          months: Array<{
            firstDay: string;
            name: string;
            totalWeeks: number;
            year: number;
          }>;
          weeks: Array<{
            firstDay: string;
            contributionDays: Array<{
              contributionCount: number;
              contributionLevel: string;
              date: string;
              weekday: number;
            }>;
          }>;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return Response.json(
      { error: "Falta configurar GITHUB_TOKEN." },
      { status: 503 },
    );
  }

  const response = await fetch(githubGraphqlEndpoint, {
    body: JSON.stringify({
      query: contributionCalendarQuery,
      variables: { login: githubLogin },
    }),
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const payload =
    (await response.json()) as GitHubContributionCalendarResponse;
  const calendar =
    payload.data?.user?.contributionsCollection?.contributionCalendar;

  if (!response.ok || !calendar) {
    return Response.json(
      {
        error:
          payload.errors?.[0]?.message ??
          "No se pudo cargar la actividad de GitHub.",
      },
      { status: response.ok ? 502 : response.status },
    );
  }

  return Response.json(
    {
      months: calendar.months,
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    },
    {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
