import './globals.css';
import "../../public/css/overlayscrollbars/overlayscrollbars.min.css";
import "../../public/css/bootstrap/icons/bootstrap-icons-1.11.3.min.css";
import "../../public/css/bootstrap/bootstrap-5.3.3.min.css";
import "../../public/css/adminlte/adminlte.css";

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
      </head>
      <body className="layout-fixed sidebar-expand-lg bg-body-tertiary">
        {children}
        <Script type="module" src="js/overlayscrollbars/overlayscrollbars.browser.es6.min.js" crossOrigin="anonymous" />
        <Script src="js/poppers/poppers-core-2.11.8.min.js" crossOrigin="anonymous" />
        <Script src="js/bootstrap/bootstrap-5.3.3.bundle.min.js" crossOrigin="anonymous" />
        <Script type="module" src="js/adminlte/adminlte.js" crossOrigin="anonymous" />
      </body>
    </html>
  );
}
