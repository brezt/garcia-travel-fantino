import Studio from "./Studio";

// Panel de administración (Sanity Studio). Se entra con la cuenta de Sanity.
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function AdminPage() {
  return <Studio />;
}
