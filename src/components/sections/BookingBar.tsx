"use client";

import React, { useRef, useState } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const destinations = [
  "Punta Cana",
  "Samana",
  "Bayahibe",
  "Puerto Plata",
  "Santo Domingo",
  "La Romana",
  "Jarabacoa",
  "Constanza",
  "Crucero",
  "Europa",
  "Estados Unidos",
  "Viaje internacional",
];

const travelerOptions = [
  "1 Habitacion, 2 Adultos",
  "1 Habitacion, 1 Adulto",
  "2 Habitaciones, 4 Adultos",
  "Familiar (3+)",
  "Grupo",
];

const BookingBar = () => {
  const destinationRef = useRef<HTMLSelectElement>(null);
  const departureDateRef = useRef<HTMLInputElement>(null);
  const arrivalDateRef = useRef<HTMLInputElement>(null);
  const travelersRef = useRef<HTMLSelectElement>(null);
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [travelers, setTravelers] = useState(travelerOptions[0]);

  const formatDate = (value: string) => {
    if (!value) return "Por definir";

    return new Intl.DateTimeFormat("es-DO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(`${value}T12:00:00`));
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const selectedDestination = destinationRef.current?.value || destination;
    const selectedDepartureDate =
      departureDateRef.current?.value || departureDate;
    const selectedArrivalDate = arrivalDateRef.current?.value || arrivalDate;
    const selectedTravelers = travelersRef.current?.value || travelers;

    const message = [
      "Solicitud de cotizacion desde la web de Garcia Travel:",
      `Destino: ${selectedDestination || "Por definir"}`,
      `Fecha de salida: ${formatDate(selectedDepartureDate)}`,
      `Fecha de llegada: ${formatDate(selectedArrivalDate)}`,
      `Personas: ${selectedTravelers}`,
      "",
      "Quedo atento/a para recibir soporte y disponibilidad.",
    ].join("\n");

    openWhatsApp(message);
  };

  return (
    <section className="relative z-30 -mt-16 px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-2 flex flex-col md:flex-row items-center gap-4 border border-brand-slate">
        <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-brand-slate">
          <MapPin className="text-brand-teal" size={20} />
          <label className="flex flex-col w-full">
            <span className="text-[10px] uppercase font-bold text-brand-navy/50 tracking-wider">
              Destino
            </span>
            <select
              ref={destinationRef}
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="w-full text-sm font-medium text-brand-navy bg-transparent outline-none cursor-pointer"
            >
              <option value="">Selecciona un destino</option>
              {destinations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-brand-slate">
          <Calendar className="text-brand-teal" size={20} />
          <label className="flex flex-col w-full">
            <span className="text-[10px] uppercase font-bold text-brand-navy/50 tracking-wider">
              Salida
            </span>
            <input
              ref={departureDateRef}
              type="date"
              value={departureDate}
              onChange={(event) => setDepartureDate(event.target.value)}
              aria-label="Fecha de salida"
              className="w-full text-sm font-medium text-brand-navy bg-transparent outline-none cursor-pointer"
            />
          </label>
        </div>

        <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-brand-slate">
          <Calendar className="text-brand-teal" size={20} />
          <label className="flex flex-col w-full">
            <span className="text-[10px] uppercase font-bold text-brand-navy/50 tracking-wider">
              Llegada
            </span>
            <input
              ref={arrivalDateRef}
              type="date"
              value={arrivalDate}
              onChange={(event) => setArrivalDate(event.target.value)}
              aria-label="Fecha de llegada"
              className="w-full text-sm font-medium text-brand-navy bg-transparent outline-none cursor-pointer"
            />
          </label>
        </div>

        <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
          <Users className="text-brand-teal" size={20} />
          <label className="flex flex-col w-full">
            <span className="text-[10px] uppercase font-bold text-brand-navy/50 tracking-wider">
              Personas
            </span>
            <select
              ref={travelersRef}
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
              className="w-full text-sm font-medium text-brand-navy bg-transparent outline-none cursor-pointer"
            >
              {travelerOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          aria-label="Enviar busqueda por WhatsApp"
          title="Enviar busqueda por WhatsApp"
          className="w-full md:w-auto mt-2 md:mt-0 bg-brand-teal text-white p-4 rounded-xl hover:bg-brand-teal/90 transition-colors flex items-center justify-center"
        >
          <Search size={24} />
        </button>
      </div>
    </section>
  );
};

export default BookingBar;
