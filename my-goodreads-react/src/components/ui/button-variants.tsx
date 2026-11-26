import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 shrink-0 rounded-xl cursor-pointer transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary to-primary/60 text-white shadow hover:opacity-90",
        default: "bg-accent text-textcolor shadow-xs hover:bg-accent/80",
        login: "bg-background text-primary shadow-xs hover:bg-accent/80",
        logout: "bg-red text-primary shadow-xs hover:bg-red/80",
        edit: "bg-red text-primary shadow-xs hover:bg-red/80 font-medium",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export { buttonVariants };
