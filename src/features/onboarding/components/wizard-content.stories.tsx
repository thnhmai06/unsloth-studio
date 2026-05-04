import type { Meta, StoryObj } from "@storybook/react";
import { WizardContent as Component } from './wizard-content';

const meta: Meta = {
  title: "Features/Onboarding/WizardContent",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
