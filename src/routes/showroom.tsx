import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Calendar, Gauge, Cog, Palette } from "lucide-react";
import { Header } from "@/components/dmcar/Header";
import { Footer } from "@/components/dmcar/Footer";
import { WhatsAppFloat } from "@/components/dmcar/WhatsAppFloat";
import { CookieBanner } from "@/components/dmcar/CookieBanner";
import { Reveal } from "@/components/dmcar/Reveal";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Car = Database["public"]["Tables"]["cars"]["Row"];

export const Route = createFileRoute("/showroom")({
  head: () => ({
    meta: [
      { title: "Showroom | DMCAR Veículos Multimarcas — Seminovos em Fortaleza" },
      { name: "description", content: "Confira o estoque completo da DMCAR em Fortaleza/CE. Filtre por marca, ano, câmbio e preço." },
      { property: "og:title", content: "Showroom | DMCAR Veículos Multimarcas" },
      { property: "og:description", content: "Veículos seminovos à pronta entrega em Fortaleza." },
      { property: "og:url", content: "https://dmcar.site/showroom" },
    ],
    links: [{ rel: "canonical", href: "https://dmcar.site/showroom" }],
  }),
  component: ShowroomPage,
});

const WA_LOJA = "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20um%20ve%C3%ADculo%20do%20showroom%20DMCAR!";

function brl(n: number) { return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); }

function ShowroomPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [marca, setMarca] = useState("Todas");
  const [ano, setAno] = useState("Todos");
  const [cambio, setCambio] = useState("Todos");
  const [faixa, setFaixa] = useState("Todas");
  const [visible, setVisible] = useState(9);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("cars").select("*").eq("vendido", false).order("destaque", { ascending: false }).order("created_at", { ascending: false });
      const list = data ?? [];
      setCars(list);
      const map: Record<string, string> = {};
      await Promise.all(list.map(async (c) => {
        const path = c.fotos?.[0];
        if (!path) return;
        const { data: signed } = await supabase.storage.from("car-images").createSignedUrl(path, 60 * 60 * 24);
        if (signed?.signedUrl) map[c.id] = signed.signedUrl;
      }));
      setImages(map);
      setLoading(false);
    })();
  }, []);

  const marcas = useMemo(() => ["Todas", ...Array.from(new Set(cars.map(v => v.marca)))], [cars]);
  const anos = useMemo(() => ["Todos", ...Array.from(new Set(cars.map(v => String(v.ano)))).sort().reverse()], [cars]);

  const filtered = cars.filter(v => {
    if (marca !== "Todas" && v.marca !== marca) return false;
    if (ano !== "Todos" && String(v.ano) !== ano) return false;
    if (cambio !== "Todos" && v.cambio !== cambio) return false;
    if (faixa === "Até 80 mil" && Number(v.preco) > 80000) return false;
    if (faixa === "80 - 120 mil" && (Number(v.preco) < 80000 || Number(v.preco) > 120000)) return false;
    if (faixa === "Acima de 120 mil" && Number(v.preco) < 120000) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-[#0F0F0F] py-14">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="font-display text-5xl md:text-6xl">NOSSO SHOWROOM</h1>
          <p className="mt-3 text-muted-foreground">Veículos à pronta entrega. Encontre o seu.</p>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <Select value={marca} onChange={setMarca} options={marcas} label="Marca" />
            <Select value={ano} onChange={setAno} options={anos} label="Ano" />
            <Select value={cambio} onChange={setCambio} options={["Todos", "Manual", "Automático", "Automatizado", "CVT"]} label="Câmbio" />
            <Select value={faixa} onChange={setFaixa} options={["Todas", "Até 80 mil", "80 - 120 mil", "Acima de 120 mil"]} label="Faixa de Preço" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="text-center text-muted-foreground py-20">Carregando estoque...</div>
          ) : cars.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">Em breve nosso estoque estará disponível.</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(0, visible).map((v, i) => (
                  <Reveal key={v.id} delay={(i % 3) * 80}>
                    <article className="card-vehicle h-full rounded-2xl bg-surface border border-border overflow-hidden flex flex-col">
                      <div className="relative aspect-[4/3] bg-black overflow-hidden">
                        {images[v.id] ? (
                          <img src={images[v.id]} alt={v.modelo} loading="lazy" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Sem foto</div>
                        )}
                        {v.destaque && <span className="absolute top-3 left-3 bg-gold text-black text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">Destaque</span>}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{v.marca}</div>
                        <h3 className="font-display text-xl mb-3 mt-1">{v.modelo}</h3>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-5">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold" /> {v.ano}</span>
                          <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-gold" /> {v.km.toLocaleString("pt-BR")} km</span>
                          <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5 text-gold" /> {v.cambio}</span>
                          <span className="flex items-center gap-1.5"><Palette className="w-3.5 h-3.5 text-gold" /> {v.cor}</span>
                        </div>
                        <div className="font-mono-d text-2xl text-gold font-bold mb-4 mt-auto">{brl(Number(v.preco))}</div>
                        <a href={`${WA_LOJA.split("?")[0]}?text=${encodeURIComponent(`Olá, tenho interesse no ${v.marca} ${v.modelo} ${v.ano}!`)}`} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full px-4 py-2.5 text-xs text-center">Tenho Interesse</a>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center text-muted-foreground py-20">Nenhum veículo encontrado com esses filtros.</div>
              )}

              {visible < filtered.length && (
                <div className="text-center mt-12">
                  <button onClick={() => setVisible(v => v + 6)} className="btn-outline rounded-full px-7 py-3 text-sm">Carregar Mais</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <CookieBanner />
    </div>
  );
}

function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <label className="block text-left">
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-[#141414] border border-border px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
