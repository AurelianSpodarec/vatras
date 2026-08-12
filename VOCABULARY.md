# Vocabulary

This document defines Vatras's ubiquitous language.

The terms here have specific meanings within the project. They provide a
shared language for humans and AI agents when discussing Vatras, its
architecture, methodology, skills and development process.

Use these terms consistently.

## How this vocabulary works

This is a living project artifact.

Terms should be added or changed when the project develops a concept that
needs a stable name, or when existing terminology proves ambiguous or
inconsistent.

This document is not a general glossary, implementation reference or
scratchpad. It records terminology that has become useful enough to act as
shared project language.

Each term gives its canonical name, a definition of one or two sentences, and
the alternatives it replaces. Where a word was genuinely ambiguous, the
resolution is recorded under Flagged ambiguities rather than silently applied.

## Terms

**Agent Entry Point**:
The first file an AI agent reads when working in a repository. It states where
project knowledge lives and points to it; it does not contain it. In Vatras
this is `AGENTS.md`.
_Avoid_: agent instructions, agent config, agent readme

**Adapter**:
A file that routes one specific AI agent to the **Agent Entry Point** and
contains nothing else. `CLAUDE.md` containing `@AGENTS.md` is an adapter.
_Avoid_: shim, pointer file, stub

**Context Architecture**:
The structure of persistent knowledge around a codebase, and the rules for how
an agent loads it.
_Avoid_: documentation, knowledge base, docs

**Vocabulary**:
The shared language of a project — the terms that carry a specific meaning
within it. Kept at the repository root and read before every operation.
_Avoid_: glossary, ubiquitous language, terminology

**Project Model**:
The structured understanding of a project that an agent reasons from: its
concepts, their relationships, the boundaries of the system, and what remains
unresolved. Distinct from the **Context Architecture**, which is where that
understanding is stored and how it is loaded.
_Avoid_: domain model, mental model

**Model Interrogation**:
The operation of deliberately challenging the current **Project Model** to
expose assumptions, contradictions and gaps.
_Avoid_: grilling, elicitation, interrogation

**Primitive**:
A reusable operation an agent performs as part of the Vatras methodology.
Distinct from a command, which is how a person invokes work — `vatras:init` is
a command and not a primitive.
_Avoid_: command, operation

**Skill**:
A reusable instruction file that teaches an agent how to perform a Vatras
operation, defined by `SKILL.md`. A skill is how a **Primitive** is written
down, not the primitive itself.
_Avoid_: prompt, slash command

## Relationships

- An **Adapter** points to the **Agent Entry Point**; there is one per agent
  that needs it, and none for agents that read `AGENTS.md` natively
- The **Agent Entry Point** points to the **Context Architecture**
- **Vocabulary** is the part of the **Context Architecture** loaded on every
  operation; the rest is loaded when it becomes relevant
- A **Project Model** is recorded in the **Context Architecture**
- **Model Interrogation** refines a **Project Model**
- A **Skill** defines how an agent performs a **Primitive**

## Flagged ambiguities

- "Grilling" was used for what is now **Model Interrogation** — resolved:
  the term is Model Interrogation, and "grilling" is no longer used.
- "docs" names two different things in this repository: `content/docs/` is
  published site content, `docs/` is the Context Architecture for working on
  the repository. Unresolved — both paths are established and neither has
  moved.
- "Idealisation" and "Ideation" both name pages in the documentation with no
  distinction drawn between them. Unresolved — either they are two operations
  that need separating, or one is an unfinished rename.
