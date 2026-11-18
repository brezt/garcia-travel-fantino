import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getPageJsonLd } from "@/lib/structured-data";

type LegalPageProps = {
  title: string;
  path: string;
  updatedAt: string;
  sections: { title: string; body: string[] }[];
};

const LegalPage = ({ title, path, updatedAt, sections }: LegalPageProps) => (
  <main className="relative">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getPageJsonLd("WebPage", title, path)) }}
    />
    <Header />
    <section className="bg-brand-navy px-6 pb-16 pt-36">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
        <h1 className="font-montserrat text-4xl font-black uppercase text-white md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-white/60">Última actualización: {updatedAt}</p>
      </div>
    </section>
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        {sections.map((section) => (
          <article key={section.title}>
            <h2 className="mb-3 font-montserrat text-xl font-black uppercase text-brand-navy">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mb-3 leading-7 text-brand-navy/75">
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
    <Footer />
  </main>
);

export default LegalPage;
