# Matt Pocock's Skills: writing the skill itself

Investigation into how `mattpocock/skills` writes and structures a skill —
not what it records (see [`matt-pocock-skills.md`](matt-pocock-skills.md) for
the context/vocabulary system), but the document itself: what makes one
`SKILL.md` reliable and another vague.

- **Scope**: `skills/productivity/writing-for-agents/` (his own meta-skill for
  writing skills and agent-facing docs), `skills/misc/setup-pre-commit/`,
  `skills/misc/git-guardrails-claude-code/`, `skills/engineering/tdd/`, and
  `skills/engineering/setup-matt-pocock-skills/` as worked examples of
  different skill shapes.
- **Source**: read from the local clone at
  `~/.claude/plugins/marketplaces/mattpocock/`.
- **Read**: 14 August 2026. This is a snapshot of a repository that changes.

## The core claim

`writing-for-agents/SKILL.md` opens by collapsing "write a skill", "write
`AGENTS.md`", and "write any doc an agent reaches by a pointer" into one
problem:

> The packaging differs; the writing does not: the same levers make each one
> predictable — the agent taking the same *process* every run, not producing
> the same output.

Everything below is one document's worth of levers for that.

## Context pointers

A skill's `description` is a **context pointer** — a reference the agent
always carries that names out-of-context material and the condition for
reaching it. `AGENTS.md` mentioning a doc is the same object. The pointer's
*wording* decides whether the material is reached reliably, not the target:
a must-have doc behind a weak pointer is a variance bug, and the fix is
sharpening the wording, not inlining the material.

Rules for one: front-load the leading word (the pointer does its triggering
work at the start); one trigger per branch (synonyms for the same branch are
one branch written twice — collapse them); cut identity the body already
states.

## The two loads

Every addition spends one of two budgets, and they trade off:

- **Context load** — cost on the agent's window. An always-loaded line (a
  skill description, an `AGENTS.md` sentence) is paid on every turn whether
  or not it fires.
- **Cognitive load** — cost on the human, who is the index for anything with
  no pointer. Not a cost to minimise; the price of human agency, spent where
  judgement matters and removed where it doesn't.

## Information hierarchy and progressive disclosure

Content is either a **step** (an ordered action) or **reference** (consulted
on demand), and it sits on a ladder by how immediately it's needed:

1. **In-file step** — what the agent does, in order.
2. **In-file reference** — consulted on demand, often a legitimately flat
   peer-set (every rule of a review on one rung — not a smell).
3. **Disclosed reference** — pushed to a separate file, reached by a pointer,
   loaded only when it fires.

**Progressive disclosure** is the move down the ladder: inline what every
branch needs, push behind a pointer what only some branches reach. `tdd`
does this concretely — the main file states what a good test is, then
`See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for
mocking guidelines` rather than inlining either.

**Sprawl** is the failure mode: a document too long even with every line
live and unique — attention thins, and every extra line is one more to keep
relevant. The cure is the ladder, not trimming words.

## Completion criteria

Every step should end on a condition that tells the agent the work is done,
graded on two axes:

- **Clarity** — can the agent tell done from not-done? A vague bound invites
  ending the step early.
- **Demand** — how much the criterion requires. "Every modified model
  accounted for" forces real work; "produce a change list" doesn't.

This is the concrete pattern in `setup-pre-commit` and
`git-guardrails-claude-code`: both end on a `## Verify` / numbered "Verify"
step with a literal checklist (`- [ ] .husky/pre-commit exists and is
executable`), not a description of what good output looks like left for the
agent to remember to apply.

## Leading words, and the negation trap

A **leading word** is a compact, already-pretrained concept (*seam*, *tracer
bullet*, *red/green*) repeated as a token, never spelled out as a sentence.
It anchors execution (the agent reaches for the same behaviour every time
the word appears) and invocation (the same word in prompts, docs, and code
links them together). `tdd` is built on this — *seam* and *tracer bullet*
each retire a whole clause every time they'd otherwise need spelling out.

**Negation is the paired failure mode**: steering by prohibition drags the
forbidden behaviour into context and makes it more available, not less — the
"don't think of an elephant" effect. The fix is prompting the positive
(state the target so the banned one is never spoken). A prohibition earns
its place only as a hard guardrail that can't be phrased positively, and
even then it should be paired with the positive target.

## Pruning

- **Single source of truth** — one meaning, one place. Duplication costs
  maintenance and inflates that meaning's prominence past its real rank.
