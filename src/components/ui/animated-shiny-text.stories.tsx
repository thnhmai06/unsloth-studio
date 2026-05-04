import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedShinyText as Component } from './animated-shiny-text';

const meta: Meta = {
  title: "Auto/components/ui/animated-shiny-text",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Auto: Story = {
  args: {
    children: "Preview"
  },
};
