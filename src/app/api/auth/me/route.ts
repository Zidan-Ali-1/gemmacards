import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findUserById, toPublicUser } from "@/lib/db";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = verifySession(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }

  const user = await findUserById(payload.sub);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}
