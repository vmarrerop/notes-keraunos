export class UpdateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(taskId, updates) {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    return this.taskRepository.update(taskId, updates);
  }
}
