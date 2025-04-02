"use client";

import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "./ui";
import {
  CreatePostSchema,
  ICreatePost,
  IPostsContract,
} from "@/domain/models/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "../hooks";

interface Props {
  service: IPostsContract;
  trailId: string;
  fetchTrail: () => Promise<void>;
  loading: boolean;
}

export function ModalCreatePost({ service, trailId, fetchTrail }: Props) {
  const form = useForm<ICreatePost>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ICreatePost) => {
    setLoading(true);
    try {
      await service.createPost({ body: data, trailId });
      setOpen(false);
      fetchTrail();
      form.reset();
    } catch (err) {
      toast({
        variant: "error",
        title: "Erro ao publicar post!",
        description: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo post</Button>
      </DialogTrigger>
      <DialogContent loading={loading} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo post</DialogTitle>
          <DialogDescription>Dê mais um passo nessa trilha.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 font-bold"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Adicione um título..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Adiciona um conteúdo..."
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
                Publicar post
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
