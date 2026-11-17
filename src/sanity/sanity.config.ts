"use client";

import { esESLocale } from "@sanity/locale-es-es";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId, studioBasePath } from "./env";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "garcia-travel",
  title: "Garcia Travel Fantino",
  projectId,
  dataset,
  basePath: studioBasePath,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      title: "Contenido",
      structure: (S) =>
        S.list()
          .title("Contenido de la web")
          .items([
            S.documentTypeListItem("paquete").title("Promociones y paquetes"),
            S.documentTypeListItem("destino").title("Destinos"),
            S.documentTypeListItem("post").title("Blog"),
            S.documentTypeListItem("testimonio").title("Testimonios"),
          ]),
    }),
    esESLocale(),
  ],
});
