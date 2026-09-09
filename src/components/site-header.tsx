import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/** Server Component: se renderiza en el servidor, sin JS de cliente por defecto. */
export function SiteHeader() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
          Next.js + TanStack + shadcn
        </Link>
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Conceptos</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/users">Usuarios</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/server-demo">Server</Link>
          </Button>
        </nav>
      </div>
      <Separator />
    </header>
  );
}
