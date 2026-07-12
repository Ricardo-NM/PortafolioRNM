import { describe, expect, it } from "vitest";

import {
  createRateLimiter,
  getClientIdentifier,
  readContactFormValues,
} from "@/lib/server/contact/contact-request";

describe("contact request helpers", () => {
  it("trims valid contact form values", async () => {
    const values = await readContactFormValues(
      new Request("http://localhost/api/resend", {
        body: JSON.stringify({
          fullName: " Ricardo Nava ",
          email: " ricardo@example.com ",
          message: " Hola ",
          website: "",
        }),
        method: "POST",
      }),
    );

    expect(values).toEqual({
      fullName: "Ricardo Nava",
      email: "ricardo@example.com",
      message: "Hola",
      website: "",
    });
  });

  it("rejects missing required contact form values", async () => {
    await expect(
      readContactFormValues(
        new Request("http://localhost/api/resend", {
          body: JSON.stringify({
            fullName: "Ricardo Nava",
            email: "",
            message: "Hola",
            website: "",
          }),
          method: "POST",
        }),
      ),
    ).resolves.toBeNull();
  });

  it("uses the first forwarded address as client identifier", () => {
    const request = new Request("http://localhost/api/resend", {
      headers: {
        "x-forwarded-for": "203.0.113.10, 203.0.113.11",
      },
    });

    expect(getClientIdentifier(request)).toBe("203.0.113.10");
  });

  it("limits requests after the configured window capacity", () => {
    const isRateLimited = createRateLimiter({
      maxRequestsPerWindow: 2,
      rateLimitWindowMs: 1000,
    });

    expect(isRateLimited("203.0.113.10")).toBe(false);
    expect(isRateLimited("203.0.113.10")).toBe(false);
    expect(isRateLimited("203.0.113.10")).toBe(true);
  });
});
