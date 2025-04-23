"use client";

import { Badges } from "./badges";
import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Divider,
} from "./ui";
import { RiCheckLine, RiTrophyLine } from "@remixicon/react";

interface Props {
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (b: boolean) => void;
}

export function ModalPlans({ trigger, open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="lg:max-w-[1500px] gap-2 flex flex-col">
        <DialogHeader>
          <DialogTitle>Planos</DialogTitle>
          <DialogDescription>
            Deixe seu aprendizado sem limites.
          </DialogDescription>
        </DialogHeader>
        <Divider />
        <div className="lg:flex lg:gap-4 max-h-[500px] space-y-4">
          <Card withBorder>
            <div className="space-y-2">
              <Badge variant="success">
                <RiTrophyLine className="size-4" aria-hidden="true" />
                Destaque
              </Badge>
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold first:mt-0">
                Plano grátis
              </h2>
              <ul className="my-6 list-none [&>li]:mt-2 [&>li]:flex [&>li]:gap-2">
                <li>
                  <RiCheckLine aria-hidden="true" />
                  Até 3 trilhas de aprendizado
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  Até 3 posts por dia
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  <p>
                    1 trilha em grupo
                    <span className="ml-2 text-xs text-gray-500">
                      (em breve)
                    </span>
                  </p>
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  <p>
                    Trilha em grupo com até 5 pessoas
                    <span className="ml-2 text-xs text-gray-500">
                      (em breve)
                    </span>
                  </p>
                </li>
              </ul>
              <Button className="w-full" disabled variant="light">
                Adquirir
              </Button>
            </div>
          </Card>
          <Card withBorder>
            <div className="space-y-2">
              <Badges type="coming soon" />
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Plano ouro
              </h2>
              <ul className="my-6 list-none [&>li]:mt-2 [&>li]:flex [&>li]:gap-2">
                <li>
                  <RiCheckLine aria-hidden="true" />
                  Até 5 trilhas de aprendizado
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  Até 10 posts por dia
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  <p>
                    2 trilhas em grupo
                    <span className="ml-2 text-xs text-gray-500">
                      (em breve)
                    </span>
                  </p>
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  <p>
                    Trilhas em grupo com até 10 pessoas
                    <span className="ml-2 text-xs text-gray-500">
                      (em breve)
                    </span>
                  </p>
                </li>
              </ul>
              <Button className="w-full" disabled variant="light">
                Adquirir
              </Button>
            </div>
          </Card>
          <Card withBorder>
            <div className="space-y-2">
              <Badges type="coming soon" />
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Plano diamante
              </h2>
              <ul className="my-6 list-none [&>li]:mt-2 [&>li]:flex [&>li]:gap-2">
                <li>
                  <RiCheckLine aria-hidden="true" />
                  Até 10 trilhas de aprendizado
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  Até 50 posts por dia
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  <p>
                    5 trilhas em grupo
                    <span className="ml-2 text-xs text-gray-500">
                      (em breve)
                    </span>
                  </p>
                </li>
                <li>
                  <RiCheckLine aria-hidden="true" />
                  <p>
                    Trilhas em grupo com até 20 pessoas
                    <span className="ml-2 text-xs text-gray-500">
                      (em breve)
                    </span>
                  </p>
                </li>
              </ul>
              <Button className="w-full" disabled variant="light">
                Adquirir
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
