import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Basic */}
        <title>Digitronix – Computer & Electronics Store</title>
        <meta
          name="description"
          content="Buy computers, laptops, gaming PCs, accessories, and electronics at Digitronix. Fast delivery and trusted quality."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.jpg" />

        {/* Canonical URL (VERY important for Google) */}
        <link rel="canonical" href="http://digitronix.space" />

        {/* Open Graph (Facebook, Kakao, WhatsApp, LinkedIn) */}
        <meta
          property="og:title"
          content="Digitronix – Computer & Electronics Store"
        />
        <meta
          property="og:description"
          content="Buy computers, laptops, gaming PCs, and accessories at Digitronix."
        />
        <meta
          property="og:image"
          content="http://digitronix.space/favicon.jpg"
        />
        <meta property="og:url" content="http://digitronix.space" />
        <meta property="og:type" content="website" />

        {/* Twitter/X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digitronix – Computer Store" />
        <meta
          name="twitter:description"
          content="High-quality computers, gaming gear, and electronics."
        />
        <meta
          name="twitter:image"
          content="http://digitronix.space/favicon.jpg"
        />

        {/* SEO hints */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Performance */}
        <link rel="preconnect" href="https://unpkg.com" />

        {/* AOS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
