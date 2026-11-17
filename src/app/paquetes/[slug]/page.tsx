import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TravelContentPage from "@/components/seo/TravelContentPage";
import {
  getContentJsonLd,
  getPackageBySlug,
  packages,
} from "@/lib/travel-content";
import { getSiteUrl } from "@/lib/site";

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export const generateStaticParams = () =>
  packages.map((travelPackage) => ({
    slug: travelPackage.slug,
  }));

export const generateMetadata = async ({
  params,
}: PackagePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const travelPackage = getPackageBySlug(slug);

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
  const travelPackage = getPackageBySlug(slug);

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
