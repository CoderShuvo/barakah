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

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import {
  SEOAnalytics,
  SEOMetaTags,
  FooterScripts,
} from "@/components/global/seo-scripts";
import { getSiteSettings } from "@/server/seo-actions";
import {
  getGeneralSettings,
  getIntegrationSettings,
} from "@/server/settings-actions";
import { Analytics } from "@vercel/analytics/react";

export async function generateMetadata(): Promise<Metadata> {
  const { data: generalSettings } = await getGeneralSettings();
  const { data: seoSettings } = await getSiteSettings();

  const title = generalSettings?.site_title || "Barakah Agency";
  const tagline = generalSettings?.tagline || "Ethical Marketing Excellence";
  const ogImage = seoSettings?.default_og_image || "";

  return {
    title: {
      default: `${title} | ${tagline}`,
      template: `%s | ${title}`,
    },
    description:
      "Barakah Agency specializes in ethical, halal marketing strategies that drive growth with integrity.",
    authors: [{ name: title }],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: title,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    icons: generalSettings?.favicon_url
      ? {
          icon: generalSettings.favicon_url,
          shortcut: generalSettings.favicon_url,
          apple: generalSettings.favicon_url,
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: seoSettings } = await getSiteSettings();
  const { data: generalSettings } = await getGeneralSettings();
  const { data: integrations } = await getIntegrationSettings();

  const gaId = integrations?.ga4_id || seoSettings?.google_analytics_id;
  const gscId = integrations?.gsc_id || seoSettings?.google_search_console_id;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {generalSettings?.favicon_url && (
          <link rel="icon" href={generalSettings.favicon_url} sizes="any" />
        )}
        <SEOMetaTags
          gscId={gscId}
          headerScripts={integrations?.header_scripts}
        />
        {integrations?.gtm_id && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${integrations.gtm_id}');`,
            }}
          />
        )}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${lato.variable} ${poppins.variable} font-sans antialiased`}
      >
        <FooterScripts
          gtmId={integrations?.gtm_id}
          footerScripts={integrations?.footer_scripts}
        />
        <SEOAnalytics gaId={gaId} />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
