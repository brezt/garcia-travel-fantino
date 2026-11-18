import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TravelContentPage from "@/components/seo/TravelContentPage";
import { isExpired } from "@/lib/travel-content";
import { getContentJsonLd } from "@/lib/structured-data";
import { getActivePackages, getPackageBySlug, getPackages } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

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

  return pageMetadata({
    title: travelPackage.metaTitle,
    absoluteTitle: true,
    description: travelPackage.description,
    path: `/paquetes/${travelPackage.slug}`,
    markdownPath: `/paquetes/${travelPackage.slug}.md`,
    image: { url: travelPackage.heroImage, alt: travelPackage.imageAlt },
    noIndex: isExpired(travelPackage),
  });
};

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params;
  const travelPackage = await getPackageBySlug(slug);

  if (!travelPackage) {
    notFound();
  }

  const jsonLd = getContentJsonLd(travelPackage);
  const related = (await getActivePackages()).filter((item) => item.slug !== travelPackage.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TravelContentPage page={travelPackage} related={related} />
    </>
  );
}
