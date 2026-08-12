---
name: init
description: Initialise a repository for Vatras.
---

# Vatras Init

## Purpose

Establish the initial AI development surface for a repository.

## Process

1. Inspect the repository.
2. Identify existing agent instruction files.
3. Identify existing documentation.
4. Do not overwrite existing project knowledge.
5. Create or update the repository-level agent entry point.
6. Establish the Context Architecture.
7. Report what was created or changed.

## Creates

- `AGENTS.md` — the entry point. States where project knowledge lives, how the
  repository is organised, and which documents are authoritative.
- `CLAUDE.md` — the line `@AGENTS.md` and nothing else. Claude Code does not
  read `AGENTS.md`, and `@` is an import, so this loads the shared entry point
  rather than duplicating it. A markdown link does not work: it loads nothing.
- `docs/` — the root of the Context Architecture.

## Principles

The entry point should direct the agent towards project context rather than attempting to contain the entire context itself.
