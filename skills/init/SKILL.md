---
name: init
description: Initialise a repository for Vatras.
operation: Establish
---

# Vatras Init

## Purpose

Establish the initial AI development surface for a repository.

## Process

1. Check whether the Agent Entry Point and its adapters already exist. If
   both are present, stop: report that the repository is already established
   and skip the remaining steps. Do not re-derive what already exists.
2. Otherwise, inspect the repository: its layout, its tooling, and what it
   already says about itself.
3. Detect which AI coding agents it is set up for, using the evidence below.
4. Ask what the project is, in one sentence. If there's nobody to answer,
   leave it out — see below.
5. Draft `AGENTS.md` and the adapters, and present the actual draft — not a
   summary of what was detected — for confirmation before writing. If there
   is nobody to answer, proceed with what was detected and say so in the
   report.
6. Write `AGENTS.md` as the canonical entry point.
7. Write one adapter per detected agent.
8. Report the resulting structure.

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

## Determining what the project is

Ask, in one sentence. Don't infer it from a `README` or a manifest's
description field — those are prose someone wrote once and most repositories
never keep current. This is not the same case as agent detection: file
presence is a fact; a README's description is someone's characterisation of
the project, and an easily-stale one.

A stale or aspirational description stated as fact in `AGENTS.md` is worse
than no description: a missing section is obviously incomplete and invites a
fix, while a plausible-sounding wrong one reads as settled and rarely gets
caught. If there's nobody to ask, leave the section out and say so in the
report, rather than guess.

## Creates

- `AGENTS.md` — the canonical entry point, always. States where project
  knowledge lives, how the repository is organised, and which documents are
  authoritative. It points to context; it does not contain it.
- One adapter per detected agent. See below.

Nothing else. `docs/`, `VOCABULARY.md`, `IDEAS.md`, and the rest of the
Context Architecture are not created here. They get created later, by
whichever operation first needs them, together with the content that
justifies them — a decision, a term, a captured thought. Do not reserve their
place in `AGENTS.md` ahead of that: a table row pointing at something that
doesn't exist is a cost paid on every operation for no benefit. Add the row
in the same step that creates the thing it points to.

## Adapters

An adapter routes one agent to `AGENTS.md`. It contains a pointer and nothing
else. Never copy project context into an adapter: two copies become two
different sets of instructions.

- **Claude Code** — `CLAUDE.md` containing exactly `@AGENTS.md`. Claude Code
  reads `CLAUDE.md`, not `AGENTS.md`, and `@` is an import that loads the file.
  A markdown link loads nothing.
- **Agents that read `AGENTS.md` natively** — no adapter. Adding one is noise.
- **Anything else** — the smallest pointer that agent supports.

Content that is genuinely binding on every operation — a branching policy, a
commit message convention — belongs directly in `AGENTS.md`, never in an
adapter. An adapter that accumulates real content stops being a pointer, and
every agent that isn't reading that specific adapter silently misses it.

## Confirming before writing

Confirmation shows the actual draft — the text `AGENTS.md` and each adapter
will contain — not a summary of what was detected. A user correcting "Cursor,
not Windsurf" is a cheaper conversation than one correcting prose after it's
already been written. Let them edit before writing.

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
