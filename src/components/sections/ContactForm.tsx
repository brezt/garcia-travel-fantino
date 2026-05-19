"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", date: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola Garcia Travel, he completado el formulario de contacto:
*Nombre:* ${formData.name}
*Telefono:* ${formData.phone}
*Email:* ${formData.email}
*Fecha Estimada:* ${formData.date}
*Mensaje:* ${formData.message}`;
    openWhatsApp(msg);
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", email: "", date: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-24 px-6 bg-brand-slate" id="contacto">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="bg-brand-teal p-12 md:w-5/12 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3"><svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg></div>
            <h2 className="text-4xl md:text-5xl font-black text-white font-montserrat uppercase leading-tight mb-4 relative z-10">Empieza <br/> Tu Viaje</h2>
            <p className="text-white/80 text-sm mb-10 relative z-10 max-w-xs">Escribenos ahora por WhatsApp o completa el formulario para una atencion personalizada inmediata.</p>
            <button onClick={() => openWhatsApp("Hola Garcia Travel, me gustaria hacer una consulta.")} className="bg-white text-brand-teal text-xs font-bold px-8 py-4 rounded-full uppercase tracking-wider mb-8 flex items-center justify-center gap-2 relative z-10 hover:bg-brand-slate transition-colors w-max shadow-lg"><Phone size={16} />Escribir por WhatsApp</button>
            <div className="relative z-10 mb-10 h-36 w-full overflow-hidden rounded-2xl border border-white/20 shadow-lg">
              <Image src="/images/hero-beach.jpg" alt="Playa tropical para planificar viajes" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
            </div>
            <div className="mt-auto flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-4 text-white"><Phone size={20} className="text-brand-gold" /><span className="text-sm font-medium">+1 829 884 6811</span></div>
              <div className="flex items-center gap-4 text-white"><Mail size={20} className="text-brand-gold" /><span className="text-sm font-medium">info@garciatravelfantino.com</span></div>
              <div className="flex items-center gap-4 text-white"><MapPin size={20} className="text-brand-gold" /><span className="text-sm font-medium">Fantino, Rep. Dominicana</span></div>
            </div>
          </div>

          <div className="p-12 md:w-7/12 bg-white flex items-center justify-center">
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full">
                <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6"><Send className="text-brand-teal w-10 h-10" /></div>
                <h3 className="text-3xl font-black text-brand-navy mb-2 font-montserrat">Mensaje Enviado!</h3>
                <p className="text-brand-navy/60 font-inter">Un asesor de Garcia Travel se comunicara contigo muy pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div><label className="block text-[10px] font-bold text-brand-navy/50 uppercase tracking-widest mb-2">Nombre Completo</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border-b border-brand-slate py-2 text-sm text-brand-navy outline-none focus:border-brand-teal transition-colors" placeholder="Juan Perez" /></div>
                  <div><label className="block text-[10px] font-bold text-brand-navy/50 uppercase tracking-widest mb-2">Telefono</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border-b border-brand-slate py-2 text-sm text-brand-navy outline-none focus:border-brand-teal transition-colors" placeholder="+1 829..." /></div>
                  <div><label className="block text-[10px] font-bold text-brand-navy/50 uppercase tracking-widest mb-2">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-b border-brand-slate py-2 text-sm text-brand-navy outline-none focus:border-brand-teal transition-colors" placeholder="juan@ejemplo.com" /></div>
                  <div><label className="block text-[10px] font-bold text-brand-navy/50 uppercase tracking-widest mb-2">Fecha Estimada</label><input type="text" name="date" value={formData.date} onChange={handleChange} className="w-full border-b border-brand-slate py-2 text-sm text-brand-navy outline-none focus:border-brand-teal transition-colors" placeholder="DD/MM/AA" /></div>
                  <div className="md:col-span-2"><label className="block text-[10px] font-bold text-brand-navy/50 uppercase tracking-widest mb-2">Tu Mensaje</label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full border-b border-brand-slate py-2 text-sm text-brand-navy outline-none focus:border-brand-teal transition-colors resize-none" placeholder="Como podemos ayudarte a planear tu viaje perfecto?"></textarea></div>
                </div>
                <button type="submit" className="w-full bg-brand-teal text-white font-bold tracking-widest text-xs uppercase py-4 rounded-xl hover:bg-brand-navy transition-colors">Enviar Mensaje</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
