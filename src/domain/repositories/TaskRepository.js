import { Task } from '../entities/Task';

export class TaskRepository {
  constructor(storageAdapter) {
    this.storage = storageAdapter;
  }

  async getAll() {
    const tasks = await this.storage.getAll();
    return tasks.map(task => task instanceof Task ? task : new Task(task));
  }

  async getById(id) {
    const task = await this.storage.getById(id);
    if (!task) return null;
    return task instanceof Task ? task : new Task(task);
  }

  async create(task) {
    const created = await this.storage.create(task);
    return created instanceof Task ? created : new Task(created);
  }

  async update(id, updates) {
    const updated = await this.storage.update(id, updates);
    return updated instanceof Task ? updated : new Task(updated);
  }

  async delete(id) {
    return this.storage.delete(id);
  }
}
