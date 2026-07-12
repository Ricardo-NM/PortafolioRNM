import { describe, expect, it, vi } from "vitest";

import { fetchGitHubContributionCalendar } from "@/lib/server/github/github-activity";

describe("GitHub activity server client", () => {
  it("fetches and normalizes the contribution calendar", async () => {
    const calendar = {
      months: [{ firstDay: "2026-01-01", name: "Jan", totalWeeks: 5, year: 2026 }],
      totalContributions: 12,
      weeks: [{ firstDay: "2026-01-04", contributionDays: [] }],
    };
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        data: {
          user: {
            contributionsCollection: {
              contributionCalendar: calendar,
            },
          },
        },
      }),
      ok: true,
      status: 200,
    });

    const result = await fetchGitHubContributionCalendar("ghp_test", fetchMock);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.objectContaining({
        body: expect.stringContaining('"login":"Ricardo-NM"'),
        headers: expect.objectContaining({
          Authorization: "Bearer ghp_test",
        }),
        method: "POST",
      }),
    );
    expect(result).toEqual({
      calendar,
      error: null,
      status: 200,
    });
  });
});
