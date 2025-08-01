import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2",
  {
    variants: {
      variant: {
        default:
          "bg-cyber-orange text-cyber-dark border-cyber-orange hover:bg-cyber-orange-light hover:border-cyber-orange-light cyber-glow",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90 hover:border-destructive/90",
        outline:
          "border-cyber-orange bg-transparent text-cyber-orange hover:bg-cyber-orange hover:text-cyber-dark",
        secondary:
          "bg-cyber-dark-lighter text-foreground border-cyber-dark-lighter hover:bg-cyber-dark-light hover:border-cyber-dark-light",
        ghost:
          "border-transparent hover:bg-cyber-dark-lighter hover:border-cyber-orange text-foreground",
        link: "text-cyber-orange underline-offset-4 hover:underline border-transparent",
        success:
          "bg-success text-success-foreground border-success hover:bg-success/90 hover:border-success/90",
        warning:
          "bg-warning text-warning-foreground border-warning hover:bg-warning/90 hover:border-warning/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
