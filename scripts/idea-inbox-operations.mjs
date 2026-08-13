// Single source of truth for the Idea Inbox API. Consumed by:
//  - content/docs/context/ideas.mdx (Operation/Input/Output/Skill table)
//  - content/docs/skills/index.mdx  (Idea Inbox skill table, via
//    generate-skills-catalogue.mjs — description is a fallback there,
//    overridden by skills/<name>/SKILL.md once a skill is actually built)
// Edit this array; both docs regenerate from it via `pnpm skills:sync`.

export const IDEA_INBOX_OPERATIONS = [
  {
    skill: 'idea',
    operation: 'Capture',
    input: 'a thought',
    output: 'an entry',
    description: "Capture an idea in the project's inbox without acting on it.",
  },
  {
    skill: 'critique',
    operation: 'Critique',
    input: 'an entry',
    output: 'objections, hidden assumptions, alternatives',
    description: 'Surface objections, hidden assumptions and alternatives for an idea.',
  },
  {
    skill: 'investigate',
    operation: 'Investigate',
    input: 'an entry + open questions',
    output: 'findings, constraints',
    description: "Investigate an idea's open questions and return findings and constraints.",
  },
  {
    skill: 'iterate',
    operation: 'Iterate',
    input: 'an entry',
    output: 'a sharper entry',
    description: 'Sharpen an idea into a clearer entry.',
  },
  {
    skill: 'duplicates',
    operation: 'Duplicates',
    input: 'the inbox',
    output: 'duplicate ideas',
    description: 'Find duplicate ideas across the inbox.',
  },
  {
    skill: 'develop',
    operation: 'Develop',
    input: 'an entry',
    output: 'critique + investigation + iteration',
    description: 'Run critique, investigation and iteration on an idea together.',
  },
]
