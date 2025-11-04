export class DeleteTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId) {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    return await this.taskRepository.delete(taskId);
  }
}
