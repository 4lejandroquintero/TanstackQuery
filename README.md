# Next.js + TanStack Query + shadcn/ui — Demo entrevista

Mini proyecto en `C:\nextjs-tanstack-demo` para practicar **Next.js (App Router)** + **TanStack Query** + **shadcn/ui**.

## Arrancar

```bash
cd C:\nextjs-tanstack-demo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Qué incluye (mapa mental)

| Ruta | Qué practicas |
|------|----------------|
| `/` | Conceptos + cheat sheet + Cards shadcn |
| `/users` | `useQuery` + `useMutation` + Input/Select/Button |
| `/users/[id]` | Ruta dinámica + query con `enabled` |
| `/server-demo` | Server Component async (sin hooks) |
| `/api/users` | Route Handlers GET/POST |
| `/api/users/[id]` | Route Handlers GET/DELETE |

## shadcn/ui en 20 segundos

- **No es una librería cerrada**: copias el código a `src/components/ui`.
- CLI: `npx shadcn@latest add button input card`
- Stack debajo: **Tailwind** + **Radix** + **lucide** icons.
- En este repo: Button, Input, Label, Card, Select, Badge, Separator, Alert.

## Cómo explicar TanStack en 30 segundos

1. **QueryClientProvider** envuelve la app (en `Providers`, client component).
2. **useQuery({ queryKey, queryFn })** pide datos, cachea y te da `isPending` / `isError` / `data`.
3. **useMutation** escribe (POST/DELETE). En `onSuccess` llamas **invalidateQueries**.
4. **queryKey** es la identidad del cache (`["users"]`, `["users", 1]`).
5. **staleTime** = cuánto tiempo los datos se consideran frescos.

## Server vs Client (pregunta típica)

- **Server Component** (default): fetch en servidor, SEO, secretos.
- **Client Component** (`"use client"`): estado, eventos, **TanStack Query**.
- shadcn suele funcionar en ambos; Select/Dialog necesitan client.

## Durante la prueba

- Habla mientras codeas: route handler → queryKey → invalidate → UI con shadcn.
- Docs oficiales permitidas.
- No hace falta MySQL (store en memoria).

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript + Tailwind v4
- `@tanstack/react-query` + DevTools
- shadcn/ui (radix-nova)
