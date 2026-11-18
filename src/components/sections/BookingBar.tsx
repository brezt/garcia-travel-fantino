"use client";

import React, { useState } from "react";
import { BedDouble, Calendar, MapPin, Plane, Search, Users } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import { buildBookingSearchUrl, isBookingEnabled } from "@/lib/booking";
import { cn } from "@/lib/utils";

const packageDestinations = [
  "Punta Cana",
  "Samaná",
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

const hotelSuggestions = [
  "Punta Cana",
  "Bávaro",
  "Samaná",
  "Las Terrenas",
  "Bayahibe",
  "Puerto Plata",
  "Sosúa",
  "Santo Domingo",
  "La Romana",
  "Jarabacoa",
  "Constanza",
  "Santiago de los Caballeros",
  "Miami",
  "Nueva York",
  "Orlando",
  "Madrid",
  "Medellín",
  "Cancún",
];

const travelerOptions = [
  "1 Habitación, 2 Adultos",
  "1 Habitación, 1 Adulto",
  "2 Habitaciones, 4 Adultos",
  "Familiar (3+)",
  "Grupo",
];

type Mode = "paquete" | "hotel";

const fieldClass = "w-full text-sm font-medium text-brand-navy bg-transparent outline-none cursor-pointer";
const labelClass = "text-[10px] uppercase font-bold text-brand-navy/50 tracking-wider";
const cellClass =
  "flex-1 w-full min-w-0 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-brand-slate";

const formatDate = (value: string) => {
  if (!value) return "Por definir";

  return new Intl.DateTimeFormat("es-DO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
};

const todayIso = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
};

const BookingBar = () => {
  const [mode, setMode] = useState<Mode>("paquete");

  // Paquete o vuelo + hotel (WhatsApp)
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState(travelerOptions[0]);

  // Solo hotel (Booking.com)
  const [hotelDestination, setHotelDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [hotelError, setHotelError] = useState("");

  const handlePackageSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const message = [
      "Solicitud de cotización desde la web de Garcia Travel:",
      `Destino: ${destination || "Por definir"}`,
      `Fecha de ida: ${formatDate(departureDate)}`,
      `Fecha de regreso: ${formatDate(returnDate)}`,
      `Personas: ${travelers}`,
      "",
      "Quedo atento/a para recibir soporte y disponibilidad.",
    ].join("\n");

    openWhatsApp(message);
  };

  const handleHotelSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hotelDestination.trim()) {
      setHotelError("Escribe una ciudad o zona para buscar hoteles.");
      return;
    }
    if (checkin && checkout && checkout <= checkin) {
      setHotelError("La fecha de salida tiene que ser posterior a la de entrada.");
      return;
    }
    setHotelError("");

    const url = buildBookingSearchUrl({
      destination: hotelDestination.trim(),
      checkin,
      checkout,
      adults,
      children,
      rooms,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const tabs: { id: Mode; label: string; shortLabel: string; Icon: typeof Plane }[] = [
    { id: "paquete", label: "Paquete o vuelo + hotel", shortLabel: "Paquete", Icon: Plane },
    { id: "hotel", label: "Solo hotel", shortLabel: "Solo hotel", Icon: BedDouble },
  ];

  return (
    <section className="relative z-30 -mt-16 px-6 max-w-6xl mx-auto">
      {isBookingEnabled ? (
        <div role="tablist" aria-label="Tipo de búsqueda" className="flex gap-2 mb-2">
          {tabs.map(({ id, label, shortLabel, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={mode === id}
              aria-controls={`panel-${id}`}
              onClick={() => setMode(id)}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-md transition-colors",
                mode === id
                  ? "bg-brand-teal text-white"
                  : "bg-white/90 text-brand-navy hover:bg-white backdrop-blur-md"
              )}
            >
              <Icon size={16} />
              <span className="sm:hidden">{shortLabel}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      ) : null}

      {mode === "paquete" || !isBookingEnabled ? (
        <form
          id="panel-paquete"
          role={isBookingEnabled ? "tabpanel" : undefined}
          aria-labelledby={isBookingEnabled ? "tab-paquete" : undefined}
          onSubmit={handlePackageSearch}
          className="bg-white rounded-2xl shadow-xl p-4 md:p-2 flex flex-col md:flex-row items-center gap-4 border border-brand-slate"
        >
          <div className={cellClass}>
            <MapPin className="text-brand-teal shrink-0" size={20} />
            <label className="flex flex-col w-full">
              <span className={labelClass}>Destino</span>
              <select
                id="paquete-destino"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className={fieldClass}
              >
                <option value="">Selecciona un destino</option>
                {packageDestinations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={cellClass}>
            <Calendar className="text-brand-teal shrink-0" size={20} />
            <label className="flex flex-col w-full">
              <span className={labelClass}>Ida</span>
              <input
                id="paquete-ida"
                type="date"
                min={todayIso()}
                suppressHydrationWarning
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <div className={cellClass}>
            <Calendar className="text-brand-teal shrink-0" size={20} />
            <label className="flex flex-col w-full">
              <span className={labelClass}>Regreso</span>
              <input
                id="paquete-regreso"
                type="date"
                min={departureDate || todayIso()}
                suppressHydrationWarning
                value={returnDate}
                onChange={(event) => setReturnDate(event.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <div className={cn(cellClass, "md:border-r-0 border-b-0")}>
            <Users className="text-brand-teal shrink-0" size={20} />
            <label className="flex flex-col w-full">
              <span className={labelClass}>Personas</span>
              <select
                id="paquete-personas"
                value={travelers}
                onChange={(event) => setTravelers(event.target.value)}
                className={fieldClass}
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
            type="submit"
            aria-label="Cotizar por WhatsApp"
            title="Cotizar por WhatsApp"
            className="w-full md:w-auto mt-2 md:mt-0 bg-brand-teal text-white p-4 rounded-xl hover:bg-brand-teal/90 transition-colors flex items-center justify-center gap-2"
          >
            <Search size={24} />
            <span className="md:hidden text-sm font-bold uppercase tracking-wider">Cotizar por WhatsApp</span>
          </button>
        </form>
      ) : (
        <form
          id="panel-hotel"
          role="tabpanel"
          aria-labelledby="tab-hotel"
          onSubmit={handleHotelSearch}
          className="bg-white rounded-2xl shadow-xl border border-brand-slate"
        >
          <div className="p-4 md:p-2 flex flex-col md:flex-row items-center gap-4">
            <div className={cellClass}>
              <MapPin className="text-brand-teal shrink-0" size={20} />
              <label className="flex flex-col w-full">
                <span className={labelClass}>Ciudad o zona</span>
                <input
                  id="hotel-destino"
                  type="text"
                  list="hotel-sugerencias"
                  placeholder="Ej.: Punta Cana"
                  value={hotelDestination}
                  onChange={(event) => setHotelDestination(event.target.value)}
                  className={cn(fieldClass, "cursor-text placeholder:text-brand-navy/40")}
                  autoComplete="off"
                />
                <datalist id="hotel-sugerencias">
                  {hotelSuggestions.map((item) => (
                    <option key={item} value={item} />
                  ))}
                </datalist>
              </label>
            </div>

            <div className={cellClass}>
              <Calendar className="text-brand-teal shrink-0" size={20} />
              <label className="flex flex-col w-full">
                <span className={labelClass}>Entrada</span>
                <input
                  id="hotel-entrada"
                  type="date"
                  min={todayIso()}
                  suppressHydrationWarning
                  value={checkin}
                  onChange={(event) => setCheckin(event.target.value)}
                  className={fieldClass}
                />
              </label>
            </div>

            <div className={cellClass}>
              <Calendar className="text-brand-teal shrink-0" size={20} />
              <label className="flex flex-col w-full">
                <span className={labelClass}>Salida</span>
                <input
                  id="hotel-salida"
                  type="date"
                  min={checkin || todayIso()}
                  suppressHydrationWarning
                  value={checkout}
                  onChange={(event) => setCheckout(event.target.value)}
                  className={fieldClass}
                />
              </label>
            </div>

            <div className={cn(cellClass, "md:border-r-0 border-b-0")}>
              <Users className="text-brand-teal shrink-0" size={20} />
              <div className="grid grid-cols-3 gap-2 w-full">
                <label className="flex flex-col min-w-0">
                  <span className={labelClass}>Adultos</span>
                  <select id="hotel-adultos" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className={fieldClass}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col min-w-0">
                  <span className={labelClass}>Niños</span>
                  <select id="hotel-ninos" value={children} onChange={(e) => setChildren(Number(e.target.value))} className={fieldClass}>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col min-w-0">
                  <span className={labelClass}>Hab.</span>
                  <select id="hotel-habitaciones" value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className={fieldClass}>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <button
              type="submit"
              aria-label="Buscar hoteles en Booking.com"
              title="Buscar hoteles en Booking.com"
              className="w-full md:w-auto mt-2 md:mt-0 bg-brand-navy text-white p-4 rounded-xl hover:bg-brand-navy/90 transition-colors flex items-center justify-center gap-2"
            >
              <Search size={24} />
              <span className="md:hidden text-sm font-bold uppercase tracking-wider">Buscar hoteles</span>
            </button>
          </div>

          <div className="flex flex-col gap-1 border-t border-brand-slate px-6 py-3 text-xs text-brand-navy/60 md:flex-row md:items-center md:justify-between">
            {hotelError ? (
              <p role="alert" className="font-semibold text-red-700">{hotelError}</p>
            ) : (
              <p>
                Los resultados se abren en Booking.com. Garcia Travel puede recibir una comisión por las reservas, sin costo extra para ti.
              </p>
            )}
            <button
              type="button"
              onClick={() => setMode("paquete")}
              className="text-left font-bold text-brand-teal hover:underline md:text-right"
            >
              ¿Vuelo, traslados o excursiones? Cotiza el paquete completo
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default BookingBar;
