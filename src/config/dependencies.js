import { TaskRepository } from '../domain/repositories/TaskRepository';
import { LocalStorageAdapter } from '../infrastructure/adapters/LocalStorageAdapter';
import { CreateTaskUseCase } from '../application/usecases/CreateTaskUseCase';
import { UpdateTaskUseCase } from '../application/usecases/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../application/usecases/DeleteTaskUseCase';
import { GetTasksUseCase } from '../application/usecases/GetTasksUseCase';

const storageAdapter = new LocalStorageAdapter();
const taskRepository = new TaskRepository(storageAdapter);

export const taskUseCases = {
  createTask: new CreateTaskUseCase(taskRepository),
  updateTask: new UpdateTaskUseCase(taskRepository),
  deleteTask: new DeleteTaskUseCase(taskRepository),
  getTasks: new GetTasksUseCase(taskRepository),
};
