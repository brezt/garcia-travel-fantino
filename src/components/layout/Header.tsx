"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";
import PlugConnectedIcon from "@/components/ui/plug-connected-icon";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Destinos", href: "#destinos" },
    { name: "Paquetes", href: "#paquetes" },
    { name: "Experiencias", href: "#experiencias" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500",
        isScrolled
          ? "border-b border-brand-slate/80 bg-white/95 py-3 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center group relative z-50">
          <Image
            src="/images/logo-garcia-travel-fantino.png"
            alt="Garcia Travel Fantino"
            width={1024}
            height={1024}
            priority
            className={cn(
              "transition-all duration-500 drop-shadow-xl object-contain origin-left",
              isScrolled
                ? "w-[100px] md:w-[130px] -my-2"
                : "w-[150px] md:w-[180px] -my-4"
            )}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-medium transition-all duration-300 hover:text-brand-turquoise relative group",
                isScrolled ? "text-brand-navy" : "text-white"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-turquoise transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button 
            onClick={() => openWhatsApp("Hola Garcia Travel, me gustaria cotizar un viaje.")}
            className="bg-brand-teal text-white hover:bg-brand-teal/90 rounded-full px-8 font-bold tracking-widest text-xs h-10 shadow-lg shadow-brand-teal/20"
          >
            <PlugConnectedIcon size={16} className="mr-2" />
            COTIZAR
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "p-2 transition-colors duration-300 lg:hidden",
            isScrolled ? "text-brand-navy" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] bg-white z-40 transition-transform duration-500 ease-in-out lg:hidden p-8 flex flex-col gap-6",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-2xl font-montserrat font-bold text-brand-navy border-b border-brand-slate pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Button 
          onClick={() => openWhatsApp("Hola Garcia Travel, me gustaria cotizar un viaje.")}
          className="mt-4 w-full bg-brand-teal text-white rounded-full py-4 font-bold tracking-widest"
        >
          <PlugConnectedIcon size={18} className="mr-2" />
          COTIZAR
        </Button>
      </div>
    </header>
  );
};

export default Header;
