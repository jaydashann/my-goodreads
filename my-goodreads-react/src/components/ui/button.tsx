import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 shrink-0 rounded-lg cursor-pointer transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary to-primary/60 text-white shadow hover:opacity-90",
        default:
          "bg-accent text-textcolor shadow-xs hover:bg-accent/80",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp 
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };