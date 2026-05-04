import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionOverviewTab as Component } from './execution-overview-tab';

const meta: Meta = {
  title: "Features/RecipeStudio/Executions/ExecutionOverviewTab",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_EXECUTION = {
  id: "exec_1",
  status: "completed",
  createdAt: Date.now() - 100000,
  finishedAt: Date.now(),
} as any;

export const Default: Story = {
  args: {
    execution: MOCK_EXECUTION,
    showSummaryCards: true,
    recordsMetric: 1000,
    totalMetric: 1000,
    runDuration: "1m 40s",
    columnCount: 4,
    llmColumnCount: 1,
    nullRate: 0.02,
    sideEffects: "None",
    lowUniquenessColumns: "category",
    modelUsageRows: [
      { model: "gpt-4o", input: 45000, output: 120000 },
      { model: "gpt-3.5-turbo", input: 10000, output: 5000 },
    ],
    terminalLines: "Run started...\nProcessing batch 1...\nProcessing batch 2...\nRun completed successfully.",
    terminalRef: { current: null },
    onTerminalScroll: () => {},
    canPublish: true,
    onOpenPublish: () => {}
  },
};