- **Cache vs. environment** — `package.json` scripts, config files, the
  directory layout are already sources of truth; a document restating them
  is a cache, and a cache only earns its cost when the lookup is expensive.
  *"Cache what the agent cannot find by looking: the unwritten convention,
  the reason behind a choice, the gotcha no config confesses."*
- **No-ops** — an instruction the model already obeys by default pays load
  to say nothing. The test is model-relative (does it change behaviour
  versus the default?), not a matter of opinion.

## Invocation (`SKILL-MECHANICS.md`)

The skill-specific branch of the same reference. Two choices:

- **Model-invoked** (default: omit `disable-model-invocation`) — the agent
  can fire it autonomously, and other skills can reach it. Permanent context
  load (the description) for discoverability.
- **User-invoked** (`disable-model-invocation: true`) — only a human typing
  its name can fire it, and no other skill can reach it either. Zero context
  load, but the human is now the index.

`setup-matt-pocock-skills` is user-invoked. It's a one-time, consequential,
filesystem-mutating bootstrap — exactly the shape of skill you don't want an
agent deciding on its own to run.

When user-invoked skills multiply past what's memorable, a **router skill**
— one user-invoked skill naming the others and when to reach for each —
folds the list back down to one thing to remember. It can only point, never
fire them (no description means nothing but the human can reach it either).

## Skill shapes, compared

Three genuinely different shapes, each handled differently:

| Skill | Shape | Structure |
| --- | --- | --- |
| `setup-pre-commit`, `git-guardrails-claude-code` | Deterministic — install X, write Y, verify Z | Numbered `### N. Step` subheadings, literal file paths and code blocks, ends on a `- [ ]` Verify checklist, loose caveats pushed to a closing `## Notes` |
| `tdd` | Reference — rules consulted throughout a loop, not steps executed once | Flat peer-set sections, leading words doing most of the compression, sibling files (`tests.md`, `mocking.md`) for detail that's not needed every cycle |
| `setup-matt-pocock-skills` | Judgment — explore, present findings, ask only what inspection couldn't settle, write | Strong defaults with narrow exception triggers ("assume single-context unless monorepo signals"), explicit hard-dependency vs soft-dependency split for the skills that consume its output |

## Applied to `vatras:init`

`init` is closest to the third shape (judgment, not a deterministic script),
and this session's rewrite pulled directly from this material:

- Added a `## Verify` checklist before the draft is shown — `init` had none
  before; the pattern is straight from `setup-pre-commit`.
- The "does this tell the agent something it can't get by looking" test
  written into `init`'s "AGENTS.md content" section is, independently
  arrived at, the same claim as the cache principle above.
- The negation list in that same section (*no project description, no
  directory listing, no commands section...*) is a deliberate use of the
  "earned guardrail" exception — the pretrained prior toward writing those
  sections is strong enough that the positive framing alone (stated first,
  per the rule) likely wouldn't beat it on its own.

## Not yet applied — open for Vatras generally

- **No Vatras skill uses `disable-model-invocation`.** Every skill in
  `skills/` is model-invocable by default, including `init` — a one-time,
  filesystem-mutating bootstrap, the exact shape Matt marks user-invoked.
  Worth deciding deliberately rather than by default.
- **No router skill.** Vatras has eight skills at the root level
  (`critique`, `grill`, `idea`, `init`, `investigate`, `iterate`, `probe`,
  `sharpen`, `vocabulary`) with no single entry point naming them. Not yet a
  problem at this count, but the threshold in Matt's own framework is
  "multiplies past what you can remember."
- **Progressive disclosure is unused.** No Vatras skill has a sibling
  reference file the way `tdd` has `tests.md`/`mocking.md`. None currently
  need it — every skill here is short enough that in-file reference doesn't
  bloat the top — but it's the tool to reach for if one grows past that.
- **Only `init` has been audited against this framework.** The other seven
  skills haven't been checked for completion criteria, leading-word
  opportunities, or cache-principle violations.

## Source paths

```text
skills/productivity/writing-for-agents/SKILL.md
skills/productivity/writing-for-agents/SKILL-MECHANICS.md
skills/misc/setup-pre-commit/SKILL.md
skills/misc/git-guardrails-claude-code/SKILL.md
skills/engineering/tdd/SKILL.md
skills/engineering/setup-matt-pocock-skills/SKILL.md
```
