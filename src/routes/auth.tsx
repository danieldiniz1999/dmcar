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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setInfo(null);
    const email = `${username.trim().toLowerCase()}@dmcar.local`;
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setInfo("Conta criada! Você já pode entrar.");
        setMode("signin");
      }
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
          <div className="flex gap-2 mb-6">
            <button onClick={() => setMode("signin")} className={`flex-1 py-2 text-sm rounded-lg transition-colors ${mode === "signin" ? "bg-gold text-black font-semibold" : "bg-transparent text-white/70 border border-border"}`}>Entrar</button>
            <button onClick={() => setMode("signup")} className={`flex-1 py-2 text-sm rounded-lg transition-colors ${mode === "signup" ? "bg-gold text-black font-semibold" : "bg-transparent text-white/70 border border-border"}`}>Criar conta</button>
          </div>

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
            {info && <p className="text-sm text-green-400">{info}</p>}

            <button type="submit" disabled={loading} className="w-full btn-primary rounded-full px-5 py-3 text-sm disabled:opacity-50">
              {loading ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            Apenas as 2 primeiras contas criadas terão acesso de administrador.
          </p>
        </div>
      </div>
    </div>
  );
}
