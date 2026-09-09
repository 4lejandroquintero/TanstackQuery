import type { CreateUserInput, User } from "./types";

/**
 * Store en memoria (solo para el demo).
 * En producción esto sería Prisma/Drizzle + MySQL/Postgres.
 * En Next.js (dev) el módulo puede reiniciarse; para la prueba alcanza.
 */
let users: User[] = [
  {
    id: 1,
    name: "Ana García",
    email: "ana@techsolutions.com",
    role: "admin",
    createdAt: "2026-01-10T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Luis Pérez",
    email: "luis@techsolutions.com",
    role: "user",
    createdAt: "2026-02-15T14:30:00.000Z",
  },
  {
    id: 3,
    name: "María López",
    email: "maria@techsolutions.com",
    role: "viewer",
    createdAt: "2026-03-01T09:15:00.000Z",
  },
];

let nextId = 4;

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getUsers(): Promise<User[]> {
  await delay();
  return [...users];
}

export async function getUserById(id: number): Promise<User | null> {
  await delay();
  return users.find((u) => u.id === id) ?? null;
}

export async function createUser(input: CreateUserInput): Promise<User> {
  await delay();
  const user: User = {
    id: nextId++,
    ...input,
    createdAt: new Date().toISOString(),
  };
  users = [user, ...users];
  return user;
}

export async function deleteUser(id: number): Promise<boolean> {
  await delay();
  const before = users.length;
  users = users.filter((u) => u.id !== id);
  return users.length < before;
}
