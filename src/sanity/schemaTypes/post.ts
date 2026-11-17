import { Newspaper } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt, slugField } from "./shared";

export const post = defineType({
  name: "post",
  title: "Blog",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumen",
      description: "Una o dos frases para la lista del blog y Google.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(300),
    }),
    imageWithAlt("coverImage", "Foto de portada"),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
            defineField({ name: "caption", title: "Pie de foto", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Más recientes", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "coverImage" } },
});
