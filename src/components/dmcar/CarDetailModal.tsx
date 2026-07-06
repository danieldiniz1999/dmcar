import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, Gauge, Cog, Palette } from "lucide-react";
import { CarGallery } from "./CarGallery";

export type CarLike = {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  km: number;
  cambio: string;
  cor: string;
  preco: number;
  destaque?: boolean;
};

type Props = {
  car: CarLike;
  images: (string | undefined)[];
  onClose: () => void;
  whatsappBase: string;
};

function brl(n: number) {
  return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export function CarDetailModal({ car, images, onClose, whatsappBase }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const waHref = `${whatsappBase.split("?")[0]}?text=${encodeURIComponent(
    `Olá, tenho interesse no ${car.marca} ${car.modelo} ${car.ano}!`
  )}`;

  const safeImages = images.length > 0 ? images : [undefined];

  const content = (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm overflow-y-auto overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes ${car.marca} ${car.modelo}`}
    >
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="fixed top-4 right-4 z-[110] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="min-h-full mx-auto max-w-6xl md:p-6 md:py-14"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:rounded-2xl overflow-hidden md:border md:border-border bg-surface flex flex-col md:grid md:grid-cols-5">
          <div className="md:col-span-3 bg-black">
            <CarGallery
              images={safeImages}
              alt={`${car.marca} ${car.modelo}`}
              className="aspect-[4/3] md:aspect-[4/3] w-full"
              showArrowsAlways
              eagerFirst
            />
          </div>

          <div className="md:col-span-2 p-6 md:p-8 flex flex-col">
            <div className="text-xs text-muted-foreground uppercase tracking-widest">{car.marca}</div>
            <h2 className="font-display text-2xl md:text-3xl mt-1 mb-1">{car.modelo}</h2>
            <div className="text-sm text-muted-foreground mb-5">Ano {car.ano}</div>

            <div className="grid grid-cols-2 gap-3 text-sm text-white/85 mb-6">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> {car.ano}</span>
              <span className="flex items-center gap-2"><Gauge className="w-4 h-4 text-gold" /> {car.km.toLocaleString("pt-BR")} km</span>
              <span className="flex items-center gap-2"><Cog className="w-4 h-4 text-gold" /> {car.cambio}</span>
              <span className="flex items-center gap-2"><Palette className="w-4 h-4 text-gold" /> {car.cor}</span>
            </div>

            <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 mb-6">
              <div className="text-[10px] uppercase tracking-widest text-gold mb-1">Preço</div>
              <div className="font-mono-d text-3xl md:text-4xl text-gold font-bold">{brl(car.preco)}</div>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-full px-5 py-3 text-sm text-center mt-auto"
            >
              Tenho Interesse — Falar no WhatsApp
            </a>
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              Toque na foto para deslizar. Use as setas ou arraste para o lado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}
