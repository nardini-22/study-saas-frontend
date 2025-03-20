import { supabaseLoginAdapter } from "@/infra/adapters";

export function makeSupabaseLoginAdapter() {
  return supabaseLoginAdapter();
}
