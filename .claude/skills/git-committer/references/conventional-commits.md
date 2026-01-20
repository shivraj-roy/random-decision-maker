# Conventional Commits Reference

Detailed guidelines for commit message formatting and conventions.

## Commit Message Structure

```
type(scope): subject

body (optional)

footer (optional)
```

## Commit Types

### feat - New Features
For adding new functionality or capabilities to the codebase.

**When to use**:
- Adding new user-facing features
- Introducing new API endpoints
- Creating new components/modules
- Adding configuration options

**Examples**:
```
feat: add user authentication system
feat(api): add endpoint for user profile retrieval
feat(ui): add dark mode toggle
feat: implement rate limiting for API
```

### impr - Improvements
For enhancing existing features without changing core behavior.

**When to use**:
- Performance optimizations
- Better error messages
- Enhanced user experience
- Code quality improvements without refactoring

**Examples**:
```
impr: optimize database query performance
impr(ui): improve button accessibility
impr(validation): add more descriptive error messages
impr: enhance logging for debugging
```

### fix - Bug Fixes
For correcting defects or unintended behavior.

**When to use**:
- Fixing crashes or errors
- Correcting logic bugs
- Resolving incorrect output
- Patching security vulnerabilities

**Examples**:
```
fix: resolve null pointer exception in user handler
fix(auth): correct token expiration validation
fix(ui): prevent form submission on Enter key
fix: handle edge case for empty input
```

### docs - Documentation
For documentation-only changes.

**When to use**:
- README updates
- Code comment additions/improvements
- API documentation
- User guides

**Examples**:
```
docs: update installation instructions
docs(api): add examples for authentication endpoints
docs: fix typos in contributing guide
docs: add JSDoc comments to utility functions
```

### style - Code Style
For changes that don't affect code meaning.

**When to use**:
- Formatting changes (whitespace, indentation)
- Missing semicolons
- Code style consistency
- Linting fixes

**Examples**:
```
style: format code with prettier
style: fix indentation in config files
style: remove trailing whitespace
style: apply eslint fixes
```

### refactor - Code Refactoring
For code restructuring without changing behavior.

**When to use**:
- Reorganizing code structure
- Renaming variables/functions for clarity
- Extracting functions/modules
- Simplifying complex code

**Examples**:
```
refactor: extract validation logic into separate module
refactor: rename getUserData to fetchUserProfile
refactor: simplify conditional logic in parser
refactor(api): split large controller into smaller handlers
```

### perf - Performance Improvements
For code changes that improve performance.

**When to use**:
- Algorithm optimizations
- Reducing memory usage
- Caching implementations
- Database query optimization

**Examples**:
```
perf: implement caching for frequently accessed data
perf: optimize image loading with lazy loading
perf(db): add indexes to improve query speed
perf: reduce bundle size by code splitting
```

### test - Tests
For adding or modifying tests.

**When to use**:
- Adding missing tests
- Updating existing tests
- Test refactoring
- Test coverage improvements

**Examples**:
```
test: add unit tests for authentication module
test: update integration tests for API changes
test(utils): add edge case tests for date parser
test: increase coverage for error handling
```

### build - Build System
For changes affecting build process or dependencies.

**When to use**:
- Package.json/requirements.txt updates
- Build script modifications
- Dependency version updates
- Build tool configuration

**Examples**:
```
build: upgrade webpack to v5
build: update dependencies to latest versions
build(deps): bump lodash from 4.17.20 to 4.17.21
build: configure rollup for library builds
```

### ci - Continuous Integration
For CI configuration changes.

**When to use**:
- GitHub Actions workflow updates
- Travis/Circle CI configs
- Deployment pipeline changes
- CI script modifications

**Examples**:
```
ci: add automated testing workflow
ci: configure deployment to production
ci: update node version in build matrix
ci: add code coverage reporting
```

### revert - Reverts
For reverting previous commits.

**When to use**:
- Undoing problematic commits
- Rolling back features
- Reverting breaking changes

**Examples**:
```
revert: revert "feat: add experimental feature"
revert: undo performance optimization causing bugs
```

### chore - Miscellaneous
For other changes not fitting above categories.

**When to use**:
- Updating .gitignore
- Configuration file changes
- Tooling updates
- Maintenance tasks

**Examples**:
```
chore: update .gitignore to exclude logs
chore: clean up unused dependencies
chore: update editor config
chore: reorganize project structure
```

## Scope Guidelines

Scopes provide context about what part of codebase changed.

