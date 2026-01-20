#!/usr/bin/env python3
"""
Git Helper - Automated Git operations with conventional commits and release notes
"""

import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple


class GitHelper:
    """Main Git automation helper"""
    
    def __init__(self, config_path: Optional[str] = None):
        self.config_path = Path(config_path) if config_path else Path(__file__).parent / "config.json"
        self.config = self._load_config()
        
    def _load_config(self) -> Dict:
        """Load configuration file"""
        if self.config_path.exists():
            with open(self.config_path) as f:
                return json.load(f)
        
        # Default configuration
        default_config = {
            "ignored_files": ["CLAUDE.md"],
            "commit_types": {
                "feat": "Features",
                "impr": "Improvements",
                "fix": "Fixes",
                "docs": "Documentation",
                "style": "Style",
                "refactor": "Refactoring",
                "perf": "Performance",
                "test": "Tests",
                "build": "Build",
                "ci": "CI",
                "revert": "Reverts",
                "chore": "Others"
            },
            "max_commit_length": 72,
            "require_scope": False,
            "auto_extract_contributors": True
        }
        
        # Save default config
        with open(self.config_path, 'w') as f:
            json.dump(default_config, f, indent=2)
        
        return default_config
    
    def _run_git_command(self, args: List[str], capture_output: bool = True) -> subprocess.CompletedProcess:
        """Run a git command"""
        cmd = ["git"] + args
        return subprocess.run(cmd, capture_output=capture_output, text=True)
    
    def get_staged_files(self) -> List[str]:
        """Get list of staged files"""
        result = self._run_git_command(["diff", "--cached", "--name-only"])
        if result.returncode != 0:
            return []
        return [f.strip() for f in result.stdout.split('\n') if f.strip()]
    
    def check_ignored_files(self, files: List[str]) -> List[str]:
        """Check if any ignored files are staged"""
        ignored = []
        for file in files:
            for pattern in self.config["ignored_files"]:
                # Simple pattern matching (can be enhanced with fnmatch)
                if pattern in file or file.endswith(pattern):
                    ignored.append(file)
                    break
        return ignored
    
    def unstage_files(self, files: List[str]) -> bool:
        """Unstage specified files"""
        if not files:
            return True
        
        result = self._run_git_command(["reset", "HEAD"] + files)
        return result.returncode == 0
    
    def validate_staged_files(self) -> Tuple[bool, List[str]]:
        """Validate staged files and return (is_valid, ignored_files)"""
        staged = self.get_staged_files()
        
        if not staged:
            print("❌ No files staged for commit")
            return False, []
        
        ignored = self.check_ignored_files(staged)
        
        if ignored:
            print(f"⚠️  Found ignored files in staging area:")
            for file in ignored:
                print(f"   - {file}")
            return False, ignored
        
        print(f"✅ Validated {len(staged)} staged files")
        return True, []
    
    def suggest_commit_type(self, files: List[str]) -> str:
        """Suggest commit type based on file changes"""
        # Simple heuristics
        if any('test' in f.lower() for f in files):
            return 'test'
        if any('doc' in f.lower() or f.endswith('.md') for f in files):
            return 'docs'
        if any('package.json' in f or 'requirements.txt' in f for f in files):
            return 'build'
        if any('.yml' in f or '.yaml' in f for f in files):
            return 'ci'
        
        # Check git diff for indicators
        result = self._run_git_command(["diff", "--cached"])
        diff = result.stdout.lower()
        
        if 'fix' in diff or 'bug' in diff:
            return 'fix'
        if 'new' in diff or 'add' in diff:
            return 'feat'
        
        return 'chore'
    
    def format_commit_message(self, commit_type: str, scope: str, description: str) -> str:
        """Format commit message according to conventions"""
        if scope:
            return f"{commit_type}({scope}): {description}"
        return f"{commit_type}: {description}"
    
    def validate_commit_message(self, message: str) -> Tuple[bool, str]:
        """Validate commit message format"""
        # Pattern: type(scope): description or type: description
        pattern = r'^(feat|impr|fix|docs|style|refactor|perf|test|build|ci|revert|chore)(\([a-z0-9\-]+\))?: .+'
        
        if not re.match(pattern, message):
            return False, "Message doesn't match conventional commit format"
        
        if len(message) > self.config["max_commit_length"]:
            return False, f"Message exceeds {self.config['max_commit_length']} characters"
        
        # Check for uppercase (should be lowercase)
        if message.split(':')[0].lower() != message.split(':')[0]:
            return False, "Commit type and scope should be lowercase"
        
        return True, "Valid"
    
    def interactive_commit(self) -> bool:
        """Interactive commit workflow"""
        print("\n" + "="*60)
        print("Git Commit Helper - Conventional Commits")
        print("="*60 + "\n")
        
        # Validate staged files
        is_valid, ignored = self.validate_staged_files()
        
        if not is_valid:
            if ignored:
                response = input("\n🔧 Automatically unstage ignored files? (y/n): ").lower()
                if response == 'y':
                    self.unstage_files(ignored)
                    print("✅ Unstaged ignored files")
                    
                    # Re-validate
                    is_valid, _ = self.validate_staged_files()
                    if not is_valid:
                        return False
                else:
                    return False
            else:
                return False
        
        staged = self.get_staged_files()
        suggested_type = self.suggest_commit_type(staged)
        
        # Display commit types
        print("\n📝 Commit Types:")
        types = list(self.config["commit_types"].keys())
        for i, ctype in enumerate(types, 1):
            marker = " (suggested)" if ctype == suggested_type else ""
            print(f"  {i}. {ctype}{marker}")
        
        # Select type
        while True:
            choice = input(f"\nSelect commit type [1-{len(types)}] or enter custom: ").strip()
            
            if choice.isdigit() and 1 <= int(choice) <= len(types):
                commit_type = types[int(choice) - 1]
                break
            elif choice in types:
                commit_type = choice
                break
            else:
                print(f"❌ Invalid choice. Please select 1-{len(types)} or valid type.")
        
        # Optional scope
        scope = input("\n🎯 Scope (optional, press Enter to skip): ").strip().lower()
        
        # Description
        while True:
            description = input("\n📄 Description (imperative, lowercase): ").strip()
            
            if not description:
                print("❌ Description cannot be empty")
                continue
            
            # Build message
            message = self.format_commit_message(commit_type, scope, description)
            
            # Validate
            is_valid, error = self.validate_commit_message(message)
            
            if is_valid:
                break
            else:
                print(f"❌ {error}")
                print(f"   Generated: {message}")
                retry = input("   Try again? (y/n): ").lower()
                if retry != 'y':
                    return False
        
        # Review
        print("\n" + "-"*60)
        print(f"Commit message: {message}")
        print(f"Files ({len(staged)}):")
        for file in staged[:10]:  # Show first 10
            print(f"  - {file}")
        if len(staged) > 10:
            print(f"  ... and {len(staged) - 10} more")
        print("-"*60)
        
        confirm = input("\n✅ Commit with this message? (y/n): ").lower()
        
        if confirm != 'y':
            print("❌ Commit cancelled")
            return False
        
        # Execute commit
        result = self._run_git_command(["commit", "-m", message], capture_output=False)
        
        if result.returncode == 0:
            print("\n✅ Commit successful!")
            return True
        else:
            print("\n❌ Commit failed")
            return False
    
    def parse_commit_message(self, commit_msg: str) -> Dict:
        """Parse conventional commit message"""
        # Pattern: type(scope): description
        pattern = r'^(feat|impr|fix|docs|style|refactor|perf|test|build|ci|revert|chore)(?:\(([^)]+)\))?: (.+)$'
        match = re.match(pattern, commit_msg.split('\n')[0])
        
        if not match:
            return {
                "type": "chore",
                "scope": None,
                "description": commit_msg.split('\n')[0],
                "raw": commit_msg
            }
        
        return {
            "type": match.group(1),
            "scope": match.group(2),
            "description": match.group(3),
            "raw": commit_msg
        }
    
    def extract_contributors(self, commit_msg: str) -> List[str]:
        """Extract contributor mentions from commit message"""
        # Pattern: @username
        contributors = re.findall(r'@([a-zA-Z0-9_-]+)', commit_msg)
        return contributors
    
    def extract_pr_numbers(self, commit_msg: str) -> List[str]:
        """Extract PR/issue numbers from commit message"""
        # Pattern: #123
        prs = re.findall(r'#(\d+)', commit_msg)
        return prs
    
    def get_commits_since_tag(self, tag: Optional[str] = None) -> List[Dict]:
        """Get commits since specified tag or last tag"""
        if tag:
            rev_range = f"{tag}..HEAD"
        else:
            # Get last tag
            result = self._run_git_command(["describe", "--tags", "--abbrev=0"])
            if result.returncode != 0:
                # No tags found, get all commits
                rev_range = "HEAD"
            else:
                last_tag = result.stdout.strip()
                rev_range = f"{last_tag}..HEAD"
        
        # Get commit log
        result = self._run_git_command([
            "log",
            rev_range,
            "--pretty=format:%H|%s|%b",
            "--no-merges"
        ])
        
        if result.returncode != 0:
            return []
        
        commits = []
        for line in result.stdout.split('\n'):
            if not line.strip():
                continue
            
            parts = line.split('|', 2)
            if len(parts) < 2:
                continue
            
            commit_hash = parts[0]
            subject = parts[1]
            body = parts[2] if len(parts) > 2 else ""
            
            parsed = self.parse_commit_message(subject)
            full_msg = subject + '\n' + body
            
            commits.append({
                "hash": commit_hash[:7],
                "type": parsed["type"],
                "scope": parsed["scope"],
                "description": parsed["description"],
                "contributors": self.extract_contributors(full_msg),
                "prs": self.extract_pr_numbers(full_msg)
            })
        
        return commits
    
    def categorize_commits(self, commits: List[Dict]) -> Dict[str, List[Dict]]:
        """Categorize commits by type"""
        categories = {}
        
        for commit in commits:
            commit_type = commit["type"]
            
            # Map to display category
            category = self.config["commit_types"].get(commit_type, "Others")
            
            if category not in categories:
                categories[category] = []
            
            categories[category].append(commit)
        
        return categories
    
    def format_release_notes(self, version: str, categories: Dict[str, List[Dict]]) -> str:
        """Format release notes"""
        notes = [f"{version}\n"]
        notes.append("Thank you to all the contributors who made this release possible!\n")
        
        # Define section order
        section_order = ["Features", "Improvements", "Fixes", "Others"]
        
        for section in section_order:
            if section not in categories or not categories[section]:
                continue
            
            notes.append(f"\n{section}")
            
            for commit in categories[section]:
                # Build bullet point
                scope_str = f"{commit['scope']}: " if commit['scope'] else ""
                
                # Add contributors
                contrib_str = ""
                if commit['contributors']:
                    contrib_str = " (" + ", ".join(f"@{c}" for c in commit['contributors']) + ")"
                
                # Add PR numbers
                pr_str = ""
                if commit['prs']:
                    pr_str = " " + " ".join(f"(#{pr})" for pr in commit['prs'])
                
                # Add commit hash
                hash_str = f" ({commit['hash']})"
                
                bullet = f"• {scope_str}{commit['description']}{contrib_str}{pr_str}{hash_str}"
                notes.append(bullet)
        
        return '\n'.join(notes)
    
    def create_release(self, version: str, push: bool = False) -> bool:
        """Create release with notes"""
        print(f"\n🏷️  Creating release: {version}")
        
        # Validate version format
        if not re.match(r'^v?\d+\.\d+\.\d+', version):
            print("❌ Invalid version format. Expected: v1.2.3 or 1.2.3")
            return False
        
        # Ensure version starts with 'v'
        if not version.startswith('v'):
            version = f"v{version}"
        
        # Get commits
        commits = self.get_commits_since_tag()
        
        if not commits:
            print("⚠️  No new commits since last release")
            create_anyway = input("Create release anyway? (y/n): ").lower()
            if create_anyway != 'y':
                return False
        
        # Categorize
        categories = self.categorize_commits(commits)
        
        # Format notes
        notes = self.format_release_notes(version, categories)
        
        # Display preview
        print("\n" + "="*60)
        print("Release Notes Preview:")
        print("="*60)
        print(notes)
        print("="*60)
        
        # Confirm
        confirm = input("\n✅ Create release with these notes? (y/n): ").lower()
        
        if confirm != 'y':
            # Offer to edit
            edit = input("📝 Save notes to file for editing? (y/n): ").lower()
            if edit == 'y':
                notes_file = f"release-notes-{version}.md"
                with open(notes_file, 'w') as f:
                    f.write(notes)
                print(f"✅ Notes saved to {notes_file}")
                print(f"   Edit the file and run: git tag -a {version} -F {notes_file}")
            return False
        
        # Create annotated tag
        # Write notes to temp file
        import tempfile
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.md') as f:
            f.write(notes)
            notes_file = f.name
        
        result = self._run_git_command(["tag", "-a", version, "-F", notes_file])
        
        # Clean up temp file
        Path(notes_file).unlink()
        
        if result.returncode != 0:
            print(f"❌ Failed to create tag: {result.stderr}")
            return False
        
        print(f"✅ Created release tag: {version}")
        
        if push:
            print(f"📤 Pushing tag to remote...")
            push_result = self._run_git_command(["push", "origin", version])
            if push_result.returncode == 0:
                print("✅ Tag pushed successfully")
            else:
                print("⚠️  Failed to push tag. Run manually: git push --tags")
        else:
            print(f"💡 To push tag, run: git push origin {version}")
        
        return True


def main():
    """Main CLI entry point"""
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python git_helper.py commit           - Interactive commit")
        print("  python git_helper.py validate         - Validate staged files")
        print("  python git_helper.py release v1.2.3   - Create release")
        sys.exit(1)
    
    helper = GitHelper()
    command = sys.argv[1]
    
    if command == "commit":
        success = helper.interactive_commit()
        sys.exit(0 if success else 1)
    
    elif command == "validate":
        is_valid, ignored = helper.validate_staged_files()
        if not is_valid and ignored:
            print("\n🔧 To unstage: git reset HEAD " + " ".join(ignored))
        sys.exit(0 if is_valid else 1)
    
    elif command == "release":
        if len(sys.argv) < 3:
            print("❌ Version required. Usage: python git_helper.py release v1.2.3")
            sys.exit(1)
        
        version = sys.argv[2]
        push = "--push" in sys.argv
        success = helper.create_release(version, push)
        sys.exit(0 if success else 1)
    
    else:
        print(f"❌ Unknown command: {command}")
        sys.exit(1)


if __name__ == "__main__":
    main()
