import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_CACHE_TAG } from "@/sanity/client";

/**
 * Sanity llama a esta dirección cada vez que se publica algo en el panel.
 * La clave compartida va en la variable SANITY_REVALIDATE_SECRET de Hostinger
 * y en el webhook de sanity.io/manage (nunca en el código).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return Response.json({ message: "Falta SANITY_REVALIDATE_SECRET" }, { status: 500 });
  }

  try {
    const { isValidSignature } = await parseBody(request, secret, true);

    if (!isValidSignature) {
      return Response.json({ message: "Firma no válida" }, { status: 401 });
    }

    revalidateTag(SANITY_CACHE_TAG, { expire: 0 });
    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("[revalidate]", error);
    return Response.json({ message: "Error al actualizar" }, { status: 500 });
  }
}
