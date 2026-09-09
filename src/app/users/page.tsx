import { UserForm } from "@/components/user-form";
import { UserList } from "@/components/user-list";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Usuarios | Next + TanStack + shadcn",
};

/**
 * Esta page puede ser Server Component.
 * Los hijos con 'use client' (UserList, UserForm) se hidratan en el cliente.
 */
export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-heading text-2xl font-semibold">
            Gestión de usuarios
          </h1>
          <Badge variant="secondary">shadcn/ui</Badge>
          <Badge variant="outline">TanStack Query</Badge>
        </div>
        <p className="text-muted-foreground">
          Client Components + TanStack Query + Route Handlers (/api/users) +
          Card / Input / Select / Button
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UserForm />
        <UserList />
      </div>
    </div>
  );
}
