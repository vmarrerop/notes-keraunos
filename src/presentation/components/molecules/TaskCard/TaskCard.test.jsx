import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskCard } from './TaskCard';

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    dueDate: new Date('2025-01-01'),
    statuses: [
      { value: 'pending', timestamp: new Date('2025-01-01').toISOString() }
    ],
    getCurrentStatus: () => ({ value: 'pending', timestamp: new Date('2025-01-01').toISOString() })
  };

  it('renderiza el título correctamente', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskCard 
        task={mockTask} 
        onUpdateTask={mockOnUpdate} 
        onDeleteTask={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renderiza la descripción correctamente', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskCard 
        task={mockTask} 
        onUpdateTask={mockOnUpdate} 
        onDeleteTask={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('llama a onDeleteTask cuando se hace clic en eliminar', async () => {
    const user = userEvent.setup();
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskCard 
        task={mockTask} 
        onUpdateTask={mockOnUpdate} 
        onDeleteTask={mockOnDelete} 
      />
    );

    const deleteButton = screen.getByLabelText('Eliminar tarea');
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('muestra el botón de cambiar estado', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <TaskCard 
        task={mockTask} 
        onUpdateTask={mockOnUpdate} 
        onDeleteTask={mockOnDelete} 
      />
    );

    const changeStatusButton = screen.getByLabelText('Cambiar estado');
    expect(changeStatusButton).toBeInTheDocument();
  });
});
