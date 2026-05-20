"use client";

import React from "react";
import { Eye, Gem, HeartHandshake, Target } from "lucide-react";
import { motion } from "framer-motion";

const values = ["Servicio", "Compromiso", "Ética", "Innovación", "Honestidad", "Calidad", "Confiabilidad"];

const MissionVisionValues = () => {
  return (
    <section className="bg-white px-6 py-24" id="mision">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <p className="text-brand-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">Nuestra esencia</p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy font-montserrat uppercase leading-tight">Misión, visión y valores</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <motion.article initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-brand-slate bg-brand-slate p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal text-white"><Target size={24} /></div>
            <h3 className="mb-4 text-xl font-black uppercase tracking-wide text-brand-navy font-montserrat">Misión</h3>
            <p className="text-sm leading-relaxed text-brand-navy/70">Ofrecer un servicio único, confiable y honesto, con la más alta calidad a todos nuestros clientes, diseñando planes de viajes y estadías mediante un personal debidamente capacitado, logrando superar las expectativas de todos los usuarios.</p>
          </motion.article>

          <motion.article initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl bg-brand-teal p-8 text-white shadow-xl shadow-brand-teal/20">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-brand-gold"><Eye size={24} /></div>
            <h3 className="mb-4 text-xl font-black uppercase tracking-wide font-montserrat">Visión</h3>
            <p className="text-sm leading-relaxed text-white/85">Ser una agencia de viajes reconocida a nivel nacional e internacional por la confianza y seguridad que ofrecemos, presentando los mejores servicios y asegurando una calidad turística única para obtener la mayor satisfacción de nuestros usuarios.</p>
          </motion.article>

          <motion.article initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-2xl border border-brand-slate bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold text-brand-navy"><HeartHandshake size={24} /></div>
            <h3 className="mb-5 text-xl font-black uppercase tracking-wide text-brand-navy font-montserrat">Valores</h3>
            <div className="flex flex-wrap gap-3">
              {values.map((value) => (
                <span key={value} className="inline-flex items-center gap-2 rounded-full border border-brand-teal/15 bg-brand-teal/5 px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-navy"><Gem size={14} className="text-brand-teal" />{value}</span>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionValues;
