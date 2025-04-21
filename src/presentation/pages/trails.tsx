"use client";

import { ITrails, ITrailsContract } from "@/domain/models/trails";
import {
  ModalCreateTrail,
  Skeleton,
  ModalPlans,
  Card,
  Badge,
  BarChart,
} from "../components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth, useToast } from "../hooks";
import {
  RiAddLine,
  RiBarChart2Fill,
  RiDiamondLine,
  RiMegaphoneLine,
  RiSignpostFill,
} from "@remixicon/react";
import { UnauthorizedError } from "@/domain/errors";

interface Props {
  service: ITrailsContract;
}

const chartdata = [
  {
    date: "Em breve",
    comingSoon: 2890,
  },
  {
    date: "Em breve",
    comingSoon: 2756,
  },
  {
    date: "Em breve",
    comingSoon: 3322,
  },
  {
    date: "Em breve",
    comingSoon: 3470,
  },
  {
    date: "Em breve",
    comingSoon: 3475,
  },
  {
    date: "Em breve",
    comingSoon: 3129,
  },
  {
    date: "Em breve",
    comingSoon: 3490,
  },
  {
    date: "Em breve",
    comingSoon: 2903,
  },
  {
    date: "Em breve",
    comingSoon: 2643,
  },
  {
    date: "Em breve",
    comingSoon: 2837,
  },
  {
    date: "Em breve",
    comingSoon: 2954,
  },
  {
    date: "Em breve",
    comingSoon: 3239,
  },
];

export function TrailsPage({ service }: Props) {
  const { toast } = useToast();
  const { user } = useAuth();

  const [trails, setTrails] = useState<Array<ITrails>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTrails = async () => {
    setLoading(true);
    try {
      const data = await service.getTrails();
      setTrails(data);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        return;
      }
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
          <Card className="bg-primary-500 size-14 p-4 flex justify-center items-center text-text-secondary">
            <RiSignpostFill className="size-14" aria-hidden="true" />
          </Card>
          <h1 className="text-[2rem] font-semibold">Trilhas</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {loading ? (
            <>
              <Skeleton className="flex-col h-36 p-4 text-center" />
              <Skeleton className="flex-col h-36 p-4 text-center" />
              <Skeleton className="flex-col h-36 p-4 text-center" />
            </>
          ) : (
            trails.length > 0 &&
            trails.map((trail) => (
              <Link key={trail.id} href={`/trails/${trail.id}`}>
                <Card withBorder className="h-36 hover:bg-gray-100">
                  <div className="h-full text-center flex flex-col justify-center">
                    <h2 className="text-2xl font-bold truncate overflow-hidden">
                      {trail.name}
                    </h2>
                    <p className="overflow-hidden break-words text-gray-500">
                      {trail.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))
          )}
          {user?.plan.maxTrails !== undefined &&
          trails.length >= user.plan.maxTrails ? (
            <ModalPlans
              trigger={
                <Card
                  withBorder
                  className="h-36 cursor-pointer hover:bg-gray-100"
                >
                  <div className="h-full flex justify-center items-center">
                    <Badge className="absolute top-2 right-2" variant="default">
                      <RiDiamondLine className="size-5" aria-hidden="true" />
                      Premium
                    </Badge>
                    <RiAddLine aria-hidden="true" />
                  </div>
                </Card>
              }
            />
          ) : (
            <ModalCreateTrail
              trigger={
                <Card
                  withBorder
                  className="h-36 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex justify-center items-center h-full">
                    <RiAddLine aria-hidden="true" />
                  </div>
                </Card>
              }
              service={service}
              fetchTrails={fetchTrails}
            />
          )}
        </div>
      </div>
      <div className="flex gap-9 flex-col pt-24">
        <div className="flex items-center gap-4">
          <Card className="bg-secondary-500 size-14 p-4 flex justify-center items-center text-text-secondary">
            <RiBarChart2Fill className="size-14" aria-hidden="true" />
          </Card>
          <h1 className="text-[2rem] font-semibold">
            Ranking
            <Badge variant="warning" className="ml-2">
              <RiMegaphoneLine className="size-4" aria-hidden="true" />
              Em breve
            </Badge>
          </h1>
        </div>
        <div className="w-full flex gap-8 blur-sm">
          <Card withBorder className="w-full">
            <BarChart
              colors={["secondary"]}
              className="h-80 w-full"
              data={chartdata}
              index="date"
              categories={["comingSoon"]}
              valueFormatter={(number: number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
              }
              onValueChange={(v) => console.log(v)}
              xAxisLabel="Coming Soon"
            />
          </Card>
        </div>
      </div>
    </>
  );
}
