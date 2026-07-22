import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TestimonialsSection } from "./TestimonialsSection";

const meta: Meta<typeof TestimonialsSection> = {
  title: "Landing/TestimonialsSection",
  component: TestimonialsSection,
  args: {
    testimonials: [
      {
        texto:
          "A Dra. Gabriela me atendeu muito bem, super atenciosa, tirou todas as minhas dúvidas.",
        autor: "Guilherme Antônio",
      },
      {
        texto: "Foi de longe uma das melhores consultas que eu já fui! Muito obrigada.",
        autor: "Evellin Laressa",
      },
      {
        texto: "Exercendo sua profissão com tanto amor, dedicação e profissionalismo.",
        autor: "Margarida Dias",
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof TestimonialsSection>;

export const Default: Story = {};
