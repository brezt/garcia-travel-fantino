"use client";

import React from "react";
import Image from "next/image";
import { Headphones, ShieldCheck, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <Headphones className="w-8 h-8 text-brand-teal" />,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    title: "ASESORIA LOCAL",
    description: "Expertos dominicanos guiandote en cada paso para asegurar el viaje de tus suenos.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-brand-teal" />,
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop",
    title: "SEGURIDAD TOTAL",
    description: "Trabajamos con proveedores certificados y seguros de viaje para tu tranquilidad.",
  },
  {
    icon: <Star className="w-8 h-8 text-brand-teal" />,
    image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=1200&auto=format&fit=crop",
    title: "EXPERIENCIA VIP",
    description: "Disenamos itinerarios exclusivos para que disfrutes sin preocupaciones.",
  },
  {
    icon: <Clock className="w-8 h-8 text-brand-teal" />,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
    title: "ASISTENCIA 24/7",
    description: "Soporte constante durante todo tu viaje, sin importar la hora o el lugar.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 px-6 bg-brand-slate" id="nosotros">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden flex flex-col items-start border border-brand-slate shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <Image src={benefit.image} alt={benefit.title} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider font-montserrat">{benefit.title}</h3>
                <p className="text-sm text-brand-navy/60 leading-relaxed font-inter">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
