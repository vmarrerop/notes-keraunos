import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApiFloatingButton } from './ApiFloatingButton';

describe('ApiFloatingButton', () => {
  it('renderiza el botón correctamente', () => {
    const mockOnNavigate = vi.fn();

    render(<ApiFloatingButton onNavigate={mockOnNavigate} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('muestra el tooltip al hacer hover', async () => {
    const user = userEvent.setup();
    const mockOnNavigate = vi.fn();

    render(<ApiFloatingButton onNavigate={mockOnNavigate} />);

    const button = screen.getByRole('button');
    await user.hover(button);

    expect(await screen.findByText('Ver API del Clima')).toBeInTheDocument();
  });

  it('llama a onNavigate con "weather" al hacer clic', async () => {
    const user = userEvent.setup();
    const mockOnNavigate = vi.fn();

    render(<ApiFloatingButton onNavigate={mockOnNavigate} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnNavigate).toHaveBeenCalledWith('weather');
    expect(mockOnNavigate).toHaveBeenCalledTimes(1);
  });

  it('muestra el icono de nube', () => {
    const mockOnNavigate = vi.fn();

    render(<ApiFloatingButton onNavigate={mockOnNavigate} />);

    const icon = screen.getByTestId('CloudIcon');
    expect(icon).toBeInTheDocument();
  });
});
