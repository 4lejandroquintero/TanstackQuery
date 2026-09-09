export default function UsersLoading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 rounded bg-zinc-200" />
      <div className="h-40 rounded bg-zinc-200" />
      <p className="text-sm text-zinc-500">
        loading.tsx de App Router (mientras el Server Component resuelve)
      </p>
    </div>
  );
}
