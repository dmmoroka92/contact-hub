export type PaginationItem = number | "ellipsis";

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 4) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  let start = Math.max(1, currentPage - 1);
  let end = Math.min(totalPages, start + 2);

  start = Math.max(1, end - 2);

  const pages: PaginationItem[] = [];

  if (start > 1) {
    pages.push(1);

    if (start > 2) {
      pages.push("ellipsis");
    }
  }

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);
  }

  return pages;
}