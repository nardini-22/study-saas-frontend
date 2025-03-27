"use client";

import { ITrails, ITrailsContract } from "@/domain/models/trails";
import { ModalCreateTrail, Paper } from "../components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Footprints } from "lucide-react";

interface Props {
  service: ITrailsContract;
}

export function TrailsPage({ service }: Props) {
  const [trails, setTrails] = useState<Array<ITrails>>([]);
  const fetchTrails = async () => {
    try {
      const data = await service.getTrails();
      setTrails(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrails();
  }, []);

  return (
    <div className="flex gap-8 flex-col">
      <div className="flex items-center gap-4">
        <Paper color="primary" className="size-14">
          <Footprints />
        </Paper>
        <h1 className="text-[2rem] font-semibold">Trilhas</h1>
      </div>
      <div className="gap-8 flex">
        {trails.length > 0 &&
          trails.map((trail) => (
            <Link key={trail.id} href={`/trails/${trail.id}`}>
              <Paper className="flex-col p-4">
                <h1 className="text-2xl font-semibold">{trail.name}</h1>
                <p>{trail.description}</p>
              </Paper>
            </Link>
          ))}
        <ModalCreateTrail service={service} />
      </div>
    </div>
  );
}
