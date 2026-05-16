Table pagination component for table/data-grid style pagination. Provides page controls and delegates state to the parent when used in controlled mode; can also operate uncontrolled with `initialPage`.

```tsx
import { TablePagination } from "basic-ui/core";
<TablePagination pageCount={10} currentPage={1} onPageChange={setPage} />;
```

## Api Reference

| **Prop**            | Type                         | Default                                         |
| ------------------- | ---------------------------- | ----------------------------------------------- |
| totalItems          | number                       | —                                               |
| itemsPerPage        | number                       | —                                               |
| pageCount           | number                       | — (optional; overrides totalItems/itemsPerPage) |
| currentPage         | number                       | — (controlled mode)                             |
| initialPage         | number                       | 1 (uncontrolled mode)                           |
| onPageChange        | (page: number) => void       | —                                               |
| icons / customIcons | Partial<PageNavigationIcons> | —                                               |
| showFirstLast       | boolean                      | true                                            |
| showPrevNext        | boolean                      | true                                            |
| maxSiblingButtons   | number                       | 2                                               |
| maxBoundaryButtons  | number                       | 1                                               |
| shape               | "rounded"                    | "rounded"                                       |

## Examples

### Controlled (table/data pagination)

Parent owns the current page and slices data accordingly.

```tsx
const [page, setPage] = useState(1);
const data = allData.slice((page - 1) * 10, page * 10);
<TablePagination pageCount={20} currentPage={page} onPageChange={setPage} />;
```

### Uncontrolled (self-managed)

Let the component manage page state locally.

```tsx
<TablePagination pageCount={8} initialPage={2} />
```

### Using `pageCount` from API

If your API returns total pages, pass `pageCount` directly.

```tsx
<TablePagination pageCount={response.totalPages} currentPage={current} onPageChange={setCurrent} />
```

## Accessibility

- Uses a `nav` element with `role="navigation"` and `aria-label="Pagination"`.
- Buttons include `aria-label` and the active page has `aria-current="page"`.
- Disabled navigation buttons use the native `disabled` attribute.

## Notes

- Use `TablePagination` for table/data pagination where the parent typically manages data slicing.
- For URL-driven page navigation (blog-style), use `LinkPagination` which renders links for each page.

---

For source and stories, see: https://github.com/basic-ui-team/basic-ui/tree/main/packages/core/src/components/Pagination
