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
  Divider,
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
import { RiAddLine } from "@remixicon/react";

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
        <Button className="flex gap-2">
          <RiAddLine aria-hidden="true" />
          Novo post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-2 flex flex-col">
        <DialogHeader>
          <DialogTitle>Novo post</DialogTitle>
          <DialogDescription>Dê mais um passo nessa trilha.</DialogDescription>
        </DialogHeader>
        <Divider />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adicione um título..."
                        hasError={!!formState.errors.title}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Adiciona um conteúdo..."
                        hasError={!!formState.errors.content}
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
                Publicar post
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
