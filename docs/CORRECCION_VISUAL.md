# Corrección visual · 10 de septiembre de 2026

El proyecto independiente está en `/home/splendens/machina-caelestis`.

## Cambios verificables

- **Anomalía lunar:** disco iluminado calculado por elongación, porcentaje físico de iluminación y botones para las próximas cuatro fases principales. El dibujo es una proyección esquemática con norte arriba, no una fotografía ni la orientación aparente local del disco.
- **Yìjīng:** una función común determina las líneas del panel y de la escena 3D. Se incluyen nombres chinos, traducciones de los 64 hexagramas en orden King Wen, trigramas, transformación manual de líneas y secuencia navegable de cinco días. La secuencia diaria es una demostración binaria propia, identificada en pantalla; no una regla histórica Han. Los estados guardados en modo manual siguen siendo manuales: el botón «Activar cambio diario» permite seguir el reloj.
- **Planisferio celeste:** 925 estrellas de HYG v4.1 hasta magnitud 4.5, precesión, coordenadas ecuatoriales y horizontales, horizonte y cardinales, Sol, Luna y cinco planetas visibles a simple vista. Se pueden activar ecuador, eclíptica, plano galáctico y cuadrícula horizontal; seleccionar un astro y consultar sus coordenadas. La Vía Láctea se indica mediante una banda geométrica de ±7°, no mediante una imagen de su brillo real. El centro galáctico está rotulado cuando queda sobre el horizonte.
- **Símbolos y runas:** catálogo seleccionable con 82 entradas: numerales mayas, ocho jeroglíficos egipcios, 24 runas, tres signos cuneiformes, ocho trigramas, doce signos zodiacales, cinco nombres árabes y las formas devanagari y tibetana de Om. Cada entrada incluye descripción, cultura, periodo, procedencia y licencia. Las fuentes Noto se distribuyen localmente.
- **Maya:** numeral del día del Tzolk’in visible, coordinado con la fecha y acompañado de Haab’ y Cuenta Larga. No se atribuyen a estos numerales las formas arqueológicas de los veinte signos de día.
- Renderizado 3D bajo demanda para reducir consumo durante la pausa. Se conservan controles, ensamblaje y cálculos anteriores.

## Verificación realizada

72 pruebas unitarias/de integración aprobadas, incluyendo la luna nueva del 8 de abril de 2024, reversibilidad del Yìjīng, cambio del cielo con hora y localidad, y catálogo completo de runas. Compilación de producción correcta.

Ocho pruebas de navegador aprobadas en Chromium: los siete recorridos existentes y un recorrido nuevo de las vistas astronómicas/culturales. Se revisaron capturas y se corrigieron desbordamientos de las tarjetas de símbolos y el trazado de las fases. Las capturas se encuentran en `docs/screenshots/`.

## Alcance pendiente del encargo ampliado

Esta corrección resuelve las vistas indicadas arriba; no termina íntegramente el prompt ampliado. Siguen pendientes la reproducción epigráfica de los signos mayas y nahuas, el zodiaco de Dendera fiel al monumento, un astrolabio mecánico completo, las mansiones y recintos chinos, un proveedor tibetano validado, la asignación Han histórica, la corona historiográfica completa y varias búsquedas astronómicas adicionales. No se presentan los paneles parciales como reconstrucciones terminadas.

El planisferio aún no incluye límites oficiales de constelaciones ni movimiento propio estelar. Sus efemérides se limitan a los años −2000 a 3000; la precisión del catálogo disminuye lejos de J2000.

## Publicación

`npm run build` produce `dist/`. El ZIP `machina-caelestis-static.zip` contiene los archivos del sitio en su raíz. Se puede publicar como sitio estático; Google Sites requiere incrustar la URL de una versión alojada. No se ha publicado en servicios externos.
