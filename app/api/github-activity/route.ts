import { fetchGitHubContributionCalendar } from "@/lib/server/github/github-activity";

export const runtime = "nodejs";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return Response.json(
      { error: "Falta configurar GITHUB_TOKEN." },
      { status: 503 },
    );
  }

  const { calendar, error, status } =
    await fetchGitHubContributionCalendar(token);

  if (!calendar) {
    return Response.json({ error }, { status });
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
