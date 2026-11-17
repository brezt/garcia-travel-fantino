import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getPostBySlug, getPosts } from "@/lib/cms";
import { formatDate } from "@/lib/dates";
import { getSiteUrl, siteConfig } from "@/lib/site";
import { imageUrl } from "@/sanity/client";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export const generateStaticParams = async () =>
  (await getPosts()).map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = getSiteUrl(`/blog/${post.slug}`);
  const images = post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt }] : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      images,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
};

type BodyImage = { asset?: { _ref: string }; alt?: string; caption?: string };

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: BodyImage }) =>
      value.asset ? (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl(value, 1400)}
            alt={value.alt ?? ""}
            loading="lazy"
            className="w-full rounded-2xl"
          />
          {value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-brand-navy/60">{value.caption}</figcaption>
          ) : null}
        </figure>
      ) : null,
  },
  block: {
    h2: ({ children }) => <h2 className="mb-4 mt-10 font-montserrat text-2xl font-black uppercase text-brand-navy">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-8 font-montserrat text-xl font-black text-brand-navy">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-teal pl-5 italic text-brand-navy/80">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="mb-5 leading-8 text-brand-navy/80">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-brand-navy/80">{children}</ul>,
    number: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-brand-navy/80">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="font-semibold text-brand-teal underline underline-offset-4"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.coverImage,
    url: getSiteUrl(`/blog/${post.slug}`),
    publisher: { "@type": "TravelAgency", name: siteConfig.name, url: getSiteUrl() },
  };

  return (
    <main className="relative bg-brand-slate">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <section className="relative overflow-hidden bg-brand-navy px-6 pb-16 pt-36">
        {post.coverImage ? (
          <>
            <Image src={post.coverImage} alt={post.coverAlt} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-brand-navy/70" />
          </>
        ) : null}
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <ArrowLeft size={16} />
            Blog
          </Link>
          <time dateTime={post.publishedAt} className="block text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
            {formatDate(post.publishedAt)}
          </time>
          <h1 className="mt-3 font-montserrat text-3xl font-black uppercase leading-tight text-white md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-white/80">{post.excerpt}</p>
        </div>
      </section>
      <article className="px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm md:p-12">
          <PortableText value={post.body} components={components} />
        </div>
      </article>
      <Footer />
    </main>
  );
}
