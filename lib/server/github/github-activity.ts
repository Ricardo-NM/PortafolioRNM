export const githubGraphqlEndpoint = "https://api.github.com/graphql";
export const githubLogin = "Ricardo-NM";

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

export type GitHubContributionCalendarResponse = {
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

export async function fetchGitHubContributionCalendar(
  token: string,
  fetchImpl: typeof fetch = fetch,
) {
  const response = await fetchImpl(githubGraphqlEndpoint, {
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
    return {
      calendar: null,
      error:
        payload.errors?.[0]?.message ??
        "No se pudo cargar la actividad de GitHub.",
      status: response.ok ? 502 : response.status,
    };
  }

  return {
    calendar,
    error: null,
    status: 200,
  };
}
