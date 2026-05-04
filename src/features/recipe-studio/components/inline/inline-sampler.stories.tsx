import type { Meta, StoryObj } from "@storybook/react";
import { InlineSampler as Component } from './inline-sampler';

const meta: Meta = {
  title: "Features/RecipeStudio/Inlines/Sampler",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Uniform: Story = {
  args: {
    config: {
      id: "node-4",
      kind: "sampler",
      // biome-ignore lint/style/useNamingConvention: api schema
      sampler_type: "uniform",
      low: "0",
      high: "100",
      // biome-ignore lint/style/useNamingConvention: api schema
      convert_to: "int",
    },
    onUpdate: () => {},
  },
};

export const Gaussian: Story = {
  args: {
    config: {
      id: "node-5",
      kind: "sampler",
      // biome-ignore lint/style/useNamingConvention: api schema
      sampler_type: "gaussian",
      mean: "0",
      std: "1",
      // biome-ignore lint/style/useNamingConvention: api schema
      convert_to: "float",
    },
    onUpdate: () => {},
  },
};

export const Bernoulli: Story = {
  args: {
    config: {
      id: "node-6",
      kind: "sampler",
      // biome-ignore lint/style/useNamingConvention: api schema
      sampler_type: "bernoulli",
      p: "0.5",
    },
    onUpdate: () => {},
  },
};
