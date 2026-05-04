import type { Meta, StoryObj } from "@storybook/react";
import { LabeledHandle } from './labeled-handle';
import { ReactFlow, Position } from "@xyflow/react";

const meta: Meta<typeof LabeledHandle> = {
  title: "Features/RecipeStudio/Graph/LabeledHandle",
  component: LabeledHandle,
  decorators: [
    (Story) => (
      <div style={{ width: '200px', height: '100px' }}>
        <ReactFlow 
          nodes={[
            { 
              id: '1', 
              position: { x: 50, y: 20 }, 
              data: {}, 
              type: 'base' 
            }
          ]} 
          nodeTypes={{ 
            base: () => (
              <div className="p-4 border rounded bg-card min-w-[100px] min-h-[40px] relative">
                <Story />
              </div>
            ) 
          }}
        />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Handle Label",
    type: "source",
    position: Position.Right,
    title: "Handle Title",
  },
};
