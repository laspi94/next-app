import './globals.css';

import { ThemeProvider } from '@/app/providers/ThemeProvider';
import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    title: "Top Detailing",
    description: "Servicios profesionales de detailing para mantener tu auto en su mejor estado.",
    url: "https://top.detailing.hapore.net",
    images: {
      alt: "Logo",
      url: "https://top.detailing.hapore.net/img/logo_header.png"
    },
    siteName: "Top Detailing",
    locale: "es_ES",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
