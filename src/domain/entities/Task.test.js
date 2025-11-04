import { describe, it, expect } from 'vitest';
import { Task } from './Task';

describe('Task Entity', () => {
  it('crea una tarea correctamente', () => {
    const taskData = {
      id: '1',
      title: 'Nueva Tarea',
      description: 'Descripción de prueba',
      dueDate: new Date('2025-01-01'),
      statuses: [
        { value: 'pending', timestamp: new Date('2025-01-01').toISOString() }
      ]
    };

    const task = new Task(taskData);

    expect(task.id).toBe('1');
    expect(task.title).toBe('Nueva Tarea');
    expect(task.description).toBe('Descripción de prueba');
  });

  it('getCurrentStatus devuelve el último estado', () => {
    const task = new Task({
      id: '1',
      title: 'Test',
      description: 'Test',
      dueDate: new Date(),
      statuses: [
        { value: 'pending', timestamp: new Date('2025-01-01').toISOString() },
        { value: 'in-progress', timestamp: new Date('2025-01-02').toISOString() }
      ]
    });

    const currentStatus = task.getCurrentStatus();
    expect(currentStatus.value).toBe('in-progress');
  });

  it('addStatus agrega un nuevo estado al array', () => {
    const task = new Task({
      id: '1',
      title: 'Test',
      description: 'Test',
      dueDate: new Date(),
      statuses: [
        { value: 'pending', timestamp: new Date('2025-01-01').toISOString() }
      ]
    });

    task.addStatus('completed');

    expect(task.statuses).toHaveLength(2);
    expect(task.getCurrentStatus().value).toBe('completed');
  });

  it('getCurrentStatus devuelve null cuando no hay estados', () => {
    const task = new Task({
      id: '1',
      title: 'Test',
      description: 'Test',
      dueDate: new Date(),
      statuses: []
    });

    expect(task.getCurrentStatus()).toBe(null);
  });

  it('maneja notas opcionales', () => {
    const task = new Task({
      id: '1',
      title: 'Test',
      description: 'Test',
      dueDate: new Date(),
      statuses: [],
      notes: 'Notas importantes'
    });

    expect(task.notes).toBe('Notas importantes');
  });

  it('usa string vacío por defecto para notas', () => {
    const task = new Task({
      id: '1',
      title: 'Test',
      description: 'Test',
      dueDate: new Date(),
      statuses: []
    });

    expect(task.notes).toBe('');
  });
});
