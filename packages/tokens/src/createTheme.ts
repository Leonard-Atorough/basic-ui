import { mergeTheme, ThemeConfig } from ".";
import { lightTheme, darkTheme } from "./presets";
import { convertToKebabCase } from "./utils";

/**
 * Theme configuration for light and dark modes.
 * Both are optional - if not provided, CSS defaults will be used.
 */
export interface ThemeInput {
  light?: Partial<ThemeConfig>;
  dark?: Partial<ThemeConfig>;
}

/**
 * Inject theme configuration into CSS custom properties.
 * Supports separate light and dark themes to work with class-based dark mode.
 *
 * @example
 * // Minimal: just brand colors
 * createTheme({
 *   light: { colors: { primary: "#0066cc" } },
 *   dark: { colors: { primary: "#4D94FF" } },
 * });
 *
 * // Full customization
 * createTheme({
 *   light: { colors: {...}, spacing: {...} },
 *   dark: { colors: {...}, spacing: {...} },
 * });
 */
export function createTheme(config: ThemeInput): void {
  const root = document.documentElement;
  const prefixMap: Record<string, string> = {
    colors: "color",
    spacing: "spacing",
    radius: "radius",
    shadows: "shadow",
    fontSize: "font-size",
    fontWeight: "font-weight",
    lineHeight: "line-height",
    letterSpacing: "tracking",
    fontFamily: "font",
    duration: "duration",
    easing: "ease",
    zIndex: "z",
    breakpoint: "breakpoint",
    opacity: "opacity",
  };

  // Helper to inject theme to a target element
  const injectTheme = (theme: ThemeConfig, target: HTMLElement = root) => {
    Object.entries(theme).forEach(([category, values]) => {
      if (values) {
        const prefix = prefixMap[category] || convertToKebabCase(category);
        Object.entries(values).forEach(([key, value]) => {
          target.style.setProperty(`--${prefix}-${key}`, String(value));
        });
      }
    });
  };

  // Inject light theme to :root
  if (config.light) {
    const mergedLight = mergeTheme(lightTheme, config.light);
    injectTheme(mergedLight, root);
  }

  // Inject dark theme via CSS :root.dark selector
  if (config.dark) {
    const mergedDark = mergeTheme(darkTheme, config.dark);
    injectDarkThemeStyles(mergedDark, prefixMap);
  }
}

/**
 * Helper: Create a style element that targets :root.dark
 * This ensures dark theme doesn't get overridden by light theme inline styles
 */
function injectDarkThemeStyles(
  theme: ThemeConfig,
  prefixMap: Record<string, string>,
): void {
  // Remove existing dark theme style if present
  const existingStyle = document.getElementById("simple-ui-dark-theme");
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create CSS rules for :root.dark
  let darkCSS = ":root.dark {\n";
  Object.entries(theme).forEach(([category, values]) => {
    if (values) {
      const prefix = prefixMap[category] || convertToKebabCase(category);
      Object.entries(values).forEach(([key, value]) => {
        darkCSS += `  --${prefix}-${key}: ${String(value)};\n`;
      });
    }
  });
  darkCSS += "}";

  // Inject as style element
  const style = document.createElement("style");
  style.id = "simple-ui-dark-theme";
  style.textContent = darkCSS;
  document.head.appendChild(style);
}

