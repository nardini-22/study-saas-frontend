import { ICreatePost } from "./posts.model";

export interface IPostsContract {
  createPost(props: IPostsContract.createPostProps): Promise<void>;
}

export namespace IPostsContract {
  export type createPostProps = {
    body: ICreatePost;
    trailId: string;
  };
}
