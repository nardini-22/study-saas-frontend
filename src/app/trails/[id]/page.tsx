"use client";

import {
  makePostServiceFactory,
  makeTrailServiceFactory,
} from "@/main/factories/services";
import { TrailPage } from "@/presentation/pages";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Trail({ params }: Props) {
  const { id } = use(params);
  return (
    <TrailPage
      postService={makePostServiceFactory()}
      trailsService={makeTrailServiceFactory()}
      trailId={id}
    />
  );
}
