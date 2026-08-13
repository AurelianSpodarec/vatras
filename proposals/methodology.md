---
title: Methodology
description: The loop Vatras proposes, and how much of it exists.
---

# Methodology

Exploratory. This works out the shape of the process; the published
documentation is authoritative where the two disagree.

## The problem this has to solve

We have named operations and no stated relationship between them. Idealisation,
Vocabulary, Model Interrogation, Exploration and Ideation exist as words. Nothing
says what feeds what, what triggers what, or where the work goes afterwards.

A collection of moves is not a process. The point of a methodology is the line
you work within — so the work can vary while the process stays observable.

## The loop

```text
                    ┌─── Establish ───┐
                    │   once per repo  │
                    └────────┬─────────┘
                             ↓
        ┌──────────────  Understand  ──────────────┐
        │   explore · idealise · interrogate ·     │
        │   research · settle language             │
        └──────────────────┬───────────────────────┘
                           ↓
                        Decide
                           ↓
                         Plan
                           ↓
                         Build
                           ↓
                        Verify
                           ↓
                       Feed back
                           │
        ┌──────────────────┘
        ↓
  Persistent context ──→ every future pass starts better informed
```

The loop is not a gate sequence. It is the default path through work, and the
return arrow is the part that matters: what a pass reveals becomes context the
next pass does not have to rediscover.

## Stages, not steps

**Establish** — put the surface in place: the entry point, its adapters, and
the root of the context architecture. Runs once per repository.
*Exists — `vatras:init`.*

**Understand** — form a model of what the project is, then attack it. Read what
is already there, propose an initial understanding, challenge it, investigate
what the challenge exposes, and record the language that settles on the way.
*Partly exists — the operations are named, only vocabulary is built.*

**Decide** — record the choices that were hard to reverse, with the reasoning
that produced them. Understanding that is not written down is re-derived, badly.
*Missing.*

**Plan** — turn understanding into intended work, at whatever granularity the
project already uses. The plan is an artefact; where it lives is not Vatras's
business.
*Missing.*

**Build** — implement against the plan, with the vocabulary and decisions
loaded so the work uses the project's own language.
*Missing.*

**Verify** — check that what was built is what was intended, which is a
different question from whether it runs.
*Missing.*

**Feed back** — decide what the pass revealed and where it belongs. A failure
that produces no change to the context will happen again.
*Missing.*

## Primitives are not stages

This is the distinction that keeps the loop from becoming a waterfall.

A stage is a position in the process. A primitive is a move available at any
position. Interrogation is not the third step — you can interrogate before
anything is written, halfway through building, or after an implementation
proves the original understanding wrong.

```text
Stages      ordered, and only a default order
Primitives  available at any point, and what stages are made of
```

So the loop describes where work usually goes, not what you are permitted to do
next. A methodology that forbids moves is a process; one that names them is a
vocabulary for work.

## What the loop implies that we have not built

- **Decisions have nowhere to live.** `docs/` holds a README. The reasoning
  behind every choice made so far exists only in conversation.
- **The right-hand side is entirely unbuilt.** Plan, build, verify and feed back
  have no terms, no pages and no skills.
- **Feedback is the whole thesis and the least defined part.** Persistence is
  the argument Vatras opens with; the mechanism that turns a failure into
  persistent context is unspecified.
- **Planning must not assume a tracker.** Markdown, GitHub Issues, Linear and
  Jira all have to work, which means the operation is defined by what it
  produces rather than where it goes.

## Open questions

- Is Understand one stage or several? It currently absorbs four operations.
- Does Decide belong as a stage, or is it a by-product of every stage, the way
  vocabulary is?
- Where does research sit — an operation inside Understand, or something any
  stage can invoke?
- What triggers a return to Understand from further down the loop, and is that
  a failure or the normal case?
