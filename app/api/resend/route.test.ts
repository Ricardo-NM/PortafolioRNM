import { describe, expect, it, vi } from "vitest";

const sendEmail = vi.fn();

const Resend = vi.fn(function ResendMock(this: unknown) {
  return {
    emails: {
      send: sendEmail,
    },
  };
});

vi.mock("resend", () => ({
  Resend,
}));

describe("POST /api/resend", () => {
  it("sends the contact message with Resend", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-token");
    vi.stubEnv(
      "RESEND_FROM_EMAIL",
      "Portfolio RNM <contacto@resend.example.com>",
    );
    vi.stubEnv("CONTACT_RECIPIENT_EMAIL", "lic.ricardo.nm@gmail.com");

    sendEmail.mockResolvedValue({
      data: { id: "email-id" },
      error: null,
    });

    const { POST } = await import("./route");
    const response = await POST(
      new Request("http://localhost/api/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: "Ricardo Nava",
          email: "ricardo@example.com",
          message: "Hola desde el portafolio.",
          website: "",
        }),
      }),
    );

    expect(Resend).toHaveBeenCalledWith("test-token");
    expect(sendEmail).toHaveBeenCalledWith({
      from: "Portfolio RNM <contacto@resend.example.com>",
      to: ["lic.ricardo.nm@gmail.com"],
      replyTo: "ricardo@example.com",
      subject: "Nuevo mensaje desde el portafolio",
      html: expect.stringContaining("Ricardo Nava"),
      text: expect.stringContaining("Hola desde el portafolio."),
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ id: "email-id" });
  });

  it("rejects requests that trip the anti-spam limits", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-token");
    vi.stubEnv(
      "RESEND_FROM_EMAIL",
      "Portfolio RNM <contacto@resend.example.com>",
    );
    vi.stubEnv("CONTACT_RECIPIENT_EMAIL", "lic.ricardo.nm@gmail.com");

    sendEmail.mockResolvedValue({
      data: { id: "email-id" },
      error: null,
    });

    const { POST } = await import("./route");

    for (let index = 0; index < 5; index += 1) {
      await POST(
        new Request("http://localhost/api/resend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": "203.0.113.10",
          },
          body: JSON.stringify({
            fullName: `Ricardo ${index}`,
            email: `ricardo${index}@example.com`,
            message: "Hola desde el portafolio.",
            website: "",
          }),
        }),
      );
    }

    const limitedResponse = await POST(
      new Request("http://localhost/api/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "203.0.113.10",
        },
        body: JSON.stringify({
          fullName: "Ricardo Nava",
          email: "ricardo@example.com",
          message: "Hola desde el portafolio.",
          website: "",
        }),
      }),
    );

    expect(limitedResponse.status).toBe(429);
    await expect(limitedResponse.json()).resolves.toEqual({
      error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos.",
    });
  });
});
