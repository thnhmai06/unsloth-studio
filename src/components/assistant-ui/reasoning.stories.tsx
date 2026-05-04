// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import type { Meta, StoryObj } from "@storybook/react";
import { ReasoningGroup as Component } from './reasoning';
import { AssistantRuntimeProvider, useLocalRuntime, MessagePrimitive } from "@assistant-ui/react";
import { type MessageRecord } from "@/features/chat/types";

const meta: Meta<typeof Component> = {
  title: "Assistant UI/Reasoning",
  component: Component,
  decorators: [
    (Story, context) => {
      const { message } = context.args as any;
      const runtime = useLocalRuntime({
        async onStart() {},
      });

      return (
        <AssistantRuntimeProvider runtime={runtime}>
          <MessagePrimitive.Root message={message}>
            <Story />
          </MessagePrimitive.Root>
        </AssistantRuntimeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockReasoningText = "I will search for the latest information about Unsloth's performance benchmarks. \n\nThen, I will compare it with other fine-tuning libraries like Hugging Face's PEFT and Axolotl. \n\nFinally, I will summarize the key advantages of using Unsloth.";

export const Thinking: Story = {
  args: {
    startIndex: 0,
    endIndex: 0,
    message: {
      id: "1",
      role: "assistant",
      status: { type: "running" },
      content: [
        { type: "reasoning", text: "Thinking..." },
      ],
      metadata: { custom: {} },
    } as any,
  },
};

export const Completed: Story = {
  args: {
    startIndex: 0,
    endIndex: 0,
    message: {
      id: "2",
      role: "assistant",
      status: { type: "complete", reason: "stop" },
      content: [
        { type: "reasoning", text: mockReasoningText },
        { type: "text", text: "Unsloth is 2x faster and uses 70% less memory." }
      ],
      metadata: {
        custom: {
          reasoningDuration: 4.5
        }
      },
    } as any,
  },
};
