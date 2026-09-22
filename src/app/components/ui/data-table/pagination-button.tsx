import { cn } from "@/lib/utils";

type PaginationButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

function PaginationButton({
  children,
  active = false,
  disabled = false,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex size-9 items-center justify-center",
        "rounded-lg border",
        "text-sm font-medium transition",

        active
          ? "border-blue-600 bg-blue-600 text-white"
          : [
              "border-slate-200 bg-white text-slate-700",
              "hover:border-slate-300 hover:bg-slate-50",
            ],

        disabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer",
      )}
    >
      {children}
    </button>
  );
}

export default PaginationButton;