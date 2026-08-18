# Repository Guidelines

> Whatever action you can do yourself, Please do yourself, this includes starting apps and verification.

## Project Structure & Module Organization

This is a Vinext/React 19 landing site targeting Cloudflare Workers. Application code lives in `app/`: `page.tsx` contains the interactive VTCSocial landing page, `layout.tsx` defines metadata and the root layout, and `globals.css` holds site-wide styling. Static assets belong in `public/` (for example, `public/og.png`). Worker integration is in `worker/`, while `db/`, `drizzle/`, and `drizzle.config.ts` contain the optional Drizzle data layer. Keep examples isolated under `examples/`. Tests live in `tests/`.

## Build, Test, and Development Commands

- `npm ci`: install the exact dependencies from `package-lock.json` (Node 22.13+).
- `npm run dev`: start the local Vinext development server.
- `npm run build`: create the Cloudflare-compatible production bundle in `dist/`.
- `npm run lint`: run ESLint across TypeScript, React, accessibility, and Next.js rules.
- `npm test`: build, then execute the Node test suite.
- `npm run db:generate`: generate Drizzle migrations after schema changes.

On Windows, the inline environment-variable syntax in the Vinext scripts may require PowerShell, for example: `$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'; npx vinext dev`.

## Coding Style & Naming Conventions

Use TypeScript with strict checking and two-space indentation. Prefer functional React components and keep client-side state localized. Use `PascalCase` for components, `camelCase` for functions and variables, and descriptive CSS class names such as `serviceGrid` or `loraCard`. Use the `@/*` path alias for cross-directory imports. Preserve accessible labels, keyboard behavior, semantic headings, and reduced-motion support. Run `npm run lint` before submitting changes.

## Testing Guidelines

Tests use Node's built-in `node:test` and `node:assert`. Name files `*.test.mjs` under `tests/`. Assert rendered status, metadata, and key user-facing content rather than implementation details. The current rendered-HTML test originated from the starter; update its skeleton-specific expectations before relying on it for the VTCSocial page.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `Build VTCSocial landing page`. Keep commits focused and avoid generated output such as `dist/`. Pull requests should explain the user-visible change, list validation performed, link relevant issues, and include desktop/mobile screenshots for visual changes. Call out pricing, WhatsApp-message, metadata, or accessibility changes explicitly.

## Security & Configuration

Never commit secrets or local `.env*` files. Keep `.openai/hosting.json` limited to hosting identifiers and logical bindings. Do not add payment processing, fabricated portfolio results, or unverified performance claims.
