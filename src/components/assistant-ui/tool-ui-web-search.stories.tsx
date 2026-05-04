import type { Meta, StoryObj } from "@storybook/react";
import { WebSearchToolUI as Component } from './tool-ui-web-search';

const meta: Meta = {
  title: "Assistant UI/Web Search Tool UI",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockResult = [
  {
    title: "Unsloth AI",
    url: "https://unsloth.ai",
    snippet: "Unsloth makes LLM fine-tuning 2x faster and use 70% less memory."
  },
  {
    title: "Unsloth GitHub",
    url: "https://github.com/unslothai/unsloth",
    snippet: "2-4x faster 70% less memory 0% loss in accuracy Llama-3, Mistral, Gemma & Phi-3 fine-tuning."
  },
  {
    title: "Unsloth Documentation",
    url: "https://docs.unsloth.ai",
    snippet: "Get started with Unsloth for fast LLM fine-tuning."
  }
];

export const SearchResult: Story = {
  args: {
    args: { query: "What is Unsloth?" },
    result: mockResult,
    status: { type: "complete" }
  },
};

export const Running: Story = {
  args: {
    args: { query: "Latest AI news" },
    status: { type: "running" }
  },
};

export const ReadPage: Story = {
  args: {
    args: { url: "https://unsloth.ai/blog/mistral-benchmark" },
    result: "Full text of the blog post would go here...",
    status: { type: "complete" }
  },
};
