import { cva } from "class-variance-authority";

const labelVariants = cva("cursor-pointer", {
  variants: {
    variant: {
      default:
        "pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm font-sm text-white opacity-0 transition-opacity group-hover:opacity-100",
      side: "pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm font-sm text-white opacity-0 transition-opacity group-hover:opacity-100",
      profile:
        "pointer-events-none absolute top-full left-1/2 z-50 mt-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-2 py-3 text-xs font-sm text-white opacity-0 transition-opacity group-hover:opacity-100",
      account:
        "pointer-events-none absolute top-full left-1/2 z-50 mt-3 -translate-x-4/5 whitespace-nowrap rounded-lg bg-black px-2 py-3 text-xs font-sm text-white opacity-0 transition-opacity group-hover:opacity-100",
    },
    textVariant: {
      default: "text-3xl",
      side: "text-3xl",
      account: "text-black text-xs mb-2",
      profile: "shrink-0 text-3xl text-grayscale",
    },
  },
  defaultVariants: {
    variant: "default",
    textVariant: "default",
  },
});

export { labelVariants };
