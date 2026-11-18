import type { Metadata } from "next";
import LegalPage from "@/components/seo/LegalPage";
import { siteConfig } from "@/lib/site";
import { LEGAL_UPDATED_LABEL, termsSections } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: `Condiciones de uso de la web y de contratación de servicios de viaje con ${siteConfig.name}.`,
  alternates: { canonical: "/terminos", types: { "text/markdown": "/terminos.md" } },
};

export default function TermsPage() {
  return <LegalPage path="/terminos" title="Términos y condiciones" updatedAt={LEGAL_UPDATED_LABEL} sections={termsSections} />;
}
