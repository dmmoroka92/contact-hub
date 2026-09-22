import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import BulkActionButton from "./bulk-action-button";

export type BulkAction = {
  label: string;
  icon: LucideIcon;
  handler: (itemIds: number[]) => void;
  isDestructive?: boolean;
};

type BulkActionsProps = {
  itemIds: number[];
  actions: BulkAction[];
  onClear: () => void;
};

function BulkActions({
  itemIds,
  actions,
  onClear,
}: BulkActionsProps) {
  return (
    <div
      className={cn(
        "flex min-h-13 items-center justify-between gap-4",
        "rounded-xl border border-blue-100 bg-blue-50/70",
        "px-4 py-2",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-900">
          {itemIds.length}{" "}
          {itemIds.length === 1 ? "item" : "items"} selected
        </span>

        <div className="h-6 w-px bg-slate-200" />

        {actions.map((action) => (
          <BulkActionButton
            key={action.label}
            icon={action.icon}
            label={action.label}
            destructive={action.isDestructive}
            onClick={() => action.handler(itemIds)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onClear}
        className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Clear selection
      </button>
    </div>
  );
}

export default BulkActions;