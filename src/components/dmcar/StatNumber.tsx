import { useCountUp } from "./Reveal";

export function StatNumber({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useCountUp(value);
  return (
    <div className="group text-center px-4 py-6 transition-transform hover:scale-105">
      <div className="font-mono-d text-5xl md:text-6xl font-black text-gold leading-none flex items-baseline justify-center gap-2">
        <span ref={ref}>0</span>
        {suffix && <span className="text-2xl md:text-3xl">{suffix}</span>}
      </div>
      <div className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.18em] text-muted-foreground group-hover:text-white transition-colors">
        {label}
      </div>
    </div>
  );
}
