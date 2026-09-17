# Calendarios, metodología y fuentes

Consultadas el 10 de septiembre de 2026. El registro estructurado también alimenta la pantalla «Fuentes y supuestos». Las referencias no implican que todos sus algoritmos estén implementados.

## Astronomy Engine · Don Cross · MIT

https://github.com/cosinekitty/astronomy/tree/master/source/js

Versión 2.1.19. Longitudes geocéntricas de fecha, fase, precesión, ΔT, salidas y horizonte. Objetivo del autor ~1 minuto de arco; no se certifica aquí todo el intervalo.

## Smithsonian NMAI · Living Maya Time

https://maya.nmai.si.edu/calendar/calendar-system

Referencia de Cuenta Larga: 2012-12-21 = 13.0.0.0.0, 4 Ajaw, 3 K’ank’in. Días enteros al comienzo del día local.

## Mark Van Stone · FAMSI · Correlación GMT

https://www.famsi.org/research/vanstone/2012/2012Part4.pdf

JDN 584283 como correlación configurable. Proyección aritmética, no uniformidad de todas las tradiciones mayas. Cargador calculado en 0 Pop como convención explícita.

## Hong Kong Observatory · Troncos y ramas

https://www.hko.gov.hk/en/gts/time/stemsandbranches.htm

Ciclo 10×12, 60 combinaciones; año Jiǎ-Zǐ ancla 1984. El año cambia con el año nuevo lunar del proveedor chino.

## HKO · Almanaque 2024

https://www.hko.gov.hk/en/gts/astron2024/files/HKO_almanac_2024.pdf

2024-02-10 es primer día del primer mes; año Dragón de Madera. Referencia de integración para Intl/ICU.

## Svante Janson · Tibetan Calendar Mathematics

https://arxiv.org/abs/1401.6285

Conversión Phugpa/Tsurphu NO implementada. Meses intercalares y días omitidos/duplicados tibetanos devuelven null. El calendario chino no los sustituye.

## Richard J. Smith · The I Ching: A Biography (2012)

https://press.princeton.edu/books/hardcover/9780691145099/the-i-ching

Marco bibliográfico para historia de sistemas Han. Sin proveedor de asignación diaria validado. Secuencia binaria demostrativa propia, líneas de abajo arriba; no secuencia King Wen ni regla antigua.

## IMD · Positional Astronomy Centre · Rashtriya Panchang

https://mausam.imd.gov.in/responsive/rashtriyPanchang.php

Marco de cálculo de pañcāṅga con longitudes numéricas. Tithi=12°; nakṣatra/yoga=13⅓°; karaṇa=6°. Ayanāṃśa lineal aproximada con constantes J2000 declaradas; no réplica certificada del almanaque oficial.

## US Naval Observatory · Fases lunares 2024

https://aa.usno.navy.mil/calculated/moon/phases?date=2024-4-08&format=p&nump=5&submit=Get+Data

Luna nueva 8 abril 2024 18:21 UTC; llena 23 abril 23:49 UTC. Validación independiente de fase y de límites de tithi/karaṇa.

## Freeth et al. · Nature 444 (2006)

https://www.nature.com/articles/nature05357

Inspiración del pasador y ranura con centros k1/k2 distintos. Nuestros dientes y montaje monumental son propios. Periodos medios y excentricidad e/r=.1098 son parámetros aproximados; precesión objetivo 8.8826 años.

## JPL SSD · Small-Body Element Tables

https://ssd.jpl.nasa.gov/sb/elem_tables.html

Halley J863/77 y Encke K105/1 copiados de los ejemplos de la tabla. Época MJD(TDB), elementos eclípticos J2000. Kepler de dos cuerpos; no representa efemérides actuales Horizons ni perturbaciones.

## Calendrical Calculations · Dershowitz y Reingold

https://www.cambridge.org/core/books/calendrical-calculations/B897CA3260110348F1F7D906B8D9480D

Calendario civil de 12×30+5 días, sin bisiestos. Época de Nabonassar adoptada: 26 febrero −746, juliano proléptico; no datación universal de las dinastías.

## Musée du Louvre · Zodiaque de Dendéra

https://collections.louvre.fr/en/ark%3A/53355/cl010028871

Inspiración de la cubierta y los decanos. Ornamentación geométrica original, sin copiar glifos ni imágenes del museo. Los 36 sectores no son constelaciones científicas identificadas.

## Alexander Berzin · Cosmología en Abhidharma y Kālacakra

https://studybuddhism.com/en/advanced-studies/abhidharma-tenet-systems/time-the-universe/buddhist-cosmology-in-abhidharma-and-kalachakra

Cronología religiosa: Rudracakrin, Kalki 25, año 98, correspondencia propuesta con 2424 e. c. No predicción científica de una guerra. Los nombres de otros reyes se dejan sin completar.

## Viṣṇu Purāṇa I.3 · traducción H. H. Wilson (1840)

https://www.sacred-texts.com/hin/vp/vp037.htm

Escalas cosmológicas tradicionales; año convencional de 365.25 días para convertir a segundos. La época juliana de Kali Yuga −3101-02-18 es una convención tradicional, no un acontecimiento observado.

## Fixtures históricos

Las pruebas anotan explícitamente su fuente y convención: Smithsonian/GMT para 2012 y creación maya; HKO para año nuevo chino 2024 e intercalación 2023; USNO para nueva y llena de abril 2024. Los límites de tithi/karaṇa se deducen de la conjunción USNO y la definición angular; no son una comparación integral con un almanaque regional. Las pruebas de aritmética o mecánica son propiedades matemáticas independientes de una tradición.

Consulte también `MECHANICAL_MODEL.md` para la diferencia entre periodo ilustrativo y lectura numérica.
