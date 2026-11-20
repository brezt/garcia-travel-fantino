# Reseñas de Google en la web

La sección «Voces de nuestros viajeros» de la portada muestra automáticamente la nota media, el número de reseñas y las 3 reseñas más recientes del Perfil de Empresa de Google. Se actualiza sola una vez al día.

Mientras no haya clave, la web sigue mostrando los testimonios de siempre, con los botones «Ver todas las reseñas en Google» y «Déjanos tu reseña».

## 1. Crear la clave de Google (10 minutos, una sola vez)

1. Entra en https://console.cloud.google.com con tu cuenta de Google.
2. Arriba, en el selector de proyectos, pulsa **Proyecto nuevo**, ponle de nombre `Garcia Travel Web` y pulsa **Crear**.
3. En el buscador de arriba escribe **Places API (New)**, ábrela y pulsa **Habilitar**.
4. Si te pide una **cuenta de facturación**, añade una tarjeta. Google regala cada mes un crédito gratuito que cubre de sobra lo que usa la web (una consulta al día), así que no deberías pagar nada.
5. Ve a **APIs y servicios → Credenciales → Crear credenciales → Clave de API**. Copia la clave que aparece.
6. Pulsa **Editar clave de API** y, en **Restricciones de API**, elige **Restringir clave** y marca solo **Places API (New)**. Guarda.

## 2. Ponerla en Hostinger

1. En hPanel abre el sitio garciatravelfantino.com → **Node.js** (o **Sitios web → Configuración de la app**) → **Variables de entorno**.
2. Añade una variable nueva (sin borrar las que ya existen):
   - Nombre: `GOOGLE_PLACES_API_KEY`
   - Valor: la clave que copiaste.
3. Guarda y pulsa **Redesplegar** (o vuelve a construir la app).

En unos minutos, la portada mostrará la nota y las reseñas reales de Google.

## Opcional

- `GOOGLE_PLACE_ID`: si algún día la web mostrara las reseñas de otro negocio, pon aquí el identificador exacto de la ficha (se obtiene en https://developers.google.com/maps/documentation/places/web-service/place-id). Si no se pone, la web busca la ficha «Agencia de Viaje García Travel Fantino» por su nombre.

## Notas técnicas

- Código: `src/lib/google-reviews.ts` (Places API nueva, caché de 24 horas) y `src/components/sections/Testimonials.tsx`.
- Google solo entrega hasta 5 reseñas por consulta; se muestran tal cual, sin filtrar por estrellas, con su autor y enlace, como piden las normas de Google.
- No configures esta variable con el conector de Hostinger: reemplaza todas las variables y borraría `SANITY_API_WRITE_TOKEN`.
