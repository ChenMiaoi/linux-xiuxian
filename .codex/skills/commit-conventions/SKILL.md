---
name: commit-conventions
description: Enforce this repository's Conventional Commits policy. Use when Codex is asked to create, check, rewrite, review, or explain Git commit messages; install or verify commit hooks; commit changes; or prepare contribution guidance for linux-xiuxian.
---

# Commit Conventions

Use this skill whenever working with commits in this repository.

## Required Format

Commit subjects must follow:

```text
<type>(<scope>): <description>
```

`(<scope>)` is optional:

```text
<type>: <description>
```

Breaking changes may use `!` before the colon:

```text
feat(api)!: 调整公开接口
```

Rules:

- Use only one subject line for the first line.
- Keep the subject at 100 characters or less.
- Do not end the subject with `.` or `。`.
- Use a concrete Chinese or English description.
- Allow Git-generated `Merge ...` and `Revert ...` subjects.

## Allowed Types

- `feat`: new chapter, feature, or content capability
- `fix`: bug fix or content correction
- `docs`: documentation-only change
- `style`: visual style, formatting, or presentation change
- `refactor`: behavior-preserving restructuring
- `perf`: performance improvement
- `test`: tests or validation fixtures
- `build`: build system or dependency change
- `ci`: CI configuration
- `chore`: maintenance work
- `revert`: revert a previous change

## Scope Guidance

Prefer short lowercase scopes. Good project scopes include:

- `vol0`, `vol1`, `vol2`, ... for novel volume changes
- `novel` for cross-volume novel changes
- `theme` for VitePress theme/components/rendering
- `playground` for C playground extraction, rendering, or execution
- `guide` for writing/world-building guides
- `reference` for glossary, kernel map, or source annotations
- `scripts` for repository automation scripts
- `deps` for package/dependency changes

When scope is unclear, omit it rather than inventing a vague one.

## Agent Workflow

When asked to commit:

1. Inspect `git status --short --branch`.
2. Identify unrelated dirty files and avoid staging them unless explicitly requested.
3. Summarize the intended commit scope from the staged or changed files.
4. Choose the most specific valid type and scope.
5. Validate the proposed message before committing:

```powershell
$env:COMMIT_MSG="fix(theme): 修复 playground 代码缩进"; npm run check:commit-msg
```

6. Commit with the validated subject.

Do not use ad hoc messages such as `update`, `fix`, `优化代码块`, or `misc changes`.

## Examples

Good:

```text
feat(vol1): 新增第四章互动试炼
fix(theme): 修复 playground 隐藏代码后的缩进
docs(reference): 补充网络子系统源码注解
style(theme): 调整境界徽章配色
chore: 更新 VitePress 版本
```

Bad:

```text
优化代码块
update
fix
feat: .
docs(reference): 补充网络子系统源码注解。
```
