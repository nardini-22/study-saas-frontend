"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui";

interface Props {
  trigger: React.ReactNode;
}

export function ModalPlans({ trigger }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent loading={loading} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Planos</DialogTitle>
          <DialogDescription>
            Deixe seu aprendizado sem limites.
          </DialogDescription>
        </DialogHeader>
        <h3>Disponível em breve</h3>
      </DialogContent>
    </Dialog>
  );
}
