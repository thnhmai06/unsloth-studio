import type { Meta, StoryObj } from "@storybook/react";
import { InlineExpression as Component } from './inline-expression';

const meta: Meta = {
  title: "Features/RecipeStudio/Inlines/Expression",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    config: {
      id: "node-1",
      kind: "expression",
      dtype: "str",
      expr: "{{ name }} is awesome",
    },
    onUpdate: () => {},
  },
};
