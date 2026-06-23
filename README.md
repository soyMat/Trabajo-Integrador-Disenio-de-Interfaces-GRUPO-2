# Austral Market

Sistema interno de administracion para un e-commerce de productos regionales de Tierra del Fuego.

El proyecto fue realizado para el TP de Diseño de Interfaces Graficas. La aplicacion permite ingresar al sistema, visualizar productos simulados y administrar altas, ediciones y eliminaciones desde una interfaz responsive.

## Integrantes del Grupo 2
- Mateo Mazuela
- Juan Pablo Ocampo
- Luca Mechulan
  
## Tecnologias

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Pantallas principales

La aplicacion cuenta con tres pantallas o vistas principales:

- Login
- Tabla/listado de productos
- Formulario de alta y edicion de producto

## Funcionalidades

- Login con validacion de email, contraseña y credenciales.
- Listado de productos con datos simulados.
- Vista responsive para escritorio y mobile.
- Tarjetas mobile para productos.
- Edicion y alta de productos mediante formulario.
- Eliminacion de productos.
- Estado vacio cuando no hay productos.
- Mensajes de error en login y formulario.
- Mensaje de confirmacion al guardar o editar.
- Estados visuales de productos mediante puntos de color.
- Detalle de producto desplegable en escritorio.

## Credenciales de prueba

Para ingresar al sistema:

```txt
Email: admin@australmarket.com
Contrasena: admin123
```

## Instalacion

Clonar el repositorio e instalar dependencias:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Luego abrir la URL que indique Vite, normalmente:

```txt
http://localhost:5173
```

## Componentes importantes

- `Login.jsx`: pantalla de ingreso con validacion.
- `ProductTable.jsx`: listado de productos, tarjetas mobile, acciones y detalle desplegable.
- `ProductModal.jsx`: formulario de alta y edicion.
- `Layout.jsx`: estructura general y footer.
- `Logo.jsx`: marca visual de Austral Market.

## Paleta visual

La paleta esta centralizada en `tailwind.config.js`.

Colores principales actuales:

- Fondo de pantalla: `#7F8BB2`
- Fondo de superficies: `#E1E4EB`
- Separadores: `#F3EFE7`
- Botones: `#364674`
- Texto principal: `#1C1C1E`
- Footer: `#1F2430`
## Tipografias

El proyecto carga tipografias desde Google Fonts en `index.html`.

- `Plus Jakarta Sans`: tipografia principal de la interfaz.
- `Space Mono`: tipografia secundaria/fallback y uso monoespaciado.
- `ITC Avant Garde Gothic` / `Futura`: configuradas como familia para titulos en Tailwind. No se cargan como archivo externo; funcionan si estan disponibles en el sistema y, si no, se usa una sans-serif como respaldo.