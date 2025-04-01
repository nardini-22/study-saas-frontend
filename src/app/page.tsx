"use client";

import { makeSupabaseLoginAdapter } from "@/main/factories/adapters";
import { HomePage } from "@/presentation/pages";

export default function Home() {
  return <HomePage auth={makeSupabaseLoginAdapter()} />;
}
