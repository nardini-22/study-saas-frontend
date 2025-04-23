"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Form,
  Divider,
} from "./ui";
import { useForm } from "react-hook-form";
import {
  CreateTrailSchema,
  ICreateTrail,
  ITrailsContract,
} from "@/domain/models/trails";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useToast } from "../hooks";

interface Props {
  service: ITrailsContract;
  fetchTrails: () => Promise<void>;
  trigger: React.ReactNode;
}

export function ModalCreateTrail({ service, fetchTrails, trigger }: Props) {
  const form = useForm<ICreateTrail>({
    resolver: zodResolver(CreateTrailSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ICreateTrail) => {
    setLoading(true);
    try {
      await service.createTrail({ body: data });
      setOpen(false);
      fetchTrails();
    } catch (err) {
      toast({
        variant: "error",
        title: "Erro ao criar trilha!",
        description: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.reset();
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-2 flex flex-col">
        <DialogHeader>
          <DialogTitle>Nova trilha</DialogTitle>
          <DialogDescription>
            Customize sua trilha do jeito que quiser.
          </DialogDescription>
        </DialogHeader>
        <Divider />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field, formState }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nome da trilha</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Adicione um nome..."
                          hasError={!!formState.errors.name}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        hasError={!!formState.errors.description}
                        placeholder="Adiciona uma descrição..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" isLoading={loading}>
                Criar trilha
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
