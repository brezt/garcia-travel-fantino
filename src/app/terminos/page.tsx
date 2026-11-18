import type { Metadata } from "next";
import LegalPage from "@/components/seo/LegalPage";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { LEGAL_UPDATED_LABEL, termsSections } from "@/lib/legal";

export const metadata: Metadata = pageMetadata({
  title: "Términos y condiciones",
  description: `Condiciones de uso de la web y de contratación de servicios de viaje con ${siteConfig.name}.`,
  path: "/terminos",
  markdownPath: "/terminos.md",
});

export default function TermsPage() {
  return <LegalPage path="/terminos" title="Términos y condiciones" updatedAt={LEGAL_UPDATED_LABEL} sections={termsSections} />;
}
