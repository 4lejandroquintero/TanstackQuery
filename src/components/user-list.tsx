"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { queryKeys } from "@/lib/query-keys";
import { usersApi } from "@/lib/users-api";

/**
 * Client Component + useQuery / useMutation
 * Habla esto en la prueba:
 * - queryKey identifica el cache
 * - queryFn hace el fetch
 * - invalidateQueries refresca la lista tras mutar
 */
export function UserList() {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: queryKeys.users.all,
    queryFn: usersApi.list,
  });

  const deleteMutation = useMutation({
    mutationFn: usersApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });

  if (isPending) {
    return <p className="text-zinc-500">Cargando usuarios (TanStack Query)...</p>;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
        <p className="font-medium">Error: {error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-2 text-sm underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">
          Usuarios ({data.length})
          {isFetching && !isPending ? (
            <span className="ml-2 text-xs font-normal text-zinc-400">
              actualizando...
            </span>
          ) : null}
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
        >
          Refetch
        </button>
      </div>

      <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white">
        {data.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-3 px-4 py-3"
          >
            <div>
              <Link
                href={`/users/${user.id}`}
                className="font-medium text-sky-700 hover:underline"
              >
                {user.name}
              </Link>
              <p className="text-sm text-zinc-500">
                {user.email} · {user.role}
              </p>
            </div>
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate(user.id)}
              className="text-sm text-red-600 hover:underline disabled:opacity-50"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {deleteMutation.isError ? (
        <p className="text-sm text-red-600">{deleteMutation.error.message}</p>
      ) : null}
    </div>
  );
}
