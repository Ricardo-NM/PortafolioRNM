import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const githubResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 403,
          months: [
            {
              firstDay: "2026-01-01",
              name: "Jan",
              totalWeeks: 5,
              year: 2026,
            },
          ],
          weeks: [
            {
              firstDay: "2026-01-04",
              contributionDays: [
                {
                  contributionCount: 0,
                  contributionLevel: "NONE",
                  date: "2026-01-04",
                  weekday: 0,
                },
                {
                  contributionCount: 4,
                  contributionLevel: "SECOND_QUARTILE",
                  date: "2026-01-05",
                  weekday: 1,
                },
              ],
            },
          ],
        },
      },
    },
  },
};

describe("GET /api/github-activity", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("requires GITHUB_TOKEN to keep GitHub credentials server-side", async () => {
    vi.stubEnv("GITHUB_TOKEN", "");

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe("Falta configurar GITHUB_TOKEN.");
  });

  it("fetches the public contribution calendar through GitHub GraphQL", async () => {
    vi.stubEnv("GITHUB_TOKEN", "ghp_test_token");
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => githubResponse,
      ok: true,
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=3600");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/graphql",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer ghp_test_token",
        }),
        method: "POST",
      }),
    );
    expect(body).toEqual({
      months: githubResponse.data.user.contributionsCollection
        .contributionCalendar.months,
      totalContributions: 403,
      weeks: githubResponse.data.user.contributionsCollection
        .contributionCalendar.weeks,
    });
  });
});
