import type { Meta, StoryObj } from "@storybook/react";
import { WizardSidebarView as Component, MOCK_WIZARD_SIDEBAR_VIEW_PROPS } from './wizard-sidebar.view';

const meta: Meta<typeof Component> = {
  title: "Features/Onboarding/WizardSidebarView",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: MOCK_WIZARD_SIDEBAR_VIEW_PROPS,
};

export const Completed: Story = {
  args: {
    ...MOCK_WIZARD_SIDEBAR_VIEW_PROPS,
    progress: 100,
    currentStep: 4,
  },
};
