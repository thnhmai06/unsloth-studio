import type { Meta, StoryObj } from "@storybook/react";
import { WizardFooterView as Component, MOCK_WIZARD_FOOTER_VIEW_PROPS } from './wizard-footer.view';

const meta: Meta<typeof Component> = {
  title: "Features/Onboarding/WizardFooterView",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {
  args: {
    ...MOCK_WIZARD_FOOTER_VIEW_PROPS,
    isFirst: true,
    isLast: false,
  },
};

export const MiddleStep: Story = {
  args: {
    ...MOCK_WIZARD_FOOTER_VIEW_PROPS,
    isFirst: false,
    isLast: false,
  },
};

export const LastStep: Story = {
  args: {
    ...MOCK_WIZARD_FOOTER_VIEW_PROPS,
    isFirst: false,
    isLast: true,
  },
};

export const CannotProceed: Story = {
  args: {
    ...MOCK_WIZARD_FOOTER_VIEW_PROPS,
    isFirst: false,
    isLast: false,
    canProceed: false,
  },
};
