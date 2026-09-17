# Arquitectura de la Computadora Celestial

## Flujo del tiempo

`src/core/state.ts` mantiene un único JD, persistencia e importación validada. `src/wheel/engine.ts` convierte ese instante en D = JD − J2000 y calcula cada fase por reducción modular. El arrastre aplica ΔD = Δθ × P / 360, normaliza los cruces ±180° y sincroniza el resto de las coronas. La captura de puntero mantiene el arrastre al salir de la corona.

La fecha civil admite −4000…6000 para los proveedores astronómicos. Las fases cosmológicas amplían la exploración hasta ±10¹⁸ días y suspenden los proveedores fuera de su rango. El reloj actual es UTC del dispositivo; no se presenta como TAI.

## Composición visual

`src/wheel/data.json` define 18 capas sin solapamientos, desde Tonatiuh hasta Mahākalpa. Cada capa es un grupo SVG que gira sobre (0,0), con radios, período, descripción y fuente. Las coronas Haab’, Xiuhpohualli, Dendera y Yugas tienen sectores ponderados por duración.

Los componentes memorizan el arte estático. Las actualizaciones temporales cambian las transformaciones SVG. El detalle cultural usa las imágenes locales originales y caracteres tipográficos con fuentes Noto. El inventario identifica 63 archivos aportados. Las imágenes completas permanecen disponibles en las fichas, aunque la rueda use una presentación tonal dorada.

La interfaz conserva las lecturas astronómicas, el planisferio, símbolos, ubicación, importación/exportación, sonido opcional y PWA. La escena Three.js anterior ya no se importa desde la aplicación. Los archivos mecánicos conservados son referencia histórica del proyecto, no una descripción de la interfaz vigente.

## Correlaciones y lectura

Las fases uniformes comienzan en J2000. Las lecturas mayas emplean el proveedor calendárico con correlación seleccionada. La corona de signos de 20 días y la de numerales de 13 días forman una recurrencia de 260. Las correspondencias tibetanas y las casas se describen como esquemas comparativos. La asignación del I Ching utiliza un código binario por día desde J2000, con nombres King Wen y reflexión editorial.

## Verificación

Vitest cubre épocas, calendarios, efemérides, períodos, arrastre reversible, fases negativas, eones, ponderaciones y presencia de recursos. Playwright comprueba controles, arrastre, lectura maya, pronóstico, regreso desde un eón, exportación, importación, captura PNG, móvil y recarga sin conexión.
