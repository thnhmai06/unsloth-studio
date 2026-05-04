import type { Meta, StoryObj } from "@storybook/react";
import { ModelSelector as Component } from './model-selector';
import type { ModelOption, LoraModelOption } from './model-selector/types';

const meta: Meta = {
  title: "Assistant UI/Model Selector",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockModels: ModelOption[] = [
  { id: "llama-3-8b", name: "Llama 3 8B", description: "Meta's efficient 8B model", isGguf: false },
  { id: "gpt-4o", name: "GPT-4o", description: "OpenAI's latest flagship", isGguf: false },
  { id: "mistral-7b-v0.3-gguf", name: "Mistral 7B v0.3", description: "GGUF", isGguf: true },
];

const mockLoraModels: LoraModelOption[] = [
  { 
    id: "lora-1", 
    name: "Customer Support Finetune", 
    source: "training", 
    exportType: "lora",
    updatedAt: Date.now(),
    baseModel: "Llama 3 8B"
  },
  { 
    id: "lora-2", 
    name: "Medical Assistant", 
    source: "exported", 
    exportType: "merged",
    updatedAt: Date.now() - 100000,
    baseModel: "Mistral 7B"
  },
];

export const Default: Story = {
  args: {
    models: mockModels,
    loraModels: mockLoraModels,
    value: "llama-3-8b",
  },
};

export const GgufActive: Story = {
  args: {
    models: mockModels,
    loraModels: mockLoraModels,
    value: "mistral-7b-v0.3-gguf",
    activeGgufVariant: "Q4_K_M"
  },
};

export const Ghost: Story = {
  args: {
    models: mockModels,
    variant: "ghost",
    value: "gpt-4o"
  },
};
