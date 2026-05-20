"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";

const Packages = () => {
  return (
    <section className="py-20 px-6 bg-white" id="paquetes">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy font-montserrat uppercase mb-2">Paquetes Curados</h2>
          <p className="text-brand-navy/60 text-sm">Diseñados para transformar tu próxima aventura por el mundo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] border border-brand-slate overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl transition-all h-[350px]">
            <div className="w-full sm:w-[45%] relative h-48 sm:h-full">
              <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 border border-white/30">Top Ventas</span>
              <Image src="https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=1974&auto=format&fit=crop" alt="Escapada romántica" fill sizes="(min-width: 768px) 23vw, 100vw" className="object-cover" />
            </div>
            <div className="p-8 flex flex-col justify-center flex-1">
              <h3 className="text-2xl font-black text-brand-navy font-montserrat uppercase leading-tight mb-1">Escapada</h3>
              <h3 className="text-2xl font-black text-brand-teal font-montserrat uppercase leading-tight mb-4">Romántica</h3>
              <div className="flex items-center gap-2 text-xs text-brand-navy/60 mb-2"><MapPin size={14} className="text-brand-teal" />Resorts Solo Adultos</div>
              <div className="flex items-center gap-2 text-xs text-brand-navy/60 mb-6"><Sun size={14} className="text-brand-teal" />Spa & Cenas en la Playa</div>
              <button onClick={() => openWhatsApp("Hola, me interesa el paquete de Escapada Romántica. ¿Podrían enviarme más detalles?")} className="bg-brand-teal text-white text-xs font-bold px-6 py-3 rounded-full uppercase tracking-wider hover:bg-brand-teal/90 transition-colors w-max">Descubrir</button>
            </div>
          </motion.div>

          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] border border-brand-slate overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all h-[350px]">
            <div className="p-8 pb-4">
              <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center mb-4"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div>
              <h3 className="text-2xl font-black text-brand-navy font-montserrat uppercase leading-tight mb-2">Aventura Extrema</h3>
              <p className="text-xs text-brand-navy/60 mb-4 max-w-sm">Explora, surfea y siente la adrenalina en las montañas.</p>
            </div>
            <div className="relative flex-1 m-4 mt-0 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2070&auto=format&fit=crop" alt="Aventura Extrema" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <button onClick={() => openWhatsApp("Hola, quiero cotizar un viaje de Aventura Extrema.")} className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full border border-white/30 hover:bg-white/40 transition-colors">Ver Detalles</button>
            </div>
          </motion.div>

          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-brand-slate/50 rounded-[2rem] overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all h-[350px]">
            <div className="p-8 pb-4">
              <h3 className="text-2xl font-black text-brand-navy font-montserrat uppercase leading-tight mb-2">Felicidad Familiar</h3>
              <p className="text-xs text-brand-navy/60 mb-4 max-w-sm">Diversión para niños y descanso total para los padres.</p>
            </div>
            <div className="relative flex-1 m-4 mt-0 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=1974&auto=format&fit=crop" alt="Felicidad Familiar" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <button onClick={() => openWhatsApp("Hola, quisiera información sobre paquetes de viaje familiares en resorts.")} className="absolute bottom-4 right-4 bg-white text-brand-navy text-[10px] font-bold px-4 py-2 rounded-full shadow-lg hover:bg-brand-slate transition-colors flex items-center gap-2"><Sun size={12} className="text-brand-gold" />Resorts</button>
            </div>
          </motion.div>

          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-[#1A1A1A] rounded-[2rem] overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl transition-all h-[350px]">
            <div className="p-8 flex flex-col justify-center flex-1 order-2 sm:order-1">
              <h3 className="text-2xl font-black text-white font-montserrat uppercase leading-tight mb-1">Mundo</h3>
              <h3 className="text-2xl font-black text-white font-montserrat uppercase leading-tight mb-4">Global</h3>
              <p className="text-xs text-white/60 mb-6 max-w-[180px]">Cruceros, Europa, Asia y América Latina. Asesoría de visado y seguro de viaje.</p>
              <button onClick={() => openWhatsApp("Hola, estoy interesado/a en un viaje internacional Mundo Global. ¿Podrían asesorarme?")} className="bg-brand-cyan text-brand-navy text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-wider hover:bg-white transition-colors w-max">Consultar</button>
            </div>
            <div className="w-full sm:w-[45%] relative h-48 sm:h-full order-1 sm:order-2">
              <Image src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop" alt="Mundo Global" fill sizes="(min-width: 768px) 23vw, 100vw" className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
