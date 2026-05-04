import type { Meta, StoryObj } from "@storybook/react";
import { ReadMore as Component } from './read-more';

const meta: Meta = {
  title: "Features/Tour/ReadMore",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "https://docs.unsloth.ai",
  },
};
