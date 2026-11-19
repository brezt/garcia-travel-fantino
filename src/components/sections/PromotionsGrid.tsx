import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { ContentPage } from "@/lib/travel-content";

/** Promociones vigentes que se cargan desde el panel (sin contar la destacada). */
const PromotionsGrid = ({ promotions }: { promotions: ContentPage[] }) => {
  if (promotions.length === 0) return null;

  return (
    <section className="bg-white px-6 py-20" id="promociones">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">Salidas vigentes</p>
          <h2 className="font-montserrat text-3xl font-extrabold text-brand-navy md:text-[2.75rem] tracking-tight">
            Promociones
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo) => (
            <Link
              key={promo.slug}
              href={`/paquetes/${promo.slug}`}
              className="group flex flex-col overflow-hidden rounded-[2rem] border border-brand-slate bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={promo.heroImage}
                  alt={promo.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {promo.price ? (
                  <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-[11px] font-black text-brand-navy">
                    {promo.price}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-montserrat text-xl font-extrabold leading-tight text-brand-navy tracking-tight">
                  {promo.title}
                </h3>
                <div className="mt-3 space-y-1 text-xs text-brand-navy/60">
                  {promo.location ? (
                    <p className="flex items-center gap-2"><MapPin size={14} className="text-brand-teal" />{promo.location}</p>
                  ) : null}
                  {promo.duration ? (
                    <p className="flex items-center gap-2"><CalendarDays size={14} className="text-brand-teal" />{promo.duration}</p>
                  ) : null}
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-brand-navy/70">{promo.description}</p>
                <span className="mt-6 inline-flex w-max rounded-full bg-brand-teal px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors group-hover:bg-brand-navy">
                  Ver promoción
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsGrid;
