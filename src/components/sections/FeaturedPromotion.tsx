"use client";

/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import { CalendarDays, Check, MapPin, MessageCircle, Plane, Sparkles, Sprout } from "lucide-react";
import { motion } from "motion/react";
import { openWhatsApp } from "@/lib/whatsapp";
import type { ContentPage } from "@/lib/travel-content";

type FeaturedPromotionProps = {
  promo: ContentPage;
};

const FeaturedPromotion = ({ promo }: FeaturedPromotionProps) => {
  const handlePromoClick = () => {
    openWhatsApp(promo.whatsappMessage, "promocion");
  };
  const [intro, ...moreSections] = promo.sections;
  const facts = [
    { Icon: MapPin, label: "Destino", value: promo.location },
    { Icon: CalendarDays, label: "Fecha", value: promo.duration },
    { Icon: Plane, label: "Tarifa", value: promo.price },
  ].filter((fact) => fact.value);

  return (
    <section className="bg-brand-slate px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
              Promoción destacada
            </p>
            <h2 className="font-montserrat text-4xl font-black uppercase leading-tight text-brand-navy md:text-5xl">
              {promo.title}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/paquetes/${promo.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-widest text-brand-navy shadow-sm transition-colors hover:bg-brand-cyan"
            >
              Ver detalles
            </Link>
            <button
              onClick={handlePromoClick}
              aria-label={`Asegurar cupo por WhatsApp para ${promo.title}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal px-7 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-teal/20 transition-colors hover:bg-brand-navy"
            >
              <MessageCircle size={18} />
              Asegurar mi cupo
            </button>
          </div>
        </div>

        <motion.div
          data-reveal initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] bg-white shadow-2xl"
        >
          <div className="w-full bg-brand-slate">
            <img
              src={promo.promoImage ?? promo.heroImage}
              alt={promo.imageAlt}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </div>

          {facts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 border-t border-brand-slate p-5 md:grid-cols-3">
              {facts.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl bg-brand-slate px-5 py-4">
                  <Icon className="text-brand-teal" size={20} />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/50">{label}</p>
                    <p className="text-sm font-bold text-brand-navy">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className={`grid grid-cols-1 gap-8 p-8 lg:p-10 ${promo.highlights.length > 0 ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
            <div className="rounded-2xl bg-brand-teal p-8 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-brand-gold">
                <Sprout size={24} />
              </div>
              <h3 className="font-montserrat mb-4 text-2xl font-black uppercase leading-tight">
                {intro?.title ?? promo.shortTitle}
              </h3>
              <p className="text-sm leading-relaxed text-white/85">{intro?.body ?? promo.description}</p>
              {moreSections.slice(0, 1).map((section) => (
                <p key={section.title} className="mt-5 text-sm leading-relaxed text-white/85">
                  {section.body}
                </p>
              ))}
            </div>

            {promo.highlights.length > 0 ? (
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="text-brand-gold" size={24} />
                <h3 className="font-montserrat text-2xl font-black uppercase text-brand-navy">Qué incluye</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {promo.highlights.map((text) => (
                  <div key={text} className="flex items-center gap-3 rounded-2xl border border-brand-slate bg-brand-slate/60 px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-teal shadow-sm">
                      <Check size={19} />
                    </div>
                    <p className="text-sm font-semibold leading-snug text-brand-navy/75">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPromotion;
