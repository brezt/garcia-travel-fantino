"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { motion } from "motion/react";
import type { InstagramFeed as Feed, InstagramMedia } from "@/lib/instagram";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const StoryViewer = ({
  stories,
  index,
  onClose,
  onChange,
}: {
  stories: InstagramMedia[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) => {
  const story = stories[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && index < stories.length - 1) onChange(index + 1);
      if (event.key === "ArrowLeft" && index > 0) onChange(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, stories.length, onClose, onChange]);

  // Las imágenes pasan solas a los 6 segundos; los videos al terminar.
  useEffect(() => {
    if (story.mediaType === "VIDEO") return;
    const timer = window.setTimeout(() => {
      if (index < stories.length - 1) onChange(index + 1);
      else onClose();
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [story, index, stories.length, onChange, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Historia de Instagram"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div className="relative aspect-[9/16] h-full max-h-[85vh] overflow-hidden rounded-3xl bg-black" onClick={(event) => event.stopPropagation()}>
        <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
          {stories.map((item, itemIndex) => (
            <span key={item.id} className={`h-1 flex-1 rounded-full ${itemIndex <= index ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>
        {story.mediaType === "VIDEO" && story.videoUrl ? (
          <video
            key={story.id}
            src={story.videoUrl}
            poster={story.imageUrl}
            autoPlay
            playsInline
            controls={false}
            onEnded={() => (index < stories.length - 1 ? onChange(index + 1) : onClose())}
            className="h-full w-full object-cover"
          />
        ) : (
          <img key={story.id} src={story.imageUrl} alt={story.caption || "Historia de Instagram"} className="h-full w-full object-cover" />
        )}
        <button type="button" aria-label="Historia anterior" className="absolute inset-y-0 left-0 w-1/3" onClick={() => index > 0 && onChange(index - 1)} />
        <button type="button" aria-label="Historia siguiente" className="absolute inset-y-0 right-0 w-1/3" onClick={() => (index < stories.length - 1 ? onChange(index + 1) : onClose())} />
      </div>
      <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25">
        <X size={22} />
      </button>
    </div>
  );
};

const InstagramFeed = ({ feed, profileUrl }: { feed: Feed; profileUrl: string }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [openStory, setOpenStory] = useState<number | null>(null);
  const handle = feed.username ? `@${feed.username}` : "Instagram";

  const scroll = (direction: "left" | "right") => {
    scrollerRef.current?.scrollBy({ left: direction === "left" ? -360 : 360, behavior: "smooth" });
  };

  return (
    <section className="bg-white px-6 py-24" id="instagram">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">{handle}</p>
            <h2 className="font-montserrat text-4xl font-black uppercase leading-tight text-brand-navy md:text-5xl">
              Viaja con nosotros en Instagram
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => scroll("left")} aria-label="Ver publicaciones anteriores" className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-slate text-brand-navy hover:bg-brand-slate">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => scroll("right")} aria-label="Ver más publicaciones" className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-slate text-brand-navy hover:bg-brand-slate">
              <ChevronRight size={20} />
            </button>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-navy">
              <InstagramIcon size={17} />
              Seguir
            </a>
          </div>
        </div>

        {feed.stories.length > 0 ? (
          <div className="mb-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-navy/50">Historias de hoy</p>
            <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {feed.stories.map((story, index) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setOpenStory(index)}
                  aria-label={`Ver historia ${index + 1} de ${feed.stories.length}`}
                  className="shrink-0 rounded-full bg-gradient-to-tr from-brand-gold via-brand-teal to-brand-cyan p-[3px] transition-transform hover:scale-105"
                >
                  <span className="block h-20 w-20 overflow-hidden rounded-full border-[3px] border-white bg-brand-slate md:h-24 md:w-24">
                    <img src={story.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div ref={scrollerRef} className="flex items-start gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {feed.posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index, 4) * 0.08 }}
              className="group w-[260px] shrink-0 overflow-hidden rounded-2xl border border-brand-slate bg-brand-slate shadow-sm transition-shadow hover:shadow-xl md:w-[280px]"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-brand-teal/10">
                <img
                  src={post.imageUrl}
                  alt={post.caption ? post.caption.slice(0, 120) : "Publicación de Instagram de Garcia Travel Fantino"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {post.mediaType === "VIDEO" ? (
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">
                    <Play size={14} className="fill-current" />
                  </span>
                ) : null}
              </div>
              {post.caption ? (
                <div className="p-5">
                  <p className="line-clamp-3 text-sm leading-relaxed text-brand-navy/70">{post.caption}</p>
                </div>
              ) : null}
            </motion.a>
          ))}
        </div>
      </div>

      {openStory !== null ? (
        <StoryViewer stories={feed.stories} index={openStory} onChange={setOpenStory} onClose={() => setOpenStory(null)} />
      ) : null}
    </section>
  );
};

export default InstagramFeed;
