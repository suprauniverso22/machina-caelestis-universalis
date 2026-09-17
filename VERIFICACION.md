# Verificación de la copia web

Fecha: 16 de septiembre de 2026.

- Proyecto original conservado sin cambios.
- Copiados los 63 archivos de src, los 182 recursos originales, las licencias y la configuración Electron.
- Pruebas unitarias: 84 aprobadas, en 5 archivos.
- Compilación con base `/machina-caelestis-universalis/`: aprobada; PWA con 87 entradas de caché, aproximadamente 9 MB.
- Pruebas de navegador en esa subcarpeta: 11 aprobadas en la ejecución inicial; la prueba heredada de búsqueda se corrigió para buscar un módulo presente y pasó al repetirla. Las 12 comprobaciones quedaron verificadas.
- Compilación final con rutas relativas: aprobada; comprobaciones adicionales de inicio y funcionamiento sin conexión: 2 aprobadas. El directorio dist queda listo para vista previa local o alojamiento estático.
- Navegador local: Microsoft Edge (Chromium) instalado. GitHub Actions instala Chromium mediante Playwright y vuelve a ejecutar la suite completa antes de desplegar.
- Comprobaciones: las 18 coronas, fecha y giro reversible, eventos lunares, localidades, contraste y búsqueda, estado JSON, uso sin conexión, controles móviles, planisferio, lecturas Yìjīng, captura PNG y herramientas WebMCP con contexto de ensayo.

Se conservan las limitaciones funcionales y científicas del proyecto original. No se agregaron calendarios pendientes ni módulos ausentes de la interfaz original. La copia utiliza siete módulos de lecturas; el README anterior indicaba ocho y una prueba buscaba un módulo de cometas que ya no estaba en la interfaz.

Repositorio creado y asociado a https://github.com/suprauniverso22/machina-caelestis-universalis. GitHub Pages activado con GitHub Actions y HTTPS en https://suprauniverso22.github.io/machina-caelestis-universalis/. Cada publicación vuelve a comprobar las pruebas unitarias y la suite completa en Chromium; el resultado del despliegue aparece en la pestaña Actions del repositorio.