import Link from "next/link";
import type { PostSummary } from "@/lib/cms";
import PostCard from "@/components/blog/PostCard";

/** Últimas entradas del blog. No se muestra si todavía no hay ninguna. */
const LatestPosts = ({ posts }: { posts: PostSummary[] }) => {
  if (posts.length === 0) return null;

  return (
    <section className="bg-white px-6 py-20" id="blog">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">Blog de viajes</p>
            <h2 className="font-montserrat text-3xl font-extrabold text-brand-navy md:text-[2.75rem] tracking-tight">
              Ideas para tu próximo viaje
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex w-max items-center justify-center rounded-full bg-brand-slate px-7 py-4 text-xs font-bold uppercase tracking-widest text-brand-navy transition-colors hover:bg-brand-cyan"
          >
            Ver todo el blog
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
