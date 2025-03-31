import { IAuthContract } from "@/domain/auth";
import { ModalLogin } from "./modal-login";
import { Paper, Avatar, AvatarImage, AvatarFallback, Skeleton } from "./ui";
import { useAuth } from "../hooks";

interface Props {
  auth: IAuthContract;
}

export function Header({ auth }: Props) {
  const { user, loading } = useAuth();

  return (
    <Paper className="w-full px-4 py-2 flex justify-between items-center">
      <h1 className="font-bold text-3xl">til~</h1>
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-4 w-[100px] lg:block hidden" />
        </div>
      ) : !user ? (
        <ModalLogin auth={auth} />
      ) : (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback className="font-bold">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="font-bold lg:block hidden">{user.name}</h1>
        </div>
      )}
    </Paper>
  );
}
