import type { Meta, StoryObj } from "@storybook/react";
import { ExampleWrapper as Component } from './example';

const meta: Meta = {
  title: "Auto/components/example",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    
  },
};
