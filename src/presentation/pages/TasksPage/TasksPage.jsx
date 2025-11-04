import { useState } from 'react';
import {
  Container,
  Box,
} from '@mui/material';
import { useTasks } from '../../../application/hooks/useTasks';
import { useUserName } from '../../../application/hooks/useUserName';
import { TaskList } from '../../components/organisms/TaskList/TaskList';
import { TaskStats } from '../../components/molecules/TaskStats/TaskStats';
import { WelcomeModal } from '../../components/molecules/WelcomeModal/WelcomeModal';
import { CreateTaskModal } from '../../components/molecules/CreateTaskModal/CreateTaskModal';
import { FloatingNavBar } from '../../components/molecules/FloatingNavBar/FloatingNavBar';
import { TASK_STATUS } from '../../../domain/constants/taskStatuses';

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

export const TasksPage = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks(INITIAL_TASKS);
  const { userName, showWelcomeModal, saveUserName } = useUserName();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateTask = (taskData) => {
    addTask(taskData);
  };

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.PENDING).length,
    inProgress: tasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.IN_PROGRESS).length,
    completed: tasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.COMPLETED).length,
  };

  return (
    <>
      <WelcomeModal open={showWelcomeModal} onSave={saveUserName} />
      <CreateTaskModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />

      <Box sx={{ minHeight: '100vh', bgcolor: 'transparent', pb: { xs: 12, md: 14 }, pt: { xs: 2, md: 4 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 3 } }}>
          <TaskStats stats={taskStats} />
          <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        </Container>
      </Box>

      <FloatingNavBar userName={userName} onCreateTask={() => setIsCreateModalOpen(true)} />
    </>
  );
};

