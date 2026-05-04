import type { Meta, StoryObj } from "@storybook/react";
import { Thread as Component } from './thread';

const meta: Meta = {
  title: "Auto/components/assistant-ui/thread",
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hideComposer: false,
    hideWelcome: false,
  },
};

export const HideWelcome: Story = {
  args: {
    hideWelcome: true,
  },
};

export const HideComposer: Story = {
  args: {
    hideComposer: true,
  },
};
