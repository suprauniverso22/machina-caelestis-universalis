# Sitio web independiente y publicación

Machina reside en `/home/splendens/machina-caelestis`, fuera de Holy Grial. No importa código, bases de datos ni configuración de aquel proyecto. No se ha publicado en ninguna cuenta externa.

## Alojamiento estático

```bash
npm ci
npm test
npm run build
npm run preview
```

Subir **el contenido de `dist/`** a un servidor estático HTTPS. JavaScript, CSS, trabajador de cálculo, icono, manifiesto y service worker están incluidos; no hay backend. La base relativa predeterminada permite alojarlo en una subcarpeta. Servir con los tipos MIME correctos; JavaScript requiere `text/javascript` o equivalente. No abrir `index.html` como `file://`: los módulos y trabajadores web requieren HTTP(S).

Se puede construir para una ruta específica:

```bash
VITE_BASE_PATH=/machina-caelestis/ npm run build
```

Para un dominio raíz usar `VITE_BASE_PATH=/`. Vite y la PWA comparten esa base. No hay rutas internas que exijan reescritura de URLs.

## GitHub como repositorio y GitHub Pages

1. Crear un repositorio independiente y subir el código de esta carpeta, con `package.json`, `package-lock.json`, `src/`, `public/`, configuración y `.github/`. No subir `node_modules/`.
2. En **Settings → Pages → Build and deployment**, elegir **GitHub Actions**.
3. Ejecutar manualmente **Actions → Publicar en GitHub Pages → Run workflow**. El flujo realiza pruebas, calcula la subruta, construye y publica `dist/`.
4. Abrir la URL del entorno `github-pages`. El flujo de verificación se ejecuta con cada push y PR; publicar requiere ejecutar el flujo de Pages.

El flujo usa los permisos integrados de Pages; no incluye tokens personales ni claves privadas. También se entrega un archivo ZIP del sitio compilado para plataformas que aceptan subir archivos estáticos.

Referencia: [Vite · Deploying a Static Site](https://vite.dev/guide/static-deploy), [GitHub · Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Google Sites

Google Sites no ejecuta directamente este repositorio ni construye React. Alojar primero la compilación, por ejemplo en GitHub Pages. Después, en Google Sites:

1. **Insertar → Incorporar → Por URL**.
2. Introducir la URL HTTPS publicada de Machina.
3. Ampliar el bloque a todo el ancho y unos 900–1100 px de alto, o usar una incorporación de página completa.
4. Publicar la página de Google Sites y comprobar la interacción.

Si se usa código de incorporación, sustituir la URL de este ejemplo:

```html
<iframe src="https://TU-USUARIO.github.io/TU-REPOSITORIO/"
        title="Machina Caelestis Universalis"
        width="100%" height="1000" allow="fullscreen" loading="lazy"></iframe>
```

El alojamiento no debe bloquear la incorporación con `X-Frame-Options: DENY` ni una política `frame-ancestors` incompatible. Las restricciones del navegador y del marco pueden limitar descargas, audio, instalación PWA o almacenamiento; abrir el enlace en una pestaña propia da la experiencia completa. El sonido siempre empieza silenciado en una sesión nueva.

Referencia: [Google Sites · Añadir contenido de sitios web](https://support.google.com/sites/answer/90569?hl=es).

## Compatibilidad

Interfaz adaptable para navegadores modernos con ES2022. La escena necesita WebGL 2; cuando no está disponible aparece el modo de lecturas. Chromium se prueba automáticamente. Firefox/Safari y teléfonos reales aún requieren verificación específica; no se afirma compatibilidad universal con navegadores antiguos. Sin conexión después de almacenar la compilación en la caché PWA.
