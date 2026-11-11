import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { generateUploadSignature } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const folder = body.folder || "cole_man/photographs";

    const signatureData = generateUploadSignature(folder);

    return NextResponse.json(signatureData);
  } catch (error) {
    console.error("Cloudinary sign error:", error);
    return NextResponse.json(
      { error: "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}

