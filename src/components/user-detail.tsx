"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { queryKeys } from "@/lib/query-keys";
import { usersApi } from "@/lib/users-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UserDetail({ id }: { id: number }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: Number.isFinite(id) && id > 0,
  });

  if (isPending) {
    return (
      <Card>
        <CardContent>
          <p className="text-muted-foreground">Cargando detalle...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3">
        <Alert variant="destructive">
          <AlertTitle>No se pudo cargar</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
        <Button variant="outline" asChild>
          <Link href="/users">Volver al listado</Link>
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>queryKey: users / {id}</CardDescription>
        <CardTitle className="text-2xl">{data.name}</CardTitle>
        <p className="text-muted-foreground">{data.email}</p>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Rol</dt>
            <dd className="mt-1">
              <Badge variant="secondary">{data.role}</Badge>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Creado</dt>
            <dd className="mt-1 font-medium">
              {new Date(data.createdAt).toLocaleString("es-CO")}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">ID</dt>
            <dd className="mt-1 font-medium">{data.id}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href="/users">
            <ArrowLeftIcon />
            Volver al listado
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
