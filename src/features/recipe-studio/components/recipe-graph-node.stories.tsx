import type { Meta, StoryObj } from "@storybook/react";
import { RecipeNodeView } from "./recipe-graph-node.view";
import type { RecipeNodeViewProps } from "./recipe-graph-node.view";

export const MOCK_RECIPE_NODE_VIEW_PROPS: RecipeNodeViewProps = {
  id: "mock-node-1",
  data: {
    name: "Mock Sampler",
    kind: "sampler",
    blockType: "category",
    title: "Category Sampler",
    subtype: "Sampler",
    runtimeState: "idle",
  },
  selected: false,
  config: undefined,
  summary: "Mock summary",
  localProviderNames: new Set(),
  llmAuxVisible: false,
  connectionStatus: {
    isDisconnected: false,
    missingDataInput: false,
  },
  onOpenConfig: () => {},
  onUpdateConfig: () => {},
  onToggleLlmAux: () => {},
};

const meta: Meta<typeof RecipeNodeView> = {
  title: "Molecules/Studio/RecipeNode",
  component: RecipeNodeView,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    selected: { control: "boolean" },
    summary: { control: "text" },
    "data.kind": {
      control: "select",
      options: ["sampler", "llm", "validator", "expression", "note"],
    },
    "data.runtimeState": {
      control: "select",
      options: ["idle", "running", "done", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecipeNodeView>;

export const DefaultSampler: Story = {
  args: {
    ...MOCK_RECIPE_NODE_VIEW_PROPS,
    summary: "Samples a random category from the dataset.",
  },
};

export const RunningLLM: Story = {
  args: {
    ...MOCK_RECIPE_NODE_VIEW_PROPS,
    data: {
      ...MOCK_RECIPE_NODE_VIEW_PROPS.data,
      name: "Generator LLM",
      kind: "llm",
      blockType: "text",
      runtimeState: "running",
    },
    summary: "Generating synthetic responses using Llama-3...",
  },
};

export const ErrorState: Story = {
  args: {
    ...MOCK_RECIPE_NODE_VIEW_PROPS,
    data: {
      ...MOCK_RECIPE_NODE_VIEW_PROPS.data,
      runtimeState: "error",
    },
    connectionStatus: {
      isDisconnected: true,
      missingDataInput: true,
    },
    summary: "Missing data input from previous node.",
  },
};

export const Selected: Story = {
  args: {
    ...DefaultSampler.args,
    selected: true,
  },
};
