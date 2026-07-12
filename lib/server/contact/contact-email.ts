const portfolioUrl = "https://rnm-portafolio.vercel.app";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildContactEmailHtml(contact: {
  fullName: string;
  email: string;
  message: string;
}) {
  const safeName = escapeHtml(contact.fullName);
  const safeEmail = escapeHtml(contact.email);
  const safeMessage = escapeHtml(contact.message).replaceAll("\n", "<br />");
  const firstName = safeName.split(" ")[0] || safeName;

  return `<!DOCTYPE html>
<html lang="es" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">

<title>Nuevo mensaje de contacto</title>

<style>
  body, table, td, a {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  table, td {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
  }

  table {
    border-collapse: separate;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100% !important;
    background-color: #f4f4f5;
  }

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 620px) {
    .outer-padding {
      padding: 24px 14px !important;
    }

    .card {
      width: 100% !important;
      max-width: 100% !important;
    }

    .px {
      padding-left: 22px !important;
      padding-right: 22px !important;
    }

    .header-padding {
      padding-top: 34px !important;
      padding-bottom: 34px !important;
    }

    .stack {
      display: block !important;
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      border-right: 0 !important;
      border-bottom: 0 !important;
      text-align: left !important;
    }

    .stack + .stack {
      padding-top: 22px !important;
    }

    .message-box {
      border-radius: 8px !important;
    }

    .button {
      display: block !important;
      width: auto !important;
      max-width: 320px !important;
      margin: 0 auto !important;
      text-align: center !important;
    }
  }

  @media (prefers-color-scheme: dark) {
    body,
    .email-bg {
      background-color: #000000 !important;
    }

    .card {
      background-color: #0a0a0c !important;
      border-color: #333338 !important;
    }

    .text-main {
      color: #ffffff !important;
    }

    .text-muted {
      color: #8b8b93 !important;
    }

    .text-label {
      color: #7a7a82 !important;
    }

    .text-soft {
      color: #e4e4e7 !important;
    }

    .text-footer {
      color: #5a5a60 !important;
    }

    .divider {
      border-top-color: #2a2a2e !important;
    }

    .field-divider {
      border-right-color: #2a2a2e !important;
    }

    .message-box {
      background-color: #131316 !important;
    }

    .button {
      color: #ffffff !important;
      border-color: #ffffff !important;
    }

    .footer-link {
      color: #8b8b93 !important;
    }
  }

  [data-ogsc] body,
  [data-ogsc] .email-bg {
    background-color: #000000 !important;
  }

  [data-ogsc] .card {
    background-color: #0a0a0c !important;
    border-color: #333338 !important;
  }

  [data-ogsc] .text-main {
    color: #ffffff !important;
  }

  [data-ogsc] .text-muted {
    color: #8b8b93 !important;
  }

  [data-ogsc] .text-label {
    color: #7a7a82 !important;
  }

  [data-ogsc] .text-soft {
    color: #e4e4e7 !important;
  }

  [data-ogsc] .text-footer {
    color: #5a5a60 !important;
  }

  [data-ogsc] .divider {
    border-top-color: #2a2a2e !important;
  }

  [data-ogsc] .field-divider {
    border-right-color: #2a2a2e !important;
  }

  [data-ogsc] .message-box {
    background-color: #131316 !important;
  }

  [data-ogsc] .button {
    color: #ffffff !important;
    border-color: #ffffff !important;
  }

  [data-ogsc] .footer-link {
    color: #8b8b93 !important;
  }
</style>
</head>

<body style="margin:0;padding:0;background-color:#f4f4f5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    ${safeName} te escribió a través de tu portafolio &nbsp;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;&#8203;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-bg" bgcolor="#f4f4f5" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" class="outer-padding" style="padding:40px 16px;">

        <table
          role="presentation"
          class="card"
          width="600"
          cellpadding="0"
          cellspacing="0"
          bgcolor="#ffffff"
          style="width:600px;max-width:600px;background-color:#ffffff;border:1px dashed #d4d4d8;border-radius:12px;"
        >

          <tr>
            <td class="px header-padding" align="center" style="padding:34px 40px 34px 40px;">
              <div
                class="text-main"
                style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#202124;font-size:19px;font-weight:700;letter-spacing:0.3px;"
              >
                RICARDO NAVA MAYORAL
              </div>

              <div
                class="text-muted"
                style="font-family:'SFMono-Regular',Consolas,Menlo,'Liberation Mono',monospace;color:#8b8b93;font-size:13px;margin-top:4px;"
              >
                Desarrollador Full Stack<span style="color:#ff004a;">_</span>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px;" class="px">
              <div class="divider" style="border-top:1px dashed #d4d4d8;font-size:1px;line-height:1px;">&nbsp;</div>
            </td>
          </tr>

          <tr>
            <td class="px" style="padding:30px 40px 4px 40px;">
              <div
                class="text-main"
                style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#202124;font-size:23px;line-height:1.25;font-weight:700;"
              >
                Nuevo mensaje de contacto
              </div>

              <div
                class="text-muted"
                style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#8b8b93;font-size:14px;margin-top:6px;line-height:1.5;"
              >
                Alguien escribió a través del formulario de tu portafolio.
              </div>
            </td>
          </tr>

          <tr>
            <td class="px" style="padding:22px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td
                    class="stack field-divider"
                    width="50%"
                    valign="top"
                    style="padding:14px 20px 14px 0;border-right:1px dashed #d4d4d8;text-align:left;"
                  >
                    <div
                      class="text-label"
                      style="font-family:'SFMono-Regular',Consolas,Menlo,'Liberation Mono',monospace;color:#8b8b93;font-size:11px;letter-spacing:1px;text-transform:uppercase;"
                    >
                      Nombre completo
                    </div>

                    <div
                      class="text-main"
                      style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#202124;font-size:16px;font-weight:600;margin-top:7px;word-break:break-word;"
                    >
                      ${safeName}
                    </div>
                  </td>

                  <td
                    class="stack"
                    width="50%"
                    valign="top"
                    style="padding:14px 0 14px 20px;text-align:left;"
                  >
                    <div
                      class="text-label"
                      style="font-family:'SFMono-Regular',Consolas,Menlo,'Liberation Mono',monospace;color:#8b8b93;font-size:11px;letter-spacing:1px;text-transform:uppercase;"
                    >
                      Correo electrónico
                    </div>

                    <div style="margin-top:7px;">
                      <a
                        href="mailto:${safeEmail}"
                        style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#ff004a;font-size:16px;font-weight:600;text-decoration:none;word-break:break-word;"
                      >
                        ${safeEmail}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="px" style="padding:22px 40px 0 40px;">
              <div class="divider" style="border-top:1px dashed #d4d4d8;font-size:1px;line-height:1px;">&nbsp;</div>
            </td>
          </tr>

          <tr>
            <td class="px" style="padding:22px 40px 6px 40px;">
              <div
                class="text-label"
                style="font-family:'SFMono-Regular',Consolas,Menlo,'Liberation Mono',monospace;color:#8b8b93;font-size:11px;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;"
              >
                Mensaje
              </div>

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                class="message-box"
                bgcolor="#f1f1f3"
                style="background-color:#f1f1f3;border-radius:6px;"
              >
                <tr>
                  <td style="padding:16px 18px;border-left:3px solid #ff004a;">
                    <div
                      class="text-soft"
                      style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#3f3f46;font-size:15px;line-height:1.6;"
                    >
                      ${safeMessage}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="px" align="center" style="padding:30px 40px 6px 40px;">
              <a
                href="mailto:${safeEmail}"
                class="button"
                style="display:inline-block;border:1px solid #202124;border-radius:8px;color:#202124;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:13px 30px;"
              >
                Responder a ${firstName} →
              </a>
            </td>
          </tr>

          <tr>
            <td class="px" style="padding:30px 40px 0 40px;">
              <div class="divider" style="border-top:1px dashed #d4d4d8;font-size:1px;line-height:1px;">&nbsp;</div>
            </td>
          </tr>

          <tr>
            <td class="px" align="center" style="padding:22px 40px 34px 40px;">
              <div
                class="text-footer"
                style="font-family:'SFMono-Regular',Consolas,Menlo,'Liberation Mono',monospace;color:#a1a1aa;font-size:11px;line-height:1.8;"
              >
                Enviado automáticamente desde el formulario de contacto en<br>
                <a
                  href="${portfolioUrl}"
                  class="footer-link"
                  style="color:#71717a;text-decoration:underline;"
                >
                  rnm-portafolio.vercel.app
                </a>
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactEmailText(contact: {
  fullName: string;
  email: string;
  message: string;
}) {
  return [
    "Nuevo mensaje de contacto",
    `Nombre: ${contact.fullName}`,
    `Correo: ${contact.email}`,
    "Mensaje:",
    contact.message,
  ].join("\n");
}
