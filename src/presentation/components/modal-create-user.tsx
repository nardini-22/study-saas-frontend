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
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { Check, X } from "lucide-react";

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

  const [usernameValue, setUsernameValue] = useState("");
  const debouncedUsername = useDebounce(usernameValue, 500);

  useEffect(() => {
    if (debouncedUsername.length > 1) {
      const checkUsername = async () => {
        try {
          await service.getCheckUsername({ username: debouncedUsername });
          form.clearErrors("username");
        } catch (error) {
          form.setError("username", {
            type: "validate",
            message: "Este username já está em uso",
          });
        }
      };

      checkUsername();
    }
  }, [debouncedUsername, service, form]);

  const handleUsernameChange = (inputValue: string) => {
    form.setValue("username", inputValue);
    setUsernameValue(inputValue);
  };

  const onSubmit = async (data: ICreateUser) => {
    try {
      await service.createUser({ body: data });
      setIsNewUser(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent hideCloseButton className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Completar perfil</DialogTitle>
          <DialogDescription>
            Para uma melhor experiência, nos ajude inserindo essas informações
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 font-bold"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      startAdornment={<div className="text-[#9ca3af]">@</div>}
                      endAdornment={fieldState.error ? <X /> : <Check />}
                      placeholder="johndoe"
                      onChange={(e) => handleUsernameChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salvar perfil</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
