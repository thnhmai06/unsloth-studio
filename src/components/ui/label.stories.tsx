import type { Meta, StoryObj } from "@storybook/react";
import { Label as Component } from './label';

const meta: Meta = {
  title: "UI/Label",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label Text",
  },
};
