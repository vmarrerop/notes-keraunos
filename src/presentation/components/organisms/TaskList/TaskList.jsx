import { Box, Typography, Paper, Grid } from '@mui/material';
import { Assignment as AssignmentIcon } from '@mui/icons-material';
import { TaskCard } from '../../molecules/TaskCard/TaskCard';

export const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          p: 6,
          border: '2px dashed',
          borderColor: 'divider',
          bgcolor: 'transparent',
          borderRadius: 3,
        }}
      >
        <AssignmentIcon
          sx={{
            fontSize: 80,
            color: 'text.secondary',
            mb: 3,
            opacity: 0.2,
          }}
        />
        <Typography variant="h3" color="text.secondary" align="center" gutterBottom>
          No hay tareas disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 1, opacity: 0.7 }}>
          ¡Crea tu primera tarea para comenzar!
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 0.5, sm: 0 } }}>
      <Grid
        container
        spacing={{ xs: 2, sm: 2.5, md: 3 }}
        justifyContent="center"
      >
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: { xs: '100%', sm: '100%' }, maxWidth: { xs: 280, sm: 'none' } }}>
              <TaskCard task={task} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};



