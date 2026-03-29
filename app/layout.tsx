import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resultados Elecciones Subnacionales 2026 - e/POST",
  description:
    "Resultados oficiales SCORC de las elecciones subnacionales de Bolivia 2026. Gobernadores y alcaldes de ciudades capitales.",
  openGraph: {
    title: "Resultados Elecciones Subnacionales 2026 - e/POST",
    description:
      "Resultados oficiales SCORC de las elecciones subnacionales de Bolivia 2026. Gobernadores y alcaldes de ciudades capitales.",
    url: "https://elecciones.elpost.com.bo",
    type: "website",
    locale: "es_BO",
    siteName: "e/POST",
    images: [
      {
        url: "https://elpost.com.bo/wp-content/uploads/2026/03/Resultados-Oficiales.png",
        width: 1200,
        height: 630,
        alt: "Resultados Oficiales - e/POST",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resultados Elecciones Subnacionales 2026 - e/POST",
    description:
      "Resultados oficiales SCORC de las elecciones subnacionales de Bolivia 2026.",
    images: ["https://elpost.com.bo/wp-content/uploads/2026/03/Resultados-Oficiales.png"],
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L1GB8HHMP9"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L1GB8HHMP9');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
