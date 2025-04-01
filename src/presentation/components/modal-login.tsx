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
