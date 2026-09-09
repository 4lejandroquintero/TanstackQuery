"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { queryKeys } from "@/lib/query-keys";
import type { User } from "@/lib/types";
import { usersApi } from "@/lib/users-api";

export function UserForm() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<User["role"]>("user");

  const createMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      // Invalida el cache → useQuery vuelve a fetchear la lista
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      setName("");
      setEmail("");
      setRole("user");
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    createMutation.mutate({ name, email, role });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 rounded-lg border border-zinc-200 bg-white p-4"
    >
      <h2 className="text-lg font-semibold text-zinc-900">Crear usuario</h2>
      <p className="text-sm text-zinc-500">
        useMutation + invalidateQueries (patrón clásico de TanStack)
      </p>

      <label className="block text-sm">
        <span className="text-zinc-700">Nombre</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
          placeholder="Camila Ríos"
        />
      </label>

      <label className="block text-sm">
        <span className="text-zinc-700">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
          placeholder="camila@empresa.com"
        />
      </label>

      <label className="block text-sm">
        <span className="text-zinc-700">Rol</span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as User["role"])}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2"
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
          <option value="viewer">viewer</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
      >
        {createMutation.isPending ? "Guardando..." : "Crear"}
      </button>

      {createMutation.isError ? (
        <p className="text-sm text-red-600">{createMutation.error.message}</p>
      ) : null}
      {createMutation.isSuccess ? (
        <p className="text-sm text-emerald-600">Usuario creado ✓</p>
      ) : null}
    </form>
  );
}
