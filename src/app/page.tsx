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
import CTA from "@/components/sections/CTA";
import PromotionsGrid from "@/components/sections/PromotionsGrid";
import LatestPosts from "@/components/sections/LatestPosts";
import { getActivePackages, getDestinations, getPosts, getTestimonials } from "@/lib/cms";
import { getHomeJsonLd } from "@/lib/structured-data";

// Se regenera como mucho cada minuto (y al momento con el webhook del panel).
export const revalidate = 60;

export default async function Home() {
  const [activePackages, destinations, testimonials, posts] = await Promise.all([
    getActivePackages(),
    getDestinations(),
    getTestimonials(),
    getPosts(3),
  ]);
  const featured = activePackages.find((travelPackage) => travelPackage.featured);
  const otherPromotions = activePackages.filter((travelPackage) => travelPackage !== featured);

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomeJsonLd([...activePackages, ...destinations])) }}
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
      <CTA />
      <LatestPosts posts={posts} />
      <ContactForm />
      <Footer />
    </main>
  );
}
