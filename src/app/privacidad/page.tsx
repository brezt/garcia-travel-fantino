import type { Metadata } from "next";
import LegalPage from "@/components/seo/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo ${siteConfig.name} recopila, usa y protege los datos personales de sus clientes y visitantes.`,
  alternates: { canonical: "/privacidad" },
};

const sections = [
  {
    title: "Quiénes somos",
    body: [
      `${siteConfig.legalName} es una agencia de viajes ubicada en ${siteConfig.address.locality}, provincia ${siteConfig.address.region}, República Dominicana. Para cualquier consulta sobre tus datos puedes escribirnos a ${siteConfig.email} o llamarnos al ${siteConfig.phone}.`,
    ],
  },
  {
    title: "Qué datos recopilamos",
    body: [
      "Cuando nos escribes desde el formulario de contacto, el buscador de viajes o los botones de WhatsApp, recibimos los datos que tú mismo nos envías: nombre, teléfono, correo electrónico, fechas y destino de interés, cantidad de personas y el mensaje que redactes.",
      "Para cotizar o reservar un viaje podemos pedirte además datos de los viajeros, como nombres completos, fechas de nacimiento y documentos de identidad o pasaporte, solo en la medida en que el proveedor del servicio lo exija.",
    ],
  },
  {
    title: "Para qué los usamos",
    body: [
      "Usamos tus datos para responder tus consultas, preparar cotizaciones, gestionar reservas con aerolíneas, hoteles y demás proveedores, y darte asistencia antes y durante el viaje.",
      "Si nos das permiso, también podemos enviarte promociones. Puedes pedir que dejemos de hacerlo en cualquier momento.",
    ],
  },
  {
    title: "Con quién los compartimos",
    body: [
      "Solo compartimos tus datos con los proveedores necesarios para prestar el servicio que solicitas (aerolíneas, hoteles, operadores de excursiones, aseguradoras de viaje) o cuando la ley lo exija. No vendemos tus datos a terceros.",
      "Las conversaciones por WhatsApp se rigen además por la política de privacidad de WhatsApp (Meta).",
    ],
  },
  {
    title: "Enlaces de afiliados",
    body: [
      "Algunos enlaces de esta web pueden llevar a sitios de reservas de terceros con los que tenemos acuerdos de afiliación. Si reservas a través de ellos, podemos recibir una comisión sin costo adicional para ti. Esos sitios tienen sus propias políticas de privacidad.",
    ],
  },
  {
    title: "Cuánto tiempo los guardamos",
    body: [
      "Conservamos tus datos mientras sean necesarios para atender tu solicitud o reserva y durante los plazos que exijan las obligaciones legales, fiscales o contables aplicables.",
    ],
  },
  {
    title: "Tus derechos",
    body: [
      "De acuerdo con la Ley 172-13 sobre protección de datos de carácter personal de la República Dominicana, puedes solicitar acceso, rectificación, actualización o eliminación de tus datos escribiendo a " +
        `${siteConfig.email}. Te responderemos en un plazo razonable.`,
    ],
  },
  {
    title: "Cambios en esta política",
    body: [
      "Podemos actualizar esta política. La fecha de la última actualización aparece al inicio de esta página.",
    ],
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Política de privacidad" updatedAt="16 de noviembre de 2026" sections={sections} />;
}
