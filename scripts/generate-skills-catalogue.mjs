#!/usr/bin/env node
// Regenerates two generated blocks from their sources of truth; run via
// `pnpm skills:sync`, or automatically before dev/build.
//
//  - content/docs/skills/index.mdx      <- skills/*/SKILL.md frontmatter,
//                                           plus scripts/idea-inbox-operations.mjs
//                                           for Idea Inbox operations with no
//                                           skill yet
//  - content/docs/context/ideas.mdx     <- scripts/idea-inbox-operations.mjs
//
// A skill with `group: idea` in its frontmatter is listed under the Idea
// Inbox section instead of the general Available table.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IDEA_INBOX_OPERATIONS } from './idea-inbox-operations.mjs'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const skillsDir = path.join(root, 'skills')
const skillsIndexPath = path.join(root, 'content/docs/skills/index.mdx')
const ideasPath = path.join(root, 'content/docs/context/ideas.mdx')

function replaceBetweenMarkers(filePath, start, end, body) {
  const source = readFileSync(filePath, 'utf8')
  const startIdx = source.indexOf(start)
  const endIdx = source.indexOf(end)
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`${filePath} is missing ${start} / ${end} markers`)
  }
  const next =
    source.slice(0, startIdx + start.length) + '\n\n' + body + '\n\n' + source.slice(endIdx)
  if (next !== source) {
    writeFileSync(filePath, next)
    console.log(`${path.relative(root, filePath)} regenerated`)
  } else {
    console.log(`${path.relative(root, filePath)} already up to date`)
  }
}

function parseFrontmatter(source, skillPath) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) throw new Error(`${skillPath} is missing frontmatter`)
  const fields = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i === -1) continue
    fields[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return fields
}

const skills = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const skillPath = `skills/${entry.name}/SKILL.md`
    const { name, description, operation, group } = parseFrontmatter(
      readFileSync(path.join(skillsDir, entry.name, 'SKILL.md'), 'utf8'),
      skillPath,
    )
    if (!name || !description) {
      throw new Error(`${skillPath} frontmatter must set name and description`)
    }
    if (name !== entry.name) {
      throw new Error(
        `${skillPath} frontmatter name "${name}" does not match its directory "${entry.name}"`,
      )
    }
    return { name, description, operation: operation || '—', group: group || null }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const skillsTable = (rows) =>
  [
    '| Skill               | Operation | Description                                                   |',
    '| -------------------- | --------- | -------------------------------------------------------------- |',
    ...rows.map((s) => `| \`vatras:${s.name}\` | ${s.operation} | ${s.description} |`),
  ].join('\n')

const builtIdeaSkills = skills.filter((s) => s.group === 'idea')
const otherSkills = skills.filter((s) => s.group !== 'idea')

const builtNames = new Set(builtIdeaSkills.map((s) => s.name))
const plannedIdeaSkills = IDEA_INBOX_OPERATIONS.filter((op) => !builtNames.has(op.skill)).map(
  (op) => ({ name: op.skill, operation: op.operation, description: op.description }),
)
const ideaSkills = [...builtIdeaSkills, ...plannedIdeaSkills]

const skillsBody = [
  skillsTable(otherSkills),
  ideaSkills.length > 0 ? `### Idea Inbox\n\n${skillsTable(ideaSkills)}` : null,
]
  .filter(Boolean)
  .join('\n\n')

replaceBetweenMarkers(skillsIndexPath, '{/* skills:start */}', '{/* skills:end */}', skillsBody)

const ideaApiTable = [
  '| Operation | Input | Output | Skill |',
  '| --------- | ----- | ------ | ----- |',
  ...IDEA_INBOX_OPERATIONS.map(
    (op) => `| **${op.operation}** | ${op.input} | ${op.output} | \`vatras:${op.skill}\` |`,
  ),
].join('\n')

replaceBetweenMarkers(
  ideasPath,
  '{/* idea-inbox-api:start */}',
  '{/* idea-inbox-api:end */}',
  ideaApiTable,
)
