import { cn } from "@/lib";
import { cva, VariantProps } from "class-variance-authority";

const paperVariants = cva(
  "text-mtext border-2 border-border shadow-shadow inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: {
        default: "bg-bw",
        primary: "bg-main",
        blue: "bg-main-blue",
        orange: "bg-main-orange",
        pink: "bg-main-pink",
        green: "bg-main-green",
        purple: "bg-main-purple",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

type TypeProps = "button" | "card";

interface Props extends VariantProps<typeof paperVariants> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: TypeProps;
}

export function Paper({
  children,
  className,
  color,
  onClick,
  type = "card",
}: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        type === "button" &&
          "hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none hover:cursor-pointer",
        paperVariants({ className, color })
      )}
    >
      {children}
    </div>
  );
}
