import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import { getPosts } from "@/lib/cms";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog de viajes",
  description:
    "Consejos, destinos y novedades de viaje de Garcia Travel Fantino para planificar tu próxima aventura.",
  alternates: { canonical: getSiteUrl("/blog") },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="relative bg-brand-slate">
      <Header />
      <section className="bg-brand-navy px-6 pb-16 pt-36 text-center">
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
