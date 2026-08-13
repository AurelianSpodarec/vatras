#!/usr/bin/env node
// Regenerates the skills table in content/docs/skills/index.mdx from
// skills/*/SKILL.md frontmatter. skills/ is the source of truth; run via
// `pnpm skills:sync`, or automatically before dev/build.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const skillsDir = path.join(root, 'skills')
const indexPath = path.join(root, 'content/docs/skills/index.mdx')

const START = '{/* skills:start */}'
const END = '{/* skills:end */}'

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
    const { name, description, operation } = parseFrontmatter(
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
    return { name, description, operation: operation || '—' }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const rows = skills.map(
  (s) => `| \`vatras:${s.name}\` | ${s.operation} | ${s.description} |`,
)

const table = [
  '| Skill               | Operation | Description                                                   |',
  '| -------------------- | --------- | -------------------------------------------------------------- |',
  ...rows,
].join('\n')

const source = readFileSync(indexPath, 'utf8')
const startIdx = source.indexOf(START)
const endIdx = source.indexOf(END)
if (startIdx === -1 || endIdx === -1) {
  throw new Error(`${indexPath} is missing ${START} / ${END} markers`)
}

const next =
  source.slice(0, startIdx + START.length) +
  '\n\n' +
  table +
  '\n\n' +
  source.slice(endIdx)

if (next !== source) {
  writeFileSync(indexPath, next)
  console.log('content/docs/skills/index.mdx regenerated from skills/*/SKILL.md')
} else {
  console.log('content/docs/skills/index.mdx already up to date')
}
