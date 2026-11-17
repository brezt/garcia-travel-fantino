import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PelicanoBicicleta from "@/components/ui/PelicanoBicicleta";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative">
      <Header />
      <section className="flex min-h-[80vh] flex-col items-center justify-center bg-brand-navy px-6 pb-20 pt-36 text-center">
        <PelicanoBicicleta width={420} height={294} className="w-64 md:w-96" />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">Error 404</p>
        <h1 className="mt-2 font-montserrat text-3xl font-black uppercase text-white md:text-5xl">
          Este destino no existe
        </h1>
        <p className="mt-4 max-w-md text-white/75">
          La página que buscas se fue de viaje. Vuelve al inicio o escríbenos y te ayudamos a encontrar tu próximo destino.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-brand-navy transition-colors hover:bg-brand-cyan"
          >
            Volver al inicio
          </Link>
          <a
            href={getWhatsAppUrl("Hola Garcia Travel, estaba buscando algo en la web y no lo encontré. ¿Me pueden ayudar?")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-brand-navy transition-colors hover:bg-brand-gold/90"
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
