---
name: idea
description: Capture an idea in the project's inbox without acting on it.
operation: Capture
group: idea
---

# Idea

Record an idea in `IDEAS.md` and stop.

## Purpose

Give a thought somewhere to go so it stops occupying attention. Capture is the
whole operation. The idea is not evaluated, researched, planned or built.

## Process

1. Read `IDEAS.md`. If it does not exist, create it with the header below.
2. Find the highest existing id and add one. Ids are four digits, never reused.
3. Get today's date.
4. Insert the new entry directly below the comment marker, above any existing
   entries.
5. Confirm what was captured in one line.

## Format

```md
## 0012 — 2026-08-13

Flows might need an explicit trigger, not just an order.
```

The body is whatever the developer said, tidied only enough to be readable in
six months. Do not expand it, structure it, or add reasoning they did not give.

If they were terse, the entry is terse. An idea recorded as three words is a
successful capture.

## What this skill does not do

- Does not assess whether the idea is good
- Does not check it against existing project context
- Does not propose next steps
- Does not create tickets, plans or documents
- Does not update the vocabulary, even if the idea names a new concept

An idea that turns out to matter will come back through work. Acting on capture
defeats the point: the file is only safe to write in because writing in it
commits to nothing.

## Reading the inbox

Do not read `IDEAS.md` as context. It is not part of the Context Architecture,
and nothing in it is decided. Read it only when the developer asks about their
ideas.

## New file header

```md
# Ideas

An inbox. Nothing here has been decided, and nothing loads this file.

Newest first. Each entry has an id and the date it was captured.

<!-- Add with vatras:idea. New entries go directly below this line. -->
```
