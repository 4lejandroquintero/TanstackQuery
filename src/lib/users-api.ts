import type { CreateUserInput, User } from "./types";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? `Error HTTP ${res.status}`,
    );
  }
  return res.json() as Promise<T>;
}

/** Funciones de fetch que usa TanStack Query (client-side). */
export const usersApi = {
  list: async () => handle<User[]>(await fetch("/api/users")),

  getById: async (id: number) =>
    handle<User>(await fetch(`/api/users/${id}`)),

  create: async (input: CreateUserInput) =>
    handle<User>(
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }),
    ),

  remove: async (id: number) =>
    handle<{ ok: true }>(
      await fetch(`/api/users/${id}`, { method: "DELETE" }),
    ),
};
