import { describe, expect, it } from "vitest";

import { GET } from "./route";

describe("GET /api/cv", () => {
  it("returns the CV PDF as a downloadable attachment", async () => {
    const response = await GET();
    const bytes = Buffer.from(await response.arrayBuffer());

    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(response.headers.get("content-disposition")).toBe(
      'attachment; filename="CV-Ricardo_Nava_Mayoral.pdf"',
    );
    expect(bytes.subarray(0, 4).toString("utf8")).toBe("%PDF");
  });
});
