"use client";

import { IAuthContract } from "@/domain/auth";
import { ModalLogin } from "@/presentation/components";

interface Props {
  auth: IAuthContract;
}

export function HomePage({ auth }: Props) {
  return (
    <div>
      <ModalLogin auth={auth} />
    </div>
  );
}
