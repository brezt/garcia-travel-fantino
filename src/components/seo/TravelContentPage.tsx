import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, FileDown, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContentCard from "@/components/seo/ContentCard";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { isExpired, type ContentPage } from "@/lib/travel-content";

type TravelContentPageProps = {
  page: ContentPage;
  /** Otros destinos o paquetes para enlazar al final de la página. */
  related?: ContentPage[];
};

const TravelContentPage = ({ page, related = [] }: TravelContentPageProps) => {
  const isPackage = page.type === "package";
  const listPath = isPackage ? "/paquetes" : "/destinos";
  const expired = isExpired(page);
  const whatsappUrl = getWhatsAppUrl(
    expired
      ? `Hola Garcia Travel, vi la promoción "${page.shortTitle}" en la web. ¿Tienen próximas salidas o promociones parecidas?`
      : page.whatsappMessage
  );

  return (
    <main className="min-h-screen bg-brand-slate text-brand-navy">
      <Header />
      <section className="relative min-h-[76vh] overflow-hidden px-6 pb-16 pt-44 md:pt-48">
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
            href={listPath}
            className="mb-10 inline-flex w-max items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <ArrowLeft size={16} />
            {isPackage ? "Todos los paquetes" : "Todos los destinos"}
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

      {expired ? (
        <div className="px-6 pt-10">
          <p
            role="status"
            className="mx-auto max-w-7xl rounded-2xl border border-brand-gold/40 bg-brand-gold/15 px-6 py-4 text-sm font-semibold text-brand-navy"
          >
            Esta promoción ya finalizó. Escríbenos por WhatsApp para conocer las próximas salidas y
            promociones disponibles.
          </p>
        </div>
      ) : null}

      <section id="detalles" className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
              <div className="mb-8 flex flex-wrap gap-3">
                {page.location ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-slate px-4 py-2 text-xs font-bold text-brand-navy">
                    <MapPin size={15} className="text-brand-teal" />
                    {page.location}
                  </span>
                ) : null}
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

            {page.faq.length > 0 ? (
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
            ) : null}
          </div>

          <aside className="h-max rounded-[2rem] bg-brand-navy p-8 text-white shadow-xl shadow-brand-navy/10 lg:sticky lg:top-28">
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
            {page.documents && page.documents.length > 0 ? (
              <div className="mb-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-cyan">
                  Documentos
                </p>
                <ul className="space-y-2">
                  {page.documents.map((document) => (
                    <li key={document.url}>
                      <a
                        href={`${document.url}?dl=`}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                      >
                        <FileDown className="h-5 w-5 shrink-0 text-brand-gold" />
                        <span>{document.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
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

      {related.length > 0 ? (
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-montserrat text-3xl font-black uppercase text-brand-navy md:text-4xl">
                {isPackage ? "Otras promociones" : "Otros destinos"}
              </h2>
              <Link
                href={listPath}
                className="text-xs font-bold uppercase tracking-widest text-brand-teal hover:text-brand-navy"
              >
                {isPackage ? "Ver todos los paquetes" : "Ver todos los destinos"}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((item) => (
                <ContentCard key={item.slug} page={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <Footer />
    </main>
  );
};

export default TravelContentPage;
