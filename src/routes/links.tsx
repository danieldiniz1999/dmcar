import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { ArrowRight, Instagram, Globe } from "lucide-react";
import { Logo } from "@/components/dmcar/Logo";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "DMCAR | Links Rápidos — Fale com Nossos Consultores" },
      { name: "description", content: "Acesse os canais oficiais da DMCAR Veículos Multimarcas: consultores, lojas, site e Instagram." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LinksPage,
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.001 3C8.82 3 3 8.82 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.68-1.75A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16.001 3zm0 23.4c-1.98 0-3.92-.53-5.62-1.53l-.4-.24-3.97 1.04 1.06-3.87-.26-.4a10.4 10.4 0 1 1 9.19 4.99zm5.72-7.79c-.31-.16-1.85-.91-2.14-1.02-.29-.11-.5-.16-.72.16-.21.31-.83 1.02-1.02 1.23-.19.21-.37.24-.69.08-.31-.16-1.32-.49-2.52-1.55-.93-.83-1.55-1.85-1.74-2.16-.19-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.19.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.53-.72-.55l-.61-.01c-.21 0-.55.08-.83.39-.29.31-1.09 1.07-1.09 2.61 0 1.54 1.12 3.03 1.28 3.24.16.21 2.21 3.37 5.35 4.72.75.32 1.33.51 1.78.65.75.24 1.43.21 1.97.13.6-.09 1.85-.76 2.11-1.49.26-.72.26-1.34.18-1.49-.08-.14-.29-.24-.6-.4z"/>
    </svg>
  );
}

type LinkItem = { label: string; sub?: string; href: string; primary?: boolean; icon: (p: { className?: string }) => React.ReactElement; external?: boolean };

const items: LinkItem[] = [
  { label: "Falar com Keslley", sub: "Consultor", href: "https://wa.me/5585989293760?text=Ol%C3%A1%20Keslley%2C%20venho%20pelo%20link%20do%20site%20da%20DMCAR%20e%20gostaria%20de%20conhecer%20os%20ve%C3%ADculos%20dispon%C3%ADveis%21", primary: true, icon: WhatsAppIcon, external: true },
  { label: "Falar com Ítalo", sub: "Consultor", href: "https://wa.me/5585989154419?text=Ol%C3%A1%20%C3%8Dtalo%2C%20venho%20pelo%20link%20do%20site%20da%20DMCAR%20e%20gostaria%20de%20conhecer%20os%20ve%C3%ADculos%20dispon%C3%ADveis%21", primary: true, icon: WhatsAppIcon, external: true },
  { label: "Falar com Wallyson", sub: "Consultor", href: "https://wa.me/5585989338918?text=Ol%C3%A1%20Wallyson%2C%20venho%20pelo%20link%20do%20site%20da%20DMCAR%20e%20gostaria%20de%20conhecer%20os%20ve%C3%ADculos%20dispon%C3%ADveis%21", primary: true, icon: WhatsAppIcon, external: true },
  { label: "WhatsApp — Loja 1", sub: "Av. Mister Hull, 4971", href: "https://wa.me/5585988849957?text=Ol%C3%A1%2C%20venho%20pelo%20link%20do%20site%20da%20DMCAR%20e%20gostaria%20de%20falar%20com%20a%20Loja%201%21", icon: WhatsAppIcon, external: true },
  { label: "WhatsApp — Loja 2", sub: "Av. Mister Hull, 4940", href: "https://wa.me/5585989293760?text=Ol%C3%A1%2C%20venho%20pelo%20link%20do%20site%20da%20DMCAR%20e%20gostaria%20de%20falar%20com%20a%20Loja%202%21", icon: WhatsAppIcon, external: true },
  { label: "Acessar o Site", sub: "dmcar.site", href: "/", icon: (p) => <Globe {...p} /> },
  { label: "Instagram da DMCAR", sub: "@dmcarveiculos", href: "https://www.instagram.com/dmcarveiculos", icon: (p) => <Instagram {...p} />, external: true },
];


function LinksPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "radial-gradient(circle at 50% 0%, #1a1308 0%, #0A0A0A 35%, #111 100%)" }}>
      <Particles />
      <div className="relative mx-auto max-w-md px-6 py-14 flex flex-col items-center">
        <div className="logo-pulse" style={{ filter: "drop-shadow(0 0 24px rgba(245,197,24,0.45))" }}>
          <Logo size={110} />
        </div>
        <h1 className="font-display text-4xl mt-5 text-white">DM<span className="text-gold">CAR</span></h1>
        <p className="italic text-muted-foreground text-sm mt-1">Seu próximo carro é aqui.</p>
        <div className="w-16 h-px bg-gold my-6" />

        <ul className="w-full space-y-3">
          {items.map((it, i) => (
            <li key={it.label} style={{ animation: `hero-rise .5s ease-out both`, animationDelay: `${i * 80}ms` }}>
              <LinkButton item={it} />
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center text-xs text-[#666]">
          <p>DMCAR Veículos Multimarcas · Fortaleza, CE</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <a href="https://www.instagram.com/dmcarveiculos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkButton({ item }: { item: LinkItem }) {
  const cls = "bg-gold text-black border border-gold hover:bg-[#C9A000] hover:shadow-[0_0_24px_rgba(245,197,24,0.55)]";
  const iconCls = "w-5 h-5 shrink-0";
  const arrowCls = "w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform";
  const Inner = (
    <div className={`group flex items-center gap-3 rounded-2xl px-5 py-4 transition-all hover:scale-[1.02] ${cls}`}>
      <item.icon className={iconCls} />
      <div className="flex-1 text-left">
        <div className="font-semibold text-sm">{item.label}</div>
        {item.sub && <div className="text-[11px] opacity-70">{item.sub}</div>}
      </div>
      <ArrowRight className={arrowCls} />
    </div>
  );
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noopener noreferrer">{Inner}</a>;
  }
  return <Link to={item.href as "/"}>{Inner}</Link>;
}

function Particles() {
  const dots = Array.from({ length: 24 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 8) * 0.4;
        const size = (i % 3) + 2;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold/40"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animation: `pulse 3s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
