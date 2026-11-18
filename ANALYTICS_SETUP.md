# Medir visitas: Google Analytics y píxel de Meta

La web ya trae el código para medir visitas. Queda apagado hasta que pongas los dos
IDs en Hostinger. Puedes activar solo uno de los dos si quieres.

## Qué se mide

| Qué pasa en la web | Google Analytics | Píxel de Meta |
| --- | --- | --- |
| Alguien abre una página | Visita (automático) | `PageView` |
| Clic en cualquier botón o enlace de WhatsApp | Evento `whatsapp_click` (con `origen`: menu, portada, paquetes, buscador, promocion, destinos, contacto, formulario, enlace) | `Contact` |
| Envío del formulario de contacto | Evento `generate_lead` | `Lead` |

El panel `/admin` no se mide. Nunca se envían nombres, teléfonos ni mensajes.

## 1. Crear Google Analytics (10 minutos)

1. Entra en https://analytics.google.com con una cuenta de Google (puede ser la tuya).
2. Pulsa **Empezar a medir** (o **Administrar → Crear → Cuenta** si ya usas Analytics).
3. Nombre de la cuenta: `Garcia Travel Fantino`. Siguiente.
4. Nombre de la propiedad: `garciatravelfantino.com`. Zona horaria: **República Dominicana**. Moneda: **Peso dominicano** o **Dólar**. Siguiente.
5. Rellena el tipo de negocio (Viajes) y los objetivos (por ejemplo "Generar clientes potenciales"). Crear y acepta las condiciones.
6. Cuando pregunte por la plataforma elige **Web**.
   - URL: `https://www.garciatravelfantino.com`
   - Nombre del flujo: `Web`
   - Pulsa **Crear flujo**.
7. Aparece el **ID de medición**, que empieza por `G-` (por ejemplo `G-ABC123XYZ`). Cópialo.
   Si cierras la ventana: **Administrar → Flujos de datos → Web** y ahí está.

No hace falta copiar ningún código que te muestre Google: la web ya lo tiene.

## 2. Crear el píxel de Meta (10 minutos)

Necesitas una cuenta de Meta Business (la de Facebook/Instagram de la agencia, o una nueva).

1. Entra en https://business.facebook.com/events_manager
2. Pulsa **Conectar orígenes de datos** → **Web** → **Conectar**.
3. Nombre: `Garcia Travel Fantino`. Si pregunta por la web, pon `garciatravelfantino.com`.
4. Cuando ofrezca formas de instalarlo, elige **Instalar el código manualmente** solo para ver el ID, o cierra el asistente.
5. El **ID del píxel (conjunto de datos)** es un número de unos 15 o 16 dígitos. Lo ves en Administrador de eventos → Orígenes de datos, debajo del nombre. Cópialo.

## 3. Ponerlos en Hostinger

1. hPanel → **Sitios web** → garciatravelfantino.com → **Node.js** (o "Implementación") → **Variables de entorno**.
2. Añade:
   - `NEXT_PUBLIC_GA_ID` = el ID que empieza por `G-`
   - `NEXT_PUBLIC_META_PIXEL_ID` = el número del píxel
3. Guarda y pulsa **Volver a implementar** (redeploy). Los IDs se leen al compilar, así que sin una nueva implementación no se activan.

## 4. Comprobar que funciona

- **Google Analytics:** abre la web en el móvil y mira **Informes → Tiempo real**. En menos de un minuto debería aparecer 1 usuario. Pulsa un botón de WhatsApp y verás el evento `whatsapp_click`.
- **Meta:** en el Administrador de eventos, el píxel pasa a "Activo" y muestra `PageView` en unos minutos.

## Ver los clics de WhatsApp como "conversiones"

En Google Analytics: **Administrar → Eventos clave** → **Nuevo evento clave** y escribe
`whatsapp_click`. Haz lo mismo con `generate_lead`. Los eventos aparecen en la lista
después del primer clic real (puede tardar hasta 24 horas).

Para ver desde qué botón llegan: **Administrar → Definiciones personalizadas → Crear
dimensión personalizada**, nombre `Origen`, ámbito **Evento**, parámetro `origen`.
