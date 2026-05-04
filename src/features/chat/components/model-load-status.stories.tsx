import type { Meta, StoryObj } from "@storybook/react";
import { ModelLoadDescriptionView } from "./model-load-status.view";

const meta: Meta<typeof ModelLoadDescriptionView> = {
  title: "Molecules/Chat/ModelLoadDescription",
  component: ModelLoadDescriptionView,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    progressPercent: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    title: { control: "text" },
    message: { control: "text" },
    progressLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ModelLoadDescriptionView>;

export const Default: Story = {
  args: {
    title: "Downloading Llama-3-8B",
    progressPercent: 45,
    progressLabel: "1.2 GB of 4.5 GB • 15 MB/s • 3m 20s left",
  },
};

export const LoadingWithoutProgress: Story = {
  args: {
    title: "Initializing model...",
    message: "Verifying checksums and preparing memory...",
  },
};

export const Completed: Story = {
  args: {
    title: "Model Loaded Successfully",
    progressPercent: 100,
    progressLabel: "4.5 GB of 4.5 GB • Done",
  },
};