**Good scopes**:
- Component names: `(header)`, `(sidebar)`, `(footer)`
- Module names: `(auth)`, `(api)`, `(database)`
- Feature areas: `(checkout)`, `(search)`, `(profile)`
- File/folder names: `(utils)`, `(config)`, `(models)`

**Scope naming**:
- Use lowercase
- Use hyphens for multi-word scopes
- Be consistent within project
- Keep scopes short (1-2 words)

**Examples**:
```
feat(user-profile): add avatar upload
fix(payment-gateway): handle declined cards
impr(search-results): optimize result ranking
```

## Subject Line Best Practices

**Rules**:
- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Max 50 characters (72 hard limit)
- Be specific but concise

**Good examples**:
```
add user authentication
fix login validation bug
update API documentation
```

**Bad examples**:
```
Added user authentication     ❌ (past tense)
Add User Authentication       ❌ (capitalized)
add user authentication.      ❌ (period at end)
Add comprehensive user authentication and authorization system with OAuth2   ❌ (too long)
updates                       ❌ (not descriptive)
```

## Commit Body (Optional)

Provide additional context when subject isn't enough.

**When to include**:
- Complex changes needing explanation
- Rationale for decisions
- Breaking change details
- Migration instructions

**Format**:
- Wrap at 72 characters
- Separate from subject with blank line
- Use bullet points for multiple items
- Explain "what" and "why", not "how"

**Example**:
```
feat(api): add pagination to user list endpoint

- Improves performance for large datasets
- Follows REST pagination standards
- Includes total count in response headers
- Maintains backward compatibility
```

## Footer (Optional)

Reference issues, breaking changes, or other metadata.

**Breaking changes**:
```
feat(api): change authentication method

BREAKING CHANGE: API now requires Bearer token instead of API key.
Clients must update authentication headers.
```

**Issue references**:
```
fix(login): resolve session timeout issue

Fixes #123
Closes #456
Refs #789
```

## Multi-Contributor Attribution

Include all contributors in commit message.

**Format**:
```
feat: add search functionality (@user1, @user2)

Co-authored-by: User One <user1@example.com>
Co-authored-by: User Two <user2@example.com>
```

## Breaking Changes

Indicate breaking changes clearly.

**Methods**:
1. Add `!` after type: `feat!: change API response format`
2. Use BREAKING CHANGE footer
3. Include in both for visibility

**Example**:
```
feat(api)!: redesign authentication flow

BREAKING CHANGE: Auth endpoints now use OAuth2. 
See migration guide at docs/oauth-migration.md
```

## Version Bump Guidelines

Commit types map to semantic versioning:

- `feat` → Minor version (1.1.0 → 1.2.0)
- `fix` → Patch version (1.1.0 → 1.1.1)
- `BREAKING CHANGE` → Major version (1.1.0 → 2.0.0)
- Other types → Patch version

## Common Patterns

### Multiple file changes
```
feat(ui): redesign dashboard layout

- Update dashboard component
- Add new chart widgets
- Improve responsive design
```

### Security fixes
```
fix(auth): patch XSS vulnerability

Security issue in user input sanitization.
CVE-2024-12345
```

### Dependency updates
```
build(deps): update react to v18.2.0

Includes new concurrent features and bug fixes.
```

### Configuration changes
```
chore(config): update eslint rules

- Enable stricter type checking
- Add import order rules
- Update prettier config
```

## Anti-Patterns to Avoid

❌ **Vague messages**:
```
fix: bug fix
update: changes
misc: updates
```

❌ **Multiple types**:
```
feat/fix: add feature and fix bug    ❌ (Split into separate commits)
```

❌ **Too detailed**:
```
fix: fixed the bug in the user authentication module where the token validation was not working correctly because of incorrect expiration time calculation    ❌ (Too long, use body)
```

❌ **Past tense**:
```
fixed: corrected login issue    ❌ (Use imperative: "fix: correct login issue")
```

❌ **Type as description**:
```
feat: feature    ❌ (Not descriptive)
```

## Tools and Validation

**Pre-commit hooks**:
- Validate message format
- Check message length
- Enforce conventions

**Commit message templates**:
```bash
git config commit.template .gitmessage
```

**Conventional commits tools**:
- commitlint
- commitizen
- standard-version

## Project-Specific Conventions

Adapt these guidelines to your project needs:

- Define custom types if needed
- Establish scope conventions
- Document breaking change process
- Set up automated validation
- Create commit message templates
