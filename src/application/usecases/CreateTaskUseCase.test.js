import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTaskUseCase } from './CreateTaskUseCase';

describe('CreateTaskUseCase', () => {
  let mockRepository;
  let useCase;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
    };
    useCase = new CreateTaskUseCase(mockRepository);
  });

  it('crea una tarea correctamente', async () => {
    const taskData = {
      title: 'Nueva Tarea',
      description: 'Descripción de prueba',
    };

    const mockTask = { id: '1', ...taskData };
    mockRepository.create.mockResolvedValue(mockTask);

    const result = await useCase.execute(taskData);

    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveBeenCalledWith(taskData);
    expect(result).toEqual(mockTask);
  });

  it('lanza error cuando el título está vacío', async () => {
    const taskData = {
      title: '',
      description: 'Descripción',
    };

    await expect(useCase.execute(taskData)).rejects.toThrow('Task title is required');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('lanza error cuando el título es solo espacios', async () => {
    const taskData = {
      title: '   ',
      description: 'Descripción',
    };

    await expect(useCase.execute(taskData)).rejects.toThrow('Task title is required');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('permite crear tarea sin descripción', async () => {
    const taskData = {
      title: 'Nueva Tarea',
    };

    const mockTask = { id: '1', ...taskData };
    mockRepository.create.mockResolvedValue(mockTask);

    await useCase.execute(taskData);

    expect(mockRepository.create).toHaveBeenCalledWith(taskData);
  });
});
