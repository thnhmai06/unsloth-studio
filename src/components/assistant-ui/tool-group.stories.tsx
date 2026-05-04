import type { Meta, StoryObj } from "@storybook/react";
import { ToolGroup as Component } from './tool-group';
import { ToolFallback } from './tool-fallback';
import { MessagePrimitive } from "@assistant-ui/react";

const meta: Meta = {
  title: "Assistant UI/Tool Group",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startIndex: 0,
    endIndex: 2,
    children: (
      <>
        <ToolFallback 
          toolName="web_search" 
          argsText='{"query": "Unsloth AI"}' 
          result="Unsloth makes LLM fine-tuning 2x faster..."
          status={{ type: "complete" }}
        />
        <ToolFallback 
          toolName="read_url" 
          argsText='{"url": "https://unsloth.ai"}' 
          result="Documentation content..."
          status={{ type: "complete" }}
        />
        <ToolFallback 
          toolName="python" 
          argsText='{"code": "print(1+1)"}' 
          result="2"
          status={{ type: "complete" }}
        />
      </>
    )
  },
  render: (args) => (
    <MessagePrimitive.Root message={{ 
      role: "assistant", 
      content: [
        {
          type: "tool-call",
          toolCallId: "call_1",
          toolName: "web_search",
          argsText: '{"query": "Unsloth AI"}',
          args: { query: "Unsloth AI" },
          result: "Unsloth makes LLM fine-tuning 2x faster..."
        },
        {
          type: "tool-call",
          toolCallId: "call_2",
          toolName: "read_url",
          argsText: '{"url": "https://unsloth.ai"}',
          args: { url: "https://unsloth.ai" },
          result: "Documentation content..."
        },
        {
          type: "tool-call",
          toolCallId: "call_3",
          toolName: "python",
          argsText: '{"code": "print(1+1)"}',
          args: { code: "print(1+1)" },
          result: "2"
        }
      ] 
    }}>
      <Component {...args} />
    </MessagePrimitive.Root>
  )
};

export const Running: Story = {
  args: {
    startIndex: 0,
    endIndex: 1,
    children: (
      <>
        <ToolFallback 
          toolName="python" 
          argsText='{"code": "import time\ntime.sleep(10)"}' 
          status={{ type: "running" }}
        />
        <ToolFallback 
          toolName="terminal" 
          argsText='{"command": "ls -R /"}' 
          status={{ type: "running" }}
        />
      </>
    )
  },
  render: (args) => (
    <MessagePrimitive.Root message={{ 
      role: "assistant", 
      content: [
        {
          type: "tool-call",
          toolCallId: "call_4",
          toolName: "python",
          argsText: '{"code": "import time\ntime.sleep(10)"}',
          args: { code: "import time\ntime.sleep(10)" }
        },
        {
          type: "tool-call",
          toolCallId: "call_5",
          toolName: "terminal",
          argsText: '{"command": "ls -R /"}',
          args: { command: "ls -R /" }
        }
      ] 
    }}>
      <Component {...args} />
    </MessagePrimitive.Root>
  )
};
