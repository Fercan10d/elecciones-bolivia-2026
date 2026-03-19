import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elecciones Subnacionales 2026 - e/POST",
  description:
    "Resultados en vivo de las elecciones subnacionales de Bolivia 2026. Gobernadores y alcaldes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
