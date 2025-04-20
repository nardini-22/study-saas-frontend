// Tremor Card [v1.0.0]

import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
  withBorder?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, withBorder, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    if (withBorder)
      return (
        <div
          className={cn(
            className,
            "z-10 h-full w-full rounded-xl shadow-xs bg-slate-50/40 p-1.5 ring-1 ring-inset ring-slate-200/50 custom-lg:h-fit"
          )}
        >
          <Component
            ref={forwardedRef}
            className={cn(
              // base
              "relative h-full !max-w-full rounded-lg border p-6 text-left shadow-xs",
              // background color
              "bg-white dark:bg-[#090E1A]",
              // border color
              "border-gray-200 dark:border-gray-900",
              className
            )}
            tremor-id="tremor-raw"
            {...props}
          />
        </div>
      );
    return (
      <Component
        ref={forwardedRef}
        className={cn(
          // base
          "relative rounded-lg border p-6 text-left shadow-xs",
          // background color
          "bg-white dark:bg-[#090E1A]",
          // border color
          "border-gray-200 dark:border-gray-900",
          className
        )}
        tremor-id="tremor-raw"
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, type CardProps };
