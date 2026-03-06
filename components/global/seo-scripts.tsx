"use client";

import Script from "next/script";

export function SEOAnalytics({ gaId }: { gaId?: string }) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

export function SEOMetaTags({
  gscId,
  headerScripts,
}: {
  gscId?: string;
  headerScripts?: string;
}) {
  return (
    <>
      {gscId && <meta name="google-site-verification" content={gscId} />}
      {headerScripts && (
        <div dangerouslySetInnerHTML={{ __html: headerScripts }} />
      )}
    </>
  );
}

export function FooterScripts({
  gtmId,
  footerScripts,
}: {
  gtmId?: string;
  footerScripts?: string;
}) {
  return (
    <>
      {gtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}
      {footerScripts && (
        <div dangerouslySetInnerHTML={{ __html: footerScripts }} />
      )}
    </>
  );
}
