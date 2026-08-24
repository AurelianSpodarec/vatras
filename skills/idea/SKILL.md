---
name: idea
description: Create, find, retrieve, and append to ideas in the Idea Inbox.
operation: Capture
group: idea
---

# Idea

Create, find, retrieve, and append to entries in the Idea Inbox.

## Definition

An idea is an entry in `IDEAS.md` with a unique, stable ID, a creation date,
and content. The ID must remain unchanged and must not be reused.

## Operations

The skill supports four operations. There is no fixed command syntax — decide
which operation applies from the developer's intent.

### Create

When the developer expresses a new idea, create an entry in `IDEAS.md`,
assign the next unused ID, preserve the supplied content, and return the ID.

If `IDEAS.md` does not exist, create it with the header below. If it already
exists, insert the new entry directly below the marker comment, above any
existing entries — the inbox is newest first.

```md
# Idea Inbox

An inbox. Nothing here has been decided, and nothing loads this file.

Newest first. Each entry has an id and the date it was captured.

<!-- Add with vatras:idea. New entries go directly below this line. -->
```

### Find

When the developer asks whether an existing idea matches a thought or topic,
search the Idea Inbox and return relevant existing ideas by ID. Find must not
create or modify ideas.

### Retrieve

When the developer identifies an idea by ID, return its complete entry.
Retrieve must not modify the Idea Inbox.

### Append

When the developer provides additional content for an existing idea, append
it to that idea without replacing or rewriting existing content. The idea's
ID and creation date must remain unchanged.

## Format

```md
## 0023 — 2026-08-14 14:34:12

We should generate documentation from project context.
```

The body is whatever the developer said, tidied only enough to be readable in
six months. Do not expand it, structure it, or add reasoning they did not
give.

## Boundaries

The skill manages the Idea Inbox only, and must not modify files other than
`IDEAS.md`.

It must not critique, investigate, probe, iterate, grill, plan, decide, or
record judgement on an idea unless another capability is explicitly invoked.
Other capabilities address ideas by type and ID:

```
vatras:critique idea 0023
vatras:investigate idea 0023
vatras:probe idea 0023
vatras:iterate idea 0023
vatras:grill idea 0023
```

An idea that turns out to matter comes back through work. Acting on capture
defeats the point: the file is only safe to write in because writing in it
commits to nothing.

## Storage

Ideas are stored in `IDEAS.md` at the repository root. Do not read it as
context — it is not part of the Context Architecture, and nothing in it is
decided. Read it only when the developer asks about their ideas, or when
performing Find or Retrieve.
