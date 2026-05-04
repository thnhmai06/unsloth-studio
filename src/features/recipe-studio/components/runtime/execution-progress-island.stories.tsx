import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionProgressIsland as Component } from './execution-progress-island';

const meta: Meta = {
  title: "Features/RecipeStudio/Executions/ExecutionProgressIsland",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Running: Story = {
  args: {
    execution: {
      id: "exec_1",
      status: "running",
      progress: { percent: 45, done: 450, total: 1000 },
      current_column: "thought",
    } as any,
    currentColumnIcon: null,
    minimized: false,
    onMinimizedChange: () => {},
    onViewExecutions: () => {}
  },
};
