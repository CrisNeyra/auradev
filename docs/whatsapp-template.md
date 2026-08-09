# Plantilla WhatsApp `auradev_nuevo_contacto`

Guía para recibir notificaciones del formulario de contacto **fuera de la ventana de 24 horas** de WhatsApp Cloud API.

## Por qué hace falta

Meta solo permite mensajes de texto libre si el usuario te escribió en las últimas 24 horas. Para alertas automáticas del formulario (visitante que no abrió chat), necesitás una **plantilla aprobada**.

## Pasos en Meta Business

1. Entrá a [developers.facebook.com](https://developers.facebook.com/) → tu app → **WhatsApp** → **Message templates** (o WhatsApp Manager).
2. **Create template**
   - Nombre: `auradev_nuevo_contacto` (solo minúsculas, guiones bajos).
   - Categoría: **Utility** (notificación de contacto interno al equipo).
   - Idioma: **Spanish** (`es`).
3. **Body** (ejemplo con 3 variables):

   ```
   Nuevo contacto en AuraDev.

   Nombre: {{1}}
   Email: {{2}}
   Mensaje: {{3}}
   ```

4. Enviar para revisión. La aprobación puede tardar desde minutos hasta 48 h.
5. Cuando esté **Approved**, configurar en Vercel y `backend/.env`:

```env
WHATSAPP_TEMPLATE_NAME=auradev_nuevo_contacto
WHATSAPP_TEMPLATE_LANG=es
```

## Variables en el código

El handler en `backend/src/handlers/contacto.ts` envía:

| Parámetro | Contenido |
|-----------|-----------|
| `{{1}}` | Nombre (max ~60 caracteres) |
| `{{2}}` | Email (max ~80) |
| `{{3}}` | Mensaje (max ~500) |

Asegurate de que el orden en Meta coincida con el orden en el código.

## Verificación

1. Redeploy en Vercel con las variables nuevas.
2. Enviar formulario de contacto en producción.
3. Revisar logs de Vercel: `Notificación WhatsApp (Cloud API) enviada (template: auradev_nuevo_contacto)`.
4. Confirmar recepción en el número `WHATSAPP_TO`.

## Errores frecuentes

| Código / mensaje | Causa |
|------------------|--------|
| `#131030` | `WHATSAPP_TO` no está en lista de destinatarios de prueba (modo desarrollo). |
| `#131047` | Ventana 24h cerrada sin plantilla configurada. |
| Template name does not exist | Plantilla no aprobada o nombre distinto al env var. |

## Modo desarrollo (sin plantilla)

1. Agregar tu número en **API Setup → To** en Meta.
2. Enviar `hello_world` desde el panel a tu número.
3. Responder al número de prueba de Meta para abrir ventana 24h.
4. Probar formulario (texto libre funcionará temporalmente).
