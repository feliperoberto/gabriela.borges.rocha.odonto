import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionHeading } from "./SectionHeading";

const meta: Meta<typeof SectionHeading> = {
  title: "UI/SectionHeading",
  component: SectionHeading,
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Centered: Story = {
  args: { eyebrow: "Capítulo um", title: "Do outro lado da cadeira" },
};

export const WithDescription: Story = {
  args: {
    eyebrow: "Capítulo cinco",
    title: "O que eu faço",
    description: "Toque em um procedimento para entender, em linguagem simples, do que se trata.",
  },
};

export const LeftAligned: Story = {
  args: { eyebrow: "Capítulo três", title: "Prazer, Gabriela.", align: "left" },
};
