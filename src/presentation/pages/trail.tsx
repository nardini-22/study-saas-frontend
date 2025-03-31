import { IPostsContract } from "@/domain/models/posts";
import { ModalCreatePost, Paper } from "../components";
import { useEffect, useState } from "react";
import { ITrails, ITrailsContract } from "@/domain/models/trails";

interface Props {
  postService: IPostsContract;
  trailId: string;
  trailsService: ITrailsContract;
}

export function TrailPage({ postService, trailsService, trailId }: Props) {
  const [trail, setTrail] = useState<ITrails | undefined>(undefined);
  const fetchTrail = async () => {
    try {
      const data = await trailsService.getTrail({ trailId });
      setTrail(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrail();
  }, []);

  return (
    <div>
      {trail?.trail_post.map((post) => (
        <Paper key={post.id} className="flex-col p-4">
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <p>{post.content}</p>
        </Paper>
      ))}
      <ModalCreatePost
        service={postService}
        trailId={trailId}
        fetchTrail={fetchTrail}
      />
    </div>
  );
}
