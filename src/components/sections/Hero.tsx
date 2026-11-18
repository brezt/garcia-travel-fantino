"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { openWhatsApp } from "@/lib/whatsapp";
import { MapPinned, Palmtree, Plane } from "lucide-react";
import { motion } from "motion/react";
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
];

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const updateVideoState = () => setShowVideo(mediaQuery.matches);

    updateVideoState();
    mediaQuery.addEventListener("change", updateVideoState);

    return () => mediaQuery.removeEventListener("change", updateVideoState);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-beach.webp"
          alt="Pareja caminando por una playa tropical"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        {showVideo ? (
          <video
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/hero-beach.webp"
            aria-hidden="true"
          >
            <source src="/images/hero-video.webm" type="video/webm" />
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
        ) : null}
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

        <div
          className="hero-rise mb-6 flex flex-col items-center"
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
        </div>

        <p
          className="hero-rise hero-rise-2 text-lg md:text-xl text-white font-medium mb-10 max-w-2xl drop-shadow-md font-inter"
        >
          Vuelos, hoteles y paquetes turísticos diseñados para ti. <br className="hidden md:block" />
          Experiencias inolvidables con asesoría en exclusiva desde Fantino.
        </p>

        <div
          className="hero-rise hero-rise-3 mb-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-xl backdrop-blur-md"
        >
          <PlugConnectedIcon size={20} className="text-brand-gold" />
          Conexión directa con un asesor
        </div>

        <div
          className="hero-rise hero-rise-4 flex flex-col sm:flex-row gap-4 z-20"
        >
          <Button
            onClick={() => openWhatsApp("Hola, me gustaría planificar mis vacaciones con ustedes.", "portada")}
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-full px-10 py-6 font-bold tracking-widest text-sm shadow-xl shadow-brand-gold/20"
          >
            <PlugConnectedIcon size={18} className="mr-2" />
            RESERVAR AHORA
          </Button>
          <a href="#destinos">
            <Button className="bg-white/90 text-brand-navy backdrop-blur-md hover:bg-white rounded-full px-10 py-6 font-bold tracking-widest text-sm">
              VER DESTINOS
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
