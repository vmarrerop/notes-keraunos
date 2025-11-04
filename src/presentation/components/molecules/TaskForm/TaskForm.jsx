import { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { TASK_STATUS, TASK_STATUS_LABELS } from '../../../../domain/constants/taskStatuses';

export const TaskForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  submitLabel = 'Crear Tarea',
}) => {
  const currentStatus = initialData?.getCurrentStatus();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate
      ? new Date(initialData.dueDate).toISOString().split('T')[0]
      : '',
    status: currentStatus?.value || TASK_STATUS.PENDING,
    notes: initialData?.notes || '',
  });

  const statusOptions = Object.entries(TASK_STATUS).map(([, value]) => ({
    value,
    label: TASK_STATUS_LABELS[value],
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      notes: formData.notes,
    };

    if (initialData) {
      if (formData.status !== currentStatus?.value) {
        submissionData.statuses = [
          ...(initialData.statuses || []),
          {
            value: formData.status,
            timestamp: new Date().toISOString(),
          },
        ];
      }
    } else {
      submissionData.statuses = [
        {
          value: formData.status,
          timestamp: new Date().toISOString(),
        },
      ];
    }

    onSubmit(submissionData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ingresa el título de la tarea"
          required
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe la tarea en detalle"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />

        <TextField
          type="date"
          label="Fecha de Vencimiento"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth variant="outlined" required>
          <InputLabel>Estado</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Estado"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Notas"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Añade notas adicionales sobre la tarea"
          multiline
          rows={3}
          fullWidth
          variant="outlined"
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {submitLabel}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={onCancel}
              sx={{
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'text.secondary',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              Cancelar
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

