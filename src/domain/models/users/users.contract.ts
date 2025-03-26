import { ICreateUser, IUsers } from "./users.model";

export interface IUsersContract {
  getUser(
    props: IUsersContract.getUserProps
  ): Promise<IUsersContract.getUserResponse>;
  createUser(props: IUsersContract.createUserProps): Promise<void>;
  getCheckUsername(
    props: IUsersContract.getCheckUsernameProps
  ): Promise<IUsersContract.getCheckUsernameResponse>;
}

export namespace IUsersContract {
  export type getUserProps = { providerId: string };
  export type getUserResponse = IUsers;
  export type createUserProps = {
    body: ICreateUser;
  };
  export type getCheckUsernameProps = { username: string };
  export type getCheckUsernameResponse = { message: string };
}
