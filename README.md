# Machina Caelestis Universalis

Sitio web: [abrir Machina Caelestis Universalis](https://suprauniverso22.github.io/machina-caelestis-universalis/). Repositorio: [suprauniverso22/machina-caelestis-universalis](https://github.com/suprauniverso22/machina-caelestis-universalis). Consulta [DESPLIEGUE.md](DESPLIEGUE.md) para subir el repositorio y activar GitHub Pages.

Computadora Celestial en español: una rueda SVG con 18 coronas concéntricas y Tonatiuh en el centro, conforme al croquis de `RESOURCES/ESTETICA Y ORGANIZACION/`. Los discos comparten el reloj y pueden girarse con ratón, tacto o teclado. No requiere WebGL ni dibuja engranajes.

## Ejecutar y probar

Requisitos: Node.js 22.12 o superior y npm.

```bash
npm ci
npm run dev
```

Abre `http://127.0.0.1:5173/` en el navegador. Prueba el arrastre de las coronas, los selectores de disco y glifo, el selector de fecha, los botones de reproducción y las pestañas de planisferio y símbolos.

Para validar el proyecto completo:

```bash
npm run build                 # Genera la versión desplegable en dist/
npm test -- --run            # Pruebas unitarias
npx playwright install chromium
npm run test:e2e              # Pruebas de navegador, PWA y móvil
```

Para abrir la versión de producción localmente:

```bash
npm run preview
```

Después abre `http://127.0.0.1:4173/`. La aplicación funciona sin cuentas ni servicios externos; la PWA puede continuar sin conexión después de cargarla una vez.

## Manejo

- Arrastra una corona: cambia el instante de todas las ruedas. El giro cruza 0° sin saltos.
- Pasa el cursor por un glifo para ver su ficha; púlsalo para fijarlo en el inspector. En móvil o con teclado, usa los selectores «Disco activo» y «Glifo o división».
- Enfoca una corona con Tab y usa ←/→ para recorrer sectores. Fuera de una corona, las flechas avanzan o retroceden un día. Espacio reproduce o pausa; `/` busca; Escape recupera la interfaz.
- El selector de fecha aplica mediodía UTC gregoriano. «Tiempo y lugar» permite hora precisa, calendario juliano, años negativos y localidad.
- «Sincronizar Hoy» usa el reloj UTC del dispositivo, sin conversión a TAI.
- Selecciona velocidades positivas o negativas, incluidos un día o un año medio por segundo.
- +/− amplían la rueda; «Encuadrar rueda» recupera el conjunto. «Contemplar» oculta los paneles.
- Guarda/importa el estado JSON o captura la rueda como PNG de 2200 × 2200.
- El planisferio, catálogo de símbolos y siete módulos de lecturas permanecen disponibles.

## Arquitectura y datos

- `src/wheel/engine.ts`: D = JD − 2451545, fases normalizadas y conversión entre arrastre angular y tiempo.
- `src/wheel/wheel.tsx`: discos SVG, selección, fichas y arrastre.
- `src/wheel/data.json`: períodos, radios, arquitectura y fuentes de las 18 coronas.
- `src/wheel/catalog.ts`: diccionario de glifos, transliteraciones y significados.
- `src/wheel/styles.css`: composición monumental de latón y fondo azul verdoso.
- `src/wheel/capture.ts`: exportación PNG con imágenes y fuentes incorporadas.
- `src/data/cultural-art.json` y `public/art/ATTRIBUTION.json`: inventario de las 63 imágenes aportadas y sus archivos originales.

Se usan los equivalentes TypeScript de `engine.js` y `wheel.js` para integrarlos en la arquitectura existente. `index.html` conserva la entrada de Vite. Los antiguos archivos de escena y mecánica se conservan como referencia, pero la interfaz no los monta ni incluye Three.js en su visualización principal.

## Convenciones

El ángulo geométrico es 360 × fracción(D / P), normalizado para fechas anteriores a J2000. Los numerales mayas (13 días) y sus signos (20) repiten conjuntamente cada 260 días. Haab’ reserva cinco días para Wayeb’; Dendera reserva cinco días epagómenos. Las 158 ataduras del croquis representan 158 × 18.980 días.

La fase visual comparativa desde J2000 se distingue de las correlaciones históricas: la lectura maya conserva la correlación configurada; el calendario tibetano completo no se deduce de años medios; las casas son un esquema de sectores iguales, sin ascendente natal. El I Ching tiene una secuencia binaria diaria desde J2000 y una lectura editorial identificada como contemplativa.

Los Yugas usan proporción 4:3:2:1; la escala logarítmica compara duraciones sin acelerar artificialmente el ángulo. Se adopta explícitamente una convención puránica para Mahākalpa. El control avanzado de tiempo admite ±10¹⁸ días. Fuera de −4000…6000 se suspenden las efemérides y se conservan las fases cosmológicas. A esas magnitudes, la precisión de coma flotante no distingue instantes individuales pequeños.

Las reproducciones proceden de los recursos del usuario. Las referencias documentan el significado; no certifican automáticamente los derechos de cada reproducción. Se identifican las fuentes y el estado de derechos en cada ficha e inventario.
