# Fix Auto Stories in Storybook

## Objective
Ensure all more than 100 auto-generated Storybook stories in the `Auto` category display correctly without showing a blank screen or rendering errors.

## Key Files & Context
- `src/**/*.stories.tsx` (specifically the ~100 stories generated with `title: "Auto/..."`)
- `src/storybook/safe-story.tsx` (the wrapper component that currently hides failing components)
- The React component source files corresponding to each story.

## Motivation & Scope
Currently, many components in the `Auto` category throw errors or render blank because they are rendered without required props (such as complex object props, required children, or state toggles like `open=true` for modals). The `SafeStory` component catches these and displays a fallback preview. The user wants to see the actual components rendering properly.
Since there are 100 files, doing this manually is highly inefficient. We will use a script to automatically patch the story files with sensible default arguments.

## Implementation Steps
1.  **Analyze Dependencies:** Ensure necessary AST tools like `ts-morph` or `typescript` are available in the repository to parse the components. If not, use them via `npx` or temporary installation.
2.  **Develop the Fix Script:** Write a Node.js script (`scripts/fix-stories.ts` or similar) that:
    - Finds all `*.stories.tsx` files that contain `title: "Auto/..."`.
    - Identifies the imported component file.
    - Parses the component file using `ts-morph` to extract its required props and their types.
    - Generates sensible mock data for these required props (e.g., `children: "Preview"`, boolean flags set to `true` to ensure visibility like `open: true`, dummy strings for text, mock functions for callbacks).
    - Rewrites the `*.stories.tsx` file to pass these props via the `args` object and removes the `SafeStory` wrapper, reverting to a standard Storybook `StoryObj` format.
3.  **Execute the Script:** Run the script across the codebase.
4.  **Manual Cleanup:** Run Storybook and quickly review the UI. If a few complex components (like those needing complex context or specific data arrays) still fail, fix those specific files manually or with AI subagents.

## Verification & Testing
- Run `npm run storybook` (or the equivalent command).
- Verify that the terminal shows a successful build without compilation errors.
- Browse through the "Auto" category in the Storybook UI to confirm the components are rendering visually rather than showing a fallback or blank screen.
