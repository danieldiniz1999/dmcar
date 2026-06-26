import { createFileRoute } from "@tanstack/react-router";

const USERS = [
  { email: "danieldiniz@dmcar.local", password: "220416" },
  { email: "admin@dmcar.local", password: "admin123" },
];

export const Route = createFileRoute("/api/public/bootstrap-admins")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const results: Array<{ email: string; status: string }> = [];

        for (const u of USERS) {
          let userId: string | undefined;
          let status = "created";

          const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
            email: u.email,
            password: u.password,
            email_confirm: true,
          });

          if (!error && created?.user?.id) {
            userId = created.user.id;
          } else {
            const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
            const found = list?.users?.find((x) => x.email === u.email);
            if (found) {
              userId = found.id;
              status = "exists";
              await supabaseAdmin.auth.admin.updateUserById(userId, { password: u.password, email_confirm: true });
            } else {
              results.push({ email: u.email, status: `error: ${error?.message ?? "unknown"}` });
              continue;
            }
          }

          const { data: existingRole } = await supabaseAdmin
            .from("user_roles")
            .select("id")
            .eq("user_id", userId)
            .eq("role", "admin")
            .maybeSingle();

          if (!existingRole) {
            await supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "admin" });
          }

          results.push({ email: u.email, status });
        }

        return new Response(JSON.stringify({ results }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
