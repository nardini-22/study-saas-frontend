"use client";

import { IAuthContract } from "@/domain/auth";
import { Button, ModalLogin } from "../components";

interface Props {
  auth: IAuthContract;
}

export function HomePage({ auth }: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <div className="text-5xl uppercase font-tactic-sans leading-[90%] text-center tracking-wider md:text-8xl font-bold text-main text-shadow">
        <h1>
          <span className="animate-colorT">T</span>
          oday
        </h1>
        <h1>
          <span className="animate-colorI">I</span>
          <span className="animate-colorL">L</span>
          earned
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <ModalLogin
          trigger={
            <Button size="lg" className="h-14">
              Comece a trilhar
            </Button>
          }
          auth={auth}
        />
        <Button size="sm" variant="neutral">
          Planos
        </Button>
      </div>
    </div>
  );
}
