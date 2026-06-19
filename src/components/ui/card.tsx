import { cn } from "@/lib/utils";
import type * as React from "react";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn("p-6", className)} {...props} />;
}

export { Card, CardContent };
