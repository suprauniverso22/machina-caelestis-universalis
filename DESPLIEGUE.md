# Publicar Machina Caelestis Universalis

Esta copia conserva el código, recursos, documentación y versión Electron del proyecto. No incluye el historial Git anterior, dependencias instaladas, instaladores ni compilaciones anteriores. El sitio web usa React, SVG y cálculos locales en un trabajador; no necesita backend, cuentas ni claves API. Las limitaciones científicas existentes siguen documentadas en ASSUMPTIONS_AND_LIMITATIONS.md.

## Subir a GitHub

1. Crea un repositorio vacío en GitHub, sin README ni licencia iniciales. El nombre puede ser cualquiera; se recomienda `machina-caelestis-universalis`.
2. En una terminal abierta en esta carpeta, ejecuta:

```powershell
git init -b main
git add .
git commit -m "Preparar Machina Caelestis Universalis para la web"
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

3. En GitHub, abre **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**.
4. Ejecuta `git push -u origin main`. Si el primer despliegue ocurrió antes de activar Pages, vuelve a ejecutarlo desde **Actions → Publicar en GitHub Pages → Run workflow**.
5. La URL publicada aparece en el entorno `github-pages` y en Settings → Pages.

El workflow calcula la ruta pública a partir de Pages, incluyendo repositorios en subcarpetas y dominios personalizados. Cada push a `main` ejecuta pruebas unitarias, compila, comprueba la aplicación en Chromium y publica solamente si todo pasa. Los pull requests también verifican una subcarpeta para detectar errores de rutas. No se necesitan secretos ni tokens personales en el código.

Sube los archivos de esta carpeta, incluida `.github`, no solamente `dist`. Con Git, `.gitignore` excluye dependencias y resultados generados automáticamente.

## Desarrollo y comprobación local

Requisitos: Node.js 22.12 o posterior; `.nvmrc` selecciona la rama 22.

```powershell
npm ci
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run preview
```

Abre http://127.0.0.1:4173/. Para desarrollar: `npm run dev`.

Para reproducir un despliegue en una subcarpeta:

```powershell
$env:VITE_BASE_PATH = '/mi-repositorio/'
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:4173/mi-repositorio/'
npm run build
npm run test:e2e
Remove-Item Env:VITE_BASE_PATH, Env:PLAYWRIGHT_BASE_URL
```

## Otros alojamientos estáticos

Usa `npm ci` y `npm run build`, y publica el directorio `dist`. La base relativa predeterminada permite trasladar la compilación a otra carpeta. Si el alojamiento exige una ruta fija, define `VITE_BASE_PATH` durante la compilación. `npm run preview` es únicamente una vista previa local.

La PWA necesita HTTPS (o localhost) y una primera carga con conexión para instalar la caché. Conserva las fuentes e imágenes locales y los trabajadores para poder funcionar sin conexión. Exportar/importar JSON y capturar PNG funcionan dentro del navegador. Los instaladores de escritorio siguen disponibles mediante los scripts `build:win` y `build:linux`; el navegador no utiliza Electron.

Fuentes de configuración: https://vite.dev/guide/static-deploy.html y https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages.