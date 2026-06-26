import { createServerFn } from "@tanstack/react-start";

const USERS = [
  { email: "danieldiniz@dmcar.local", password: "220416" },
  { email: "admin@dmcar.local", password: "admin123" },
];

export const bootstrapAdmins = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const results: Array<{ email: string; status: string }> = [];

  for (const u of USERS) {
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
    });

    let userId = created?.user?.id;
    let status = "created";

    if (error || !userId) {
      // already exists — find them
      const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
      const found = list?.users?.find((x) => x.email === u.email);
      if (!found) {
        results.push({ email: u.email, status: `error: ${error?.message ?? "unknown"}` });
        continue;
      }
      userId = found.id;
      status = "exists";
      // ensure password is set to the requested one
      await supabaseAdmin.auth.admin.updateUserById(userId, { password: u.password, email_confirm: true });
    }

    // ensure admin role
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

  return { results };
});
