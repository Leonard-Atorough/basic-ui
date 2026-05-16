import { CommonProps } from "@core/types/props";

export interface SharedPaginationProps extends Omit<CommonProps, "children"> {
  /** Total number of items to paginate. */
  totalItems?: number;
  /** Number of items to display per page. */
  itemsPerPage?: number;
  /** Total number of pages (overrides totalItems/itemsPerPage if provided). */
  pageCount?: number;
  /** Current active page (1-indexed). If omitted the component may manage state internally. */
  currentPage?: number;
  /** Initial page to use for uncontrolled mode (1-indexed). */
  initialPage?: number;
  /** Custom icons for pagination navigation buttons. Any omitted icons will use defaults. */
  customIcons?: Partial<PageNavigationIcons>;
  /** Show "First" and "Last" page navigation buttons. Defaults to `true`. */
  showFirstLast?: boolean;
  /** Show "Previous" and "Next" page navigation buttons. Defaults to `true`. */
  showPrevNext?: boolean;
  /** Maximum number of page number buttons to display adjacent to the current page. Defaults to 2. */
  maxSiblingButtons?: number;
  /** Maximum number of page number buttons to display at the start and end of the pagination. Defaults to 1. */
  maxBoundaryButtons?: number;
  /** Border radius style for page number buttons. Defaults to `rounded`. */
  shape?: "rounded" | "square" | "circular";
  /** Variant style for page number buttons. Defaults to `default`. */
  variant?: "default" | "outlined";
  /** Color style for page number buttons. Defaults to `default`. */
  color?: "default" | "primary" | "secondary";
}

export interface PageNavigationIcons {
  previous: React.ReactNode;
  next: React.ReactNode;
  first: React.ReactNode;
  last: React.ReactNode;
}
