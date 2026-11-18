import type { DocumentActionComponent, DocumentActionProps } from "sanity";

/** Tipos que se ven en la web: al publicarlos se avisa a la web y a Bing. */
const PUBLIC_TYPES = new Set(["post", "destino", "paquete", "testimonio"]);

/** Espera a que la publicación termine antes de avisar. */
const NOTIFY_DELAY_MS = 4000;

const notifyWebsite = (props: DocumentActionProps) => {
  const doc = (props.draft ?? props.published) as { slug?: { current?: string } } | null;

  window.setTimeout(() => {
    fetch("/api/publicado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: props.type, slug: doc?.slug?.current }),
    }).catch(() => {
      // Si falla, la web se actualiza sola en un minuto y Bing la lee en su próxima visita.
    });
  }, NOTIFY_DELAY_MS);
};

/** El botón "Publicar" de siempre, que además avisa a la web y a Bing. */
export const withPublishNotification = (PublishAction: DocumentActionComponent) => {
  const Wrapped: DocumentActionComponent = (props) => {
    const original = PublishAction(props);
    if (!original || !PUBLIC_TYPES.has(props.type)) return original;

    return {
      ...original,
      onHandle: () => {
        original.onHandle?.();
        notifyWebsite(props);
      },
    };
  };
  Wrapped.action = PublishAction.action;
  return Wrapped;
};
