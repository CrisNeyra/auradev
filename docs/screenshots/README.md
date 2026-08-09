# Guía de capturas para el README

Esta guía explica cómo generar y ubicar screenshots o GIFs del sitio AuraDev para documentación profesional en GitHub.

## Qué capturar

| Archivo sugerido | Contenido |
|------------------|-----------|
| `docs/preview.png` | Hero completo (ya usado en README principal) |
| `docs/screenshots/servicios.png` | Grid de servicios con un modal abierto |
| `docs/screenshots/portafolio.png` | Sección portafolio con las 6 cards |
| `docs/screenshots/contacto.png` | Formulario de contacto (estado idle o éxito) |
| `docs/screenshots/whatsapp-bridge.png` | Página `/whatsapp` con logo AuraDev |
| `docs/screenshots/proyecto-detalle.gif` | Opcional: scroll en detalle de proyecto |

## Herramientas en Windows

1. **Captura estática:** `Win + Shift + S` (Snipping Tool) o [ShareX](https://getsharex.com/).
2. **GIF corto:** [ScreenToGif](https://www.screentogif.com/) — exportar &lt; 2 MB.
3. **Recorte:** mantener ancho ~1200–1400 px para README; GitHub escala a 800 px.

## Pasos

1. Levantar el sitio local: `npm run dev` → abrir `http://localhost:5173`.
2. Navegar a la sección o ruta indicada.
3. Capturar solo el contenido relevante (evitar barra del navegador si es posible).
4. Guardar en `docs/screenshots/` con el nombre de la tabla.
5. En `README.md`, enlazar:

```markdown
![Portafolio](docs/screenshots/portafolio.png)
```

## Producción (demo en vivo)

Para capturas idénticas a producción, usar la demo:

[https://auradev-eta.vercel.app](https://auradev-eta.vercel.app)

Mismos nombres de archivo; opcionalmente subfolder `docs/screenshots/prod/`.

## Buenas prácticas

- Formato PNG para UI estática; WebP o GIF para animaciones cortas.
- No incluir datos personales reales en formularios de prueba.
- Actualizar capturas cuando cambie el diseño de una sección importante.
- Commitear imágenes optimizadas (&lt; 500 KB por PNG cuando sea posible).
