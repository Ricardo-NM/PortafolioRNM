import { readFile } from "node:fs/promises";
import path from "node:path";

export const cvFileName = "CV-Ricardo_Nava_Mayoral.pdf";

export async function readCvFile() {
  const cvPath = path.join(process.cwd(), "assets", "docs", cvFileName);
  return readFile(cvPath);
}
