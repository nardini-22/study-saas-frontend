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
} from "@/presentation/components";
import { useToast } from "../hooks";

interface Props {
  auth: IAuthContract;
  trigger: React.ReactNode;
}

export function ModalLogin({ auth, trigger }: Props) {
  const { toast } = useToast();
  const redirectTo = "/trails";
  const handleLoginGoogle = async () => {
    try {
      await auth.loginWithGoogle({ redirectTo });
    } catch (error) {
      toast({
        variant: "error",
        title: "Erro ao carregar os dados!",
        description: "Por favor, tente novamente mais tarde.",
      });
    }
  };
  const handleLoginGithub = async () => {
    try {
      await auth.loginWithGithub({ redirectTo });
    } catch (error) {
      toast({
        variant: "error",
        title: "Erro ao carregar os dados!",
        description: "Por favor, tente novamente mais tarde.",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Faça o login</DialogTitle>
          <DialogDescription>
            Para começar a trilhar entre com alguma conta.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4">
          <Button type="submit" size="lg" onClick={handleLoginGoogle}>
            Google
          </Button>
          <Button type="submit" size="lg" onClick={handleLoginGithub}>
            Github
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
