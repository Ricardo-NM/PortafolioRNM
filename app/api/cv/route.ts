import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const cvFileName = "CV-Ricardo_Nava_Mayoral.pdf";

export async function GET() {
  const cvPath = path.join(process.cwd(), "assets", "docs", cvFileName);
  const file = await readFile(cvPath);

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Disposition": `attachment; filename="${cvFileName}"`,
      "Content-Length": String(file.byteLength),
      "Content-Type": "application/pdf",
    },
  });
}
