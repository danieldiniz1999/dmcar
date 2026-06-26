import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, Gauge, Cog, Palette } from "lucide-react";
import { Header } from "@/components/dmcar/Header";
import { Footer } from "@/components/dmcar/Footer";
import { WhatsAppFloat } from "@/components/dmcar/WhatsAppFloat";
import { CookieBanner } from "@/components/dmcar/CookieBanner";
import { Reveal } from "@/components/dmcar/Reveal";
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carHatch from "@/assets/car-hatch.jpg";

export const Route = createFileRoute("/showroom")({
  head: () => ({
    meta: [
      { title: "Showroom | DMCAR Veículos Multimarcas — Seminovos em Fortaleza" },
      { name: "description", content: "Confira o estoque completo da DMCAR: mais de 40 veículos seminovos à pronta entrega em Fortaleza/CE. Filtre por marca, modelo, ano e preço." },
      { property: "og:title", content: "Showroom | DMCAR Veículos Multimarcas" },
      { property: "og:description", content: "Mais de 40 veículos à pronta entrega em Fortaleza." },
      { property: "og:url", content: "https://dmcar.site/showroom" },
    ],
    links: [{ rel: "canonical", href: "https://dmcar.site/showroom" }],
  }),
  component: ShowroomPage,
});

const WA_LOJA = "https://wa.me/5585987198049?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20um%20ve%C3%ADculo%20do%20showroom%20DMCAR!";

type Vehicle = { id: number; marca: string; model: string; ano: number; km: string; cambio: "Manual" | "Automático"; cor: string; preco: number; img: string; status: "Destaque" | "Novo" | "Disponível" };

const inventory: Vehicle[] = [
  { id: 1, marca: "Toyota", model: "Corolla XEi 2022", ano: 2022, km: "32.500 km", cambio: "Automático", cor: "Prata", preco: 119900, img: carSedan, status: "Destaque" },
  { id: 2, marca: "Jeep", model: "Compass Limited 2023", ano: 2023, km: "18.900 km", cambio: "Automático", cor: "Cinza", preco: 159900, img: carSuv, status: "Novo" },
  { id: 3, marca: "Hyundai", model: "HB20 Comfort 2022", ano: 2022, km: "24.100 km", cambio: "Manual", cor: "Vermelho", preco: 72900, img: carHatch, status: "Destaque" },
  { id: 4, marca: "Honda", model: "Civic EXL 2021", ano: 2021, km: "42.800 km", cambio: "Automático", cor: "Preto", preco: 109900, img: carSedan, status: "Disponível" },
  { id: 5, marca: "Volkswagen", model: "T-Cross Highline 2022", ano: 2022, km: "29.300 km", cambio: "Automático", cor: "Branco", preco: 124900, img: carSuv, status: "Disponível" },
  { id: 6, marca: "Chevrolet", model: "Onix LTZ 2021", ano: 2021, km: "36.500 km", cambio: "Automático", cor: "Vermelho", preco: 76900, img: carHatch, status: "Disponível" },
  { id: 7, marca: "Fiat", model: "Argo Drive 2020", ano: 2020, km: "48.200 km", cambio: "Manual", cor: "Branco", preco: 56900, img: carHatch, status: "Disponível" },
  { id: 8, marca: "Toyota", model: "Hilux SRX 2020", ano: 2020, km: "67.800 km", cambio: "Automático", cor: "Prata", preco: 198900, img: carSuv, status: "Destaque" },
  { id: 9, marca: "Honda", model: "Fit LX 2019", ano: 2019, km: "58.300 km", cambio: "Automático", cor: "Cinza", preco: 64900, img: carHatch, status: "Disponível" },
  { id: 10, marca: "Volkswagen", model: "Virtus Comfortline 2021", ano: 2021, km: "39.100 km", cambio: "Automático", cor: "Preto", preco: 89900, img: carSedan, status: "Disponível" },
  { id: 11, marca: "Renault", model: "Duster Iconic 2022", ano: 2022, km: "27.600 km", cambio: "Automático", cor: "Marrom", preco: 102900, img: carSuv, status: "Novo" },
  { id: 12, marca: "Nissan", model: "Kicks SV 2020", ano: 2020, km: "51.400 km", cambio: "Automático", cor: "Azul", preco: 84900, img: carSuv, status: "Disponível" },
];

function brl(n: number) { return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); }

function ShowroomPage() {
  const [marca, setMarca] = useState("Todas");
  const [ano, setAno] = useState("Todos");
  const [cambio, setCambio] = useState("Todos");
  const [faixa, setFaixa] = useState("Todas");
  const [visible, setVisible] = useState(9);

  const marcas = useMemo(() => ["Todas", ...Array.from(new Set(inventory.map(v => v.marca)))], []);
  const anos = useMemo(() => ["Todos", ...Array.from(new Set(inventory.map(v => String(v.ano)))).sort().reverse()], []);

  const filtered = inventory.filter(v => {
    if (marca !== "Todas" && v.marca !== marca) return false;
    if (ano !== "Todos" && String(v.ano) !== ano) return false;
    if (cambio !== "Todos" && v.cambio !== cambio) return false;
    if (faixa === "Até 80 mil" && v.preco > 80000) return false;
    if (faixa === "80 - 120 mil" && (v.preco < 80000 || v.preco > 120000)) return false;
    if (faixa === "Acima de 120 mil" && v.preco < 120000) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-[#0F0F0F] py-14">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="font-display text-5xl md:text-6xl">NOSSO SHOWROOM</h1>
          <p className="mt-3 text-muted-foreground">Mais de 40 veículos à pronta entrega. Encontre o seu.</p>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <Select value={marca} onChange={setMarca} options={marcas} label="Marca" />
            <Select value={ano} onChange={setAno} options={anos} label="Ano" />
            <Select value={cambio} onChange={setCambio} options={["Todos", "Manual", "Automático"]} label="Câmbio" />
            <Select value={faixa} onChange={setFaixa} options={["Todas", "Até 80 mil", "80 - 120 mil", "Acima de 120 mil"]} label="Faixa de Preço" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, visible).map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 80}>
                <article className="card-vehicle h-full rounded-2xl bg-surface border border-border overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] bg-black overflow-hidden">
                    <img src={v.img} alt={v.model} loading="lazy" className="w-full h-full object-cover" />
                    <span className={`absolute top-3 left-3 ${v.status === "Destaque" ? "bg-gold text-black" : v.status === "Novo" ? "bg-white text-black" : "bg-black/70 text-white border border-border"} text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full`}>{v.status}</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{v.marca}</div>
                    <h3 className="font-display text-xl mb-3 mt-1">{v.model}</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-5">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold" /> {v.ano}</span>
                      <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-gold" /> {v.km}</span>
                      <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5 text-gold" /> {v.cambio}</span>
                      <span className="flex items-center gap-1.5"><Palette className="w-3.5 h-3.5 text-gold" /> {v.cor}</span>
                    </div>
                    <div className="font-mono-d text-2xl text-gold font-bold mb-4 mt-auto">{brl(v.preco)}</div>
                    <a href={WA_LOJA} target="_blank" rel="noopener noreferrer" className="btn-primary rounded-full px-4 py-2.5 text-xs text-center">Tenho Interesse</a>
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
