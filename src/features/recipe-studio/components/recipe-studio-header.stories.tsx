import type { Meta, StoryObj } from "@storybook/react";
import { RecipeStudioHeader as Component } from './recipe-studio-header';

const meta: Meta = {
  title: "Features/RecipeStudio/RecipeStudioHeader",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeView: "editor",
    saveLoading: false,
    saveTone: "success",
    savedAtLabel: "Saved 2 minutes ago",
    workflowName: "Summarization Pipeline",
    onWorkflowNameChange: () => {},
    onViewChange: () => {},
    onSaveRecipe: () => {},
  },
};
