import { TaskProvider } from './presentation/context/TaskContext';
import { TasksPage } from './presentation/pages/TasksPage/TasksPage';
import { TASK_STATUS } from './domain/constants/taskStatuses';
import './App.css';

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Implementar componente de tareas',
    description: 'Crear un componente reutilizable para mostrar los detalles de una tarea con Material UI y diseño dark mode profesional',
    dueDate: '2025-11-10',
    statuses: [{ value: TASK_STATUS.IN_PROGRESS, timestamp: new Date().toISOString() }],
    notes: 'Usar arquitectura limpia y componentes atómicos. Priorizar la experiencia visual y la responsividad.',
  },
  {
    id: '2',
    title: 'Configurar pruebas unitarias',
    description: 'Añadir Jest y React Testing Library al proyecto para garantizar la calidad del código',
    dueDate: '2025-11-15',
    statuses: [{ value: TASK_STATUS.PENDING, timestamp: new Date().toISOString() }],
    notes: 'Priorizar componentes críticos como TaskCard y TaskForm',
  },
  {
    id: '3',
    title: 'Optimizar rendimiento',
    description: 'Implementar lazy loading y memoización en componentes que lo requieran',
    dueDate: '2025-11-20',
    statuses: [{ value: TASK_STATUS.PENDING, timestamp: new Date().toISOString() }],
    notes: 'Analizar bundle size y optimizar imports',
  },
  {
    id: '4',
    title: 'Documentación técnica',
    description: 'Crear documentación completa del proyecto incluyendo arquitectura y guías de uso',
    dueDate: '2025-11-25',
    statuses: [{ value: TASK_STATUS.PENDING, timestamp: new Date().toISOString() }],
    notes: 'Incluir diagramas y ejemplos de código',
  },
];

function App() {
  return (
    <TaskProvider initialTasks={INITIAL_TASKS}>
      <TasksPage />
    </TaskProvider>
  );
}

export default App;
