import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { fontVariables } from "../styles/fonts";
import "../styles/tokens.css";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { className: fontVariables, style: { fontFamily: "var(--font-body)" } },
        React.createElement(Story)
      ),
  ],
};

export default preview;
