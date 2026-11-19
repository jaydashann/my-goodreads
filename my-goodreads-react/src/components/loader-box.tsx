import { cn } from "../lib/utils";
import Blocks from "/loader/blocks-wave.svg";
export default function LoaderBox({
  className,
  isVisible,
}: {
  className?: string;
  isVisible: boolean;
}) {
  if (!isVisible) return;
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-white/90 z-51 select-none",
        className,
      )}
    >
      <img src={Blocks} alt="Loading" className="w-[6rem]" />
    </div>
  );
}
