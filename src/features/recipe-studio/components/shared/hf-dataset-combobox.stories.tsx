import type { Meta, StoryObj } from "@storybook/react";
import { HfDatasetCombobox as Component } from './hf-dataset-combobox';

const meta: Meta = {
  title: "Features/RecipeStudio/Shared/HFDatasetCombobox",
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

export const Default: Story = {
  args: {
    value: "unsloth/tiny-llama-dataset",
    onValueChange: (val: string) => console.log("Selected dataset:", val),
    placeholder: "Search datasets...",
  },
};
