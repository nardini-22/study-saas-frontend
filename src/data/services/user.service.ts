import { IUsersContract } from "@/domain/models/users";
import { IBaseService } from "@/domain/shared";

export const userService: IBaseService<IUsersContract> = ({ httpClient }) => {
  const getUser = async ({ providerId }: IUsersContract.getUserProps) => {
    const response = await httpClient.request<
      unknown,
      IUsersContract.getUserResponse
    >({
      method: "GET",
      url: `users/${providerId}`,
    });
    return response.data;
  };

  const createUser = async ({ body }: IUsersContract.createUserProps) => {
    const response = await httpClient.request<unknown, void>({
      method: "POST",
      url: "users",
      body: {
        ...body,
        loginProvider: "SUPABASE",
      },
    });
    return response.data;
  };
  const getCheckUsername = async ({
    username,
  }: IUsersContract.getCheckUsernameProps) => {
    const response = await httpClient.request<
      unknown,
      IUsersContract.getCheckUsernameResponse
    >({
      method: "GET",
      url: `users/check-username/${username}`,
    });
    return response.data;
  };
  return {
    getUser,
    createUser,
    getCheckUsername,
  };
};
