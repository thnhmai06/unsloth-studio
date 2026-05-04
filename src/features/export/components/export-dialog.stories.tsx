import type { Meta, StoryObj } from "@storybook/react";
import { ExportDialog as Component } from './export-dialog';

const meta: Meta<typeof Component> = {
  title: "Features/Export/ExportDialog",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LocalExport: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    checkpoint: "checkpoint-100",
    exportMethod: "merged",
    quantLevels: [],
    estimatedSize: "14.2 GB",
    baseModelName: "Llama-3-8B",
    isAdapter: true,
    destination: "local",
    onDestinationChange: () => {},
    hfUsername: "",
    onHfUsernameChange: () => {},
    modelName: "",
    onModelNameChange: () => {},
    hfToken: "",
    onHfTokenChange: () => {},
    privateRepo: true,
    onPrivateRepoChange: () => {},
    onExport: () => {},
    exporting: false,
    exportError: null,
    exportSuccess: false,
    exportOutputPath: null,
  },
};

export const HubExport: Story = {
  args: {
    ...LocalExport.args,
    destination: "hub",
    hfUsername: "unsloth",
    modelName: "llama-3-8b-my-finetune",
    hfToken: "hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
};

export const GGUFExport: Story = {
  args: {
    ...LocalExport.args,
    exportMethod: "gguf",
    quantLevels: ["q4_k_m", "q8_0"],
    estimatedSize: "13.0 GB",
  },
};

export const Exporting: Story = {
  args: {
    ...LocalExport.args,
    exporting: true,
  },
};

export const Success: Story = {
  args: {
    ...LocalExport.args,
    exportSuccess: true,
    exportOutputPath: "/mnt/v/models/llama-3-8b-merged",
  },
};

export const Error: Story = {
  args: {
    ...LocalExport.args,
    exportError: "Failed to merge weights: Out of memory during sharding.",
  },
};
