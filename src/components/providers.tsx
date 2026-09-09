"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * Providers debe ser Client Component porque QueryClient vive en el browser.
 * El layout raíz (Server Component) lo importa y envuelve a {children}.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  // useState evita recrear el client en cada render (importante en React 19 / Strict Mode)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000, // 30s: datos "frescos", menos refetch
            refetchOnWindowFocus: true,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
