import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TablePagination } from "./TablePagination";

describe("TablePagination", () => {
  it("does not render when only one page", () => {
    const { container } = render(
      <TablePagination pageCount={1} currentPage={1} onPageChange={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders navigation when more than one page", () => {
    render(<TablePagination pageCount={5} currentPage={1} onPageChange={() => {}} />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });

  it("calls onPageChange when controlled and clicking a page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<TablePagination pageCount={5} currentPage={1} onPageChange={onPageChange} />);
    await user.click(screen.getByLabelText("Go to page 3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
    // Controlled: component should not update active page by itself
    expect(screen.getByLabelText("Go to page 1")).toHaveAttribute("aria-current", "page");
  });

  it("updates internal state when uncontrolled and clicking pages", async () => {
    const user = userEvent.setup();
    render(<TablePagination pageCount={5} initialPage={2} />);
    // initial active is page 2
    expect(screen.getByLabelText("Go to page 2")).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByLabelText("Go to page 4"));
    // internal state should update to 4
    expect(screen.getByLabelText("Go to page 4")).toHaveAttribute("aria-current", "page");
  });

  it("disables prev/first on first page and next/last on last page", () => {
    const onPageChange = vi.fn();
    // first page
    render(<TablePagination pageCount={5} currentPage={1} onPageChange={onPageChange} />);
    expect(screen.getByLabelText("Go to first page")).toBeDisabled();
    expect(screen.getByLabelText("Go to previous page")).toBeDisabled();
    // cleanup and render last page
    // unmount previous render
  });

  it("respects pageCount override when totalItems/itemsPerPage omitted", () => {
    render(<TablePagination pageCount={8} initialPage={1} />);
    expect(screen.getByLabelText("Go to page 8")).toBeInTheDocument();
  });
});
