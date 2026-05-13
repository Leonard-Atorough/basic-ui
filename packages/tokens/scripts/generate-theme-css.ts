/**
 * Generate theme.css from TypeScript preset sources.
 * Run with: pnpm generate
 *
 * This script reads light.ts and dark.ts presets and writes
 * packages/tokens/src/styles/theme.css — the single CSS source of truth.
 */

import { lightTheme } from "../src/presets/light.ts";
import { darkTheme } from "../src/presets/dark.ts";
import { themeToCustomProperties } from "../src/utils/themeToCustomProperties.ts";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

type ThemeObj = Record<string, Record<string, string | number>>;

/** Returns only the entries in dark that differ from light (for CSS overrides) */
function computeDarkDiff(
  lightProps: Record<string, string | number>,
  dark: ThemeObj,
): Record<string, string | number> {
  const darkProps = themeToCustomProperties(dark as any) as Record<string, string | number>;
  const diff: Record<string, string | number> = {};

  for (const [varName, value] of Object.entries(darkProps)) {
    if (lightProps[varName] !== value) {
      diff[varName] = value;
    }
  }
  return diff;
}

const light = lightTheme as unknown as ThemeObj;
const lightProps = themeToCustomProperties(light) as Record<string, string | number>;
const dark = darkTheme as unknown as ThemeObj;
const darkProps = computeDarkDiff(lightProps, dark);

const lightCSSVars = Object.entries(lightProps)
  .map(([varName, value]) => `  ${varName}: ${value};`)
  .join("\n");

const darkCSSVars = Object.entries(darkProps)
  .map(([varName, value]) => `  ${varName}: ${value};`)
  .join("\n");

const css = `/* Auto-generated — run \`pnpm generate\` in packages/tokens to regenerate */

@import "tailwindcss";

@theme inline {
${lightCSSVars}
}

/* ===== DARK MODE OVERRIDES ===== */
.dark {
${darkCSSVars}
}
`;

const outPath = resolve(__dirname, "../src/styles/theme.css");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, css, "utf-8");

const relPath = relative(process.cwd(), outPath);
console.log(`✓ Generated ${relPath}`);
