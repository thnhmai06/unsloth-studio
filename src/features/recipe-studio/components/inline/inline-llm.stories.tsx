import type { Meta, StoryObj } from "@storybook/react";
import { InlineLlm as Component } from './inline-llm';

const meta: Meta = {
  title: "Features/RecipeStudio/Inlines/LLM",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Completion: Story = {
  args: {
    config: {
      id: "node-2",
      kind: "llm",
      // biome-ignore lint/style/useNamingConvention: api schema
      llm_type: "completion",
      // biome-ignore lint/style/useNamingConvention: api schema
      model_alias: "primary-model",
    },
    onUpdate: () => {},
  },
};

export const Code: Story = {
  args: {
    config: {
      id: "node-2",
      kind: "llm",
      // biome-ignore lint/style/useNamingConvention: api schema
      llm_type: "code",
      // biome-ignore lint/style/useNamingConvention: api schema
      model_alias: "code-model",
      // biome-ignore lint/style/useNamingConvention: api schema
      code_lang: "python",
    },
    onUpdate: () => {},
  },
};
