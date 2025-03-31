import { IAuthContract } from "@/domain/auth";
import { ModalLogin } from "./modal-login";
import { Paper } from "./ui";

interface Props {
  auth: IAuthContract;
}

export function Header({ auth }: Props) {
  return (
    <Paper className="w-full px-4 py-2 flex justify-between items-center">
      <h1 className="font-bold text-3xl">til~</h1>
      <ModalLogin auth={auth} />
    </Paper>
  );
}
