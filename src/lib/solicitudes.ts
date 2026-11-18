export type Solicitud = {
  origen: "formulario" | "buscador";
  nombre?: string;
  telefono?: string;
  email?: string;
  destino?: string;
  fecha?: string;
  personas?: string;
  mensaje?: string;
  website?: string; // campo trampa
};

/**
 * Envía la solicitud al panel /admin. Espera como máximo 3 segundos para no
 * retrasar la apertura de WhatsApp. Devuelve true si quedó guardada.
 */
export const guardarSolicitud = async (solicitud: Solicitud) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch("/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solicitud),
      signal: controller.signal,
      keepalive: true,
    });
    const data = (await response.json().catch(() => ({}))) as { saved?: boolean };
    return Boolean(data.saved);
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
};
