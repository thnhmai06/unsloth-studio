import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionColumnsTab as Component } from './execution-columns-tab';

const meta: Meta = {
  title: "Features/RecipeStudio/Executions/ExecutionColumnsTab",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    analysisColumns: [
      {
        column_name: "instruction",
        column_type: "feature",
        simple_dtype: "string",
        num_unique: 1000,
        num_null: 0,
        input_tokens_mean: 45.2,
        output_tokens_mean: null,
      },
      {
        column_name: "output",
        column_type: "target",
        simple_dtype: "string",
        num_unique: 998,
        num_null: 2,
        input_tokens_mean: null,
        output_tokens_mean: 156.8,
      },
      {
        column_name: "category",
        column_type: "feature",
        simple_dtype: "string",
        num_unique: 5,
        num_null: 0,
        input_tokens_mean: 3.1,
        output_tokens_mean: null,
      }
    ]
  },
};
