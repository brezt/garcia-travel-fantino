import { Inbox } from "lucide-react";
import { defineField, defineType } from "sanity";

export const ESTADOS_SOLICITUD = [
  { title: "Nueva", value: "nueva" },
  { title: "Contactado", value: "contactado" },
  { title: "Cotización enviada", value: "cotizada" },
  { title: "Reservó", value: "reservo" },
  { title: "Descartada", value: "descartada" },
];

/**
 * Solicitudes que llegan desde el formulario de contacto de la web.
 * Las crea el servidor (/api/solicitudes) con un _id que empieza por
 * «solicitudes.», así no se pueden leer desde la API pública del dataset:
 * solo las ve quien entra al panel.
 */
export const solicitud = defineType({
  name: "solicitud",
  title: "Solicitudes de clientes",
  type: "document",
  icon: Inbox,
  fields: [
    defineField({
      name: "estado",
      title: "Estado",
      type: "string",
      options: { list: ESTADOS_SOLICITUD, layout: "radio", direction: "horizontal" },
      initialValue: "nueva",
    }),
    defineField({ name: "notas", title: "Notas internas", description: "Solo las ve el equipo.", type: "text", rows: 3 }),
    defineField({ name: "recibida", title: "Recibida", type: "datetime", readOnly: true }),
    defineField({ name: "origen", title: "Desde", type: "string", readOnly: true }),
    defineField({ name: "nombre", title: "Nombre", type: "string", readOnly: true }),
    defineField({ name: "telefono", title: "Teléfono", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "destino", title: "Destino", type: "string", readOnly: true }),
    defineField({ name: "fecha", title: "Fecha estimada", type: "string", readOnly: true }),
    defineField({ name: "personas", title: "Personas", type: "string", readOnly: true }),
    defineField({ name: "mensaje", title: "Mensaje", type: "text", rows: 4, readOnly: true }),
  ],
  orderings: [{ title: "Más recientes", name: "recibidaDesc", by: [{ field: "recibida", direction: "desc" }] }],
  preview: {
    select: { nombre: "nombre", estado: "estado", recibida: "recibida", telefono: "telefono" },
    prepare: ({ nombre, estado, recibida, telefono }) => {
      const etiqueta = ESTADOS_SOLICITUD.find((item) => item.value === estado)?.title ?? "Nueva";
      const fecha = recibida
        ? new Intl.DateTimeFormat("es-DO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(recibida))
        : "";
      return { title: nombre || "Sin nombre", subtitle: [etiqueta, fecha, telefono].filter(Boolean).join(" · ") };
    },
  },
});
