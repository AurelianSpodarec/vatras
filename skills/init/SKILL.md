---
name: init
description: Initialise a repository for Vatras.
operation: Establish
---

# Vatras Init

## Purpose

Establish `AGENTS.md`, one adapter per agent, and `VOCABULARY.md`. Nothing more.

## Process

1. Check what already exists: `AGENTS.md`, its adapters, `VOCABULARY.md`.
   All three present → stop, report established. Anything missing →
   continue, and only draft what's missing (see "When `AGENTS.md` already
   exists" below).
2. Check for evidence of agents other than the one running this skill (table
   below). The running agent gets an adapter regardless — that's known, not
   detected.
3. Check for anything that changes the `AGENTS.md` draft: an existing
   `README`, a naming collision, a stated binding rule.
4. Draft the missing pieces. Check the draft against Verify below before
   showing it. Show the full text, not a summary, and let the user edit
   before writing. No one to confirm with → write what was found and say so.
5. Write the files and report what was created.

Never overwrite existing project knowledge — add to it, or ask.

Only inspect the repository being initialised, never an installed copy of
this plugin elsewhere on disk.

## Other agents

| Evidence                                            | Agent            |
| --------------------------------------------------- | ---------------- |
| `AGENTS.md` already present, unrelated to this run  | Codex, and the shared standard |
| `.cursor/rules/`, `.cursorrules`                    | Cursor           |
| `.github/copilot-instructions.md`                   | Copilot          |
| `.windsurf/rules/`, `.windsurfrules`, `.clinerules` | Windsurf, Cline  |

Confirm the full set before writing. None found → only the running agent's
adapter is created.

## AGENTS.md content

Default to two things, no heading for either: one line saying what the file
is (not a project description), and one line pointing at `VOCABULARY.md`,
stating it's read before every operation. A heading for a single sentence is
structure that isn't paying for itself yet — add one only once the section
actually grows past one line.

Reference files in backticks (`` `VOCABULARY.md` ``), never as a markdown
link. Nothing renders `AGENTS.md` as clickable HTML, so a link is `()` and a
repeated filename for no benefit over the filename alone.

Add nothing else — no project description, no directory listing ("Where
things live", "Repository layout", or any other name), no commands section,
no conventions section, no list of authoritative documents — unless it tells
the agent something `ls`, `git log`, or the `README` wouldn't already show: a
naming collision, a binding rule not inferable from the repo (e.g. "never
merge to `main` without asking"), or an authority conflict between
equally-credible sources.

## When AGENTS.md already exists

Never rewrite or restructure it, regardless of who wrote it or what shape
it's in — same rule as any prose that isn't yours: add to it, don't rewrite
it to taste.

Add only what's structurally missing, appended, never injected at the top:

- No vocabulary pointer → append one line, no heading, and create
  `VOCABULARY.md` if it doesn't exist.
- No adapter for an agent in use → create it.

No identity-labelling step. A file named `AGENTS.md` with real content in it
is already serving as the entry point — annotating that adds nothing.

## VOCABULARY.md

Bare `# Vocabulary` heading, nothing else — no terms, no explanation of what
it is (that's in `AGENTS.md`). Always created: `AGENTS.md` claims it's read
every operation, so that claim needs a real file to point at, or every skill
that might add a term needs its own existence-check instead.

`docs/`, `IDEAS.md`, and everything else in the Context Architecture are
never created here — no protocol depends on them existing. They arrive
later, with whichever operation first needs them.

## Adapters

Pointer only — copying real content into one creates two sources that drift.

- **Claude Code** → `CLAUDE.md` containing exactly `@AGENTS.md`. `@` imports;
  a markdown link doesn't.
- **Reads `AGENTS.md` natively** → no adapter.
- **Anything else** → the smallest pointer that format supports.

Binding content — a branching policy, a commit convention — goes in
`AGENTS.md`, never an adapter, or every agent not reading that specific file
misses it.

## Verify

Before showing the draft, check it against every line:

- [ ] `AGENTS.md` has no project description, no directory listing, no
      commands section, no conventions section, no authoritative-documents
      list — unless a specific reason earned one
- [ ] `AGENTS.md` has a one-line pointer (no heading) to `VOCABULARY.md`,
      stating it's read before every operation
- [ ] `VOCABULARY.md` is exactly `# Vocabulary`
- [ ] Every adapter is a pointer only — `CLAUDE.md` is exactly `@AGENTS.md`
- [ ] Nothing outside `AGENTS.md`, its adapters, and `VOCABULARY.md` was
      created or modified
- [ ] If `AGENTS.md` already existed, its original content is untouched —
      only appended to, never rewritten
