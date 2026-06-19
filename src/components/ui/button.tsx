import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hd-sageDeep/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        health:
          "rounded-xl bg-hd-green text-hd-ink shadow-[0_10px_30px_rgba(92,191,111,0.20)] hover:-translate-y-0.5 hover:bg-hd-green/90 active:translate-y-0 active:scale-[0.98]",
        healthSecondary:
          "rounded-xl border border-hd-line bg-hd-card text-hd-ink shadow-sm hover:-translate-y-0.5 hover:bg-hd-cream active:translate-y-0 active:scale-[0.98]",
        healthOutline:
          "rounded-xl border border-hd-sageDeep/35 bg-transparent text-hd-sageDeep hover:-translate-y-0.5 hover:bg-hd-sage/70 active:translate-y-0 active:scale-[0.98]",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7 py-3",
        sm: "h-10 px-5 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    readonly asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
