# Package Manager Selection & Compatibility

## Quick Answer

**For Contributors:** Use **pnpm** (recommended) but npm and yarn work fine.
**For Consumers:** Install published packages with any package manager — no restrictions.

## Consumption (Published Packages)

Users installing `@basic-ui/*` packages from npm are **completely unrestricted**:

```bash
npm install @basic-ui/core      # ✅ Works
pnpm add @basic-ui/core         # ✅ Works
yarn add @basic-ui/core         # ✅ Works
```

The `packageManager` field in `package.json` is only a **recommendation** for contributors; it doesn't enforce anything for consumers.

## Setup by Package Manager

### pnpm (Recommended)

```bash
npm install -g pnpm
pnpm install
pnpm build
```

### npm

```bash
npm install
npm run build
npm test
```

### yarn

```bash
npm install -g yarn
yarn install
yarn build
```

## Turbo Task Orchestration

All scripts use **Turbo** for task orchestration (package manager agnostic). `pnpm build`, `npm run build`, and `yarn build` all work identically.

## CI/CD Pipeline

GitHub Actions uses **pnpm** for faster, more cost-effective CI builds.

## Requirements

Minimum versions: Node 18+, pnpm 9+, npm 9+, yarn 3.6+

## Troubleshooting

**pnpm not found**: `npm install -g pnpm@latest`

**Workspaces error (npm)**: Ensure npm >= 9 with `npm install -g npm@latest`

**Lock file conflicts**: Delete lock file and reinstall:

```bash
rm pnpm-lock.yaml && pnpm install
```

**Different versions between local and CI**: Pin Node version with `.nvmrc` and run `nvm use` before developing.

## Recommendations

| Use Case                    | Recommendation                             |
| --------------------------- | ------------------------------------------ |
| New to monorepos            | **pnpm** — fastest, strictest              |
| Existing npm shop           | **npm** — familiar, works well             |
| Existing yarn shop          | **yarn** — comparable speeds, good support |
| CI/CD                       | **pnpm** — cost-effective, deterministic   |
| Published package consumers | **Any** — no restrictions                  |

---

**TLDR**: Use pnpm for development (it's fastest). npm and yarn work fine. Consumers can use any package manager to install published packages.
