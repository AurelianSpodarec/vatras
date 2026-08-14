---
name: init
description: Initialise a repository for Vatras.
operation: Establish
---

# Vatras Init

## Purpose

Establish the initial AI development surface for a repository.

## Process

1. Check whether the Agent Entry Point, its adapters, and a Context
   Architecture already exist. If all three are present, stop: report that
   the repository is already established and skip the remaining steps. Do
   not re-derive what already exists.
2. Otherwise, inspect the repository.
3. Detect which AI coding agents it is set up for, using the evidence below.
4. Identify existing agent instruction files and existing documentation.
5. Report what was detected and confirm it before writing. If there is nobody
   to answer, proceed with what was detected and say so in the report.
6. Create or update `AGENTS.md` as the canonical entry point.
7. Create one adapter per detected agent.
8. Establish the Context Architecture at `docs/`.
9. Report the resulting structure.

Do not overwrite existing project knowledge at any step. Add to it, or ask.

Inspection is scoped to the repository being initialised. Never read files
outside it — an installed copy of this plugin elsewhere on disk is not part
of the repository and is not reference material for what to build.

## Detecting the agent environment

Read the repository rather than asking first. The evidence is already there:

| Evidence                                            | Agent            |
| --------------------------------------------------- | ---------------- |
| `.claude/`, `CLAUDE.md`                             | Claude Code      |
| `AGENTS.md`                                         | Codex, and the shared standard |
| `.cursor/rules/`, `.cursorrules`                    | Cursor           |
| `.github/copilot-instructions.md`                   | Copilot          |
| `.windsurf/rules/`, `.windsurfrules`, `.clinerules` | Windsurf, Cline  |

Confirm the detected set with the user before writing. Detection is the initial
model; confirmation corrects it. Asking before looking discards evidence the
repository already provides.

If none are present, no agent is configured yet. Create `AGENTS.md` alone and
add adapters when an agent appears.

## Creates

- `AGENTS.md` — the canonical entry point, always. States where project
  knowledge lives, how the repository is organised, and which documents are
  authoritative. It points to context; it does not contain it.
- One adapter per detected agent. See below.
- `docs/` — the root of the Context Architecture.

## Adapters

An adapter routes one agent to `AGENTS.md`. It contains a pointer and nothing
else. Never copy project context into an adapter: two copies become two
different sets of instructions.

- **Claude Code** — `CLAUDE.md` containing exactly `@AGENTS.md`. Claude Code
  reads `CLAUDE.md`, not `AGENTS.md`, and `@` is an import that loads the file.
  A markdown link loads nothing.
- **Agents that read `AGENTS.md` natively** — no adapter. Adding one is noise.
- **Anything else** — the smallest pointer that agent supports.

## Principles

Do not prescribe the filesystem. Establish the information architecture.

The goal is a clear path from:

```text
AI Agent
   ↓
Agent Entry Point
   ↓
Project Context
   ↓
Codebase
```

Which files implement that path depends on the repository and the agents it
supports. One canonical source of project context, with adapters where an agent
requires them.
