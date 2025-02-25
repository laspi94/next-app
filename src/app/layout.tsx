import './globals.css';

import type { Metadata } from "next";
import Script from 'next/script';

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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel='stylesheet' href="/css/bootstrap/bootstrap-5.3.3.min.modulde.css" />
      </head>
      <body>
        {children}
        <Script src="/js/bootstrap/bootstrap-5.3.3.bundle.min.js" />
      </body>
    </html>
  );
}
