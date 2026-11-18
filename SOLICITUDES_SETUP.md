# Solicitudes de clientes en el panel /admin

Cada vez que alguien envía el formulario de contacto de la web, la solicitud se guarda en el panel (**/admin → Solicitudes de clientes**) y además se abre WhatsApp como antes.

## Activarlo (una sola vez)

1. Entra a https://www.sanity.io/manage, abre el proyecto **wbq0qwuq** → **API** → **Tokens** → **Add API token**.
2. Nombre: `web-solicitudes`. Permiso: **Editor**. Copia el token (solo se muestra una vez).
3. En Hostinger → sitio garciatravelfantino.com → Node.js → **Variables de entorno**, añade `SANITY_API_WRITE_TOKEN` con ese token.
4. Vuelve a publicar el sitio.

Mientras la variable no exista, el formulario funciona como antes (solo WhatsApp) y no se guarda nada.

## Uso en el panel

- Las solicitudes aparecen primero en la lista, las más recientes arriba.
- Los datos del cliente no se pueden editar. Sí puedes cambiar el **Estado** (Nueva, Contactado, Cotización enviada, Reservó, Descartada) y escribir **Notas internas**. Pulsa *Publicar* para guardar esos cambios.
- No se crean solicitudes a mano desde el panel.

## Privacidad

Las solicitudes se guardan con un identificador que empieza por `solicitudes.`, lo que las deja fuera de la API pública del dataset: solo las ve quien entra al panel. El token vive solo en el servidor (Hostinger), nunca en el navegador.

## Protección contra spam

- Campo oculto que solo rellenan los robots.
- Máximo 5 envíos cada 10 minutos desde la misma conexión.
