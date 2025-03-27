import { IPostsContract } from "@/domain/models/posts";
import { IBaseService } from "@/domain/shared";

export const postService: IBaseService<IPostsContract> = ({ httpClient }) => {
  const createPost = async ({
    body,
    trailId,
  }: IPostsContract.createPostProps) => {
    const response = await httpClient.request<unknown, void>({
      method: "POST",
      url: `trail/${trailId}/post`,
      body,
    });
    return response.data;
  };

  return {
    createPost,
  };
};
