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
import PromotionsGrid from "@/components/sections/PromotionsGrid";
import LatestPosts from "@/components/sections/LatestPosts";
import { getActivePackages, getPosts, getTestimonials } from "@/lib/cms";
import type { ContentPage } from "@/lib/travel-content";

// Se regenera cada hora (y al momento cuando se publica algo en el panel).
export const revalidate = 3600;

const getJsonLd = (featured?: ContentPage) => ({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": getSiteUrl("#travel-agency"),
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  description: siteConfig.description,
  url: getSiteUrl(),
  logo: getSiteUrl(siteConfig.logoPath),
  image: getSiteUrl(siteConfig.shareImagePath),
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
      name: "República Dominicana",
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
      name: "Paquetes turísticos",
      description: "Vuelos, hoteles, excursiones, traslados y seguros de viajes.",
    },
    ...(featured
      ? [
          {
            "@type": "Offer",
            name: featured.title,
            description: featured.description,
            url: getSiteUrl(`/paquetes/${featured.slug}`),
          },
        ]
      : []),
  ],
});

export default async function Home() {
  const [activePackages, testimonials, posts] = await Promise.all([
    getActivePackages(),
    getTestimonials(),
    getPosts(3),
  ]);
  const featured = activePackages.find((travelPackage) => travelPackage.featured);
  const otherPromotions = activePackages.filter((travelPackage) => travelPackage !== featured);
  const jsonLd = getJsonLd(featured);

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <BookingBar />
      {featured ? <FeaturedPromotion promo={featured} /> : null}
      <PromotionsGrid promotions={otherPromotions} />
      <Benefits />
      <Destinations />
      <Experience />
      <MissionVisionValues />
      <Packages />
      <Testimonials testimonials={testimonials} />
      <LatestPosts posts={posts} />
      <ContactForm />
      <Footer />
    </main>
  );
}
