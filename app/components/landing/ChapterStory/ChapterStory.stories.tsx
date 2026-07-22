import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ChapterStory } from "./ChapterStory";

const meta: Meta<typeof ChapterStory> = {
  title: "Landing/ChapterStory",
  component: ChapterStory,
};

export default meta;
type Story = StoryObj<typeof ChapterStory>;

export const Default: Story = {};
