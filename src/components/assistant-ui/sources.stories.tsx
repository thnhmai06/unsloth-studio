// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import type { Meta, StoryObj } from "@storybook/react";
import { SourcesGroup as Component } from './sources';
import { AssistantRuntimeProvider, useLocalRuntime, MessagePrimitive } from "@assistant-ui/react";

const meta: Meta<typeof Component> = {
  title: "Assistant UI/Sources",
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
            <div className="max-w-md p-4">
              <Story />
            </div>
          </MessagePrimitive.Root>
        </AssistantRuntimeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockSources = [
  {
    type: "source",
    sourceType: "url",
    url: "https://unsloth.ai",
    title: "Unsloth AI - 2x Faster LLM Fine-tuning",
    metadata: { description: "Unsloth makes fine-tuning 2x faster and uses 70% less memory. Supports Llama 3, Mistral, Phi-3 and more." }
  },
  {
    type: "source",
    sourceType: "url",
    url: "https://github.com/unslothai/unsloth",
    title: "unslothai/unsloth: 5-20x faster 70% less memory fine-tuning",
    metadata: { description: "GitHub repository for Unsloth. Open source and easy to use." }
  },
  {
    type: "source",
    sourceType: "url",
    url: "https://huggingface.co/unsloth",
    title: "Unsloth on Hugging Face",
    metadata: { description: "Pre-quantized models and datasets optimized for Unsloth." }
  },
  {
    type: "source",
    sourceType: "url",
    url: "https://docs.unsloth.ai",
    title: "Unsloth Documentation",
    metadata: { description: "Official documentation and tutorials for Unsloth fine-tuning." }
  },
  {
    type: "source",
    sourceType: "url",
    url: "https://medium.com/@unslothai",
    title: "Unsloth Blog",
    metadata: { description: "Deep dives into performance optimizations and new features." }
  }
];

export const Default: Story = {
  args: {
    message: {
      id: "1",
      role: "assistant",
      content: [
        { type: "text", text: "I found some sources about Unsloth:" },
        ...mockSources
      ],
    } as any,
  },
};

export const Collapsed: Story = {
  args: {
    message: {
      id: "2",
      role: "assistant",
      content: [
        { type: "text", text: "Many sources found:" },
        ...mockSources,
        ...mockSources.map(s => ({ ...s, url: s.url + "/more" })),
        ...mockSources.map(s => ({ ...s, url: s.url + "/even-more" }))
      ],
    } as any,
  },
};
