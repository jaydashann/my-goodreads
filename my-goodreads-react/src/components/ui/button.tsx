import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

function Button({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean;
  }) {
    const Comp = asChild ? Slot : "button";

    return ()
  }

export { Button };
