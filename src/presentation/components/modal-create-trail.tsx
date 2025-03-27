"use client";

import { Plus } from "lucide-react";
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
  Paper,
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

interface Props {
  service: ITrailsContract;
}

export function ModalCreateTrail({ service }: Props) {
  const form = useForm<ICreateTrail>({
    resolver: zodResolver(CreateTrailSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (data: ICreateTrail) => {
    try {
      await service.createTrail({ body: data });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Paper type="button" className="size-32">
          <Plus size={24} />
        </Paper>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova trilha</DialogTitle>
          <DialogDescription>
            Customize sua trilha do jeito que quiser.
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
            <Button type="submit">Salvar trilha</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
