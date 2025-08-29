# junior-front-js-proxy

Este proyecto es un **frontend en JavaScript vanilla** que consume una API mínima para gestionar productos.  
Incluye estructura organizada por módulos, paginación, manejo de UI y configuración básica.

---

## 📂 Estructura del proyecto

- junior-front-js-proxy/
- ├─ index.html # Página principal
- ├─ css/
- │ └─ styles.css # Estilos globales
- ├─ js/
- │ ├─ main.js # Punto de entrada, inicializa la app
- │ ├─ api.js # Conexión con la API (GET, POST, etc.)
- │ ├─ ui.js # Manejo del DOM, renderizado de productos
- │ ├─ paginator.js # Lógica de paginación (navegar entre páginas)
- │ └─ config.js # Configuración (endpoint base de la API, pageSize, etc.)
- └─ README.md # Documentación del proyecto

---

## ⚙️ Funcionalidades principales

- **Listado de productos**: renderiza en el frontend los productos recibidos desde la API.
- **Crear producto**: envía datos al backend y los muestra en la lista.
- **Paginación**: permite navegar entre páginas de productos.
- **Búsqueda / filtrado**: se puede reiniciar la paginación y refrescar la lista.
- **Diseño sencillo** con HTML y CSS plano.

---

## 🧩 Módulos principales

### 1. `main.js`
- Punto de entrada de la app.
- Inicializa la carga de productos.
- Conecta la UI con los módulos de API y paginación.

### 2. `api.js`
- Define las funciones para interactuar con la API:
  - `getProducts(page, pageSize)`
  - `createProduct(producto)`
- Se encarga de las peticiones `fetch`.

### 3. `ui.js`
- Maneja el **renderizado en el DOM**:
  - Dibuja los productos en pantalla.
  - Muestra mensajes de error o vacíos.
- Conecta botones y formularios con las funciones de API.

### 4. `paginator.js`
- Controla la **navegación entre páginas**.
- Funciones clave:
  - `initPaginator(callback)` → inicializa botones anterior/siguiente.
  - `updatePaginator(total, pageSize)` → actualiza estado (deshabilitar, mostrar total de páginas).
  - `resetPaginator()` → reinicia la paginación a la primera página.
  - `getCurrentPage()` → devuelve la página actual.

### 5. `config.js`
- Centraliza valores configurables (ej. `API_URL`, `PAGE_SIZE`).

---

## 🚀 Flujo de la aplicación

1. El usuario entra a `index.html`.
2. `main.js` pide los productos iniciales (página 1).
3. `api.js` obtiene datos de la API y los pasa a `ui.js`.
4. `ui.js` renderiza la lista de productos.
5. El usuario puede:
   - Crear un producto → se manda por `POST` y se refresca la lista.
   - Usar el paginador → `paginator.js` cambia de página y recarga productos.
   - Filtrar/buscar → se reinicia a la página 1 y se actualiza la vista.

---

## 💡 Cómo correr el proyecto

1. Clonar el repositorio (https://github.com/tuguito04/junior-front-js-proxy.git) o descargar los archivos.
2. Abrir `index.html` en el navegador (no requiere build ni dependencias).
3. Asegurarse de que la API esté corriendo en la ruta definida en `config.js`.

---