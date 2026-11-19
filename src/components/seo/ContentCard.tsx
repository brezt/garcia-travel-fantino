import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { ContentPage } from "@/lib/travel-content";
import { getContentPath } from "@/lib/structured-data";

type ContentCardProps = {
  page: ContentPage;
  /** Nivel del título: h2 en las páginas de listado, h3 dentro de otra sección. */
  headingLevel?: "h2" | "h3";
};

/** Tarjeta enlazada a un destino o a un paquete. */
const ContentCard = ({ page, headingLevel = "h3" }: ContentCardProps) => {
  const Heading = headingLevel;

  return (
    <Link
      href={getContentPath(page)}
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-brand-slate bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={page.heroImage}
          alt={page.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {page.price ? (
          <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-[11px] font-black text-brand-navy">
            {page.price}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <Heading className="font-montserrat text-xl font-extrabold leading-tight text-brand-navy tracking-tight">
          {page.title}
        </Heading>
        <div className="mt-3 space-y-1 text-xs text-brand-navy/60">
          {page.location ? (
            <p className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-teal" />
              {page.location}
            </p>
          ) : null}
          {page.duration ? (
            <p className="flex items-center gap-2">
              <CalendarDays size={14} className="text-brand-teal" />
              {page.duration}
            </p>
          ) : null}
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-brand-navy/70">{page.description}</p>
        <span className="mt-6 inline-flex w-max rounded-full bg-brand-teal px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors group-hover:bg-brand-navy">
          {page.type === "package" ? "Ver paquete" : "Ver destino"}
        </span>
      </div>
    </Link>
  );
};

export default ContentCard;
