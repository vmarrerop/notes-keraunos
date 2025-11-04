export class UpdateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId, updates) {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    return await this.taskRepository.update(taskId, updates);
  }
}
