import type { Metadata } from "next";
import LegalPage from "@/components/seo/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Condiciones de uso de la web y de contratación de servicios de viaje con ${siteConfig.name}.`,
  alternates: { canonical: "/terminos" },
};

const sections = [
  {
    title: "Sobre esta web",
    body: [
      `Esta web pertenece a ${siteConfig.legalName}, agencia de viajes en ${siteConfig.address.locality}, República Dominicana. Su objetivo es informar sobre destinos, paquetes y servicios, y facilitar el contacto con nuestros asesores.`,
    ],
  },
  {
    title: "Precios y disponibilidad",
    body: [
      "Los precios, fechas y condiciones publicados son informativos y pueden cambiar sin previo aviso según la disponibilidad de aerolíneas, hoteles y demás proveedores. Una reserva solo queda confirmada cuando la agencia la confirma por escrito y se cumplen las condiciones de pago acordadas.",
      "Salvo que se indique lo contrario, los precios se expresan por persona y en la moneda indicada en cada oferta.",
    ],
  },
  {
    title: "Pagos, cambios y cancelaciones",
    body: [
      "Las formas de pago, los plazos y las políticas de cambio o cancelación dependen de cada proveedor y se informan antes de confirmar la reserva. Algunas tarifas no son reembolsables.",
      "Los cargos que cobren los proveedores por cambios o cancelaciones se trasladan al cliente.",
    ],
  },
  {
    title: "Documentación de viaje",
    body: [
      "Cada viajero es responsable de contar con pasaporte vigente, visas, permisos, vacunas y cualquier otro requisito del destino y de los países de tránsito. La agencia puede orientarte, pero no garantiza la aprobación de visas ni permisos.",
    ],
  },
  {
    title: "Responsabilidad",
    body: [
      "La agencia actúa como intermediaria entre el cliente y los proveedores de los servicios (aerolíneas, hoteles, operadores, aseguradoras). Cada proveedor es responsable de la prestación de su servicio conforme a sus propias condiciones.",
      "Recomendamos contratar un seguro de viaje que cubra asistencia médica, cancelaciones y equipaje.",
    ],
  },
  {
    title: "Enlaces de terceros",
    body: [
      "Esta web puede incluir enlaces a sitios de terceros, incluidos sitios de reservas con los que tenemos acuerdos de afiliación. Las reservas hechas directamente en esos sitios se rigen por sus propios términos.",
    ],
  },
  {
    title: "Contacto",
    body: [
      `Para cualquier duda sobre estos términos escríbenos a ${siteConfig.email} o llámanos al ${siteConfig.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return <LegalPage title="Términos y condiciones" updatedAt="16 de noviembre de 2026" sections={sections} />;
}
