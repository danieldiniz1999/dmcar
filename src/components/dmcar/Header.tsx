import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const WHATSAPP_HEADER =
  "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20DMCAR%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Showroom", href: "/showroom" },
  { label: "Sobre", href: "/#historia" },
  { label: "Consultores", href: "/#consultores" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contato", href: "/#unidades" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });

  const isActive = (href: string) => {
    if (href.includes("#")) {
      const [path, anchor] = href.split("#");
      const targetPath = path || "/";
      return pathname === targetPath && hash === anchor;
    }
    return pathname === href;
  };

  return (
    <header className="relative w-full bg-background border-b border-border z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center h-20 sm:h-24 md:h-32 gap-2 sm:gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="text-white p-2 hover:text-gold transition-colors shrink-0 cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-80 max-w-[85vw] bg-[#0A0A0A] border-r border-border p-0 flex flex-col"
          >
            <SheetHeader className="p-6 border-b border-border">
              <SheetTitle className="flex items-center">
                <Logo size={48} />
                <span className="sr-only">Menu DMCAR</span>
              </SheetTitle>
            </SheetHeader>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`group relative flex items-center text-sm font-sans font-semibold uppercase tracking-[0.2em] py-4 pl-4 pr-2 border-b border-border/40 transition-all duration-300 ease-out hover:pl-7 hover:tracking-[0.26em] ${
                          active
                            ? "text-gold border-gold/60"
                            : "text-white/90 hover:text-gold"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[3px] bg-gold rounded-full transition-all duration-300 ease-out ${
                            active ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50 group-hover:opacity-100 group-hover:scale-y-100"
                          }`}
                        />
                        {item.label}
                      </a>
                    </li>
                  );
                })}
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
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center min-w-0 shrink-0" aria-label="DMCAR">
          <Logo responsive className="logo-pulse" />
        </Link>
      </div>
    </header>
  );
}
