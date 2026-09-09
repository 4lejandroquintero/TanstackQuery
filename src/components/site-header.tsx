import Link from "next/link";

/** Server Component: se renderiza en el servidor, sin JS de cliente por defecto. */
export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-tight text-zinc-900">
          Next.js + TanStack Demo
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="text-zinc-600 hover:text-zinc-900">
            Conceptos
          </Link>
          <Link href="/users" className="text-zinc-600 hover:text-zinc-900">
            Usuarios
          </Link>
          <Link href="/server-demo" className="text-zinc-600 hover:text-zinc-900">
            Server Component
          </Link>
        </nav>
      </div>
    </header>
  );
}
