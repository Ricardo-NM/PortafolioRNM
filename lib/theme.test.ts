import { describe, expect, it } from "vitest";
import { getNextTheme } from "./theme";

describe("getNextTheme", () => {
  it("switches dark theme back to light", () => {
    expect(getNextTheme("dark")).toBe("light");
  });

  it("switches light, system, or unresolved themes to dark", () => {
    expect(getNextTheme("light")).toBe("dark");
    expect(getNextTheme("system")).toBe("dark");
    expect(getNextTheme(undefined)).toBe("dark");
  });
});
