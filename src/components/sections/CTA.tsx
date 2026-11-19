"use client";

import React from "react";
import { Mail, Palmtree, Plane } from "lucide-react";
import { motion } from "motion/react";
import { openWhatsApp } from "@/lib/whatsapp";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/** Franja turquesa de llamada a la acción: invita a escribir por WhatsApp o a ir al formulario. */
const CTA = () => {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-teal via-brand-teal to-[#0a8f91] px-6 py-14 text-center shadow-xl shadow-brand-teal/20 md:px-16 md:py-20">
        {/* Decoración suave de fondo */}
        <Plane aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -left-6 top-6 h-32 w-32 -rotate-12 text-white/10 md:h-44 md:w-44" />
        <Palmtree aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -bottom-6 -right-4 h-40 w-40 text-white/10 md:h-56 md:w-56" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-turquoise/25 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Cotización sin compromiso</p>
          <motion.h2
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 font-montserrat text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            ¿Listo para tu próxima aventura?
          </motion.h2>
          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-10 max-w-2xl font-inter text-base text-white/85 md:text-lg"
          >
            Cuéntanos a dónde quieres ir y un asesor de Garcia Travel Fantino te prepara una propuesta a tu medida.
          </motion.p>
          <motion.div
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => openWhatsApp("Hola Garcia Travel, quiero una cotización personalizada para mi próximo viaje.", "cta")}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold uppercase tracking-wider sm:px-8 sm:tracking-widest text-white shadow-lg shadow-black/15 transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal sm:w-auto"
            >
              <WhatsAppIcon />
              Escribir por WhatsApp
            </button>
            <a
              href="#contacto"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-white/80 px-6 py-4 text-sm font-bold uppercase tracking-wider sm:px-8 sm:tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal sm:w-auto"
            >
              <Mail size={18} aria-hidden="true" />
              Completar formulario
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
