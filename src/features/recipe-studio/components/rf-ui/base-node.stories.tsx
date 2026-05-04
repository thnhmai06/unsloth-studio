import type { Meta, StoryObj } from "@storybook/react";
import { BaseNode, BaseNodeContent, BaseNodeHeader, BaseNodeHeaderTitle } from './base-node';

const meta: Meta<typeof BaseNode> = {
  title: "Features/RecipeStudio/Graph/BaseNode",
  component: BaseNode,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <BaseNode {...args} className="w-64">
      <BaseNodeHeader>
        <BaseNodeHeaderTitle>Node Title</BaseNodeHeaderTitle>
      </BaseNodeHeader>
      <BaseNodeContent>
        <p className="text-sm">This is the node content.</p>
      </BaseNodeContent>
    </BaseNode>
  ),
};
