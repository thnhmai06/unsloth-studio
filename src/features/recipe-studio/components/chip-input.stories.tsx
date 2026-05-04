import type { Meta, StoryObj } from "@storybook/react";
import { ChipInput as Component } from './chip-input';

const meta: Meta = {
  title: "Features/RecipeStudio/ChipInput",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    values: ["text", "json", "streaming"],
    onAdd: () => {},
    onRemove: () => {},
  },
};
