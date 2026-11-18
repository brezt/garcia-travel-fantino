import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site";
import { getPageJsonLd } from "@/lib/structured-data";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const description = `Cotiza tu viaje con ${siteConfig.name}: WhatsApp y teléfono ${siteConfig.phone}, correo ${siteConfig.email}, en ${siteConfig.address.locality}, República Dominicana.`;

export const metadata: Metadata = {
  title: "Contacto",
  description,
  alternates: { canonical: "/contacto", types: { "text/markdown": "/contacto.md" } },
};

const channels = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.phone,
    href: getWhatsAppUrl("Hola Garcia Travel, me gustaría cotizar un viaje."),
  },
  { Icon: Phone, label: "Teléfono", value: siteConfig.phone, href: `tel:${siteConfig.phoneHref}` },
  { Icon: Mail, label: "Correo", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    Icon: MapPin,
    label: "Ubicación",
    value: `${siteConfig.address.locality}, ${siteConfig.address.region}, República Dominicana`,
    href: siteConfig.mapsUrl,
  },
];

export default function ContactPage() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd("ContactPage", "Contacto", "/contacto", description)),
        }}
      />
      <Header />
      <section className="bg-brand-navy px-6 pb-16 pt-36">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <h1 className="font-montserrat text-4xl font-black uppercase text-white md:text-5xl">Contacto</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/80">
            Cuéntanos a dónde quieres ir y te preparamos una cotización personalizada. La forma más rápida es WhatsApp.
          </p>
          <address className="mt-10 grid grid-cols-1 gap-4 not-italic sm:grid-cols-2">
            {channels.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 text-white transition-colors hover:bg-white/20"
              >
                <Icon size={22} className="shrink-0 text-brand-gold" />
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-white/60">{label}</span>
                  <span className="text-sm font-medium">{value}</span>
                </span>
              </a>
            ))}
          </address>
        </div>
      </section>
      <ContactForm />
      <Footer />
    </main>
  );
}
