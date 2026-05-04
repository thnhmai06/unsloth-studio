import type { Meta, StoryObj } from "@storybook/react";
import { RecipeStudioHeaderView as Component, MOCK_RECIPE_STUDIO_HEADER_PROPS } from './recipe-studio-header.view';

const meta: Meta<typeof Component> = {
  title: "Features/RecipeStudio/RecipeStudioHeaderView",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: MOCK_RECIPE_STUDIO_HEADER_PROPS,
};

export const EditingName: Story = {
  args: {
    ...MOCK_RECIPE_STUDIO_HEADER_PROPS,
    editingWorkflowName: true,
  },
};

export const NeedsSaving: Story = {
  args: {
    ...MOCK_RECIPE_STUDIO_HEADER_PROPS,
    saveTone: "error",
    savedAtLabel: "Unsaved changes",
  },
};

export const WithWarnings: Story = {
  args: {
    ...MOCK_RECIPE_STUDIO_HEADER_PROPS,
    warnings: [
      {
        severity: "warning",
        message: "This node is not connected to any output.",
        nodeName: "Input Node",
      },
      {
        severity: "error",
        message: "Missing required parameter 'api_key'.",
        nodeName: "API Node",
      }
    ],
  },
};
