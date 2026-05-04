import type { Meta, StoryObj } from "@storybook/react";
import { Calendar as Component } from './calendar';

const meta: Meta = {
  title: "UI/Calendar",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: "single",
    selected: new Date(),
    className: "rounded-md border",
  },
};
