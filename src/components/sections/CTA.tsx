"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Phone, Mail } from "lucide-react";
import { motion } from "motion/react";
import { openWhatsApp } from "@/lib/whatsapp";

const CTA = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-turquoise via-brand-turquoise to-brand-cyan" />
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2 data-reveal initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-montserrat">
          Listo para vivir tu <br className="md:hidden" />próxima aventura?
        </motion.h2>
        <motion.p data-reveal initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-inter">
          Habla ahora con un representante de Garcia Travel Fantino y recibe una cotización personalizada.
        </motion.p>
        <motion.div data-reveal initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            type="button"
            onClick={() => openWhatsApp("Hola Garcia Travel, quiero una cotización personalizada para mi próximo viaje.", "cta")}
            variant="whatsapp"
            size="xl"
            className="w-full sm:w-auto h-20 px-12 text-lg shadow-2xl"><Phone size={28} className="mr-3" />Contactar por WhatsApp</Button>
          <a
            href="#contacto"
            className="inline-flex w-full sm:w-auto h-20 items-center justify-center whitespace-nowrap rounded-2xl border-2 border-white bg-transparent px-12 text-lg font-extrabold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-brand-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            <Mail size={28} className="mr-3" />Completar formulario
          </a>
        </motion.div>
      </div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-gold/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-gold/30 rounded-full blur-3xl" />
    </section>
  );
};

export default CTA;
