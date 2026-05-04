import type { Meta, StoryObj } from "@storybook/react";
import { TrainingSectionView } from "./training-section.view";
import type { TrainingSectionViewProps } from "./training-section.view";

const MOCK_TRAINING_SECTION_PROPS: TrainingSectionViewProps = {
  isStarting: false,
  startError: null,
  isLoadingModel: false,
  isCheckingDataset: false,
  isModelSelected: true,
  isIncompatible: false,
  incompatibilityMessage: null,
  configValidationOk: true,
  configValidationMessage: null,
  hasMessage: false,
  chartData: [
    { step: 0, loss: 2.5 },
    { step: 10, loss: 2.1 },
    { step: 20, loss: 1.7 },
    { step: 30, loss: 1.3 },
    { step: 40, loss: 1.0 },
    { step: 50, loss: 0.8 },
  ],
  chartConfig: {
    loss: { label: "Loss", color: "#3b82f6" },
  },
  onStartTraining: () => {},
  onUploadClick: () => {},
  onSaveConfig: () => {},
  onResetConfig: () => {},
  fileInputRef: { current: null },
  onFileChange: () => {},
};

const meta: Meta<typeof TrainingSectionView> = {
  title: "Organisms/Studio/TrainingSection",
  component: TrainingSectionView,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    isStarting: { control: "boolean" },
    isLoadingModel: { control: "boolean" },
    configValidationOk: { control: "boolean" },
    startError: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof TrainingSectionView>;

export const Default: Story = {
  args: {
    ...MOCK_TRAINING_SECTION_PROPS,
  },
};

export const Starting: Story = {
  args: {
    ...MOCK_TRAINING_SECTION_PROPS,
    isStarting: true,
  },
};

export const LoadingModel: Story = {
  args: {
    ...MOCK_TRAINING_SECTION_PROPS,
    isLoadingModel: true,
  },
};

export const ValidationError: Story = {
  args: {
    ...MOCK_TRAINING_SECTION_PROPS,
    configValidationOk: false,
    configValidationMessage: "Learning rate must be greater than 0.",
  },
};

export const CriticalError: Story = {
  args: {
    ...MOCK_TRAINING_SECTION_PROPS,
    isIncompatible: true,
    incompatibilityMessage: "Your GPU (RTX 3060) does not support Flash Attention 2.",
  },
};
