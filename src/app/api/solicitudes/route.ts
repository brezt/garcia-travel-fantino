import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Guarda en el panel /admin cada solicitud enviada desde el formulario de contacto.
 *
 * Necesita la variable SANITY_API_WRITE_TOKEN en Hostinger (token con permiso
 * «Editor» creado en sanity.io/manage → API → Tokens). Sin ella responde 503 y la
 * web sigue abriendo WhatsApp como antes.
 */

const LIMITES = { nombre: 120, telefono: 40, email: 160, destino: 120, fecha: 60, personas: 60, mensaje: 2000 } as const;
type Campo = keyof typeof LIMITES;

// Límite sencillo contra envíos repetidos: 5 solicitudes cada 10 minutos por IP.
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const intentos = new Map<string, number[]>();

const superaLimite = (ip: string) => {
  const ahora = Date.now();
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  intentos.set(ip, recientes);
  if (intentos.size > 5000) intentos.clear();
  return recientes.length > MAX_POR_VENTANA;
};

const limpiar = (valor: unknown, max: number) =>
  typeof valor === "string" ? valor.replace(/\s+/g, " ").trim().slice(0, max) : "";

export async function POST(request: NextRequest) {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    return Response.json({ saved: false, message: "Falta SANITY_API_WRITE_TOKEN" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ saved: false, message: "Datos no válidos" }, { status: 400 });
  }

  // Campo trampa: las personas no lo ven, los robots lo rellenan.
  if (limpiar(body.website, 200)) {
    return Response.json({ saved: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida";
  if (superaLimite(ip)) {
    return Response.json({ saved: false, message: "Demasiados envíos, intenta más tarde" }, { status: 429 });
  }

  const datos = Object.fromEntries(
    (Object.keys(LIMITES) as Campo[]).map((campo) => [
      campo,
      campo === "mensaje"
        ? (typeof body.mensaje === "string" ? body.mensaje.trim().slice(0, LIMITES.mensaje) : "")
        : limpiar(body[campo], LIMITES[campo]),
    ])
  ) as Record<Campo, string>;

  if (!datos.nombre || (!datos.telefono && !datos.email)) {
    return Response.json({ saved: false, message: "Faltan nombre y un teléfono o email" }, { status: 400 });
  }

  const origen = body.origen === "buscador" ? "Buscador de viajes" : "Formulario de contacto";

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  try {
    await client.create({
      // El punto en el _id hace que el documento no sea público.
      _id: `solicitudes.${randomUUID()}`,
      _type: "solicitud",
      estado: "nueva",
      recibida: new Date().toISOString(),
      origen,
      ...datos,
    });
    return Response.json({ saved: true });
  } catch (error) {
    console.error("[solicitudes]", error);
    return Response.json({ saved: false, message: "No se pudo guardar" }, { status: 502 });
  }
}
