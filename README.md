# Next.js + TanStack Query — Demo entrevista

Mini proyecto en `C:\nextjs-tanstack-demo` para practicar lo que suele salir en una prueba live de **Next.js (App Router)** + **TanStack Query**.

## Arrancar

```bash
cd C:\nextjs-tanstack-demo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Qué incluye (mapa mental)

| Ruta | Qué practicas |
|------|----------------|
| `/` | Conceptos + cheat sheet para hablar en voz alta |
| `/users` | `useQuery` + `useMutation` + `invalidateQueries` |
| `/users/[id]` | Ruta dinámica + query con `enabled` |
| `/server-demo` | Server Component async (sin hooks) |
| `/api/users` | Route Handlers GET/POST |
| `/api/users/[id]` | Route Handlers GET/DELETE |

## Cómo explicar TanStack en 30 segundos

1. **QueryClientProvider** envuelve la app (en `Providers`, client component).
2. **useQuery({ queryKey, queryFn })** pide datos, cachea y te da `isPending` / `isError` / `data`.
3. **useMutation** escribe (POST/DELETE). En `onSuccess` llamas **invalidateQueries** para que la lista se actualice sola.
4. **queryKey** es la identidad del cache (`["users"]`, `["users", 1]`).
5. **staleTime** = cuánto tiempo los datos se consideran frescos (menos refetch).

## Server vs Client (pregunta típica)

- **Server Component** (default): fetch en servidor, menos JS al browser, bueno para SEO y secretos.
- **Client Component** (`"use client"`): estado, eventos, **TanStack Query**.
- Patrón común: page/server layout + hijos client solo donde hace falta.

## Durante la prueba

- Habla mientras codeas: “voy a crear el route handler… luego el queryKey… invalido el cache…”
- Docs oficiales permitidas — úsalas sin miedo.
- No hace falta MySQL/Workbench para esta demo (store en memoria).

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript + Tailwind
- `@tanstack/react-query` + DevTools (ícono abajo a la izquierda en dev)
