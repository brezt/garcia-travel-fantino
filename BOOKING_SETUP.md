# Buscador «Solo hotel» con Booking.com

La pestaña «Solo hotel» del buscador de la portada queda **oculta** hasta que se configure el afiliado de Booking. Mientras tanto el buscador funciona como antes (cotización por WhatsApp).

## 1. Solicitar la afiliación

1. Entra a https://www.booking.com/affiliate-program/v2/index.html y pulsa registrarte. Te lleva a CJ Affiliate.
2. Crea la cuenta de publisher con los datos de la agencia y la web `https://www.garciatravelfantino.com`.
3. Dentro de CJ, solicita unirte al programa de Booking.com. La aprobación puede tardar varios días.

## 2. Activar la pestaña

Cuando te aprueben, en Hostinger → sitio garciatravelfantino.com → Node.js → **Variables de entorno**, añade:

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_BOOKING_AFFILIATE` | Tu ID de afiliado de Booking (solo números), **o** el enlace profundo que te da CJ terminado en `url=` |

Después vuelve a publicar el sitio (la variable se lee al construirlo).

Formatos aceptados:

- `1234567` → se añade `aid=1234567` a la búsqueda de Booking.
- `https://www.anrdoezrs.net/click-1234567-7654321?url=` → la búsqueda de Booking se añade codificada al final.

Si CJ te entrega otro formato de enlace, pásalo y se ajusta `src/lib/booking.ts`.

## Cómo funciona

- **Paquete o vuelo + hotel**: arma un mensaje y abre WhatsApp, igual que antes.
- **Solo hotel**: abre en una pestaña nueva los resultados de Booking.com para la ciudad, fechas y personas elegidas, con el enlace de afiliado. Debajo se muestra el aviso de comisión, que también figura en `/privacidad`.
