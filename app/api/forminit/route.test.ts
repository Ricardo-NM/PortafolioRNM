import { describe, expect, it, vi } from "vitest";

const createForminitProxy = vi.fn(() => ({
  POST: vi.fn(),
}));

vi.mock("forminit/next", () => ({
  createForminitProxy,
}));

describe("POST /api/forminit", () => {
  it("creates a Forminit proxy with the server API key", async () => {
    vi.stubEnv("FORMINIT_API_KEY", "test-token");

    await import("./route");

    expect(createForminitProxy).toHaveBeenCalledWith({
      apiKey: "test-token",
    });
  });
});
