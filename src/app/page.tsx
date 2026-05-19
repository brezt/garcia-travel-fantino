import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BookingBar from "@/components/sections/BookingBar";
import FeaturedPromotion from "@/components/sections/FeaturedPromotion";
import Benefits from "@/components/sections/Benefits";
import Destinations from "@/components/sections/Destinations";
import Packages from "@/components/sections/Packages";
import Experience from "@/components/sections/Experience";
import MissionVisionValues from "@/components/sections/MissionVisionValues";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import { getSiteUrl, siteConfig } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": getSiteUrl("#travel-agency"),
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  description: siteConfig.description,
  url: getSiteUrl(),
  logo: getSiteUrl(siteConfig.logoPath),
  image: getSiteUrl(siteConfig.promoImagePath),
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    addressCountry: siteConfig.address.country,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Republica Dominicana",
    },
    {
      "@type": "Place",
      name: "Fantino",
    },
  ],
  sameAs: [siteConfig.instagram, siteConfig.facebook, siteConfig.mapsUrl],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    contactType: "customer service",
    areaServed: "DO",
    availableLanguage: ["es"],
  },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Paquetes turisticos",
      description: "Vuelos, hoteles, excursiones, traslados y seguros de viajes.",
    },
    {
      "@type": "Offer",
      name: "Feria de las Flores en Medellin 2026",
      description: "Viaje a Medellin del 7 al 11 de agosto 2026 con alojamiento, traslados y excursiones.",
      price: "850",
      priceCurrency: "USD",
    },
  ],
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <BookingBar />
      <FeaturedPromotion />
      <Benefits />
      <Destinations />
      <Experience />
      <MissionVisionValues />
      <Packages />
      <Testimonials />
      <ContactForm />
      <Footer />
    </main>
  );
}
