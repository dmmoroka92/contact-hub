"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import BulkActions, {
  type BulkAction,
} from "./bulk-actions";

import RowActions, {
  type RowAction,
} from "./row-actions";

import TablePagination, {
  type Pagination,
} from "./table-pagination";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => React.ReactNode;
};

type DataTableProps<T extends { id: number }> = {
  data: T[];
  columns: DataTableColumn<T>[];
  pagination: Pagination;
  bulkActions?: BulkAction[];
  rowActions?: RowAction[];
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

function DataTable<T extends { id: number }>({
  data,
  columns,
  pagination,
  bulkActions = [],
  rowActions = [],
  onPageChange,
  onPerPageChange,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] =
    useState<number[]>([]);

  const hasBulkActions = bulkActions.length > 0;
  const hasRowActions = rowActions.length > 0;

  const allSelected =
    data.length > 0 &&
    data.every((item) =>
      selectedIds.includes(item.id),
    );

  function toggleItem(id: number) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter(
            (selectedId) => selectedId !== id,
          )
        : [...current, id],
    );
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(
      data.map((item) => item.id),
    );
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  return (
    <div className="space-y-3">
      {hasBulkActions && selectedIds.length > 0 && (
        <BulkActions
          itemIds={selectedIds}
          actions={bulkActions}
          onClear={clearSelection}
        />
      )}

      <div
        className={cn(
          "overflow-hidden rounded-xl",
          "border border-slate-200 bg-white",
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50/60">
              <tr className="text-xs font-medium text-slate-500">
                {hasBulkActions && (
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="size-4 cursor-pointer rounded border-slate-300"
                      aria-label="Select all"
                    />
                  </th>
                )}

                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-4 py-3",
                      column.className,
                    )}
                  >
                    {column.header}
                  </th>
                ))}

                {hasRowActions && (
                  <th className="w-14 px-4 py-3">
                    <span className="sr-only">
                      Actions
                    </span>
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className={cn(
                    "text-sm text-slate-700",
                    "transition hover:bg-slate-50/70",
                  )}
                >
                  {hasBulkActions && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(
                          item.id,
                        )}
                        onChange={() =>
                          toggleItem(item.id)
                        }
                        className="size-4 cursor-pointer rounded border-slate-300"
                        aria-label={`Select item ${item.id}`}
                      />
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-4 py-3",
                        column.className,
                      )}
                    >
                      {column.render(item)}
                    </td>
                  ))}

                  {hasRowActions && (
                    <td className="px-4 py-3">
                      <RowActions
                        itemId={item.id}
                        actions={rowActions}
                      />
                    </td>
                  )}
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={
                      columns.length +
                      (hasBulkActions ? 1 : 0) +
                      (hasRowActions ? 1 : 0)
                    }
                    className="px-4 py-12 text-center text-sm text-slate-500"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination.totalPages > 1 && (
        <TablePagination
          pagination={pagination}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}
    </div>
  );
}

export default DataTable;
