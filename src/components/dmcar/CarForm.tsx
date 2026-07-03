import { useEffect, useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Car = Database["public"]["Tables"]["cars"]["Row"];

const MARCAS = ["Toyota", "Honda", "Volkswagen", "Chevrolet", "Hyundai", "Fiat", "Jeep", "Renault", "Nissan", "Ford", "Kia", "Mitsubishi", "BMW", "Mercedes-Benz", "Audi", "Outra"];
const CAMBIOS = ["Manual", "Automático", "Automatizado", "CVT"];
const COMBUSTIVEIS = ["Flex", "Gasolina", "Diesel", "Híbrido", "Elétrico"];

const MAX_FOTOS = 5;
const MAX_FILE_MB = 10;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/jpeg", JPEG_QUALITY));
    if (!blob) return file;
    if (blob.size >= file.size) return file;
    const base = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
  } catch {
    return file;
  }
}


export function CarForm({ car, onClose, onSaved }: { car: Car | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    marca: car?.marca ?? "",
    modelo: car?.modelo ?? "",
    ano: car?.ano != null ? String(car.ano) : "",
    km: car?.km != null ? String(car.km) : "",
    cambio: car?.cambio ?? "",
    combustivel: car?.combustivel ?? "",
    cor: car?.cor ?? "",
    preco: car?.preco != null ? String(car.preco) : "",
    descricao: car?.descricao ?? "",
    destaque: car?.destaque ?? false,
    vendido: car?.vendido ?? false,
  });

  const [existingFotos, setExistingFotos] = useState<string[]>(car?.fotos ?? []);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const map: Record<string, string> = {};
      await Promise.all(existingFotos.map(async (path) => {
        const { data } = await supabase.storage.from("car-images").createSignedUrl(path, 3600);
        if (data?.signedUrl) map[path] = data.signedUrl;
      }));
      setPreviews(map);
    })();
  }, [existingFotos]);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const files = Array.from(e.target.files ?? []);
    const totalAtual = existingFotos.length + newFiles.length;
    const espacoLivre = MAX_FOTOS - totalAtual;
    if (espacoLivre <= 0) {
      setError(`Limite de ${MAX_FOTOS} fotos por carro.`);
      e.target.value = "";
      return;
    }
    const aceitos: File[] = [];
    const rejeitadosTamanho: string[] = [];
    for (const f of files) {
      if (aceitos.length >= espacoLivre) break;
      if (f.size > MAX_FILE_BYTES) { rejeitadosTamanho.push(f.name); continue; }
      aceitos.push(f);
    }
    const avisos: string[] = [];
    if (files.length > espacoLivre) avisos.push(`Só cabem mais ${espacoLivre} foto(s) (máx. ${MAX_FOTOS}).`);
    if (rejeitadosTamanho.length) avisos.push(`Arquivo(s) acima de ${MAX_FILE_MB}MB ignorado(s): ${rejeitadosTamanho.join(", ")}.`);
    if (avisos.length) setError(avisos.join(" "));
    if (aceitos.length) setNewFiles((prev) => [...prev, ...aceitos]);
    e.target.value = "";
  }


  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      if (existingFotos.length + newFiles.length > MAX_FOTOS) {
        throw new Error(`Máximo de ${MAX_FOTOS} fotos por carro.`);
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Sessão expirada");

      const uploadedPaths: string[] = [];
      for (const original of newFiles) {
        const file = await compressImage(original);
        const path = `${session.user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
        const { error: upErr } = await supabase.storage.from("car-images").upload(path, file, { contentType: file.type, cacheControl: "3600" });
        if (upErr) throw upErr;
        uploadedPaths.push(path);
      }


      const soDigitos = (v: string) => {
        const n = parseInt(String(v).replace(/\D/g, ""), 10);
        return Number.isFinite(n) ? n : 0;
      };
      const fotos = [...existingFotos, ...uploadedPaths];
      const payload = { ...form, fotos, preco: soDigitos(form.preco), ano: soDigitos(form.ano), km: soDigitos(form.km) };


      if (car) {
        const { error } = await supabase.from("cars").update(payload).eq("id", car.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("cars").insert(payload);
        if (error) throw error;
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  function removeExisting(path: string) {
    setExistingFotos((prev) => prev.filter((p) => p !== path));
  }
  function removeNew(idx: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-[#0F0F0F] sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <button onClick={onClose} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-gold">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
          <h1 className="font-display text-xl text-white">{car ? "Editar carro" : "Novo carro"}</h1>
          <div className="w-16" />
        </div>
      </header>

      <form onSubmit={submit} className="mx-auto max-w-4xl px-6 py-10 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Marca">
            <input value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} className="input" />
          </Field>
          <Field label="Modelo"><input value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} className="input" /></Field>
          <Field label="Ano"><input value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} className="input" /></Field>
          <Field label="Km"><input value={form.km} onChange={(e) => setForm({ ...form, km: e.target.value })} className="input" /></Field>
          <Field label="Câmbio">
            <select value={form.cambio} onChange={(e) => setForm({ ...form, cambio: e.target.value })} className="input">
              <option value="">Selecione</option>
              <option value="Automático">Automático</option>
              <option value="Manual">Manual</option>
            </select>
          </Field>

          <Field label="Combustível">
            <select value={form.combustivel} onChange={(e) => setForm({ ...form, combustivel: e.target.value })} className="input">
              <option value="">Selecione</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Flex">Flex</option>
              <option value="Diesel">Diesel</option>
            </select>
          </Field>

          <Field label="Cor"><input value={form.cor} onChange={(e) => setForm({ ...form, cor: e.target.value })} className="input" /></Field>
          <Field label="Preço (R$)"><input value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} className="input" /></Field>

        </div>

        <Field label="Descrição">
          <textarea rows={4} value={form.descricao ?? ""} onChange={(e) => setForm({ ...form, descricao: e.target.value })} className="input resize-y" placeholder="Detalhes, opcionais, estado de conservação..." />
        </Field>

        <div className="flex flex-wrap gap-5">
          <label className="inline-flex items-center gap-2 text-sm text-white/90">
            <input type="checkbox" checked={form.destaque} onChange={(e) => setForm({ ...form, destaque: e.target.checked })} className="accent-gold w-4 h-4" />
            Destacar na home
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-white/90">
            <input type="checkbox" checked={form.vendido} onChange={(e) => setForm({ ...form, vendido: e.target.checked })} className="accent-gold w-4 h-4" />
            Marcar como vendido
          </label>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground">Fotos</label>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {existingFotos.length + newFiles.length}/{MAX_FOTOS} · máx. {MAX_FILE_MB}MB por foto
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {existingFotos.map((p) => (
              <div key={p} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-black">
                {previews[p] && <img src={previews[p]} alt="" className="w-full h-full object-cover" />}
                <button type="button" onClick={() => removeExisting(p)} className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-white hover:bg-red-600">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {newFiles.map((f, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-black">
                <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeNew(i)} className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-white hover:bg-red-600">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {existingFotos.length + newFiles.length < MAX_FOTOS && (
              <label className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-gold text-muted-foreground hover:text-gold transition-colors">
                <Upload className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-widest">Adicionar</span>
                <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
              </label>
            )}
          </div>
        </div>


        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="btn-outline rounded-full px-5 py-2.5 text-sm">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary rounded-full px-6 py-2.5 text-sm disabled:opacity-50">
            {saving ? "Salvando..." : car ? "Salvar alterações" : "Cadastrar carro"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}
