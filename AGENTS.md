# Agent Instructions

The entry point for AI agents working in this repository. It points to the
project's context rather than containing it. Read what it links to before
making changes.

## What this project is

Vatras is a framework for building software with AI agents. This repository
holds the framework itself — its skills — and the documentation site that
describes it.

## Where project knowledge lives

| Location        | Contains                                                    | Authority                |
| --------------- | ----------------------------------------------------------- | ------------------------ |
| `content/docs/` | The published Vatras documentation                          | Authoritative            |
| `proposals/`    | Proposals working out ideas and direction                   | Exploratory, not settled |
| `research/`     | Investigation into open questions                           | Exploratory              |
| `docs/`         | Context Architecture for working on *this* repository       | Authoritative            |
| `skills/`       | Vatras skills, one directory each, defined by `SKILL.md`     | Authoritative            |

Read `content/docs/` for what Vatras is, `proposals/` for why. Proposals are
thinking in progress and may contradict the published docs; the published docs
win.

## Repository layout

```text
content/docs/     documentation site content (MDX, Fumadocs)
src/              TanStack Start application serving the site
docs/             this repository's Context Architecture
proposals/        proposal documents
research/         research notes
skills/           Vatras skills
.claude-plugin/   plugin and marketplace manifests
```

Two things are called docs. `content/docs/` is published site content.
`docs/` is context for agents working on the repository.

## Working here

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build into .output
pnpm types:check  # tsc --noEmit
```

Run `pnpm types:check` and `pnpm build` before treating a change as complete.

## Documentation site

Pages are MDX under `content/docs/`. Each directory's `meta.json` sets the
section title and page order; a section's `index.mdx` is titled `Overview` so
the sidebar does not repeat the section name.

Adding, renaming or moving a page requires restarting the dev server. The
content watcher does not pick up new or moved files, and a stale process will
serve the old tree.

Raw markdown URLs (`/docs/<slug>.md`) return 404 on the dev server and work in
production. This is an upstream limitation, not a misconfiguration.

## Skills

Each skill is `skills/<name>/SKILL.md`. The repository is also a Claude Code
plugin named `vatras`, so skills are invoked as `vatras:<name>`.

Editing a skill does not affect an installed copy, which is a clone of the
remote. To run skills from the working tree:

```bash
claude --plugin-dir .
```

## Conventions

- Do not overwrite existing project knowledge. Add to it, or ask.
- Prose in `content/docs/` and `proposals/` is authored by the maintainer. Do
  not rewrite it to taste. Correct what is factually wrong and say what changed.
- British spelling in documentation.
- Commit and push to `main`.
