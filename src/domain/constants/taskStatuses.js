export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.PENDING]: 'Pendiente',
  [TASK_STATUS.IN_PROGRESS]: 'En Progreso',
  [TASK_STATUS.COMPLETED]: 'Completada',
  [TASK_STATUS.CANCELLED]: 'Cancelada'
};

export const TASK_STATUS_COLORS = {
  [TASK_STATUS.PENDING]: '#d29922',
  [TASK_STATUS.IN_PROGRESS]: '#58a6ff',
  [TASK_STATUS.COMPLETED]: '#3fb950',
  [TASK_STATUS.CANCELLED]: '#f85149'
};
