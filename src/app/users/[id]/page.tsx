import { UserDetail } from "@/components/user-detail";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `Usuario #${id} | Next + TanStack` };
}

/**
 * Dynamic segment: /users/[id]
 * Pasamos el id al Client Component que hace useQuery.
 */
export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Ruta dinámica <code className="rounded bg-zinc-100 px-1">users/[id]</code>
      </p>
      <UserDetail id={userId} />
    </div>
  );
}
