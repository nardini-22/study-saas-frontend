import { cn } from "@/lib";
import { cva, VariantProps } from "class-variance-authority";

const iconVariants = cva(
  "text-mtext border-2 border-border shadow-shadow inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: {
        default: "bg-main",
      },
      size: {
        default: "size-10",
        xs: "size-7",
        sm: "size-9",
        lg: "size-11",
      },
    },
    defaultVariants: {
      color: "default",
      size: "default",
    },
  }
);

interface Props extends VariantProps<typeof iconVariants> {
  icon: React.ReactNode;
}

export function IconContainer({ icon, size }: Props) {
  return <div className={cn(iconVariants({ size }))}>{icon}</div>;
}
