import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, MapPin, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import type { ContentPage } from "@/lib/travel-content";

type TravelContentPageProps = {
  page: ContentPage;
};

const TravelContentPage = ({ page }: TravelContentPageProps) => {
  const whatsappUrl = getWhatsAppUrl(page.whatsappMessage);

  return (
    <main className="min-h-screen bg-brand-slate text-brand-navy">
      <section className="relative min-h-[76vh] overflow-hidden px-6 pb-16 pt-28 md:pt-32">
        <Image
          src={page.heroImage}
          alt={page.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/45 to-brand-slate" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end min-h-[58vh]">
          <Link
            href="/"
            className="mb-10 inline-flex w-max items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-cyan">
            {page.eyebrow}
          </p>
          <h1 className="max-w-4xl font-montserrat text-4xl font-black uppercase leading-tight text-white md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/85 md:text-lg">
            {page.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-navy shadow-lg shadow-brand-gold/25 transition-transform hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              Cotizar por WhatsApp
            </a>
            <a
              href="#detalles"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-navy transition-colors hover:bg-brand-slate"
            >
              Ver detalles
            </a>
          </div>
        </div>
      </section>

      <section id="detalles" className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
              <div className="mb-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-slate px-4 py-2 text-xs font-bold text-brand-navy">
                  <MapPin size={15} className="text-brand-teal" />
                  {page.location}
                </span>
                {page.duration ? (
                  <span className="rounded-full bg-brand-slate px-4 py-2 text-xs font-bold text-brand-navy">
                    {page.duration}
                  </span>
                ) : null}
                {page.price ? (
                  <span className="rounded-full bg-brand-teal px-4 py-2 text-xs font-bold text-white">
                    {page.price}
                  </span>
                ) : null}
              </div>

              <div className="grid gap-8">
                {page.sections.map((section) => (
                  <article key={section.title}>
                    <h2 className="mb-3 font-montserrat text-2xl font-black uppercase text-brand-navy">
                      {section.title}
                    </h2>
                    <p className="leading-8 text-brand-navy/70">{section.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
              <h2 className="mb-6 font-montserrat text-2xl font-black uppercase text-brand-navy">
                Preguntas frecuentes
              </h2>
              <div className="grid gap-5">
                {page.faq.map((item) => (
                  <article key={item.question} className="border-b border-brand-slate pb-5 last:border-0 last:pb-0">
                    <h3 className="mb-2 text-base font-black text-brand-navy">
                      {item.question}
                    </h3>
                    <p className="text-sm leading-7 text-brand-navy/65">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-max rounded-[2rem] bg-brand-navy p-8 text-white shadow-xl shadow-brand-navy/10 lg:sticky lg:top-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
              Incluye y destaca
            </p>
            <h2 className="mb-6 font-montserrat text-2xl font-black uppercase">
              Lo que puedes consultar
            </h2>
            <ul className="mb-8 space-y-4">
              {page.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-6 text-white/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-center text-xs font-black uppercase tracking-widest text-brand-navy transition-colors hover:bg-brand-gold"
            >
              <MessageCircle size={18} />
              Hablar con un asesor
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default TravelContentPage;
