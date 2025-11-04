import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FloatingNavBar } from './FloatingNavBar';

describe('FloatingNavBar', () => {
  it('muestra el nombre de usuario correctamente', () => {
    const mockOnCreate = vi.fn();
    const mockOnNavigate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Juan Pérez" 
        onCreateTask={mockOnCreate} 
        onNavigate={mockOnNavigate} 
      />
    );

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  });

  it('muestra el título de la aplicación', () => {
    const mockOnCreate = vi.fn();
    const mockOnNavigate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Test" 
        onCreateTask={mockOnCreate} 
        onNavigate={mockOnNavigate} 
      />
    );

    expect(screen.getByText('Gestor de Tareas Keraunos')).toBeInTheDocument();
  });

  it('llama a onCreateTask al hacer clic en crear tarea', async () => {
    const user = userEvent.setup();
    const mockOnCreate = vi.fn();
    const mockOnNavigate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Test" 
        onCreateTask={mockOnCreate} 
        onNavigate={mockOnNavigate} 
      />
    );

    const createButton = screen.getByRole('button', { name: /crear tarea/i });
    await user.click(createButton);

    expect(mockOnCreate).toHaveBeenCalledTimes(1);
  });

  it('llama a onNavigate al hacer clic en API EXTERNA', async () => {
    const user = userEvent.setup();
    const mockOnCreate = vi.fn();
    const mockOnNavigate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Test" 
        onCreateTask={mockOnCreate} 
        onNavigate={mockOnNavigate} 
      />
    );

    const apiButton = screen.getByText('API EXTERNA');
    await user.click(apiButton);

    expect(mockOnNavigate).toHaveBeenCalledWith('weather');
  });

  it('muestra el logo de Keraunos', () => {
    const mockOnCreate = vi.fn();
    const mockOnNavigate = vi.fn();

    render(
      <FloatingNavBar 
        userName="Test" 
        onCreateTask={mockOnCreate} 
        onNavigate={mockOnNavigate} 
      />
    );

    const logo = screen.getByAltText('Keraunos');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/keranous.png');
  });
});
