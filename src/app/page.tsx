import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const concepts = [
  {
    title: "App Router",
    body: "Carpetas en app/ = rutas. layout.tsx envuelve páginas. page.tsx es la UI de la ruta.",
  },
  {
    title: "Server vs Client Components",
    body: "Por defecto todo es Server Component. Agrega 'use client' solo cuando necesitas estado, efectos o hooks (como TanStack Query).",
  },
  {
    title: "Route Handlers",
    body: "app/api/.../route.ts exporta GET/POST/DELETE. Es la API del backend dentro de Next.",
  },
  {
    title: "Dynamic routes",
    body: "users/[id]/page.tsx → /users/1. params en Next 15+ es Promise (await params).",
  },
  {
    title: "TanStack Query — useQuery",
    body: "Cache + estados (isPending, isError, isFetching). queryKey + queryFn. Ideal para datos del servidor en el cliente.",
  },
  {
    title: "TanStack Query — useMutation",
    body: "Crear/eliminar. En onSuccess → invalidateQueries para refrescar listas sin lógica manual rara.",
  },
  {
    title: "shadcn/ui",
    body: "No es un npm de componentes opacos: copias el código a components/ui. Combina Tailwind + Radix. nxx shadcn add button.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Badge variant="secondary">Práctica entrevista</Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Next.js + TanStack Query + shadcn/ui
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Proyecto chico pero completo: CRUD de usuarios con Route Handlers,
          Client Components, cache de TanStack y UI con shadcn. En la prueba
          habla en voz alta mientras resuelves.
        </p>
        <Button asChild>
          <Link href="/users">Ir a Usuarios (live demo)</Link>
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {concepts.map((c) => (
          <Card key={c.title} size="sm">
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
              <CardDescription>{c.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Alert>
        <AlertTitle>Cheat sheet para hablar en la prueba</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>
              Server Component = fetch en el servidor, SEO, sin bundle de hooks.
            </li>
            <li>
              Client Component = interactividad. TanStack Query solo corre aquí.
            </li>
            <li>
              staleTime controla cuánto tiempo los datos se consideran frescos.
            </li>
            <li>
              invalidateQueries marca el cache como viejo y dispara refetch.
            </li>
            <li>
              shadcn = componentes en tu repo (`components/ui`), no una black
              box.
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
