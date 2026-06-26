import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, LogOut, Star, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/dmcar/Logo";
import { CarForm } from "@/components/dmcar/CarForm";
import type { Database } from "@/integrations/supabase/types";

type Car = Database["public"]["Tables"]["cars"]["Row"];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin | DMCAR" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminPage,
});

function brl(n: number) { return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); }

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Car | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate({ to: "/auth" }); return; }
      const { data: roleData } = await supabase
        .from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      if (!roleData) { setIsAdmin(false); setChecking(false); return; }
      setIsAdmin(true);
      await loadCars();
      setChecking(false);
    })();
  }, [navigate]);

  async function loadCars() {
    const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    if (error) { console.error(error); return; }
    setCars(data ?? []);
    const t: Record<string, string> = {};
    await Promise.all((data ?? []).map(async (c) => {
      const path = c.fotos?.[0];
      if (!path) return;
      const { data: signed } = await supabase.storage.from("car-images").createSignedUrl(path, 3600);
      if (signed?.signedUrl) t[c.id] = signed.signedUrl;
    }));
    setThumbs(t);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function remove(car: Car) {
    if (!confirm(`Remover ${car.marca} ${car.modelo}?`)) return;
    if (car.fotos?.length) await supabase.storage.from("car-images").remove(car.fotos);
    const { error } = await supabase.from("cars").delete().eq("id", car.id);
    if (error) { alert(error.message); return; }
    loadCars();
  }

  async function toggleDestaque(car: Car) {
    await supabase.from("cars").update({ destaque: !car.destaque }).eq("id", car.id);
    loadCars();
  }
  async function toggleVendido(car: Car) {
    await supabase.from("cars").update({ vendido: !car.vendido }).eq("id", car.id);
    loadCars();
  }

  if (checking) return <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">Carregando...</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl text-white mb-3">Acesso negado</h1>
          <p className="text-sm text-muted-foreground mb-6">Sua conta não tem permissão de administrador.</p>
          <button onClick={logout} className="btn-outline rounded-full px-5 py-2.5 text-sm">Sair</button>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <CarForm
        car={editing}
        onClose={() => { setShowForm(false); setEditing(null); }}
        onSaved={() => { setShowForm(false); setEditing(null); loadCars(); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-[#0F0F0F]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <div className="font-display text-xl text-white leading-none">DM<span className="text-gold">CAR</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Admin</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/showroom" className="hidden sm:inline-flex text-xs text-white/70 hover:text-gold">Ver site</Link>
            <button onClick={logout} className="btn-outline rounded-full px-4 py-2 text-xs inline-flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl text-white">Estoque</h1>
            <p className="text-sm text-muted-foreground mt-1">{cars.length} veículo(s) cadastrado(s)</p>
          </div>
          <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Novo carro
          </button>
        </div>

        {cars.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
            Nenhum carro cadastrado ainda. Clique em "Novo carro" para começar.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cars.map((c) => (
              <article key={c.id} className="rounded-2xl bg-surface border border-border overflow-hidden">
                <div className="aspect-[4/3] bg-black relative">
                  {thumbs[c.id] ? (
                    <img src={thumbs[c.id]} alt={c.modelo} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Sem foto</div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    {c.destaque && <span className="bg-gold text-black text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full">Destaque</span>}
                    {c.vendido && <span className="bg-red-600 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full">Vendido</span>}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.marca}</div>
                  <h3 className="font-display text-lg leading-tight">{c.modelo}</h3>
                  <div className="text-xs text-muted-foreground mt-1">{c.ano} · {c.km.toLocaleString("pt-BR")} km · {c.cambio}</div>
                  <div className="font-mono-d text-xl text-gold font-bold mt-2">{brl(c.preco)}</div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button onClick={() => toggleDestaque(c)} className="text-[11px] py-2 rounded-lg border border-border hover:border-gold inline-flex items-center justify-center gap-1.5">
                      <Star className="w-3 h-3" /> {c.destaque ? "Remover destaque" : "Destacar"}
                    </button>
                    <button onClick={() => toggleVendido(c)} className="text-[11px] py-2 rounded-lg border border-border hover:border-gold inline-flex items-center justify-center gap-1.5">
                      <Check className="w-3 h-3" /> {c.vendido ? "Marcar disponível" : "Marcar vendido"}
                    </button>
                    <button onClick={() => { setEditing(c); setShowForm(true); }} className="text-[11px] py-2 rounded-lg bg-white/5 hover:bg-white/10 inline-flex items-center justify-center gap-1.5">
                      <Pencil className="w-3 h-3" /> Editar
                    </button>
                    <button onClick={() => remove(c)} className="text-[11px] py-2 rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/50 inline-flex items-center justify-center gap-1.5">
                      <Trash2 className="w-3 h-3" /> Excluir
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
