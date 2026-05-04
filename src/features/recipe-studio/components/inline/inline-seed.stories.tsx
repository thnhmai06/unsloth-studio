import type { Meta, StoryObj } from "@storybook/react";
import { InlineSeed as Component } from './inline-seed';

const meta: Meta = {
  title: "Features/RecipeStudio/Inlines/Seed",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const HuggingFace: Story = {
  args: {
    config: {
      id: "node-7",
      kind: "seed",
      // biome-ignore lint/style/useNamingConvention: api schema
      seed_source_type: "hf",
      // biome-ignore lint/style/useNamingConvention: api schema
      hf_repo_id: "unsloth/notebooks",
    },
    onUpdate: () => {},
  },
};

export const GitHub: Story = {
  args: {
    config: {
      id: "node-8",
      kind: "seed",
      // biome-ignore lint/style/useNamingConvention: api schema
      seed_source_type: "github_repo",
      // biome-ignore lint/style/useNamingConvention: api schema
      github_repo_slug: "unslothai/unsloth",
      // biome-ignore lint/style/useNamingConvention: api schema
      github_limit: "50",
    },
    onUpdate: () => {},
  },
};

export const Local: Story = {
  args: {
    config: {
      id: "node-9",
      kind: "seed",
      // biome-ignore lint/style/useNamingConvention: api schema
      seed_source_type: "local",
      // biome-ignore lint/style/useNamingConvention: api schema
      local_file_name: "dataset.csv",
    },
    onUpdate: () => {},
  },
};
