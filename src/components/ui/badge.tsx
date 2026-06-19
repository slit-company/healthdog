import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-3 py-1 text-[13px] font-semibold leading-none transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        outline: "text-foreground",
        health: "border-hd-sageDeep/25 bg-hd-sage text-hd-ink",
        healthYellow: "border-transparent bg-hd-yellow/20 text-hd-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps): JSX.Element {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
