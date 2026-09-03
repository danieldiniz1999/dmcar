import { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: (string | undefined)[];
  alt: string;
  className?: string;
  onImageClick?: (index: number) => void;
  showArrowsAlways?: boolean;
  eagerFirst?: boolean;
  rounded?: boolean;
};

export function CarGallery({
  images,
  alt,
  className = "aspect-[4/3]",
  onImageClick,
  showArrowsAlways = false,
  eagerFirst = false,
  rounded = false,
}: Props) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const count = images.length;
  const showControls = count > 1;

  const scrollTo = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = ref.current;
      if (!el) return;
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIdx((prev) => (prev === i ? prev : i));
    });
  }, []);

  return (
    <div
      className={`relative bg-black overflow-hidden group ${rounded ? "rounded-2xl" : ""} ${className}`}
    >
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: "pan-x pan-y pinch-zoom" }}
      >
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full h-full snap-center relative">
            {src ? (
              <img
                src={src}
                alt={`${alt} — foto ${i + 1}`}
                loading={eagerFirst && i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                onClick={() => onImageClick?.(i)}
                className={`w-full h-full object-cover ${onImageClick ? "cursor-zoom-in" : ""}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                Sem foto
              </div>
            )}
          </div>
        ))}
      </div>

      {showControls && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              scrollTo(Math.max(0, idx - 1));
            }}
            disabled={idx === 0}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-opacity disabled:opacity-30 disabled:cursor-default ${showArrowsAlways ? "opacity-100" : "opacity-0 group-hover:opacity-100 md:opacity-0"}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={(e) => {
              e.stopPropagation();
              scrollTo(Math.min(count - 1, idx + 1));
            }}
            disabled={idx === count - 1}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-opacity disabled:opacity-30 disabled:cursor-default ${showArrowsAlways ? "opacity-100" : "opacity-0 group-hover:opacity-100 md:opacity-0"}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white font-medium tabular-nums pointer-events-none">
            {idx + 1}/{count}
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para foto ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollTo(i);
                }}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-gold" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
