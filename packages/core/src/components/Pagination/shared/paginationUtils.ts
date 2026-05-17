const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxSiblingButtons: number = 2,
  maxBoundaryButtons: number = 1,
): (number | "ellipsis")[] => {
  if (totalPages <= 1) return [];

  // Calculate page ranges
  const startBoundary = maxBoundaryButtons;
  const endBoundary = totalPages - maxBoundaryButtons + 1;

  // Calculate sibling range, adjusted to maintain consistent output width
  let siblingStart = currentPage - maxSiblingButtons;
  let siblingEnd = currentPage + maxSiblingButtons;

  // Expand sibling range if we're near boundaries to maintain consistent width
  if (siblingStart <= startBoundary + 1) {
    siblingEnd = Math.min(siblingEnd + (startBoundary + 1 - siblingStart), totalPages);
    siblingStart = startBoundary + 1;
  }

  if (siblingEnd >= endBoundary - 1) {
    siblingStart = Math.max(siblingStart - (siblingEnd - (endBoundary - 1)), 1);
    siblingEnd = endBoundary - 1;
  }

  const pages: (number | "ellipsis")[] = [];
  const addedPages = new Set<number>();

  // Helper to add a page if not already added
  const addPage = (page: number) => {
    if (page >= 1 && page <= totalPages && !addedPages.has(page)) {
      pages.push(page);
      addedPages.add(page);
    }
  };

  // Add start boundary pages
  for (let i = 1; i <= startBoundary && i <= totalPages; i++) {
    addPage(i);
  }

  // Add ellipsis if there's a gap
  if (siblingStart > startBoundary + 1) {
    pages.push("ellipsis");
  }

  // Add sibling pages (skip if overlapping with start boundary)
  for (let i = Math.max(siblingStart, startBoundary + 1); i <= siblingEnd; i++) {
    addPage(i);
  }

  // Add ellipsis if there's a gap before end boundary
  if (siblingEnd < endBoundary - 1) {
    pages.push("ellipsis");
  }

  // Add end boundary pages
  for (let i = Math.max(endBoundary, siblingEnd + 1); i <= totalPages; i++) {
    addPage(i);
  }

  return pages;
};

interface PaginationState {
  /** Total number of pages. */
  totalPages: number;
  /** Index of the first item on the current page (0-indexed). */
  startIndex: number;
  /** Index of the last item on the current page (0-indexed). */
  endIndex: number;
  /** Whether there is a previous page. */
  hasPrev: boolean;
  /** Whether there is a next page. */
  hasNext: boolean;
}

const calculatePaginationState = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
  pageCount?: number,
): PaginationState => {
  const totalPages =
    pageCount ?? (totalItems && itemsPerPage ? Math.ceil(totalItems / itemsPerPage) : 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  return {
    totalPages,
    startIndex,
    endIndex,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
};

export { generatePageNumbers, clamp, calculatePaginationState };
