import type { Meta, StoryObj } from "@storybook/react";
import { WizardContentView as Component, MOCK_WIZARD_CONTENT_VIEW_PROPS } from './wizard-content.view';

const meta: Meta<typeof Component> = {
  title: "Features/Onboarding/WizardContentView",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: MOCK_WIZARD_CONTENT_VIEW_PROPS,
};

export const LaterStep: Story = {
  args: {
    ...MOCK_WIZARD_CONTENT_VIEW_PROPS,
    title: "Configure your training",
    description: "Adjust the hyperparameters for your model.",
    currentStep: 3,
  },
};
