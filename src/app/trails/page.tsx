"use client";

import { makeTrailServiceFactory } from "@/main/factories/services";
import { TrailsPage } from "@/presentation/pages";

export default function Trails() {
  return <TrailsPage service={makeTrailServiceFactory()} />;
}
