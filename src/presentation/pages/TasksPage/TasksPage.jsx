import { useState } from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useTasks } from '../../hooks/useTasks';
import { useUserName } from '../../../application/hooks/useUserName';
import { TaskList } from '../../components/organisms/TaskList/TaskList';
import { TaskStats } from '../../components/molecules/TaskStats/TaskStats';
import { WelcomeModal } from '../../components/molecules/WelcomeModal/WelcomeModal';
import { CreateTaskModal } from '../../components/molecules/CreateTaskModal/CreateTaskModal';
import { FloatingNavBar } from '../../components/molecules/FloatingNavBar/FloatingNavBar';
import { TASK_STATUS } from '../../../domain/constants/taskStatuses';

export const TasksPage = () => {
  const { tasks, isLoading, error, addTask, updateTask, deleteTask } = useTasks();
  const { userName, showWelcomeModal, saveUserName } = useUserName();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateTask = async (taskData) => {
    await addTask(taskData);
    setIsCreateModalOpen(false);
  };

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const taskStats = {
    total: safeTasks.length,
    pending: safeTasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.PENDING).length,
    inProgress: safeTasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.IN_PROGRESS).length,
    completed: safeTasks.filter((t) => t.getCurrentStatus()?.value === TASK_STATUS.COMPLETED).length,
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'transparent',
        }}
      >
        <CircularProgress size={60} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'transparent',
          px: 3,
        }}
      >
        <Typography variant="h5" color="error" textAlign="center">
          Error al cargar las tareas: {error}
        </Typography>
      </Box>
    );
  }

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
          <TaskList tasks={safeTasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        </Container>
      </Box>

      <FloatingNavBar userName={userName} onCreateTask={() => setIsCreateModalOpen(true)} />
    </>
  );
};

