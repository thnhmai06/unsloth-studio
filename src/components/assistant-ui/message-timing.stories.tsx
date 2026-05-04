import type { Meta, StoryObj } from "@storybook/react";
import { MessageTiming } from "./message-timing";
import { MessagePrimitive } from "@assistant-ui/react";
import { TooltipProvider } from "@/components/ui/tooltip";

const meta: Meta<typeof MessageTiming> = {
  title: "Assistant UI/MessageTiming",
  component: MessageTiming,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MessageTiming>;

const mockMessage = {
  id: "msg_1",
  role: "assistant" as const,
  content: [{ type: "text" as const, text: "Hello, how can I help you today?" }],
  status: { type: "complete" as const },
  metadata: {
    custom: {
      serverTimings: {
        predicted_per_second: 42.5,
        prompt_ms: 150,
        prompt_per_second: 1200,
        predicted_ms: 850,
        prompt_n: 180,
        cache_n: 500,
      },
    },
  },
};

export const Default: Story = {
  render: (args) => (
    <MessagePrimitive.Root message={mockMessage}>
      <MessageTiming {...args} />
    </MessagePrimitive.Root>
  ),
};

export const ClientSide: Story = {
  render: (args) => (
    <MessagePrimitive.Root
      message={{
        ...mockMessage,
        metadata: {}, // No server timings
      }}
    >
      <MessageTiming {...args} />
    </MessagePrimitive.Root>
  ),
};
