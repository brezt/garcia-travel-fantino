import type { Metadata } from "next";
import LegalPage from "@/components/seo/LegalPage";
import { siteConfig } from "@/lib/site";
import { LEGAL_UPDATED_LABEL, privacySections } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Cómo ${siteConfig.name} recopila, usa y protege los datos personales de sus clientes y visitantes.`,
  alternates: { canonical: "/privacidad", types: { "text/markdown": "/privacidad.md" } },
};

export default function PrivacyPage() {
  return <LegalPage path="/privacidad" title="Política de privacidad" updatedAt={LEGAL_UPDATED_LABEL} sections={privacySections} />;
}
