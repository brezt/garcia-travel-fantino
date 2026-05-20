"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

const mapsUrl = siteConfig.mapsUrl;
const mapsEmbedUrl =
  "https://www.google.com/maps?q=Garcia%20Travel%20Fantino%2C%20Fantino%2C%20Rep%C3%BAblica%20Dominicana&output=embed";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const socialLinks = [
  {
    href: siteConfig.instagram,
    label: "Instagram de Garcia Travel Fantino",
    Icon: InstagramIcon,
  },
  {
    href: siteConfig.facebook,
    label: "Facebook de Garcia Travel Fantino",
    Icon: FacebookIcon,
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#2A2C32] text-white pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 mb-16">
        <div className="flex-1 max-w-sm">
          <Link href="/" className="inline-flex items-center mb-6 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/20">
            <Image
              src={siteConfig.logoPath}
              alt="Garcia Travel Fantino"
              width={1024}
              height={1024}
              className="w-[170px] md:w-[210px] h-auto object-contain drop-shadow-sm"
            />
          </Link>
          <p className="text-white/50 text-xs leading-relaxed mb-8">
            Ofrecemos experiencias de viaje unicas alrededor del mundo con el mejor servicio.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 bg-white/10 hover:bg-brand-teal transition-colors duration-300 rounded-full flex items-center justify-center"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex-1 flex gap-12 lg:gap-24">
          <div>
            <h4 className="text-brand-teal text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Servicios</h4>
            <ul className="space-y-4 text-xs text-white/70">
              <li><Link href="#" className="hover:text-white transition-colors">Vuelos</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hoteles</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Paquetes</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-brand-teal text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Legales</h4>
            <ul className="space-y-4 text-xs text-white/70">
              <li><Link href="#" className="hover:text-white transition-colors">Terminos</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacidad</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Ayuda</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex-1 flex justify-start md:justify-end">
          <div className="text-left md:text-right w-full max-w-[220px]">
            <h4 className="text-brand-teal text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-left">Ubicación</h4>
            <a
              href={mapsUrl}
              className="group block text-left"
              aria-label="Abrir ubicacion de Garcia Travel Fantino en Google Maps"
            >
              <div className="relative w-full h-32 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-black/20">
                <iframe
                  src={mapsEmbedUrl}
                  title="Mapa de Garcia Travel Fantino"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <span className="mt-3 block text-xs text-white/70 group-hover:text-white transition-colors">
                Ver ubicacion en Google Maps
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-center items-center text-[10px] text-white/40 uppercase tracking-wider">
        <p>(c) 2026 GARCIA TRAVEL FANTINO. TODOS LOS DERECHOS RESERVADOS.</p>
      </div>
    </footer>
  );
};

export default Footer;
