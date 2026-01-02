# OpenNext Cloudflare Starter Template

> [!WARNING]
> This template is in active development—expect breaking changes and do not use it in production

A rapid iteration template for building Next.js 15 App Router projects on Cloudflare Workers using OpenNext. Pre-configured with tRPC, TanStack Query, Drizzle ORM, Shadcn UI, Better Auth, and Next Intl, this template is designed to leverage the full Cloudflare ecosystem—including R2 and D1—to build robust, serverless full-stack applications.

## Tech Stack

- **Runtime:** Next.js 15 (App Router) + React 19, compiled for Cloudflare Workers through `@opennextjs/cloudflare`
- **Infra & Tooling:** Wrangler 4, OpenNext config (`open-next.config.ts`), Sharp for image optimization, pnpm as the preferred package manager
- **API & Data:** tRPC v11 with `@tanstack/react-query`, Drizzle ORM + drizzle-kit migrations, SuperJSON serialization, Zod validation
- **Auth & State:** better-auth for session strategy, Zustand for lightweight client state
- **Styling:** Tailwind CSS v4 (PostCSS pipeline) with `tw-animate-css` helpers, `class-variance-authority`, and `tailwind-merge`
- **DX:** TypeScript 5, Biome (format + lint), Lefthook git hooks, Cloudflare environment typings via `cloudflare-env.d.ts`

## Requirements

- Node.js 20+ and pnpm 9 (`corepack enable` recommended)
- A Cloudflare account with `wrangler` logged in (`pnpm exec wrangler login`)
- Optional Cloudflare resources (D1, KV, R2, Queues) configured through `wrangler.jsonc`

## Installation

```bash
pnpm install
```

## How to Run Locally

1. Configure `wrangler.jsonc` with your Cloudflare `account_id`, `name`, and any bindings (D1, KV, R2, etc.) required for local preview/deploys.
2. Copy the environment template and fill in secrets:
   ```bash
   cp .env.example .env.local
   ```
   The `.env.local` file is read by Next.js during `pnpm dev`, while bindings flow through Wrangler during `pnpm preview`.
3. Start the dev server:
   ```bash
   pnpm dev
   ```

## Available Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server with Turbopack on `http://localhost:3000`. |
| `pnpm build` | Type-check with Biome and build the Next.js app. |
| `pnpm build:cf` | Create a Cloudflare-ready bundle using `opennextjs-cloudflare`. |
| `pnpm preview` | Build and run the Worker locally to mirror the Cloudflare runtime. |
| `pnpm deploy` | Build and deploy to Cloudflare Workers in one step. |
| `pnpm upload` | Build and upload the artifact without triggering a deploy. |
| `pnpm cf-typegen` | Regenerate typed bindings for `cloudflare-env.d.ts` from Wrangler. |
| `pnpm lint` / `pnpm format` | Run Biome in check or write mode. |

## Project Structure

```
.
├─ src/
│  ├─ app/              # Next.js App Router routes, layouts, and route handlers
│  ├─ components/       # UI primitives plus the wired tRPC playground
│  ├─ lib/              # Shared utilities (env parsing, styling helpers, misc)
│  ├─ server/           # Server-only code: Drizzle config, routers, server-only helpers
│  └─ trpc/             # Client adapters that connect React/TanStack Query to tRPC
├─ drizzle/             # SQL migrations produced by drizzle-kit
├─ public/              # Static assets served directly from Next.js
├─ scripts/             # Helper scripts invoked by package.json commands
├─ open-next.config.ts  # OpenNext build configuration for Cloudflare Workers
├─ wrangler.jsonc       # Cloudflare project definition + binding declarations
├─ cloudflare-env.d.ts  # Type-safe Env bindings kept in sync with Wrangler
├─ drizzle.config.ts    # Drizzle CLI configuration shared by migrations
├─ next.config.ts       # Next.js runtime tweaks for Workers compatibility
├─ tsconfig.json        # Base TypeScript config consumed by Next/tooling
└─ postcss.config.mjs   # Tailwind/PostCSS pipeline for styling
```

## Development Flow

1. Start `pnpm dev`, edit files in `src/app`, and watch the App Router HMR cycle.
2. Call the tRPC playground at the bottom of `src/app/page.tsx` to validate routers in `src/server/api`.
3. Run `pnpm preview` to confirm the Worker bundle behaves the same way inside the Cloudflare runtime shim.

## Environment & Secrets

- Define secrets/bindings in `wrangler.jsonc` (for deployments) and `.dev.vars` (ignored, for local preview).
- Update `cloudflare-env.d.ts` or run `pnpm cf-typegen` to keep runtime typings accurate.
- If you introduce a new database or queue, wire its Drizzle schema or binding in `src/server` and export it via `server-only` modules to keep the bundle slim.

## Deploying to Cloudflare

```bash
pnpm deploy
```

This runs the OpenNext Cloudflare build and pushes the Worker using Wrangler. For staged rollouts, use `pnpm upload` to push the artifact and promote it manually inside the Cloudflare dashboard.

## Further Reading

- [OpenNext Cloudflare docs](https://opennext.js.org/cloudflare)
- [Cloudflare Workers + Wrangler](https://developers.cloudflare.com/workers/)
- [tRPC](https://trpc.io), [TanStack Query](https://tanstack.com/query), and [Drizzle ORM](https://orm.drizzle.team) for the full-stack type-safe layer.
