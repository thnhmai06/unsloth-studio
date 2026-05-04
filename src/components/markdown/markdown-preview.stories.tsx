import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownPreview as Component } from './markdown-preview';

const meta: Meta = {
  title: "UI/Markdown/MarkdownPreview",
  component: Component,
  decorators: [
    (Story) => (
      <div className="max-w-2xl p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RichContent: Story = {
  args: {
    markdown: `
# Markdown Preview

This is a **rich markdown** sample.

## Features
- Support for **bold** and *italic* text.
- Support for [links](https://unsloth.ai).
- Support for lists.

### Code Block
\`\`\`typescript
const hello = "world";
function sayHello() {
  console.log(hello);
}
\`\`\`

### Tables
| Name | Description |
|------|-------------|
| Unsloth | Fast LLM training |
| Studio | Interactive UI |

### Math (KaTeX)
$e = mc^2$

$$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$
    `,
  },
};

export const Plain: Story = {
  args: {
    markdown: "This is a plain markdown preview without the container styling.",
    plain: true,
  },
};
