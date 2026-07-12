import { Resend } from "resend";

import {
  buildContactEmailHtml,
  buildContactEmailText,
} from "@/lib/server/contact/contact-email";
import {
  getClientIdentifier,
  isRateLimited,
  readContactFormValues,
} from "@/lib/server/contact/contact-request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

  if (!apiKey) {
    return Response.json(
      { error: "Falta configurar RESEND_API_KEY." },
      { status: 500 },
    );
  }

  if (!fromAddress) {
    return Response.json(
      {
        error:
          "Falta configurar RESEND_FROM_EMAIL con un remitente verificado.",
      },
      { status: 500 },
    );
  }

  if (!recipientEmail) {
    return Response.json(
      { error: "Falta configurar CONTACT_RECIPIENT_EMAIL." },
      { status: 500 },
    );
  }

  if (fromAddress.toLowerCase().includes("@gmail.com")) {
    return Response.json(
      {
        error:
          "RESEND_FROM_EMAIL no puede usar gmail.com. Usa un dominio verificado en Resend.",
      },
      { status: 500 },
    );
  }

  const contact = await readContactFormValues(request);

  if (!contact) {
    return Response.json(
      { error: "Los campos del formulario son obligatorios." },
      { status: 400 },
    );
  }

  if (contact.website) {
    return Response.json(
      { error: "Solicitud rechazada por verificación anti-spam." },
      { status: 400 },
    );
  }

  const clientIdentifier = getClientIdentifier(request);

  if (isRateLimited(clientIdentifier)) {
    return Response.json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." },
      { status: 429 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = "Nuevo mensaje desde el portafolio";
  const html = buildContactEmailHtml(contact);
  const text = buildContactEmailText(contact);

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: [recipientEmail],
    replyTo: contact.email,
    subject,
    html,
    text,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ id: data?.id ?? null });
}
