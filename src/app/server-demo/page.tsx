import { getUsers } from "@/lib/users-store";
import Link from "next/link";

/**
 * Demo puro de Server Component:
 * - async function
 * - fetch/datos en el servidor (aquí leemos el store directo)
 * - NO hay useQuery, useState, ni 'use client'
 *
 * Cuándo usarlo: datos iniciales, SEO, secretos de servidor.
 * Cuándo NO: interacciones, polling, cache compartido en cliente → TanStack.
 */
export default async function ServerDemoPage() {
  const users = await getUsers();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">
          Server Component (sin TanStack)
        </h1>
        <p className="mt-1 text-zinc-600">
          Estos datos se resolvieron en el servidor. El HTML ya viene con la
          lista. Contrasta con /users donde el cliente pide /api/users.
        </p>
      </div>

      <ul className="rounded-lg border border-zinc-200 bg-white divide-y divide-zinc-100">
        {users.map((u) => (
          <li key={u.id} className="px-4 py-3 text-sm">
            <span className="font-medium">{u.name}</span>
            <span className="text-zinc-500"> — {u.email}</span>
          </li>
        ))}
      </ul>

      <Link href="/users" className="text-sm text-sky-700 hover:underline">
        Comparar con la versión Client + TanStack →
      </Link>
    </div>
  );
}
