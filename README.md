# Gestor de Tareas Keraunos ⚡

Aplicación web de gestión de tareas construida con React y Material-UI, siguiendo principios de arquitectura limpia.

## Características

- ✅ CRUD completo de tareas
- 📊 Estadísticas en tiempo real
- 🌦️ Integración con API del clima (Open-Meteo)
- 💾 Persistencia local con localStorage
- 📱 Diseño responsive
- 🎨 Interfaz moderna con Material-UI

## Requisitos

- Node.js 18+
- pnpm

## Instalación

```bash
pnpm i
```

## Ejecutar

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── domain/              # Entidades y lógica de negocio
├── application/         # Casos de uso
├── infrastructure/      # Adaptadores y servicios externos
├── presentation/        # Componentes React
└── config/              # Configuración y dependencias
```

## Scripts Disponibles

```bash
pnpm run dev      # Inicia el servidor de desarrollo
pnpm run build    # Construye para producción
pnpm run preview  # Vista previa de la build
pnpm test         # Ejecuta los tests
```

## Tecnologías

- React 19
- Material-UI v7
- Vite
- Vitest + React Testing Library
- Open-Meteo API

## Funcionalidades

### Gestión de Tareas
- Crear tareas con título y descripción
- Cambiar estado (Pendiente → En Progreso → Completada)
- Eliminar tareas
- Persistencia automática

### API del Clima
- Consulta del clima actual
- Pronóstico por horas
- Búsqueda por ciudad
- Sin necesidad de API key

## Testing

```bash
pnpm test           # Modo watch
pnpm test -- --run  # Ejecutar una vez
```

Cobertura actual: 80%+

## Licencia

MIT
