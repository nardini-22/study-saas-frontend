"use client";

import { ITrailsContract } from "@/domain/models/trails";
import { ModalCreateTrail } from "../components";

interface Props {
  service: ITrailsContract;
}

export function TrailsPage({ service }: Props) {
  return <ModalCreateTrail service={service} />;
}
