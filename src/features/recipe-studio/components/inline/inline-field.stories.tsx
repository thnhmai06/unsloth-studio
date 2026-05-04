import type { Meta, StoryObj } from "@storybook/react";
import { InlineField as Component } from './inline-field';

const meta: Meta = {
  title: "Features/RecipeStudio/Inlines/Field",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Model Name",
    children: (
      <div className="h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs">
        Llama 3
      </div>
    ),
  },
};
