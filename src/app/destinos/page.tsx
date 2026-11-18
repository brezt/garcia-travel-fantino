import type { Metadata } from "next";
import ContentListPage from "@/components/seo/ContentListPage";
import { getDestinations } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { getListJsonLd } from "@/lib/structured-data";

export const revalidate = 60;

const title = "Destinos en República Dominicana";
const description =
  "Destinos que cotizamos desde Fantino: Punta Cana, Samaná, Bayahibe y más. Hoteles todo incluido, excursiones y traslados con asesoría personalizada.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/destinos" });

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getListJsonLd("Destinos", "/destinos", description, destinations)),
        }}
      />
      <ContentListPage
        eyebrow="Destinos"
        title={title}
        intro="Playas, naturaleza y resorts todo incluido. Elige tu destino y te preparamos una cotización a la medida con vuelos, hotel, traslados y excursiones."
        pages={destinations}
        emptyText="Muy pronto publicaremos nuestros destinos. Mientras tanto, escríbenos y te ayudamos a planificar tu viaje."
        whatsappMessage="Hola Garcia Travel, quiero cotizar un viaje a otro destino."
      />
    </>
  );
}
