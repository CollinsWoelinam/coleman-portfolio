import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkAdminCredentials, signAdminToken, getAdminSession, ADMIN_COOKIE_CONFIG } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: session.username });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  // Check if form submit or JSON
  let username = "";
  let password = "";
  let action = "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    username = body.username || "";
    password = body.password || "";
    action = body.action || "";
  } else {
    const formData = await request.formData();
    username = (formData.get("username") as string) || "";
    password = (formData.get("password") as string) || "";
    action = (formData.get("action") as string) || "";
  }

  // Handle Logout
  if (action === "logout") {
    cookies().delete(ADMIN_COOKIE_CONFIG.name);
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Handle Login
  if (!checkAdminCredentials(username, password)) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const token = signAdminToken(username);

  // Set HTTP-only session cookie
  cookies().set(ADMIN_COOKIE_CONFIG.name, token, ADMIN_COOKIE_CONFIG.options);

  return NextResponse.json({
    success: true,
    message: "Admin authentication successful",
    username,
  });
}

