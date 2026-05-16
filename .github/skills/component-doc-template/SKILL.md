---
name: component-doc-template
description: "Provides a markdown documentation template for UI components and guidance for filling it out."
argument-hint: "Component name or path (e.g., packages/core/src/components/Pagination/TablePagination)"
user-invocable: true
---

# Component Documentation Template Skill

Use this skill to generate consistent component documentation markdown files following the project's documentation style.

## Template (copy into `.docs/components/<Component>.md`)

````
# {Component Display Name}

Short one-line summary of the component and its purpose.

```tsx
import { {ComponentName} } from "basic-ui/core"
<{ComponentName} ... />
````

## Api Reference

Short description of the component and recommended usage.

| **Prop** | Type | Default |
| -------- | ---- | ------- |
| propName | type | default |

(Include all public props. For polymorphic components, document `as`/`itemsAs` and related behaviors.)

## Examples

### Basic usage

```tsx
// Minimal example of using the component
```

### Controlled vs Uncontrolled

Explain whether the component supports controlled/uncontrolled usage and provide examples.

### Accessibility

Notes on keyboard support, ARIA roles/attributes, and any important a11y considerations.

---

For source and stories, link to the component source in the repo: `https://github.com/basic-ui-team/basic-ui/tree/main/packages/core/src/components/{ComponentName}`

```

## Guidance
- Keep examples minimal and focused on the most common use cases.
- Document accessibility expectations (role, aria attributes, keyboard behavior).
- Prefer showing both controlled and uncontrolled usage when applicable.
- Mention companion hooks/utilities (e.g., `usePagination`) if relevant.

## Usage
Invoke the skill with the component name; it will return a filled template or a bare template to paste into `.docs/components`.
```
