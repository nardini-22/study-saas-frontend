"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "./ui";
import {
  CreateUserSchema,
  ICreateUser,
  IUsersContract,
} from "@/domain/models/users";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Check, X } from "lucide-react";
import { ConflictError } from "@/domain/errors";
import { useAuth, useToast } from "../hooks";

interface Props {
  open: boolean;
  service: IUsersContract;
  setIsNewUser: (b: boolean) => void;
}

export function ModalCreateUser({ open, service, setIsNewUser }: Props) {
  const form = useForm<ICreateUser>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });
  const { handleCheckUser } = useAuth();
  const { toast } = useToast();

  const [isAllowedUsername, setIsAllowedUsername] = useState<
    boolean | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const usernameValue = form.watch("username");

  const debouncedUsername = useDebounce(usernameValue, 500);

  const checkUsername = useCallback(async () => {
    try {
      await service.getCheckUsername({ username: debouncedUsername });
      form.clearErrors("username");
      setIsAllowedUsername(true);
    } catch (error) {
      if (error instanceof ConflictError) {
        setIsAllowedUsername(false);
        form.setError("username", {
          type: "validate",
          message: "Este username já está em uso",
        });
        return;
      }
      console.log(error);
    }
  }, [debouncedUsername]);

  useEffect(() => {
    if (debouncedUsername.length === 0) {
      setIsAllowedUsername(undefined);
      return;
    }
    checkUsername();
  }, [debouncedUsername]);

  const onSubmit = async (data: ICreateUser) => {
    setLoading(true);
    try {
      await service.createUser({ body: data });
      setIsNewUser(false);
      handleCheckUser();
    } catch (err) {
      toast({
        variant: "error",
        title: "Erro ao criar usuário!",
        description: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        loading={loading}
        hideCloseButton
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Completar perfil</DialogTitle>
          <DialogDescription>
            Para uma melhor experiência, nos ajude inserindo essas informações!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 font-bold"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Adicione um nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input
                        startAdornment={<div className="text-[#9ca3af]">@</div>}
                        endAdornment={
                          isAllowedUsername ===
                          undefined ? null : isAllowedUsername ? (
                            <Check />
                          ) : (
                            <X />
                          )
                        }
                        placeholder="Adicione um usuário..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                Salvar perfil
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
