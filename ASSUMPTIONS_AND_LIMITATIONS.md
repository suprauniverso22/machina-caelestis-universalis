# Supuestos y limitaciones

Esta entrega es una aplicación interactiva ejecutable de alcance educativo, con motores numéricos y circuitos completos por módulo. No es un diseño para fabricar una máquina, ni una certificación de efemérides, ni la reconstrucción final de todas las tradiciones.

## Tiempo y astronomía

- JD canónico de tipo `number` IEEE754. UTC se aproxima a UT1; sin tabla explícita de segundos intercalares ni precisión subsegundo garantizada. Antes de la existencia de UTC la etiqueta identifica una extensión proléptica de UT.
- Entrada −4000…6000, con año 0. Gregorianos y julianos prolépticos; no se impone una transición histórica universal en 1582. Los años negativos de Cuenta Larga son extensiones aritméticas.
- Lecturas astronómicas habilitadas −2000…3000; validación puntual moderna, no cobertura exhaustiva. Fuera de ese intervalo se devuelve estado parcial, con calendarios y cinemática todavía disponibles.
- Zonas IANA a través de Intl/ICU del navegador. Las reglas futuras y las extrapolaciones históricas pueden variar entre versiones; no son leyes históricas universales. Hora natal DST inexistente se rechaza; la ambigüedad de una hora repetida no tiene selector de fold.
- Salida del Sol con refracción del proveedor y altitud del observador; sin relieve. En día polar se declara ausencia y el vāra recurre a medianoche. Los miembros angulares del pañcāṅga son del instante seleccionado, no necesariamente del amanecer.

## Tradiciones

- Maya: correlación GMT configurable; Tzolk’in/Haab’ completos. Cargador en 0 Pop declarado como convención, sin atribución a todas las comunidades.
- Sino: calendario chino de Intl/ICU limitado 1900–2100, zona China. Ciclo sexagenario, animales, elementos, meses y días intercalares chinos operativos. **Conversión tibetana Phugpa/Tsurphu pendiente**: días tibetanos omitidos/duplicados, Parkha, Mewa y auspicios no se asignan. Los catálogos demostrativos no son una matriz tradicional calculada.
- Yìjīng: estructura de trigramas/hexagramas y transformaciones manuales. **No hay proveedor Han validado**. La secuencia binaria es inventario educativo propio, no King Wen ni correspondencia tradicional del texto clásico. El ancla diaria de troncos/ramas se etiqueta como demostrativa y pendiente de verificación histórica.
- Védico: los cinco miembros se calculan a partir de longitudes numéricas; ayanāṃśas Lahiri y Fagan son aproximaciones lineales explícitas. Escalas de yugas y Brahmā son doctrinales. No se implementan auspicios, cartas personales ni un almanaque regional certificado.
- Egipcio: año civil aritmético con época Nabonassar elegida. Decanos como sectores de diez días, no identificaciones estelares completas. Sirio usa coordenadas J2000, precesión del proveedor y refracción, pero omite movimiento propio, extinción, nubosidad, agudeza visual y relieve. El candidato helíaco sólo es un cruce de umbrales en 1800–2200, no una fecha histórica absoluta.
- Kālacakra: se documentan Rudracakrin/XXV/año98/2424. Los 24 nombres y fechas restantes se dejan pendientes de una edición crítica. La gran guerra es narrativa religiosa, no predicción física. La corona usa proporciones ilustrativas.
- Cometas: elementos osculantes antiguos del ejemplo de JPL. Kepler elíptico de dos cuerpos y leva radial lineal de 128 intervalos. No perturbaciones ni fuerzas no gravitacionales. El adaptador acepta JSON normalizado, no la respuesta cruda completa de Horizons. No hay importador remoto obligatorio.

## Gráficos y rendimiento

La máquina, ornamentos y glifos geométricos son diseño propio. El fondo estrellado y las líneas de la vista general son orientativos, no un mapa celeste topocéntrico calibrado. Los marcadores planetarios usan periodos medios. No se simulan engranajes industriales involutos, choques de dientes, vibración, sonido físico o dilatación diferenciada por material.

Objetivo de 60 fps en hardware adecuado. No se garantiza ni se declara alcanzado con el renderizador de software de las pruebas. La calidad baja reduce capas, resolución y estrellas; no hay benchmark de una gama de GPUs. Las pestañas ocultas pausan el avance de tiempo; se calculan efemérides sólo del módulo seleccionado en un trabajador.

Los formatos, accesibilidad por teclado y vista adaptable se verifican con Chromium. Firefox, Safari, móviles reales, lectores de pantalla y Google Sites ya publicado requieren validación en esos entornos. No se ha desplegado en una cuenta de GitHub ni en Google Sites. WebMCP se registra sólo si el navegador lo ofrece; se verifica con un contexto de ensayo, no con una integración nativa disponible en este entorno.
