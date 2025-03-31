"use client";

import { makeUserServiceFactory } from "@/main/factories/services";
import { AuthProvider } from "../contexts";
import { PropsWithChildren } from "react";
import { Header } from "./header";
import { makeSupabaseLoginAdapter } from "@/main/factories/adapters";

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <Header auth={makeSupabaseLoginAdapter()} />
      <AuthProvider service={makeUserServiceFactory()}>{children}</AuthProvider>
    </>
  );
}
