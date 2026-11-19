import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Bus,
  Clock,
  Compass,
  Hotel,
  Luggage,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  PlaneTakeoff,
  SearchCheck,
  ShieldCheck,
  Ship,
  Star,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MissionVisionValues from "@/components/sections/MissionVisionValues";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { aboutIntro, services } from "@/lib/about";
import { siteConfig } from "@/lib/site";
import { getPageJsonLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";

const description = `Conoce a ${siteConfig.name}, agencia de viajes en ${siteConfig.address.locality}, República Dominicana: misión, visión, valores y servicios.`;

export const metadata: Metadata = pageMetadata({
  title: "Sobre nosotros",
  description,
  path: "/nosotros",
  markdownPath: "/nosotros.md",
});

// Un icono por servicio, en el mismo orden que `services` en src/lib/about.ts.
const serviceIcons = [Plane, Hotel, Luggage, Compass, Ship, Bus, ShieldCheck];

const steps = [
  {
    Icon: MessageCircle,
    title: "Nos cuentas tu idea",
    text: "Por WhatsApp, por el formulario o en la oficina: a dónde quieres ir, cuándo y con quién.",
  },
  {
    Icon: SearchCheck,
    title: "Te enviamos opciones",
    text: "Comparamos vuelos, hoteles y paquetes y te mandamos propuestas claras, con precios, para que elijas.",
  },
  {
    Icon: PlaneTakeoff,
    title: "Reservamos y te acompañamos",
    text: "Nos encargamos de las reservas y seguimos a tu lado antes y durante el viaje.",
  },
];

const eyebrow = "text-xs font-bold uppercase tracking-[0.2em] text-brand-teal";
const sectionTitle = "mt-2 font-montserrat text-3xl font-extrabold tracking-tight text-brand-navy md:text-[2.75rem]";

export default function AboutPage() {
  const { address, openingHours } = siteConfig;

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd("AboutPage", "Sobre nosotros", "/nosotros", description)),
        }}
      />
      <Header />
      <section className="bg-brand-navy px-6 pb-16 pt-44 md:pt-48">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">{siteConfig.name}</p>
          <h1 className="mt-2 font-montserrat text-3xl font-extrabold text-white md:text-[2.75rem] tracking-tight">Sobre nosotros</h1>
          <p className="mt-6 text-base leading-8 text-white/80 md:text-lg">{aboutIntro}</p>
          <p className="mt-4 text-base leading-8 text-white/80 md:text-lg">
            Somos una agencia de viajes de {address.locality}, en {address.region}. Atendemos en persona en nuestra
            oficina y por WhatsApp a cualquier hora, para que planear tu viaje sea tan fácil como enviar un mensaje.
          </p>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="bg-brand-slate px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className={eyebrow}>Nuestros servicios</p>
            <h2 className={sectionTitle}>Todo tu viaje en un solo lugar</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-navy/60 md:text-lg">
              Desde un fin de semana en la playa hasta un viaje por el mundo: nos ocupamos de cada parte.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = serviceIcons[index] ?? Plane;
              return (
                <li key={service} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-teal/10">
                    <Icon size={22} className="text-brand-teal" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-brand-navy">{service}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className={eyebrow}>Cómo trabajamos</p>
            <h2 className={sectionTitle}>Tu viaje en tres pasos</h2>
          </div>
          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map(({ Icon, title, text }, index) => (
              <li key={title} className="relative rounded-[2rem] border border-brand-slate bg-brand-slate/50 p-8">
                <span className="absolute right-8 top-8 font-montserrat text-5xl font-extrabold text-brand-teal/15" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-montserrat text-xl font-extrabold tracking-tight text-brand-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/60">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MissionVisionValues />

      {/* Visítanos */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 rounded-[2rem] bg-brand-navy p-8 text-white md:p-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">Visítanos</p>
            <h2 className="mt-2 font-montserrat text-3xl font-extrabold tracking-tight md:text-[2.75rem]">Te esperamos en Fantino</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Pasa por la oficina para planear tu viaje con calma, o escríbenos y te respondemos enseguida.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <WhatsAppButton
                message="Hola Garcia Travel, me gustaría planear un viaje con ustedes."
                origen="nosotros"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-4 text-sm font-bold uppercase tracking-wider text-brand-navy transition-transform hover:scale-[1.03]"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Escríbenos
              </WhatsAppButton>
              <a
                href={siteConfig.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-brand-navy"
              >
                <Star size={18} aria-hidden="true" />
                Déjanos tu reseña
              </a>
            </div>
          </div>
          <ul className="space-y-6 self-center">
            <li className="flex gap-4">
              <MapPin size={22} className="mt-1 shrink-0 text-brand-cyan" aria-hidden="true" />
              <div>
                <p className="font-semibold">Dirección</p>
                <p className="text-white/70">
                  {address.street}, {address.postalCode} {address.locality}, {address.region}, República Dominicana
                </p>
                <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-semibold text-brand-cyan hover:underline">
                  Ver en Google Maps
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock size={22} className="mt-1 shrink-0 text-brand-cyan" aria-hidden="true" />
              <div>
                <p className="font-semibold">Horario</p>
                <p className="text-white/70">{openingHours.label}</p>
                <p className="text-white/70">{openingHours.onlineLabel}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone size={22} className="mt-1 shrink-0 text-brand-cyan" aria-hidden="true" />
              <div>
                <p className="font-semibold">Teléfono y WhatsApp</p>
                <a href={`tel:${siteConfig.phoneHref}`} className="text-white/70 hover:text-white">{siteConfig.phone}</a>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  );
}
