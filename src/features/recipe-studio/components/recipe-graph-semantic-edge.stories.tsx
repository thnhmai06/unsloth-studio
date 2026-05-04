import type { Meta, StoryObj } from "@storybook/react";
import { RecipeGraphSemanticEdge } from './recipe-graph-semantic-edge';
import { ReactFlow, Position } from "@xyflow/react";

const meta: Meta<typeof RecipeGraphSemanticEdge> = {
  title: "Features/RecipeStudio/Graph/RecipeGraphSemanticEdge",
  component: RecipeGraphSemanticEdge,
  decorators: [
    (Story, context) => (
      <div style={{ width: '100%', height: '300px' }}>
        <ReactFlow
          nodes={[
            { id: 'a', position: { x: 0, y: 100 }, data: { label: 'Node A' }, type: 'input' },
            { id: 'b', position: { x: 300, y: 100 }, data: { label: 'Node B' }, type: 'output' },
          ]}
          edges={[
            {
              id: 'edge-1',
              source: 'a',
              target: 'b',
              sourceHandle: context.args.sourceHandleId,
              targetHandle: context.args.targetHandleId,
              type: 'semantic',
              data: context.args.data,
            },
          ]}
          edgeTypes={{
            semantic: RecipeGraphSemanticEdge,
          }}
          fitView
        />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'edge-1',
    source: 'a',
    target: 'b',
    sourceX: 100,
    sourceY: 100,
    targetX: 300,
    targetY: 100,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: {
      type: 'semantic',
    },
  },
};
