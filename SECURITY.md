# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Vatras, please do not report it
through a public GitHub issue, discussion, pull request, or other public
channel.

Please use GitHub's **private vulnerability reporting** for this repository.

Security researchers can submit a private vulnerability report from the
repository's **Security and quality → Reporting → Report a vulnerability**
interface.

Please include as much of the following information as possible:

- a description of the vulnerability
- steps to reproduce it
- the affected skill, workflow, file, or component
- the potential security impact
- a proof of concept, where appropriate
- any suggested mitigation or fix

You do not need to have a complete fix before reporting a vulnerability.

## What We Consider a Security Vulnerability

Vatras provides AI-agent skills and development workflows. Security issues may
therefore involve both conventional software vulnerabilities and unsafe
agent behaviour.

Examples include:

- **Prompt or instruction injection** that causes a Vatras skill or agent to
  disregard its intended security boundaries.
- **Command injection** or unsafe construction of shell commands.
- **Unintended filesystem access**, including path traversal, destructive
  writes, or access outside the intended project scope.
- **Privilege escalation** caused by a skill or workflow requesting or using
  permissions beyond those required for its purpose.
- **Sensitive information disclosure**, including credentials, secrets,
  environment variables, private files, or other sensitive project data.
- **Context integrity issues** that allow untrusted content to modify or
  override trusted project instructions or context.
- **Supply-chain vulnerabilities** affecting skills, dependencies, plugins, or
  other software distributed by Vatras.
- **GitHub Actions or repository workflow vulnerabilities** that could allow
  unauthorised code execution, credential exposure, or repository compromise.
- **Other vulnerabilities** that could cause an agent using Vatras to perform
  an unintended security-sensitive action.

## Out of Scope

The following are generally not considered vulnerabilities in Vatras:

- AI hallucinations or ordinary incorrect output.
- An agent making an incorrect decision while following the documented
  behaviour of a skill.
- Vulnerabilities in software built using Vatras that are unrelated to Vatras
  itself.
- Vulnerabilities in third-party dependencies that are not introduced or
  caused by Vatras.
- Issues that require the user to deliberately ignore documented security
  boundaries or protections.

If you are unsure whether an issue is security-sensitive, please report it
privately rather than disclosing it publicly.

## Disclosure

We will work with the reporter to understand and remediate valid
vulnerabilities before public disclosure where appropriate.

Once a vulnerability has been addressed, we may publish a GitHub Security
Advisory containing the relevant details and remediation information.
