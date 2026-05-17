import { ResponsiveValue } from "@core/hooks";
import { CommonProps, RestrictedPropsWithAs } from "@core/types/props";

export type AllowedTextElements = "span" | "p" | "div";

interface TextOwnProps extends CommonProps {
  /** Size of the text. @default "md" */
  size?: ResponsiveValue<"xs" | "sm" | "md" | "lg" | "xl">;
  /** Font weight. @default "normal" */
  weight?: ResponsiveValue<"normal" | "medium" | "semibold" | "bold">;
  /** Text color. @default "inherit" */
  color?: "inherit" | "default" | "muted" | "primary" | "secondary" | "error" | "success" | "warning" | "info" | string;
  /** Text alignment. @default "left" */
  align?: ResponsiveValue<"left" | "center" | "right">;
  /** Truncate text with ellipsis. @default false */
  truncate?: ResponsiveValue<boolean>;
}

export type TextProps<As extends AllowedTextElements = "span"> = RestrictedPropsWithAs<
  TextOwnProps,
  As
>;
