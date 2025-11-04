import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FloatingNavBar } from './FloatingNavBar';

describe('FloatingNavBar', () => {
  it('muestra el nombre de usuario correctamente', () => {
    const mockOnCreate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Juan Pérez" 
        onCreateTask={mockOnCreate} 
      />
    );

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  });

  it('muestra el título de la aplicación', () => {
    const mockOnCreate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Test" 
        onCreateTask={mockOnCreate} 
      />
    );

    expect(screen.getByText('Gestor de Tareas Keraunos')).toBeInTheDocument();
  });

  it('llama a onCreateTask al hacer clic en crear tarea', async () => {
    const user = userEvent.setup();
    const mockOnCreate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Test" 
        onCreateTask={mockOnCreate} 
      />
    );

    const createButton = screen.getByRole('button', { name: /crear tarea/i });
    await user.click(createButton);

    expect(mockOnCreate).toHaveBeenCalledTimes(1);
  });

  it('muestra el logo de Keraunos', () => {
    const mockOnCreate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Test" 
        onCreateTask={mockOnCreate} 
      />
    );

    const logo = screen.getByAltText('Keraunos');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/keranous.png');
  });
});
