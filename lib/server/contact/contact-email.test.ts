import { describe, expect, it } from "vitest";

import {
  buildContactEmailHtml,
  buildContactEmailText,
} from "@/lib/server/contact/contact-email";

describe("contact email builders", () => {
  it("escapes contact values in the HTML email", () => {
    const html = buildContactEmailHtml({
      fullName: "<Ricardo>",
      email: "ricardo@example.com",
      message: "Hola <script>alert(1)</script>",
    });

    expect(html).toContain("&lt;Ricardo&gt;");
    expect(html).toContain("Hola &lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<Ricardo>");
    expect(html).not.toContain("<script>alert(1)</script>");
  });

  it("builds a readable plain-text fallback", () => {
    expect(
      buildContactEmailText({
        fullName: "Ricardo Nava",
        email: "ricardo@example.com",
        message: "Hola desde el portafolio.",
      }),
    ).toBe(
      [
        "Nuevo mensaje de contacto",
        "Nombre: Ricardo Nava",
        "Correo: ricardo@example.com",
        "Mensaje:",
        "Hola desde el portafolio.",
      ].join("\n"),
    );
  });
});
