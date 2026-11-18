import type { Metadata } from "next";
import ContentListPage from "@/components/seo/ContentListPage";
import { getActivePackages } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { getListJsonLd } from "@/lib/structured-data";

export const revalidate = 60;

const title = "Paquetes turísticos y promociones";
const description =
  "Paquetes turísticos y promociones vigentes de Garcia Travel Fantino: viajes nacionales e internacionales con vuelos, hotel y traslados. Cotiza por WhatsApp.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/paquetes" });

export default async function PackagesPage() {
  const packages = await getActivePackages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getListJsonLd("Paquetes", "/paquetes", description, packages)),
        }}
      />
      <ContentListPage
        eyebrow="Salidas vigentes"
        title={title}
        intro="Estas son nuestras promociones con cupos disponibles. Si buscas otra fecha u otro destino, escríbenos y armamos el paquete a tu medida."
        pages={packages}
        emptyText="En este momento no hay promociones publicadas. Escríbenos por WhatsApp y te contamos las próximas salidas."
        whatsappMessage="Hola Garcia Travel, quiero saber qué paquetes y promociones tienen disponibles."
      />
    </>
  );
}
