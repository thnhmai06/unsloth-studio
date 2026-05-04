import type { Meta, StoryObj } from "@storybook/react";
import { InlineModel as Component } from './inline-model';

const meta: Meta = {
  title: "Features/RecipeStudio/Inlines/Model",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Config: Story = {
  args: {
    config: {
      id: "node-3",
      kind: "model_config",
      name: "Llama 3",
      provider: "ollama",
      model: "llama3",
      // biome-ignore lint/style/useNamingConvention: api schema
      inference_temperature: "0.7",
    },
    onUpdate: () => {},
  },
};

export const Provider: Story = {
  args: {
    config: {
      id: "node-provider",
      kind: "model_provider",
      name: "OpenAI",
      endpoint: "https://api.openai.com/v1",
      // biome-ignore lint/style/useNamingConvention: api schema
      api_key: "sk-...",
    },
    onUpdate: () => {},
  },
};

export const LocalProvider: Story = {
  args: {
    config: {
      id: "node-local",
      kind: "model_provider",
      name: "Local",
      // biome-ignore lint/style/useNamingConvention: api schema
      is_local: true,
    },
    onUpdate: () => {},
  },
};
