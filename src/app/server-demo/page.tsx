import { getUsers } from "@/lib/users-store";
import Link from "next/link";
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
 * Demo puro de Server Component:
 * - async function
 * - fetch/datos en el servidor (aquí leemos el store directo)
 * - NO hay useQuery, useState, ni 'use client'
 * - Sí puede usar shadcn (la mayoría son Server-friendly)
 */
export default async function ServerDemoPage() {
  const users = await getUsers();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold">
          Server Component (sin TanStack)
        </h1>
        <p className="text-muted-foreground">
          Datos resueltos en el servidor. El HTML ya viene con la lista.
          Contrasta con /users donde el cliente pide /api/users.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios (SSR)</CardTitle>
          <CardDescription>
            getUsers() en el server · Card / Badge de shadcn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {users.map((u, index) => (
            <div key={u.id}>
              {index > 0 ? <Separator className="my-1" /> : null}
              <div className="flex items-center justify-between gap-3 py-2 text-sm">
                <div>
                  <span className="font-medium">{u.name}</span>
                  <span className="text-muted-foreground"> — {u.email}</span>
                </div>
                <Badge variant="outline">{u.role}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button variant="outline" asChild>
        <Link href="/users">Comparar con Client + TanStack →</Link>
      </Button>
    </div>
  );
}
