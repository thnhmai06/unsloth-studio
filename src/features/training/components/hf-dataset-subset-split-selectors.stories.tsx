import type { Meta, StoryObj } from "@storybook/react";
import { HfDatasetSubsetSplitSelectors as Component } from './hf-dataset-subset-split-selectors';

const meta: Meta = {
  title: "Features/Training/HFDatasetSubsetSplitSelectors",
  component: Component,
  decorators: [
    (Story) => (
      <div className="w-[400px] p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Wizard: Story = {
  args: {
    variant: "wizard",
    enabled: true,
    datasetName: "unsloth/tiny-llama-dataset",
    datasetSubset: "default",
    datasetSplit: "train",
    datasetEvalSplit: null,
    setDatasetSubset: () => {},
    setDatasetSplit: () => {},
    setDatasetEvalSplit: () => {},
  },
};

export const Studio: Story = {
  args: {
    variant: "studio",
    enabled: true,
    datasetName: "unsloth/tiny-llama-dataset",
    datasetSubset: "default",
    datasetSplit: "train",
    datasetEvalSplit: "test",
    setDatasetSubset: () => {},
    setDatasetSplit: () => {},
    setDatasetEvalSplit: () => {},
  },
};
