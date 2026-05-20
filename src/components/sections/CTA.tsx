"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-turquoise via-brand-turquoise to-brand-cyan" />
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2 initial={false} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-montserrat">
          Listo para vivir tu <br className="md:hidden" />próxima aventura?
        </motion.h2>
        <motion.p initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-inter">
          Habla ahora con un representante de Garcia Travel Fantino y recibe una cotización personalizada.
        </motion.p>
        <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="whatsapp" size="xl" className="w-full sm:w-auto h-20 px-12 text-lg shadow-2xl"><Phone size={28} className="mr-3" />Contactar por WhatsApp</Button>
          <Button variant="outline" size="xl" className="w-full sm:w-auto h-20 px-12 text-lg text-white border-white hover:bg-white hover:text-brand-turquoise transition-all duration-300"><Mail size={28} className="mr-3" />Completar formulario</Button>
        </motion.div>
      </div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-gold/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-gold/30 rounded-full blur-3xl" />
    </section>
  );
};

export default CTA;
