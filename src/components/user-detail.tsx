"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { queryKeys } from "@/lib/query-keys";
import { usersApi } from "@/lib/users-api";

export function UserDetail({ id }: { id: number }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: Number.isFinite(id) && id > 0,
  });

  if (isPending) {
    return <p className="text-zinc-500">Cargando detalle...</p>;
  }

  if (isError) {
    return (
      <div className="space-y-3">
        <p className="text-red-600">{error.message}</p>
        <Link href="/users" className="text-sky-700 underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-4 rounded-lg border border-zinc-200 bg-white p-6">
      <div>
        <p className="text-sm text-zinc-500">queryKey: users / {id}</p>
        <h1 className="text-2xl font-semibold text-zinc-900">{data.name}</h1>
        <p className="text-zinc-600">{data.email}</p>
      </div>

      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-zinc-500">Rol</dt>
          <dd className="font-medium text-zinc-900">{data.role}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Creado</dt>
          <dd className="font-medium text-zinc-900">
            {new Date(data.createdAt).toLocaleString("es-CO")}
          </dd>
        </div>
        <div>
          <dt className="text-zinc-500">ID</dt>
          <dd className="font-medium text-zinc-900">{data.id}</dd>
        </div>
      </dl>

      <Link
        href="/users"
        className="inline-block text-sm text-sky-700 hover:underline"
      >
        ← Volver al listado
      </Link>
    </article>
  );
}
