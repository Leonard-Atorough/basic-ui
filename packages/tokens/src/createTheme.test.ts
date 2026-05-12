import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTheme } from "./createTheme";
import type { ThemeConfig } from "./types";

describe("createTheme", () => {
  let mockRoot: HTMLElement;
  let mockHead: HTMLHeadElement;
  let mockStyleElement: any;

  beforeEach(() => {
    mockRoot = { style: { setProperty: vi.fn() } } as unknown as HTMLElement;
    mockHead = { appendChild: vi.fn() } as unknown as HTMLHeadElement;
    mockStyleElement = { id: "", textContent: "" };

    vi.stubGlobal("document", {
      documentElement: mockRoot,
      head: mockHead,
      getElementById: vi.fn(() => null),
      createElement: vi.fn((tag: string) =>
        tag === "style" ? mockStyleElement : {},
      ),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("light theme injection", () => {
    it.each<[string, Partial<ThemeConfig>]>([
      ["colors", { colors: { primary: "#FF0000", "primary-hover": "#CC0000" } }],
      ["spacing", { spacing: { md: "2rem", lg: "3rem" } }],
      ["radius", { radius: { md: "0.5rem" } }],
      ["fontSize", { fontSize: { md: "1.125rem" } }],
      ["fontWeight", { fontWeight: { bold: 700, normal: 400 } }],
      ["zIndex", { zIndex: { modal: 100, tooltip: 200 } }],
    ])("injects %s to :root", (_category, config) => {
      createTheme({ light: config });
      
      const [category] = Object.entries(config)[0];
      const values = Object.entries((config as any)[category]);
      values.forEach(([key, value]) => {
        const varName = category === "colors" ? `--color-${key}` :
                       category === "spacing" ? `--spacing-${key}` :
                       category === "radius" ? `--radius-${key}` :
                       category === "fontSize" ? `--text-${key}` :
                       category === "fontWeight" ? `--font-weight-${key}` :
                       category === "zIndex" ? `--z-${key}` : `--${category}-${key}`;
        expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
          varName,
          String(value),
        );
      });
    });

    it("injects multiple token categories at once", () => {
      createTheme({
        light: {
          colors: { primary: "#0066FF" },
          spacing: { md: "1.5rem" },
          radius: { md: "0.5rem" },
        },
      });

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        "--color-primary",
        "#0066FF",
      );
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        "--spacing-md",
        "1.5rem",
      );
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        "--radius-md",
        "0.5rem",
      );
    });
  });

  describe("dark theme injection", () => {
    it("creates style element with correct id", () => {
      createTheme({ dark: { colors: { primary: "#4D94FF" } } });

      expect(document.createElement).toHaveBeenCalledWith("style");
      expect(mockStyleElement.id).toBe("simple-ui-dark-theme");
      expect(mockHead.appendChild).toHaveBeenCalledWith(mockStyleElement);
    });

    it("injects dark theme with :root.dark selector", () => {
      createTheme({
        dark: { colors: { primary: "#4D94FF", bg: "#1A1A1A" } },
      });

      expect(mockStyleElement.textContent).toContain(":root.dark {");
      expect(mockStyleElement.textContent).toContain("--color-primary: #4D94FF");
      expect(mockStyleElement.textContent).toContain("--color-bg: #1A1A1A");
    });

    it("removes existing dark theme before creating new one", () => {
      const existingStyle = { remove: vi.fn() };
      vi.mocked(document.getElementById).mockReturnValue(existingStyle as any);

      createTheme({ dark: { colors: { primary: "#4D94FF" } } });

      expect(document.getElementById).toHaveBeenCalledWith(
        "simple-ui-dark-theme",
      );
      expect(existingStyle.remove).toHaveBeenCalled();
    });

    it.each<[string, Partial<ThemeConfig>, string]>([
      ["colors", { colors: { primary: "#4D94FF" } }, "color"],
      ["spacing", { spacing: { md: "1.25rem" } }, "spacing"],
      ["shadows", { shadows: { sm: "0 2px 4px rgba(0,0,0,0.2)" } }, "shadow"],
      ["duration", { duration: { fast: "50ms" } }, "duration"],
      ["opacity", { opacity: { disabled: 0.3 } }, "opacity"],
    ])("injects %s category", (_category, config, prefix) => {
      createTheme({ dark: config });
      
      const [_, values] = Object.entries(config)[0];
      Object.entries(values as any).forEach(([key, _]) => {
        expect(mockStyleElement.textContent).toContain(
          `--${prefix}-${key}`,
        );
      });
    });
  });

  describe("light + dark themes", () => {
    it("injects both themes correctly", () => {
      createTheme({
        light: { colors: { primary: "#FF6B00" } },
        dark: { colors: { primary: "#FFB380" } },
      });

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        "--color-primary",
        "#FF6B00",
      );
      expect(mockStyleElement.textContent).toContain("--color-primary: #FFB380");
    });
  });

  describe("edge cases", () => {
    it("handles empty config gracefully", () => {
      expect(() => createTheme({})).not.toThrow();
    });

    it("handles partial theme config", () => {
      createTheme({ light: { colors: { primary: "#FF0000" } } });
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        "--color-primary",
        "#FF0000",
      );
    });

    it("converts numeric values to strings", () => {
      createTheme({
        light: { zIndex: { modal: 100, tooltip: 200 } },
      });

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        "--z-modal",
        "100",
      );
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        "--z-tooltip",
        "200",
      );
    });
  });

  describe("CSS variable naming", () => {
    it("uses correct prefixes for all token categories", () => {
      createTheme({
        dark: {
          colors: { primary: "#000" },
          spacing: { md: "1rem" },
          radius: { sm: "0.25rem" },
          shadows: { md: "shadow" },
          fontSize: { md: "1rem" },
          fontWeight: { bold: 700 },
          lineHeight: { normal: 1.5 },
          letterSpacing: { normal: "0em" },
          fontFamily: { sans: "Arial" },
          duration: { fast: "100ms" },
          easing: { in: "ease-in" },
          zIndex: { modal: 50 },
          breakpoint: { md: "42rem" },
          opacity: { disabled: 0.5 },
        },
      });

      const css = mockStyleElement.textContent;
      const prefixes = [
        "color-primary",
        "spacing-md",
        "radius-sm",
        "shadow-md",
        "text-md",
        "font-weight-bold",
        "leading-normal",
        "tracking-normal",
        "font-sans",
        "duration-fast",
        "ease-in",
        "z-modal",
        "breakpoint-md",
        "opacity-disabled",
      ];

      prefixes.forEach((prefix) => {
        expect(css).toContain(`--${prefix}`);
      });
    });
  });
});
