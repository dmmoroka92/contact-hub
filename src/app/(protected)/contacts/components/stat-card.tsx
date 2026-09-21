import { ArrowDown, ArrowUp } from "lucide-react";

import { STAT_CONFIG } from "@/features/contacts/configs/stat-card.config";
import { cn } from "@/lib/utils";

export type StatCardType =
  | "contacts"
  | "companies"
  | "tags"
  | "favorites";

type StatCardProps = {
  type: StatCardType;
  value: number;
  change: number;
};

function StatCard({
  type,
  value,
  change,
}: StatCardProps) {
  const config = STAT_CONFIG[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200",
        "px-5 py-4",
        config.cardClassName,
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-xl",
            config.iconWrapperClassName,
          )}
        >
          <Icon className="size-6" />
        </div>

        <div className="min-w-0">
          <p className="text-2xl font-semibold leading-none text-slate-950">
            {value}
          </p>

          <p className="mt-1.5 text-sm text-slate-500">
            {config.title}
          </p>

          {change !== 0 && (
            <div
              className={cn(
                "mt-3 flex items-center gap-1 text-sm",
                change > 0
                  ? "text-emerald-600"
                  : "text-red-600",
              )}
            >
              {change > 0 ? (
                <ArrowUp className="size-4" />
              ) : (
                <ArrowDown className="size-4" />
              )}

              <span>
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
