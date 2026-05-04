import type { Meta, StoryObj } from "@storybook/react";
import { 
  ModelLoadDescriptionView,
  ModelLoadInlineStatusView,
  type ModelLoadDescriptionViewProps,
  type ModelLoadInlineStatusViewProps
} from './model-load-status.view';

const meta: Meta = {
  title: "Features/Chat/ModelLoadStatusView",
};

export default meta;

export const DescriptionView: StoryObj<ModelLoadDescriptionViewProps> = {
  render: (args) => <ModelLoadDescriptionView {...args} />,
  args: {
    title: "Downloading Model",
    message: "Initializing download for unsloth/Llama-3.2-1B-Instruct...",
    progressPercent: 45,
    progressLabel: "4.2 GB / 9.1 GB • 12.5 MB/s",
    onStop: () => console.log("Stopped"),
  },
};

export const DescriptionViewNoProgress: StoryObj<ModelLoadDescriptionViewProps> = {
  render: (args) => <ModelLoadDescriptionView {...args} />,
  args: {
    title: "Starting Model",
    message: "Loading weights into VRAM...",
    onStop: () => console.log("Stopped"),
  },
};

export const InlineStatusView: StoryObj<ModelLoadInlineStatusViewProps> = {
  render: (args) => <ModelLoadInlineStatusView {...args} />,
  args: {
    label: "Llama-3.2-1B",
    title: "Model loading status",
    progressPercent: 78,
    progressLabel: "7.1 GB / 9.1 GB • 15.2 MB/s",
    onStop: () => console.log("Stopped"),
  },
};
