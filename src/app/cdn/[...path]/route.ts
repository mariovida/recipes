import { NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";

function getMimeType(filePath: string) {
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg"))
    return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

export async function GET(context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;

  try {
    const filePath = join(process.cwd(), "public", "cdn", ...path);

    const file = await readFile(filePath);

    // Caching image for a year, never check for updates
    return new NextResponse(file, {
      headers: {
        "Content-Type": getMimeType(filePath),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
