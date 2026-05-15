---
"@basic-ui/core": minor
---

Implement Polymorphic typing: Added a new types/props.ts file with utility types for polymorphic components, including CommonProps, PolymorphicRef, PropsWithAs, RestrictedPropsWithAs, and PolymorphicComponent, to standardize prop and ref handling across components.

Updated Alert's prop types in alert.types.ts to use the new polymorphic types, restricting allowed elements to div, span, or p.

Refactored Alert to accept an as prop, allowing it to render as a div, span, or p, with proper TypeScript typing and ref forwarding for each element type. This is achieved using new shared polymorphic types (PolymorphicRef, RestrictedPropsWithAs, etc.) defined in types/props.ts.

Expanded Alert.test.tsx with tests for ref forwarding and rendering as all supported elements (div, span, p), and verified that native props and component props are handled correctly regardless of the rendered element.

Updated JSDoc comments and usage examples in Alert.tsx to reflect the new polymorphic API and clarify usage patterns.
