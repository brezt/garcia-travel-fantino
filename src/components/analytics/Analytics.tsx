"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  GA_ID,
  META_PIXEL_ID,
  analyticsEnabled,
  isUntrackedPath,
  isWhatsAppUrl,
  trackMetaPageView,
  trackWhatsAppClick,
} from "@/lib/analytics";

/**
 * Carga Google Analytics y el píxel de Meta cuando sus IDs están configurados.
 * Además cuenta los clics en cualquier enlace a WhatsApp de la web.
 * No se carga en el panel /admin.
 */
export default function Analytics() {
  const pathname = usePathname();
  const lastPixelPath = useRef<string | null>(null);

  // Píxel de Meta: una visita por cada cambio de página (la primera la envía el script inicial).
  useEffect(() => {
    if (!META_PIXEL_ID || isUntrackedPath(pathname)) return;
    if (lastPixelPath.current !== null && lastPixelPath.current !== pathname) {
      trackMetaPageView();
    }
    lastPixelPath.current = pathname;
  }, [pathname]);

  // Clics en enlaces <a href="https://api.whatsapp.com/..."> de cualquier página.
  useEffect(() => {
    if (!analyticsEnabled) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || !isWhatsAppUrl(link.href)) return;
      trackWhatsAppClick(link.dataset.origen || "enlace");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!analyticsEnabled || isUntrackedPath(pathname)) return null;

  return (
    <>
      {GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
