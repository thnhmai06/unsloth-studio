import type { Meta, StoryObj } from "@storybook/react";
import { BaseHandle } from './base-handle';
import { ReactFlow, Position } from "@xyflow/react";

const meta: Meta<typeof BaseHandle> = {
  title: "Features/RecipeStudio/Graph/BaseHandle",
  component: BaseHandle,
  decorators: [
    (Story) => (
      <div style={{ width: '100px', height: '100px' }}>
        <ReactFlow nodes={[{ id: '1', position: { x: 0, y: 0 }, data: { label: 'Node' }, type: 'base' }]} nodeTypes={{ base: () => <div className="p-4 border rounded bg-card"><Story /></div> }}>
        </ReactFlow>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "source",
    position: Position.Right,
  },
};
