"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { RefreshCwIcon, Trash2Icon } from "lucide-react";
import { queryKeys } from "@/lib/query-keys";
import { usersApi } from "@/lib/users-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/**
 * Client Component + useQuery / useMutation + shadcn/ui
 * Habla esto en la prueba:
 * - queryKey identifica el cache
 * - queryFn hace el fetch
 * - invalidateQueries refresca la lista tras mutar
 * - shadcn = componentes copiados a tu repo (Button, Card, Badge...)
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
    return (
      <Card>
        <CardContent>
          <p className="text-muted-foreground">
            Cargando usuarios (TanStack Query)...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error al cargar</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <span>{error.message}</span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Reintentar
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              Usuarios
              <Badge variant="secondary">{data.length}</Badge>
              {isFetching && !isPending ? (
                <Badge variant="outline">actualizando...</Badge>
              ) : null}
            </CardTitle>
            <CardDescription>
              useQuery + Badge / Button de shadcn
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
          >
            <RefreshCwIcon />
            Refetch
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {data.map((user, index) => (
          <div key={user.id}>
            {index > 0 ? <Separator className="my-1" /> : null}
            <div className="flex items-center justify-between gap-3 py-2">
              <div className="min-w-0">
                <Link
                  href={`/users/${user.id}`}
                  className="font-medium hover:underline"
                >
                  {user.name}
                </Link>
                <p className="truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge variant="outline">{user.role}</Badge>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(user.id)}
                  aria-label={`Eliminar ${user.name}`}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {deleteMutation.isError ? (
          <Alert variant="destructive" className="mt-3">
            <AlertDescription>{deleteMutation.error.message}</AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}
