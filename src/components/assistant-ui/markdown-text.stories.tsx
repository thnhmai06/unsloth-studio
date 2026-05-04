import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownText } from "./markdown-text";

const meta: Meta<typeof MarkdownText> = {
  title: "Assistant UI/MarkdownText",
  component: MarkdownText,
};

export default meta;

type Story = StoryObj<typeof MarkdownText>;

export const Default: Story = {
  args: {
    children: `
# Hello World
This is **markdown** text.
- List item 1
- List item 2

\`\`\`ts
const x = 1;
\`\`\`
`,
  },
};
