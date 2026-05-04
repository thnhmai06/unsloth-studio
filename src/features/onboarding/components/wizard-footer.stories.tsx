import type { Meta, StoryObj } from "@storybook/react";
import { WizardFooter as Component } from './wizard-footer';

const meta: Meta = {
  title: "Features/Onboarding/WizardFooter",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    returnTo: "/",
    onBackToSplash: () => console.log("Back to splash"),
  },
};
