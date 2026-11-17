import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TravelContentPage from "@/components/seo/TravelContentPage";
import { getContentJsonLd, isExpired } from "@/lib/travel-content";
import { getPackageBySlug, getPackages } from "@/lib/cms";
import { getSiteUrl } from "@/lib/site";

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

// Se regenera como mucho cada minuto (y al momento con el webhook del panel).
export const revalidate = 60;

export const generateStaticParams = async () =>
  (await getPackages()).map((travelPackage) => ({
    slug: travelPackage.slug,
  }));

export const generateMetadata = async ({
  params,
}: PackagePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const travelPackage = await getPackageBySlug(slug);

  if (!travelPackage) {
    return {};
  }

  const url = getSiteUrl(`/paquetes/${travelPackage.slug}`);

  return {
    title: {
      absolute: travelPackage.metaTitle,
    },
    description: travelPackage.description,
    alternates: {
      canonical: url,
    },
    ...(isExpired(travelPackage) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: travelPackage.metaTitle,
      description: travelPackage.description,
      url,
      type: "website",
      images: [
        {
          url: travelPackage.heroImage,
          alt: travelPackage.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: travelPackage.metaTitle,
      description: travelPackage.description,
      images: [travelPackage.heroImage],
    },
  };
};

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params;
  const travelPackage = await getPackageBySlug(slug);

  if (!travelPackage) {
    notFound();
  }

  const jsonLd = getContentJsonLd(travelPackage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TravelContentPage page={travelPackage} />
    </>
  );
}
