import { markdownForPath } from "@/lib/markdown";
import { getWhatsAppUrl } from "@/lib/whatsapp";

/**
 * Herramientas para agentes de IA, compartidas por el servidor MCP (/mcp).
 * Todas son de solo lectura: leen información pública o arman un enlace de
 * WhatsApp que la persona decide abrir. Nada se envía ni se reserva.
 */

export type AgentTool = {
  name: string;
  title: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, { type: "string"; description: string }>;
    required?: string[];
  };
  annotations: { readOnlyHint: boolean; openWorldHint: boolean };
  run: (input: Record<string, unknown>) => Promise<string>;
};

const pathToSegments = (path: string) =>
  path
    .trim()
    .replace(/^https?:\/\/[^/]+/, "")
    .replace(/[?#].*$/, "")
    .replace(/\.md$/, "")
    .split("/")
    .filter(Boolean);

export const agentTools: AgentTool[] = [
  {
    name: "ver_resumen_agencia",
    title: "Resumen de la agencia",
    description:
      "Devuelve en Markdown el resumen de Garcia Travel Fantino: servicios, destinos, promociones vigentes con precio, artículos y datos de contacto (teléfono, WhatsApp, correo, ubicación).",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: async () => (await markdownForPath([])) ?? "",
  },
  {
    name: "ver_pagina",
    title: "Ver una página",
    description:
      "Devuelve en Markdown una página de la web. Ejemplos de ruta: /destinos/punta-cana, /paquetes/<nombre>, /nosotros, /contacto, /terminos, /privacidad, /blog.",
    inputSchema: {
      type: "object",
      properties: {
        ruta: { type: "string", description: "Ruta de la página, por ejemplo /destinos/punta-cana" },
      },
      required: ["ruta"],
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: async (input) => {
      const ruta = String(input.ruta ?? "/");
      return (
        (await markdownForPath(pathToSegments(ruta))) ??
        `No se encontró la página ${ruta}. Usa ver_resumen_agencia para ver las páginas disponibles.`
      );
    },
  },
  {
    name: "preparar_cotizacion_whatsapp",
    title: "Preparar cotización por WhatsApp",
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
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: async (input) => {
      const lines = [
        `Hola Garcia Travel${input.nombre ? `, soy ${input.nombre}` : ""}. Me gustaría cotizar un viaje.`,
        `Destino: ${input.destino}`,
        input.fechas ? `Fechas: ${input.fechas}` : "",
        input.personas ? `Personas: ${input.personas}` : "",
        input.comentarios ? `Detalles: ${input.comentarios}` : "",
      ].filter(Boolean);
      return `Abre este enlace para enviar la solicitud por WhatsApp:\n${getWhatsAppUrl(lines.join("\n"))}`;
    },
  },
];

export const MCP_SERVER_INFO = {
  name: "garcia-travel-fantino",
  title: "Garcia Travel Fantino",
  version: "1.0.0",
};

export const MCP_PROTOCOL_VERSION = "2025-06-18";
