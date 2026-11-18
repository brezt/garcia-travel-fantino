import { siteConfig } from "@/lib/site";

export type LegalSection = { title: string; body: string[] };

/** Fecha (AAAA-MM-DD) de la última revisión de las páginas legales. */
export const LEGAL_UPDATED_AT = "2026-11-16";
export const LEGAL_UPDATED_LABEL = "16 de noviembre de 2026";

export const privacySections: LegalSection[] = [
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

export const termsSections: LegalSection[] = [
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
