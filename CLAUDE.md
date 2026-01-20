# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Raycast extension called "Random Decision Maker" that provides two decision-making tools:
- **Decide Yes/No**: Ask a yes/no question and receive a randomized dramatic answer
- **Spin the Wheel**: Enter multiple options and randomly select one

## Commands

```bash
# Development
npm run dev          # Start development mode (ray develop)
npm run build        # Build the extension (ray build)

# Code Quality
npm run lint         # Run linting (ray lint)
npm run fix-lint     # Auto-fix lint issues (ray lint --fix)

# Publishing
npm run publish      # Publish to Raycast store
```

## Architecture

### Command Structure
Each Raycast command is a React component in `src/`:
- `decide-yes-no.tsx` - Yes/No decision flow with three phases: input → thinking → result
- `spin-wheel.tsx` - Multi-option wheel with setup → spinning → result phases
- `view-history.tsx` - List view of past decisions

### Shared Utilities (`src/utils/`)
- `storage.ts` - LocalStorage wrapper for persisting decisions and wheel presets. Key types: `Decision`, `WheelPreset`
- `messages.ts` - Response text arrays (YES_RESPONSES, NO_RESPONSES, THINKING_MESSAGES, etc.) and `getRandomItem()` helper

### Data Flow
- All decisions are saved via `addToHistory()` which stores up to 100 entries in Raycast's LocalStorage
- Wheel presets can be saved/loaded for reusable option sets
- State machine pattern: each command uses a `phase` state to control UI transitions

### Raycast API Usage
- Uses `@raycast/api` components: Form, Detail, List, ActionPanel, Action
- LocalStorage for persistence (no external database)
- Commands defined in `package.json` under `"commands"` array
