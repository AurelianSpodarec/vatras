# Vocabulary

The canonical terms used in this project. `content/docs/` is the source; this
is the compressed form, loaded on every operation. Rules for using it are in
[AGENTS.md](AGENTS.md).

## Terms

**Adapter**:
A file that routes one specific AI agent to the **Agent Entry Point** and
contains nothing else. `CLAUDE.md` containing `@AGENTS.md` is an adapter.

**Agent Entry Point**:
The first file an AI agent reads when working in a repository. It states where
project knowledge lives and points to it; it does not contain it.

**Artefact**:
A piece of project knowledge that is loaded and acted on. A file nothing
consumes is a file, not an artefact. Source code is not an artefact; it is
what artefacts are about.
_Avoid_: artifact

**Context**:
Everything an agent can draw on to understand a project, and the discipline of
what gets loaded when. Some persists between sessions; some is supplied for
one piece of work.

**Context Architecture**:
The structure of persistent knowledge around a codebase, and the rules for how
an agent loads it.
_Avoid_: documentation, knowledge base

**Methodology**:
The overall way Vatras approaches AI-assisted software development: the
principles, stages and relationships between operations, rather than any
particular skill.

**Model Interrogation**:
The operation of deliberately challenging the current **Project Model** to
expose assumptions, contradictions and gaps.
_Avoid_: grilling, elicitation, interrogation, model refinement, discovery

**Operation**:
A way of working with project knowledge. An operation may create, inspect,
challenge, transform or verify artefacts.

**Primitive**:
An **Operation** the methodology keeps returning to — one fundamental enough
to recur across unrelated pieces of work. Not a separate kind of thing from an
operation.
_Avoid_: command
_Provisional_ — the set of Vatras primitives is still being discovered.

**Project Model**:
The structured understanding of a project that an agent reasons from: its
concepts, their relationships, the boundaries of the system, and what remains
unresolved.
_Avoid_: domain model

**Skill**:
An **Artefact** that encodes an **Operation**: a file whose content instructs
an agent how to perform a particular piece of work. Defined by `SKILL.md`.

**Vocabulary**:
The shared language of a project — the terms that carry a specific meaning
within it. Kept at the repository root and read before every operation.
_Avoid_: glossary, ubiquitous language

## Relationships

- An **Adapter** points to the **Agent Entry Point**; there is one per agent
  that needs it, and none for agents that read `AGENTS.md` natively
- The **Agent Entry Point** points to the **Context Architecture**
- **Vocabulary** is the part of the **Context Architecture** loaded on every
  operation; the rest is loaded when it becomes relevant
- A **Project Model** is recorded in the **Context Architecture**
- A **Skill** is an **Artefact** that encodes an **Operation**
- Every **Primitive** is an **Operation**; not every operation is a primitive
- An **Operation** creates or changes **Artefacts**
- **Model Interrogation** is an **Operation** that refines a **Project Model**

## Resolved

- "Grilling" → **Model Interrogation**. Elicitation, Socratic questioning,
  interrogation, model refinement and discovery were each considered and
  rejected before settling on the current term.
- "Operation" was briefly listed under `_Avoid_` for **Primitive**. Resolved:
  both are terms, and they are not siblings — a primitive is an operation that
  recurs. Every primitive is an operation; not every operation is a primitive.
- "artifact" → **Artefact**. Both spellings were in use; `AGENTS.md` requires
  British spelling in documentation, so the American form is now avoided.
- "Document" was defined only to contrast with **Artefact**. Resolved: once an
  artefact is knowledge that gets loaded and acted on, a document is just a
  file, and the term was dropped.

## Open

- "docs" names two things: `content/docs/` is published site content, `docs/`
  is the Context Architecture for working on this repository.
- "Idealisation" and "Ideation" both name pages in the documentation with no
  distinction drawn between them.
