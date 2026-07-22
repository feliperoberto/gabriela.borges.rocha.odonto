import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TestimonialCard } from "./TestimonialCard";

const meta: Meta<typeof TestimonialCard> = {
  title: "UI/TestimonialCard",
  component: TestimonialCard,
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Default: Story = {
  args: {
    texto:
      "A Dra. Gabriela me atendeu muito bem, super atenciosa, tirou todas as minhas dúvidas, e conseguiu resolver meu problema muito rápido.",
    autor: "Guilherme Antônio",
  },
};
