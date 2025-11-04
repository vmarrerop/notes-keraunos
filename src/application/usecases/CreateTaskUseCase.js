export class CreateTaskUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskData) {
    if (!taskData.title || taskData.title.trim() === '') {
      throw new Error('Task title is required');
    }

    return await this.taskRepository.create(taskData);
  }
}
