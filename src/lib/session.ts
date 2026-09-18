import { cookies } from "next/headers";
import { findUserById, type User } from "@/lib/db";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function getSessionUser(): Promise<User | undefined> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return undefined;

  const payload = verifySession(token);
  if (!payload) return undefined;

  return findUserById(payload.sub);
}
