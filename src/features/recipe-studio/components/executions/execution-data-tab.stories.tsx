import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionDataTab as Component } from './execution-data-tab';

const meta: Meta = {
  title: "Features/RecipeStudio/Executions/ExecutionDataTab",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_EXECUTION = {
  id: "exec_1",
  status: "completed",
  dataset: [{}, {}, {}],
} as any;

export const Default: Story = {
  args: {
    execution: MOCK_EXECUTION,
    datasetColumnNames: ["instruction", "input", "output", "category"],
    hiddenDatasetColumns: [],
    canPageDataset: true,
    currentDatasetPage: 1,
    totalPages: 5,
    tableColumns: [
      { accessorKey: "instruction", header: "Instruction" },
      { accessorKey: "input", header: "Input" },
      { accessorKey: "output", header: "Output" },
      { accessorKey: "category", header: "Category" },
    ],
    datasetRowsForTable: [
      { instruction: "Summarize this text", input: "Long text here...", output: "Summary here", category: "summarization" },
      { instruction: "Translate to French", input: "Hello", output: "Bonjour", category: "translation" },
      { instruction: "Write a poem", input: "", output: "Roses are red...", category: "generation" },
    ],
    onOpenOverview: () => {},
    onSetHiddenColumns: () => {},
    onPrevPage: () => {},
    onNextPage: () => {}
  },
};
