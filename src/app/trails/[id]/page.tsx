"use client";

import {
  makePostServiceFactory,
  makeTrailServiceFactory,
} from "@/main/factories/services";
import { TrailPage } from "@/presentation/pages";

interface Props {
  params: ParamsProps;
}

interface ParamsProps {
  id: string;
}

export default function Trail({ params }: Props) {
  return (
    <TrailPage
      postService={makePostServiceFactory()}
      trailsService={makeTrailServiceFactory()}
      trailId={params.id}
    />
  );
}
