"use client";

/* eslint-disable @next/next/no-img-element */

import React from "react";
import {
  CalendarDays,
  Hotel,
  MapPin,
  MessageCircle,
  Plane,
  ShieldCheck,
  Ship,
  Sparkles,
  Sprout,
  Van,
} from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";

const includes = [
  { Icon: Plane, text: "Boleto aéreo con equipaje en bodega" },
  { Icon: Hotel, text: "Alojamiento en hotel de lujo en El Poblado" },
  { Icon: Van, text: "Traslados incluidos" },
  { Icon: MapPin, text: "2 excursiones principales" },
  { Icon: Ship, text: "Experiencia en el exclusivo Yate Majestic" },
  { Icon: ShieldCheck, text: "Seguro de viajes" },
];

const FeaturedPromotion = () => {
  const handlePromoClick = () => {
    openWhatsApp(
      "Hola Garcia Travel, me interesa la promoción Feria de las Flores en Medellín 2026 del 07 al 11 de agosto. ¿Podrían enviarme más detalles y disponibilidad?",
    );
  };

  return (
    <section className="bg-brand-slate px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
              Promoción destacada
            </p>
            <h2 className="font-montserrat text-4xl font-black uppercase leading-tight text-brand-navy md:text-5xl">
              Feria de las Flores en Medellín 2026
            </h2>
          </div>
          <button
            onClick={handlePromoClick}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal px-7 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-teal/20 transition-colors hover:bg-brand-navy"
          >
            <MessageCircle size={18} />
            Asegurar mi cupo
          </button>
        </div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] bg-white shadow-2xl"
        >
          <div className="w-full bg-brand-slate">
            <img
              src="/images/promo-feria-flores-medellin.png"
              alt="Promoción Feria de las Flores en Medellín de Garcia Travel Fantino"
              width={1672}
              height={941}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-brand-slate p-5 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl bg-brand-slate px-5 py-4">
              <MapPin className="text-brand-teal" size={20} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/50">Destino</p>
                <p className="text-sm font-bold text-brand-navy">Medellín, Colombia</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-brand-slate px-5 py-4">
              <CalendarDays className="text-brand-teal" size={20} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/50">Fecha</p>
                <p className="text-sm font-bold text-brand-navy">07 al 11 agosto 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-brand-slate px-5 py-4">
              <Plane className="text-brand-teal" size={20} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/50">Tarifa</p>
                <p className="text-sm font-bold text-brand-navy">USD 850 p/p en DBL-TPL</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div className="rounded-2xl bg-brand-teal p-8 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-brand-gold">
                <Sprout size={24} />
              </div>
              <h3 className="font-montserrat mb-4 text-2xl font-black uppercase leading-tight">
                Vive la fiesta más colorida de Colombia
              </h3>
              <p className="text-sm leading-relaxed text-white/85">
                La Feria de las Flores es la celebración por excelencia de Medellín: un espectáculo lleno de tradición, música, cultura y los icónicos silleteros que llenan la ciudad de vida y alegría.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/85">
                Disfruta desfiles, eventos culturales y el ambiente festivo que convierte a Medellín en el destino más vibrante de la temporada.
              </p>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="text-brand-gold" size={24} />
                <h3 className="font-montserrat text-2xl font-black uppercase text-brand-navy">Todo incluido</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {includes.map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 rounded-2xl border border-brand-slate bg-brand-slate/60 px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-teal shadow-sm">
                      <Icon size={19} />
                    </div>
                    <p className="text-sm font-semibold leading-snug text-brand-navy/75">{text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm font-semibold text-brand-navy/70">
                Un viaje perfecto para disfrutar, celebrar y conectar con la esencia de Colombia. La Feria de las Flores se vive una vez, pero se recuerda para siempre.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPromotion;
