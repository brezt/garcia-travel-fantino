"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const testimonials = [
  { name: "Maria Rodriguez", role: "Viaje a Punta Cana", content: "Fantastica experiencia. El equipo de Garcia Travel se encargo de todo. Definitivamente volveremos a viajar con ellos!", highlight: false },
  { name: "David Suriel", role: "Viaje a Europa", content: "Nuestra luna de miel fue espectacular gracias a Garcia Travel. Su atencion a cada detalle marco una gran diferencia.", highlight: true },
  { name: "Laura Jimenez", role: "Viaje Familiar", content: "Los ninos disfrutaron muchisimo. Encontraron el resort perfecto para nosotros. 100% recomendados!", highlight: false },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-brand-slate" id="testimonios">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-navy font-montserrat uppercase">Voces de Nuestros Viajeros</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={cn("rounded-3xl p-8 flex flex-col shadow-xl transition-transform hover:-translate-y-2", testimonial.highlight ? "bg-brand-teal text-white md:scale-110 z-10 py-12" : "bg-white text-brand-navy")}>
              <div className="flex gap-1 mb-6">{[1, 2, 3, 4, 5].map((star) => (<Star key={star} size={16} className="fill-current text-brand-gold" />))}</div>
              <p className={cn("text-sm mb-8 font-inter italic leading-relaxed flex-1", testimonial.highlight ? "text-white/90 font-medium" : "text-brand-navy/70")}>&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat", testimonial.highlight ? "bg-white/20 text-white" : "bg-brand-teal/10 text-brand-teal")}>{testimonial.name.charAt(0)}</div>
                <div>
                  <h4 className={cn("text-xs font-bold uppercase tracking-wider font-montserrat", testimonial.highlight ? "text-white" : "text-brand-navy")}>{testimonial.name}</h4>
                  <p className={cn("text-[10px] uppercase tracking-widest mt-1", testimonial.highlight ? "text-brand-gold" : "text-brand-navy/40")}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
