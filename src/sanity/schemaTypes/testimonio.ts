import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

export const testimonio = defineType({
  name: "testimonio",
  title: "Testimonios",
  type: "document",
  icon: Star,
  fields: [
    defineField({ name: "name", title: "Nombre del cliente", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "trip", title: "Viaje", description: "Ejemplo: Viaje a Punta Cana", type: "string" }),
    defineField({ name: "content", title: "Opinión", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: "highlight",
      title: "Destacar (tarjeta grande del centro)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Orden",
      description: "Los números más bajos salen primero. En la portada se muestran tres.",
      type: "number",
    }),
  ],
  orderings: [{ title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "trip" } },
});
