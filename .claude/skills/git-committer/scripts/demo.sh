#!/bin/bash
# Demo script showing git-committer usage

echo "======================================"
echo "Git Committer Skill - Demo"
echo "======================================"
echo ""

# Initialize a test git repo
echo "📁 Setting up test repository..."
DEMO_DIR="/tmp/git-committer-demo"
rm -rf "$DEMO_DIR"
mkdir -p "$DEMO_DIR"
cd "$DEMO_DIR"

git init
git config user.name "Demo User"
git config user.email "demo@example.com"

echo "✅ Test repository created"
echo ""

# Create some test files
echo "📝 Creating test files..."
echo "# My Project" > README.md
echo "console.log('hello');" > app.js
echo "This is a note for Claude" > CLAUDE.md

echo "✅ Created: README.md, app.js, CLAUDE.md"
echo ""

# Stage all files (including CLAUDE.md)
echo "📦 Staging all files..."
git add .
echo "✅ Staged 3 files"
echo ""

# Show what the validation would catch
echo "🔍 Validating staged files..."
echo "This would catch CLAUDE.md as an ignored file:"
echo ""
git status --short
echo ""
echo "⚠️  git-committer would detect CLAUDE.md and offer to unstage it"
echo ""

# Demo correct workflow
echo "======================================"
echo "Correct Workflow Example"
echo "======================================"
echo ""

# Unstage CLAUDE.md
git reset HEAD CLAUDE.md
echo "✅ Unstaged CLAUDE.md"
echo ""

# Show commit example
echo "💬 Example commit message format:"
echo ""
echo "feat: add user authentication"
echo "impr(ui): optimize rendering performance"
echo "fix(api): resolve null pointer exception"
echo ""

# Make a proper commit
git commit -m "feat: initial project setup"
echo ""

# Create another commit for release demo
echo "# Installation" >> README.md
git add README.md
git commit -m "docs: add installation instructions"
echo ""

# Show release notes example
echo "======================================"
echo "Release Notes Example"
echo "======================================"
echo ""
echo "If we create a release now, it would generate:"
echo ""
echo "v1.0.0"
echo ""
echo "Thank you to all the contributors who made this release possible!"
echo ""
echo "Features"
echo "• initial project setup (abc1234)"
echo ""
echo "Documentation"
echo "• add installation instructions (def5678)"
echo ""

# Cleanup
echo "🧹 Cleaning up demo repository..."
cd /
rm -rf "$DEMO_DIR"
echo "✅ Demo complete!"
