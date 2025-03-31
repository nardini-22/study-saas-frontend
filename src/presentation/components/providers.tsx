"use client";

import { makeUserServiceFactory } from "@/main/factories/services";
import { AuthProvider } from "../contexts";
import { PropsWithChildren } from "react";
import { Header } from "./header";
import { makeSupabaseLoginAdapter } from "@/main/factories/adapters";
import { Toaster } from "./ui";

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider service={makeUserServiceFactory()}>
      <Toaster />
      <Header auth={makeSupabaseLoginAdapter()} />
      {children}
    </AuthProvider>
  );
}
