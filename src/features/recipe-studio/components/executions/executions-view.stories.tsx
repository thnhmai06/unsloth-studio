import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionsView as Component } from './executions-view';

const meta: Meta = {
  title: "Features/RecipeStudio/Executions/ExecutionsView",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    executions: [
      { id: "exec_1", status: "completed", createdAt: Date.now() - 3600000, rows: 1000, kind: "full", run_name: "Main Run", dataset: [], completed_columns: ["instruction", "output"], recipeSignature: "sig_123" },
    ] as any[],
    selectedExecutionId: "exec_1",
    currentSignature: "sig_123",
    onSelectExecution: () => {},
    onCancelExecution: () => {},
    onLoadDatasetPage: () => {}
  },
};
