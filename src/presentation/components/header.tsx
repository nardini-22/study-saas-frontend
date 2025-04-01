"use client";

import { IAuthContract } from "@/domain/auth";
import { ModalLogin } from "./modal-login";
import {
  Paper,
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
} from "./ui";
import { useAuth } from "../hooks";
import { LogOut, User } from "lucide-react";
import { createClient } from "@/infra/gateway/supabase";

interface Props {
  auth: IAuthContract;
}

export function Header({ auth }: Props) {
  const { user, loading } = useAuth();
  const supabase = createClient();

  const signOut = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper className="px-4 py-2 flex justify-between items-center fixed left-8 right-8 lg:left-36 lg:right-36 z-10">
      <h1 className="font-bold text-3xl">til~</h1>
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-4 w-[100px] lg:block hidden" />
        </div>
      ) : !user ? (
        <ModalLogin trigger={<Button size="sm">Entrar</Button>} auth={auth} />
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
              <h1 className="font-bold lg:block hidden">{user.name}</h1>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              <span className="lg:block hidden">Minha conta</span>
              <span className="lg:hidden block">{user.name}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Paper>
  );
}
