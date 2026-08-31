# Agentes-front-angular

Aplicación frontend desarrollada con [Angular CLI](https://github.com/angular/angular-cli) (v21.2.22) que expone distintos asistentes de IA (chat, generación de imágenes, traducción, texto a audio, audio a texto, ortografía, pros y contras, entre otros) organizados por páginas.

## Estructura del proyecto

El código fuente vive en `src/app` y sigue una separación por capas:

- **`core/`** — lógica de negocio y casos de uso (`use-cases`), independiente de la UI.
- **`interfaces/`** — tipos e interfaces compartidas (por ejemplo `message.interface.ts`).
- **`presentation/`** — todo lo relacionado a la UI:
  - `components/` — componentes reutilizables (burbujas de chat, cajas de texto, loader de escritura, ítems de menú lateral, etc.).
  - `layouts/` — layouts de la aplicación (por ejemplo `dashboardLayout`).
  - `pages/` — páginas/asistentes (chat, generación y edición de imágenes, traducción, ortografía, texto-audio, audio-texto, pros y contras, etc.).
  - `services/` — servicios que conectan la UI con los casos de uso del `core`.
- **`template/`** — plantillas base como `chatTemplate`.

Las rutas de la app están definidas en `app.routes.ts` y el layout principal en `app.html`.

## Cómo levantar el proyecto

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Levantar el servidor de desarrollo:

   ```bash
   npm start
   ```

   o directamente con Angular CLI:

   ```bash
   ng serve
   ```

   Luego abrir el navegador en `http://localhost:4200/`. La aplicación recarga automáticamente al modificar los archivos fuente.

## Generar código

Angular CLI incluye herramientas de scaffolding. Para generar un componente nuevo:

```bash
ng generate component nombre-componente
```

Para ver todos los esquemas disponibles (componentes, directivas, pipes, etc.):

```bash
ng generate --help
```

## Compilar (build)

```bash
ng build
```

Esto compila el proyecto y guarda los artefactos en la carpeta `dist/`. Por defecto, el build de producción optimiza la aplicación para rendimiento y velocidad.

## Pruebas unitarias

Las pruebas unitarias corren con [Vitest](https://vitest.dev/):

```bash
npm test
```

## Pruebas end-to-end

```bash
ng e2e
```

Angular CLI no incluye un framework de e2e por defecto; se debe elegir el que mejor se ajuste a las necesidades del proyecto.

## Recursos adicionales

Para más información sobre Angular CLI, incluyendo referencia de comandos, visitar [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
