import type { Meta, StoryObj } from "@storybook/react";
import { Progress as Component } from './progress';

const meta: Meta = {
  title: "UI/Progress",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 33,
    className: "w-[60%]",
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    className: "w-[60%]",
  },
};

export const Indeterminate: Story = {
  args: {
    value: undefined,
    className: "w-[60%]",
  },
};
