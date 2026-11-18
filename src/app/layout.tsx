import type { Metadata } from "next";
import Script from "next/script";
import { getSiteUrl, siteConfig } from "@/lib/site";
import MotionProvider from "@/components/providers/MotionProvider";
import WebMcpTools from "@/components/agents/WebMcpTools";
import { getSiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const title = "Garcia Travel Fantino | Agencia de viajes en Fantino, RD";
const description = siteConfig.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  keywords: [
    "agencia de viajes en Fantino",
    "Garcia Travel Fantino",
    "agencia de viajes República Dominicana",
    "paquetes turísticos República Dominicana",
    "vuelos desde Fantino",
    "hoteles todo incluido",
    "viajes a Punta Cana",
    "viajes a Bayahibe",
    "viajes a Samaná",
    "cruceros República Dominicana",
    "paquetes a Punta Cana desde República Dominicana",
    "paquetes turísticos en Fantino",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: getSiteUrl(),
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: siteConfig.shareImagePath,
        width: 1024,
        height: 571,
        alt: "Playa tropical, viajes con Garcia Travel Fantino",
      },
      {
        url: siteConfig.logoPath,
        width: 1024,
        height: 1024,
        alt: "Logo de Garcia Travel Fantino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.shareImagePath],
  },
  category: "travel",
  icons: {
    icon: "/favicon.ico",
    apple: siteConfig.logoPath,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="h-full scroll-smooth">
      <body
        suppressHydrationWarning
        className="font-inter antialiased min-h-full flex flex-col bg-brand-slate text-brand-navy"
      >
        <noscript>
          {/* Sin JavaScript las animaciones de entrada no se ejecutan: mostrar el contenido igual. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteJsonLd()) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <WebMcpTools />
      </body>
      <Script id="extension-attribute-cleanup">
        {`
          (() => {
            const blockedAttribute = /^(bis_|processed_|data-new-gr-c-s-check-loaded$|data-gr-ext-installed$)/;

            const cleanElement = (element) => {
              if (!element || !element.attributes) return;

              for (const attribute of Array.from(element.attributes)) {
                if (blockedAttribute.test(attribute.name)) {
                  element.removeAttribute(attribute.name);
                }
              }
            };

            const cleanTree = (root) => {
              cleanElement(root);
              if (root && root.querySelectorAll) {
                root.querySelectorAll("*").forEach(cleanElement);
              }
            };

            cleanTree(document.documentElement);

            const observer = new MutationObserver((mutations) => {
              for (const mutation of mutations) {
                if (mutation.type === "attributes") {
                  cleanElement(mutation.target);
                }

                for (const node of mutation.addedNodes || []) {
                  if (node.nodeType === 1) cleanTree(node);
                }
              }
            });

            observer.observe(document.documentElement, {
              attributes: true,
              childList: true,
              subtree: true,
            });

            document.addEventListener("DOMContentLoaded", () => cleanTree(document.documentElement), { once: true });
            window.addEventListener("load", () => cleanTree(document.documentElement), { once: true });
            window.setTimeout(() => observer.disconnect(), 10000);
          })();
        `}
      </Script>
    </html>
  );
}
