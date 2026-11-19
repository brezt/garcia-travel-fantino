"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "motion/react";
import { openWhatsApp } from "@/lib/whatsapp";
import { guardarSolicitud } from "@/lib/solicitudes";
import { trackContactFormSubmit } from "@/lib/analytics";

/** Atributos WebMCP declarativos: describen el formulario a los asistentes de IA del navegador. */
const webMcpFormAttributes = {
  toolname: "solicitar_cotizacion",
  tooldescription:
    "Envía a Garcia Travel Fantino una solicitud de cotización de viaje con nombre, teléfono, correo, fecha estimada y mensaje. Un asesor responde por WhatsApp o teléfono.",
} as React.FormHTMLAttributes<HTMLFormElement>;

const labelClass = "mb-2 block text-sm font-semibold text-brand-navy";
const fieldClass =
  "w-full rounded-xl border border-brand-navy/15 bg-brand-slate px-4 py-3 text-base text-brand-navy placeholder:text-brand-navy/40 transition-colors focus:border-brand-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/20";

/** Fecha de hoy (AAAA-MM-DD, hora local) para no dejar elegir fechas pasadas. */
const todayLocal = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", date: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [trap, setTrap] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);

    // La fecha llega como AAAA-MM-DD; se guarda y se envía como DD/MM/AAAA.
    const fecha = formData.date ? formData.date.split("-").reverse().join("/") : "";

    // Primero se guarda en el panel /admin; si falla, igual se abre WhatsApp.
    await guardarSolicitud({
      origen: "formulario",
      nombre: formData.name,
      telefono: formData.phone,
      email: formData.email,
      fecha,
      mensaje: formData.message,
      website: trap,
    });

    const msg = `Hola Garcia Travel, he completado el formulario de contacto:
*Nombre:* ${formData.name}
*Teléfono:* ${formData.phone}
*Email:* ${formData.email}
*Fecha aproximada:* ${fecha}
*Mensaje:* ${formData.message}`;
    setIsSending(false);
    trackContactFormSubmit();
    openWhatsApp(msg, "formulario");
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", email: "", date: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-24 px-6 bg-brand-slate" id="contacto">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="bg-brand-teal p-8 md:p-12 md:w-5/12 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3"><svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg></div>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-white font-montserrat leading-tight mb-4 relative z-10 tracking-tight">Empieza <br/> tu viaje</h2>
            <p className="text-white/80 text-sm mb-10 relative z-10 max-w-xs">Escríbenos ahora por WhatsApp o completa el formulario para una atención personalizada inmediata.</p>
            <button onClick={() => openWhatsApp("Hola Garcia Travel, me gustaría hacer una consulta.", "contacto")} className="bg-white text-brand-teal text-xs font-bold px-8 py-4 rounded-full uppercase tracking-wider mb-8 flex items-center justify-center gap-2 relative z-10 hover:bg-brand-slate transition-colors w-max shadow-lg"><Phone size={16} />Escribir por WhatsApp</button>
            <div className="relative z-10 mb-10 h-36 w-full overflow-hidden rounded-2xl border border-white/20 shadow-lg">
              <Image src="/images/hero-beach.webp" alt="Playa tropical para planificar viajes" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
            </div>
            <div className="mt-auto flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-4 text-white"><Phone size={20} className="text-brand-gold" /><span className="text-sm font-medium">+1 829 884 6811</span></div>
              <div className="flex items-center gap-4 text-white"><Mail size={20} className="text-brand-gold" /><span className="text-sm font-medium">info@garciatravelfantino.com</span></div>
              <div className="flex items-center gap-4 text-white"><MapPin size={20} className="text-brand-gold" /><span className="text-sm font-medium">Fantino, Rep. Dominicana</span></div>
            </div>
          </div>

          <div className="p-8 md:p-12 md:w-7/12 bg-white flex items-center justify-center">
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full">
                <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6"><Send className="text-brand-teal w-10 h-10" /></div>
                <h3 className="text-3xl font-black text-brand-navy mb-2 font-montserrat">¡Solicitud recibida!</h3>
                <p className="text-brand-navy/60 font-inter">Si WhatsApp no se abrió, no te preocupes: un asesor de Garcia Travel te contactará muy pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative w-full" {...webMcpFormAttributes}>
                <h3 className="font-montserrat text-2xl font-extrabold tracking-tight text-brand-navy">Envíanos tu solicitud</h3>
                <p className="mt-2 mb-8 text-sm text-brand-navy/60">Te respondemos por WhatsApp o por teléfono. Los campos con * son obligatorios.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label htmlFor="contacto-nombre" className={labelClass}>Nombre completo *</label>
                    <input id="contacto-nombre" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className={fieldClass} placeholder="Juan Pérez" />
                  </div>
                  <div>
                    <label htmlFor="contacto-telefono" className={labelClass}>Teléfono / WhatsApp *</label>
                    <input id="contacto-telefono" type="tel" name="phone" autoComplete="tel" inputMode="tel" value={formData.phone} onChange={handleChange} required className={fieldClass} placeholder="+1 829 000 0000" />
                  </div>
                  <div>
                    <label htmlFor="contacto-email" className={labelClass}>Correo electrónico *</label>
                    <input id="contacto-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className={fieldClass} placeholder="juan@ejemplo.com" />
                  </div>
                  <div>
                    <label htmlFor="contacto-fecha" className={labelClass}>Fecha aproximada del viaje</label>
                    <input id="contacto-fecha" type="date" name="date" onFocus={(e) => { e.currentTarget.min = todayLocal(); }} value={formData.date} onChange={handleChange} className={fieldClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="contacto-mensaje" className={labelClass}>¿A dónde te gustaría ir?</label>
                    <textarea id="contacto-mensaje" name="message" value={formData.message} onChange={handleChange} rows={4} className={`${fieldClass} resize-none`} placeholder="Ej.: Punta Cana en marzo, 2 adultos y 1 niño, todo incluido."></textarea>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>No completar<input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
                </div>
                <button type="submit" disabled={isSending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-teal py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-teal/20 transition-colors hover:bg-brand-navy disabled:opacity-60"><Send size={16} aria-hidden="true" />{isSending ? "Enviando…" : "Enviar solicitud"}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
