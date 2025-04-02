"use client";

import { ITrails, ITrailsContract } from "@/domain/models/trails";
import { ModalCreateTrail, Paper, Skeleton } from "../components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Footprints, Plus } from "lucide-react";
import { useToast } from "../hooks";

interface Props {
  service: ITrailsContract;
}

export function TrailsPage({ service }: Props) {
  const { toast } = useToast();

  const [trails, setTrails] = useState<Array<ITrails>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrails = async () => {
    setLoading(true);
    try {
      const data = await service.getTrails();
      setTrails(data);
    } catch (err) {
      toast({
        variant: "error",
        title: "Erro ao carregar dados!",
        description: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrails();
  }, []);

  return (
    <>
      <div className="h-[270px] absolute bg-secondary-bg w-screen top-0 left-0 -z-10" />
      <div className="flex gap-9 flex-col pt-24">
        <div className="flex items-center gap-4">
          <Paper color="primary" className="size-14">
            <Footprints />
          </Paper>
          <h1 className="text-[2rem] font-semibold">Trilhas</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {loading ? (
            <>
              <Skeleton className="flex-col h-36 p-4 text-center" />
              <Skeleton className="flex-col h-36 p-4 text-center" />
              <Skeleton className="flex-col h-36 p-4 text-center" />
              <Skeleton className="flex-col h-36 p-4 text-center" />
              <Skeleton className="flex-col h-36 p-4 text-center" />
            </>
          ) : (
            trails.length > 0 &&
            trails.map((trail) => (
              <Link key={trail.id} href={`/trails/${trail.id}`}>
                <Paper type="button" className="flex-col h-36 p-4 text-center">
                  <div className="w-full">
                    <h1 className="text-2xl font-bold truncate overflow-hidden">
                      {trail.name}
                    </h1>
                    <p className="overflow-hidden break-words">
                      {trail.description}
                    </p>
                  </div>
                </Paper>
              </Link>
            ))
          )}
          <ModalCreateTrail
            trigger={
              <Paper type="button" className="h-36">
                <Plus size={24} />
              </Paper>
            }
            service={service}
            fetchTrails={fetchTrails}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}
