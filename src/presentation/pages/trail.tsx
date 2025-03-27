import { IPostsContract } from "@/domain/models/posts";
import { ModalCreatePost } from "../components";

interface Props {
  service: IPostsContract;
  trailId: string;
}

export function TrailPage({ service, trailId }: Props) {
  return <ModalCreatePost service={service} trailId={trailId} />;
}
