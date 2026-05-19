# Configurar Carrusel de Instagram

Esta guia explica como conseguir los datos necesarios para mostrar las ultimas 10 publicaciones reales de Instagram en la web.

## Variables Necesarias

La web necesita estas dos variables en un archivo `.env.local` en la raiz del proyecto:

```env
INSTAGRAM_USER_ID=17841400000000000
INSTAGRAM_ACCESS_TOKEN=TU_TOKEN_AQUI
```

## 1. Preparar Instagram

1. Abre Instagram.
2. Ve a `Configuracion y privacidad`.
3. Cambia la cuenta a `Profesional`, si no lo esta.
4. Elige `Empresa` o `Creador`.
5. Conecta esa cuenta de Instagram con la pagina de Facebook de Garcia Travel Fantino.

## 2. Crear App en Meta

1. Entra a [Meta for Developers](https://developers.facebook.com/).
2. Inicia sesion con la cuenta que administra Facebook e Instagram.
3. Ve a `My Apps`.
4. Haz clic en `Create App`.
5. Elige tipo de app: normalmente `Business`.
6. Ponle un nombre, por ejemplo: `Garcia Travel Website`.
7. Crea la app.

## 3. Abrir Graph API Explorer

1. Entra a [Graph API Explorer](https://developers.facebook.com/tools/explorer/).
2. Arriba, selecciona tu app.
3. En permisos agrega:

```text
pages_show_list
pages_read_engagement
instagram_basic
```

4. Haz clic en `Generate Access Token`.
5. Acepta los permisos con la cuenta administradora.

## 4. Buscar la Pagina de Facebook

En Graph API Explorer ejecuta:

```text
/me/accounts
```

Busca la pagina `Garcia Travel Fantino`.

Copia el `id` de esa pagina. Ese sera tu `PAGE_ID`.

## 5. Buscar el Instagram User ID

Ejecuta:

```text
/{PAGE_ID}?fields=instagram_business_account
```

Ejemplo:

```text
1234567890?fields=instagram_business_account
```

La respuesta debe verse similar a esto:

```json
{
  "instagram_business_account": {
    "id": "17841400000000000"
  },
  "id": "1234567890"
}
```

El `id` dentro de `instagram_business_account` es tu:

```env
INSTAGRAM_USER_ID=17841400000000000
```

## 6. Probar Publicaciones

Ejecuta:

```text
/{INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=10
```

Si ves publicaciones en la respuesta, la conexion funciona.

## 7. Copiar el Token

El token que aparece en Graph API Explorer es tu:

```env
INSTAGRAM_ACCESS_TOKEN=TU_TOKEN_AQUI
```

## 8. Crear el Archivo `.env.local`

En la raiz del proyecto, crea o edita `.env.local`:

```env
INSTAGRAM_USER_ID=17841400000000000
INSTAGRAM_ACCESS_TOKEN=TU_TOKEN_AQUI
```

Despues reinicia la app:

```bash
npm run dev
```

## Nota Importante

El token generado en Graph API Explorer suele ser temporal.

Para produccion, conviene convertirlo en un token de larga duracion desde las herramientas de Meta antes de publicar la web.
