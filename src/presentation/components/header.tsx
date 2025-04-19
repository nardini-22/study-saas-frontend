"use client";

import { IAuthContract } from "@/domain/auth";
import { ModalLogin } from "./modal-login";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Skeleton,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  Card,
  DropdownMenuGroup,
} from "./ui";
import { useAuth } from "../hooks";
import { createClient } from "@/infra/gateway/supabase";
import { useRouter } from "next/navigation";
import { RiLoginBoxLine, RiLogoutBoxLine, RiUserLine } from "@remixicon/react";

interface Props {
  auth: IAuthContract;
}

export function Header({ auth }: Props) {
  const { user, loading, setUser } = useAuth();
  const { push } = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
      setUser(undefined);
      push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="bg-background-primary px-4 py-2 flex justify-between top-8 items-center fixed left-6 right-6 lg:left-36 lg:right-36 z-10">
      <h1 className="font-bold text-3xl">til~</h1>
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-md" />
        </div>
      ) : !user ? (
        <ModalLogin
          trigger={
            <Button className="flex gap-2">
              <RiLoginBoxLine className="size-4" aria-hidden="true" />
              Entrar
            </Button>
          }
          auth={auth}
        />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4 cursor-pointer">
              <Avatar>
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback className="font-bold">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              <div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="font-normal">@{user.username}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <RiUserLine className="size-4" aria-hidden="true" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut}>
                <RiLogoutBoxLine className="size-4" aria-hidden="true" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Card>
  );
}
