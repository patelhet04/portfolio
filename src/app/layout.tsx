import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { appearanceScript } from "./lib/appearance";
import { site } from "@/utils/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/assets/Memoji.png", apple: "/assets/Memoji.png" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    type: "website",
    images: ["/assets/het-patel-software-engineer.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/assets/het-patel-software-engineer.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e0b" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="en" data-theme="light" data-season="default" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=Martian+Mono:wght@300..600&display=swap"
          />
        </head>
        <body>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
