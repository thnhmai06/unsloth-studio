import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionSidebar as Component } from './execution-sidebar';

const meta: Meta = {
  title: "Features/RecipeStudio/Executions/ExecutionSidebar",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    executions: [
      { id: "exec_1", status: "completed", createdAt: Date.now() - 3600000, rows: 1000, kind: "full", run_name: "Main Run" },
      { id: "exec_2", status: "running", createdAt: Date.now() - 600000, rows: 500, kind: "preview", run_name: "Quick Test" },
      { id: "exec_3", status: "error", createdAt: Date.now() - 86400000, rows: 0, kind: "full", run_name: "Failed Attempt" },
    ] as any[],
    selectedExecutionId: "exec_2",
    onSelectExecution: (id: string) => console.log("Selected", id),
  },
};
