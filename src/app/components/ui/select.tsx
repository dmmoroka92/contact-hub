import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

function Select({
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border border-slate-300",
        "bg-white px-3 py-2.5",
        "text-sm text-slate-950",
        "outline-none transition",
        "focus:border-slate-500",
        "focus:ring-2 focus:ring-slate-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export default Select;
