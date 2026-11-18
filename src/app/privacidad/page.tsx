import type { Metadata } from "next";
import LegalPage from "@/components/seo/LegalPage";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { LEGAL_UPDATED_LABEL, privacySections } from "@/lib/legal";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidad",
  description: `Cómo ${siteConfig.name} recopila, usa y protege los datos personales de sus clientes y visitantes.`,
  path: "/privacidad",
  markdownPath: "/privacidad.md",
});

export default function PrivacyPage() {
  return <LegalPage path="/privacidad" title="Política de privacidad" updatedAt={LEGAL_UPDATED_LABEL} sections={privacySections} />;
}
