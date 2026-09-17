# Modelo mecánico

## Grafo y motor temporal

El ensamblaje tiene 120 ruedas generadas a partir de ocho declaraciones: cinco estratos de tres ruedas por módulo. Cada circuito contiene una entrada, una rueda inversora y una salida; los estratos siguientes son transferencias coaxiales. Las geometrías agregan corona dentada, tres radios y cubo en una sola malla por rueda; ejes, soportes y tornillos se construyen proceduralmente. El contador de componentes es un recuento de subpiezas ilustrativas, no una lista de materiales industrial.

La entrada de cada tren es un actuador ideal parametrizado por su periodo, todos gobernados por JD UTC. No se afirma que un único engranaje real transmita todas esas velocidades sin reductores adicionales. `src/mechanics/machine.ts` define dientes, módulo geométrico, eje, padre, tipo de conexión y función. Los calibres y el bastidor no corresponden a dimensiones de fabricación.

Para engranajes exteriores: `ω₂/ω₁ = −Z₁/Z₂`; interiores: `+Z₁/Z₂`; conexión solidaria: `+1`. Las fracciones se multiplican y reducen por MCD. El solver rechaza padres inexistentes y ciclos sin resolver. La fase es función pura de `(JD−2451545)/periodo × relación`: avanzar y retroceder restituye la misma fase, sin integrar velocidades rueda por rueda.

| Circuito | Dientes de la capa frontal | Periodo de entrada (días) | Interpretación |
|---|---|---|---|
| Lunar | 48 → 32 → 48 | 27.321661 | Mes sideral medio; anomalía separada por pasador y ranura |
| Maya | 52 → 73 → 52 | 260 | Inversora con periodo 365; sincronización cada 18980 días |
| Sino | 60 → 12 → 30 | 60 × 365.2425 | Ciclo sexagenario medio, no irregularidades del calendario lunar |
| Yìjīng | 64 → 32 → 16 | 64 | Secuencia demostrativa propia, no algoritmo Han |
| Védico | 54 → 27 → 36 | 27.321661 | Mansiones y periodos medios; pañcāṅga numérico por separado |
| Egipcio | 36 → 12 → 30 | 360 | 36 décadas; cinco epagómenos fuera de la rueda de 360 |
| Kālacakra | 50 → 25 → 98 | 2500 × 365.2425 | Proporciones narrativas ilustrativas, sin datación de reinados |
| Cometas | 48 → 24 → 36 | 75.3 × 365.25 | Entrada media ilustrativa Halley; cartucho orbital usa elementos JPL |

## Pasador, ranura y movimientos no uniformes

El pasador gira a radio 1 alrededor de k1. El centro k2 está desplazado 0.1098 unidades; la ranura sigue el ángulo `atan2(sin θ, cos θ−0.1098)`. Se muestran el pasador y los dos bordes de la ranura. Su derivada analítica permite inspeccionar la velocidad angular variable. El modelo lunar suma esa corrección a la longitud media, con constantes de fase J2000 declaradas en código; no reproduce todas las perturbaciones.

Periodo apsidal objetivo 8.8826 años, señalado como objetivo aproximado. Los cuatro meses medios se conservan como parámetros independientes, por lo que no se atribuye cierre exacto simultáneo a todos ellos. El gráfico compara el modelo mecánico con Astronomy Engine a lo largo de un año, en grados de desfase, no como suma de errores ni integral física. El muestreo de 49 puntos no resuelve todos los extremos entre muestras.

Ecuación planetaria de Willis: `ωc=(Zs·ωs+Zr·ωr)/(Zs+Zr)`. El ejemplo central en modo mecánico sinotibetano usa Zs=20, Zr=60, corona fija y portador a un cuarto de la velocidad del sol. La representación es esquemática. El diferencial ideal simétrico devuelve `(ωa+ωb)/2`; está probado en el motor, pero no se modelan fuerzas sobre sus satélites.

## Tolerancias y cargas conceptuales

- Holgura: zona muerta angular determinista, 0–5°. No es un modelo de histéresis por contacto al invertir la carga. Mantiene la reversibilidad de la fecha.
- Dilatación: `1+19×10⁻⁶(T−20)`, coeficiente ilustrativo común. Se escala la rueda, no se resuelve un campo térmico ni coeficientes particulares de cada material.
- Pérdida: fracción configurada de par ideal de una conexión, con entrada de ensayo 1 N·m. No es un balance energético dinámico de todo el tren.
- Limitador: recorta el par calculado y señala deslizamiento. No ralentiza el reloj ni modifica las efemérides.
- Interferencias: cruce de envolventes circulares en un mismo plano; excluye pares conectados y ejes comunes. No es detección exacta de contacto entre perfiles involutos, deformación o colisión del bastidor.

## Materiales, vistas y rendimiento

Siete cilindros huecos coaxiales representan los ejes de titanio DLC. Los colores metalizados distinguen latón, cobre-berilio, bronce y el núcleo azul; la cubierta translúcida evoca cristal/zafiro. No se certifican propiedades industriales, acabados reales, resistencia o seguridad de fabricación.

La vista explotada separa capas sin alterar las relaciones. El corte retira media cubierta y reduce los estratos visibles; no secciona sólidos con tapas CAD. La transparencia afecta ruedas y cubiertas. El aislamiento desmonta del árbol de render los módulos ocultos. Los tornillos y marcadores se instancian; las geometrías de dientes se comparten. Calidad baja muestra sólo 24 ruedas frontales; media/alta conservan 120. Alta usa mayor resolución que baja; ceremonial sube densidad de estrellas y resolución. Culling frustum de Three.js habilitado por defecto.

Los anillos de planetas son periodos medios ilustrativos; no un planetario con distancias y órbitas a escala. Las levas de cometas se generan con muestras de radio heliocéntrico y una escala visual comprimida; se muestra su error de interpolación frente a Kepler.
