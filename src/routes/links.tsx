import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Globe, MessageCircle } from "lucide-react";
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

type LinkItem = { label: string; sub?: string; href: string; primary?: boolean; icon: typeof MessageCircle; external?: boolean };

const items: LinkItem[] = [
  { label: "Falar com Ítalo", sub: "Consultor", href: "https://wa.me/5585989154419?text=Ol%C3%A1%20%C3%8Dtalo%2C%20vim%20pelo%20link%20da%20DMCAR%20e%20gostaria%20de%20conhecer%20os%20ve%C3%ADculos%20dispon%C3%ADveis!", primary: true, icon: MessageCircle, external: true },
  { label: "Falar com Wallyson", sub: "Consultor", href: "https://wa.me/5585989338918?text=Ol%C3%A1%20Wallyson%2C%20vim%20pelo%20link%20da%20DMCAR%20e%20gostaria%20de%20conhecer%20os%20ve%C3%ADculos%20dispon%C3%ADveis!", primary: true, icon: MessageCircle, external: true },
  { label: "WhatsApp — Loja 1", sub: "Av. Mister Hull, 4971", href: "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20vim%20pelo%20link%20da%20DMCAR%20e%20gostaria%20de%20falar%20com%20a%20Loja%201!", icon: MessageCircle, external: true },
  { label: "WhatsApp — Loja 2", sub: "Av. Mister Hull, 4940", href: "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20vim%20pelo%20link%20da%20DMCAR%20e%20gostaria%20de%20falar%20com%20a%20Loja%202!", icon: MessageCircle, external: true },
  { label: "Acessar o Site", sub: "dmcar.site", href: "/", icon: Globe },
  { label: "Instagram da DMCAR", sub: "@dmcarveiculos", href: "https://www.instagram.com/dmcarveiculos", icon: Instagram, external: true },
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
  const cls = item.primary
    ? "bg-gold text-black border border-gold hover:bg-[#C9A000]"
    : "bg-surface text-white border border-border hover:bg-gold hover:text-black hover:border-gold";
  const Inner = (
    <div className={`group flex items-center gap-3 rounded-2xl px-5 py-4 transition-all hover:scale-[1.02] ${cls}`}>
      <item.icon className="w-5 h-5 shrink-0" />
      <div className="flex-1 text-left">
        <div className="font-semibold text-sm">{item.label}</div>
        {item.sub && <div className="text-[11px] opacity-70">{item.sub}</div>}
      </div>
      <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
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
