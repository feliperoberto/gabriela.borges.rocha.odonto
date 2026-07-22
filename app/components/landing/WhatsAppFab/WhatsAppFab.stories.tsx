import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WhatsAppFab } from "./WhatsAppFab";

const meta: Meta<typeof WhatsAppFab> = {
  title: "Landing/WhatsAppFab",
  component: WhatsAppFab,
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
type Story = StoryObj<typeof WhatsAppFab>;

// No #hero-cta in this story's DOM, so the FAB stays at its default hidden
// state — its visible transition is covered by the unit test and e2e.
export const Default: Story = {};
