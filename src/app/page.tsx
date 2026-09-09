import Link from "next/link";

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
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-medium text-sky-700">Práctica entrevista</p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Next.js + TanStack Query
        </h1>
        <p className="max-w-2xl text-zinc-600">
          Proyecto chico pero completo: listado CRUD de usuarios con Route
          Handlers, Client Components y cache de TanStack. En la prueba habla en
          voz alta mientras resuelves — eso es lo que quieren ver.
        </p>
        <Link
          href="/users"
          className="inline-flex rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          Ir a Usuarios (live demo)
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {concepts.map((c) => (
          <article
            key={c.title}
            className="rounded-lg border border-zinc-200 bg-white p-4"
          >
            <h2 className="font-semibold text-zinc-900">{c.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{c.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        <p className="font-semibold">Cheat sheet para hablar en la prueba</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
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
          <li>Puedes mirar la docs oficial durante la prueba — está ok.</li>
        </ul>
      </section>
    </div>
  );
}
