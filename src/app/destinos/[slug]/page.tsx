import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TravelContentPage from "@/components/seo/TravelContentPage";
import { getContentJsonLd } from "@/lib/structured-data";
import { getDestinationBySlug, getDestinations } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

// Se regenera como mucho cada minuto (y al momento con el webhook del panel).
export const revalidate = 60;

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

  return pageMetadata({
    title: destination.metaTitle,
    absoluteTitle: true,
    description: destination.description,
    path: `/destinos/${destination.slug}`,
    markdownPath: `/destinos/${destination.slug}.md`,
    image: { url: destination.heroImage, alt: destination.imageAlt },
  });
};

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const jsonLd = getContentJsonLd(destination);
  const related = (await getDestinations()).filter((item) => item.slug !== destination.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TravelContentPage page={destination} related={related} />
    </>
  );
}
