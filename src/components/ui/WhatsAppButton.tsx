"use client";

import type { ReactNode } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

/** Botón que abre WhatsApp con un mensaje y mide el clic (para usar dentro de páginas de servidor). */
export default function WhatsAppButton({
  message,
  origen,
  className,
  children,
}: {
  message: string;
  origen: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={() => openWhatsApp(message, origen)} className={className}>
      {children}
    </button>
  );
}
