import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Fade,
  Backdrop,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, AddTask as AddTaskIcon } from '@mui/icons-material';
import { TaskForm } from '../TaskForm/TaskForm';

export const CreateTaskModal = ({ open, onClose, onSubmit }) => {
  const handleSubmit = (taskData) => {
    onSubmit(taskData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
        },
      }}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 2, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'text.secondary',
            '&:hover': {
              color: 'error.main',
              bgcolor: 'rgba(239, 68, 68, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
            mb: 2,
            boxShadow: '0 8px 32px rgba(255, 255, 255, 0.15)',
          }}
        >
          <AddTaskIcon sx={{ fontSize: 36, color: '#0f172a' }} />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Crear Nueva Tarea
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Completa los detalles de tu nueva tarea
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 4 }}>
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitLabel="Crear Tarea"
        />
      </DialogContent>
    </Dialog>
  );
};
