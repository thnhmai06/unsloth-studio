import type { Meta, StoryObj } from "@storybook/react";
import { Spinner as Component } from './spinner';

const meta: Meta = {
  title: "UI/Spinner",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "size-4",
  },
};

export const Large: Story = {
  args: {
    className: "size-8",
  },
};

export const CustomColor: Story = {
  args: {
    className: "size-6 text-primary",
  },
};
