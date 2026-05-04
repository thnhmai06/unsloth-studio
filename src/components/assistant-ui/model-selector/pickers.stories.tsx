import type { Meta, StoryObj } from "@storybook/react";
import { HubModelPicker, LoraModelPicker } from './pickers';
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatRuntimeProvider } from "@/features/chat/runtime-provider";

const meta: Meta = {
  title: "Assistant UI/Model Selector/Pickers",
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px] border p-4 rounded-xl shadow-lg bg-popover">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Hub: StoryObj<typeof HubModelPicker> = {
  render: (args) => <HubModelPicker {...args} />,
  args: {
    models: [
      { id: "unsloth/Llama-3.2-1B-Instruct", name: "Llama 3.2 1B Instruct", isGguf: false },
      { id: "unsloth/Llama-3.2-3B-Instruct-GGUF", name: "Llama 3.2 3B Instruct GGUF", isGguf: true },
      { id: "unsloth/Mistral-7B-v0.3", name: "Mistral 7B v0.3", isGguf: false },
    ],
    value: "unsloth/Llama-3.2-1B-Instruct",
    onSelect: (id, meta) => console.log('Selected:', id, meta),
  },
};

export const Lora: StoryObj<typeof LoraModelPicker> = {
  render: (args) => <LoraModelPicker {...args} />,
  args: {
    loraModels: [
      { 
        id: "lora-1", 
        name: "My Awesome LoRA", 
        source: "training", 
        exportType: "lora",
        updatedAt: Date.now(),
        baseModel: "Llama 3.2 1B"
      },
      { 
        id: "lora-2", 
        name: "Medical Assistant v2", 
        source: "exported", 
        exportType: "merged",
        updatedAt: Date.now() - 500000,
        baseModel: "Llama 3.2 3B"
      },
    ],
    value: "lora-1",
    onSelect: (id, meta) => console.log('Selected:', id, meta),
  },
};
