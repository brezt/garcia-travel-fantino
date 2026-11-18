import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import { getPosts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { getPageJsonLd } from "@/lib/structured-data";

export const revalidate = 60;

const description =
  "Consejos, destinos y novedades de viaje de Garcia Travel Fantino para planificar tu próxima aventura.";

export const metadata: Metadata = pageMetadata({
  title: "Blog de viajes",
  description,
  path: "/blog",
  markdownPath: "/blog.md",
});

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="relative bg-brand-slate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd("CollectionPage", "Blog de viajes", "/blog", description)),
        }}
      />
      <Header />
      <section className="bg-brand-navy px-6 pb-16 pt-44 md:pt-48 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">Blog de viajes</p>
        <h1 className="mt-2 font-montserrat text-4xl font-black uppercase text-white md:text-6xl">
          Ideas para tu próximo viaje
        </h1>
      </section>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="mx-auto max-w-xl text-center text-brand-navy/70">
              Muy pronto compartiremos aquí consejos y novedades de viaje.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
