# Content Conventions

Rules for writing and generating `content/docs/` that aren't obvious from
reading a single page. Add to this file as conventions are established; do not
scaffold sections ahead of the rules that justify them.

## API skill tables

The table's column order depends on the page, not on the underlying data.

**Context pages** (e.g. `content/docs/context/ideas.mdx`) describe what can be
done with the context:

| Operation | Input | Output | Skill |
| --------- | ----- | ------ | ----- |

Put **Operation first** — the reader is asking "what can I do here?"

**Skills pages** (e.g. `content/docs/skills/index.mdx`) describe the available
capabilities:

| Skill | Operation | Description |
| ----- | --------- | ----------- |

Put **Skill first** — the reader is asking "what can I invoke?"

Use the same underlying operation data for both tables — see
`scripts/idea-inbox-operations.mjs` and `scripts/generate-skills-catalogue.mjs`
for the Idea Inbox example — but do not rearrange either table to make them
match. Each table is written for the reader of that page, not for consistency
with the other page.
