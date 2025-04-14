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
} from "./ui";
import { useForm } from "react-hook-form";
import {
  CreateTrailSchema,
  ICreateTrail,
  ITrailsContract,
} from "@/domain/models/trails";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
      form.reset();
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent loading={loading} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova trilha</DialogTitle>
          <DialogDescription>
            Customize sua trilha do jeito que quiser.
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
                    <FormLabel>Nome da trilha</FormLabel>
                    <FormControl>
                      <Input placeholder="Adicione um nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
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
              <Button type="submit" disabled={loading}>
                Criar trilha
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
