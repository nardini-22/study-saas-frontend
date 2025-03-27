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

interface Props {
  service: IPostsContract;
  trailId: string;
}

export function ModalCreatePost({ service, trailId }: Props) {
  const form = useForm<ICreatePost>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (data: ICreatePost) => {
    try {
      await service.createPost({ body: data, trailId });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo post</DialogTitle>
          <DialogDescription>Dê mais um passo nessa trilha.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 font-bold"
          >
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
            <Button type="submit">Publicar post</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
