import { NextResponse } from "next/server";
import { z } from "zod";
import { createContactMessage } from "@/lib/db/data-store";

export const dynamic = "force-dynamic";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid contact form input";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const saved = await createContactMessage(parsed.data);

    return NextResponse.json(
      { success: true, message: "Inquiry successfully recorded", id: saved.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error while processing message" },
      { status: 500 }
    );
  }
}

