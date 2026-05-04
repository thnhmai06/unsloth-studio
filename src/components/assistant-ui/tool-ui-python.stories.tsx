import type { Meta, StoryObj } from "@storybook/react";
import { PythonToolUI as Component } from './tool-ui-python';

const meta: Meta = {
  title: "Assistant UI/Python Tool UI",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    args: { 
      code: "import numpy as np\nprint(np.random.rand(3))" 
    },
    result: { 
      text: "[0.4523, 0.8912, 0.1234]",
      sessionId: "session_123"
    },
    status: { type: "complete" }
  },
};

export const Running: Story = {
  args: {
    args: { 
      code: "import time\nprint('Starting heavy computation...')\ntime.sleep(5)\nprint('Done!')" 
    },
    status: { type: "running" }
  },
};

export const TextOnly: Story = {
  args: {
    args: { 
      code: "print('Hello from Python!')\nfor i in range(3):\n    print(f'Iteration {i}')" 
    },
    result: "Hello from Python!\nIteration 0\nIteration 1\nIteration 2",
    status: { type: "complete" }
  },
};
