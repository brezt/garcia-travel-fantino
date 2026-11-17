import { Plane } from "lucide-react";
import { defineField, defineType } from "sanity";
import { contentFields, documentsField, imageWithAlt } from "./shared";

export const paquete = defineType({
  name: "paquete",
  title: "Promociones y paquetes",
  type: "document",
  icon: Plane,
  groups: [
    { name: "promo", title: "Promoción", default: true },
    { name: "contenido", title: "Contenido" },
  ],
  fields: [
    ...contentFields.map((field) => ({ ...field, group: "contenido" })),
    defineField({
      name: "featured",
      title: "Mostrar como promoción destacada en la portada",
      description: "Si hay varias marcadas, sale la que vence primero.",
      type: "boolean",
      initialValue: false,
      group: "promo",
    }),
    defineField({
      name: "validUntil",
      title: "Válida hasta",
      description: "Al día siguiente la promoción se oculta sola de la portada.",
      type: "date",
      group: "promo",
    }),
    defineField({
      name: "duration",
      title: "Fechas del viaje",
      description: "Ejemplo: 07 al 11 de agosto 2026",
      type: "string",
      group: "promo",
    }),
    defineField({
      name: "price",
      title: "Precio",
      description: "Ejemplo: USD 850 p/p en DBL-TPL",
      type: "string",
      group: "promo",
    }),
    { ...imageWithAlt("promoImage", "Flyer de la promoción", "Imagen horizontal que se muestra grande en la portada. Si no hay, se usa la foto principal."), group: "promo" },
    { ...documentsField, group: "promo" },
  ],
  orderings: [
    { title: "Vence primero", name: "validUntilAsc", by: [{ field: "validUntil", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "validUntil", media: "promoImage", featured: "featured", fallbackMedia: "heroImage" },
    prepare: ({ title, subtitle, media, featured, fallbackMedia }) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: subtitle ? `Válida hasta ${subtitle}` : "Sin fecha de vencimiento",
      media: media ?? fallbackMedia,
    }),
  },
});
