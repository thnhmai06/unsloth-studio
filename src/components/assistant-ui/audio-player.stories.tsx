import type { Meta, StoryObj } from "@storybook/react";
import { AudioPlayer as Component } from './audio-player';

const meta: Meta<typeof Component> = {
  title: "components/assistant-ui/AudioPlayer",
  component: Component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
};
