import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Top Detailing" />
        <meta property="og:description" content="Servicios profesionales de detailing para mantener tu auto en su mejor estado." />
        <meta property="og:url" content="https://top.detailing.hapore.net" />
        <meta property="og:image" content="https://top.detailing.hapore.net/img/logo_header.png" />
        <meta property="og:image:alt" content="Logo" />
        <meta property="og:site_name" content="Top Detailing" />
        <meta property="og:locale" content="es_ES" />

        <link rel="stylesheet" href="css/bootstrap/bootstrap-5.3.3.min.css"></link>
        <link rel="stylesheet" href="css/bootstrap/icons/bootstrap-icons-1.11.3.min.css"></link>

        <link rel="stylesheet" href="css/app.css"></link>

        {/* <!-- Scripts --> */}
        {/* <script type="text/javascript" src="{{ asset('js/poppers/poppers-core-2.9.2.min.js') }}"></script> */}

        {/* <script type="text/javascript" src="{{ asset('js/sweetalert2-11.14.5/sweetalert.min.js') }}"></script> */}

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
