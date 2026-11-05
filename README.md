# Préstamos y Cobros 3.9

Aplicación web **offline** (PWA) para administrar clientes, préstamos, cuotas, cobros y capital.
Funciona sin internet, se instala en el teléfono o la computadora y guarda **todos los datos solo en el dispositivo** (no hay servidor ni base de datos externa).

---

## 1. Contenido del paquete

Todos los archivos deben quedar **sueltos en la raíz** del repositorio (sin carpetas).

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La aplicación completa (HTML + CSS + JavaScript en un solo archivo). |
| `manifest.webmanifest` | Ficha de instalación (nombre, íconos, colores). |
| `sw.js` | Service Worker: permite funcionar sin internet. |
| `estado.json` | Interruptor remoto de la app (`"activa": true`). |
| `icon-*.png`, `icon-maskable-*.png`, `apple-touch-icon.png`, `favicon.ico` | Íconos del sistema. |
| `screenshot-wide.png`, `screenshot-mobile.png` | Capturas para la instalación. |
| `README.md` | Este archivo. |

> No borres ni renombres `index.html`, `manifest.webmanifest` ni `sw.js`.
> Si cambias el nombre del repositorio no hay que tocar nada: todas las rutas son relativas.

---

## 2. Publicar en GitHub Pages (gratis, 5 minutos)

### Paso A — Crear el repositorio

1. Entra a <https://github.com> e inicia sesión (crea una cuenta si no tienes).
2. Arriba a la derecha: **+ → New repository**.
3. Nombre sugerido: `prestamos-y-cobros` (sin espacios).
4. Marca **Public** (necesario para que Pages sea gratis).
5. **No** marques “Add a README file”. Pulsa **Create repository**.

### Paso B — Subir los archivos

**Opción 1: desde el navegador (la más fácil)**

1. En el repositorio recién creado pulsa **uploading an existing file** (o **Add file → Upload files**).
2. Descomprime el ZIP en tu computadora.
3. Arrastra **todos los archivos descomprimidos** a la página (no la carpeta, solo los archivos).
4. Abajo escribe el mensaje `Versión 3.9` y pulsa **Commit changes**.
5. Verifica que en la lista aparezcan `index.html`, `sw.js`, `manifest.webmanifest`, `estado.json` y los íconos.

**Opción 2: desde la app de escritorio de GitHub**

