// Datos públicos del proyecto de Sanity (no son secretos). Se pueden cambiar
// desde las variables de entorno de Hostinger sin tocar el código.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wbq0qwuq";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-02-19";
export const studioBasePath = "/admin";
