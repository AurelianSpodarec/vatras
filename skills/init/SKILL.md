---
name: init
description: Initialise a repository for Vatras.
operation: Establish
---

# Vatras Init

## Purpose

Establish the initial AI development surface for a repository.

## Process

1. If `AGENTS.md`, its adapters, and `VOCABULARY.md` already exist, stop:
   report that the repository is already established. Don't redo what's
   already there.
2. Otherwise, check for evidence of any agent *other* than the one running
   this skill (see below) — the running agent needs an adapter regardless,
   which is already known and not something to detect. Also check for
   anything that changes what belongs in the draft: an existing `README`, a
   naming collision, a stated binding rule.
3. Draft `AGENTS.md`, the adapter(s), and `VOCABULARY.md`. Show the actual
   text, not a summary of what was found, and let the user edit before
   writing. If there's nobody to answer, write what was found and say so in
   the report.
4. Write them, then report the resulting structure.

Do not overwrite existing project knowledge at any step. Add to it, or ask.

Inspection is scoped to the repository being initialised. Never read files
outside it — an installed copy of this plugin elsewhere on disk is not part
of the repository and is not reference material for what to build.

## Other agents

The agent running this skill always gets an adapter — that's certain, not
detected. Check the repository for evidence of anything else:

| Evidence                                            | Agent            |
| --------------------------------------------------- | ---------------- |
| `AGENTS.md` already present, unrelated to this run  | Codex, and the shared standard |
| `.cursor/rules/`, `.cursorrules`                    | Cursor           |
| `.github/copilot-instructions.md`                   | Copilot          |
| `.windsurf/rules/`, `.windsurfrules`, `.clinerules` | Windsurf, Cline  |

Confirm the full set with the user before writing. If nothing else is found,
the running agent's adapter is the only one created.

## Creates

- `AGENTS.md` — the canonical entry point, always. By default, the minimum:
  a one-line statement of what this file is (not a project description), and
  a "Project vocabulary" section pointing at `VOCABULARY.md`. See below for
  what else can go in it and when.
- One adapter per agent found. See below.
- `VOCABULARY.md` — a bare `# Vocabulary` heading. Nothing else: no terms,
  no explanation of what a vocabulary is or how to use it. That explanation
  already lives in `AGENTS.md`'s "Project vocabulary" section, and repeating
  it here would be the same redundancy a `docs/README.md` restating
  `AGENTS.md`'s table would be.

`VOCABULARY.md` is the one exception to "structure, not content" below. It
isn't project knowledge itself — it's the mechanism project knowledge (terms)
gets recorded through, and `AGENTS.md` states it's read before every
operation. If `init` doesn't create the file, that rule has nothing to point
at, and every skill that might record a term needs its own "does this exist,
if not create it" check instead of relying on the file always being there.

Nothing else gets created here — not `docs/`, not `IDEAS.md`, not a "what
this project is" description in `AGENTS.md`. None of those have a protocol
depending on them existing; they're pure content, not mechanism, and content
is added later by whichever operation first needs it, together with the
thing that justifies it — a decision, a term inside `VOCABULARY.md`, a
captured thought, a description someone finally wants written down. Do not
reserve a place for any of it in `AGENTS.md` ahead of that: a row or a
section pointing at something that doesn't exist is a cost paid on every
operation for no benefit. Add it in the same step that creates the thing it
points to.

## What belongs in the draft

A "Where things live" table, a "Commands" section, a "Conventions" section, a
list of authoritative documents — all of these commonly get added, and by
default none of them belong. They fail one test:

**Does this tell the agent something it can't get by looking?**

A `README.md` or `CONTRIBUTING.md` at the root is found the moment any agent
starts exploring — restating that it exists, or copying its content, adds
nothing. Commit conventions visible in `git log` are the same. A directory
listing is what `ls` already shows for free, every time, at zero cost. None
of this is wrong to eventually document — it's wrong to write into
`AGENTS.md` by default, before there's a specific, non-obvious reason:

- a naming collision (two things called `docs`, say)
- a binding rule that isn't inferable by pattern-matching — a permission
  constraint like "never merge to `main` without asking" is the clearest
  example, because no amount of looking at the repo would tell an agent that
- an authority distinction between two sources that would otherwise look
  equally credible

Add these sections only when inspection turns up a reason of that shape.
Don't add them out of habit, and don't add them to avoid the draft looking
sparse — a short `AGENTS.md` for a repo that has little established yet is
correct, not incomplete.

`VOCABULARY.md`'s pointer survives this test for a specific reason: reading
it before every operation is a policy about *when*, not a fact about *what
exists*. An agent won't infer that behaviour just by finding the file, so it
has to be stated.

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
