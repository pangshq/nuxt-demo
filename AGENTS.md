# Repository Guidelines

## Project Structure & Module Organization
- Nuxt app layout is standard; create features under clear folders:
  - `pages/` (route-driven views), `components/` (UI), `composables/` (reusable logic)
  - `server/api/` (API routes), `server/middleware/` (server middleware)
  - `assets/` (styles, fonts), `public/` (static files), `plugins/` (Nuxt plugins)
- Keep features self-contained; colocate tests and stories near source when useful.

## Build, Test, and Development Commands
- Local dev: `npm run dev` (or `pnpm dev`/`yarn dev`) — start Nuxt in dev with HMR.
- Build: `npm run build` — production build.
- Preview: `npm run preview` — serve the built app locally.
- Lint/format (if configured): `npm run lint` / `npm run format`.
- Tests (if configured): `npm run test`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; keep lines under ~100 chars.
- Vue single-file components: `PascalCase.vue` in `components/`; page files use route-based names under `pages/`.
- Composables: `useThing.ts` in `composables/`; server handlers: `server/api/<name>.ts`.
- Prefer TypeScript for new code; enable strict types where practical.
- Use ESLint + Prettier if present; do not mix semicolon styles within a file.

## Testing Guidelines
- Unit tests: Vitest (preferred). Place in `tests/unit` or alongside code as `*.spec.(ts|js)`.
- E2E: Playwright/Cypress if present, in `tests/e2e`.
- Aim for critical-path coverage; add tests for fixes and new features.
- Run `npm run test` locally and ensure it passes before opening a PR.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Keep commit scope focused; include brief imperative summaries.
- PRs must include: purpose, linked issues (e.g., `Closes #123`), screenshots for UI changes, and notes on breaking changes.
- Update docs and tests with code changes.

## Security & Configuration Tips
- Do not commit secrets. Use `.env` (local) and keep `.env.example` updated.
- Configure runtime values via Nuxt runtimeConfig in `nuxt.config.*`.
