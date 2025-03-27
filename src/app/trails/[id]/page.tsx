"use client";

import { makePostServiceFactory } from "@/main/factories/services";
import { TrailPage } from "@/presentation/pages";

interface Props {
  params: ParamsProps;
}

interface ParamsProps {
  id: string;
}

export default function Trail({ params }: Props) {
  return <TrailPage service={makePostServiceFactory()} trailId={params.id} />;
}
