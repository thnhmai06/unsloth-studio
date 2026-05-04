import type { Meta, StoryObj } from "@storybook/react";
import { RunValidateFloatingControls as Component } from './run-validate-floating-controls';

const meta: Meta = {
  title: "Features/RecipeStudio/Controls/RunValidate",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    runBusy: false,
    // biome-ignore lint/style/useNamingConvention: api schema
    runDialogKind: "full",
    validateLoading: false,
    executionLocked: false,
    onOpenRunDialog: () => {},
    onValidate: () => {},
  },
};

export const Running: Story = {
  args: {
    runBusy: true,
    // biome-ignore lint/style/useNamingConvention: api schema
    runDialogKind: "full",
    validateLoading: false,
    executionLocked: true,
    onOpenRunDialog: () => {},
    onValidate: () => {},
  },
};

export const Checking: Story = {
  args: {
    runBusy: false,
    // biome-ignore lint/style/useNamingConvention: api schema
    runDialogKind: "full",
    validateLoading: true,
    executionLocked: false,
    onOpenRunDialog: () => {},
    onValidate: () => {},
  },
};
