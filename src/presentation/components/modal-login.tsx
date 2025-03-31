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

interface Props {
  auth: IAuthContract;
}

export function ModalLogin({ auth }: Props) {
  const redirectTo = "/trails";
  const handleLoginGoogle = async () => {
    try {
      await auth.loginWithGoogle({ redirectTo });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLoginGithub = async () => {
    try {
      await auth.loginWithGithub({ redirectTo });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Entrar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
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
