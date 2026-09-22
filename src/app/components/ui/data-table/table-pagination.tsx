
import { cn } from "@/lib/utils";
import { getVisiblePages } from "./pagination.utils";
import PaginationButton from "./pagination-button";

export type Pagination = {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};


type TablePaginationProps = {
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: number) => void;
};

function TablePagination({
  pagination,
  onPageChange,
  onPerPageChange,
}: TablePaginationProps) {
  const {
    currentPage,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = pagination;

  const from =
    totalItems === 0
      ? 0
      : (currentPage - 1) * perPage + 1;

  const to = Math.min(
    currentPage * perPage,
    totalItems,
  );

  const pages = getVisiblePages(
    currentPage,
    totalPages,
  );

  return (
    <div className="flex items-center justify-between gap-6 py-2">
      <p className="text-sm text-slate-500">
        Showing {from}–{to} of {totalItems} items
      </p>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">
            Show
          </span>

          <select
            value={perPage}
            onChange={(event) =>
              onPerPageChange(
                Number(event.target.value),
              )
            }
            className={cn(
              "cursor-pointer rounded-lg border border-slate-200",
              "bg-white px-3 py-2",
              "text-sm text-slate-700",
              "outline-none",
              "focus:border-blue-500",
              "focus:ring-2 focus:ring-blue-100",
            )}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

          <span className="text-sm text-slate-500">
            per page
          </span>
        </div>

        {totalPages > 0 && (
          <div className="flex items-center gap-1">
            <PaginationButton
              disabled={!hasPreviousPage}
              onClick={() =>
                onPageChange(currentPage - 1)
              }
            >
              ‹
            </PaginationButton>

            {pages.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm text-slate-500"
                >
                  ...
                </span>
              ) : (
                <PaginationButton
                  key={item}
                  active={item === currentPage}
                  onClick={() =>
                    onPageChange(item)
                  }
                >
                  {item}
                </PaginationButton>
              ),
            )}

            <PaginationButton
              disabled={!hasNextPage}
              onClick={() =>
                onPageChange(currentPage + 1)
              }
            >
              ›
            </PaginationButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default TablePagination;