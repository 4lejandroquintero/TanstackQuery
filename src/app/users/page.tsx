import { UserForm } from "@/components/user-form";
import { UserList } from "@/components/user-list";

export const metadata = {
  title: "Usuarios | Next + TanStack",
};

/**
 * Esta page puede ser Server Component.
 * Los hijos con 'use client' (UserList, UserForm) se hidratan en el cliente.
 */
export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Gestión de usuarios</h1>
        <p className="mt-1 text-zinc-600">
          Client Components + TanStack Query + Route Handlers (/api/users)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UserForm />
        <UserList />
      </div>
    </div>
  );
}
