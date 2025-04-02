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
  const [loading, setLoading] = useState<boolean>(false);

  const colors = [
    "bg-main",
    "bg-main-blue",
    "bg-main-orange",
    "bg-main-pink",
    "bg-main-green",
    "bg-main-purple",
  ];

  const fetchTrail = async () => {
    setLoading(true);
    try {
      const data = await trailsService.getTrail({ trailId });
      setTrail(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrail();
  }, []);

  return (
    <div className="flex-col pt-24">
      <div className="flex justify-between items-center pb-8">
        <div>
          <h1 className="text-[2rem] font-semibold">{trail?.name}</h1>
          <p className="text-sm">{trail?.description}</p>
        </div>
        <ModalCreatePost
          service={postService}
          trailId={trailId}
          fetchTrail={fetchTrail}
          loading={loading}
        />
      </div>
      <div className="bg-secondary-bg min-h-screen p-8 rounded-base flex flex-col items-end gap-8 inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        {trail?.trail_post.map((post, index) => {
          const colorClass = colors[index % colors.length];
          return (
            <Paper
              key={post.id}
              className="flex-col gap-0 lg:max-w-[50%] min-w-[100px]"
            >
              <div className={`${colorClass} p-4 w-full rounded-t-sm`}>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
              </div>
              <div className="p-4">
                <p>{post.content}</p>
              </div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}
