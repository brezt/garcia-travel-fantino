import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContentCard from "@/components/seo/ContentCard";
import type { ContentPage } from "@/lib/travel-content";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type ContentListPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  pages: ContentPage[];
  emptyText: string;
  whatsappMessage: string;
};

/** Página de listado (todos los destinos o todos los paquetes vigentes). */
const ContentListPage = ({ eyebrow, title, intro, pages, emptyText, whatsappMessage }: ContentListPageProps) => (
  <main className="relative bg-brand-slate">
    <Header />
<<<<<<< HEAD
    <section className="bg-brand-navy px-6 pb-16 pt-44 md:pt-48">
=======
    <section className="bg-brand-navy px-6 pb-16 pt-36">
>>>>>>> 92f14240f42afab9b0f1c224601ebdd57f740fe9
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">{eyebrow}</p>
        <h1 className="mt-2 font-montserrat text-4xl font-black uppercase text-white md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">{intro}</p>
      </div>
    </section>
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {pages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <ContentCard key={page.slug} page={page} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <p className="mx-auto max-w-xl text-center text-brand-navy/70">{emptyText}</p>
        )}
        <div className="mt-14 flex justify-center">
          <a
            href={getWhatsAppUrl(whatsappMessage)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-navy shadow-lg shadow-brand-gold/25 transition-transform hover:scale-[1.02]"
          >
            <MessageCircle size={18} />
            ¿Otro destino? Cotiza por WhatsApp
          </a>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default ContentListPage;
