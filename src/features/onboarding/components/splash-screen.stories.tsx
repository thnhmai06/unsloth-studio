import type { Meta, StoryObj } from "@storybook/react";
import { SplashScreen as Component } from './splash-screen';

const meta: Meta = {
  title: "Features/Onboarding/SplashScreen",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onStartOnboarding: () => console.log("Start Onboarding"),
    onSkipOnboarding: () => console.log("Skip Onboarding"),
  },
};
