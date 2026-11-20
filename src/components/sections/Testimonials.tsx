"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/cms";
import type { GoogleReviews } from "@/lib/google-reviews";
import { siteConfig } from "@/lib/site";

const GoogleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const Stars = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div className="flex gap-1" aria-label={`${rating} de 5 estrellas`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} size={size} aria-hidden="true" className={cn(star <= Math.round(rating) ? "fill-current text-brand-gold" : "text-brand-navy/20")} />
    ))}
  </div>
);

type Card = {
  name: string;
  subtitle: string;
  content: string;
  rating: number;
  highlight: boolean;
  photo?: string;
  url?: string;
};

const Testimonials = ({ testimonials, google }: { testimonials: Testimonial[]; google?: GoogleReviews | null }) => {
  const cards: Card[] = google
    ? google.reviews.slice(0, 3).map((review, index) => ({
        name: review.author,
        subtitle: review.when ? `Reseña en Google · ${review.when}` : "Reseña en Google",
        content: review.text,
        rating: review.rating,
        highlight: index === 1,
        photo: review.authorPhoto,
        url: review.authorUrl,
      }))
    : testimonials.map((testimonial) => ({
        name: testimonial.name,
        subtitle: testimonial.role,
        content: testimonial.content,
        rating: 5,
        highlight: testimonial.highlight,
      }));

  const allReviewsUrl = google?.mapsUrl || siteConfig.mapsUrl;

  return (
    <section className="py-24 px-6 bg-brand-slate" id="testimonios">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-brand-navy font-montserrat tracking-tight">Voces de nuestros viajeros</h2>
          {google ? (
            <a
              href={allReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <GoogleLogo className="h-6 w-6" />
              <span className="font-montserrat text-xl font-extrabold text-brand-navy">{google.rating.toFixed(1).replace(".", ",")}</span>
              <Stars rating={google.rating} size={18} />
              <span className="text-sm text-brand-navy/60">{google.total} reseñas en Google</span>
            </a>
          ) : null}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {cards.map((card, index) => (
            <motion.div key={card.name + index} data-reveal initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={cn("rounded-3xl p-8 flex flex-col shadow-xl transition-transform hover:-translate-y-2", card.highlight ? "bg-brand-teal text-white md:scale-110 z-10 py-12" : "bg-white text-brand-navy")}>
              <div className="mb-6"><Stars rating={card.rating} /></div>
              <p className={cn("text-sm mb-8 font-inter italic leading-relaxed flex-1 line-clamp-[8]", card.highlight ? "text-white/90 font-medium" : "text-brand-navy/70")}>&ldquo;{card.content}&rdquo;</p>
              <div className="flex items-center gap-4">
                {card.photo ? (
                  // Foto de perfil de Google: se carga tal cual (sin optimizar) como pide Google.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={card.photo} alt="" width={40} height={40} loading="lazy" referrerPolicy="no-referrer" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold font-montserrat", card.highlight ? "bg-white/20 text-white" : "bg-brand-teal/10 text-brand-teal")}>{card.name.charAt(0)}</div>
                )}
                <div>
                  {card.url ? (
                    <a href={card.url} target="_blank" rel="noopener noreferrer" className={cn("text-sm font-bold font-montserrat hover:underline", card.highlight ? "text-white" : "text-brand-navy")}>{card.name}</a>
                  ) : (
                    <p className={cn("text-sm font-bold font-montserrat", card.highlight ? "text-white" : "text-brand-navy")}>{card.name}</p>
                  )}
                  <p className={cn("text-xs mt-1", card.highlight ? "text-white/70" : "text-brand-navy/50")}>{card.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={allReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-white px-7 py-4 sm:w-auto sm:max-w-none text-sm font-bold text-brand-navy shadow-sm transition-shadow hover:shadow-md"
          >
            <GoogleLogo className="h-5 w-5" />
            Ver todas las reseñas en Google
          </a>
          <a
            href={siteConfig.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border-2 sm:w-auto sm:max-w-none border-brand-teal px-7 py-4 text-sm font-bold text-brand-teal transition-colors hover:bg-brand-teal hover:text-white"
          >
            <Star size={16} aria-hidden="true" />
            Déjanos tu reseña
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
