import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Fade,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Stack,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useTasks } from '../../../application/hooks/useTasks';
import { TaskList } from '../../components/organisms/TaskList/TaskList';
import { TaskForm } from '../../components/molecules/TaskForm/TaskForm';
import { TaskStats } from '../../components/molecules/TaskStats/TaskStats';
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
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTask = (taskData) => {
    addTask(taskData);
    setIsCreating(false);
  };

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.PENDING).length,
    inProgress: tasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.IN_PROGRESS).length,
    completed: tasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.COMPLETED).length,
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'transparent' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: alpha('#1e293b', 0.8),
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mr: 'auto',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              }}
            >
              <DashboardIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem' },
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Gestor de Tareas
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <Chip
              label={`${taskStats.total} Total`}
              size="small"
              variant="outlined"
              sx={{ borderColor: alpha('#94a3b8', 0.3) }}
            />
            <Chip label={`${taskStats.inProgress} En Progreso`} size="small" color="info" variant="filled" />
            <Chip label={`${taskStats.completed} Completadas`} size="small" color="success" variant="filled" />
          </Stack>

          {!isCreating && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsCreating(true)}
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px rgba(59, 130, 246, 0.4)',
                },
                transition: 'all 0.3s',
                borderRadius: 2,
              }}
            >
              Nueva Tarea
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <TaskStats stats={taskStats} />

        <Fade in={isCreating} unmountOnExit>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: alpha('#1e293b', 0.6),
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: alpha('#3b82f6', 0.3),
              borderRadius: 3,
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography
                variant="h2"
                sx={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Crear Nueva Tarea
              </Typography>
              <IconButton
                onClick={() => setIsCreating(false)}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'error.main',
                    bgcolor: alpha('#ef4444', 0.1),
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <TaskForm onSubmit={handleCreateTask} onCancel={() => setIsCreating(false)} />
          </Paper>
        </Fade>

        <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
      </Container>
    </Box>
  );
};


