import { RiDiamondLine, RiMegaphoneLine } from "@remixicon/react";
import { Badge } from "./ui";

type typeProps = "coming soon" | "premium";

interface Props {
  type: typeProps;
  className?: string;
}

export function Badges({ type, className }: Props) {
  switch (type) {
    case "coming soon":
      return (
        <Badge variant="warning" className={className}>
          <RiMegaphoneLine className="size-4" aria-hidden="true" />
          Em breve
        </Badge>
      );
    case "premium":
      return (
        <Badge variant="default" className={className}>
          <RiDiamondLine className="size-5" aria-hidden="true" />
          Premium
        </Badge>
      );
    default:
      return null;
  }
}
