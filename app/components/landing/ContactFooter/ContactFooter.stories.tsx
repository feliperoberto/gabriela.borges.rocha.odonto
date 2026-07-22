import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContactFooter } from "./ContactFooter";

const meta: Meta<typeof ContactFooter> = {
  title: "Landing/ContactFooter",
  component: ContactFooter,
  args: {
    profile: {
      nome: "Dra. Gabriela Borges Rocha",
      cro: "CRO-SP 176648",
      tel: "+5512983185513",
      telDisplay: "(12) 9 8318-5513",
      email: "dra.gabrielaborgesrocha@gmail.com",
      instagram: "dra.gabiborges.odonto",
      cities: ["São José dos Campos", "Mogi das Cruzes"],
      whatsapp: {
        phone: "5512983185513",
        defaultMessage: "Olá, Dra. Gabriela! Gostaria de agendar uma avaliação.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContactFooter>;

export const Default: Story = {};
