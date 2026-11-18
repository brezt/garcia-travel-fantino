"use client";

import { esESLocale } from "@sanity/locale-es-es";
import { Inbox } from "lucide-react";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId, studioBasePath } from "./env";
import { schemaTypes } from "./schemaTypes";
import { withPublishNotification } from "./actions";

export default defineConfig({
  name: "garcia-travel",
  title: "Garcia Travel Fantino",
  projectId,
  dataset,
  basePath: studioBasePath,
  schema: {
    types: schemaTypes,
    // Las solicitudes solo llegan desde la web: no se crean a mano en el panel.
    templates: (templates) => templates.filter((template) => template.schemaType !== "solicitud"),
  },
  document: {
    newDocumentOptions: (options) => options.filter((option) => option.templateId !== "solicitud"),
    // Al publicar, la web se actualiza al momento y se avisa a Bing (IndexNow).
    actions: (actions) =>
      actions.map((action) => (action.action === "publish" ? withPublishNotification(action) : action)),
  },
  plugins: [
    structureTool({
      title: "Contenido",
      structure: (S) =>
        S.list()
          .title("Contenido de la web")
          .items([
            S.listItem()
              .title("Solicitudes de clientes")
              .icon(Inbox)
              .child(
                S.documentTypeList("solicitud")
                  .title("Solicitudes de clientes")
                  .defaultOrdering([{ field: "recibida", direction: "desc" }])
                  .initialValueTemplates([])
              ),
            S.divider(),
            S.documentTypeListItem("paquete").title("Promociones y paquetes"),
            S.documentTypeListItem("destino").title("Destinos"),
            S.documentTypeListItem("post").title("Blog"),
            S.documentTypeListItem("testimonio").title("Testimonios"),
          ]),
    }),
    esESLocale(),
  ],
});
