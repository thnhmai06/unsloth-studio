import type { Meta, StoryObj } from "@storybook/react";
import { Confetti as Component, ConfettiButton } from "./confetti";

const meta: Meta = {
  title: "UI/Confetti",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-[200px] items-center justify-center">
      <ConfettiButton>Fire Confetti!</ConfettiButton>
    </div>
  ),
};

export const AutoStart: Story = {
  args: {
    manualstart: false,
  },
  render: (args) => (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
      <Component {...args}>
        <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Confetti
        </span>
      </Component>
    </div>
  ),
};
