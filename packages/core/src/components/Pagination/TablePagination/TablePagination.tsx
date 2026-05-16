import React, { useMemo } from "react";
import { generatePageNumbers } from "../shared/generatePageNumbers";
import { calculatePaginationState } from "@core/lib/calculatePaginationState";
import {
  paginationVariants,
  paginationButtonVariants,
  paginationEllipsisVariants,
} from "../shared/pagination.variants.ts";
import { Icon } from "../../Icon";
import { ChevronLeftIcon, ChevronRightIcon } from "@basic-ui/icons";
import type { TablePaginationProps } from "./tablePagination.types";

export const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  (
    {
      totalItems,
      itemsPerPage,
      pageCount,
      currentPage,
      onPageChange,
      customIcons,
      showFirstLast = true,
      showPrevNext = true,
      maxSiblingButtons = 2,
      maxBoundaryButtons = 1,
      shape = "rounded",
      variant: variant = "default",
        color = "default",
      className,
      ...rest
    },
    ref,
  ) => {
    const [internalCurrentPage, setInternalCurrentPage] = React.useState<number>(() =>
      typeof currentPage === "number" ? currentPage : rest.initialPage ?? 1,
    );

    const isControlled = typeof currentPage === "number";
    const activeCurrentPage = isControlled ? (currentPage as number) : internalCurrentPage;

    const handlePageChange = (page: number) => {
      if (!isControlled) {
        setInternalCurrentPage(page);
      }
      onPageChange?.(page);
    };

    // ...existing code...

    // Prefer explicit pageCount, else compute
    const totalPages = useMemo(
      () => pageCount ?? (totalItems && itemsPerPage ? Math.ceil(totalItems / itemsPerPage) : 1),
      [pageCount, totalItems, itemsPerPage],
    );

    // Keep uncontrolled internal page in range if totalPages changes
    React.useEffect(() => {
      if (!isControlled) {
        setInternalCurrentPage((prev) => {
          if (prev < 1) return 1;
          if (prev > totalPages) return totalPages;
          return prev;
        });
      }
    }, [totalPages, isControlled]);

    const { hasPrev, hasNext } = useMemo(
      () => calculatePaginationState(totalPages, 1, activeCurrentPage),
      [totalPages, activeCurrentPage],
    );
    const pageNumbers = useMemo(
      () =>
        generatePageNumbers(activeCurrentPage, totalPages, maxSiblingButtons, maxBoundaryButtons),
      [activeCurrentPage, totalPages, maxSiblingButtons, maxBoundaryButtons],
    );

    const icons = {
      previous: customIcons?.previous || <ChevronLeftIcon />,
      next: customIcons?.next || <ChevronRightIcon />,
      first: customIcons?.first || <ChevronLeftIcon />,
      last: customIcons?.last || <ChevronRightIcon />,
    };
    if (totalPages <= 1) return null;
    return (
      <nav
        ref={ref}
        className={paginationVariants({}) + (className ? ` ${className}` : "")}
        role="navigation"
        aria-label="Pagination"
        {...rest}
      >
        {showFirstLast && (
          <button
            onClick={() => handlePageChange(1)}
            disabled={!hasPrev}
            className={paginationButtonVariants({ size: "md", shape, variant, color })}
            aria-label="Go to first page"
          >
            <Icon icon={icons.first} size="md" />
          </button>
        )}
        {showPrevNext && (
          <button
            onClick={() => handlePageChange(activeCurrentPage - 1)}
            disabled={!hasPrev}
            className={paginationButtonVariants({ size: "md", shape, variant, color })}
            aria-label="Go to previous page"
          >
            <Icon icon={icons.previous} size="sm" />
          </button>
        )}
        {pageNumbers.map((page, idx) =>
          page === "ellipsis" ? (
            <div
              key={`ellipsis-${idx}`}
              className={paginationEllipsisVariants()}
              aria-hidden="true"
            >
              …
            </div>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={paginationButtonVariants({
                size: "md",
                shape,
                variant,
                color,
                active: page === activeCurrentPage,
              })}
              aria-current={page === activeCurrentPage ? "page" : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ),
        )}
        {showPrevNext && (
          <button
            onClick={() => handlePageChange(activeCurrentPage + 1)}
            disabled={!hasNext}
            className={paginationButtonVariants({ size: "md", shape, variant, color })}
            aria-label="Go to next page"
          >
            <Icon icon={icons.next} size="sm" />
          </button>
        )}
        {showFirstLast && (
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={!hasNext}
            className={paginationButtonVariants({ size: "md", shape, variant, color })}
            aria-label="Go to last page"
          >
            <Icon icon={icons.last} size="md" />
          </button>
        )}
      </nav>
    );
  },
);

TablePagination.displayName = "TablePagination";
