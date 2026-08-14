---
name: init
description: Initialise a repository for Vatras.
operation: Establish
---

# Vatras Init

## Purpose

Establish the initial AI development surface: `AGENTS.md`, one adapter per
agent, `VOCABULARY.md`. Nothing more.

## Process

1. If `AGENTS.md`, its adapters, and `VOCABULARY.md` all exist, stop. Report
   established. Do nothing else.
2. Check for evidence of agents other than the one running this skill (table
   below). The running agent always gets an adapter — don't detect it, it's
   already known.
3. Check for anything that changes the draft: an existing `README`, a naming
   collision, a stated binding rule. See "AGENTS.md — default content."
4. Draft `AGENTS.md`, the adapter(s), and `VOCABULARY.md`. Show the full
   text, not a summary. Let the user edit before writing. If nobody's there
   to confirm, write what was found and say so in the report.
5. Write the files. Report what was created.

Never overwrite existing project knowledge. Add to it, or ask.

Only inspect the repository being initialised. Never read an installed copy
of this plugin elsewhere on disk — it is not part of the repository and not
reference material.

## Other agents

| Evidence                                            | Agent            |
| --------------------------------------------------- | ---------------- |
| `AGENTS.md` already present, unrelated to this run  | Codex, and the shared standard |
| `.cursor/rules/`, `.cursorrules`                    | Cursor           |
| `.github/copilot-instructions.md`                   | Copilot          |
| `.windsurf/rules/`, `.windsurfrules`, `.clinerules` | Windsurf, Cline  |

Confirm the full set before writing. No evidence found → only the running
agent's adapter gets created.

## AGENTS.md — default content

- One line: what this file is. Not a project description.
- "Project vocabulary" section: points at `VOCABULARY.md`, states it's read
  before every operation.

Nothing else by default. Do not add:

- a project description, asked or inferred
- a directory listing, under any heading ("Where things live",
  "Repository layout", or otherwise)
- a commands section
- a conventions section
- a list of authoritative documents

Rule: add a line only if it tells the agent something `ls`, `git log`, or
opening the `README` wouldn't already show. Valid reasons: a naming
collision; a binding rule not inferable from the repo itself (e.g. "never
merge to `main` without asking"); an authority conflict between two sources
that would otherwise look equally credible.

`VOCABULARY.md`'s pointer is the one default exception. It states a policy
about *when* to read, not a fact discoverable by looking — an agent won't
infer "read this first, every time" just by finding the file.

A short `AGENTS.md` is correct for a repo with little established yet. Don't
pad it to avoid looking sparse.

## VOCABULARY.md

Bare `# Vocabulary` heading. Nothing else — no terms, no explanation of what
a vocabulary is (that lives in `AGENTS.md`).

Always created, unlike everything else in the Context Architecture, because
`AGENTS.md` claims it's read on every operation. That claim needs a real file
to point at — otherwise every skill that might record a term needs its own
"does this exist, if not create it" check instead of relying on the file
always being there.

`docs/`, `IDEAS.md`, and a project description are never created here. No
protocol depends on them existing. They get created later, by whichever
operation first needs one, together with the content that justifies it — a
decision, a term, a captured thought. Never reserve their place in
`AGENTS.md` ahead of that.

## Adapters

Pointer only, nothing else. Copying real content into an adapter creates two
sources that drift.

- **Claude Code** → `CLAUDE.md` containing exactly `@AGENTS.md`. `@` imports
  the file; a markdown link does not.
- **Agent reads `AGENTS.md` natively** → no adapter.
- **Anything else** → the smallest pointer that agent's format supports.

Binding content — a branching policy, a commit convention — goes in
`AGENTS.md`, never an adapter. An adapter that accumulates real content stops
being a pointer, and every agent not reading that specific file misses it.

## Principles

```text
AI Agent
   ↓
Agent Entry Point
   ↓
Project Context
   ↓
Codebase
```

One canonical source, adapters where an agent requires them. Establish the
information architecture; don't prescribe the filesystem beyond that.
