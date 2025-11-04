export class GetTasksUseCase {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  execute() {
    return this.taskRepository.getAll();
  }
}
