# Matt Pocock's Skills: the context system

Investigation into how `mattpocock/skills` persists and loads project
knowledge, and what it does with terminology in particular.

- **Scope**: the context and domain-modelling portion only. The spec pipeline
  (`to-spec`, `to-tickets`, `implement`), triage and the feedback skills are
  not covered here.
- **Source**: read from the local clone at
  `~/.claude/plugins/marketplaces/mattpocock/` (also cached at
  `~/.claude/plugins/cache/mattpocock/mattpocock-skills/1.2.0/`).
- **Read**: 12 August 2026. This is a snapshot of a repository that changes.

## Artefacts

Three, and nothing else.

| File | Role |
| ---- | ---- |
| `CONTEXT.md` (repo root) | The glossary. |
| `CONTEXT-MAP.md` (repo root) | Only in multi-context repos. Lists each context, where its `CONTEXT.md` lives, and how the contexts relate. |
| `docs/adr/NNNN-slug.md` | Decisions. Sequential numbering. |

The presence of `CONTEXT-MAP.md` is the switch. If it exists, the repo has
multiple contexts and skills go looking for per-context glossaries under
`src/<context>/CONTEXT.md`, each with its own `src/<context>/docs/adr/`. If
only a root `CONTEXT.md` exists, the repo is single-context. If neither
exists, nothing has been established yet.

Separately there is a configuration layer, which is not context:
`docs/agents/domain.md`, `docs/agents/issue-tracker.md` and
`docs/agents/triage-labels.md`, all written by `setup-matt-pocock-skills`,
with a short `## Agent skills` block added to `CLAUDE.md` or `AGENTS.md`
pointing at them.

`CONTEXT.md` is scoped aggressively. From the skill:

> `CONTEXT.md` should be totally devoid of implementation details. Do not
> treat `CONTEXT.md` as a spec, a scratch pad, or a repository for
> implementation decisions. It is a glossary and nothing else.

His own is 30 lines and defines four terms.

## Format

Defined in `skills/engineering/domain-modeling/CONTEXT-FORMAT.md`.

```md
# {Context Name}

{One or two sentences on what this context is and why it exists.}

## Language

**Order**:
A customer's request to purchase one or more items.
_Avoid_: Purchase, transaction

## Relationships

- An **Invoice** belongs to exactly one **Customer**

## Flagged ambiguities

- "backlog" was used to mean both the tool hosting issues and the body of
  work inside it — resolved: the tool is the **Issue tracker**.
```

The rules attached to it:

- Be opinionated. Where several words exist for one concept, pick one and
  list the rest under `_Avoid_`.
- One or two sentences per term. Define what it *is*, not what it does.
- Only terms specific to this project. General programming concepts are
  excluded even when the project uses them heavily.
- Group under subheadings only when natural clusters emerge.

Two mechanisms here carry most of the weight. `_Avoid_` is what makes the
glossary enforceable rather than decorative — other skills are instructed not
to drift to the listed synonyms. `Flagged ambiguities` records the
*resolution* of a past collision, so a distinction that was deliberately
collapsed does not get re-argued later.

## Reading and writing are separated

This is the load-bearing structural decision.

**Reading is not a skill.** From `domain-modeling/SKILL.md`:

> Merely *reading* `CONTEXT.md` for vocabulary is not this skill — that's a
> one-line habit any skill can do.

It is instead encoded as consumer rules in `docs/agents/domain.md`, which
every engineering skill consults before exploring a codebase. Those rules say:
read `CONTEXT.md` (or the map, then the relevant contexts) and any ADRs
touching the area; when your output names a domain concept, use the glossary's
term; if the concept you need is not in the glossary, treat that as a signal —
either you are inventing language the project does not use, or there is a real
gap; if your output contradicts an ADR, surface it rather than silently
overriding it.

**Writing is an active discipline.** `domain-modeling` is model-invocable and
runs during design work, doing four things:

