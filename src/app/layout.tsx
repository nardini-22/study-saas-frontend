import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/presentation/components";
import { Rubik } from "next/font/google";

export const metadata: Metadata = {
  title: "Today I Learned | TIL",
  description:
    "TIL (Today I Learned) é uma plataforma para criar trilhas de aprendizado personalizadas e registrar o que você aprende todos os dias. Organize seus estudos, acompanhe seu progresso e transforme conhecimento em hábito.",
};

const rubik = Rubik();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={rubik.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
