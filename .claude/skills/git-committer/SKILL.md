---
name: git-committer
description: Automate Git operations with conventional commit messages, smart file filtering, and structured release notes generation. Use when user needs to commit changes, create releases/tags, generate release notes, or validate Git conventions. Enforces commit message standards (feat/fix/impr/etc), filters ignored files (CLAUDE.md), and creates properly formatted release notes.
---

# Git Committer

Automate Git workflows with conventional commits, smart filtering, and professional release notes.

## Core Operations

Use `scripts/git_helper.py` for automated Git operations:

### 1. Smart Commit
```bash
python scripts/git_helper.py commit
```
- Validates staged files (removes CLAUDE.md and configured ignores)
- Guides through conventional commit format
- Suggests commit type based on changes
- Validates message format before committing

### 2. Release Notes
```bash
python scripts/git_helper.py release v1.2.3
```
- Parses commits since last tag
- Categorizes by type (Features/Improvements/Fixes/Others)
- Generates formatted release notes
- Creates annotated tag with notes
- Option to review before creating tag

### 3. Validate Staged Files
```bash
python scripts/git_helper.py validate
```
- Checks for ignored files in staging
- Reports violations
- Suggests corrections

## Commit Message Format

**Standard format**: `type(scope): description`

**Required structure**:
- One-liner only (no multi-line)
- Lowercase, imperative mood
- Scope optional but recommended
- Max 72 characters

**Commit types**:
- `feat`: New feature
- `impr`: Improvement to existing feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, whitespace)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test additions/corrections
- `build`: Build system changes
- `ci`: CI configuration changes
- `revert`: Revert previous commit
- `chore`: Other miscellaneous changes

**Examples**:
```
feat: add new feature (@github_username)
impr(quotes): add english quotes (@username)
fix(leaderboard): show user rank correctly (@user1, @user2)
perf(ui): defer UI updates away from input logic
docs: update API documentation
```

## Release Notes Structure

Generated format follows this exact structure:

```markdown
v1.2.3

Thank you to all the contributors who made this release possible!

Features
• feature-name: description (@contributor) (#PR) (commit-hash)
• another-feature: description (@contributor) (#PR) (commit-hash)

Improvements
• improvement-name: description (@contributor) (#PR) (commit-hash)

Fixes
• fix-name: description (@contributor) (#PR) (commit-hash)

Others
• other-change: description (@contributor) (#PR) (commit-hash)
```

**Section order**: Features → Improvements → Fixes → Others
**Empty sections**: Omitted from output
**Commit parsing**: Extracts type, scope, description, contributors from commit messages

## Configuration

Edit `scripts/config.json` to customize:

```json
{
  "ignored_files": ["CLAUDE.md"],
  "commit_types": {
    "feat": "Features",
    "impr": "Improvements", 
    "fix": "Fixes"
  },
  "max_commit_length": 72,
  "require_scope": false,
  "auto_extract_contributors": true
}
```

## Workflow Integration

### Interactive Commit Workflow
1. Stage changes: `git add <files>`
2. Run: `python scripts/git_helper.py commit`
3. Select commit type from menu
4. Enter optional scope
5. Write description
6. Review generated message
7. Confirm to commit

### Release Workflow  
1. Run: `python scripts/git_helper.py release v1.2.3`
2. Review generated notes
3. Edit if needed
4. Confirm to create annotated tag
5. Push tag: `git push --tags`

### Pre-commit Hook (Optional)
Install to automatically validate:
```bash
python scripts/git_helper.py install-hook
```

## Reference Documentation

Load `references/conventional-commits.md` for:
- Detailed commit type guidelines
- Scope naming conventions
- Breaking change annotations
- Footer formatting

Load `references/release-examples.md` for:
- Real-world release note examples
- Handling different project types
- Multi-contributor attribution
- Version numbering strategies

## Best Practices

- Always validate before committing
- Use descriptive scopes for context
- Keep descriptions under 50 chars when possible
- Include issue/PR numbers in commit body
- Use `feat!:` or `fix!:` for breaking changes
- Group related commits in releases
- Review generated release notes before tagging
