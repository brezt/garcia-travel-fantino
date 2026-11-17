import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TravelContentPage from "@/components/seo/TravelContentPage";
import { getContentJsonLd } from "@/lib/travel-content";
import { getDestinationBySlug, getDestinations } from "@/lib/cms";
import { getSiteUrl } from "@/lib/site";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

// Se regenera cada hora (y al momento cuando se publica algo en el panel).
export const revalidate = 3600;

export const generateStaticParams = async () =>
  (await getDestinations()).map((destination) => ({
    slug: destination.slug,
  }));

export const generateMetadata = async ({
  params,
}: DestinationPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

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
  const destination = await getDestinationBySlug(slug);

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
