"use client";

import { IAuthContract } from "@/domain/auth";
import { createClient } from "@/infra/gateway/supabase";
import { makeHttpClientAdapterFactory } from "@/main/factories/adapters";
import { Button, ModalLogin } from "@/presentation/components";
import { useEffect } from "react";

interface Props {
  auth: IAuthContract;
}

export function HomePage({ auth }: Props) {
  return <ModalLogin auth={auth} />;
}
