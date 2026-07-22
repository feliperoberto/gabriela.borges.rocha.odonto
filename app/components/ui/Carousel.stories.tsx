import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Carousel } from "./Carousel";
import { TestimonialCard } from "./TestimonialCard";

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const testimonials = [
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
];

export const WithTestimonials: Story = {
  render: () => (
    <Carousel>
      {testimonials.map((t) => (
        <TestimonialCard key={t.autor} {...t} />
      ))}
    </Carousel>
  ),
};
