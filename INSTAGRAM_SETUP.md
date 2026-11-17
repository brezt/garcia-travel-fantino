# Conectar Instagram a la web

La portada muestra los últimos posts de Instagram de la agencia y las historias
activas (las de las últimas 24 horas). La sección queda oculta hasta que se
conecta la cuenta. Se hace una sola vez y lleva unos 15 minutos.

Hace falta tener a mano el usuario y la contraseña del Instagram de la agencia.

## 1. Pasar la cuenta a profesional

1. En la app de Instagram, entra al perfil de la agencia.
2. Menú ☰ → **Configuración y privacidad** → **Tipo de cuenta y herramientas**.
3. Si dice "Cambiar a cuenta profesional", púlsalo y elige **Empresa**.
   Es gratis y no cambia nada de lo que ya está publicado.

## 2. Crear la app en Meta

1. Entra en <https://developers.facebook.com/> e inicia sesión con Facebook
   (puede ser tu Facebook personal). Si es la primera vez, acepta registrarte
   como desarrollador.
2. **Mis apps** → **Crear app**.
3. Nombre: `Garcia Travel Web`. Correo de contacto: el tuyo.
4. En "Caso de uso" elige **Administrar mensajes y contenido en Instagram**
   (en inglés: *Manage messaging & content on Instagram*).
5. Si pregunta por un portafolio comercial, elige "No conectar ahora".
6. Termina con **Crear app**.

## 3. Generar el token

1. Dentro de la app, en el menú de la izquierda: **Instagram** →
   **Configuración de la API con inicio de sesión de Instagram**
   (*API setup with Instagram login*).
2. En el paso "Generar tokens de acceso", pulsa **Agregar cuenta** y entra con
   el usuario y la contraseña del Instagram de la agencia.
3. Junto a la cuenta aparece **Generar token**. Púlsalo, acepta los permisos y
   copia el token (un texto largo que empieza por `IG`).

Ese token dura 60 días. La web lo renueva sola cada semana, así que no hay que
volver a hacer esto salvo que se cambie la contraseña de Instagram o se quite el
permiso a la app.

> No envíes el token por chat ni por correo. Pégalo solo en Hostinger.

## 4. Guardarlo en Hostinger

1. hPanel → **Sitios web** → `garciatravelfantino.com` → **Node.js** (o
   "Implementaciones") → **Variables de entorno**.
2. Agrega una variable:
   - Nombre: `INSTAGRAM_ACCESS_TOKEN`
   - Valor: el token que copiaste.
3. Guarda y pulsa **Volver a implementar** (Redeploy).

En unos minutos aparece la sección "Viaja con nosotros en Instagram" en la
portada. Los posts nuevos salen solos en unos 10 minutos.

## Si algo falla

- **No aparece la sección:** revisa que la variable se llame exactamente
  `INSTAGRAM_ACCESS_TOKEN` y que se volvió a implementar.
- **Salen los posts pero no las historias:** las historias solo se muestran
  mientras están activas (24 horas). Si hay una activa y no sale, avisa.
- **Dejó de funcionar después de cambiar la contraseña de Instagram:** genera
  un token nuevo (paso 3) y reemplázalo en Hostinger (paso 4).

## Para desarrolladores

- Código: `src/lib/instagram.ts` (API de Instagram con inicio de sesión de
  Instagram, `graph.instagram.com`) y `src/components/sections/InstagramFeed.tsx`.
- El token renovado se guarda en `~/.garcia-travel/instagram-token.json` (se puede
  cambiar con `INSTAGRAM_TOKEN_FILE`). Si se cambia la variable de Hostinger, la
  web usa el token nuevo.
- El feed se pide como mucho cada 10 minutos.
