import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/lib/cms";
import { formatDate } from "@/lib/dates";

const PostCard = ({ post }: { post: PostSummary }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group flex flex-col overflow-hidden rounded-[2rem] border border-brand-slate bg-white shadow-sm transition-shadow hover:shadow-xl"
  >
    <div className="relative h-52 overflow-hidden bg-brand-slate">
      {post.coverImage ? (
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}
    </div>
    <div className="flex flex-1 flex-col p-7">
      <time dateTime={post.publishedAt} className="text-[11px] font-bold uppercase tracking-widest text-brand-teal">
        {formatDate(post.publishedAt)}
      </time>
      <h3 className="mt-2 font-montserrat text-xl font-black uppercase leading-tight text-brand-navy">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-brand-navy/70">{post.excerpt}</p>
    </div>
  </Link>
);

export default PostCard;
