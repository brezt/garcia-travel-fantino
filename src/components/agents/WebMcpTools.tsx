"use client";

import { useEffect } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Herramientas WebMCP (https://webmachinelearning.github.io/webmcp/): permiten que un
 * asistente de IA que navega dentro del navegador consulte la web y prepare una
 * cotización sin tener que "leer" la pantalla. Solo se activan en navegadores que
 * soportan navigator.modelContext; en los demás este componente no hace nada.
 * Ninguna herramienta envía datos ni reserva: solo leen información pública o
 * devuelven un enlace de WhatsApp que la persona decide abrir.
 */

type ToolResult = { content: { type: "text"; text: string }[] };

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
};

type ModelContext = {
  registerTool?: (tool: WebMcpTool) => unknown;
  unregisterTool?: (name: string) => void;
  provideContext?: (context: { tools: WebMcpTool[] }) => void;
  clearContext?: () => void;
};

const text = (value: string): ToolResult => ({ content: [{ type: "text", text: value }] });

const fetchMarkdown = async (path: string) => {
  const clean = path.trim().replace(/^https?:\/\/[^/]+/, "").replace(/\.md$/, "").replace(/\/$/, "");
  const url = clean === "" || clean === "/" ? "/index.md" : `${clean.startsWith("/") ? "" : "/"}${clean}.md`;
  const response = await fetch(url, { headers: { Accept: "text/markdown" } });
  if (!response.ok) return `No se encontró la página ${clean || "/"}. Usa la herramienta ver_resumen_agencia para ver las páginas disponibles.`;
  return response.text();
};

const tools: WebMcpTool[] = [
  {
    name: "ver_resumen_agencia",
    description:
      "Devuelve en Markdown el resumen de Garcia Travel Fantino: servicios, destinos, promociones vigentes con precio, artículos y datos de contacto (teléfono, WhatsApp, correo, ubicación).",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () => text(await fetchMarkdown("/")),
  },
  {
    name: "ver_pagina",
    description:
      "Devuelve en Markdown una página de la web. Ejemplos de ruta: /destinos/punta-cana, /paquetes/<nombre>, /nosotros, /contacto, /terminos, /privacidad, /blog.",
    inputSchema: {
      type: "object",
      properties: {
        ruta: { type: "string", description: "Ruta de la página, por ejemplo /destinos/punta-cana" },
      },
      required: ["ruta"],
    },
    annotations: { readOnlyHint: true },
    execute: async (input) => text(await fetchMarkdown(String(input.ruta ?? "/"))),
  },
  {
    name: "preparar_cotizacion_whatsapp",
    description:
      "Prepara un enlace de WhatsApp con un mensaje para pedir una cotización a un asesor de Garcia Travel Fantino. No envía nada: devuelve el enlace para que la persona lo abra.",
    inputSchema: {
      type: "object",
      properties: {
        destino: { type: "string", description: "Destino o paquete de interés" },
        fechas: { type: "string", description: "Fechas aproximadas del viaje" },
        personas: { type: "string", description: "Cantidad de adultos y niños" },
        nombre: { type: "string", description: "Nombre de la persona (opcional)" },
        comentarios: { type: "string", description: "Otros detalles: presupuesto, salida, tipo de hotel" },
      },
      required: ["destino"],
    },
    execute: async (input) => {
      const lines = [
        `Hola Garcia Travel${input.nombre ? `, soy ${input.nombre}` : ""}. Me gustaría cotizar un viaje.`,
        `Destino: ${input.destino}`,
        input.fechas ? `Fechas: ${input.fechas}` : "",
        input.personas ? `Personas: ${input.personas}` : "",
        input.comentarios ? `Detalles: ${input.comentarios}` : "",
      ].filter(Boolean);
      return text(`Abre este enlace para enviar la solicitud por WhatsApp:\n${getWhatsAppUrl(lines.join("\n"))}`);
    },
  },
];

const WebMcpTools = () => {
  useEffect(() => {
    const modelContext = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!modelContext) return;

    try {
      if (modelContext.registerTool) {
        tools.forEach((tool) => modelContext.registerTool?.(tool));
        return () => tools.forEach((tool) => modelContext.unregisterTool?.(tool.name));
      }
      if (modelContext.provideContext) {
        modelContext.provideContext({ tools });
        return () => modelContext.clearContext?.();
      }
    } catch (error) {
      console.warn("[webmcp] No se pudieron registrar las herramientas:", error);
    }
  }, []);

  return null;
};

export default WebMcpTools;
