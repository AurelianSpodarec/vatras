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

**Artifact**:
A persistent piece of project knowledge. Vocabulary, research, decisions,
requirements and specifications are artifacts.

**Context**:
Information an AI agent can use to understand and work within a project. May be
persistent, or supplied during a particular piece of work.

**Context Architecture**:
The structure of persistent knowledge around a codebase, and the rules for how
an agent loads it.
_Avoid_: documentation, knowledge base

**Document**:
A format for presenting or storing information. Not every document is an
artifact, and an artifact is not tied to a particular document format.

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
challenge, transform or verify artifacts.

**Primitive**:
A fundamental building block of the methodology — a reusable pattern of
reasoning or development that can appear inside multiple skills and workflows.
_Avoid_: command
_Provisional_ — the set of Vatras primitives is still being discovered.

**Project Model**:
The structured understanding of a project that an agent reasons from: its
concepts, their relationships, the boundaries of the system, and what remains
unresolved.
_Avoid_: domain model

**Skill**:
An executable AI workflow that performs an **Operation**, defined by
`SKILL.md`.

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
- A **Skill** performs an **Operation**
- An **Operation** creates or changes **Artifacts**
- **Model Interrogation** is an **Operation** that refines a **Project Model**

## Resolved

- "Grilling" → **Model Interrogation**. Elicitation, Socratic questioning,
  interrogation, model refinement and discovery were each considered and
  rejected before settling on the current term.
- "Operation" was briefly listed under `_Avoid_` for **Primitive**. Resolved:
  Core Terms defines both and the documentation is the source, so Operation is
  a term. A primitive is a building block, an operation is an activity, and a
  skill performs one.

## Open

- "artifact" and "artefact" are both in use. `AGENTS.md` requires British
  spelling in documentation, `content/docs/concepts/core-terms.mdx` defines
  **Artifact**, and `content/docs/context/vocabulary.mdx` writes *artefact*.
- "docs" names two things: `content/docs/` is published site content, `docs/`
  is the Context Architecture for working on this repository.
- "Idealisation" and "Ideation" both name pages in the documentation with no
  distinction drawn between them.
- Whether **Primitive** and **Operation** are genuinely distinct, or one
  concept described twice.
