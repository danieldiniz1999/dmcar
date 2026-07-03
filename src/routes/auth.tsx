import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/dmcar/Logo";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Acesso Admin | DMCAR" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    const email = `${username.trim().toLowerCase()}@dmcar.local`;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Logo size={56} />
          <span className="font-display text-3xl text-white">DM<span className="text-gold">CAR</span></span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Painel Administrativo</span>
        </div>

        <div className="rounded-2xl bg-surface border border-border p-8">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Usuário</label>
              <input type="text" required autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg bg-[#141414] border border-border px-4 py-3 text-sm text-white focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">Senha</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg bg-[#141414] border border-border px-4 py-3 text-sm text-white focus:outline-none focus:border-gold" />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={loading} className="w-full btn-primary rounded-full px-5 py-3 text-sm disabled:opacity-50">
              {loading ? "Aguarde..." : "Entrar"}
            </button>
          </form>


          <p className="mt-6 text-xs text-muted-foreground text-center">
            Acesso restrito à equipe DMCAR.
          </p>
        </div>
      </div>
    </div>
  );
}
