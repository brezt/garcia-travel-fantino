import { defineArrayMember, defineField } from "sanity";

export const imageWithAlt = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Texto alternativo",
        description: "Describe la foto en una frase (ayuda a Google y a personas con lectores de pantalla).",
        type: "string",
      }),
    ],
  });

export const slugField = defineField({
  name: "slug",
  title: "Dirección de la página",
  description: "Se genera a partir del título. Ejemplo: punta-cana",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
});

export const sectionsField = defineField({
  name: "sections",
  title: "Bloques de texto",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "section",
      title: "Bloque",
      fields: [
        defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "body", title: "Texto", type: "text", rows: 4, validation: (rule) => rule.required() }),
      ],
    }),
  ],
});

export const faqField = defineField({
  name: "faq",
  title: "Preguntas frecuentes",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "faqItem",
      title: "Pregunta",
      fields: [
        defineField({ name: "question", title: "Pregunta", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "answer", title: "Respuesta", type: "text", rows: 3, validation: (rule) => rule.required() }),
      ],
      preview: { select: { title: "question" } },
    }),
  ],
});

export const documentsField = defineField({
  name: "documents",
  title: "Documentos descargables",
  description: "PDF o imágenes que el cliente puede descargar desde la página (itinerario, condiciones, flyer). Son públicos.",
  type: "array",
  of: [
    defineArrayMember({
      type: "file",
      name: "documento",
      title: "Documento",
      fields: [
        defineField({
          name: "title",
          title: "Nombre que verá el cliente",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
});

export const contentFields = [
  defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
  slugField,
  defineField({
    name: "shortTitle",
    title: "Título corto",
    description: "Para botones y tarjetas. Ejemplo: Punta Cana",
    type: "string",
  }),
  defineField({
    name: "eyebrow",
    title: "Etiqueta superior",
    description: "Texto pequeño sobre el título. Ejemplo: Destino todo incluido",
    type: "string",
  }),
  defineField({ name: "location", title: "Ubicación", type: "string" }),
  defineField({
    name: "description",
    title: "Resumen",
    description: "Una o dos frases. Se usa en Google y al compartir en redes.",
    type: "text",
    rows: 3,
    validation: (rule) => rule.required().max(300),
  }),
  imageWithAlt("heroImage", "Foto principal"),
  defineField({
    name: "highlights",
    title: "Puntos destacados",
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  }),
  sectionsField,
  faqField,
  defineField({
    name: "whatsappMessage",
    title: "Mensaje de WhatsApp",
    description: "Texto que se escribe solo cuando el cliente pulsa el botón de WhatsApp.",
    type: "text",
    rows: 3,
  }),
];
