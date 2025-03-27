"use client";

interface Props {
  params: ParamsProps;
}

interface ParamsProps {
  id: string;
}

export default function Trail({ params }: Props) {
  console.log(params.id);
  return <div>Trail</div>;
}
