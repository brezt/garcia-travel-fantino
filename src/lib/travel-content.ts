import { getSiteUrl, siteConfig } from "@/lib/site";

export type ContentPage = {
  slug: string;
  type: "destination" | "package";
  title: string;
  shortTitle: string;
  metaTitle: string;
  description: string;
  heroImage: string;
  imageAlt: string;
  eyebrow: string;
  location: string;
  duration?: string;
  price?: string;
  /** Último día de la promoción (AAAA-MM-DD). Después de esta fecha se oculta de la portada. */
  validUntil?: string;
  highlights: string[];
  sections: {
    title: string;
    body: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  whatsappMessage: string;
};

export const destinations: ContentPage[] = [
  {
    slug: "punta-cana",
    type: "destination",
    title: "Viajes a Punta Cana desde Fantino",
    shortTitle: "Punta Cana",
    metaTitle: "Viajes a Punta Cana desde Fantino | Garcia Travel Fantino",
    description:
      "Cotiza paquetes a Punta Cana desde Fantino con hoteles todo incluido, vuelos, traslados y asesoría personalizada de Garcia Travel Fantino.",
    heroImage:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop",
    imageAlt: "Playa tropical de Punta Cana con arena blanca y agua cristalina",
    eyebrow: "Destino todo incluido",
    location: "Punta Cana, República Dominicana",
    highlights: [
      "Resorts todo incluido",
      "Playas de arena blanca",
      "Opciones para parejas y familias",
      "Asesoría desde Fantino",
    ],
    sections: [
      {
        title: "Paquetes diseñados para descansar",
        body: "Punta Cana es una de las mejores opciones para quienes buscan playa, comodidad y hoteles con servicio todo incluido. En Garcia Travel Fantino te ayudamos a comparar resorts, fechas, vuelos y condiciones para elegir una opción que se ajuste a tu presupuesto.",
      },
      {
        title: "Qué podemos coordinar",
        body: "Podemos orientarte con alojamiento, traslados, excursiones, seguros de viaje y servicios adicionales para que tu experiencia sea clara desde el primer contacto.",
      },
    ],
    faq: [
      {
        question: "¿Puedo cotizar Punta Cana por WhatsApp?",
        answer:
          "Sí. Puedes enviar tu fecha estimada, cantidad de personas y tipo de habitación para recibir asistencia personalizada.",
      },
      {
        question: "¿Hay opciones para familias?",
        answer:
          "Sí. Podemos buscar resorts familiares con actividades para niños, piscinas, restaurantes y entretenimiento.",
      },
    ],
    whatsappMessage:
      "Hola Garcia Travel, quiero cotizar un viaje a Punta Cana desde Fantino. Me gustaría recibir opciones de hoteles todo incluido, vuelos, traslados y disponibilidad.",
  },
  {
    slug: "bayahibe",
    type: "destination",
    title: "Viajes a Bayahibe desde Fantino",
    shortTitle: "Bayahibe",
    metaTitle: "Viajes a Bayahibe desde Fantino | Garcia Travel Fantino",
    description:
      "Reserva paquetes a Bayahibe desde Fantino con asesoría para hoteles, excursiones, traslados y experiencias de playa en República Dominicana.",
    heroImage:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2000&auto=format&fit=crop",
    imageAlt: "Costa de Bayahibe con mar azul y ambiente tropical",
    eyebrow: "Destino de playa",
    location: "Bayahibe, República Dominicana",
    highlights: [
      "Aguas cristalinas",
      "Excursiones a Isla Saona",
      "Ambiente tranquilo",
      "Hoteles para parejas y familias",
    ],
    sections: [
      {
        title: "Un destino tranquilo y natural",
        body: "Bayahibe es ideal para quienes quieren una experiencia de playa con aguas cristalinas, buen ambiente y acceso a excursiones memorables como Isla Saona.",
      },
      {
        title: "Planificación con soporte local",
        body: "Desde Fantino te ayudamos a organizar fecha, hospedaje, traslados y recomendaciones para que tengas claridad antes de reservar.",
      },
    ],
    faq: [
      {
        question: "¿Bayahibe es buena opción para viajar en pareja?",
        answer:
          "Sí. Es un destino muy recomendado para parejas por su ambiente tranquilo, playas y excursiones.",
      },
      {
        question: "¿Se puede incluir excursión a Isla Saona?",
        answer:
          "Sí. Podemos orientarte con paquetes o excursiones disponibles según fecha y cupos.",
      },
    ],
    whatsappMessage:
      "Hola Garcia Travel, quiero cotizar un viaje a Bayahibe desde Fantino. Me interesa conocer hoteles, traslados, excursiones y disponibilidad.",
  },
  {
    slug: "samana",
    type: "destination",
    title: "Viajes a Samaná desde Fantino",
    shortTitle: "Samaná",
    metaTitle: "Viajes a Samaná desde Fantino | Garcia Travel Fantino",
    description:
      "Cotiza viajes a Samaná desde Fantino con opciones de playa, naturaleza, excursiones y asistencia personalizada de Garcia Travel Fantino.",
    heroImage:
      "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Paisaje natural de Samaná en República Dominicana",
    eyebrow: "Naturaleza y playa",
    location: "Samaná, República Dominicana",
    highlights: [
      "Playas y naturaleza",
      "Excursiones memorables",
      "Temporada de ballenas",
      "Opciones para escapadas",
    ],
    sections: [
      {
        title: "Naturaleza dominicana en su mejor versión",
        body: "Samaná combina playas, montañas, excursiones y experiencias naturales. Es una buena alternativa para viajeros que quieren algo diferente a un resort tradicional.",
      },
      {
        title: "Asesoría para elegir la mejor fecha",
        body: "Te ayudamos a revisar temporada, disponibilidad, alojamiento y actividades para planificar un viaje con buena relación entre experiencia y presupuesto.",
      },
    ],
    faq: [
      {
        question: "¿Cuándo es buena temporada para visitar Samaná?",
        answer:
          "Depende del tipo de experiencia que busques. Podemos orientarte según playa, excursiones o temporada de ballenas.",
      },
      {
        question: "¿Garcia Travel Fantino ayuda con excursiones?",
        answer:
          "Sí. Podemos ayudarte a revisar opciones disponibles para complementar tu viaje.",
      },
    ],
    whatsappMessage:
      "Hola Garcia Travel, quiero cotizar un viaje a Samaná desde Fantino. Me gustaría recibir opciones de hoteles, excursiones y fechas disponibles.",
  },
];

export const packages: ContentPage[] = [
  {
    slug: "feria-de-las-flores-medellin-2026",
    type: "package",
    title: "Feria de las Flores en Medellín 2026",
    shortTitle: "Feria de las Flores",
    metaTitle: "Feria de las Flores Medellín 2026 | Garcia Travel Fantino",
    description:
      "Asegura tu cupo para la Feria de las Flores en Medellín 2026 con Garcia Travel Fantino. Viaje del 7 al 11 de agosto con boleto aéreo, hotel, traslados, excursiones y seguro.",
    heroImage: siteConfig.promoImagePath,
    imageAlt: "Promoción Feria de las Flores Medellín 2026 de Garcia Travel Fantino",
    eyebrow: "Promoción destacada",
    location: "Medellín, Colombia",
    duration: "07 al 11 de agosto 2026",
    price: "USD 850 p/p en DBL-TPL",
    validUntil: "2026-08-11",
    highlights: [
      "Boleto aéreo con equipaje en bodega",
      "Hotel de lujo en El Poblado",
      "Traslados incluidos",
      "2 excursiones principales",
      "Experiencia en Yate Majestic",
      "Seguro de viajes",
    ],
    sections: [
      {
        title: "Vive la fiesta más colorida de Colombia",
        body: "La Feria de las Flores es la celebración por excelencia de Medellín. Un espectáculo lleno de tradición, música, cultura y los icónicos silleteros que llenan la ciudad de vida y alegría.",
      },
      {
        title: "Una experiencia completa",
        body: "El paquete está pensado para que disfrutes Medellín con alojamiento, traslados, excursiones principales, experiencia en yate y seguro de viajes. Es una oportunidad ideal para celebrar y conectar con la esencia de Colombia.",
      },
    ],
    faq: [
      {
        question: "¿Qué fecha tiene el viaje a Medellín?",
        answer:
          "El viaje está programado del 7 al 11 de agosto de 2026.",
      },
      {
        question: "¿Cómo puedo asegurar mi cupo?",
        answer:
          "Puedes escribir por WhatsApp para confirmar disponibilidad, condiciones de pago y requisitos de reserva.",
      },
    ],
    whatsappMessage:
      "Hola Garcia Travel, quiero asegurar mi cupo para la Feria de las Flores en Medellín 2026 del 07 al 11 de agosto. Me interesa el paquete de USD 850 p/p en DBL-TPL. ¿Podrían confirmarme disponibilidad y forma de pago?",
  },
];

export const contentPages = [...destinations, ...packages];

// El sitio es estático: la fecha se evalúa al compilar, así que una promoción
// vencida desaparece en la siguiente publicación.
export const isExpired = (page: ContentPage, now = new Date()) =>
  page.validUntil ? new Date(`${page.validUntil}T23:59:59-04:00`) < now : false;

export const activePackages = packages.filter((travelPackage) => !isExpired(travelPackage));

export const featuredPackageSlug = "feria-de-las-flores-medellin-2026";

export const isFeaturedPromotionActive = activePackages.some(
  (travelPackage) => travelPackage.slug === featuredPackageSlug
);

export const resolveContentImageUrl = (image: string) =>
  image.startsWith("http://") || image.startsWith("https://")
    ? image
    : getSiteUrl(image);

export const getDestinationBySlug = (slug: string) =>
  destinations.find((destination) => destination.slug === slug);

export const getPackageBySlug = (slug: string) =>
  packages.find((travelPackage) => travelPackage.slug === slug);

export const getContentJsonLd = (page: ContentPage) => ({
  "@context": "https://schema.org",
  "@type": page.type === "package" ? "TouristTrip" : "TouristDestination",
  name: page.title,
  description: page.description,
  url: getSiteUrl(
    page.type === "package"
      ? `/paquetes/${page.slug}`
      : `/destinos/${page.slug}`
  ),
  image: resolveContentImageUrl(page.heroImage),
  provider: {
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: getSiteUrl(),
    telephone: siteConfig.phone,
  },
});
