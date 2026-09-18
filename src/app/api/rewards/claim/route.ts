import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import { toPublicUser, updateUser } from "@/lib/db";
import {
  DAILY_MAX,
  DAILY_MIN,
  WEEKLY_MAX,
  WEEKLY_MIN,
  lastDailyResetAt,
  lastWeeklyResetAt,
  nextDailyResetAt,
  nextWeeklyResetAt,
  randomInRange,
} from "@/lib/rewards";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const type = body?.type;
  if (type !== "daily" && type !== "weekly") {
    return NextResponse.json({ error: "Invalid reward type." }, { status: 400 });
  }

  const now = new Date();
  const isDaily = type === "daily";
  const lastClaim = isDaily ? user.lastDailyClaim : user.lastWeeklyClaim;
  const boundary = isDaily ? lastDailyResetAt(now) : lastWeeklyResetAt(now);
  const ready = !lastClaim || new Date(lastClaim) < boundary;

  if (!ready) {
    return NextResponse.json(
      { error: "You already claimed this reward for the current period." },
      { status: 409 }
    );
  }

  const reward = isDaily
    ? randomInRange(DAILY_MIN, DAILY_MAX)
    : randomInRange(WEEKLY_MIN, WEEKLY_MAX);

  const updated = await updateUser(user.id, {
    coins: user.coins + reward,
    ...(isDaily
      ? { lastDailyClaim: now.toISOString() }
      : { lastWeeklyClaim: now.toISOString() }),
  });

  if (!updated) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  return NextResponse.json({
    reward,
    user: toPublicUser(updated),
    nextResetAt: (isDaily ? nextDailyResetAt(now) : nextWeeklyResetAt(now)).toISOString(),
  });
}
