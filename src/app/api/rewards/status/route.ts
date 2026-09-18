import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import {
  DAILY_MAX,
  DAILY_MIN,
  WEEKLY_MAX,
  WEEKLY_MIN,
  lastDailyResetAt,
  lastWeeklyResetAt,
  nextDailyResetAt,
  nextWeeklyResetAt,
} from "@/lib/rewards";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const now = new Date();
  const dailyReady =
    !user.lastDailyClaim || new Date(user.lastDailyClaim) < lastDailyResetAt(now);
  const weeklyReady =
    !user.lastWeeklyClaim || new Date(user.lastWeeklyClaim) < lastWeeklyResetAt(now);

  return NextResponse.json({
    daily: {
      ready: dailyReady,
      min: DAILY_MIN,
      max: DAILY_MAX,
      nextResetAt: nextDailyResetAt(now).toISOString(),
    },
    weekly: {
      ready: weeklyReady,
      min: WEEKLY_MIN,
      max: WEEKLY_MAX,
      nextResetAt: nextWeeklyResetAt(now).toISOString(),
    },
  });
}
