export class DeleteTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(taskId) {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    return this.taskRepository.delete(taskId);
  }
}
