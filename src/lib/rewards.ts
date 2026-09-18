const ROME_TZ = "Europe/Rome";

export const DAILY_MIN = 10;
export const DAILY_MAX = 50;
export const WEEKLY_MIN = 50;
export const WEEKLY_MAX = 150;

function romeOffsetMs(date: Date) {
  const utc = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const rome = new Date(date.toLocaleString("en-US", { timeZone: ROME_TZ }));
  return rome.getTime() - utc.getTime();
}

function toRomeFrame(date: Date) {
  return new Date(date.getTime() + romeOffsetMs(date));
}

function fromRomeFrame(romeFrameMs: number, offset: number) {
  return new Date(romeFrameMs - offset);
}

export function lastDailyResetAt(now = new Date()): Date {
  const offset = romeOffsetMs(now);
  const frame = toRomeFrame(now);
  const midnightFrameMs = Date.UTC(
    frame.getUTCFullYear(),
    frame.getUTCMonth(),
    frame.getUTCDate()
  );
  return fromRomeFrame(midnightFrameMs, offset);
}

export function nextDailyResetAt(now = new Date()): Date {
  return new Date(lastDailyResetAt(now).getTime() + 24 * 60 * 60 * 1000);
}

export function lastWeeklyResetAt(now = new Date()): Date {
  const offset = romeOffsetMs(now);
  const frame = toRomeFrame(now);
  const daysSinceMonday = (frame.getUTCDay() + 6) % 7; // Monday = 0
  const mondayFrameMs = Date.UTC(
    frame.getUTCFullYear(),
    frame.getUTCMonth(),
    frame.getUTCDate() - daysSinceMonday
  );
  return fromRomeFrame(mondayFrameMs, offset);
}

export function nextWeeklyResetAt(now = new Date()): Date {
  return new Date(lastWeeklyResetAt(now).getTime() + 7 * 24 * 60 * 60 * 1000);
}

export function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
