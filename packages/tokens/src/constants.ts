import type { ThemeConfig } from ".";

export const PREFIX_MAP: Record<keyof ThemeConfig, string> = {
  colors: "color",
  spacing: "spacing",
  radius: "radius",
  shadows: "shadow",
  fontSize: "text",
  fontWeight: "font-weight",
  lineHeight: "leading",
  letterSpacing: "tracking",
  fontFamily: "font",
  duration: "duration",
  easing: "ease",
  zIndex: "z",
  breakpoint: "breakpoint",
  opacity: "opacity",
};