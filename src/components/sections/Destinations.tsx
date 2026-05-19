"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";

const Destinations = () => {
  return (
    <section className="py-20 px-6 bg-brand-slate" id="destinos">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-brand-teal text-xs font-bold tracking-[0.2em] uppercase mb-2">Destinos Estrella</p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy font-montserrat uppercase">Explora lo Inexplorado</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:h-[600px]">
          <motion.div initial={false} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group min-h-[250px]">
            <Image src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop" alt="Punta Cana" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-brand-teal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Mas Popular</span>
              <h3 className="text-3xl font-black text-white font-montserrat uppercase">Punta Cana</h3>
              <p className="text-white/80 text-sm mt-2 max-w-md">El destino ideal para playas de arena blanca y resorts todo incluido de primera categoria.</p>
              <button onClick={() => openWhatsApp("Hola, me interesa obtener informacion sobre viajes a Punta Cana.")} className="mt-4 bg-white text-brand-navy text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wider hover:bg-brand-teal hover:text-white transition-colors">Descubrir</button>
            </div>
          </motion.div>

          <motion.div initial={false} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group min-h-[200px]">
            <Image src="https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=1200&q=80" alt="Samana" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-black text-white font-montserrat uppercase">Samana</h3>
              <p className="text-white/80 text-xs mt-1">Santuario de ballenas y naturaleza.</p>
            </div>
          </motion.div>

          <motion.div initial={false} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group min-h-[200px]">
            <Image src="https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2000&auto=format&fit=crop" alt="Bayahibe" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-black text-white font-montserrat uppercase">Bayahibe</h3>
              <p className="text-white/80 text-xs mt-1">Aguas cristalinas y ambiente sereno.</p>
            </div>
          </motion.div>

          <motion.div initial={false} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-2 md:row-span-1 relative rounded-3xl overflow-hidden group min-h-[200px]">
            <Image src="/images/hero-beach.jpg" alt="Puerto Plata" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-black text-white font-montserrat uppercase">Puerto Plata</h3>
                <p className="text-white/80 text-sm mt-1">Cultura, teleferico y encanto colonial.</p>
              </div>
              <button onClick={() => openWhatsApp("Hola, me interesa obtener informacion sobre viajes a Puerto Plata.")} className="text-brand-teal hover:text-white transition-colors"><ArrowRight size={24} /></button>
            </div>
          </motion.div>

          <motion.div initial={false} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="md:col-span-1 md:row-span-1 bg-brand-teal rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group min-h-[200px]">
            <div className="absolute right-[-20%] bottom-[-20%] opacity-10">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h3 className="text-2xl font-black text-white font-montserrat uppercase leading-tight mb-3 relative z-10">Viajes<br/>Internacionales</h3>
            <p className="text-white/80 text-xs mb-6 relative z-10">Cruceros y destinos globales desde Fantino para el mundo.</p>
            <button onClick={() => openWhatsApp("Hola, me interesan las opciones de viajes internacionales y cruceros.")} className="bg-white text-brand-teal text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider self-start relative z-10 hover:bg-brand-navy hover:text-white transition-colors">Conocer Mas</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
