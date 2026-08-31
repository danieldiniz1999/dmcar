import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md btn-primary px-5 py-2 text-sm"
          >
            Voltar para Início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tente novamente ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md btn-primary px-4 py-2 text-sm"
          >
            Tentar novamente
          </button>
          <a href="/" className="rounded-md btn-outline px-4 py-2 text-sm">
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "DMCAR Veículos Multimarcas",
  legalName: "PARCELA JUSTA COMÉRCIO DE VEÍCULOS LTDA",
  url: "https://dmcar.site",
  description:
    "Referência em seminovos em Fortaleza/CE com mais de 3.000 veículos vendidos, 2 lojas e oficina própria.",
  telephone: "+55-85-98719-8049",
  email: "consultoresdmcarveiculos@gmail.com",
  foundingDate: "2014",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Mister Hull, 4971",
    addressLocality: "Fortaleza",
    addressRegion: "CE",
    postalCode: "60356-675",
    addressCountry: "BR",
  },
  sameAs: ["https://www.instagram.com/dmcarveiculos"],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "qvZuc7ZTzQiVroL5U4We7-LJDXa27S0_ccnvmXAbZqk" },
      { title: "DMCAR Veículos Multimarcas | Seminovos em Fortaleza" },
      {
        name: "description",
        content:
          "A DMCAR é referência em seminovos em Fortaleza/CE. Mais de 3.000 veículos vendidos, 2 lojas, oficina própria e garantia de 90 dias.",
      },
      { name: "author", content: "DMCAR Veículos Multimarcas" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "DMCAR Veículos Multimarcas" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "DMCAR Veículos Multimarcas | Seminovos em Fortaleza" },
      { name: "twitter:title", content: "DMCAR Veículos Multimarcas | Seminovos em Fortaleza" },
      {
        property: "og:description",
        content:
          "A DMCAR é referência em seminovos em Fortaleza/CE. Mais de 3.000 veículos vendidos, 2 lojas, oficina própria e garantia de 90 dias.",
      },
      {
        name: "twitter:description",
        content:
          "A DMCAR é referência em seminovos em Fortaleza/CE. Mais de 3.000 veículos vendidos, 2 lojas, oficina própria e garantia de 90 dias.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preconnect",
        href: "https://buondpgrtrxkgbuowpav.supabase.co",
        crossOrigin: "anonymous",
      },
      { rel: "dns-prefetch", href: "https://buondpgrtrxkgbuowpav.supabase.co" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=Orbitron:wght@500;700;900&display=swap",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(orgJsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
