import type { Meta, StoryObj } from "@storybook/react";
import { PublishExecutionDialog as Component } from './publish-execution-dialog';

const meta: Meta = {
  title: "Features/RecipeStudio/Executions/PublishExecutionDialog",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    execution: {
      id: "exec_1",
      rows: 5000,
      recipeId: "recipe_123",
    } as any,
    repo_id: "my-awesome-dataset",
    description: "A high-quality dataset generated via Unsloth Studio.",
    private: true,
  },
};
