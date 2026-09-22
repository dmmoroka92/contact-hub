import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type BulkActionButtonProps = {
  icon: LucideIcon;
  label: string;
  destructive?: boolean;
  onClick: () => void;
};

function BulkActionButton({
  icon: Icon,
  label,
  destructive = false,
  onClick,
}: BulkActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2",
        "rounded-lg border px-3 py-2",
        "text-sm font-medium transition",
        destructive
          ? "border-red-200 bg-white text-red-600 hover:bg-red-50"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}

export default BulkActionButton;
