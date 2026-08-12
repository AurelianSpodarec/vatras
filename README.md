# Vatras

I can build software with AI. I've done it.

But the process has been improvised — different prompts, different skills,
different approaches, with no system connecting them.

Vatras is that system: a methodology that makes the way we build software with
AI repeatable, observable and improvable.

## This repository

The framework itself, as skills under `skills/`, and the documentation site
that describes it.

A [TanStack Start](https://tanstack.com/start) application, with documentation
powered by [Fumadocs](https://fumadocs.dev).

## Getting started

```bash
pnpm install
```

```bash
pnpm dev
```

The app runs at http://localhost:3000.

| Script             | Purpose                                    |
| ------------------ | ------------------------------------------ |
| `pnpm dev`         | Dev server with HMR                        |
| `pnpm build`       | Production build into `.output`            |
| `pnpm preview`     | Serve the production build locally         |
| `pnpm types:check` | Typecheck with `tsc --noEmit`              |

## Layout

TanStack Start owns the app; Fumadocs is confined to the docs subsystem.

```
src/
  routes/
    __root.tsx        # HTML shell + Fumadocs RootProvider
    index.tsx         # landing page
    docs/$.tsx        # docs pages (catch-all)
    api/search.ts     # search endpoint
  lib/
    source.ts         # Fumadocs content source
    shared.ts         # app name, docs route, GitHub config
    layout.shared.tsx # nav shared between app and docs
content/docs/         # MDX content
```

Add ordinary app routes under `src/routes/` without touching the docs setup.

## Writing docs

Drop `.mdx` files into `content/docs/`. Frontmatter drives the title and
description:

```mdx
---
title: My Page
description: What this page covers
---

Content here.
```

Each page is also served as raw markdown at `/docs/<slug>.md`, and the site
exposes `/llms.txt` and `/llms-full.txt` for LLM consumption.

## Deploying

The build uses Nitro's default portable `node-server` preset and outputs to
`.output`. To target a specific host, set a preset in `vite.config.ts`:

```ts
nitro({ preset: 'vercel' })
```

See the [TanStack Start hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro).

## Licence

The Vatras skills, the site application and its configuration are licensed
under the [MIT License](LICENSE).

The published documentation under `content/docs/` is licensed under
[CC BY 4.0](content/docs/LICENSE).

## Known issue

Raw markdown URLs (`/docs/<slug>.md`) return 404 on the **dev server** but work
correctly in production (`pnpm build && pnpm preview`). The dev server does not
match server routes that combine a splat with a file suffix (`{$}.md`). This
also affects the "Copy Markdown" button on docs pages during development.
