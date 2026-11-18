import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Experience from "@/components/sections/Experience";
import MissionVisionValues from "@/components/sections/MissionVisionValues";
import Benefits from "@/components/sections/Benefits";
import { aboutIntro } from "@/lib/about";
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

export default function AboutPage() {
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
          <h1 className="mt-2 font-montserrat text-4xl font-black uppercase text-white md:text-5xl">Sobre nosotros</h1>
          <p className="mt-6 text-base leading-8 text-white/80 md:text-lg">{aboutIntro}</p>
        </div>
      </section>
      <Experience />
      <MissionVisionValues />
      <Benefits />
      <Footer />
    </main>
  );
}
