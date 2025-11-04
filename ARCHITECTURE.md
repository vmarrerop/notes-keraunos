# Notes Keraunos - Gestor de Tareas

## 🎨 Diseño UI/UX de Alto Nivel

Esta aplicación presenta un diseño **dark mode profesional** inspirado en GitHub, utilizando **Material UI v7** para componentes de primer nivel con las siguientes características:

- **Paleta de colores oscura** (#0d1117 background, #161b22 paper)
- **Efectos visuales avanzados**: Gradientes, sombras, animaciones y transiciones suaves
- **Hover effects** profesionales con elevación y cambios de color
- **Chips con códigos de color** para estados de tareas
- **Iconografía Material Icons** para mejor UX
- **Responsividad completa** con Grid2 y breakpoints optimizados
- **Indicador visual de tareas vencidas** con animación pulse
- **Estadísticas visuales** con gráficos de progreso

## 📁 Estructura del Proyecto

El proyecto sigue una **arquitectura limpia** con separación clara de responsabilidades:

```
src/
├── domain/                      # Capa de Dominio (Entidades y Lógica de Negocio)
│   ├── entities/
│   │   └── Task.js             # Entidad Task con lógica de negocio
│   └── constants/
│       └── taskStatuses.js     # Constantes de estados de tareas
│
├── application/                 # Capa de Aplicación (Casos de Uso)
│   └── hooks/
│       └── useTasks.js         # Hook para gestión de tareas
│
└── presentation/                # Capa de Presentación (UI)
    ├── theme/
    │   └── theme.js            # Tema Material UI dark mode
    ├── components/
    │   ├── molecules/          # Componentes compuestos
    │   │   ├── TaskCard/       # Tarjeta de tarea (VISTA PRINCIPAL)
    │   │   ├── TaskForm/       # Formulario de tarea
    │   │   └── TaskStats/      # Estadísticas visuales
    │   │
    │   └── organisms/          # Componentes complejos
    │       └── TaskList/       # Lista de tareas con Grid
    │
    └── pages/
        └── TasksPage/          # Página principal con AppBar
```

## 🎯 Componentes Principales

### TaskCard (Componente Reutilizable Principal)
**Ubicación:** `src/presentation/components/molecules/TaskCard/TaskCard.jsx`

**Características Visuales:**
- ✅ Card con gradiente oscuro y borde interactivo
- ✅ Hover effect con elevación y glow effect
- ✅ Indicador de tarea vencida con animación pulse
- ✅ Chip de estado con colores semánticos
- ✅ Iconos Material UI para mejor UX
- ✅ Sección de notas colapsable con animación
- ✅ Botones de acción con IconButtons
- ✅ Alert box para notas con estilo GitHub

**Funcionalidades:**
- ✅ Muestra detalles completos de una tarea
- ✅ Título destacado con tipografía jerárquica
- ✅ Descripción con ellipsis (3 líneas máximo)
- ✅ Fecha de vencimiento con indicador de overdue
- ✅ Estado actual (muestra el último del historial)
- ✅ Sección de notas expandible/colapsable
- ✅ Funcionalidad de edición inline
- ✅ Funcionalidad de eliminación con confirmación
- ✅ Totalmente reutilizable

### TaskStats (Dashboard de Estadísticas)
**Ubicación:** `src/presentation/components/molecules/TaskStats/TaskStats.jsx`

**Características:**
- ✅ Tarjetas de estadísticas con iconos y colores
- ✅ Animaciones de hover profesionales
- ✅ Barra de progreso lineal con gradiente
- ✅ Cálculo automático de porcentaje de completitud
- ✅ Layout responsivo con Stack

### TaskForm (Formulario Material UI)
**Ubicación:** `src/presentation/components/molecules/TaskForm/TaskForm.jsx`

**Características:**
- ✅ TextField de Material UI
- ✅ Select con MenuItem
- ✅ Botones con iconos de Material Icons
- ✅ Validación de formularios
- ✅ Layout con Stack spacing

### TaskList (Grid Responsivo)
**Ubicación:** `src/presentation/components/organisms/TaskList/TaskList.jsx`

**Características:**
- ✅ Grid2 responsivo (1 col xs, 2 cols sm, 3 cols lg)
- ✅ Estado vacío con ilustración
- ✅ Animaciones suaves

### TasksPage (Página Principal)
**Ubicación:** `src/presentation/pages/TasksPage/TasksPage.jsx`

**Características:**
- ✅ AppBar sticky con gradiente en título
- ✅ Chips de resumen de estadísticas
- ✅ Panel de creación con animación Fade
- ✅ Integración de TaskStats dashboard
- ✅ Layout con Container maxWidth="xl"

## 🏗️ Arquitectura Limpia

### Domain Layer
Contiene la lógica de negocio pura, independiente de frameworks:
- **Task.js**: Entidad con métodos de negocio (`getCurrentStatus()`, `addStatus()`)
- **taskStatuses.js**: Constantes del dominio

### Application Layer
Casos de uso y lógica de aplicación:
- **useTasks**: Hook custom para CRUD de tareas

### Presentation Layer
Componentes de UI organizados por complejidad:
- **Atoms**: Componentes sin dependencias
- **Molecules**: Combinación de atoms
- **Organisms**: Combinación de molecules
- **Pages**: Vistas completas

## 🚀 Ejecutar el Proyecto

```bash
pnpm install
pnpm dev
```

## 🎨 Características de Diseño

### Tema Dark Mode Profesional
- ✅ **Background**: #0d1117 (GitHub dark)
- ✅ **Paper**: #161b22 (Contenedores elevados)
- ✅ **Primary**: #58a6ff (Azul GitHub)
- ✅ **Success**: #3fb950 (Verde)
- ✅ **Warning**: #d29922 (Naranja)
- ✅ **Error**: #f85149 (Rojo)
- ✅ **Dividers**: #30363d

### Efectos Visuales Avanzados
- ✅ Gradientes lineales en cards y títulos
- ✅ Box-shadow con glow effects en hover
- ✅ Transformaciones translateY en hover
- ✅ Animaciones de pulse para alertas
- ✅ Transiciones suaves (0.2s - 0.3s)
- ✅ Border glow effects con color del tema
- ✅ Scrollbar personalizada

### Responsividad
- ✅ **Grid System**: Breakpoints xs, sm, md, lg, xl
- ✅ **Mobile First**: 1 columna en móvil
- ✅ **Tablet**: 2 columnas
- ✅ **Desktop**: 3 columnas
- ✅ **Stack direction**: Cambia según viewport
- ✅ **Container**: maxWidth xl para pantallas grandes

### Iconografía
- ✅ Material Icons integrados
- ✅ Iconos contextuales (Calendar, Notes, Timeline, etc.)
- ✅ Tamaños consistentes (16px, 32px, 64px)
- ✅ Colores semánticos según contexto

## 📝 Buenas Prácticas Implementadas

1. **Código Limpio**: Sin comentarios innecesarios, nombres descriptivos
2. **Separación de Responsabilidades**: Cada componente tiene una única responsabilidad
3. **Reutilización**: Componentes altamente reutilizables
4. **Inmutabilidad**: Uso de spread operator para actualizaciones de estado
5. **Composición**: Preferencia por composición sobre herencia
6. **Props Destructuring**: Código más legible y mantenible
7. **Material UI System**: Uso de sx prop para styling
8. **Theme Consistency**: Todo el diseño basado en el tema centralizado
9. **Semantic HTML**: Uso correcto de elementos semánticos
10. **Accessibility**: Componentes Material UI con ARIA labels integrados

## 🔄 Flujo de Datos

```
User Action → Page → Hook (useTasks) → State Update → Component Re-render
                ↓
         Material UI Theme Applied
                ↓
       Visual Effects & Animations
```

## 🛠️ Stack Tecnológico

- **React 19**: Framework principal
- **Material UI v7**: Sistema de componentes y diseño
- **Emotion**: CSS-in-JS para Material UI
- **Vite**: Build tool y dev server
- **ESLint**: Linting y calidad de código

## 📦 Entidad Task

```javascript
{
  id: string,
  title: string,
  description: string,
  dueDate: string (ISO date),
  statuses: [{ value: string, timestamp: string }],
  notes: string
}
```

## 🎯 Estados de Tarea

- `pending`: Pendiente (naranja)
- `in_progress`: En Progreso (azul)
- `completed`: Completada (verde)
- `cancelled`: Cancelada (rojo)
