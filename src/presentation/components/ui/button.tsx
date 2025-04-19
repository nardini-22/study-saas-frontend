// Tremor Button [v1.0.0]

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { RiLoader2Fill } from "@remixicon/react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn, focusRing } from "@/lib/utils";

const buttonVariants = tv({
  base: [
    // base
    "cursor-pointer relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-center text-sm font-medium shadow-xs transition-all duration-100 ease-in-out",
    // disabled
    "disabled:pointer-events-none disabled:shadow-none",
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        // border
        "border-transparent",
        // text color
        "text-text-secondary dark:text-text-secondary",
        // background color
        "bg-primary-500 dark:bg-primary-500",
        // hover color
        "hover:bg-primary-900 dark:hover:bg-primary-900",
        // disabled
        "disabled:bg-primary-300 disabled:text-text-secondary",
        "dark:disabled:bg-primary-800 dark:disabled:text-secondary-400",
      ],
      secondary: [
        // border
        "border-transparent",
        // text color
        "text-text-secondary dark:text-text-secondary",
        // background color
        "bg-secondary-500 dark:bg-secondary-500",
        // hover color
        "hover:bg-secondary-900 dark:hover:bg-secondary-900",
        // disabled
        "disabled:bg-secondary-300 disabled:text-text-secondary",
        "dark:disabled:bg-secondary-800 dark:disabled:text-secondary-400",
      ],
      light: [
        // border
        "border-gray-300 dark:border-gray-800",
        // text color
        "text-gray-900 dark:text-gray-50",
        // background color
        "bg-background-primary dark:bg-gray-950",
        //hover color
        "hover:text-primary-500 hover:bg-gray-200 dark:hover:bg-gray-900/60",
        // disabled
        "disabled:text-gray-400",
        "dark:disabled:text-gray-600",
      ],
      ghost: [
        // base
        "shadow-none",
        // border
        "border-transparent",
        // text color
        "text-gray-900 dark:text-gray-50",
        // hover color
        "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800/80",
        // disabled
        "disabled:text-gray-400",
        "dark:disabled:text-gray-600",
      ],
      destructive: [
        // text color
        "text-text-secondary",
        // border
        "border-transparent",
        // background color
        "bg-red-600 dark:bg-red-700",
        // hover color
        "hover:bg-red-700 dark:hover:bg-red-600",
        // disabled
        "disabled:bg-red-300 disabled:text-text-secondary",
        "dark:disabled:bg-red-950 dark:disabled:text-red-400",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      children,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        className={cn(buttonVariants({ variant }), className)}
        disabled={disabled || isLoading}
        tremor-id="tremor-raw"
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <RiLoader2Fill
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">
              {loadingText ? loadingText : "Loading"}
            </span>
            {loadingText ? loadingText : children}
          </span>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
