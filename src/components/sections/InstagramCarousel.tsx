"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type InstagramPost = {
  id: string;
  caption: string;
  mediaType: string;
  mediaUrl: string;
  permalink: string;
  timestamp?: string;
};

type InstagramResponse = {
  configured: boolean;
  posts: InstagramPost[];
  error?: string;
};

const instagramUrl = "https://www.instagram.com/garciatravelfantino/";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const fallbackPosts = Array.from({ length: 10 }, (_, index) => ({
  id: `fallback-${index}`,
  caption: "Conecta el feed oficial para mostrar las últimas publicaciones de García Travel Fantino.",
  mediaType: "IMAGE",
  mediaUrl: "",
  permalink: instagramUrl,
}));

const InstagramCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/instagram")
      .then((response) => response.json() as Promise<InstagramResponse>)
      .then((data) => {
        if (!isMounted) return;
        setIsConfigured(data.configured);
        setPosts(data.posts.length ? data.posts : fallbackPosts);
      })
      .catch(() => {
        if (!isMounted) return;
        setIsConfigured(false);
        setPosts(fallbackPosts);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const node = scrollerRef.current;
    if (!node) return;

    node.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  const visiblePosts = posts.length ? posts : fallbackPosts;

  return (
    <section className="bg-white px-6 py-24" id="instagram">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-brand-teal text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Instagram
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-brand-navy font-montserrat uppercase leading-tight">
              Últimas publicaciones
            </h2>
            {!isConfigured && (
              <p className="mt-3 max-w-2xl text-sm text-brand-navy/60">
                El carrusel está listo. Solo falta configurar el token oficial de Instagram para mostrar las 10 publicaciones más recientes automáticamente.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Ver publicaciones anteriores"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-slate text-brand-navy hover:bg-brand-slate"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Ver más publicaciones"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-slate text-brand-navy hover:bg-brand-slate"
            >
              <ChevronRight size={20} />
            </button>
            <a
              href={instagramUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-navy"
            >
              <InstagramIcon size={17} />
              Ver perfil
            </a>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visiblePosts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              className="group w-[280px] shrink-0 overflow-hidden rounded-2xl border border-brand-slate bg-brand-slate shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-[280px] w-full overflow-hidden bg-brand-teal/10">
                {post.mediaUrl ? (
                  <img
                    src={post.mediaUrl}
                    alt={post.caption || "Publicación de Instagram de García Travel Fantino"}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-brand-teal to-brand-cyan p-8 text-center text-white">
                    <InstagramIcon size={44} />
                    <span className="text-sm font-bold uppercase tracking-widest">García Travel Fantino</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="line-clamp-3 text-sm leading-relaxed text-brand-navy/70">
                  {post.caption || "Mira esta publicación en Instagram."}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramCarousel;
