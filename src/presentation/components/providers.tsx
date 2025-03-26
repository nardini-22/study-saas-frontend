"use client";

import { makeUserServiceFactory } from "@/main/factories/services";
import { AuthProvider } from "../contexts";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider service={makeUserServiceFactory()}>{children}</AuthProvider>
  );
}
