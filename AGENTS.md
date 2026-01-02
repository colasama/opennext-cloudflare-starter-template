# Agents Guide

Authoritative notes for anyone (human or AI) automating work on this OpenNext Cloudflare template.

## Context

- **App type:** Next.js 15 App Router deployed to Cloudflare Workers through `@opennextjs/cloudflare`.
- **Package manager:** pnpm (lockfile checked in). Use `pnpm` for every script.
- **Primary directories:** `src/app` (routes), `src/server` (server-only logic, Drizzle, tRPC routers), `src/trpc` (client helpers), `src/components` (UI).

## Responsibilities

1. Keep the template production ready: lint, format, and type-check before shipping changes.
2. Maintain the tRPC example playground so it always exercises at least one query/mutation.
3. Prefer small, composable components with Tailwind 4 utilities; use `class-variance-authority` if variants emerge.
4. Document any new Cloudflare bindings or environment variables in `wrangler.jsonc`, `.dev.vars`, and `cloudflare-env.d.ts`.

## Workflow

| Step | Command | Notes |
| --- | --- | --- |
| Install deps | `pnpm install` | Runs postinstall hooks and prepares Lefthook. |
| Local dev | `pnpm dev` | Uses Turbopack; edit files in `src/app`. |
| Cloudflare preview | `pnpm preview` | Builds via OpenNext and runs a Worker locally. |
| Deploy | `pnpm deploy` | Build + deploy to Cloudflare Workers. |
| Type bindings | `pnpm cf-typegen` | Sync `cloudflare-env.d.ts` with Wrangler. |

## How to Run

1. Ensure `wrangler.jsonc` has the correct `name`, `account_id`, and bindings for the current task environment before running preview/deploy commands.
2. Duplicate the provided secrets template and populate required values:
   ```bash
   cp .env.example .env.local
   ```
   `pnpm dev` reads `.env.local`, while Wrangler-driven commands consume bindings from `wrangler.jsonc`/`.dev.vars`.
3. Launch `pnpm dev` for App Router iterations or `pnpm preview` to exercise the Worker runtime.

## Project Structure

```
.
├─ src/
│  ├─ app/              # App Router routes/layouts/API handlers; primary iteration target
│  ├─ components/       # Shared UI + the interactive tRPC playground
│  ├─ lib/              # Tree-shakeable utilities (env parsing, styling helpers)
│  ├─ server/           # Server-only modules (Drizzle config, routers, Better Auth)
│  └─ trpc/             # Client-side helpers that bind React Query to tRPC procedures
├─ drizzle/             # drizzle-kit migrations checked into source control
├─ public/              # Static assets copied verbatim into the build output
├─ scripts/             # Automation helpers invoked by pnpm scripts
├─ open-next.config.ts  # OpenNext build directives for Cloudflare Workers
├─ wrangler.jsonc       # Cloudflare project definition + binding declarations
├─ cloudflare-env.d.ts  # Generated env typings; update whenever bindings change
├─ drizzle.config.ts    # drizzle-kit configuration shared by CLI + scripts
├─ next.config.ts       # Next.js options tuned for the Workers runtime
├─ tsconfig.json        # Base TypeScript config for app + tooling
└─ postcss.config.mjs   # Tailwind/PostCSS pipeline configuration
```

## Coding Standards

- Run `pnpm lint` (Biome) and address autofixes; do not bypass errors.
- Favor server components (`server-only`) when possible; mark client components with `"use client"`.
- Keep shared utilities tree-shakeable and colocated in `src/lib`.
- When touching database logic, update Drizzle schemas and migrations with `drizzle-kit`.
- Do not hardcode secrets. Always fetch via the environment bindings passed into the Worker.

## Testing & Verification

- Smoke test the tRPC playground after API changes.
- For Cloudflare-specific behavior, run `pnpm preview` (or `pnpm upload` to stage) to ensure Workers runtime compatibility.
- If new bindings are added, confirm Wrangler deploy succeeds locally before asking for production access.
