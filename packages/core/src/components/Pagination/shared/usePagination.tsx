import { useMemo, useState, useEffect } from "react";
import type { usePaginationProps } from "./pagination.types";
import { calculatePaginationState, clamp, generatePageNumbers } from "./paginationUtils";

export function usePagination({
  totalItems,
  itemsPerPage,
  pageCount,
  initialPage,
  currentPage,
  onPageChange,
  maxSiblingButtons = 2,
  maxBoundaryButtons = 1,
}: usePaginationProps) {
  const [internalCurrentPage, setInternalCurrentPage] = useState<number>(() =>
    typeof currentPage === "number" && currentPage > 0 ? currentPage : initialPage || 1,
  );

  const isControlled = typeof currentPage === "number";

  const { totalPages, hasPrev, hasNext } = calculatePaginationState(
    totalItems ?? 0,
    itemsPerPage ?? 1,
    isControlled ? (currentPage as number) : internalCurrentPage,
    pageCount,
  );

  const activeCurrentPage = isControlled
    ? clamp((currentPage as number) || 1, 1, totalPages)
    : internalCurrentPage;

  // if uncontrolled, ensure internal state stays within new totalPages when it changes
  useEffect(() => {
    if (!isControlled) {
      setInternalCurrentPage((prev) => clamp(prev, 1, totalPages));
    }
  }, [totalPages, isControlled]);

  const pageNumbers = useMemo(
    () => generatePageNumbers(activeCurrentPage, totalPages, maxSiblingButtons, maxBoundaryButtons),
    [activeCurrentPage, totalPages, maxSiblingButtons, maxBoundaryButtons],
  );

  const handlePageChange = (page: number) => {
    const newPage = clamp(page, 1, totalPages);
    if (!isControlled) {
      setInternalCurrentPage(newPage);
    }
    onPageChange?.(newPage);
  };

  return {
    totalPages,
    activeCurrentPage,
    pageNumbers,
    hasPrev,
    hasNext,
    handlePageChange,
  };
}
