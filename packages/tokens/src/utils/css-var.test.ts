import { describe, expect, it } from "vitest";
import { cssVar, tokenName, convertToKebabCase } from "./css-var";
import { ThemeConfig } from "../types";

describe("tokenName", () => {
  it.each<[keyof ThemeConfig, string, string]>([
    ["colors", "primary", "--color-primary"],
    ["colors", "primary-hover", "--color-primary-hover"],
    ["colors", "text-secondary", "--color-text-secondary"],
    ["spacing", "md", "--spacing-md"],
    ["spacing", "xl", "--spacing-xl"],
    ["spacing", "2xl", "--spacing-2xl"],
    ["radius", "sm", "--radius-sm"],
    ["radius", "full", "--radius-full"],
    ["shadows", "md", "--shadow-md"],
    ["shadows", "xl", "--shadow-xl"],
    ["fontSize", "md", "--text-md"],
    ["fontSize", "2xl", "--text-2xl"],
    ["fontSize", "3xl", "--text-3xl"],
    ["fontWeight", "bold", "--font-weight-bold"],
    ["fontWeight", "normal", "--font-weight-normal"],
    ["lineHeight", "normal", "--leading-normal"],
    ["lineHeight", "tight", "--leading-tight"],
    ["letterSpacing", "normal", "--tracking-normal"],
    ["letterSpacing", "wide", "--tracking-wide"],
    ["fontFamily", "sans", "--font-sans"],
    ["fontFamily", "mono", "--font-mono"],
    ["duration", "fast", "--duration-fast"],
    ["duration", "slow", "--duration-slow"],
    ["easing", "in", "--ease-in"],
    ["easing", "out", "--ease-out"],
    ["zIndex", "modal", "--z-modal"],
    ["zIndex", "tooltip", "--z-tooltip"],
    ["breakpoint", "md", "--breakpoint-md"],
    ["breakpoint", "max", "--breakpoint-max"],
    ["opacity", "disabled", "--opacity-disabled"],
    ["opacity", "muted", "--opacity-muted"],
  ])("%s:%s → %s", (category, key, expected) => {
    expect(tokenName(category, key)).toBe(expected);
  });

  it.each<[string, string, string]>([
    ["customCategory", "value", "--custom-category-value"],
    ["myCustomToken", "key", "--my-custom-token-key"],
    ["custom", "value", "--custom-value"],
    ["colors", "surface-active", "--color-surface-active"],
  ])("custom/edge cases %s:%s → %s", (category, key, expected) => {
    expect(tokenName(category as keyof ThemeConfig, key)).toBe(expected);
  });
});


describe("cssVar", () => {
  it.each<[keyof ThemeConfig, string, string]>([
    ["colors", "primary", "var(--color-primary)"],
    ["colors", "primary-hover", "var(--color-primary-hover)"],
    ["spacing", "md", "var(--spacing-md)"],
    ["spacing", "xl", "var(--spacing-xl)"],
    ["radius", "sm", "var(--radius-sm)"],
    ["radius", "full", "var(--radius-full)"],
    ["shadows", "md", "var(--shadow-md)"],
    ["fontSize", "md", "var(--text-md)"],
    ["fontSize", "2xl", "var(--text-2xl)"],
    ["fontWeight", "bold", "var(--font-weight-bold)"],
    ["lineHeight", "normal", "var(--leading-normal)"],
    ["letterSpacing", "wide", "var(--tracking-wide)"],
    ["fontFamily", "sans", "var(--font-sans)"],
    ["duration", "fast", "var(--duration-fast)"],
    ["easing", "in", "var(--ease-in)"],
    ["zIndex", "modal", "var(--z-modal)"],
    ["breakpoint", "md", "var(--breakpoint-md)"],
    ["opacity", "disabled", "var(--opacity-disabled)"],
  ])("%s:%s → %s", (category, key, expected) => {
    expect(cssVar(category, key)).toBe(expected);
  });

  it("handles complex custom token names", () => {
    expect(cssVar("colors", "primary-hover-active")).toBe(
      "var(--color-primary-hover-active)",
    );
  });
});


describe("convertToKebabCase", () => {
  it.each<[string, string]>([
    ["Custom", "custom"],
    ["CustomCategory", "custom-category"],
    ["MyCustomToken", "my-custom-token"],
    ["customCategory", "custom-category"],
    ["myCustomToken", "my-custom-token"],
    ["custom", "custom"],
    ["custom-category", "custom-category"],
    ["HTTPSConnection", "https-connection"],
    ["", ""],
  ])("%p → %p", (input, expected) => {
    expect(convertToKebabCase(input)).toBe(expected);
  });
});
