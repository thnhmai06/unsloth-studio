import type { Meta, StoryObj } from "@storybook/react";
import { BlockSheet as Component } from './block-sheet';

const meta: Meta = {
  title: "Features/RecipeStudio/BlockSheet",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative h-[600px] w-full overflow-hidden border bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    container: null,
    sheetView: "root",
    open: true,
    onViewChange: () => {},
    onAddSampler: () => {},
    onAddSeed: () => {},
    onAddLlm: () => {},
    onAddModelProvider: () => {},
    onAddModelConfig: () => {},
    onAddToolProfile: () => {},
    onAddExpression: () => {},
    onAddValidator: () => {},
    onAddMarkdownNote: () => {},
    onOpenProcessors: () => {},
    copied: false,
    onCopy: () => {},
    onImport: () => {},
  },
};
