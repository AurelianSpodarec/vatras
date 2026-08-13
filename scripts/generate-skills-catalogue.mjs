#!/usr/bin/env node
// Regenerates the skills tables in content/docs/skills/index.mdx from
// skills/*/SKILL.md frontmatter. skills/ is the source of truth; run via
// `pnpm skills:sync`, or automatically before dev/build. A skill with
// `group: idea` in its frontmatter is listed under the Idea Inbox section
// instead of the general Available table.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const skillsDir = path.join(root, 'skills')
const indexPath = path.join(root, 'content/docs/skills/index.mdx')

const START = '{/* skills:start */}'
const END = '{/* skills:end */}'

// Idea Inbox operations documented in content/docs/context/ideas.mdx that
// have no skills/<name>/SKILL.md yet. Listed here so the catalogue shows the
// full documented API; drop an entry once its skill is actually built.
const PLANNED_IDEA_SKILLS = [
  {
    name: 'critique',
    operation: 'Critique',
    description: 'Surface objections, hidden assumptions and alternatives for an idea.',
  },
  {
    name: 'investigate',
    operation: 'Investigate',
    description: "Investigate an idea's open questions and return findings and constraints.",
  },
  {
    name: 'iterate',
    operation: 'Iterate',
    description: 'Sharpen an idea into a clearer entry.',
  },
  {
    name: 'duplicates',
    operation: 'Duplicates',
    description: 'Find duplicate ideas across the inbox.',
  },
  {
    name: 'develop',
    operation: 'Develop',
    description: 'Run critique, investigation and iteration on an idea together.',
  },
]

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

const table = (rows) =>
  [
    '| Skill               | Operation | Description                                                   |',
    '| -------------------- | --------- | -------------------------------------------------------------- |',
    ...rows.map((s) => `| \`vatras:${s.name}\` | ${s.operation} | ${s.description} |`),
  ].join('\n')

const builtIdeaSkills = skills.filter((s) => s.group === 'idea')
const otherSkills = skills.filter((s) => s.group !== 'idea')

const builtNames = new Set(builtIdeaSkills.map((s) => s.name))
const ideaSkills = [
  ...builtIdeaSkills,
  ...PLANNED_IDEA_SKILLS.filter((s) => !builtNames.has(s.name)),
]

const body = [
  table(otherSkills),
  ideaSkills.length > 0 ? `### Idea Inbox\n\n${table(ideaSkills)}` : null,
]
  .filter(Boolean)
  .join('\n\n')

const source = readFileSync(indexPath, 'utf8')
const startIdx = source.indexOf(START)
const endIdx = source.indexOf(END)
if (startIdx === -1 || endIdx === -1) {
  throw new Error(`${indexPath} is missing ${START} / ${END} markers`)
}

const next =
  source.slice(0, startIdx + START.length) +
  '\n\n' +
  body +
  '\n\n' +
  source.slice(endIdx)

if (next !== source) {
  writeFileSync(indexPath, next)
  console.log('content/docs/skills/index.mdx regenerated from skills/*/SKILL.md')
} else {
  console.log('content/docs/skills/index.mdx already up to date')
}
