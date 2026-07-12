import { cvFileName, readCvFile } from "@/lib/server/cv";

export const runtime = "nodejs";

export async function GET() {
  const file = await readCvFile();

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Disposition": `attachment; filename="${cvFileName}"`,
      "Content-Length": String(file.byteLength),
      "Content-Type": "application/pdf",
    },
  });
}
