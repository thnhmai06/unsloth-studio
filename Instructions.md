# Project Instructions: Unsloth UI Component Library

This project has been transformed from a Tauri-based desktop application into a standalone React UI component library. All backend and desktop-specific layers (Tauri, Python, Rust) have been removed.

## Core Philosophy
- **Pure UI**: Components are decoupled from business logic and desktop APIs.
- **Container/Presentational Pattern**: Logic resides in `.tsx` files (Containers), while UI resides in `.view.tsx` files (Presentational).
- **Visual Documentation**: Every major component must have a corresponding Storybook story.
- **Zero Side Effects**: Components should rely on props for data and callbacks, avoiding direct API calls or window manipulation.

## Technical Stack
- **Framework**: React 19 (TypeScript)
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite`)
- **Icons**: Hugeicons React
- **Animations**: Framer Motion
- **Tooling**: Vite 8, Storybook, Biome (Linting/Formatting)

## File Conventions
- `[name].tsx`: Container component (handles state, hooks, context).
- `[name].view.tsx`: Presentational component (pure UI, no logic, no API calls).
- `[name].stories.tsx`: Storybook stories for the component.
- `[name].test.tsx`: Unit tests (optional but recommended).

## Development Workflow
1. **Run Storybook**: Use `npm run storybook` to develop components in isolation.
2. **Type Checking**: Run `npm run typecheck` to ensure type safety.
3. **Linting**: Run `npm run biome:check` for code quality checks.

## Component Organization
- **Atoms**: Smallest UI units (Buttons, Inputs, Badges).
- **Molecules**: Combinations of atoms (Auth fields, Section cards).
- **Organisms**: Complex features (Auth forms, Sidebar, Graph nodes).
- **Templates/Pages**: Full layout views.

## Clean Code Mandates
- **No Hardcoded Data**: Use `MOCK_DATA` only within Storybook files.
- **Pure Views**: `.view.tsx` files should not import any state management libraries (Zustand) or API utilities.
- **Tailwind Only**: Prefer utility classes over custom CSS files.
