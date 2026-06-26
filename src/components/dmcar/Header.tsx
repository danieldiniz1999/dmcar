import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <header className="relative w-full bg-background border-b border-border z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-28">
        <Link to="/" className="flex items-center min-w-0" aria-label="DMCAR">
          <Logo size={110} className="logo-pulse" />
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="text-white p-2 hover:text-gold transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ease-out ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-[#0A0A0A] border-l border-border shadow-2xl flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <Logo size={48} />
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            className="text-white hover:text-gold transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <li
                key={item.label}
                className={`transform transition-all duration-500 ease-out ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-lg font-display tracking-wide text-white/90 hover:text-gold py-3 border-b border-border/40 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 border-t border-border">
          <a
            href={WHATSAPP_HEADER}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary rounded-full px-5 py-3 text-sm text-center block"
          >
            Falar no WhatsApp
          </a>
        </div>
      </aside>
    </header>
  );
}
