import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LocationsSection } from "./LocationsSection";

const locations = [
  {
    slug: "parque-industrial",
    bairro: "Parque Industrial",
    cidade: "São José dos Campos",
    foto: "/images/consultorio-parque-industrial.jpg",
    alt: "Consultório no Parque Industrial, São José dos Campos",
  },
  {
    slug: "parque-monte-libano",
    bairro: "Parque Monte Líbano",
    cidade: "Mogi das Cruzes",
    foto: "/images/consultorio-parque-monte-libano.png",
    alt: "Consultório no Parque Monte Líbano, Mogi das Cruzes",
  },
  {
    slug: "centro-mogi",
    bairro: "Centro",
    cidade: "Mogi das Cruzes",
    foto: "/images/centro-mogi.jpeg",
    alt: "Consultório no Centro de Mogi das Cruzes",
  },
];

const meta: Meta<typeof LocationsSection> = {
  title: "Landing/LocationsSection",
  component: LocationsSection,
  args: {
    locations,
    cityFilters: ["Todas", "São José dos Campos", "Mogi das Cruzes"],
  },
};

export default meta;
type Story = StoryObj<typeof LocationsSection>;

export const Default: Story = {};
