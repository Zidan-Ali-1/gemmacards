import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  coins: number;
  createdAt: string;
  lastDailyClaim?: string;
  lastWeeklyClaim?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(USERS_FILE, "utf-8");
  } catch {
    await writeFile(USERS_FILE, "[]", "utf-8");
  }
}

async function readUsers(): Promise<User[]> {
  await ensureStore();
  const raw = await readFile(USERS_FILE, "utf-8");
  try {
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  writeQueue = writeQueue.then(() =>
    writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8")
  );
  return writeQueue;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<User | undefined> {
  const users = await readUsers();
  return users.find((u) => u.id === id);
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<User> {
  const users = await readUsers();
  const user: User = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
    coins: 1000,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function updateUser(
  id: string,
  patch: Partial<Pick<User, "coins" | "lastDailyClaim" | "lastWeeklyClaim">>
): Promise<User | undefined> {
  const users = await readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return undefined;
  users[index] = { ...users[index], ...patch };
  await writeUsers(users);
  return users[index];
}

export function toPublicUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    coins: user.coins,
    createdAt: user.createdAt,
  };
}
