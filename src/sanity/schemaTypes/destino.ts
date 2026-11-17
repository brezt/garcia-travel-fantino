import { MapPinned } from "lucide-react";
import { defineType } from "sanity";
import { contentFields, documentsField } from "./shared";

export const destino = defineType({
  name: "destino",
  title: "Destinos",
  type: "document",
  icon: MapPinned,
  fields: [...contentFields, documentsField],
  preview: { select: { title: "title", subtitle: "location", media: "heroImage" } },
});
