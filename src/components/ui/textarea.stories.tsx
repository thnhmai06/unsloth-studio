import type { Meta, StoryObj } from "@storybook/react";
import { Textarea as Component } from './textarea';

const meta: Meta = {
  title: "UI/Textarea",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
    className: "w-[400px]",
  },
};

export const Fixed: Story = {
  args: {
    placeholder: "Fixed sizing textarea.",
    fieldSizing: "fixed",
    className: "w-[400px] h-[100px]",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea.",
    disabled: true,
    className: "w-[400px]",
  },
};
