import type { Meta, StoryObj } from "@storybook/react";
import { RecipeGraphAuxNode } from './recipe-graph-aux-node';
import { ReactFlow } from "@xyflow/react";
import { useRecipeStudioStore } from "../stores/recipe-studio";
import { useEffect } from "react";

const meta: Meta<typeof RecipeGraphAuxNode> = {
  title: "Features/RecipeStudio/Graph/RecipeGraphAuxNode",
  component: RecipeGraphAuxNode,
  decorators: [
    (Story, context) => {
      useEffect(() => {
        useRecipeStudioStore.setState({
          configs: {
            'llm-1': {
              id: 'llm-1',
              kind: 'llm',
              name: 'Mock LLM',
              llm_type: 'text',
              model_alias: 'llama3',
              prompt: 'Default Prompt',
              system_prompt: 'Default System Prompt',
              scores: [
                {
                  name: 'Helpfulness',
                  description: 'How helpful is the response?',
                  options: [
                    { value: '1', description: 'Not helpful' },
                    { value: '5', description: 'Very helpful' },
                  ]
                }
              ]
            }
          }
        });
      }, []);

      return (
        <div style={{ width: '400px', height: '400px' }}>
          <ReactFlow
            nodes={[
              {
                id: 'aux-1',
                type: 'aux',
                position: { x: 50, y: 50 },
                data: context.args.data,
              }
            ]}
            nodeTypes={{
              aux: RecipeGraphAuxNode,
            }}
          />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PromptInput: Story = {
  args: {
    id: 'aux-1',
    data: {
      kind: 'llm-prompt-input',
      llmId: 'llm-1',
      field: 'prompt',
      title: 'Prompt Input',
    },
  },
};

export const SystemPromptInput: Story = {
  args: {
    id: 'aux-1',
    data: {
      kind: 'llm-prompt-input',
      llmId: 'llm-1',
      field: 'system_prompt',
      title: 'System Prompt Input',
    },
  },
};

export const JudgeScore: Story = {
  args: {
    id: 'aux-1',
    data: {
      kind: 'llm-judge-score',
      llmId: 'llm-1',
      scoreIndex: 0,
    },
  },
};
