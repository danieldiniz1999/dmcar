import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const WHATSAPP_HEADER = "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20DMCAR%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Estoque", href: "/showroom" },
  { label: "Sobre", href: "/#historia" },
  { label: "Consultores", href: "/#consultores" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contato", href: "/#unidades" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full bg-background border-b border-border z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center min-w-0" aria-label="DMCAR">
          <Logo size={72} className="logo-pulse" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-white/80 hover:text-gold transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href={WHATSAPP_HEADER} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full px-5 py-2.5 text-sm">
            Falar no WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-white p-2"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-[#0A0A0A] border-l border-border p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl">DM<span className="text-gold">CAR</span></span>
              <button onClick={() => setOpen(false)} aria-label="Fechar menu">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="text-base text-white/90 hover:text-gold">
                  {item.label}
                </a>
              ))}
            </nav>
            <a href={WHATSAPP_HEADER} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full px-5 py-3 text-sm text-center mt-auto">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
