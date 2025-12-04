# CLAUDE.md

## Project Overview

Vue Vben Admin v5 is a Vue 3 enterprise-level admin template built with Vite, TypeScript, and pnpm monorepo architecture using Turborepo for build orchestration.

## Common Commands

```bash
# Install dependencies (requires pnpm 10+, Node 20.12+)
pnpm install

# Development
pnpm dev              # Interactive app selector via turbo-run
pnpm dev:ele          # Run Element Plus app
pnpm dev:play         # Run playground (Ant Design Vue)

# Build
pnpm build            # Build all apps
pnpm build:ele        # Build Element Plus app
pnpm build:play       # Build playground

# Code Quality
pnpm lint             # ESLint + Prettier + Stylelint
pnpm format           # Auto-format code
pnpm check:type       # TypeScript type checking
pnpm check:circular   # Check circular dependencies
pnpm check:dep        # Check unused dependencies

# Testing
pnpm test:unit                                    # Run unit tests (vitest)
pnpm -F @vben/playground test:e2e                 # Run e2e tests (playwright)
pnpm vitest run packages/utils                    # Run tests for specific package
```

## Architecture

### Monorepo Structure

- **apps/** - Application entry points
  - `web-ele` - Element Plus based admin app
  - `backend-mock` - Nitro-based mock API server

- **packages/** - Shared packages
  - `@core/` - Foundational SDK and UI components (no business logic)
    - `base/` - Design tokens, icons, shared utilities, typings
    - `ui-kit/` - Headless UI components (form, layout, menu, popup, tabs, shadcn)
    - `composables/` - Vue composables
    - `preferences/` - User preference management
  - `effects/` - Packages with side effects (state management, routing, API calls)
    - `access/` - Permission/access control
    - `common-ui/` - Common UI components
    - `hooks/` - Vue hooks
    - `layouts/` - Layout components
    - `plugins/` - Vue plugins
    - `request/` - HTTP request utilities
  - `constants/`, `icons/`, `locales/`, `preferences/`, `stores/`, `styles/`, `types/`, `utils/`

- **internal/** - Build tooling packages
  - `lint-configs/` - ESLint, Prettier, Stylelint, Commitlint configs
  - `vite-config/` - Shared Vite configuration
  - `tailwind-config/` - Tailwind CSS configuration
  - `tsconfig/` - TypeScript configurations
  - `node-utils/` - Node.js utilities for build scripts

- **scripts/** - Build and deployment scripts
  - `turbo-run/` - Interactive turbo task runner
  - `vsh/` - CLI utilities (lint, check-dep, check-circular, etc.)

- **playground/** - Development playground with e2e tests
- **docs/** - VitePress documentation

### Key Patterns

1. **Workspace Dependencies**: Use `workspace:*` for internal packages, `catalog:` for shared external versions (defined in pnpm-workspace.yaml)

2. **Import Aliases**: Apps use `#/*` to map to `./src/*`

3. **UI Framework Adapters**: Each app (web-ele, etc.) provides adapters in `src/adapter/` to bridge core components with specific UI libraries

4. **Package Layering**:
   - `@core` packages are framework-agnostic, reusable foundations
   - `effects` packages may depend on Pinia, Vue Router, or specific component libraries
   - `apps` combine everything with UI framework-specific implementations

## Git Workflow

Uses lefthook for pre-commit hooks:
- Auto-formats staged files (Prettier, ESLint, Stylelint)
- Runs commitlint on commit messages

Commit convention follows Angular style: `feat`, `fix`, `style`, `perf`, `refactor`, `revert`, `test`, `docs`, `chore`, `ci`, `types`
