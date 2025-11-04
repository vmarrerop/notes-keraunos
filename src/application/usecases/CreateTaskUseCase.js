export class CreateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(taskData) {
    if (!taskData.title || taskData.title.trim() === '') {
      throw new Error('Task title is required');
    }

    return this.taskRepository.create(taskData);
  }
}
