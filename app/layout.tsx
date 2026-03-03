import React from "react";

import type { Metadata } from "next";
import { Inter, Playfair_Display, Lato, Poppins } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Barakah Agency | Ethical Marketing Excellence",
    template: "%s | Barakah Agency",
  },
  description:
    "Barakah Agency specializes in ethical, halal marketing strategies that drive growth with integrity. Branding, performance marketing, and digital transformation.",
  keywords: [
    "ethical marketing",
    "halal marketing",
    "branding agency",
    "performance marketing",
    "digital transformation",
  ],
  authors: [{ name: "Barakah Agency" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Barakah Agency",
  },
};

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${lato.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
