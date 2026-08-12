# Agent Instructions

This is the entry point for AI agents working in this repository. It points to
the project's context rather than containing it. Read the documents it links to
before making changes.

## What this project is

Vatras is a framework for building software with AI agents. This repository
holds both the framework itself (its skills) and the documentation site that
describes it.

## Where project knowledge lives

| Location        | Contains                                                      | Authority |
| --------------- | ------------------------------------------------------------- | --------- |
| `content/docs/` | The published Vatras documentation — the framework as it stands | Authoritative |
| `proposals/`    | Proposal documents working out ideas and direction              | Exploratory, not settled |
| `research/`     | Investigation into questions the project cannot yet answer      | Exploratory |
| `docs/`         | Context Architecture for working on *this* repository           | Authoritative |
| `skills/`       | Vatras skills, one directory each, defined by `SKILL.md`        | Authoritative |

Start with `content/docs/` for what Vatras *is*. Read `proposals/` for why it is
that way. Treat proposals as thinking in progress — they may contradict the
published docs, and the published docs win.

## Repository layout

```text
content/docs/   documentation site content (MDX, Fumadocs)
src/            TanStack Start application serving the site
proposals/      proposal documents
research/       research notes
skills/         Vatras skills
docs/           this repository's Context Architecture
```

Note the two different `docs`: `content/docs/` is site content that gets
published; `docs/` is context for agents working on the repository.

## Working in this repository

```bash
pnpm install
pnpm dev          # dev server on http://localhost:3000
pnpm build        # production build into .output
pnpm types:check  # tsc --noEmit
```

Run `pnpm types:check` and `pnpm build` before considering a change complete.

Documentation pages are MDX under `content/docs/`. Sidebar order and section
titles come from `meta.json` in each directory. A section's `index.mdx` is
titled `Overview` so the sidebar does not repeat the section name.

Adding or renaming a page requires restarting the dev server — the content
watcher does not pick up new or moved files.

## Conventions

- Do not overwrite existing project knowledge. Add to it, or ask.
- Prose in `content/docs/` and `proposals/` is authored by the maintainer.
  Do not rewrite it to taste; correct only what is factually wrong, and say so.
- British spelling throughout the documentation.
