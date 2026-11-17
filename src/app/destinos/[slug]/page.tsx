import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TravelContentPage from "@/components/seo/TravelContentPage";
import {
  destinations,
  getContentJsonLd,
  getDestinationBySlug,
} from "@/lib/travel-content";
import { getSiteUrl } from "@/lib/site";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export const generateStaticParams = () =>
  destinations.map((destination) => ({
    slug: destination.slug,
  }));

export const generateMetadata = async ({
  params,
}: DestinationPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return {};
  }

  const url = getSiteUrl(`/destinos/${destination.slug}`);

  return {
    title: {
      absolute: destination.metaTitle,
    },
    description: destination.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: destination.metaTitle,
      description: destination.description,
      url,
      type: "website",
      images: [
        {
          url: destination.heroImage,
          alt: destination.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: destination.metaTitle,
      description: destination.description,
      images: [destination.heroImage],
    },
  };
};

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const jsonLd = getContentJsonLd(destination);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TravelContentPage page={destination} />
    </>
  );
}
