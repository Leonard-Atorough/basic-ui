import { SharedPaginationProps } from "../shared/sharedProps";

export interface TablePaginationProps extends SharedPaginationProps{

  /** Callback invoked when the user navigates to a different page. Receives the new page number. */
  onPageChange?: (page: number) => void;
}

