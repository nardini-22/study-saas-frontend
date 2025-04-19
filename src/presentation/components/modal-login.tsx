"use client";

import { IAuthContract } from "@/domain/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Divider,
} from "@/presentation/components";
import { useToast } from "../hooks";
import { RiGoogleLine, RiGithubLine } from "@remixicon/react";

interface Props {
  auth: IAuthContract;
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (b: boolean) => void;
}

export function ModalLogin({ auth, trigger, open, setOpen }: Props) {
  const { toast } = useToast();

  const handleLoginGoogle = async () => {
    try {
      await auth.loginWithGoogle();
    } catch (error) {
      toast({
        variant: "error",
        title: "Erro ao efetuar login!",
        description: "Por favor, tente novamente mais tarde.",
      });
    }
  };
  const handleLoginGithub = async () => {
    try {
      await auth.loginWithGithub();
    } catch (error) {
      toast({
        variant: "error",
        title: "Erro ao efetuar login!",
        description: "Por favor, tente novamente mais tarde.",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-2 flex flex-col">
        <DialogHeader>
          <DialogTitle>Faça o login</DialogTitle>
          <DialogDescription>
            Para começar a trilhar entre com alguma conta.
          </DialogDescription>
        </DialogHeader>
        <Divider />
        <div className="flex justify-center flex-col gap-4">
          <Button
            type="submit"
            variant="light"
            className="flex gap-2"
            onClick={handleLoginGoogle}
          >
            <RiGoogleLine className="size-4" aria-hidden="true" />
            Google
          </Button>
          <Button
            type="submit"
            variant="light"
            className="flex gap-2"
            onClick={handleLoginGithub}
          >
            <RiGithubLine className="size-4" aria-hidden="true" />
            Github
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
