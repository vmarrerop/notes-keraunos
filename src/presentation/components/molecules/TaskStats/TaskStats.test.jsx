import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskStats } from './TaskStats';

describe('TaskStats', () => {
  it('muestra las estadísticas correctamente', () => {
    const stats = {
      total: 10,
      pending: 3,
      inProgress: 4,
      completed: 3,
    };

    render(<TaskStats stats={stats} />);

    expect(screen.getByText('Pendientes')).toBeInTheDocument();
    expect(screen.getByText('En Progreso')).toBeInTheDocument();
    expect(screen.getByText('Completadas')).toBeInTheDocument();
    expect(screen.getByText('Progreso')).toBeInTheDocument();
  });

  it('muestra los valores numéricos correctos', () => {
    const stats = {
      total: 10,
      pending: 3,
      inProgress: 4,
      completed: 3,
    };

    render(<TaskStats stats={stats} />);

    const numbers = screen.getAllByText('3');
    expect(numbers.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('muestra cero cuando no hay tareas', () => {
    const stats = {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
    };

    render(<TaskStats stats={stats} />);

    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThanOrEqual(3);
  });

  it('calcula el porcentaje de progreso correctamente', () => {
    const stats = {
      total: 10,
      pending: 3,
      inProgress: 4,
      completed: 3,
    };

    render(<TaskStats stats={stats} />);

    expect(screen.getByText(/30/)).toBeInTheDocument();
    expect(screen.getByText(/%/)).toBeInTheDocument();
  });

  it('renderiza con valores grandes', () => {
    const stats = {
      total: 999,
      pending: 150,
      inProgress: 250,
      completed: 599,
    };

    render(<TaskStats stats={stats} />);

    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
    expect(screen.getByText('599')).toBeInTheDocument();
  });
});