1. Challenge terms that conflict with the existing glossary, immediately.
2. Sharpen vague or overloaded language into a proposed canonical term.
3. Stress-test relationships with invented edge-case scenarios.
4. Cross-reference claims against the code — *"your code cancels entire
   Orders, but you just said partial cancellation is possible."*

And it writes as it goes: *"When a term is resolved, update `CONTEXT.md`
right there. Don't batch these up."*

**It is never a standalone step.** `skills/engineering/grill-with-docs/SKILL.md`
is seven lines, and the body is one:

> Run a `/grilling` session, using the `/domain-modeling` skill.

Vocabulary maintenance is a passenger on interrogation, not a phase of its
own.

## Files are created lazily

`setup` is explicit that missing context files are not a problem to report:

> If any of these files don't exist, **proceed silently**. Don't flag their
> absence; don't suggest creating them upfront.

`CONTEXT.md` appears when the first term is resolved. `docs/adr/` appears when
the first ADR is needed. Nothing is scaffolded ahead of content.

## Decisions are gated

An ADR is offered only when all three hold:

1. Hard to reverse — changing your mind later has meaningful cost.
2. Surprising without context — a future reader will wonder why.
3. The result of a real trade-off — there were genuine alternatives.

Miss one and it is skipped. The template is one to three sentences; Status,
Considered Options and Consequences are optional and usually omitted. The
value is in recording *that* a decision was made and *why*, not in filling
out sections.

## The deprecation is the most instructive part

`skills/deprecated/ubiquitous-language/` was replaced by
`skills/engineering/domain-modeling/`. The delta:

| Deprecated | Current |
| ---------- | ------- |
| `UBIQUITOUS_LANGUAGE.md` | `CONTEXT.md` |
| Markdown tables | `**Term**:` + definition + `_Avoid_:` |
| User-invoked only (`disable-model-invocation: true`) | Model-invocable |
| "Scan the conversation" — retrospective batch extraction | Continuous inline capture during design |
| Mandatory example dialogue, 3–5 exchanges | Dropped |
| Glossary only | Glossary and decisions in one skill |
| — | Cross-references claims against code |
| — | Lazy creation; multi-context map |

Two things moved at once. The artefact stopped being named after the concept
(`UBIQUITOUS_LANGUAGE.md`) and started being named after its role in the
system (`CONTEXT.md`). The skill stopped being named after the concept
(`ubiquitous-language`) and started being named after the activity
(`domain-modeling`). The concept name itself was retired from both.

The behavioural change is the same shape: from a document you generate on
request, to a discipline that runs while you work.

## What this system does not settle

- **No name for the tier.** The glossary is read before every operation, but
  nothing in the system names that property or distinguishes it from
  knowledge fetched on demand. `CONTEXT.md` is named after the general idea
  of context, which leaves "context" meaning both the tier and one file
  inside it.
- **No size ceiling.** Nothing says what happens when a glossary grows past
  the point where reading it on every operation is cheap. The exclusion rules
  keep it small in practice, so the question does not arise.
- **Which glossary is ambient in a multi-context repo.** The map points at
  several; skills are told to read the ones "relevant to the topic", which
  requires knowing the topic before reading the language that describes it.
- **Enforcement is by instruction only.** Nothing checks that outputs use
  glossary terms or that `_Avoid_` synonyms stay out.
- **Entry point handling is agent-shaped.** `setup` edits whichever of
  `CLAUDE.md` or `AGENTS.md` already exists and never creates the other, so a
  repository can end up with its agent configuration in a Claude-specific
  file with no shared entry point.

## Source paths

```text
CONTEXT.md
CLAUDE.md
skills/engineering/domain-modeling/SKILL.md
skills/engineering/domain-modeling/CONTEXT-FORMAT.md
skills/engineering/domain-modeling/ADR-FORMAT.md
skills/engineering/grill-with-docs/SKILL.md
skills/engineering/setup-matt-pocock-skills/SKILL.md
skills/engineering/setup-matt-pocock-skills/domain.md
skills/deprecated/ubiquitous-language/SKILL.md
```
