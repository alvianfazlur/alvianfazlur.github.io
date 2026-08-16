import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, detail: "ADMIN_PASSWORD is not configured on the server" },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, detail: "Invalid password" },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true });
}
