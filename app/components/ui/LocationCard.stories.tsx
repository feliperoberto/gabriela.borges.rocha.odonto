import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LocationCard } from "./LocationCard";

const meta: Meta<typeof LocationCard> = {
  title: "UI/LocationCard",
  component: LocationCard,
};

export default meta;
type Story = StoryObj<typeof LocationCard>;

export const Default: Story = {
  args: {
    slug: "parque-industrial",
    bairro: "Parque Industrial",
    cidade: "São José dos Campos",
    foto: "/images/consultorio-parque-industrial.jpg",
    alt: "Consultório no Parque Industrial, São José dos Campos",
  },
};
