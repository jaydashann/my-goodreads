import type { VariantProps } from "class-variance-authority";
import type { IconType } from "react-icons/lib";
import { cn } from "../../lib/utils";
import { labelVariants } from "./hover-label-variants";

type IconLabelProps = {
  icon: IconType;
  label: string;
  onClick?: () => void;
} & VariantProps<typeof labelVariants>;

function IconLabel({
  icon: Icon,
  label,
  onClick,
  variant,
  textVariant,
}: IconLabelProps) {
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        className={cn(labelVariants({ variant: null, textVariant }))}
      >
        <Icon />
      </button>
      <span className={cn(labelVariants({ variant, textVariant: null }))}>
        {label}
      </span>
    </div>
  );
}

export { IconLabel };
