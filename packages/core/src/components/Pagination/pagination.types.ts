export interface PaginationProps {
  /** Total number of items to paginate. */
  totalItems: number;
  /** Number of items to display per page. */
  itemsPerPage: number;
  /** Current active page (1-indexed). */
  currentPage: number;
  /** Callback invoked when the user navigates to a different page. Receives the new page number. */
  onPageChange: (page: number) => void;
  /** Optional CSS class name for custom styling. */
  className?: string;
  /** Custom icons for pagination navigation buttons. Any omitted icons will use defaults. */
  icons?: Partial<PageNavigationIcons>;
  /** Show "First" and "Last" page navigation buttons. Defaults to `true`. */
  showFirstLast?: boolean;
  /** Show "Previous" and "Next" page navigation buttons. Defaults to `true`. */
  showPrevNext?: boolean;
  /** Maximum number of page number buttons to display adjacent to the current page. Defaults to 2. */
  maxSiblingButtons?: number;
  /** Maximum number of page number buttons to display at the start and end of the pagination. Defaults to 1. */
  maxBoundaryButtons?: number;
  /** Border radius style for page number buttons. Defaults to `rounded`. */
  shape?: "rounded" | "square";
}

export interface PageNavigationIcons {
  /** Icon for the "go to previous page" button. */
  previous: React.ReactNode;
  /** Icon for the "go to next page" button. */
  next: React.ReactNode;
  /** Icon for the "go to first page" button. */
  first: React.ReactNode;
  /** Icon for the "go to last page" button. */
  last: React.ReactNode;
}
