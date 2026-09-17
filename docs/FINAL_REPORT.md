# Informe de entrega

Machina Caelestis Universalis es un proyecto web independiente situado en `/home/splendens/machina-caelestis`. El repositorio Holy Grial quedó sin cambios tras el traslado.

## Funciones operativas

- Escena Three.js explorable, máquina procedural de 120 ruedas y 727 componentes visuales, selección e inspector de piezas, circuitos completos, vistas explotada, cortada, transparente y aislada.
- Núcleo JD UTC reversible, calendarios gregoriano/juliano, zonas IANA, localidad, velocidades negativas/positivas, pasos y búsqueda de fases lunares.
- Lecturas maya, sexagenaria/china parcial, estructura Yìjīng, pañcāṅga, año egipcio y criterio de Sirio, corona Kālacakra, Luna tipo Anticitera y catálogo/levas de cometas.
- Clasificación visible de astronomía, reconstrucción histórico-calendárica y simbolismo; fuentes, método e incertidumbre por módulo.
- Trabajador web para cálculos, PWA sin conexión, persistencia local, JSON versionado, captura, sonido optativo, teclado, alto contraste, reducción de movimiento y diseño adaptable.
- Compilación estática con base relativa; automatizaciones de CI y GitHub Pages; guía para incorporar la URL publicada en Google Sites.

## Aproximaciones declaradas

La conversión tibetana Phugpa/Tsurphu, Parkha, Mewa y auspicios están detrás de un proveedor parcial y no devuelven resultados inventados. No hay asignación diaria Han validada; la secuencia Yìjīng opcional se marca como demostración propia. Las ayanāṃśas, visibilidad de Sirio, planetas mecánicos, materiales, contacto, cargas y perfiles de cometas son aproximaciones documentadas. Véase `ASSUMPTIONS_AND_LIMITATIONS.md`.

## Verificación

- 67 pruebas unitarias y de integración: tiempo, calendarios, zonas, fechas extremas, mecánica, reversibilidad, referencias Smithsonian/HKO/USNO, pañcāṅga, órbitas, estado JSON y contratos de los ocho módulos.
- Compilación de producción y caché PWA generadas en `dist/`.
- Pruebas Chromium: arranque, navegación, controles, fecha/localidad, estado, modo sin conexión, móvil, reducción de movimiento y WebMCP.
- Auditoría de dependencias: cero vulnerabilidades conocidas en la instalación final.

## Ejecutar

```bash
cd /home/splendens/machina-caelestis
npm ci
npm run dev
```

Para distribución: `npm test`, `npm run build` y subir `dist/`. Consulte `docs/PUBLICACION.md` para GitHub Pages y Google Sites.

La ampliación prioritaria aconsejada es implementar y validar un proveedor tibetano concreto antes de añadir auspicios o matrices personales tradicionales.
