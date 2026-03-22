import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resultados Elecciones Subnacionales 2026 - e/POST",
  description:
    "Resultados preliminares SIREPRE de las elecciones subnacionales de Bolivia 2026. Gobernadores y alcaldes de ciudades capitales.",
  openGraph: {
    title: "Resultados Elecciones Subnacionales 2026 - e/POST",
    description:
      "Resultados preliminares SIREPRE de las elecciones subnacionales de Bolivia 2026. Gobernadores y alcaldes de ciudades capitales.",
    type: "website",
    locale: "es_BO",
    siteName: "e/POST",
    images: [
      {
        url: "https://elpost.com.bo/wp-content/uploads/2026/03/Resultados-preliminares-El-Post.png",
        width: 1200,
        height: 630,
        alt: "Resultados preliminares - e/POST",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resultados Elecciones Subnacionales 2026 - e/POST",
    description:
      "Resultados preliminares SIREPRE de las elecciones subnacionales de Bolivia 2026.",
    images: ["https://elpost.com.bo/wp-content/uploads/2026/03/Resultados-preliminares-El-Post.png"],
  },
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
