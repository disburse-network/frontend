import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-cyber-orange bg-cyber-orange text-cyber-dark hover:bg-cyber-orange-light",
        secondary:
          "border-cyber-dark-lighter bg-cyber-dark-lighter text-foreground hover:bg-cyber-dark-light",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "border-cyber-orange text-cyber-orange hover:bg-cyber-orange hover:text-cyber-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
