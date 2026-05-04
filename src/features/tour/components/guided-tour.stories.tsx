import type { Meta, StoryObj } from "@storybook/react";
import { GuidedTour as Component } from './guided-tour';

const meta: Meta = {
  title: "Features/Tour/GuidedTour",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    onSkip: () => {},
    onComplete: () => {},
    steps: [
      {
        id: "welcome",
        target: "welcome-target",
        title: "Welcome to Unsloth Studio",
        body: "Let's walk you through the main features of our platform.",
      },
      {
        id: "chat",
        target: "chat-target",
        title: "Interactive Chat",
        body: "This is where you can interact with your models and see real-time responses.",
      },
      {
        id: "training",
        target: "training-target",
        title: "Model Training",
        body: "Configure and start your model training sessions right from this panel.",
      },
    ],
  },
};
