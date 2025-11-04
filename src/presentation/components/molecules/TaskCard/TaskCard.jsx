import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Fade,
  Backdrop,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CalendarMonth as CalendarIcon,
  Notes as NotesIcon,
  Timeline as TimelineIcon,
  Close as CloseIcon,
  PendingActions as PendingIcon,
  PlayCircle as InProgressIcon,
  CheckCircle as CompletedIcon,
  Cancel as CancelledIcon,
} from '@mui/icons-material';
import { TaskForm } from '../TaskForm/TaskForm';
import { TASK_STATUS_LABELS } from '../../../../domain/constants/taskStatuses';

const STATUS_CONFIG = {
  pending: {
    icon: PendingIcon,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    label: 'Pendiente',
  },
  in_progress: {
    icon: InProgressIcon,
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    label: 'En Progreso',
  },
  completed: {
    icon: CompletedIcon,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    label: 'Completada',
  },
  cancelled: {
    icon: CancelledIcon,
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    label: 'Cancelada',
  },
};

export const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentStatus = task.getCurrentStatus();
  const statusConfig = STATUS_CONFIG[currentStatus?.value] || STATUS_CONFIG.pending;
  const StatusIcon = statusConfig.icon;

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Sin fecha';

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && currentStatus?.value !== 'completed';

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (updates) => {
    onUpdate(task.id, updates);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (globalThis.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      onDelete(task.id);
      setIsModalOpen(false);
    }
  };

  if (isEditing) {
    return (
      <Card
        sx={{
          height: { xs: 'auto', md: 280 },
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 2.5 }, overflow: 'auto' }}>
          <TaskForm
            initialData={task}
            onSubmit={handleSave}
            onCancel={handleCancel}
            submitLabel="Guardar"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        sx={{
          height: { xs: 220, sm: 260, md: 280 },
          width: '100%',
          minWidth: { xs: 280, sm: 'auto' },
          maxWidth: { xs: 280, sm: 'none' },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(59, 130, 246, 0.4)',
          },
        }}
      >
        {isOverdue && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'error.main',
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
              zIndex: 2,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                '50%': { opacity: 0.7, transform: 'scale(1.1)' },
              },
            }}
          />
        )}

        <Fade in={isHovered}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(8px)',
              zIndex: 1,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <VisibilityIcon
                sx={{
                  fontSize: { xs: 52, sm: 56, md: 64 },
                  color: 'primary.main',
                  mb: { xs: 1.5, md: 2 },
                  filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Ver detalles
              </Typography>
            </Box>
          </Box>
        </Fade>

        <CardContent
          sx={{
            flexGrow: 1,
            p: { xs: 2.5, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              lineHeight: 1.3,
              mb: { xs: 2.5, md: 3 },
              fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: { xs: '2.6em', md: '3.9em' },
              minHeight: { xs: '2.6em', md: '3.9em' },
              maxHeight: { xs: '2.6em', md: '3.9em' },
            }}
          >
            {task.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1.25, md: 1.5 },
              p: { xs: 1.75, md: 2 },
              borderRadius: 3,
              bgcolor: statusConfig.bgColor,
              border: '1px solid',
              borderColor: `${statusConfig.color}40`,
              minWidth: { xs: '150px', md: '160px' },
              boxShadow: `0 4px 12px ${statusConfig.bgColor}`,
            }}
          >
            <StatusIcon
              sx={{
                fontSize: { xs: 24, md: 28 },
                color: statusConfig.color,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: statusConfig.color,
                fontWeight: 600,
                fontSize: { xs: '0.85rem', md: '0.875rem' },
              }}
            >
              {statusConfig.label}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
          },
        }}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            pb: 2,
          }}
        >
          <Box flex={1} pr={2}>
            <Typography variant="h2" gutterBottom>
              {task.title}
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                p: 1.5,
                mt: 1,
                borderRadius: 2,
                bgcolor: statusConfig.bgColor,
                border: '1px solid',
                borderColor: `${statusConfig.color}40`,
              }}
            >
              <StatusIcon
                sx={{
                  fontSize: 20,
                  color: statusConfig.color,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: statusConfig.color,
                  fontWeight: 600,
                }}
              >
                {statusConfig.label}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={() => setIsModalOpen(false)}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                bgcolor: 'rgba(148, 163, 184, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            {task.description && (
              <Box>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ letterSpacing: '1px' }}
                >
                  Descripción
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'text.primary', lineHeight: 1.7 }}>
                  {task.description}
                </Typography>
              </Box>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Box flex={1}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ letterSpacing: '1px' }}
                >
                  Fecha de Vencimiento
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <CalendarIcon
                    sx={{ fontSize: 20, color: isOverdue ? 'error.main' : 'text.secondary' }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: isOverdue ? 'error.main' : 'text.primary',
                      fontWeight: isOverdue ? 600 : 400,
                    }}
                  >
                    {formattedDate}
                  </Typography>
                </Box>
              </Box>

              {currentStatus && (
                <Box flex={1}>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ letterSpacing: '1px' }}
                  >
                    Última Actualización
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <TimelineIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Typography variant="body1">
                      {new Date(currentStatus.timestamp).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Stack>

            {task.notes && (
              <Box>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  fontWeight={600}
                  sx={{ letterSpacing: '1px' }}
                >
                  Notas
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    p: 2.5,
                    bgcolor: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: 2,
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                  }}
                >
                  <Box display="flex" alignItems="flex-start" gap={1.5}>
                    <NotesIcon sx={{ fontSize: 20, color: 'primary.main', mt: 0.3 }} />
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                      {task.notes}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={() => setIsModalOpen(false)}
            color="inherit"
            sx={{
              '&:hover': {
                bgcolor: 'rgba(148, 163, 184, 0.1)',
              },
            }}
          >
            Cerrar
          </Button>
          <Box flex={1} />
          <Button
            onClick={handleEdit}
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.light',
                bgcolor: 'rgba(59, 130, 246, 0.1)',
              },
            }}
          >
            Editar
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              '&:hover': {
                bgcolor: 'error.dark',
              },
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};



