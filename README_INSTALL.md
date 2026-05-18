# Client-First Webflow Codex Pack v2

This package contains:

```text
AGENTS.md
GLOBAL_AGENTS.md
client-first-webflow/
  SKILL.md
  references/
    client-first-reference.md
    client-first-checklists.md
```

## Install for the current Webflow project

1. Copy `AGENTS.md` into the root of the project repository.

For the screenshot shown by Mike, that means:

```text
D:\z_development\_websites\webflow-tsa\AGENTS.md
```

2. Install the skill directory wherever your Codex setup stores custom skills:

```text
client-first-webflow/
  SKILL.md
  references/
```

The important requirement is that `SKILL.md` stays directly inside the `client-first-webflow` folder.

## Optional global defaults

Copy `GLOBAL_AGENTS.md` to your Codex home as:

```text
~/.codex/AGENTS.md
```

This makes the Webflow safety rules available across all repositories.

## How to prompt Codex

Use this starter for Webflow MCP tasks:

```text
Use the client-first-webflow skill. Read AGENTS.md first.

You are working in Webflow through MCP.

Goal:
[WHAT I WANT]

Context:
[PAGE, SECTION, CLASS, VARIABLE, FIGMA LINK, ISSUE, SCREENSHOT, OR ERROR]

Constraints:
- Follow official Finsweet Client-First V2/V2.1 unless AGENTS.md defines a project-specific exception.
- Do not publish.
- Do not delete, rename, duplicate, detach, or overwrite existing classes, variables, pages, components, or interactions unless explicitly instructed.
- Inspect before mutating.
- Preserve visual parity unless I explicitly ask for redesign.
- Verify after mutating.

Done when:
- The affected item is fixed.
- The affected classes/variables are re-read and verified.
- No unrelated items were changed.
- You report inspected, changed, reused, left untouched, validation, and remaining checks.
```
