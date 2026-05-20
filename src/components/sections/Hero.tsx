"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { openWhatsApp } from "@/lib/whatsapp";
import { Compass, Luggage, MapPinned, Palmtree, Plane, ShipWheel } from "lucide-react";
import { motion } from "framer-motion";
import PlugConnectedIcon from "@/components/ui/plug-connected-icon";

const floatingIcons = [
  {
    Icon: Plane,
    className: "left-8 top-8 text-white/55",
    iconClassName: "-rotate-45",
    size: 82,
    duration: 4,
    delay: 0,
  },
  {
    Icon: Compass,
    className: "right-16 top-20 text-white/35",
    iconClassName: "rotate-12",
    size: 58,
    duration: 5,
    delay: 0.4,
  },
  {
    Icon: Luggage,
    className: "left-20 bottom-28 text-white/35",
    iconClassName: "-rotate-6",
    size: 54,
    duration: 4.8,
    delay: 0.8,
  },
  {
    Icon: MapPinned,
    className: "right-24 bottom-32 text-white/40",
    iconClassName: "rotate-6",
    size: 56,
    duration: 5.4,
    delay: 0.2,
  },
  {
    Icon: Palmtree,
    className: "left-[18%] top-1/3 text-brand-cyan/35",
    iconClassName: "-rotate-12",
    size: 50,
    duration: 4.6,
    delay: 1,
  },
  {
    Icon: ShipWheel,
    className: "right-[18%] top-[42%] text-white/25",
    iconClassName: "rotate-12",
    size: 48,
    duration: 5.8,
    delay: 0.6,
  },
];

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-beach.jpg"
          alt="Pareja caminando por una playa tropical"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f7f9fb] scale-y-[1.02] origin-bottom" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {floatingIcons.map(({ Icon, className, iconClassName, size, duration, delay }) => (
            <motion.div
              key={className}
              animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
              transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute drop-shadow-xl ${className}`}
            >
              <Icon size={size} strokeWidth={1.15} className={iconClassName} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] font-montserrat tracking-tight shadow-black/10 drop-shadow-xl uppercase">
            Descubre el <br />
            Mundo
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-playfair italic text-5xl md:text-7xl text-brand-cyan lowercase">
              con
            </span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] font-montserrat tracking-tight shadow-black/10 drop-shadow-xl uppercase">
              Garcia Travel
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white font-medium mb-10 max-w-2xl drop-shadow-md font-inter"
        >
          Vuelos, hoteles y paquetes turísticos diseñados para ti. <br className="hidden md:block" />
          Experiencias inolvidables con asesoría en exclusiva desde Fantino.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-xl backdrop-blur-md"
        >
          <PlugConnectedIcon size={20} className="text-brand-gold" />
          Conexión directa con un asesor
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 z-20"
        >
          <Button
            onClick={() => openWhatsApp("Hola, me gustaría planificar mis vacaciones con ustedes.")}
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-full px-10 py-6 font-bold tracking-widest text-sm shadow-xl shadow-brand-gold/20"
          >
            <PlugConnectedIcon size={18} className="mr-2" />
            RESERVAR AHORA
          </Button>
          <a href="#destinos">
            <Button className="glass text-white hover:bg-white/20 rounded-full px-10 py-6 font-bold tracking-widest text-sm">
              VER DESTINOS
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
