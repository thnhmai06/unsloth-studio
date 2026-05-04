import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionRawTab as Component } from './execution-raw-tab';

const meta: Meta = {
  title: "Features/RecipeStudio/Executions/ExecutionRawTab",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rawExecution: JSON.stringify({
      id: "exec_1",
      status: "completed",
      recipeId: "recipe_abc",
      rows: 1000,
      createdAt: 1715000000000,
      finishedAt: 1715000100000,
      analysis: {
        num_records: 1000,
        column_statistics: []
      }
    }, null, 2)
  },
};