1. Instala **GitHub Desktop** (<https://desktop.github.com>).
2. **File → Add local repository** y elige la carpeta donde descomprimiste el ZIP.
3. **Publish repository**, desmarca “Keep this code private” y publica.

### Paso C — Activar GitHub Pages

1. En el repositorio entra a **Settings** (⚙️ arriba).
2. Menú izquierdo: **Pages**.
3. En *Build and deployment* → **Source**: elige **Deploy from a branch**.
4. En *Branch*: selecciona **main** y la carpeta **/ (root)**. Pulsa **Save**.
5. Espera 1–2 minutos y recarga la página. Aparecerá el aviso verde con tu dirección.

### Paso D — Tu dirección pública

Queda con esta forma:

```
https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/
```

Ejemplo: si tu usuario es `maria123` y el repositorio es `prestamos-y-cobros`:

```
https://maria123.github.io/prestamos-y-cobros/
```

Esa dirección se abre en **cualquier dispositivo** (Android, iPhone, iPad, Windows, Mac, Linux) y con cualquier navegador moderno. También puedes compartirla por WhatsApp.

---

## 3. Instalarla como aplicación

La instalación solo funciona cuando la app está publicada con **https** (GitHub Pages ya lo es). Abrir `index.html` desde el disco (doble clic) **no** permite instalarla, aunque sí funciona.

**Android / Chrome / Edge**
1. Abre la dirección de GitHub Pages.
2. Toca el menú **⋮** → **Instalar aplicación** o **Agregar a la pantalla principal**.
3. Confirma. Queda un ícono como cualquier app.

**iPhone / iPad (Safari)**
1. Abre la dirección en **Safari**.
2. Toca **Compartir** (cuadrado con flecha) → **Agregar a pantalla de inicio** → **Agregar**.

**Windows / Mac (Chrome o Edge)**
1. Abre la dirección.
2. En la barra de direcciones pulsa el ícono de instalar (⊕ o una pantalla con flecha) → **Instalar**.

La primera vez que abras la app con internet se guarda una copia completa; después funciona **sin conexión**.

---

## 4. Primeros pasos dentro de la app

1. **Clientes → Nuevo cliente**: registra a la persona.
2. **Préstamos → Nuevo préstamo**: elige el cliente de la lista, monto, interés (simple o sobre saldo), número de cuotas y frecuencia. Confirma la creación.
3. **Panel**: muestra cobros de hoy, atrasados, próximos, capital en la calle y ganancias.
4. **Cobros**: pago de una cuota con un toque, abono parcial o pago del saldo total. Todo se puede deshacer.
5. **Recibo**: genera un recibo para imprimir o una imagen para enviar por WhatsApp.
6. **Capital**: registra aportes y retiros para saber cuánto dinero tienes disponible.
7. **Ajustes**: contraseña, huella / Face ID, tema claro-oscuro, recordatorios, respaldos, exportar/importar.

### Seguridad
- Puedes activar una **contraseña** y una **huella / Face ID** (WebAuthn) para bloquear la entrada.
- Al crear la contraseña se muestra un **código de recuperación**: guárdalo. Sin él, si olvidas la contraseña, solo queda borrar los datos del navegador.
- El bloqueo es local: protege el acceso a la app en ese dispositivo.

### Respaldos (muy importante)
Los datos viven en el navegador del dispositivo. Si borras los datos del navegador, desinstalas la app o cambias de teléfono, **se pierden** salvo que tengas un respaldo.

- **Ajustes → Exportar respaldo**: descarga un archivo `.json`. Guárdalo en la nube o envíalo a tu correo.
- **Ajustes → Importar respaldo**: permite **combinar** (merge) o **reemplazar** los datos.
- La app también crea **copias internas** automáticas (Ajustes → Copias de seguridad) que puedes restaurar.
- Recomendación: exporta un respaldo cada semana.

---

## 5. Interruptor remoto `estado.json`

El archivo `estado.json` permite activar o desactivar la app de forma remota:

```json
{
  "activa": true,
  "mensaje": "",
  "actualizado": "2026-11-04"
}
```

- `"activa": true` → la app funciona normal.
- `"activa": false` → aparece la pantalla **Acceso bloqueado**. Aun así el usuario puede **descargar su respaldo**.
- `"mensaje"` → texto opcional que se muestra en la pantalla de bloqueo.

Para cambiar el estado: edita `estado.json` directamente en GitHub (lápiz ✏️ → Commit changes). El cambio se aplica en un máximo de 5 minutos (la app lo consulta siempre desde la red, nunca desde la caché).

> Si borras `estado.json`, la app se considera activa.

---

## 6. Actualizar la app más adelante

1. Reemplaza `index.html` (y los demás archivos modificados) en el repositorio.
2. Si cambiaste archivos guardados en caché, sube también `sw.js` con un número de versión mayor, por ejemplo `3.9.0` → `3.9.1` (línea `const VERSION`).
3. La app mostrará un aviso de **actualización disponible**; el usuario pulsa **Actualizar**.
4. Si no aparece el aviso, cierra y vuelve a abrir la app, o en el navegador: **Configuración → Borrar datos de sitio** (esto borra también los datos locales: haz respaldo antes).

---

## 7. Problemas frecuentes

| Síntoma | Solución |
|---|---|
| “404 — There isn't a GitHub Pages site here” | Espera 2 minutos. Revisa Settings → Pages: rama `main`, carpeta `/ (root)`. |
| Se ve la página pero sin estilos | Falta `index.html` en la raíz o los archivos quedaron dentro de una carpeta. Deben estar sueltos. |
| No aparece “Instalar aplicación” | Debe abrirse con `https://`. En iPhone usa Safari. Recarga una vez. |
| No funciona sin internet | Abre la app una vez con internet y espera unos segundos a que termine de guardar. |
| Cambié `estado.json` y no pasa nada | Espera hasta 5 minutos o cierra y abre la app. |
| Perdí la contraseña | Usa el **código de recuperación**. Si tampoco lo tienes, borra los datos del sitio (se pierde todo). |
| Los datos desaparecieron | Se borraron los datos del navegador o se abrió en otro navegador/dispositivo. Restaura tu respaldo `.json`. |

---

## 8. Notas técnicas

- Sin frameworks, sin compilación, sin dependencias externas: un solo `index.html`.
- Almacenamiento: `localStorage`, clave `prestamos_v1`, versión de datos `4`, versión de app `3.9`.
- Service Worker con caché `prestamos-cobros-3.9.0`; `estado.json` siempre va a la red (`cache: no-store`).
- Contraseña guardada como hash SHA-256 con sal; WebAuthn se usa como puerta de acceso local (no hay verificación en servidor).
- Los importes se manejan en pesos; el formato es configurable en Ajustes.

---

Hecho para usarse sin internet, con los datos siempre bajo tu control.
