import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Creates temporary photo links for public car listings. Only files that belong
// to a car in the catalog are signed, so visitors never get direct file access.
export const signCarPhotos = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ paths: z.array(z.string().min(1).max(300)).max(500) }).parse(input),
  )
  .handler(async ({ data }) => {
    if (!data.paths.length) return [] as { path: string; signedUrl: string | null }[];
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: cars, error } = await supabaseAdmin.from("cars").select("fotos").overlaps("fotos", data.paths);
    if (error) throw new Error("Não foi possível carregar as fotos");
    const allowed = new Set((cars ?? []).flatMap((c) => c.fotos ?? []));
    const paths = data.paths.filter((p) => allowed.has(p));
    if (!paths.length) return [];
    const { data: signed } = await supabaseAdmin.storage.from("car-images").createSignedUrls(paths, 60 * 60 * 24);
    return (signed ?? []).map((s, i) => ({ path: paths[i], signedUrl: s.signedUrl ?? null }));
  });
