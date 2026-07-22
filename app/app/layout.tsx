import type { Metadata } from "next";

import { fontVariables } from "@/styles/fonts";

import "@/styles/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dra. Gabriela Borges — Cirurgiã-Dentista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
