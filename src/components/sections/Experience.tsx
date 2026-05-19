"use client";

import React from "react";
import Image from "next/image";
import { Check, MapPin, Shield } from "lucide-react";
import { motion } from "framer-motion";
import PlugConnectedIcon from "@/components/ui/plug-connected-icon";

const Experience = () => {
  return (
    <section className="py-24 px-6 bg-brand-slate overflow-hidden" id="experiencias">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1968&auto=format&fit=crop" alt="Viajero contemplando el paisaje" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3"><PlugConnectedIcon size={24} className="text-white" /></div>
              <p className="text-white font-medium text-sm leading-relaxed">&ldquo;Conectamos cada detalle de tu viaje para que solo tengas que disfrutar.&rdquo;</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
          <p className="text-brand-teal text-xs font-bold tracking-[0.2em] uppercase mb-4">Garcia Travel Fantino</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-navy leading-tight font-montserrat uppercase mb-6">
            Disenamos Viajes <br/><span className="font-playfair italic text-brand-teal lowercase text-5xl md:text-6xl lg:text-7xl">con</span> Proposito
          </h2>
          <p className="text-brand-navy/60 text-base md:text-lg mb-10 leading-relaxed max-w-lg font-inter">
            En Garcia Travel Fantino, no solo vendemos boletos o reservamos hoteles. Nos dedicamos a disenar experiencias a medida, conectando cada servicio con asesoria directa para que tu no debas preocuparte por nada.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm"><div className="w-10 h-10 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0"><Check size={18} className="text-brand-teal" /></div><span className="text-xs font-bold text-brand-navy uppercase tracking-wide">Asesoria de Viaje</span></div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm"><div className="w-10 h-10 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0"><PlugConnectedIcon size={20} className="text-brand-teal" /></div><span className="text-xs font-bold text-brand-navy uppercase tracking-wide">Conexion Directa</span></div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm"><div className="w-10 h-10 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0"><Shield size={18} className="text-brand-teal" /></div><span className="text-xs font-bold text-brand-navy uppercase tracking-wide">Calidad Verificada</span></div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm"><div className="w-10 h-10 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0"><MapPin size={18} className="text-brand-teal" /></div><span className="text-xs font-bold text-brand-navy uppercase tracking-wide">Destinos Top</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
